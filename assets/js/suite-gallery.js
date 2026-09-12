/* ============================================================
   STEINHAUS — Galería enmarcada de la suite (carrusel simple)
   ============================================================ */
(function () {
  "use strict";
  var box = document.querySelector("[data-suite-gallery]");
  if (!box) return;

  var wrap = box.closest(".suite-gallery") || box;
  var slides = Array.prototype.slice.call(box.querySelectorAll("[data-gallery-slide]"));
  var dots = Array.prototype.slice.call(box.querySelectorAll("[data-gallery-dot]"));
  var thumbs = Array.prototype.slice.call(wrap.querySelectorAll("[data-gallery-thumb]"));
  var prev = box.querySelector("[data-gallery-prev]");
  var next = box.querySelector("[data-gallery-next]");
  var i = 0;

  function show(n) {
    i = (n + slides.length) % slides.length;
    slides.forEach(function (s, idx) { s.classList.toggle("on", idx === i); });
    dots.forEach(function (d, idx) { d.classList.toggle("on", idx === i); });
    thumbs.forEach(function (t, idx) { t.classList.toggle("on", idx === i); });
  }

  if (prev) prev.addEventListener("click", function () { show(i - 1); });
  if (next) next.addEventListener("click", function () { show(i + 1); });
  dots.forEach(function (d, idx) { d.addEventListener("click", function () { show(idx); }); });
  thumbs.forEach(function (t, idx) { t.addEventListener("click", function () { show(idx); }); });

  /* Autoplay suave, en pausa mientras el usuario interactúa o prefiere menos movimiento */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var timer;
  function start() {
    if (reduce || slides.length < 2) return;
    stop();
    timer = setInterval(function () { show(i + 1); }, 5500);
  }
  function stop() { if (timer) clearInterval(timer); }
  wrap.addEventListener("mouseenter", stop);
  wrap.addEventListener("mouseleave", start);
  wrap.addEventListener("focusin", stop);
  wrap.addEventListener("focusout", start);
  start();
})();
