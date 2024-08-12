const CACHE_NAME = 'my-site-cache-v1';
const VERSION_FILE = '/version.json';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.add(VERSION_FILE))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes(VERSION_FILE)) {
    event.respondWith(
      fetch(event.request).then((response) => {
        return response.json().then((data) => {
          checkForUpdates(data.version);
          return response;
        });
      }).catch(() => {
        return caches.match(event.request);
      })
    );
  }
});

function checkForUpdates(newVersion) {
    caches.open(CACHE_NAME).then((cache) => {
      cache.match(VERSION_FILE).then((response) => {
        if (response) {
          response.json().then((data) => {
            if (data.version !== newVersion) {
              self.clients.matchAll().then((clients) => {
                clients.forEach((client) => {
                  client.postMessage({ type: 'UPDATE_AVAILABLE' });
                });
              });
            }
          });
        }
      });
    });
  }