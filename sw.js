const CACHE = 'contador-mci-v6';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './ecues-192.png',
  './ecues-512.png',
  './apple-touch-icon.png'
];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});
self.addEventListener('fetch', e => { e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))); });

document.getElementById('btnWhatsapp').addEventListener('click', function() {
    const resumen = gerarResumo();
    const mensaje = encodeURIComponent(resumen);
    const url = `https://wa.me/?text=${mensaje}`;
    window.open(url, '_blank');
});
