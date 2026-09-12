/* ============================================================
   STEINHAUS — Datos de suites (fuente única)
   Tarifas tomadas de steinhaus.com.mx — VERIFICAR antes de publicar.
   ============================================================ */
window.STEINHAUS_DATA = {
  zones: [
    { id: "polanco", es: "Polanco", en: "Polanco" },
    { id: "lomas", es: "Lomas de Chapultepec", en: "Lomas de Chapultepec" },
    { id: "reforma", es: "Reforma", en: "Reforma" }
  ],
  suites: [
    {
      id: "castelar",
      zone: "polanco",
      addr: "Emilio Castelar 9",
      es: "Emilio Castelar 9 · Polanco",
      en: "Emilio Castelar 9 · Polanco",
      rateFrom: 1400,
      rateEs: "Desde $1,400 MXN / noche",
      rateEn: "From $1,400 MXN / night",
      units: "Suites 1, 4, 9 y 10"
    },
    {
      id: "homero",
      zone: "polanco",
      addr: "Homero 829",
      es: "Homero 829 · Polanco",
      en: "Homero 829 · Polanco",
      rateFrom: 1500,
      rateEs: "$1,500 MXN / noche",
      rateEn: "$1,500 MXN / night",
      units: "Suites 2, 3, 6, 7 y 9"
    },
    {
      id: "versalles",
      zone: "lomas",
      addr: "Palacio de Versalles",
      es: "Palacio de Versalles · Lomas de Chapultepec",
      en: "Palacio de Versalles · Lomas de Chapultepec",
      rateFrom: null,
      rateEs: "Consultar tarifa",
      rateEn: "Rate on request",
      units: "Suites 1 a 4"
    },
    {
      id: "hamburgo",
      zone: "reforma",
      addr: "Hamburgo 291",
      es: "Hamburgo 291 · Reforma",
      en: "Hamburgo 291 · Reforma",
      rateFrom: 1100,
      rateEs: "Desde $1,100 MXN / noche",
      rateEn: "From $1,100 MXN / night",
      units: "Suites 2A, 3A, 3B, 4, 5A, 5B y 7"
    }
  ]
};
