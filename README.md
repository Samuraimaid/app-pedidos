# App de Pedidos

Envoltorio instalable (PWA) de la App de Pedidos de Mc-LarenS. Muestra una pantalla de carga breve y después abre la app de Google Apps Script en la misma ventana, con su propio nombre e ícono en la computadora y en Android.

Página: [https://samuraimaid.github.io/app-pedidos/](https://samuraimaid.github.io/app-pedidos/)

Repositorio: [https://github.com/Samuraimaid/app-pedidos](https://github.com/Samuraimaid/app-pedidos)

## Instalar en la computadora (Chrome o Edge)

1. Abrí [https://samuraimaid.github.io/app-pedidos/](https://samuraimaid.github.io/app-pedidos/) en Chrome o Edge.
2. En la barra de direcciones, hacé clic en el ícono de instalar (un monitor con una flecha hacia abajo) **antes** de que la página salte a Google (son menos de un segundo). También puede aparecer el botón **Instalar app**.
3. Confirmá. Queda como una ventana propia, con el ícono de Pedidos.

La próxima vez que la abras desde ese ícono, vas a ver el logo de Mc-LarenS un instante y después la app de pedidos, ya en la ventana instalada. Chrome puede mostrar una barra chica arriba avisando que estás en otro sitio (`script.google.com`): es normal, porque el inicio de sesión de Google no funciona dentro de un recuadro.

## Instalar en Android (Chrome)

1. Abrí la misma dirección en Chrome.
2. Tocá el menú **⋮** y elegí **Instalar app** (a veces dice **Agregar a la pantalla principal**), también lo antes posible.
3. Confirmá. El ícono **Pedidos** aparece junto al resto de las apps.

En iPhone o iPad, desde Safari: **Compartir → Agregar a pantalla de inicio**.

## Iniciar sesión con Google (la primera vez)

La app corre con tu cuenta de Google, así que tenés que entrar con ese perfil. Esto es a propósito: así abre más rápido y cada quien usa su propia sesión.

La primera vez Google te va a pedir:

1. Elegir tu cuenta de Google.
2. Revisar los permisos (por ejemplo, acceso a la hoja de pedidos) y tocar **Permitir**.
3. Si aparece el aviso **“Google no ha verificado esta app”** o **“Esta app no está verificada”**, no es un error de la App de Pedidos. Todavía no está registrada en la verificación de Google. Tocá **Avanzado** y después **Ir a App de Pedidos (no seguro)** (el nombre puede variar un poco). Es el paso habitual en las apps de Apps Script de una cuenta personal.

En las siguientes aperturas, si ya diste permiso y tu sesión de Google sigue abierta, debería entrar directo a la app.

Hace falta internet. Si no hay conexión, se muestra la pantalla **Sin conexión**, con un botón para **Reintentar**.

## Cambiar la URL de la app

La dirección de Apps Script está en un solo archivo: [`config.js`](config.js).

- Cambio permanente: editá `defaultUrl`, guardá y subí el cambio a este repositorio. GitHub Pages se actualiza solo.
- Solo para probar: agregá `?url=` al final de la página, con un enlace que empiece exactamente con `https://script.google.com/macros/s/`. Cualquier otra dirección se ignora.

Ejemplo:

```
https://samuraimaid.github.io/app-pedidos/?url=https://script.google.com/macros/s/ID/exec
```

## Crear un APK para Android (más adelante)

Todavía no hay un APK. Cuando lo quieras, se puede empaquetar esta misma página como app de Android (TWA) con [PWABuilder](https://www.pwabuilder.com/) o [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap), usando la URL de GitHub Pages. El inicio de sesión de Google, igual que en la PWA, tiene que ocurrir en la ventana principal (no en un iframe).

## Cómo está armado

| Archivo | Para qué sirve |
| --- | --- |
| `index.html` | Pantalla de carga (logo + spinner de barras) y pantalla sin conexión |
| `config.js` | URL de la app de Apps Script y duración del splash |
| `app.js` | Si hay internet, después de ~600 ms abre la URL de Apps Script con `location.replace`. Si no, muestra **Sin conexión** |
| `styles.css` | Estilo (fondo `#121214`, acento `#E10600`, Krona One en pantallas anchas e Inter en el celular) |
| `manifest.webmanifest` | Nombre, íconos y modo `standalone` |
| `sw.js` | Cachea solo esta cáscara (versión `app-pedidos-shell-v5`). Nunca guarda el contenido de `script.google.com` |
| `img/` | Logo de Mc-LarenS y el SVG canónico del spinner de barras |
| `icons/` y `fonts/` | Íconos con el spinner Mc-LarenS (barras + M) e íconos para iPhone, más las fuentes Inter y Krona One |
