'use strict';

hexo.extend.filter.register('theme_inject', injects => {
  injects.comment.raw('waline', '<div class="comments" id="waline"></div>', {}, { cache: true });
  injects.head.raw('waline', '<link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css">', {}, { cache: true });
  injects.bodyEnd.raw('waline', `<script>
    let walineInstance;

    document.addEventListener('page:loaded', async () => {
      if (walineInstance) {
        walineInstance.destroy();
        walineInstance = null;
      }

      const container = document.getElementById('waline');
      if (!container) return;

      try {
        const { init } = await import('https://unpkg.com/@waline/client@v3/dist/waline.js');
        if (!container.isConnected || container !== document.getElementById('waline')) return;
        walineInstance = init({
          el: container,
          serverURL: 'https://waline.jmyblog.top',
          lang: 'zh-CN',
          dark: 'html.theme-dark'
        });
      } catch (error) {
        console.error('Failed to load Waline:', error);
      }
    });
  </script>`, {}, { cache: true });
});