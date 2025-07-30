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

  // 设置主题模式
  function setTheme(theme) {
    const body = document.body;
    const html = document.documentElement;
    
    // 移除所有主题类
    body.classList.remove(DARK_CLASS, LIGHT_CLASS);
    html.classList.remove(DARK_CLASS, LIGHT_CLASS);
    
    if (theme === 'dark') {
      body.classList.add(DARK_CLASS);
      html.classList.add(DARK_CLASS);
      localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    } else if (theme === 'light') {
      body.classList.add(LIGHT_CLASS);
      html.classList.add(LIGHT_CLASS);
      localStorage.setItem(THEME_STORAGE_KEY, 'light');
    } else {
      // auto模式，跟随系统
      localStorage.setItem(THEME_STORAGE_KEY, 'auto');
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add(DARK_CLASS);
        html.classList.add(DARK_CLASS);
      } else {
        body.classList.add(LIGHT_CLASS);
        html.classList.add(LIGHT_CLASS);
      }
    }
    
    updateToggleButton(theme);
  }

  // 更新切换按钮状态
  function updateToggleButton(theme) {
    const toggleBtn = document.querySelector('.theme-toggle-btn');
    if (!toggleBtn) return;
    
    const icon = toggleBtn.querySelector('i');
    
    // 检查页面是否已翻译
    const isTranslated = document.body.classList.contains('translated');
    
    if (theme === 'dark') {
      icon.className = 'fa-solid fa-moon fa-fw';
      toggleBtn.title = isTranslated ? 'Lights on' : '开灯';
    } else {
      icon.className = 'fa-solid fa-sun fa-fw';
      toggleBtn.title = isTranslated ? 'Lights off' : '关灯';
    }
  }

  // 切换主题
  function toggleTheme() {
    const currentTheme = getCurrentTheme();
    let newTheme;
    
    if (currentTheme === 'dark') {
      newTheme = 'light';
    } else if (currentTheme === 'light') {
      newTheme = 'dark';
    } else {
      // auto模式，根据当前系统主题切换
      newTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark';
    }
    
    setTheme(newTheme);
  }

  // 初始化主题
  function initTheme() {
    const savedTheme = getCurrentTheme();
    setTheme(savedTheme);
    
    // 监听系统主题变化（只绑定一次）
    if (savedTheme === 'auto' && !window.themeSystemListenerBound) {
      window.themeSystemListenerBound = true;
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (getCurrentTheme() === 'auto') {
          setTheme('auto');
        }
      });
    }
  }

  // 注册切换按钮事件
  function registerToggleButton() {
    const toggleBtn = document.querySelector('.theme-toggle-btn');
    if (toggleBtn) {
      // 防止重复绑定事件
      if (toggleBtn.hasAttribute('data-theme-toggle-bound')) {
        return;
      }
      
      toggleBtn.setAttribute('data-theme-toggle-bound', 'true');
      toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleTheme();
      });
    }
  }

  // 初始化
  initTheme();
  registerToggleButton();

  // 监听页面加载完成事件
  document.addEventListener('pjax:success', () => {
    // 重新初始化主题状态
    initTheme();
    // 重新绑定按钮事件
    registerToggleButton();
  });

  // 监听页面完全加载事件
  window.addEventListener('load', () => {
    // 确保主题状态正确
    initTheme();
    registerToggleButton();
  });
}); 