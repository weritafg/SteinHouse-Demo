/* ============================================================
   STEINHAUS — Página de zonas: nav de distritos con scrollspy
   ============================================================ */
(function () {
  "use strict";
  var nav = document.querySelector(".district-nav");
  if (!nav) return;
  var links = Array.prototype.slice.call(nav.querySelectorAll(".district-nav__link"));
  if (!links.length) return;

  var sections = links
    .map(function (a) {
      var id = a.getAttribute("href").replace("#", "");
      return document.getElementById(id);
    })
    .filter(Boolean);

  var inner = nav.querySelector(".district-nav__inner");

  function setActive(id) {
    links.forEach(function (a) {
      var active = a.getAttribute("href") === "#" + id;
      a.classList.toggle("is-active", active);
      /* En móvil la barra se desborda horizontalmente — si la pastilla
         activa queda fuera de vista, se desliza para mantenerla visible
         (sólo si hace falta), sin mover el scroll vertical de la página. */
      if (active && inner) {
        var ir = inner.getBoundingClientRect();
        var ar = a.getBoundingClientRect();
        if (ar.left < ir.left || ar.right > ir.right) {
          a.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        }
      }
    });
  }

  setActive(sections[0] && sections[0].id);

  if ("IntersectionObserver" in window && sections.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) setActive(en.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { io.observe(s); });
  }
})();
