/* global Fancybox */

// Save sidebar state
let sidebarWasActive = false;

document.addEventListener('page:loaded', () => {
  // Clean up previous bindings
  Fancybox.destroy();

  /**
   * Wrap images with fancybox.
   */
  document.querySelectorAll('.post-body :not(a) > img, .post-body > img').forEach(image => {
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
      imageWrapLink.dataset.caption = imageTitle;
    }

    image.wrap(imageWrapLink);
  });

  // Add natural dimension hints to help Fancybox size content correctly.
  // For images already loaded, set data-width/data-height on the anchor.
  document.querySelectorAll('a.fancybox[data-fancybox]').forEach(link => {
    const img = link.querySelector('img');
    if (img && img.naturalWidth && img.naturalHeight) {
      link.dataset.width = img.naturalWidth;
      link.dataset.height = img.naturalHeight;
    }
  });

  // Configure Fancybox
  Fancybox.bind('[data-fancybox]', {
    Hash: false,
    autoFocus: false,
    placeFocusBack: false,

    Images: {
      Panzoom: {
        maxScale: 2
      }
    },

    Toolbar: {
      display: {
        left: ["infobar"],
        middle: ["zoomIn", "zoomOut", "toggle1to1", "rotateCCW", "rotateCW", "flipX", "flipY"],
        right: ["slideshow", "thumbs", "close"]
      }
    },

    Thumbs: {
      type: "classic"
    },

    Carousel: {
      infinite: false
    },

    on: {
      init: (fancybox) => {
        sidebarWasActive = document.body.classList.contains('sidebar-active');
        window.fancyboxScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      },

      destroy: (fancybox) => {
        setTimeout(() => {
          if (sidebarWasActive) {
            document.body.classList.add('sidebar-active');
          } else {
            document.body.classList.remove('sidebar-active');
          }

          if (typeof window.fancyboxScrollPosition !== 'undefined') {
            window.scrollTo(0, window.fancyboxScrollPosition);
            delete window.fancyboxScrollPosition;
          }
        }, 100);
      }
    }
  });
});
