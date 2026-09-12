/* ============================================================
   STEINHAUS — Calendario de rango de fechas (paso 1 de la reserva)
   Componente propio en JS puro: dos meses, selección de rango,
   vista previa al pasar el cursor. Sin dependencias.
   Escribe en los <input type="hidden" name="checkin"/"checkout">
   que booking.js ya sabe leer.

   El grid de días sólo se reconstruye al cambiar de mes o de
   idioma. Elegir una fecha o pasar el cursor sólo actualiza las
   clases de los botones ya existentes — nunca los recrea. Antes,
   cada movimiento del mouse reconstruía los ~70 botones del
   calendario (con su innerHTML) y además reescribía los campos
   ocultos y disparaba sus eventos, lo que causaba el "lag" y la
   selección que parpadeaba/desaparecía al pasar el cursor.
   ============================================================ */
(function () {
  "use strict";
  var root = document.querySelector("[data-calendar]");
  if (!root) return;

  var monthsEl = root.querySelector("[data-cal-months]");
  var prevBtn = root.querySelector("[data-cal-prev]");
  var nextBtn = root.querySelector("[data-cal-next]");
  var summaryEl = root.querySelector("[data-cal-summary]");
  var clearBtn = root.querySelector("[data-cal-clear]");
  var form = root.closest("form");
  var inputIn = form.querySelector('[name="checkin"]');
  var inputOut = form.querySelector('[name="checkout"]');

  var MS_DAY = 86400000;
  function today() { var d = new Date(); d.setHours(0, 0, 0, 0); return d; }
  function iso(d) {
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function parseIso(s) {
    if (!s) return null;
    var p = s.split("-").map(Number);
    return new Date(p[0], p[1] - 1, p[2]);
  }
  function sameDay(a, b) { return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }

  var T = {
    es: {
      months: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
      wd: ["Lu","Ma","Mi","Ju","Vi","Sá","Do"],
      pick: "Elija su llegada",
      pickOut: "Ahora elija su salida",
      range: function (a, b, n) { return fmt(a) + " – " + fmt(b) + " · " + n + (n === 1 ? " noche" : " noches"); },
      clear: "Borrar"
    },
    en: {
      months: ["January","February","March","April","May","June","July","August","September","October","November","December"],
      wd: ["Mo","Tu","We","Th","Fr","Sa","Su"],
      pick: "Pick your check-in",
      pickOut: "Now pick your check-out",
      range: function (a, b, n) { return fmt(a) + " – " + fmt(b) + " · " + n + " " + (n === 1 ? "night" : "nights"); },
      clear: "Clear"
    }
  };
  function lang() { return (window.STEINHAUS_I18N && window.STEINHAUS_I18N.current()) || "es"; }
  function t() { return T[lang()] || T.es; }
  function fmt(d) { return d.getDate() + " " + t().months[d.getMonth()].slice(0, 3); }

  var min = today();
  var view = new Date(min.getFullYear(), min.getMonth(), 1);
  var start = null, end = null, hover = null;
  var dayButtons = []; /* {el, date} de los botones actualmente en el DOM */

  /* Prefill desde los inputs (por si ya llevan valor) */
  (function prefill() {
    var a = parseIso(inputIn.value), b = parseIso(inputOut.value);
    if (a) start = a;
    if (b) end = b;
    if (start) view = new Date(start.getFullYear(), start.getMonth(), 1);
  })();

  function monthLabel(d) { return t().months[d.getMonth()] + " " + d.getFullYear(); }

  function dayState(d) {
    var cls = [];
    if (sameDay(d, today())) cls.push("cal-day--today");
    var rangeEnd = end || hover;
    if (start && rangeEnd && rangeEnd >= start) {
      if (sameDay(d, start) && sameDay(d, rangeEnd)) cls.push("cal-day--single");
      else if (sameDay(d, start)) cls.push("cal-day--start");
      else if (sameDay(d, rangeEnd)) cls.push("cal-day--end");
      else if (d > start && d < rangeEnd) cls.push("cal-day--range");
    } else if (start && sameDay(d, start)) {
      cls.push("cal-day--single");
    }
    return cls;
  }

  /* Construye la cuadrícula de un mes (caro: sólo al navegar o cambiar idioma) */
  function buildMonth(monthDate) {
    var wrap = document.createElement("div");
    wrap.className = "cal-month";
    var title = document.createElement("p");
    title.className = "cal-month__title";
    title.textContent = monthLabel(monthDate);
    wrap.appendChild(title);

    var grid = document.createElement("div");
    grid.className = "cal-grid";
    t().wd.forEach(function (w) {
      var el = document.createElement("span");
      el.className = "cal-weekday";
      el.textContent = w;
      grid.appendChild(el);
    });

    var first = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
    var startOffset = (first.getDay() + 6) % 7; /* semana inicia en lunes */
    var daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate();

    for (var i = 0; i < startOffset; i++) {
      var blank = document.createElement("span");
      blank.className = "cal-day cal-day--blank";
      grid.appendChild(blank);
    }
    for (var day = 1; day <= daysInMonth; day++) {
      var d = new Date(monthDate.getFullYear(), monthDate.getMonth(), day);
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "cal-day";
      btn.textContent = String(day);
      if (d < min) btn.disabled = true;
      btn.setAttribute("aria-label", d.toDateString());
      btn.addEventListener("click", function (dd) { return function () { pick(dd); }; }(d));
      btn.addEventListener("mouseenter", function (dd) {
        return function () { if (start && !end) { hover = dd; applyStates(); } };
      }(d));
      grid.appendChild(btn);
      dayButtons.push({ el: btn, date: d });
    }
    wrap.appendChild(grid);
    return wrap;
  }

  /* Reconstruye ambos meses — sólo al navegar, cambiar idioma o inicializar */
  function buildMonths() {
    dayButtons = [];
    monthsEl.innerHTML = "";
    var next = new Date(view.getFullYear(), view.getMonth() + 1, 1);
    monthsEl.appendChild(buildMonth(view));
    monthsEl.appendChild(buildMonth(next));
    prevBtn.disabled = view.getFullYear() === min.getFullYear() && view.getMonth() === min.getMonth();
    applyStates();
  }

  /* Sólo actualiza las clases de los botones ya existentes — barato,
     seguro de llamar en cada movimiento del cursor. */
  function applyStates() {
    for (var i = 0; i < dayButtons.length; i++) {
      var item = dayButtons[i];
      var cls = dayState(item.date);
      item.el.className = cls.length ? "cal-day " + cls.join(" ") : "cal-day";
    }
  }

  function pick(d) {
    if (!start || (start && end)) {
      start = d; end = null; hover = null;
    } else if (d < start) {
      start = d; end = null;
    } else {
      end = d;
    }
    applyStates();
    sync();
  }

  function sync() {
    inputIn.value = start ? iso(start) : "";
    inputOut.value = end ? iso(end) : "";
    ["input", "change"].forEach(function (type) {
      inputIn.dispatchEvent(new Event(type, { bubbles: true }));
      inputOut.dispatchEvent(new Event(type, { bubbles: true }));
    });
    root.classList.remove("field--invalid");
    if (start && end) {
      var nights = Math.round((end - start) / MS_DAY);
      summaryEl.innerHTML = "<b>" + t().range(start, end, nights) + "</b>";
    } else if (start) {
      summaryEl.textContent = t().pickOut;
    } else {
      summaryEl.textContent = t().pick;
    }
  }

  prevBtn.addEventListener("click", function () {
    view = new Date(view.getFullYear(), view.getMonth() - 1, 1);
    buildMonths();
  });
  nextBtn.addEventListener("click", function () {
    view = new Date(view.getFullYear(), view.getMonth() + 1, 1);
    buildMonths();
  });
  if (clearBtn) {
    clearBtn.textContent = t().clear;
    clearBtn.addEventListener("click", function () {
      start = null; end = null; hover = null;
      applyStates();
      sync();
    });
  }
  /* Al salir de la cuadrícula (no de toda la tarjeta) se apaga la vista previa */
  monthsEl.addEventListener("mouseleave", function () {
    if (hover) { hover = null; applyStates(); }
  });

  document.addEventListener("langchange", function () {
    buildMonths();
    sync();
  });

  buildMonths();
  sync();
})();
