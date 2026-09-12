/* ============================================================
   STEINHAUS — Sistema de reservación (solicitud por pasos)
   Sin pago en línea: al final abre WhatsApp o correo con la
   solicitud completa. Funciona 100% en el navegador.
   ============================================================ */
(function () {
  "use strict";
  var form = document.querySelector("[data-booking]");
  if (!form) return;

  var cfg = window.SITE_CONFIG || {};
  var DATA = window.STEINHAUS_DATA || { zones: [], suites: [] };

  var steps = Array.prototype.slice.call(form.querySelectorAll(".step"));
  var doneEl = form.querySelector(".booking-done");
  var stepperItems = Array.prototype.slice.call(document.querySelectorAll(".stepper li"));
  var summaryBox = document.querySelector("[data-booking-summary]");
  var current = 0;

  var T = {
    es: {
      any_zone: "Que Steinhaus me recomiende",
      any_suite: "Recomiéndenme una",
      pick_zone: "Seleccione una zona",
      night: "noche", nights: "noches",
      msgHead: "Solicitud de reservación — Steinhaus Home Suites",
      lIn: "Llegada", lOut: "Salida", lGuests: "Huéspedes", lAdults: "Adultos",
      lChildren: "Menores", lZone: "Zona", lSuite: "Suite", lName: "Nombre",
      lEmail: "Correo", lPhone: "Teléfono / WhatsApp", lCompany: "Empresa",
      lNotes: "Notas", notSet: "Por definir",
      required: "Este campo es obligatorio",
      bademail: "Escriba un correo válido",
      baddates: "La salida debe ser posterior a la llegada"
    },
    en: {
      any_zone: "Steinhaus can recommend",
      any_suite: "Recommend one for me",
      pick_zone: "Select a neighborhood",
      night: "night", nights: "nights",
      msgHead: "Reservation request — Steinhaus Home Suites",
      lIn: "Check-in", lOut: "Check-out", lGuests: "Guests", lAdults: "Adults",
      lChildren: "Children", lZone: "Neighborhood", lSuite: "Suite", lName: "Name",
      lEmail: "Email", lPhone: "Phone / WhatsApp", lCompany: "Company",
      lNotes: "Notes", notSet: "To be defined",
      required: "This field is required",
      bademail: "Enter a valid email",
      baddates: "Check-out must be after check-in"
    }
  };
  function lang() { return (window.STEINHAUS_I18N && window.STEINHAUS_I18N.current()) || "es"; }
  function t() { return T[lang()] || T.es; }

  /* ---------- Poblar selects ---------- */
  var zoneSel = form.querySelector('[name="zone"]');
  var suiteSel = form.querySelector('[name="suite"]');

  function fillZones(keepValue) {
    var l = lang();
    var prev = keepValue && zoneSel.value;
    zoneSel.innerHTML = DATA.zones.map(function (z) { return '<option value="' + z.id + '">' + z[l] + "</option>"; }).join("");
    if (prev) zoneSel.value = prev;
  }
  function fillSuites(keepValue) {
    var l = lang();
    var prev = keepValue && suiteSel.value;
    var z = zoneSel.value;
    var list = DATA.suites.filter(function (s) { return !z || s.zone === z; });
    suiteSel.innerHTML = list.map(function (s) { return '<option value="' + s.id + '">' + s[l] + "</option>"; }).join("");
    if (prev && list.some(function (s) { return s.id === prev; })) suiteSel.value = prev;
  }
  fillZones();
  fillSuites();
  /* La suite manda: elegirla ajusta la zona. Elegir zona ofrece sus suites
     y selecciona la primera — nunca queda "sin definir". */
  zoneSel.addEventListener("change", function () { fillSuites(); syncSummary(); });
  suiteSel.addEventListener("change", function () {
    var s = DATA.suites.find(function (x) { return x.id === suiteSel.value; });
    if (s && s.zone !== zoneSel.value) { zoneSel.value = s.zone; fillSuites(true); suiteSel.value = s.id; }
    syncSummary();
  });

  /* ---------- Prefill desde URL ---------- */
  (function prefill() {
    var q = new URLSearchParams(location.search);
    var qZone = q.get("zone");
    if (qZone && DATA.zones.some(function (z) { return z.id === qZone; })) {
      zoneSel.value = qZone;
      fillSuites();
    }
    if (q.get("suite")) {
      var s = DATA.suites.find(function (x) { return x.id === q.get("suite"); });
      if (s) { zoneSel.value = s.zone; fillSuites(); suiteSel.value = s.id; }
    }
    if (q.get("in")) setVal("checkin", q.get("in"));
    if (q.get("out")) setVal("checkout", q.get("out"));
  })();
  function setVal(name, v) { var el = form.querySelector('[name="' + name + '"]'); if (el) el.value = v; }
  function getVal(name) { var el = form.querySelector('[name="' + name + '"]'); return el ? el.value.trim() : ""; }

  /* fecha mínima = hoy */
  var today = new Date().toISOString().split("T")[0];
  form.querySelectorAll('input[type="date"]').forEach(function (d) { d.min = today; });

  /* ---------- Validación ---------- */
  function fieldError(el, msg) {
    var wrap = el.closest(".field") || el.closest("[data-calendar]");
    if (!wrap) return;
    wrap.classList.toggle("field--invalid", !!msg);
    var box = wrap.querySelector(".field__error") || document.querySelector("[data-cal-error]");
    if (box) {
      if (msg) box.textContent = msg;
      box.style.display = msg ? "block" : "none";
    }
  }
  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  function validateStep(i) {
    var ok = true;
    var scope = steps[i];
    scope.querySelectorAll("[required]").forEach(function (el) {
      if (!el.value.trim()) { fieldError(el, t().required); ok = false; }
      else if (el.type === "email" && !validEmail(el.value.trim())) { fieldError(el, t().bademail); ok = false; }
      else fieldError(el, "");
    });
    if (i === 0) {
      var ci = getVal("checkin"), co = getVal("checkout");
      if (ci && co && co <= ci) {
        fieldError(form.querySelector('[name="checkout"]'), t().baddates);
        ok = false;
      }
    }
    if (!ok) {
      var firstBad = scope.querySelector(".field--invalid");
      if (firstBad) firstBad.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return ok;
  }

  form.querySelectorAll("input, select, textarea").forEach(function (el) {
    el.addEventListener("input", function () { fieldError(el, ""); syncSummary(); });
  });

  /* ---------- Navegación entre pasos ---------- */
  function show(i, opts) {
    current = i;
    steps.forEach(function (s, idx) {
      if (idx === i) s.setAttribute("data-active", ""); else s.removeAttribute("data-active");
    });
    if (doneEl) doneEl.removeAttribute("data-active");
    stepperItems.forEach(function (li, idx) {
      li.setAttribute("data-state", idx < i ? "done" : idx === i ? "active" : "");
    });
    if (!opts || opts.scroll !== false) {
      var top = form.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top: top, behavior: "smooth" });
    }
    if (i === steps.length - 1) renderReview();
  }

  form.addEventListener("click", function (e) {
    var next = e.target.closest("[data-next]");
    var back = e.target.closest("[data-back]");
    var edit = e.target.closest("[data-edit]");
    if (next) { e.preventDefault(); if (validateStep(current)) show(Math.min(current + 1, steps.length - 1)); }
    if (back) { e.preventDefault(); show(Math.max(current - 1, 0)); }
    if (edit) { e.preventDefault(); show(parseInt(edit.dataset.edit, 10)); }
  });

  /* ---------- Resumen (aside) ---------- */
  function labelZone() {
    var l = lang();
    var z = DATA.zones.find(function (x) { return x.id === zoneSel.value; });
    return z ? z[l] : t().any_zone;
  }
  function labelSuite() {
    var l = lang();
    var s = DATA.suites.find(function (x) { return x.id === suiteSel.value; });
    return s ? s[l] : t().any_suite;
  }
  function nightsCount() {
    var ci = getVal("checkin"), co = getVal("checkout");
    if (!ci || !co) return null;
    var d = (new Date(co) - new Date(ci)) / 86400000;
    return d > 0 ? d : null;
  }
  function guestsLabel() {
    var a = getVal("adults") || "1", c = getVal("children") || "0";
    return a + " · " + c;
  }

  function syncSummary() {
    if (!summaryBox) return;
    var n = nightsCount();
    var rows = [
      [t().lIn, getVal("checkin") || "—"],
      [t().lOut, getVal("checkout") || "—"],
      [t().lGuests, (getVal("adults") || "1") + " + " + (getVal("children") || "0")],
      [t().lZone, labelZone()],
      [t().lSuite, labelSuite()]
    ];
    if (n) rows.push([lang() === "en" ? "Length" : "Duración", n + " " + (n === 1 ? t().night : t().nights)]);
    summaryBox.innerHTML =
      "<dl>" +
      rows.map(function (r) { return "<div><dt>" + r[0] + "</dt><dd>" + r[1] + "</dd></div>"; }).join("") +
      "</dl>";
  }

  /* ---------- Revisión (paso 4) ---------- */
  function renderReview() {
    var box = form.querySelector("[data-review]");
    if (!box) return;
    var rows = [
      [t().lIn, getVal("checkin") || t().notSet, 0],
      [t().lOut, getVal("checkout") || t().notSet, 0],
      [t().lAdults, getVal("adults") || "1", 0],
      [t().lChildren, getVal("children") || "0", 0],
      [t().lZone, labelZone(), 1],
      [t().lSuite, labelSuite(), 1],
      [t().lName, getVal("name") || t().notSet, 2],
      [t().lEmail, getVal("email") || t().notSet, 2],
      [t().lPhone, getVal("phone") || t().notSet, 2],
      [t().lCompany, getVal("company") || "—", 2],
      [t().lNotes, getVal("notes") || "—", 2]
    ];
    var editWord = (window.STEINHAUS_I18N.EN && lang() === "en") ? "Edit" : "Editar";
    box.innerHTML = rows.map(function (r) {
      return "<div><dt>" + r[0] + "</dt><dd>" + escapeHtml(r[1]) +
        ' <button type="button" data-edit="' + r[2] + '">' + editWord + "</button></dd></div>";
    }).join("");
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- Construir mensaje ---------- */
  function buildMessage() {
    var d = t();
    var n = nightsCount();
    var lines = [
      d.msgHead,
      "",
      d.lIn + ": " + (getVal("checkin") || d.notSet),
      d.lOut + ": " + (getVal("checkout") || d.notSet)
    ];
    if (n) lines.push((lang() === "en" ? "Length" : "Duración") + ": " + n + " " + (n === 1 ? d.night : d.nights));
    lines.push(
      d.lGuests + ": " + (getVal("adults") || "1") + " " + d.lAdults.toLowerCase() +
        ", " + (getVal("children") || "0") + " " + d.lChildren.toLowerCase(),
      d.lZone + ": " + labelZone(),
      d.lSuite + ": " + labelSuite(),
      "",
      d.lName + ": " + (getVal("name") || d.notSet),
      d.lEmail + ": " + (getVal("email") || d.notSet),
      d.lPhone + ": " + (getVal("phone") || d.notSet)
    );
    if (getVal("company")) lines.push(d.lCompany + ": " + getVal("company"));
    if (getVal("notes")) lines.push("", d.lNotes + ": " + getVal("notes"));
    return lines.join("\n");
  }

  function openWhatsApp() {
    var url = "https://wa.me/" + cfg.whatsapp + "?text=" + encodeURIComponent(buildMessage());
    window.open(url, "_blank", "noopener");
  }
  function openEmail() {
    var subj = t().msgHead;
    var url = "mailto:" + cfg.email + "?subject=" + encodeURIComponent(subj) +
      "&body=" + encodeURIComponent(buildMessage());
    window.location.href = url;
  }

  /* ---------- Envío ---------- */
  form.addEventListener("submit", function (e) { e.preventDefault(); });

  form.addEventListener("click", function (e) {
    if (e.target.closest("[data-send-wa]")) {
      e.preventDefault();
      if (!validateStep(current)) return;
      showDone();
      openWhatsApp();
    }
    if (e.target.closest("[data-send-email]")) {
      e.preventDefault();
      if (!validateStep(current)) return;
      showDone();
      openEmail();
    }
    if (e.target.closest("[data-done-wa]")) { e.preventDefault(); openWhatsApp(); }
    if (e.target.closest("[data-done-email]")) { e.preventDefault(); openEmail(); }
  });

  function showDone() {
    steps.forEach(function (s) { s.removeAttribute("data-active"); });
    if (doneEl) doneEl.setAttribute("data-active", "");
    stepperItems.forEach(function (li) { li.setAttribute("data-state", "done"); });
    if (doneEl) doneEl.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  document.addEventListener("langchange", function () {
    fillZones(true);
    fillSuites(true);
    syncSummary();
    if (current === steps.length - 1) renderReview();
  });

  syncSummary();
  show(0, { scroll: false });
})();
