const CACHE_NAME = 'pwa-snsmulti-manage-v1';
/* 이 앱 캐시 판정 — 같은 주소의 다른 기숙사 앱 캐시는 지우지 않는다(원본 규칙: ROSA scripts/dorm-pwa) */
const OWN_PREFIXES = ['pwa-snsmulti-manage-v', 'multi-sns-profit-v'];
function isOwnCache(key) {
  if (key === CACHE_NAME) return false;
  return OWN_PREFIXES.some(p => key.startsWith(p) && /^[0-9]/.test(key.slice(p.length)));
}
const CORE_ASSETS = ['./index.html', './manifest.json', './icon-192.png', './icon-512.png', './icon-maskable-512.png'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(isOwnCache).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  const isAppPage = event.request.mode === 'navigate' || url.pathname.endsWith('/') || url.pathname.endsWith('/index.html');

  if (isAppPage) {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .then(response => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put('./index.html', copy));
          }
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      if (response && response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      }
      return response;
    }).catch(() => caches.match(event.request)))
  );
});
