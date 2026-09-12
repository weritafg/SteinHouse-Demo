/* ============================================================
   STEINHAUS — Botones "magnéticos"
   Un detalle discreto y hecho a mano: los botones de ancho fijo
   siguen levemente al cursor dentro de su propia área y sueltan
   con un resorte suave al salir. Nada de esto toca `transform`
   directamente — sólo actualiza las variables --mx/--my que el
   propio botón ya combina con su gesto de presión en CSS
   (ver .btn en styles.css), así que nunca compiten entre sí.
   Sólo en escritorio con cursor real, y nunca con movimiento
   reducido.
   ============================================================ */
(function () {
  "use strict";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  var STRENGTH = 0.28;
  var MAX = 9; /* px — un tirón perceptible pero nunca torpe */

  document.querySelectorAll(".btn:not(.btn--block)").forEach(function (el) {
    el.addEventListener("mousemove", function (e) {
      var r = el.getBoundingClientRect();
      var mx = e.clientX - (r.left + r.width / 2);
      var my = e.clientY - (r.top + r.height / 2);
      var tx = Math.max(-MAX, Math.min(MAX, mx * STRENGTH));
      var ty = Math.max(-MAX, Math.min(MAX, my * STRENGTH));
      el.style.setProperty("--mx", tx.toFixed(1) + "px");
      el.style.setProperty("--my", ty.toFixed(1) + "px");
    });
    el.addEventListener("mouseleave", function () {
      el.style.setProperty("--mx", "0px");
      el.style.setProperty("--my", "0px");
    });
  });
})();
