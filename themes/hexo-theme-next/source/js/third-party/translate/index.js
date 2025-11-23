/* global CONFIG, NexT */

/**
 * 谷歌翻译跳转服务
 */
class GoogleTranslateService {
  constructor() {
    this.init();
  }

  init() {
    this.bindEvents();
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
  }

  /**
   * 初始化按钮
   */
  initButton() {
    const btn = document.querySelector('.translate-btn');
    if (btn) {
      btn.removeEventListener('click', this.handleButtonClick);
      btn.addEventListener('click', this.handleButtonClick);
    } else {
      // 如果按钮还没加载，延迟重试
      setTimeout(() => {
        const retryBtn = document.querySelector('.translate-btn');
        if (retryBtn) {
          retryBtn.removeEventListener('click', this.handleButtonClick);
          retryBtn.addEventListener('click', this.handleButtonClick);
        }
      }, 1000);
    }
  }

  /**
   * 按钮点击处理函数
   */
  handleButtonClick = (e) => {
    e.preventDefault();
    this.redirectToGoogleTranslate();
  }

  /**
   * 跳转到谷歌翻译
   */
  redirectToGoogleTranslate() {
    const currentUrl = window.location.href;
    const urlObj = new URL(currentUrl);
    
    // 如果已经在翻译页面，先提取原始URL
    let originalUrl = currentUrl;
    if (urlObj.hostname.includes('.translate.goog')) {
      // 从 translate.goog 恢复原始URL
      const hostname = urlObj.hostname.replace('.translate.goog', '');
      let path = urlObj.pathname + urlObj.search;
      // 移除翻译参数
      const params = new URLSearchParams(urlObj.search);
      params.delete('_x_tr_sl');
      params.delete('_x_tr_tl');
      params.delete('_x_tr_hl');
      params.delete('_x_tr_pto');
      if (params.toString()) {
        path = urlObj.pathname + '?' + params.toString();
      } else {
        path = urlObj.pathname;
      }
      originalUrl = urlObj.protocol + '//' + hostname + path;
    }
    
    // 检查是否已经在 Google Translate 页面
    if (urlObj.hostname.includes('translate.google.com')) {
      // 如果已经在翻译页面，提示用户
      this.showToast('您已经在翻译页面了', 'info');
      return;
    }
    
    // 使用 Google Translate 的标准网页翻译服务
    // 这种方式更可靠，不会出现SSL证书问题
    // Google Translate 会在iframe中显示翻译后的页面内容
    const translateUrl = `https://translate.google.com/translate?sl=auto&tl=en&hl=en&u=${encodeURIComponent(originalUrl)}`;
    
    // 在当前窗口打开翻译页面（Google Translate会在iframe中显示翻译后的内容）
    window.location.href = translateUrl;
  }

  /**
   * 显示提示信息
   */
  showToast(message, type = 'info') {
    // 创建提示框
    const toast = document.createElement('div');
    toast.className = `translate-toast translate-toast-${type}`;
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 12px 16px;
      border-radius: 4px;
      font-size: 14px;
      z-index: 9999;
      animation: fadeInOut 2s ease-in-out;
    `;
    toast.textContent = message;
    
    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(-10px); }
        20% { opacity: 1; transform: translateY(0); }
        80% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-10px); }
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(toast);
    
    // 2秒后自动移除
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 2000);
  }
}

// 初始化翻译服务
new GoogleTranslateService(); 