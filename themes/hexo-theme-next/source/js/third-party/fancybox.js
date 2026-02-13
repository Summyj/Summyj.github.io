/* global Fancybox */

// Save sidebar state
let sidebarWasActive = false;
let fancyboxBound = false;

// Debounce function to prevent excessive update calls
let updateTimer = null;
function debouncedUpdate(fancybox, delay = 150) {
  if (updateTimer) {
    clearTimeout(updateTimer);
  }
  updateTimer = setTimeout(() => {
    if (fancybox && typeof fancybox.update === 'function') {
      try {
        requestAnimationFrame(() => {
          fancybox.update();
        });
      } catch (e) {
        // Silently handle errors to prevent blocking
      }
    }
    updateTimer = null;
  }, delay);
}

// Bind Fancybox after images are wrapped
function bindFancybox() {
  if (fancyboxBound) return;
  
  try {
    // Clean up previous bindings to avoid duplicate bindings
    Fancybox.destroy();
    
    // Configure Fancybox with minimal event handlers to prevent blocking
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
    
      // Event callbacks - minimized to prevent blocking
      on: {
        init: (fancybox) => {
          // Record current sidebar state and scroll position - use setTimeout to avoid blocking
          setTimeout(() => {
            sidebarWasActive = document.body.classList.contains('sidebar-active');
            window.fancyboxScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
          }, 0);
        },
        
        // Simplified ready handler - only update when necessary
        ready: (fancybox, slide) => {
          if (slide && slide.type === 'image') {
            // Delay update to allow browser to render first
            setTimeout(() => {
              debouncedUpdate(fancybox, 200);
            }, 50);
          }
        },
        
        // Simplified load handler
        load: (fancybox, slide) => {
          if (slide && slide.type === 'image') {
            setTimeout(() => {
              debouncedUpdate(fancybox, 200);
            }, 50);
          }
        },
        
        destroy: (fancybox) => {
          // Restore sidebar state with delay
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
    
    fancyboxBound = true;
  } catch (e) {
    // Silently handle binding errors
    console.warn('Fancybox binding error:', e);
  }
}

document.addEventListener('page:loaded', () => {
  // Clean up previous bindings
  try {
    Fancybox.destroy();
  } catch (e) {
    // Ignore destroy errors
  }
  fancyboxBound = false;

  /**
   * Wrap images with fancybox - optimized for performance
   * Use requestIdleCallback or setTimeout to avoid blocking main thread
   */
  const images = document.querySelectorAll('.post-body :not(a) > img, .post-body > img');
  
  if (images.length === 0) {
    // No images, bind immediately
    setTimeout(bindFancybox, 0);
    return;
  }
  
  // Add click handler to ensure Fancybox is bound when user clicks
  // Use event delegation to handle clicks on images that aren't wrapped yet
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.tagName === 'IMG' && target.closest('.post-body')) {
      // If Fancybox not bound yet, bind it immediately
      if (!fancyboxBound) {
        bindFancybox();
      }
    }
  }, { passive: true, capture: true });
  
  let processedCount = 0;
  const totalImages = images.length;
  
  // Process images asynchronously to avoid blocking
  const processImages = (startIndex = 0, batchSize = 5) => {
    const endIndex = Math.min(startIndex + batchSize, images.length);
    
    for (let i = startIndex; i < endIndex; i++) {
      const image = images[i];
      
      // Check if already wrapped
      if (image.parentNode.classList.contains('fancybox')) {
        processedCount++;
        continue;
      }
      
      try {
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
        
        // Skip dimension detection to avoid blocking - let Fancybox handle it
        image.wrap(imageWrapLink);
        processedCount++;
      } catch (e) {
        // Silently continue if wrap fails
        processedCount++;
      }
    }
    
    // Continue processing remaining images asynchronously
    if (endIndex < images.length) {
      // Use smaller batches and longer delays for better performance
      const nextDelay = batchSize > 20 ? 50 : 10;
      if (typeof requestIdleCallback !== 'undefined') {
        requestIdleCallback(() => processImages(endIndex, batchSize), { timeout: 2000 });
      } else {
        setTimeout(() => processImages(endIndex, batchSize), nextDelay);
      }
    } else {
      // All images processed, bind Fancybox
      setTimeout(bindFancybox, 100);
    }
  };
  
  // Start processing images with smaller initial batch
  if (typeof requestIdleCallback !== 'undefined') {
    requestIdleCallback(() => processImages(0, 5), { timeout: 2000 });
  } else {
    setTimeout(() => processImages(0, 5), 100);
  }
});
