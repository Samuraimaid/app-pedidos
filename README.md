# App de Pedidos

Envoltorio instalable (PWA) de la App de Pedidos de Mc-LarenS. Abre la app de Google Apps Script a pantalla completa, con su propio nombre e ícono en la computadora y en Android.

Página: [https://samuraimaid.github.io/app-pedidos/](https://samuraimaid.github.io/app-pedidos/)

Repositorio: [https://github.com/Samuraimaid/app-pedidos](https://github.com/Samuraimaid/app-pedidos)

## Instalar en la computadora (Chrome o Edge)

1. Abrí [https://samuraimaid.github.io/app-pedidos/](https://samuraimaid.github.io/app-pedidos/) en Chrome o Edge.
2. En la barra de direcciones, hacé clic en el ícono de instalar (un monitor con una flecha hacia abajo). También puede aparecer el botón **Instalar app**.
3. Confirmá. Queda como una ventana propia, con el ícono de Pedidos, sin la barra del navegador.

## Instalar en Android (Chrome)

1. Abrí la misma dirección en Chrome.
2. Tocá el menú **⋮** y elegí **Instalar app** (a veces dice **Agregar a la pantalla principal**).
3. Confirmá. El ícono **Pedidos** aparece junto al resto de las apps.

En iPhone o iPad, desde Safari: **Compartir → Agregar a pantalla de inicio**.

## Cambiar la URL de la app

La dirección de Apps Script está en un solo archivo: [`config.js`](config.js).

- Cambio permanente: editá `defaultUrl`, guardá y subí el cambio a este repositorio. GitHub Pages se actualiza solo.
- Solo para probar: agregá `?url=` al final de la página, con un enlace que empiece exactamente con `https://script.google.com/macros/s/`. Cualquier otra dirección se ignora.

Ejemplo:

```
https://samuraimaid.github.io/app-pedidos/?url=https://script.google.com/macros/s/ID/exec
```

## Si ves una pantalla en blanco

Google a veces bloquea que una página de Apps Script se muestre dentro de otra (encabezado `X-Frame-Options`). En ese caso usá **Abrir en el navegador**.

Para que la app cargue adentro de esta ventana hay que publicar una versión nueva del proyecto de Apps Script con `HtmlService.XFrameOptionsMode.ALLOWALL`. Este repositorio no modifica ese proyecto.

Si Google pide iniciar sesión, también usá **Abrir en el navegador**: el inicio de sesión de Google no se puede completar dentro de un iframe. La app está configurada para usarse sin login (acceso “Cualquiera”), así que en condiciones normales no debería pedirlo.

La app instalable necesita internet para ver el catálogo y los pedidos. Sin conexión se abre la pantalla **Sin conexión**, con un botón para reintentar.

## Crear un APK para Android (más adelante)

Todavía no hay un APK. Cuando lo quieras, se puede empaquetar esta misma página como app de Android (TWA) con [PWABuilder](https://www.pwabuilder.com/) o [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap), usando la URL de GitHub Pages.

## Cómo está armado

| Archivo | Para qué sirve |
| --- | --- |
| `index.html` | Ventana a pantalla completa, pantalla de carga y pantalla sin conexión |
| `config.js` | URL de la app de Apps Script |
| `app.js` | Carga del iframe, tiempo de espera, instalación y reintentos |
| `styles.css` | Estilo (fondo `#121214`, acento `#E10600`, Krona One en pantallas anchas e Inter en el celular) |
| `manifest.webmanifest` | Nombre, íconos y modo `standalone` |
| `sw.js` | Cachea solo esta cáscara (versión `app-pedidos-shell-v4`). Nunca guarda el contenido de `script.google.com` |
| `img/` | Logo de Mc-LarenS y el SVG canónico del spinner de barras |
| `icons/` y `fonts/` | Íconos con el spinner Mc-LarenS (barras + M) e íconos para iPhone, más las fuentes Inter y Krona One |
