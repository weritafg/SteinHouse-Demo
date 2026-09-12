# Steinhaus Home Suites — sitio web

Sitio estático (HTML + CSS + JavaScript, sin proceso de build). Se puede subir
tal cual a cualquier hosting (Netlify, Vercel, Cloudflare Pages, o el hosting
actual de Steinhaus). El idioma principal es **español**; hay conmutador ES/EN.

```
steinhaus/
├── index.html                  Inicio
├── suites.html                 Colección de suites
├── suites/
│   ├── emilio-castelar-9.html
│   ├── homero-829.html
│   ├── palacio-de-versalles.html
│   └── hamburgo-291.html
├── zonas.html                  Polanco · Lomas · Reforma
├── nosotros.html
├── contacto.html
├── reservar.html               Sistema de reservación por pasos
├── aviso-de-privacidad.html
├── sitemap.xml · robots.txt · site.webmanifest
└── assets/
    ├── css/styles.css
    ├── fonts/                   Cormorant Garamond + Montserrat (self-hosted)
    ├── img/                     Imágenes -lg (1800px) y -md (900px)
    └── js/
        ├── config.js           ← EDITAR: teléfonos, WhatsApp, correo, redes
        ├── data.js             Suites y tarifas
        ├── i18n.js             Diccionario EN + conmutador de idioma
        ├── main.js             Navegación, animaciones, click-to-call
        ├── booking.js          Reservación por pasos
        └── contact.js          Formulario de contacto
```

## 1. Antes de publicar — `assets/js/config.js`

Este es el **único** archivo que hay que tocar para conectar el sitio con los
canales reales. Valores marcados `PENDIENTE` son de ejemplo:

| Campo | Estado | Nota |
|---|---|---|
| `phonePrimary` / `phones` | Tomado del sitio actual | Verificar numeración. Se usa la lada 55 + 8 dígitos para `tel:` (formato CDMX vigente). |
| `whatsapp` | **PENDIENTE** | Número internacional sin `+` (ej. `5215512345678`). Alimenta todos los botones de WhatsApp y el envío de reservaciones. |
| `email` | **PENDIENTE** | Correo de reservaciones. Alimenta los `mailto:` y el envío por correo. |
| `social` | Facebook y YouTube reales del sitio actual; LinkedIn es el perfil de la fundadora | Confirmar/ajustar. |
| `office.mapsQuery` | Genérico (Polanco) | Cambiar por la dirección exacta de oficina si se desea un pin preciso en Contacto. |

Los números de teléfono en `tel:` dentro del HTML también apuntan a
`+525552510814`; si cambia la línea principal, actualice `config.js` **y** haga
una búsqueda-reemplazo de `+525552510814` en los `.html`.

## 2. El sistema de reservación

`reservar.html` es un flujo de 4 pasos (fechas → zona/suite → datos → revisar).
Al final **no hay pago en línea**: arma un mensaje con todos los datos y lo abre
en **WhatsApp** (`wa.me/<whatsapp>`) o en el **correo** (`mailto:<email>`). Es
100 % del lado del navegador; no necesita servidor.

Si en el futuro se quiere disponibilidad en tiempo real o pago, hay que añadir
un backend o integrar un motor de reservas (Cloudbeds, Lodgify, etc.).

## 3. Idiomas

- El español está escrito directamente en el HTML (funciona sin JavaScript).
- El inglés vive en `assets/js/i18n.js` (objeto `EN`). Para editar un texto en
  inglés, busque su clave `data-i18n` en el HTML y cámbiela en ese objeto.
- La preferencia se guarda en `localStorage` y se respeta `?lang=en` en la URL.

## 4. Imágenes

Las fotografías actuales son **de archivo (Unsplash, licencia libre)**, elegidas
para transmitir el tono correcto. Se recomienda sustituirlas por fotografía real
de las suites Steinhaus: reemplace los archivos en `assets/img/` conservando los
nombres (`hero-lg.jpg`, `suite-castelar-md.jpg`, etc.) y las proporciones
aproximadas (héroe 3:2, tarjetas de suite 4:3, retratos 4:5).

## 5. Supuestos de contenido

Redactados a partir de steinhaus.com.mx. Puntos a validar con el cliente:

- «Negocio familiar» / «familia Steinmann»: inferido del perfil de LinkedIn de
  María Adela Hernández Prieto de Steinmann. Ajustar si no aplica.
- «+15 años» en el distintivo del inicio: cifra de marcador de posición. Cambiar
  por el dato real o quitar el distintivo (`.welcome__badge` en `index.html`).
- Las reseñas del inicio son ilustrativas (perfiles genéricos, sin nombres ni
  logotipos). Sustituir por testimonios reales cuando se tengan.
- No se copiaron cifras del sitio de referencia (número de reservas, estrellas).
- Tarifas por zona tomadas del sitio actual; Palacio de Versalles queda como
  «consultar tarifa» porque no estaba publicada.

## 6. SEO

Títulos y descripciones por página, `canonical`, `hreflang` es/en, Open Graph,
JSON-LD (`LodgingBusiness`, `ItemList`), `sitemap.xml`, `robots.txt`,
encabezados semánticos y `alt` en todas las imágenes. Actualice el dominio en
`sitemap.xml`, `robots.txt` y las etiquetas `canonical`/`og:` si el sitio no
vive en `https://www.steinhaus.com.mx/`.

## 7. Ver el sitio en local

```bash
cd steinhaus
python3 -m http.server 8080
# abrir http://localhost:8080
```
