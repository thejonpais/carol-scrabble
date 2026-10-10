// Aunty Carol's Scrabble service worker: app shell + word lists cached so it opens offline from the Home Screen.
var CACHE = 'carol-scrabble-d8c1356aed';
var DICT_CACHE = 'carol-scrabble-dict-v2';   // bump when the built-in word lists change
var SHELL = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png'];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    // keep the current word-list cache across app updates; drop old app shells and outdated word lists
    return Promise.all(keys.filter(function (k) { return k !== CACHE && k !== DICT_CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;   // PeerJS CDN / broker go straight to the network
  if (/\/dict\/.+\.dawg$/.test(url.pathname)) {   // word lists: cache-first (big, rarely change)
    e.respondWith(caches.open(DICT_CACHE).then(function (c) {
      return c.match(e.request).then(function (hit) { return hit || fetch(e.request).then(function (res) { if (res.ok) c.put(e.request, res.clone()); return res; }); });
    }));
    return;
  }
  e.respondWith(fetch(e.request).then(function (res) {
    var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
    return res;
  }).catch(function () { return caches.match(e.request, { ignoreSearch: true }).then(function (r) { return r || caches.match('./index.html'); }); }));
});
self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
    for (var i = 0; i < list.length; i++) { if ('focus' in list[i]) return list[i].focus(); }
    if (self.clients.openWindow) return self.clients.openWindow('./');
  }));
});
