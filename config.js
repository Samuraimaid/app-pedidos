/* Configuración de la App de Pedidos (PWA).
 * Cambiá defaultUrl para apuntar a otra implementación de Apps Script.
 * Para pruebas temporales también se puede usar ?url= con un enlace
 * que empiece con https://script.google.com/macros/s/
 */
window.APP_PEDIDOS_CONFIG = {
  defaultUrl:
    "https://script.google.com/macros/s/AKfycbxcRTpQp4yUua96d18Rr1BjauB4hWDYgXGtF_3egbLCuyQRcQE377BzexAQP8NYiHev/exec",
  allowedPrefix: "https://script.google.com/macros/s/",
  splashMs: 600
};
