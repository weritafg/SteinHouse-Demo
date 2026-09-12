/* ============================================================
   STEINHAUS — Configuración de contacto
   ------------------------------------------------------------
   Edite SOLO este archivo para conectar el sitio con los
   canales reales de Steinhaus. Los valores marcados PENDIENTE
   son de ejemplo y deben sustituirse antes de publicar.
   ============================================================ */
window.SITE_CONFIG = {
  /* Número para "click-to-call" y encabezado. Tomado del sitio actual
     (numeración histórica CDMX + lada 55). VERIFICAR. */
  phonePrimary: { display: "55 5251 0814", tel: "+525552510814" },

  /* Todas las líneas publicadas en steinhaus.com.mx. VERIFICAR. */
  phones: [
    { display: "55 5251 0814", tel: "+525552510814" },
    { display: "55 5251 1079", tel: "+525552511079" },
    { display: "55 5245 1741", tel: "+525552451741" },
    { display: "55 5596 4240", tel: "+525555964240" }
  ],

  /* PENDIENTE — WhatsApp de reservaciones (formato internacional, sin "+"). */
  whatsapp: "525500000000",

  /* PENDIENTE — correo de reservaciones. */
  email: "reservaciones@steinhaus.com.mx",

  social: {
    facebook: "https://www.facebook.com/steinhaus.homesuites",
    linkedin: "https://www.linkedin.com/in/mar%C3%ADa-adela-hern%C3%A1ndez-prieto-de-steinmann",
    youtube: "https://www.youtube.com/channel/UC45tXg6qWgmluVjR5YTtYKQ"
  },

  /* Oficina / referencia para el mapa. PENDIENTE de confirmar dirección exacta. */
  office: {
    label: "Polanco, Miguel Hidalgo, Ciudad de México",
    mapsQuery: "Polanco,Ciudad+de+Mexico"
  }
};
