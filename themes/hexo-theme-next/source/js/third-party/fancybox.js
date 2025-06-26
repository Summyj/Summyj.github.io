/* global Fancybox */

// 保存 sidebar 状态
let sidebarWasActive = false;

document.addEventListener('page:loaded', () => {
  // 清理之前的绑定，避免重复绑定
  Fancybox.destroy();

  /**
   * Wrap images with fancybox.
   */
  document.querySelectorAll('.post-body :not(a) > img, .post-body > img').forEach(image => {
    // 检查是否已经被包装过
    if (image.parentNode.classList.contains('fancybox')) {
      return;
    }
    
    const imageLink = image.dataset.src || image.src;
    const imageWrapLink = document.createElement('a');
    imageWrapLink.classList.add('fancybox');
    imageWrapLink.href = imageLink;
    imageWrapLink.setAttribute('itemscope', '');
    imageWrapLink.setAttribute('itemtype', 'http://schema.org/ImageObject');
    imageWrapLink.setAttribute('itemprop', 'url');

    let dataFancybox = 'default';
    if (image.closest('.post-gallery') !== null) {
      dataFancybox = 'gallery';
    } else if (image.closest('.group-picture') !== null) {
      dataFancybox = 'group';
    }
    imageWrapLink.dataset.fancybox = dataFancybox;

    const imageTitle = image.title || image.alt;
    if (imageTitle) {
      imageWrapLink.title = imageTitle;
      // Make sure img captions will show correctly in fancybox
      imageWrapLink.dataset.caption = imageTitle;
    }
    image.wrap(imageWrapLink);
  });

  // 配置 Fancybox
  Fancybox.bind('[data-fancybox]', {
    // 保持滚动位置 - 禁用URL哈希来避免跳转
    Hash: false,
    
    // 不自动关注，避免页面跳转
    autoFocus: false,
    
    // 图片显示配置
    Images: {
      zoom: true,
      
      // 确保图像正确缩放，解决小点问题
      fit: "contain",
      
      // 解决小点问题的关键设置
      initialSize: "fit",
      
      // 设置预加载
      preload: 1,
      
      // 确保图片正确显示
      protected: true
    },
    
    // 导航配置
    Toolbar: {
      display: {
        left: ["infobar"],
        middle: ["zoomIn", "zoomOut", "toggle1to1", "rotateCCW", "rotateCW", "flipX", "flipY"],
        right: ["slideshow", "thumbs", "close"]
      }
    },
    
    // 滚动配置
    dragToClose: false,
    wheel: "zoom",
    
    // 关闭动画配置
    hideScrollbar: true,
    
    // Carousel 配置 - 确保图片切换正常
    Carousel: {
      infinite: false,
      
      // 确保图片切换时正确显示
      preload: 1,
      
      // 图片切换动画
      transition: "slide"
    },
    
    // 事件回调
    on: {
      init: (fancybox) => {
        // 记录当前 sidebar 状态和滚动位置
        sidebarWasActive = document.body.classList.contains('sidebar-active');
        
        // 记录当前滚动位置
        window.fancyboxScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      },
      
      // 确保图片加载完成后正确显示
      ready: (fancybox, slide) => {
        // 确保图片完全加载和显示
        if (slide && slide.type === 'image') {
          const img = slide.$content && slide.$content.querySelector('img');
          if (img) {
            img.style.maxWidth = '100%';
            img.style.maxHeight = '100%';
            img.style.objectFit = 'contain';
          }
        }
      },
      
      destroy: (fancybox) => {
        // 恢复 sidebar 状态
        setTimeout(() => {
          if (sidebarWasActive) {
            document.body.classList.add('sidebar-active');
          } else {
            document.body.classList.remove('sidebar-active');
          }
          
          // 恢复滚动位置
          if (typeof window.fancyboxScrollPosition !== 'undefined') {
            window.scrollTo(0, window.fancyboxScrollPosition);
            delete window.fancyboxScrollPosition;
          }
        }, 100);
      }
    }
  });
});
