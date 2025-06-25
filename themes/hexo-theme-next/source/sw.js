const CACHE_NAME = 'next-blog-v1.2';
const STATIC_CACHE = 'static-v1.2';
const DYNAMIC_CACHE = 'dynamic-v1.2';

// 需要缓存的静态资源
const STATIC_ASSETS = [
  '/',
  '/css/main.css',
  '/js/next-boot.js',
  '/js/utils.js',
  '/js/motion.js',
  '/js/sidebar.js',
  '/images/avatar_cat.jpg',
  '/images/favicon.ico',
  '/about/',
  '/archives/'
];

// 需要网络优先的资源
const NETWORK_FIRST_PATHS = [
  '/api/',
  '/search.xml',
  '/sitemap.xml'
];

// 安装事件
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// 激活事件
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 请求拦截
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // 跳过非GET请求
  if (request.method !== 'GET') return;

  // 跳过外部域名
  if (url.origin !== location.origin) return;

  // 网络优先策略
  if (NETWORK_FIRST_PATHS.some(path => url.pathname.startsWith(path))) {
    event.respondWith(networkFirst(request));
    return;
  }

  // 静态资源缓存优先
  if (isStaticAsset(request)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // HTML页面使用网络优先，缓存后备
  if (request.headers.get('accept').includes('text/html')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // 其他资源使用缓存优先
  event.respondWith(cacheFirst(request));
});

// 缓存优先策略
async function cacheFirst(request) {
  try {
    const cache = await caches.open(STATIC_CACHE);
    const cached = await cache.match(request);
    
    if (cached) {
      // 后台更新缓存
      updateCache(request);
      return cached;
    }
    
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('Cache first failed:', error);
    return new Response('Network error', { status: 408 });
  }
}

// 网络优先策略
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.log('Network failed, trying cache:', request.url);
    const cache = await caches.open(DYNAMIC_CACHE);
    const cached = await cache.match(request);
    
    if (cached) {
      return cached;
    }
    
    // 返回离线页面或默认响应
    if (request.headers.get('accept').includes('text/html')) {
      return new Response(
        `<!DOCTYPE html>
        <html>
        <head><title>离线</title></head>
        <body>
          <h1>网络连接失败</h1>
          <p>请检查网络连接后重试</p>
        </body>
        </html>`,
        { headers: { 'Content-Type': 'text/html' } }
      );
    }
    
    return new Response('Network error', { status: 408 });
  }
}

// 后台更新缓存
async function updateCache(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, response);
    }
  } catch (error) {
    // 静默失败
  }
}

// 判断是否为静态资源
function isStaticAsset(request) {
  const url = new URL(request.url);
  return /\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/.test(url.pathname);
} 