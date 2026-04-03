const CACHE = 'socialhub-v1';
// Only cache the shell — don't cache Firebase/Agora calls
const STATIC = ['/social-hub/', '/social-hub/index.html'];
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(STATIC))
  );
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  const url = e.request.url;
 
  // Let these go straight to network — no SW interception
  if (url.includes('firestore') || 
      url.includes('firebase') ||
      url.includes('firebasestorage') ||
      url.includes('googleapis') ||
      url.includes('agora') ||
      url.includes('picr.de') ||
      url.includes('postimg.cc') ||
      !url.startsWith('https://apertumgrid.github.io')) {
    return;
  }
 
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
