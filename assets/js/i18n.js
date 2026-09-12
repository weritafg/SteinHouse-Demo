/* ============================================================
   STEINHAUS — Bilingüe (ES predeterminado · EN alterno)
   El español vive en el HTML. Este archivo sólo aporta el
   inglés y el mecanismo de cambio.
   ============================================================ */
(function () {
  "use strict";

  var KEY = "steinhaus_lang";
  var DEFAULT = "es";

  /* Diccionario EN. Clave = valor de data-i18n.
     Si una clave no existe aquí, se conserva el español. */
  var EN = {
    /* ---- Navegación / chrome ---- */
    "nav.suites": "Rooms & Suites",
    "nav.zones": "Neighborhoods",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.book": "Reserve",
    "nav.call": "Call",
    "cta.book": "Reserve",
    "cta.viewSuite": "View suite",
    "cta.viewAll": "View all suites",
    "cta.explore": "Explore neighborhood",
    "cta.bookNow": "Book now",
    "cta.send": "Send request",
    "cta.back": "Back",
    "cta.continue": "Continue",
    "cta.talk": "Talk to us",
    "common.from": "From",
    "common.perNight": "/ night",
    "common.night": "night",
    "common.consult": "On request",
    "common.suitesWord": "suites",

    /* ---- Pie ---- */
    "footer.tag": "Furnished executive suites in Mexico City's most established neighborhoods. A family business, since the first guest.",
    "footer.explore": "Explore",
    "footer.company": "Company",
    "footer.reserve": "Reservations",
    "footer.callTitle": "Reservations line",
    "footer.hours": "Attention every day, 9:00–19:00 (CDMX)",
    "footer.directory": "Our addresses",
    "footer.rights": "All rights reserved.",
    "footer.credit": "· Powered by Red Fall Tree VA Services",
    "footer.privacy": "Privacy notice",
    "footer.madeIn": "Mexico City",
    "footer.aboutLink": "The Steinhaus story",
    "footer.zonesLink": "Neighborhoods",
    "footer.contactLink": "Contact",
    "footer.faqLink": "Reserve a suite",

    /* ---- Home: hero ---- */
    "home.meta.title": "Steinhaus Home Suites — Executive stays in Mexico City",
    "home.meta.desc": "Furnished executive suites in Polanco, Lomas de Chapultepec and Reforma. Hotel service, the space and privacy of a home. Reserve by phone or WhatsApp.",
    "home.hero.eyebrow": "Executive lodging · Mexico City",
    "home.hero.title": "Hospitality since <em>1960</em>",
    "home.hero.sub": "Executive suites in Polanco, Lomas de Chapultepec and Reforma",
    "home.hero.scroll": "Scroll to discover",

    /* ---- Home: trust ---- */
    "home.trust.1.t": "In the heart of business",
    "home.trust.1.d": "Walking distance from corporate offices, embassies and Paseo de la Reforma.",
    "home.trust.2.t": "Everything included",
    "home.trust.2.d": "Internet, utilities, parking and maintenance — no paperwork, no separate bills.",
    "home.trust.3.t": "24-hour security",
    "home.trust.3.d": "Guarded buildings, controlled access and on-site maintenance.",
    "home.trust.4.t": "Fair, transparent rates",
    "home.trust.4.d": "Nightly, weekly and monthly stays. No hidden fees.",

    /* ---- Home: welcome ---- */
    "home.welcome.h": "A stone house, in the German sense of the name",
    "home.welcome.p1": "Steinhaus — “stone house” — was founded in 1960, providing since then executive lodging services to national and international firms and embassies in Mexico City.",
    "home.welcome.p2": "Every suite sits in a residential building on a real street, with a name and a number. You are not checking into a lobby; you are arriving home.",
    "home.welcome.fact1": "Neighborhoods",
    "home.welcome.fact1v": "Polanco · Lomas · Reforma",
    "home.welcome.fact2": "Stay length",
    "home.welcome.fact2v": "From 1 night to several months",
    "home.welcome.fact3": "Clientele",
    "home.welcome.fact3v": "Firms and embassies",
    "home.welcome.badge": "Founded in",
    "home.welcome.cta": "The Steinhaus story",

    /* ---- Home: suites ---- */
    "home.suites.h": "Suites and residences",
    "home.suites.p": "Four addresses across three neighborhoods. Each suite is furnished, serviced and ready for a long stay.",

    /* ---- Home: amenities ---- */
    "home.amen.h": "Included in every suite",
    "home.amen.p": "No setup, no contracts with utility companies, no surprises. You arrive and it works.",
    "home.amen.1.t": "High-speed Wi-Fi",
    "home.amen.1.d": "Wireless internet throughout the suite, ready to work from day one.",
    "home.amen.2.t": "Unlimited gas & electricity",
    "home.amen.2.d": "No meters, no separate bills — utilities are part of the rate.",
    "home.amen.3.t": "Parking",
    "home.amen.3.d": "Access to a space in the building's garage.",
    "home.amen.4.t": "Maintenance",
    "home.amen.4.d": "A team on call for anything the suite needs during your stay.",
    "home.amen.5.t": "Welcome package",
    "home.amen.5.d": "Essentials waiting for you the moment you arrive.",
    "home.amen.6.t": "24-hour security",
    "home.amen.6.d": "Staffed lobbies and controlled access, day and night.",

    /* ---- Home: zones ---- */
    "home.zones.h": "Three neighborhoods, chosen for one reason",
    "home.zones.p": "They put you within reach of where business in Mexico City actually happens.",
    "home.zones.polanco.d": "Corporate offices, Presidente Masaryk, galleries and the best restaurants in the city.",
    "home.zones.lomas.d": "Embassies, quiet tree-lined avenues and generous, private residences.",
    "home.zones.reforma.d": "The corporate spine of the city — towers, banks and a 15-minute reach to almost anywhere.",
    "home.zones.suitesAt": "suites here",

    /* ---- Home: experience ---- */
    "home.exp.h": "An address in the city, not a room for the night",
    "home.exp.p": "Space to work, a kitchen to use, a neighborhood to belong to. Discretion is part of the service — most guests return, and many send colleagues.",
    "home.exp.cta": "Check availability",

    /* ---- Home: quotes ---- */
    "home.quotes.h": "Guests who stayed longer than planned",
    "home.q1": "Three months in Polanco and it never once felt like a hotel. The team answered every message the same day.",
    "home.q1n": "Operations Director",
    "home.q1r": "Automotive · Germany",
    "home.q2": "They had the suite ready two days early when my project moved up. That flexibility is rare.",
    "home.q2n": "Management Consultant",
    "home.q2r": "United States",
    "home.q3": "Quiet building, real kitchen, and Reforma outside the door. I've booked it three times now.",
    "home.q3n": "Regional Finance Lead",
    "home.q3r": "Bogotá, Colombia",
    "home.q4": "We relocated with two weeks' notice and everything was ready: kitchen stocked, internet working, even the towels folded.",
    "home.q4n": "Relocation Manager",
    "home.q4r": "Consulting firm · United Kingdom",
    "home.q5": "The apartment in Lomas was perfect for my family during the relocation. Real space, not a room.",
    "home.q5n": "Regional Director",
    "home.q5r": "International firm · Canada",
    "home.q6": "Six weeks of work in the city and Steinhaus felt more like a base than temporary lodging.",
    "home.q6n": "Project Engineer",
    "home.q6r": "Energy firm · Norway",
    "home.q7": "We've been sending our staff to Steinhaus for years. They've never let us down.",
    "home.q7n": "Administration Officer",
    "home.q7r": "European embassy · Mexico City",
    "home.q8": "Flawless invoicing and a single point of contact for the whole project. Our finance team appreciated it.",
    "home.q8n": "Corporate Travel Manager",
    "home.q8r": "Mexico",
    "home.q9": "Personal service makes the difference. We spoke with the same person from booking through check-out.",
    "home.q9n": "Deputy Head of Mission",
    "home.q9r": "Embassy · Mexico City",

    /* ---- Home: CTA band ---- */
    "home.cta.h": "Tell us your dates",
    "home.cta.p": "Send a request and we confirm availability the same day, in Spanish or English. No payment online — we arrange everything with you directly.",
    "home.cta.or": "Or call the reservations line",

    /* ---- Suites page ---- */
    "suites.meta.title": "Suites & residences — Steinhaus Home Suites",
    "suites.meta.desc": "Furnished executive suites in Polanco (Emilio Castelar, Homero), Lomas de Chapultepec (Palacio de Versalles) and Reforma (Hamburgo). Rates, specs and reservations.",
    "suites.hero.h": "Suites and residences",
    "suites.hero.p": "Four buildings, three neighborhoods, one standard of service. Choose by address, by neighborhood or by the length of your stay — we will help you decide.",
    "suites.intro.h": "Every suite is a real address",
    "suites.intro.p": "We don't operate a hotel with a single entrance. Each of these is an apartment in a residential building, furnished and maintained by Steinhaus, with its own doorman and its own street.",
    "suites.spec.bedrooms": "Bedrooms",
    "suites.spec.guests": "Guests",
    "suites.spec.bed": "Bed",
    "suites.spec.view": "Outlook",
    "suites.spec.kitchen": "Kitchen",
    "suites.spec.parking": "Parking",
    "suites.filterAll": "All neighborhoods",

    /* ---- Suite detail shared ---- */
    "detail.book.h": "Reserve this suite",
    "detail.book.datesIn": "Check-in",
    "detail.book.datesOut": "Check-out",
    "detail.book.guests": "Guests",
    "detail.book.cta": "Request this suite",
    "detail.book.note": "No payment now. We confirm availability the same day.",
    "detail.included.h": "What's included",
    "detail.location.h": "The neighborhood",
    "detail.nearby.h": "Nearby",
    "detail.other.h": "Other suites",
    "detail.back": "All suites",

    /* ---- Zones page ---- */
    "zones.meta.title": "Neighborhoods — Polanco, Lomas de Chapultepec, Reforma | Steinhaus",
    "zones.meta.desc": "Where Steinhaus suites are located and why: Polanco, Lomas de Chapultepec and Reforma — Mexico City's business and diplomatic core.",
    "zones.hero.h": "Where you'll be staying",
    "zones.hero.p": "Steinhaus operates in three neighborhoods only. Each was chosen because it keeps business travelers close to their meetings and safe on the walk home.",

    /* ---- About page ---- */
    "about.meta.title": "About Steinhaus Home Suites — since 1960, Mexico City",
    "about.meta.desc": "THE STEINHAUS HOME SUITES: executive lodging since 1960 for firms and embassies in Lomas de Chapultepec, Polanco and Corredor Reforma, Mexico City.",
    "about.hero.h": "The Steinhaus story",
    "about.hero.p": "Executive lodging services in Mexico City, uninterrupted since 1960.",
    "about.quote": "May all who enter as guests leave as friends.",
    "about.badge": "Founded in",
    "about.body.h1": "Founded in 1960",
    "about.body.p1": "THE STEINHAUS HOME SUITES was founded in 1960, providing, since then, executive lodging services to national and international firms and embassies in Mexico City.",
    "about.body.h2": "In the city's most exclusive areas",
    "about.body.p2": "Our suites are located in the most exclusive areas in Mexico City: Lomas de Chapultepec, Polanco and Corredor Reforma. THE STEINHAUS HOME SUITES provides you and your family a secure and comfortable atmosphere at the best corporate rates.",
    "about.body.h3": "Spacious, well-equipped apartments",
    "about.body.p3": "Our spacious one, two and three bedroom apartments are tastefully furnished and decorated. Each of our apartments includes:",
    "about.body.h4": "The best service, at a fair rate",
    "about.body.p4": "THE STEINHAUS HOME SUITES offers the best lodging service in a warm, secure and comfortable atmosphere, with a fusion of services at a fair rate and the highest quality in Mexico City.",
    "about.body.h5": "Professional, personalized and ethical service",
    "about.body.p5": "In which you will always feel at home.",
    "about.am.1": "Wireless internet",
    "about.am.2": "Fully equipped kitchen",
    "about.am.3": "Comfortable living-dining area",
    "about.am.4": "Cablevision or Sky",
    "about.am.5": "Direct phone line",
    "about.am.6": "Housekeeping service",
    "about.am.7": "Towel and linen service",
    "about.am.8": "Washer and dryer per suite",
    "about.am.9": "Laundry and ironing service",
    "about.am.10": "Hair dryer",
    "about.am.11": "Heating and air conditioning",
    "about.am.12": "Garage",
    "about.am.13": "Security",
    "about.values.1.t": "Personal",
    "about.values.1.d": "Direct dealing, not a call center. The person who takes your reservation is the person who knows your suite.",
    "about.values.2.t": "Professional",
    "about.values.2.d": "Invoicing, contracts and reporting that a company's travel and finance departments can work with.",
    "about.values.3.t": "Ethical",
    "about.values.3.d": "Transparent rates, honest availability, and your privacy treated as part of the service.",
    "about.cta.h": "Planning a long stay in Mexico City?",

    /* ---- Contact page ---- */
    "contact.meta.title": "Contact & reservations — Steinhaus Home Suites",
    "contact.meta.desc": "Reserve a Steinhaus suite in Mexico City by phone or WhatsApp, or send a request. Attention in Spanish and English, every day.",
    "contact.hero.h": "Talk to us",
    "contact.hero.p": "The fastest way to reserve is to call or write on WhatsApp. Prefer to send the details? Use the form and we reply the same day.",
    "contact.phone.h": "Reservations line",
    "contact.wa.h": "WhatsApp",
    "contact.wa.d": "Send your dates and we confirm availability.",
    "contact.email.h": "Email",
    "contact.zone.h": "Neighborhoods we serve",
    "contact.zone.d": "Polanco · Lomas de Chapultepec · Reforma, Mexico City.",
    "contact.form.h": "Send a request",
    "contact.form.name": "Full name",
    "contact.form.email": "Email",
    "contact.form.phone": "Phone / WhatsApp",
    "contact.form.zone": "Neighborhood of interest",
    "contact.form.in": "Arrival",
    "contact.form.out": "Departure",
    "contact.form.guests": "Guests",
    "contact.form.msg": "Message",
    "contact.form.msgPh": "Tell us about your stay — dates, length, company, anything that helps us prepare.",
    "contact.form.send": "Send request",
    "contact.form.wa": "Send on WhatsApp instead",

    /* ---- Booking flow ---- */
    "book.meta.title": "Reserve a suite — Steinhaus Home Suites",
    "book.meta.desc": "Request a Steinhaus suite in Mexico City in four steps. We confirm availability the same day by phone, WhatsApp or email. No online payment.",
    "book.hero.h": "Reserve a suite",
    "book.hero.p": "Four short steps. At the end you send the request by WhatsApp or email and we confirm availability the same day — there is no payment online.",
    "book.step1": "Dates & guests",
    "book.step2": "Neighborhood & suite",
    "book.step3": "Your details",
    "book.step4": "Review & send",
    "book.s1.h": "When would you like to stay?",
    "book.s1.p": "Approximate dates are fine — we'll confirm the exact availability with you.",
    "book.s2.h": "Where would you like to stay?",
    "book.s2.p": "Pick a neighborhood, then a suite. Not sure? Choose “Help me decide” and we'll advise.",
    "book.s3.h": "Who should we contact?",
    "book.s3.p": "We use this only to confirm your reservation.",
    "book.s4.h": "Review your request",
    "book.s4.p": "Check the details, then send by WhatsApp or email.",
    "book.f.in": "Check-in",
    "book.f.out": "Check-out",
    "book.f.guests": "Guests",
    "book.f.adults": "Adults",
    "book.f.children": "Children",
    "book.f.zone": "Neighborhood",
    "book.f.suite": "Suite",
    "book.f.name": "Full name",
    "book.f.email": "Email",
    "book.f.phone": "Phone / WhatsApp",
    "book.f.company": "Company (optional)",
    "book.f.notes": "Anything else we should know? (optional)",
    "book.zoneAny": "Help me decide",
    "book.suiteAny": "Recommend one for me",
    "book.sendWa": "Send by WhatsApp",
    "book.sendEmail": "Send by email",
    "book.edit": "Edit",
    "book.done.h": "Your request is ready to send",
    "book.done.p": "We open WhatsApp or your email with everything filled in. Send it and we reply the same day to confirm availability and rate.",
    "book.done.wa": "Open WhatsApp",
    "book.done.email": "Open email",
    "book.done.call": "Or call now",
    "book.err.required": "This field is required",
    "book.err.email": "Enter a valid email",
    "book.err.dates": "Check-out must be after check-in",
    "book.summary.h": "Your request",
    "book.summary.empty": "Nothing selected yet",

    /* ---- Privacy ---- */
    "priv.meta.title": "Privacy notice — Steinhaus Home Suites",
    "priv.meta.desc": "How Steinhaus Home Suites collects, uses and protects the personal data of guests and prospective guests.",
    "priv.hero.h": "Privacy notice",
    "priv.updated": "Last updated: September 2026",
    "priv.p0": "Steinhaus Home Suites (“Steinhaus”) is responsible for the processing of your personal data under Mexico's Federal Law on the Protection of Personal Data Held by Private Parties and its regulations.",
    "priv.h1": "Data we collect",
    "priv.p1": "Name, email, phone, company, and the dates and preferences of your stay. This data is collected directly from you when you request a reservation through the site form, WhatsApp, email or phone.",
    "priv.h2": "How we use it",
    "priv.p2": "To confirm availability and rate, manage your reservation and stay, issue invoices and stay in contact about your accommodation. We do not use your data for marketing without your consent and do not share it with third parties except as strictly necessary to provide the service or as required by law.",
    "priv.h3": "Your ARCO rights",
    "priv.p3": "You may access, rectify or cancel your data, or object to its processing, by writing to our contact email. We will respond within the timeframes set by law.",
    "priv.h4": "Changes to this notice",
    "priv.p4": "Any change to this notice will be published on this page.",
    "priv.p5": "<strong>Contact:</strong> <a href=\"#\" data-cfg-email=\"display\">reservaciones@steinhaus.com.mx</a> · <a href=\"tel:+525552510814\" data-cfg-tel><span data-cfg-tel-display>55 5251 0814</span></a>",

    /* ---- Misc ---- */
    "a11y.skip": "Skip to content",
    "nav.home": "Home",
    "common.night": "night",
    "zones.seeSuites": "See suites in this neighborhood",
    "zones.moreZone": "More about this neighborhood",

    /* ---- Home suite cards ---- */
    "suites.castelar.desc": "Facing Parque Lincoln, steps from Presidente Masaryk. Generous suites for working stays, with a view of the treetops.",
    "suites.castelar.s1": "1–2 bedrooms",
    "suites.castelar.s2": "2 adults, 1 child",
    "suites.castelar.s3": "Suites 1, 4, 9 & 10",
    "suites.castelar.s4": "Park view",
    "suites.homero.desc": "In the heart of corporate Polanco, ideal for a short commute to the office. Afternoon light and calm finishes.",
    "suites.homero.s1": "1 bedroom",
    "suites.homero.s2": "2 adults",
    "suites.homero.s3": "Suites 2, 3, 6, 7 & 9",
    "suites.homero.s4": "Corporate district",
    "suites.versalles.desc": "Spacious residences in one of the calmest, greenest parts of the city, among embassies and stately avenues.",
    "suites.versalles.s1": "2–3 bedrooms",
    "suites.versalles.s2": "Families & executives",
    "suites.versalles.s3": "Suites 1 to 4",
    "suites.versalles.s4": "Diplomatic district",
    "suites.hamburgo.desc": "Efficient suites a step from Paseo de la Reforma. The nimblest option for short working stays.",
    "suites.hamburgo.s1": "Studio / 1 bedroom",
    "suites.hamburgo.s2": "1–2 adults",
    "suites.hamburgo.s3": "Suites 2A to 7",
    "suites.hamburgo.s4": "On Reforma",

    /* ---- Zones page ---- */
    "zones.polanco.p1": "The corporate and cultural centre of the city. Presidente Masaryk concentrates offices, private banking, galleries and the highest density of fine dining in Mexico.",
    "zones.polanco.p2": "Our suites at Emilio Castelar 9 and Homero 829 are within walking distance of Parque Lincoln, the Auditorio Nacional and Bosque de Chapultepec.",
    "zones.polanco.n1": "Presidente Masaryk · 5 min",
    "zones.polanco.n2": "Auditorio Nacional · 10 min",
    "zones.polanco.n3": "Airport (AICM) · 30 min",
    "zones.polanco.n4": "Santa Fe · 25 min",
    "zones.lomas.p1": "The diplomatic quarter: embassies, official residences and tree-lined streets climbing up from Reforma. Quiet, private and green.",
    "zones.lomas.p2": "Palacio de Versalles offers larger residences, made for relocating families or long executive stays that need real space.",
    "zones.lomas.n1": "Paseo de la Reforma · 8 min",
    "zones.lomas.n2": "Embassy district",
    "zones.lomas.n3": "Bosque de Chapultepec · 6 min",
    "zones.lomas.n4": "Polanco · 10 min",
    "zones.reforma.p1": "The avenue that organises the city. Along Paseo de la Reforma sit the corporate towers, the banks, the law firms and the convention hotels.",
    "zones.reforma.p2": "Hamburgo 291 puts efficient suites one block from all of it — the best base for short, intense working trips.",
    "zones.reforma.n1": "Ángel de la Independencia · 5 min",
    "zones.reforma.n2": "Corporate towers · on foot",
    "zones.reforma.n3": "Zona Rosa · 3 min",
    "zones.reforma.n4": "Centro Histórico · 12 min",

    /* ---- Suite detail: Castelar ---- */
    "suiteC.meta.title": "Suite at Emilio Castelar 9, Polanco — Steinhaus Home Suites",
    "suiteC.meta.desc": "Furnished executive suite facing Parque Lincoln, Polanco. 1–2 bedrooms, from $1,400 MXN/night. Wi-Fi, utilities and parking included.",
    "suiteC.intro": "Facing Parque Lincoln and steps from Presidente Masaryk, this is Steinhaus's most requested address: generous suites, morning light and a view of the treetops. Ideal for working stays from a week to several months.",
    "suiteC.s1": "1–2 bedrooms", "suiteC.s2": "2 adults, 1 child", "suiteC.s3": "Suites 1, 4, 9 & 10", "suiteC.s4": "Parque Lincoln view",
    "suiteC.n1": "Parque Lincoln · on foot", "suiteC.n2": "Presidente Masaryk · 5 min", "suiteC.n3": "Auditorio Nacional · 10 min", "suiteC.n4": "Airport · 30 min",
    "suiteC.loc": "Polanco concentrates corporate offices, private banking and the best dining in the city. Everything essential is within walking distance.",
    "suiteC.priceNote": "From · depending on suite and season",

    /* ---- Suite detail: Homero ---- */
    "suiteH.meta.title": "Suite at Homero 829, Polanco — Steinhaus Home Suites",
    "suiteH.meta.desc": "Furnished executive suite in corporate Polanco. 1 bedroom, $1,500 MXN/night. Wi-Fi, utilities and parking included.",
    "suiteH.intro": "In the heart of corporate Polanco, for someone who wants to reach the office in minutes. Calm finishes, afternoon light and a layout made for working from home when needed.",
    "suiteH.s1": "1 bedroom", "suiteH.s2": "2 adults", "suiteH.s3": "Suites 2, 3, 6, 7 & 9", "suiteH.s4": "Corporate district",
    "suiteH.n1": "Polanco offices · on foot", "suiteH.n2": "Presidente Masaryk · 6 min", "suiteH.n3": "Parque América · 4 min", "suiteH.n4": "Airport · 30 min",
    "suiteH.loc": "The part of Polanco where the firms and corporate headquarters are. Short commutes, everything close.",
    "suiteH.priceNote": "Nightly rate",

    /* ---- Suite detail: Versalles ---- */
    "suiteV.meta.title": "Residence at Palacio de Versalles, Lomas de Chapultepec — Steinhaus",
    "suiteV.meta.desc": "Spacious furnished residences in Lomas de Chapultepec, the diplomatic quarter of Mexico City. 2–3 bedrooms. Rate on request. Utilities included.",
    "suiteV.intro": "Larger residences in one of the calmest, greenest parts of the city, among embassies and stately avenues. Made for relocating families and long executive stays.",
    "suiteV.s1": "2–3 bedrooms", "suiteV.s2": "Families & executives", "suiteV.s3": "Suites 1 to 4", "suiteV.s4": "Diplomatic district",
    "suiteV.n1": "Paseo de la Reforma · 8 min", "suiteV.n2": "Bosque de Chapultepec · 6 min", "suiteV.n3": "Polanco · 10 min", "suiteV.n4": "Embassy district",
    "suiteV.loc": "Lomas de Chapultepec is residential, private and green: the quarter of embassies and official residences, climbing up from Reforma.",
    "suiteV.priceNote": "Depending on residence and length of stay",

    /* ---- Suite detail: Hamburgo ---- */
    "suiteR.meta.title": "Suite at Hamburgo 291, Reforma — Steinhaus Home Suites",
    "suiteR.meta.desc": "Efficient executive suite one block from Paseo de la Reforma. Studio or 1 bedroom, from $1,100 MXN/night. Utilities included.",
    "suiteR.intro": "Efficient suites a step from Paseo de la Reforma — the avenue of corporate towers, banking and law firms. The best base for short, intense working trips.",
    "suiteR.s1": "Studio / 1 bedroom", "suiteR.s2": "1–2 adults", "suiteR.s3": "Suites 2A, 3A, 3B, 4, 5A, 5B & 7", "suiteR.s4": "On Reforma",
    "suiteR.n1": "Ángel de la Independencia · 5 min", "suiteR.n2": "Corporate towers · on foot", "suiteR.n3": "Zona Rosa · 3 min", "suiteR.n4": "Centro Histórico · 12 min",
    "suiteR.loc": "Paseo de la Reforma organises the city: along the avenue sit the corporate headquarters, the banks and the convention hotels.",
    "suiteR.priceNote": "From · depending on suite and season",

    "about.cta.h": "Planning a long stay in Mexico City?",

    /* ---- Suite detail: new template ---- */
    "detail.viewGallery": "View gallery",
    "detail.overview.h": "Overview",
    "detail.facilities.h": "Suite facilities",
    "detail.facilities.p": "Everything included with this suite, at no extra charge.",
    "detail.highlights.h": "Suite highlights",
    "detail.services.h": "Steinhaus services",
    "detail.book.note": "No online payment — we confirm availability the same day.",
    "detail.location.directions": "Get directions",

    /* ---- Room facilities ---- */
    "fac.1": "High-speed Wi-Fi",
    "fac.2": "Air conditioning",
    "fac.3": "Safe",
    "fac.4": "Private bathroom",
    "fac.5": "Fully equipped kitchen",
    "fac.6": "Washing machine",
    "fac.7": "Terrace",
    "fac.8": "Minibar",
    "fac.9": "Flat-screen TV",
    "fac.10": "Microwave",
    "fac.11": "Concierge service",
    "fac.12": "Dining area",
    "fac.13": "Seating area",
    "fac.14": "Private entrance",
    "fac.15": "Parking",
    "fac.16": "Pets allowed on request",

    /* ---- Steinhaus-wide services ---- */
    "svc.1": "24-hour security",
    "svc.2": "On-site maintenance",
    "svc.3": "Welcome package",
    "svc.4": "Personal, direct attention",
    "svc.5": "Corporate invoicing",
    "svc.6": "Internet & utilities included",

    /* ---- Suite highlights (per suite) ---- */
    "hl.c1": "Parque Lincoln views", "hl.c2": "High ceilings and natural light",
    "hl.c3": "Separate living and dining rooms", "hl.c4": "Warm wood finishes",
    "hl.c5": "Ideal for long stays", "hl.c6": "Steps from Presidente Masaryk",
    "hl.h1": "Steps from the Polanco offices", "hl.h2": "Compact, efficient layout",
    "hl.h3": "Fully equipped kitchen", "hl.h4": "Afternoon light in the living room",
    "hl.h5": "Ideal for short work trips", "hl.h6": "Quiet, guarded building",
    "hl.v1": "Our largest residence", "hl.v2": "Leafy, private neighborhood",
    "hl.v3": "Double-height living room", "hl.v4": "Room for the whole family",
    "hl.v5": "Quiet diplomatic setting", "hl.v6": "Ideal for multi-month stays",
    "hl.r1": "One block from Paseo de la Reforma", "hl.r2": "Efficient, light-filled suite",
    "hl.r3": "Ideal for short stays", "hl.r4": "Quick reach to Zona Rosa",
    "hl.r5": "Modern, functional feel", "hl.r6": "Close to transit and banks",

    /* ---- Booking calendar ---- */
    "book.cal.title": "Select your dates",
    "book.cal.desc": "Pick your check-in, then your check-out.",
    "book.cal.clear": "Clear"
  };

  var root = document.documentElement;

  function currentLang() {
    var url = new URLSearchParams(location.search).get("lang");
    if (url === "en" || url === "es") return url;
    try { var s = localStorage.getItem(KEY); if (s === "en" || s === "es") return s; } catch (e) {}
    return DEFAULT;
  }

  function translateNode(node, lang) {
    var key = node.getAttribute("data-i18n");
    if (!key) return;
    if (!node.dataset.i18nEs) {
      node.dataset.i18nEs = node.tagName === "META" ? node.getAttribute("content") : node.innerHTML;
    }
    var esVal = node.dataset.i18nEs;
    var val = lang === "en" ? (EN[key] != null ? EN[key] : esVal) : esVal;
    if (node.tagName === "META") node.setAttribute("content", val);
    else if (node.tagName === "TITLE") node.textContent = val.replace(/<[^>]+>/g, "");
    else node.innerHTML = val;
  }

  function translateAttr(node, lang, dataAttr, targetAttr) {
    var key = node.getAttribute(dataAttr);
    if (!key) return;
    var cacheKey = "i18nEsAttr" + targetAttr;
    if (!node.dataset[cacheKey]) node.dataset[cacheKey] = node.getAttribute(targetAttr) || "";
    var esVal = node.dataset[cacheKey];
    node.setAttribute(targetAttr, lang === "en" ? (EN[key] != null ? EN[key] : esVal) : esVal);
  }

  function apply(lang) {
    root.setAttribute("lang", lang);
    document.body.classList.toggle("lang-en", lang === "en");
    document.body.classList.toggle("lang-es", lang !== "en");

    document.querySelectorAll("[data-i18n]").forEach(function (n) { translateNode(n, lang); });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (n) { translateAttr(n, lang, "data-i18n-ph", "placeholder"); });
    document.querySelectorAll("[data-i18n-al]").forEach(function (n) { translateAttr(n, lang, "data-i18n-al", "aria-label"); });

    document.querySelectorAll(".lang__btn").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });

    try { localStorage.setItem(KEY, lang); } catch (e) {}
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang: lang } }));
  }

  function init() {
    apply(currentLang());
    document.querySelectorAll(".lang__btn").forEach(function (b) {
      b.addEventListener("click", function () { apply(b.dataset.lang); });
    });
  }

  window.STEINHAUS_I18N = { apply: apply, current: currentLang, EN: EN };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
