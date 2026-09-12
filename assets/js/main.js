/* ============================================================
   STEINHAUS — Interacción general
   ============================================================ */
(function () {
  "use strict";
  var cfg = window.SITE_CONFIG || {};
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Rellenar datos de contacto desde config.js ---------- */
  function fillContact() {
    document.querySelectorAll("a[data-cfg-tel]").forEach(function (a) {
      a.href = "tel:" + cfg.phonePrimary.tel;
    });
    document.querySelectorAll("[data-cfg-tel-display]").forEach(function (el) {
      el.textContent = cfg.phonePrimary.display;
    });
    document.querySelectorAll("[data-cfg-wa]").forEach(function (a) {
      a.href = "https://wa.me/" + cfg.whatsapp;
    });
    document.querySelectorAll("[data-cfg-email]").forEach(function (a) {
      a.href = "mailto:" + cfg.email;
      if (a.dataset.cfgEmail === "display") a.textContent = cfg.email;
    });
    document.querySelectorAll("[data-cfg-social]").forEach(function (a) {
      var k = a.dataset.cfgSocial;
      if (cfg.social && cfg.social[k]) a.href = cfg.social[k];
    });
    var list = document.querySelector("[data-cfg-phone-list]");
    if (list && cfg.phones) {
      list.innerHTML = cfg.phones.map(function (p) {
        return '<li><a href="tel:' + p.tel + '">' + p.display + "</a></li>";
      }).join("");
    }
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ---------- Encabezado: estado sólido al hacer scroll ---------- */
  function header() {
    var h = document.querySelector(".header");
    if (!h) return;
    var over = h.classList.contains("header--over");
    var videoHero = document.querySelector("[data-video-hero]");
    var threshold;
    function computeThreshold() {
      /* Con héroe de video pineado, el encabezado se mantiene transparente
         mientras dure todo el scrub, no sólo el primer viewport. */
      if (videoHero) return videoHero.offsetHeight - window.innerHeight * 1.1;
      return over ? Math.min(window.innerHeight * 0.7, 560) : 8;
    }
    threshold = computeThreshold();
    function update() {
      var solid = window.scrollY > threshold;
      h.classList.toggle("header--solid", solid);
      if (over) h.classList.toggle("header--over", !solid);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", function () { threshold = computeThreshold(); }, { passive: true });
  }

  /* ---------- Menú móvil ---------- */
  function mobileNav() {
    var btn = document.querySelector(".navtoggle");
    var nav = document.querySelector(".header__nav");
    if (!btn || !nav) return;
    btn.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      btn.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        document.body.classList.remove("nav-open");
        btn.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 860 && document.body.classList.contains("nav-open")) {
        document.body.classList.remove("nav-open");
        btn.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }

  /* ---------- Revelado al hacer scroll ---------- */
  function reveals() {
    var els = document.querySelectorAll(".reveal, .reveal-stagger, .rule");
    if (!els.length) return;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });

    /* Failsafe: nada debe quedar invisible si el observer no dispara */
    setTimeout(function () {
      els.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("in");
      });
    }, 2500);
  }

  /* ---------- Entrada del héroe ---------- */
  function hero() {
    var block = document.querySelector(".reveal-hero");
    if (!block) return;
    if (reduce) { block.classList.add("go"); return; }
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { block.classList.add("go"); });
    });
  }

  /* ---------- Botón flotante de llamada ---------- */
  function callFab() {
    var fab = document.querySelector(".callfab");
    if (!fab) return;
    function update() { fab.classList.toggle("show", window.scrollY > window.innerHeight * 0.6); }
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* ---------- Conservar el idioma al navegar entre páginas ---------- */
  function preserveLangOnNav() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href]');
      if (!a) return;
      var href = a.getAttribute("href");
      if (!href || /^(#|mailto:|tel:|https?:\/\/)/.test(href)) return;
      var lang = (window.STEINHAUS_I18N && window.STEINHAUS_I18N.current()) || "es";
      if (lang !== "en") return;
      if (href.indexOf("lang=") > -1) return;
      var hash = "";
      var hi = href.indexOf("#");
      if (hi > -1) { hash = href.slice(hi); href = href.slice(0, hi); }
      a.setAttribute("href", href + (href.indexOf("?") > -1 ? "&" : "?") + "lang=en" + hash);
    });
  }

  function init() {
    fillContact();
    document.addEventListener("langchange", fillContact);
    header();
    mobileNav();
    reveals();
    hero();
    callFab();
    preserveLangOnNav();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
