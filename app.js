(function () {
  "use strict";

  var cfg = window.APP_PEDIDOS_CONFIG || {};
  var ALLOWED = cfg.allowedPrefix || "https://script.google.com/macros/s/";
  var SPLASH_MS = Number(cfg.splashMs) || 600;

  var splash = document.getElementById("splash");
  var errorScreen = document.getElementById("error-screen");
  var errorCopy = document.getElementById("error-copy");
  var retryBtn = document.getElementById("retry-btn");
  var installBtn = document.getElementById("install-btn");
  var installBtnError = document.getElementById("install-btn-error");
  var openBtns = document.querySelectorAll("[data-open-app]");

  var deferredPrompt = null;
  var splashTimer = null;
  var navigating = false;
  var appUrl = resolveAppUrl();

  openBtns.forEach(function (el) {
    el.setAttribute("href", appUrl);
  });

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js", { scope: "./" }).catch(function () {});
  }

  window.addEventListener("beforeinstallprompt", function (event) {
    event.preventDefault();
    deferredPrompt = event;
    showInstallButtons(true);
  });

  window.addEventListener("appinstalled", function () {
    deferredPrompt = null;
    showInstallButtons(false);
  });

  [installBtn, installBtnError].forEach(function (btn) {
    if (!btn) return;
    btn.addEventListener("click", function () {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      deferredPrompt.userChoice.finally(function () {
        deferredPrompt = null;
        showInstallButtons(false);
      });
    });
  });

  retryBtn.addEventListener("click", function () {
    startLoad();
  });

  window.addEventListener("online", function () {
    if (errorScreen && !errorScreen.classList.contains("is-hidden") && !navigating) {
      startLoad();
    }
  });

  window.addEventListener("offline", function () {
    if (!navigating) showError();
  });

  startLoad();

  function resolveAppUrl() {
    var raw = new URLSearchParams(window.location.search).get("url");
    if (raw) {
      try {
        var url = new URL(raw);
        if (url.protocol === "https:" && url.href.indexOf(ALLOWED) === 0) {
          return url.href;
        }
      } catch (err) {}
    }
    return cfg.defaultUrl;
  }

  function startLoad() {
    navigating = false;
    clearTimeout(splashTimer);
    hide(errorScreen);
    show(splash);

    if (!navigator.onLine) {
      showError();
      return;
    }

    splashTimer = setTimeout(function () {
      if (!navigator.onLine) {
        showError();
        return;
      }
      navigating = true;
      window.location.replace(appUrl);
    }, SPLASH_MS);
  }

  function showError() {
    navigating = false;
    clearTimeout(splashTimer);
    hide(splash);
    if (errorCopy) {
      errorCopy.textContent = "Parece que no hay internet. Revisá la conexión e intentá de nuevo.";
    }
    show(errorScreen);
  }

  function showInstallButtons(visible) {
    toggle(installBtn, visible);
    toggle(installBtnError, visible);
  }

  function show(el) { if (el) el.classList.remove("is-hidden"); }
  function hide(el) { if (el) el.classList.add("is-hidden"); }
  function toggle(el, visible) { if (el) el.classList.toggle("is-hidden", !visible); }
})();
