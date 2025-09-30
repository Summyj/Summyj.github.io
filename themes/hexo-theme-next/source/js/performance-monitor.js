/* global NexT, CONFIG */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // 性能监控配置
  const PerformanceMonitor = {
    // 初始化性能监控
    init() {
      this.observePerformance();
      this.observeImages();
      this.observeLayout();
      this.reportWebVitals();
    },

    // 监控核心性能指标
    observePerformance() {
      if ('performance' in window) {
        window.addEventListener('load', () => {
          setTimeout(() => {
            const navigation = performance.getEntriesByType('navigation')[0];
            const paint = performance.getEntriesByType('paint');
            
            const metrics = {
              // 页面加载时间
              loadTime: navigation.loadEventEnd - navigation.loadEventStart,
              // DOM构建时间
              domTime: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
              // 首次内容绘制
              fcp: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
              // 最大内容绘制
              lcp: 0,
              // 累积布局偏移
              cls: 0,
              // 首次输入延迟
              fid: 0
            };

            // console.log('Performance Metrics:', metrics);
            this.storeMetrics(metrics);
          }, 0);
        });
      }
    },

    // 监控图片加载性能
    observeImages() {
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              const startTime = performance.now();
              
              img.addEventListener('load', () => {
                const loadTime = performance.now() - startTime;
                if (loadTime > 1000) {
                  // console.warn(`Slow image load: ${img.src} (${loadTime.toFixed(2)}ms)`);
                }
              });
              
              imageObserver.unobserve(img);
            }
          });
        });

        document.querySelectorAll('img').forEach(img => {
          if (!img.complete) {
            imageObserver.observe(img);
          }
        });
      }
    },

    // 监控布局偏移
    observeLayout() {
      if ('PerformanceObserver' in window) {
        try {
          // 监控LCP
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            // console.log('LCP:', lastEntry.startTime);
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

          // 监控CLS
          let clsValue = 0;
          const clsObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            }
            // console.log('CLS:', clsValue);
          });
          clsObserver.observe({ entryTypes: ['layout-shift'] });

          // 监控FID
          const fidObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              // console.log('FID:', entry.processingStart - entry.startTime);
            }
          });
          fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (e) {
          // console.warn('Performance Observer not fully supported');
        }
      }
    },

    // 报告Web Vitals
    reportWebVitals() {
      // 简化版的Web Vitals报告
      const vitals = {
        fcp: 0,
        lcp: 0,
        fid: 0,
        cls: 0
      };

      // 在页面卸载时报告指标
      window.addEventListener('beforeunload', () => {
        if (navigator.sendBeacon) {
          // 可以发送到分析服务
          // console.log('Web Vitals:', vitals);
        }
      });
    },

    // 存储性能指标
    storeMetrics(metrics) {
      try {
        const stored = JSON.parse(localStorage.getItem('performance-metrics') || '[]');
        stored.push({
          ...metrics,
          timestamp: Date.now(),
          url: location.pathname
        });
        
        // 只保留最近50条记录
        if (stored.length > 50) {
          stored.splice(0, stored.length - 50);
        }
        
        localStorage.setItem('performance-metrics', JSON.stringify(stored));
      } catch (e) {
        // 忽略存储错误
      }
    },

    // 获取性能建议
    getPerformanceAdvice() {
      const navigation = performance.getEntriesByType('navigation')[0];
      const advice = [];

      if (navigation.loadEventEnd - navigation.loadEventStart > 3000) {
        advice.push('页面加载时间过长，建议优化资源大小');
      }

      if (navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart > 1000) {
        advice.push('DOM构建时间过长，建议减少DOM复杂度');
      }

      return advice;
    }
  };

  // 初始化性能监控
  PerformanceMonitor.init();

  // 暴露到全局以便调试
  window.PerformanceMonitor = PerformanceMonitor;
}); 