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
    
    updateToggleButton();
  }

  // 更新切换按钮状态
  function updateToggleButton() {
    const toggleBtn = document.querySelector('.theme-toggle-btn');
    if (!toggleBtn) return;
    
    const icon = toggleBtn.querySelector('i');
    const currentTheme = getCurrentTheme();
    const actualTheme = getActualTheme();
    
    // 图标表示当前主题：
    // light mode时显示太阳图标（表示当前是浅色主题）
    // dark mode时显示月亮图标（表示当前是深色主题）
    if (actualTheme === 'light') {
      icon.className = 'fa-solid fa-sun fa-fw';
      toggleBtn.title = '按我关灯';
    } else {
      icon.className = 'fa-solid fa-moon fa-fw';
      toggleBtn.title = '按我开灯';
    }
    
    // 移除auto模式标识（取消小绿点）
    toggleBtn.removeAttribute('data-auto-mode');
  }

  // 切换主题
  function toggleTheme() {
    const currentTheme = getCurrentTheme();
    const actualTheme = getActualTheme();
    let newTheme;
    
    if (currentTheme === 'auto') {
      // 如果当前是auto模式，切换到与当前系统主题相反的手动模式
      newTheme = actualTheme === 'dark' ? 'light' : 'dark';
    } else if (currentTheme === 'dark') {
      newTheme = 'light';
    } else if (currentTheme === 'light') {
      newTheme = 'dark';
    }
    
    setTheme(newTheme);
  }

  // 初始化主题
  function initTheme() {
    const savedTheme = getCurrentTheme();
    setTheme(savedTheme);
  }

  // 设置系统主题变化监听
  function setupSystemThemeListener() {
    // 确保只绑定一次监听器
    if (window.themeSystemListenerBound) {
      return;
    }
    
    window.themeSystemListenerBound = true;
    
    // 监听系统主题变化
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e) => {
      console.log('System theme changed:', e.matches ? 'dark' : 'light');
      console.log('Current theme mode:', getCurrentTheme());
      if (getCurrentTheme() === 'auto') {
        console.log('Auto mode detected, updating theme');
        setTheme('auto');
      } else {
        console.log('Not in auto mode, ignoring system theme change');
      }
    };
    
    // 添加监听器
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
      console.log('System theme listener added using addEventListener');
    } else {
      // 兼容旧版本浏览器
      mediaQuery.addListener(handleSystemThemeChange);
      console.log('System theme listener added using addListener');
    }
    
    // 立即检查当前系统主题
    console.log('Current system theme:', mediaQuery.matches ? 'dark' : 'light');
    console.log('System theme listener setup complete');
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
  setupSystemThemeListener();
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