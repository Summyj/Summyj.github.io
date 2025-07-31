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
    const googleTranslateUrl = `https://translate.google.com/translate?sl=zh-CN&tl=en&u=${encodeURIComponent(currentUrl)}`;
    
    // 在新窗口中打开谷歌翻译
    window.open(googleTranslateUrl, '_blank');
    
    // 显示提示信息
    this.showToast('正在跳转到谷歌翻译...', 'info');
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