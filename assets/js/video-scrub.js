/* ============================================================
   STEINHAUS — Héroe de video que avanza con el scroll
   El video no se reproduce solo: su fotograma se controla por la
   posición de scroll dentro de una sección "pineada" (position:
   sticky), como en las páginas de producto de Apple.

   El avance se suaviza con una interpolación (lerp) en un bucle
   de requestAnimationFrame: en vez de saltar de golpe al punto
   exacto del scroll (lo que fuerza al video a buscar un
   keyframe lejano y se siente brusco), cada fotograma se acerca
   un poco más al objetivo. Eso convierte los saltos grandes en
   muchos saltos pequeños y consecutivos, que el video puede
   buscar con mucha más fluidez.

   Con prefers-reduced-motion, el CSS ya des-activa el pin y esto
   no hace nada más que mostrar el primer fotograma.
   ============================================================ */
(function () {
  "use strict";
  var wrap = document.querySelector("[data-video-hero]");
  if (!wrap) return;
  var pin = wrap.querySelector(".video-hero__pin");
  var video = wrap.querySelector("[data-scrub-video]");
  if (!video) return;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var mobile = window.matchMedia("(max-width: 640px)").matches;
  video.pause();

  var duration = 0;
  function onMeta() { duration = video.duration || 0; }
  if (video.readyState >= 1 && video.duration) onMeta();
  video.addEventListener("loadedmetadata", onMeta);

  if (reduce) return; /* héroe estático de 88vh, ver CSS — sin pin ni scrub */

  /* Muchos navegadores móviles no pintan ningún fotograma al hacer
     seek() en un <video> que nunca llegó a reproducirse — se queda
     transparente y sólo se ve la capa de degradado encima. Reproducir
     y pausar de inmediato "activa" el decodificador una sola vez, así
     los saltos de fotograma por scroll sí se muestran después. */
  var primed = false;
  function prime() {
    if (primed || video.readyState < 2) return;
    primed = true;
    var p = video.play();
    if (p && p.then) p.then(function () { video.pause(); }).catch(function () {});
    else video.pause();
  }
  if (video.readyState >= 2) prime();
  else video.addEventListener("loadeddata", prime, { once: true });

  var target = 0;      /* progreso 0–1 según el scroll, se actualiza al instante */
  var rendered = -1;    /* progreso realmente aplicado al video, se acerca poco a poco */
  var lastSeek = -1;
  var raf = null;

  /* En móvil el decodificador de video es más lento para saltar a un
     fotograma arbitrario. En vez de quitar el scroll-scrub (se sentía
     distinto al de escritorio), se busca con menos frecuencia — una
     tolerancia mayor entre búsquedas — para no saturarlo; el mismo
     lerp de abajo sigue suavizando el resultado visualmente. */
  var seekTolerance = mobile ? 0.12 : 0.02;

  function computeTarget() {
    var rect = wrap.getBoundingClientRect();
    var total = rect.height - window.innerHeight;
    target = total > 0 ? Math.max(0, Math.min(1, -rect.top / total)) : 0;
  }

  function loop() {
    raf = null;
    if (rendered < 0) rendered = target; /* primer fotograma: sin animar desde 0 */
    var delta = target - rendered;
    rendered += delta * 0.16;
    if (Math.abs(delta) < 0.0006) rendered = target;

    pin.style.setProperty("--p", rendered.toFixed(4));
    if (duration) {
      var tSec = rendered * duration;
      if (Math.abs(tSec - lastSeek) > seekTolerance) {
        lastSeek = tSec;
        try { video.currentTime = tSec; } catch (e) {}
      }
    }
    if (active) raf = requestAnimationFrame(loop);
  }

  var active = false;
  function onScroll() { computeTarget(); }

  function start() {
    if (active) return;
    active = true;
    computeTarget();
    if (!raf) raf = requestAnimationFrame(loop);
    window.addEventListener("scroll", onScroll, { passive: true });
  }
  function stop() {
    active = false;
    window.removeEventListener("scroll", onScroll);
  }

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { en.isIntersecting ? start() : stop(); });
    }, { threshold: 0 });
    io.observe(wrap);
  } else {
    start();
  }

  window.addEventListener("resize", computeTarget, { passive: true });
})();
