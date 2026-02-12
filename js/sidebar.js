/* global CONFIG */

document.addEventListener('DOMContentLoaded', () => {

  const isRight = CONFIG.sidebar.position === 'right';

  const sidebarToggleMotion = {
    mouse: {},
    init() {
      window.addEventListener('mousedown', this.mousedownHandler.bind(this));
      window.addEventListener('mouseup', this.mouseupHandler.bind(this));
      document.querySelector('.sidebar-dimmer').addEventListener('click', this.clickHandler.bind(this));
      document.querySelector('.sidebar-toggle').addEventListener('click', this.clickHandler.bind(this));
      window.addEventListener('sidebar:show', this.showSidebar);
      window.addEventListener('sidebar:hide', this.hideSidebar);
      // Listen for clicks on posts/categories/tags links and auto-hide sidebar
      this.bindSiteStateLinks();
    },
    bindSiteStateLinks() {
      // Use event delegation to listen for link clicks inside sidebar
      // Since pjax config doesn't include .sidebar, sidebar element won't be replaced, event delegation remains effective
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) {
        sidebar.addEventListener('click', (event) => {
          // Check if the clicked element is a posts/categories/tags link
          const target = event.target.closest('.site-state-item a');
          if (target) {
            // Delay to ensure link navigation works properly
            setTimeout(() => {
              this.hideSidebar();
            }, 100);
          }
        });
      }
    },
    mousedownHandler(event) {
      this.mouse.X = event.pageX;
      this.mouse.Y = event.pageY;
    },
    mouseupHandler(event) {
      const deltaX = event.pageX - this.mouse.X;
      const deltaY = event.pageY - this.mouse.Y;
      const clickingBlankPart = Math.hypot(deltaX, deltaY) < 20 && event.target.matches('.main');
      // Fancybox has z-index property, but medium-zoom does not, so the sidebar will overlay the zoomed image.
      // 检查是否正在显示 Fancybox，如果是则不隐藏 sidebar
      const fancyboxActive = document.querySelector('.fancybox__container');
      if ((clickingBlankPart || event.target.matches('img.medium-zoom-image')) && !fancyboxActive) {
        this.hideSidebar();
      }
    },
    clickHandler() {
      document.body.classList.contains('sidebar-active') ? this.hideSidebar() : this.showSidebar();
    },
    showSidebar() {
      document.body.classList.add('sidebar-active');
      const animateAction = isRight ? 'fadeInRight' : 'fadeInLeft';
      document.querySelectorAll('.sidebar .animated').forEach((element, index) => {
        element.style.animationDelay = (100 * index) + 'ms';
        element.classList.remove(animateAction);
        setTimeout(() => {
          // Trigger a DOM reflow
          element.classList.add(animateAction);
        });
      });
    },
    hideSidebar() {
      document.body.classList.remove('sidebar-active');
    }
  };
  sidebarToggleMotion.init();
});
