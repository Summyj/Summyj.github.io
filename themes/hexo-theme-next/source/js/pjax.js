/* global NexT, CONFIG, Pjax */

const pjax = new Pjax({
  selectors: [
    'head title',
    'meta[property="og:title"]',
    'script[type="application/json"]',
    // Precede .main-inner to prevent placeholder TOC changes asap
    '.post-toc-wrap',
    '.main-inner',
    '.languages',
    '.pjax'
  ],
  switches: {
    '.post-toc-wrap'(oldWrap, newWrap) {
      if (newWrap.querySelector('.post-toc')) {
        Pjax.switches.outerHTML.call(this, oldWrap, newWrap);
      } else {
        const curTOC = oldWrap.querySelector('.post-toc');
        if (curTOC) {
          curTOC.classList.add('placeholder-toc');
        }
        this.onSwitch();
      }
    }
  },
  analytics: false,
  cacheBust: false,
  scrollTo : !CONFIG.bookmark.enable
});

document.addEventListener('pjax:success', () => {
  // 在页面内容更新后立即处理侧边栏状态，避免闪烁
  if (CONFIG.sidebar.display !== 'remove') {
    const hasTOC = document.querySelector('.post-toc:not(.placeholder-toc)');
    const sidebarInner = document.querySelector('.sidebar-inner');
    
    if (sidebarInner) {
      // 添加加载状态类，暂时禁用过渡动画
      sidebarInner.classList.add('pjax-loading');
      
      // 立即设置正确的状态，不等待其他初始化
      sidebarInner.classList.remove('sidebar-nav-active', 'sidebar-toc-active', 'sidebar-overview-active');
      if (hasTOC) {
        sidebarInner.classList.add('sidebar-nav-active', 'sidebar-toc-active');
      } else {
        sidebarInner.classList.add('sidebar-overview-active');
      }
      
      // 使用requestAnimationFrame确保DOM更新后再移除加载状态
      requestAnimationFrame(() => {
        sidebarInner.classList.remove('pjax-loading');
      });
    }
  }
  
  pjax.executeScripts(document.querySelectorAll('script[data-pjax]'));
  NexT.boot.refresh();
  // Define Motion Sequence & Bootstrap Motion.
  if (CONFIG.motion.enable) {
    NexT.motion.integrator
      .init()
      .add(NexT.motion.middleWares.subMenu)
      // Add sidebar-post-related transition.
      .add(NexT.motion.middleWares.sidebar)
      .add(NexT.motion.middleWares.postList)
      .bootstrap();
  }
  
  // 确保侧边栏位置正确更新
  if (CONFIG.sidebar.display !== 'remove') {
    NexT.utils.updateSidebarPosition();
  }
});

if (!window.pjax) window.pjax = pjax;
