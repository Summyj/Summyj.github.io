/* global CONFIG, NexT */

/**
 * 翻译服务类 - 优化版本
 */
class TranslateService {
  constructor() {
    this.state = {
      isTranslating: false,
      isTranslated: false,
      progress: 0
    };
    this.originalContent = new Map();
    this.config = {
      maxTextLength: 1000,
      minTextLength: 0,
      toastDuration: 1500,
      retryDelay: 1000
    };
    this.init();
  }

  init() {
    this.bindEvents();
    this.createUI();
  }

  /**
   * 绑定事件
   */
  bindEvents() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initButton());
    } else {
      this.initButton();
    }

    document.addEventListener('pjax:complete', () => this.resetState());
  }

  /**
   * 初始化按钮
   */
  initButton() {
    const btn = document.querySelector('.translate-btn');
    if (btn) {
      // 移除可能存在的旧事件监听器
      btn.removeEventListener('click', this.handleButtonClick);
      // 绑定新的事件监听器
      btn.addEventListener('click', this.handleButtonClick);
    } else {
      setTimeout(() => {
        const retryBtn = document.querySelector('.translate-btn');
        if (retryBtn) {
          retryBtn.removeEventListener('click', this.handleButtonClick);
          retryBtn.addEventListener('click', this.handleButtonClick);
        }
      }, this.config.retryDelay);
    }
  }

  /**
   * 按钮点击处理函数
   */
  handleButtonClick = (e) => {
    e.preventDefault();
    this.toggle();
  }

  /**
   * 创建UI元素
   */
  createUI() {
    // 进度条
    const progressBar = document.createElement('div');
    progressBar.className = 'translate-progress-bar';
    progressBar.innerHTML = `
      <div class="translate-progress-container">
        <div class="translate-progress-fill"></div>
        <div class="translate-progress-text">Translating... <span class="translate-progress-percent">0%</span></div>
      </div>
    `;
    document.body.appendChild(progressBar);

    // 提示框
    const toast = document.createElement('div');
    toast.className = 'translate-toast';
    toast.innerHTML = `
      <div class="translate-toast-content">
        <i class="translate-toast-icon"></i>
        <span class="translate-toast-text"></span>
      </div>
    `;
    document.body.appendChild(toast);
  }

  /**
   * 切换翻译状态
   */
  toggle() {
    if (this.state.isTranslating) {
      this.cancel();
    } else if (this.state.isTranslated) {
      // 立即重置按钮状态，然后执行恢复
      this.setState({ isTranslated: false });
      this.forceResetButton();
      this.restore();
    } else {
      this.translate();
    }
  }

  /**
   * 开始翻译
   */
  async translate() {
    if (this.state.isTranslating) return;

    this.setState({ isTranslating: true, progress: 0 });
    this.updateButton(true);
    this.showProgress();
    this.showToast('Starting translation service...', 'info');

    try {
      const content = this.getContent();
      if (!content.length) {
        this.showToast('No content found to translate', 'error');
        return;
      }

      const success = await this.translateContent(content);
      
      if (success) {
        this.setState({ isTranslated: true, progress: 100 });
        this.showToast('Translation completed! Page has been translated to English', 'success');
        document.body.classList.add('translated');
      } else {
        this.showToast('Translation failed. Please try again', 'error');
      }
    } catch (error) {
      console.error('Translation error:', error);
      this.showToast(`Translation failed: ${error.message}`, 'error');
      
      // 确保在错误时重置状态
      this.setState({ isTranslated: false, progress: 0 });
      document.body.classList.remove('translated');
    } finally {
      this.setState({ isTranslating: false });
      this.updateButton(false);
      this.hideProgress();
    }
  }

  /**
   * 获取页面内容
   */
  getContent() {
    const textNodes = this.getTextNodes(document.body);
    const content = [];
    
    for (const node of textNodes) {
      const text = node.textContent.trim();
      if (text && text.length >= this.config.minTextLength && text.length < this.config.maxTextLength) {
        this.originalContent.set(node, text);
        content.push({ node, text });
      }
    }

    return content;
  }

  /**
   * 翻译内容
   */
  async translateContent(content) {
    this.showToast('Using Google Translate...', 'info');
    const translated = [];
    let errorCount = 0;
    const maxErrors = 3; // 最多允许3个错误

    for (let i = 0; i < content.length; i++) {
      const item = content[i];
      const progress = 20 + Math.floor((i / content.length) * 70);
      this.updateProgress(progress);
      
      try {
        const translatedText = await this.translateText(item.text);
        if (translatedText && translatedText !== item.text) {
          item.node.textContent = translatedText;
          translated.push(item);
        }
      } catch (error) {
        errorCount++;
        console.warn(`Failed to translate: ${item.text}`, error);
        
        // 如果错误次数过多，停止翻译
        if (errorCount >= maxErrors) {
          throw new Error(`Too many translation errors (${errorCount}). Stopping translation.`);
        }
        
        // 显示错误提示但继续翻译
        this.showToast(`Translation error: ${error.message}`, 'error');
      }
    }

    // 如果没有成功翻译任何内容，抛出错误
    if (translated.length === 0) {
      throw new Error('No content was successfully translated. Please check your network connection.');
    }

    await this.translateButtons();
    return translated.length > 0;
  }

  /**
   * 翻译单个文本
   */
  async translateText(text) {
    try {
      // 添加超时控制
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10秒超时
      
      const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=zh&tl=en&dt=t&q=${encodeURIComponent(text)}`, {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const data = await response.json();
        return data?.[0]?.[0]?.[0] || null;
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Translation timeout - Google Translate service is not responding');
      } else if (error.message.includes('Failed to fetch')) {
        throw new Error('Network error - Unable to connect to Google Translate');
      } else {
        throw new Error(`Translation failed: ${error.message}`);
      }
    }
  }

  /**
   * 翻译按钮标题
   */
  async translateButtons() {
    const buttons = [
      { selector: '.theme-toggle-btn', key: 'darkModeBtn.title' },
      { selector: '.translate-btn', key: 'translateBtn.title' }
    ];

    for (const btn of buttons) {
      const element = document.querySelector(btn.selector);
      if (element) {
        const originalTitle = element.title;
        this.originalContent.set(btn.key, originalTitle);
        
        try {
          const translatedTitle = await this.translateText(originalTitle);
          if (translatedTitle) {
            element.title = translatedTitle;
          }
        } catch (error) {
          console.warn(`Failed to translate button title: ${originalTitle}`, error);
        }
      }
    }
  }

  /**
   * 获取文本节点
   */
  getTextNodes(element) {
    const textNodes = [];
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          
          const tagName = parent.tagName.toLowerCase();
          const className = parent.className.toLowerCase();
          
          const excludeTags = ['script', 'style', 'code', 'pre'];
          const excludeClasses = ['code', 'highlight', 'translate', 'progress'];
          
          if (excludeTags.includes(tagName) || excludeClasses.some(cls => className.includes(cls))) {
            return NodeFilter.FILTER_REJECT;
          }
          
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    let node;
    while (node = walker.nextNode()) {
      textNodes.push(node);
    }

    return textNodes;
  }

  /**
   * 恢复原文
   */
  restore() {
    // 立即重置按钮状态，让用户看到反馈
    this.setState({ isTranslated: false });
    this.forceResetButton();
    
    // 恢复文本节点
    for (const [node, originalText] of this.originalContent) {
      if (node && node.textContent !== originalText) {
        node.textContent = originalText;
      }
    }

    // 恢复页面标题
    const originalTitle = this.originalContent.get('document.title');
    if (originalTitle) {
      document.title = originalTitle;
    }

    // 恢复按钮和侧边栏
    this.restoreButtons();
    this.restoreSidebar();
    
    // 移除翻译状态类
    document.body.classList.remove('translated');
    
    // 最后清空originalContent
    this.originalContent.clear();
    
    this.showToast('Original content restored', 'success');
  }

  /**
   * 恢复按钮标题
   */
  restoreButtons() {
    const buttons = [
      { selector: '.theme-toggle-btn', key: 'darkModeBtn.title' },
      { selector: '.translate-btn', key: 'translateBtn.title' }
    ];

    for (const btn of buttons) {
      const element = document.querySelector(btn.selector);
      if (element) {
        const originalTitle = this.originalContent.get(btn.key);
        if (originalTitle) {
          element.title = originalTitle;
        } else {
          // 如果没有找到原始标题，使用默认值
          if (btn.selector === '.translate-btn') {
            element.title = 'translate page';
          } else if (btn.selector === '.theme-toggle-btn') {
            element.title = '关灯';
          }
        }
      }
    }
  }

  /**
   * 恢复侧边栏内容
   */
  restoreSidebar() {
    const translations = {
      'Who Lost the Money': '谁把钱丢了',
      'Eat well, drink well, live forever': '吃好喝好，长生不老',
      'Eat well and drink well, and live forever': '吃好喝好，长生不老',
      'Log': '日志',
      'Classification': '分类',
      'Label': '标签',
      'Front page': '首页',
      'About': '关于',
      'Search': '搜索',
      'Translate page': '翻译页面',
      'Restore original': '恢复原文'
    };

    const selectors = [
      '.site-title', '.site-subtitle', '.site-state-item-name',
      '.menu-item a', '.brand', '.menu-item span', '.menu-item'
    ];

    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(element => {
        const text = element.textContent;
        for (const [english, chinese] of Object.entries(translations)) {
          if (text.includes(english)) {
            element.textContent = text.replace(english, chinese);
          }
        }
      });
    });

    // 特别处理菜单项
    document.querySelectorAll('.menu-item a').forEach(item => {
      const text = item.textContent.trim();
      const menuTranslations = {
        'Front page': '首页',
        'About': '关于',
        'Search': '搜索'
      };
      if (menuTranslations[text]) {
        item.textContent = menuTranslations[text];
      }
    });
  }

  /**
   * 取消翻译
   */
  cancel() {
    this.setState({ isTranslating: false });
    this.updateButton(false);
    this.hideProgress();
    this.showToast('Translation canceled', 'info');
  }

  /**
   * 重置状态
   */
  resetState() {
    this.setState({ isTranslating: false, isTranslated: false, progress: 0 });
    this.updateButton(false);
    this.hideProgress();
    document.body.classList.remove('translated');
    this.originalContent.clear();
    
    // 强制重置按钮
    this.forceResetButton();
  }

  /**
   * 设置状态
   */
  setState(newState) {
    this.state = { ...this.state, ...newState };
  }

  /**
   * 更新按钮状态
   */
  updateButton(isTranslating) {
    const btn = document.querySelector('.translate-btn');
    if (!btn) return;

    const icon = btn.querySelector('i');
    if (isTranslating) {
      icon.className = 'fa fa-spinner fa-spin fa-fw';
      btn.title = 'Cancel translation';
      btn.classList.add('translating');
    } else {
      btn.classList.remove('translating');
      if (this.state.isTranslated) {
        icon.className = 'fa fa-undo fa-fw';
        btn.title = 'Restore original';
      } else {
        icon.className = 'fa fa-language fa-fw';
        btn.title = 'translate page';
      }
    }
    
    // 调试信息
    console.log('Button state updated:', {
      isTranslating,
      isTranslated: this.state.isTranslated,
      iconClass: icon.className,
      buttonTitle: btn.title
    });
  }

  /**
   * 显示进度条
   */
  showProgress() {
    const progressBar = document.querySelector('.translate-progress-bar');
    if (progressBar) {
      progressBar.style.display = 'block';
    }
  }

  /**
   * 隐藏进度条
   */
  hideProgress() {
    const progressBar = document.querySelector('.translate-progress-bar');
    if (progressBar) {
      progressBar.style.display = 'none';
    }
  }

  /**
   * 更新进度
   */
  updateProgress(percent) {
    this.state.progress = percent;
    const progressBar = document.querySelector('.translate-progress-bar');
    if (progressBar) {
      const fill = progressBar.querySelector('.translate-progress-fill');
      const percentText = progressBar.querySelector('.translate-progress-percent');
      
      if (fill) fill.style.width = percent + '%';
      if (percentText) percentText.textContent = percent + '%';
    }
  }

  /**
   * 强制重置按钮
   */
  forceResetButton() {
    const btn = document.querySelector('.translate-btn');
    if (!btn) return;

    const icon = btn.querySelector('i');
    if (icon) {
      icon.className = 'fa fa-language fa-fw';
    }
    btn.title = 'translate page';
    btn.classList.remove('translating');
    
    // 移除可能影响按钮的CSS类
    document.body.classList.remove('translated');
    
    // 强制重新渲染按钮
    btn.style.display = 'none';
    setTimeout(() => {
      btn.style.display = '';
    }, 0);
    
    // 确保按钮状态完全重置
    setTimeout(() => {
      if (btn && icon) {
        icon.className = 'fa fa-language fa-fw';
        btn.title = 'translate page';
        btn.classList.remove('translating');
      }
    }, 10);
    
    console.log('Button force reset:', {
      iconClass: icon ? icon.className : 'no icon',
      buttonTitle: btn.title,
      bodyClasses: document.body.className
    });
  }

  /**
   * 显示提示
   */
  showToast(message, type = 'info') {
    const toast = document.querySelector('.translate-toast');
    if (!toast) return;

    const toastText = toast.querySelector('.translate-toast-text');
    const toastIcon = toast.querySelector('.translate-toast-icon');

    if (toastText) toastText.textContent = message;
    if (toastIcon) {
      toastIcon.className = 'translate-toast-icon fa';
      const iconMap = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle'
      };
      toastIcon.classList.add(iconMap[type] || 'fa-info-circle');
    }

    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), this.config.toastDuration);
  }
}

// 初始化翻译服务
window.translateService = new TranslateService(); 