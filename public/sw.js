var filesToCache = [
  '.',
];

var staticCacheName = 'pages-cache';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName)
    .then(function(cache) {
      return cache.addAll(filesToCache);
    }).catch(function () {})
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(staticCacheName).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          if (!/ajax/.test(event.request)) {
            cache.put(event.request, response.clone());
          }
          return response;
        }).catch(function () {});
      }).catch(function () {});
    })
  );
});