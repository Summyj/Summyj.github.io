/* global CONFIG */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const THEME_STORAGE_KEY = 'theme-mode';
  const DARK_CLASS = 'theme-dark';
  const LIGHT_CLASS = 'theme-light';

  // 获取当前主题模式
  function getCurrentTheme() {
    return localStorage.getItem(THEME_STORAGE_KEY) || 'auto';
  }

  // 获取当前实际显示的主题（考虑系统设置）
  function getActualTheme() {
    const savedTheme = getCurrentTheme();
    if (savedTheme === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return savedTheme;
  }

  // 更新徽章图片
  function updateBadgeImage() {
    const badge = document.querySelector('.not-by-ai-badge');
    if (!badge) return;

    const actualTheme = getActualTheme();
    const basePath = CONFIG.images || '/images';
    
    if (actualTheme === 'light') {
      // 日间模式使用白色徽章
      badge.src = basePath + '/Written-By-a-Human-Not-By-AI-Badge-white.svg';
    } else {
      // 夜间模式使用黑色徽章
      badge.src = basePath + '/Written-By-a-Human-Not-By-AI-Badge-black.svg';
    }
  }

  // 监听主题变化
  function setupThemeListener() {
    // 监听主题切换事件
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && 
            (mutation.attributeName === 'class' || mutation.attributeName === 'data-theme')) {
          updateBadgeImage();
        }
      });
    });

    // 观察body和html元素的变化
    const body = document.body;
    const html = document.documentElement;
    
    observer.observe(body, { attributes: true, attributeFilter: ['class'] });
    observer.observe(html, { attributes: true, attributeFilter: ['class'] });

    // 监听系统主题变化
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      if (getCurrentTheme() === 'auto') {
        updateBadgeImage();
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    } else {
      // 兼容旧版本浏览器
      mediaQuery.addListener(handleSystemThemeChange);
    }
  }

  // 初始化
  function init() {
    updateBadgeImage();
    setupThemeListener();
  }

  // 页面加载完成后初始化
  init();

  // 监听Pjax页面切换
  document.addEventListener('pjax:success', () => {
    // 延迟执行，确保DOM已更新
    setTimeout(() => {
      updateBadgeImage();
    }, 100);
  });

  // 监听页面完全加载
  window.addEventListener('load', () => {
    updateBadgeImage();
  });
}); 