/* ============================================================
   STEINHAUS — Formulario de contacto (correo / WhatsApp)
   ============================================================ */
(function () {
  "use strict";
  var form = document.querySelector("[data-contact-form]");
  if (!form) return;
  var cfg = window.SITE_CONFIG || {};

  function lang() { return (window.STEINHAUS_I18N && window.STEINHAUS_I18N.current()) || "es"; }
  function val(n) { var e = form.querySelector('[name="' + n + '"]'); return e ? e.value.trim() : ""; }
  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  function setError(el, on) {
    var w = el.closest(".field");
    if (w) w.classList.toggle("field--invalid", on);
  }
  function validate() {
    var ok = true;
    var name = form.querySelector('[name="name"]');
    var email = form.querySelector('[name="email"]');
    if (!name.value.trim()) { setError(name, true); ok = false; } else setError(name, false);
    if (!validEmail(email.value.trim())) { setError(email, true); ok = false; } else setError(email, false);
    if (!ok) {
      var bad = form.querySelector(".field--invalid");
      if (bad) bad.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return ok;
  }

  form.querySelectorAll("input,select,textarea").forEach(function (el) {
    el.addEventListener("input", function () { setError(el, false); });
  });

  var L = {
    es: { head: "Solicitud — Steinhaus Home Suites", name: "Nombre", email: "Correo", phone: "Teléfono", zone: "Zona", inn: "Llegada", msg: "Mensaje", none: "—", any: "Que Steinhaus me recomiende" },
    en: { head: "Request — Steinhaus Home Suites", name: "Name", email: "Email", phone: "Phone", zone: "Neighborhood", inn: "Arrival", msg: "Message", none: "—", any: "Steinhaus can recommend" }
  };

  function zoneLabel() {
    var v = val("zone");
    if (!v) return (L[lang()] || L.es).any;
    return { polanco: "Polanco", lomas: "Lomas de Chapultepec", reforma: "Reforma" }[v] || v;
  }

  function message() {
    var d = L[lang()] || L.es;
    var lines = [
      d.head, "",
      d.name + ": " + (val("name") || d.none),
      d.email + ": " + (val("email") || d.none),
      d.phone + ": " + (val("phone") || d.none),
      d.zone + ": " + zoneLabel(),
      d.inn + ": " + (val("checkin") || d.none)
    ];
    if (val("notes")) lines.push("", d.msg + ": " + val("notes"));
    return lines.join("\n");
  }

  form.querySelector("[data-contact-send-email]").addEventListener("click", function () {
    if (!validate()) return;
    window.location.href = "mailto:" + cfg.email +
      "?subject=" + encodeURIComponent((L[lang()] || L.es).head) +
      "&body=" + encodeURIComponent(message());
  });
  form.querySelector("[data-contact-send-wa]").addEventListener("click", function () {
    if (!validate()) return;
    window.open("https://wa.me/" + cfg.whatsapp + "?text=" + encodeURIComponent(message()), "_blank", "noopener");
  });
})();
