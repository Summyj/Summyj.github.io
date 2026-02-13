/* global Fancybox */

// Save sidebar state
let sidebarWasActive = false;

// Debounce function to prevent excessive update calls
let updateTimer = null;
function debouncedUpdate(fancybox, delay = 100) {
  if (updateTimer) {
    clearTimeout(updateTimer);
  }
  updateTimer = setTimeout(() => {
    try {
      fancybox.update();
    } catch (e) {
      // Silently handle errors to prevent blocking
      console.warn('Fancybox update error:', e);
    }
    updateTimer = null;
  }, delay);
}

document.addEventListener('page:loaded', () => {
  // Clean up previous bindings to avoid duplicate bindings
  Fancybox.destroy();

  /**
   * Wrap images with fancybox - optimized for performance
   * Use requestIdleCallback or setTimeout to avoid blocking main thread
   */
  const images = document.querySelectorAll('.post-body :not(a) > img, .post-body > img');
  
  // Process images asynchronously to avoid blocking
  const processImages = (startIndex = 0, batchSize = 10) => {
    const endIndex = Math.min(startIndex + batchSize, images.length);
    
    for (let i = startIndex; i < endIndex; i++) {
      const image = images[i];
      
      // Check if already wrapped
      if (image.parentNode.classList.contains('fancybox')) {
        continue;
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
      
      // Add image dimensions to help Fancybox display images correctly and avoid small dot issue
      // Use try-catch to prevent blocking if image properties are not accessible
      try {
        if (image.naturalWidth && image.naturalHeight) {
          imageWrapLink.dataset.width = image.naturalWidth;
          imageWrapLink.dataset.height = image.naturalHeight;
        } else if (image.width && image.height) {
          imageWrapLink.dataset.width = image.width;
          imageWrapLink.dataset.height = image.height;
        }
      } catch (e) {
        // Silently continue if dimensions cannot be read
      }
      
      try {
        image.wrap(imageWrapLink);
      } catch (e) {
        // Silently continue if wrap fails
        console.warn('Failed to wrap image:', e);
      }
    }
    
    // Continue processing remaining images asynchronously
    if (endIndex < images.length) {
      if (typeof requestIdleCallback !== 'undefined') {
        requestIdleCallback(() => processImages(endIndex, batchSize), { timeout: 1000 });
      } else {
        setTimeout(() => processImages(endIndex, batchSize), 0);
      }
    }
  };
  
  // Start processing images
  if (images.length > 0) {
    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(() => processImages(0, 10), { timeout: 1000 });
    } else {
      setTimeout(() => processImages(0, 10), 0);
    }
  }

  // Configure Fancybox
  Fancybox.bind('[data-fancybox]', {
    // Preserve scroll position - disable URL hash to avoid page jump
    Hash: false,
    
    // Disable auto focus to avoid page jump
    autoFocus: false,
    
    // Image display configuration - fix small dot display issue
    Images: {
      zoom: true,
      
      // Ensure images scale correctly to fix small dot issue
      fit: "contain",
      
      // Reduce preload count to improve performance and avoid lag
      preload: 0,
      
      // Ensure images display correctly
      protected: true
    },
    
    // Toolbar configuration
    Toolbar: {
      display: {
        left: ["infobar"],
        middle: ["zoomIn", "zoomOut", "toggle1to1", "rotateCCW", "rotateCW", "flipX", "flipY"],
        right: ["slideshow", "thumbs", "close"]
      }
    },
    
    // Scroll configuration
    dragToClose: false,
    wheel: "zoom",
    
    // Animation configuration
    hideScrollbar: true,
    
    // Carousel configuration - optimize image switching performance and display
    Carousel: {
      infinite: false,
      
      // Reduce preload to improve performance and avoid lag
      preload: 0,
      
      // Use faster transition animation to reduce lag
      transition: "fade",
      
      // Disable drag to reduce performance overhead
      dragToClose: false
    },
    
    // Performance optimization: reduce animation duration
    animationDuration: 300,
    animationEffect: "fade",
    
    // Event callbacks
    on: {
      init: (fancybox) => {
        // Record current sidebar state and scroll position
        sidebarWasActive = document.body.classList.contains('sidebar-active');
        
        // Record current scroll position
        window.fancyboxScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      },
      
      // Ensure images display correctly after loading - fix small dot issue
      // Use debounced update to prevent blocking
      ready: (fancybox, slide) => {
        if (slide && slide.type === 'image') {
          // Use requestAnimationFrame to ensure DOM is ready
          requestAnimationFrame(() => {
            const img = slide.$content && slide.$content.querySelector('img');
            if (img) {
              // Ensure image has correct dimensions
              if (img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
                // Image already loaded, update with debounce
                debouncedUpdate(fancybox, 100);
              } else {
                // Wait for image to load
                const onLoad = () => {
                  debouncedUpdate(fancybox, 100);
                  img.removeEventListener('load', onLoad);
                };
                const onError = () => {
                  debouncedUpdate(fancybox, 100);
                  img.removeEventListener('error', onError);
                };
                img.addEventListener('load', onLoad, { once: true });
                img.addEventListener('error', onError, { once: true });
              }
            }
          });
        }
      },
      
      // Handle image switching - optimized to prevent blocking
      load: (fancybox, slide) => {
        if (slide && slide.type === 'image') {
          // Use requestAnimationFrame to ensure DOM is ready
          requestAnimationFrame(() => {
            const img = slide.$content && slide.$content.querySelector('img');
            if (img) {
              // Ensure layout updates after image loads
              if (img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
                debouncedUpdate(fancybox, 100);
              } else {
                const onLoad = () => {
                  debouncedUpdate(fancybox, 100);
                  img.removeEventListener('load', onLoad);
                };
                img.addEventListener('load', onLoad, { once: true });
              }
            }
          });
        }
      },
      
      destroy: (fancybox) => {
        // Restore sidebar state
        setTimeout(() => {
          if (sidebarWasActive) {
            document.body.classList.add('sidebar-active');
          } else {
            document.body.classList.remove('sidebar-active');
          }
          
          // Restore scroll position
          if (typeof window.fancyboxScrollPosition !== 'undefined') {
            window.scrollTo(0, window.fancyboxScrollPosition);
            delete window.fancyboxScrollPosition;
          }
        }, 100);
      }
    }
  });
});
