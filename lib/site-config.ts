// Canonical clinic details — copied exactly from resources/docs/site-plan.md
// and client-answers-2026-10-02.md. Unconfirmed values stay empty and are
// hidden from output until supplied (e.g. Google Business Profile links).

export const site = {
  name: "Niramay Clinics",
  city: "Nagpur",
  area: "Dhantoli",
  centres: {
    adult: "Niramay Diabetes and Heart Care Centre",
    child: "Blooming Buds Child and Adolescent Care Centre",
  },
  tagline: "A specialist family practice for diabetes, heart and child care in Dhantoli, Nagpur.",
  foundedYear: "2006",
  address: {
    line1: "572, Indu Bhaskar Apartments",
    line2: "Dr. N. B. Khare Marg",
    line3: "Opposite Dinanath High School, Dhantoli",
    city: "Nagpur",
    state: "Maharashtra",
    pin: "440012",
    full: "572, Indu Bhaskar Apartments, Dr. N. B. Khare Marg, opposite Dinanath High School, Dhantoli, Nagpur, Maharashtra 440012",
    short: "572, Indu Bhaskar Apartments, Dr. N. B. Khare Marg, Dhantoli, Nagpur",
  },
  phone: {
    display: "0712 2422214",
    tel: "tel:+917122422214",
  },
  mobile: {
    display: "+91 84591 41584",
    tel: "tel:+918459141584",
  },
  whatsapp: {
    number: "918459141584",
    url: "https://wa.me/918459141584",
  },
  pharmacy: {
    name: "Niramay Pharmacy",
    display: "+91 90213 51693",
    tel: "tel:+919021351693",
  },
  // One email for everything (client-answers item 17). Rendered via
  // <ObfuscatedEmail/> so scrapers do not harvest the raw address.
  email: "ajaykaduskar@gmail.com",
  hours: {
    // client-answers items 1-4; OPD/lab/pharmacy closed on Sundays
    opd: "Mon to Sat, 8:30 am to 6 pm",
    lab: "Mon to Sat, 7 am to 7 pm",
    pharmacy: "Mon to Sat, 8:30 am to 8 pm",
    phone: "8 am to 9 pm, every day",
    sunday: "Closed on Sundays",
    holiday: "Please call before visiting on public holidays.",
  },
  labHours: {
    short: "7 am to 7 pm",
    display: "Mon to Sat, 7 am to 7 pm. Sundays closed.",
  },
  experienceYears: {
    // client-answers item 24 — rendered as "more than X years"
    drAjay: 20,
    drPrajakta: 15,
  },
  opdHours: {
    drAjay: "Mon to Sat, 8:30 am to 6 pm",
    drPrajakta: "Mon to Sat, 8:30 am to 6 pm",
    closedDays: "Sundays closed",
  },
  emergency: {
    notice: "Medical emergency?",
    action: "Call 108 or 112",
    numbers: "108 or 112",
    disclaimer:
      "The clinic is an outpatient facility and does not handle emergencies. Call 108 or 112 or go to the nearest hospital.",
  },
  // Google Business Profiles: agency pastes the links from GBP
  // manager. GBP A = clinic, GBP B = Dr. Ajay. Empty until supplied.
  googleProfiles: {
    clinic: { name: "Niramay Clinics", mapsUrl: "", reviewUrl: "" },
    drAjay: { name: "Dr. Ajay V. Kaduskar", mapsUrl: "", reviewUrl: "" },
  },
  social: {
    // No social media (client-answers §6-10). Icons stay hidden.
    facebook: "",
    instagram: "",
    youtube: "",
  },
  // Local SEO catchment (client-answers item 12): towns within ~100 km and
  // Nagpur localities within ~15 km. Used for schema areaServed and the
  // "coming from outside Nagpur" page.
  serviceArea: {
    towns: [
      "Kamptee", "Hingna", "Butibori", "Kalmeshwar", "Saoner", "Katol",
      "Narkhed", "Umred", "Bhiwapur", "Kuhi", "Mauda", "Ramtek", "Parseoni",
      "Bhandara", "Tumsar", "Wardha", "Hinganghat", "Pandhurna",
    ],
    localities: [
      "Dhantoli", "Ramdaspeth", "Congress Nagar", "Sitabuldi", "Civil Lines",
      "Dharampeth", "Shankar Nagar", "Bajaj Nagar", "Pratap Nagar",
      "Manish Nagar", "Trimurti Nagar", "Sadar", "Mahal", "Itwari",
      "Medical Square", "Sakkardara", "Nandanvan", "Wardhaman Nagar",
      "Hudkeshwar", "Besa", "Wadi", "Koradi road",
    ],
    line: "Patients come to us from across Nagpur and from towns up to 100 km away, including Wardha, Bhandara, Umred, Katol, Saoner and Ramtek.",
  },
  whatsappPrefill:
    "Hello, I would like to book an appointment at Niramay Clinics.",
  consentLine:
    "I agree that Niramay Clinics may contact me about this appointment by phone, SMS or WhatsApp. I have read the Privacy Policy.",
  guardianConsentLine:
    "I am the parent or legal guardian of the patient. I agree that Niramay Clinics may contact me about this appointment by phone, SMS or WhatsApp. I have read the Privacy Policy.",
  workshopConsentLine:
    "I agree that Niramay Clinics may contact me about this workshop request. I have read the Privacy Policy.",
  // Privacy Policy + Terms of Use "Last updated" (client-answers item 18)
  legalLastUpdated: "21 August 2026",
  mapUrl: "", // Google Maps share link — agency copies from GBP
} as const;

export type Site = typeof site;
