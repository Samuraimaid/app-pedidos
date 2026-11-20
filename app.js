(function () {
  "use strict";

  var cfg = window.APP_PEDIDOS_CONFIG || {};
  var ALLOWED = cfg.allowedPrefix || "https://script.google.com/macros/s/";
  var TIMEOUT = Number(cfg.loadTimeoutMs) || 15000;

  var frame = document.getElementById("app-frame");
  var splash = document.getElementById("splash");
  var errorScreen = document.getElementById("error-screen");
  var errorCopy = document.getElementById("error-copy");
  var retryBtn = document.getElementById("retry-btn");
  var installBtn = document.getElementById("install-btn");
  var installBtnError = document.getElementById("install-btn-error");
  var openBtns = document.querySelectorAll("[data-open-app]");
  var chromeBar = document.getElementById("chrome");

  var deferredPrompt = null;
  var loadTimer = null;
  var loaded = false;
  var appUrl = resolveAppUrl();

  frame.title = "App de Pedidos";
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
    if (errorScreen && !errorScreen.classList.contains("is-hidden") && !loaded) {
      startLoad();
    }
  });

  window.addEventListener("offline", function () {
    if (!loaded) showError("offline");
  });

  frame.addEventListener("load", function () {
    if (loaded) return;
    loaded = true;
    clearTimeout(loadTimer);
    hide(splash);
    hide(errorScreen);
    frame.classList.remove("is-hidden");
    show(chromeBar);
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
    loaded = false;
    clearTimeout(loadTimer);
    hide(errorScreen);
    show(splash);
    hide(chromeBar);
    frame.classList.add("is-hidden");

    if (!navigator.onLine) {
      showError("offline");
      return;
    }

    frame.src = appUrl;
    loadTimer = setTimeout(function () {
      if (!loaded) showError("timeout");
    }, TIMEOUT);
  }

  function showError(kind) {
    clearTimeout(loadTimer);
    hide(splash);
    frame.classList.add("is-hidden");
    if (errorCopy) {
      errorCopy.textContent =
        kind === "offline"
          ? "Parece que no hay internet. Revisá la conexión e intentá de nuevo."
          : "La app tardó demasiado en cargar. Puede ser la conexión o que Google esté bloqueando la vista dentro de esta ventana.";
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
