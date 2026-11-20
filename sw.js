/* Service worker del envoltorio. Cachea solo la cáscara (HTML, CSS, JS, íconos y fuentes).
 * Nunca intercepta ni guarda contenido de script.google.com ni de otros dominios de Google.
 */
const CACHE_NAME = "app-pedidos-shell-v4";
const SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./config.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-512-maskable.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon.png",
  "./icons/favicon-32.png",
  "./img/mclarens-logo.png",
  "./img/mclarens-logo.webp",
  "./img/mclarens-spinner.svg",
  "./fonts/inter-latin.woff2",
  "./fonts/krona-one.woff2"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(SHELL);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (key) { return key !== CACHE_NAME; })
            .map(function (key) { return caches.delete(key); })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", function (event) {
  var request = event.request;
  var url;
  try {
    url = new URL(request.url);
  } catch (err) {
    return;
  }

  if (isGoogleHost(url.hostname)) {
    return;
  }

  if (url.origin !== self.location.origin) {
    return;
  }

  if (request.method !== "GET") {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(networkThenCache(request, "./index.html"));
    return;
  }

  event.respondWith(
    caches.match(request).then(function (cached) {
      var fetched = fetch(request).then(function (response) {
        putCopy(request, response);
        return response;
      }).catch(function () {
        return cached;
      });
      return cached || fetched;
    })
  );
});

function isGoogleHost(hostname) {
  return (
    hostname === "script.google.com" ||
    hostname === "accounts.google.com" ||
    hostname.endsWith(".google.com") ||
    hostname.endsWith(".googleusercontent.com") ||
    hostname.endsWith(".googleapis.com") ||
    hostname.endsWith(".gstatic.com")
  );
}

function networkThenCache(request, fallbackPath) {
  return fetch(request).then(function (response) {
    putCopy(request, response);
    return response;
  }).catch(function () {
    return caches.match(fallbackPath).then(function (cached) {
      return cached || caches.match("./index.html") || caches.match("./");
    });
  });
}

function putCopy(request, response) {
  if (!response || !response.ok) return;
  var copy = response.clone();
  caches.open(CACHE_NAME).then(function (cache) {
    cache.put(request, copy);
  }).catch(function () {});
}
