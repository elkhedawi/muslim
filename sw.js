const CACHE_NAME = 'muslim-app-cache-v1';
const urlsToCache = [
  './',
  './index.html'
];

// تثبيت ملفات الكاش الأساسية
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// استدعاء الملفات (يسمح بفتح إطار التطبيق حتى لو الإنترنت ضعيف)
self.addEventListener('fetch', event => {
  // نستثني طلبات الـ API (زي الآيات ومواقيت الصلاة) عشان متتحفظش بشكل خاطئ
  if (event.request.url.includes('api.alquran.cloud') || event.request.url.includes('api.aladhan.com')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});