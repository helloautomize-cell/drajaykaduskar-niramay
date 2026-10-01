// Canonical clinic details — copied exactly from resources/docs/site-plan.md.
// Values marked TODO_CONFIRM still need doctor sign-off; render through <Confirm/>

export const site = {
  name: "Niramay Clinics",
  city: "Nagpur",
  area: "Dhantoli",
  centres: {
    adult: "Niramay Diabetes and Heart Care Centre",
    child: "Blooming Buds Child and Adolescent Care Centre",
  },
  tagline: "A specialist family practice for diabetes, heart and child care in Dhantoli, Nagpur.",
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
  email: "admin@niramayclinics.com",
  labHours: {
    short: "7 am to 7 pm",
    display: "Mon to Sat, 7 am to 7 pm. Sundays and holidays only for pre-booked fasting tests.",
  },
  // [CONFIRM: Exact OPD hours for each doctor]
  opdHours: {
    drAjay: "TODO_CONFIRM",
    drPrajakta: "TODO_CONFIRM",
    closedDays: "TODO_CONFIRM",
  },
  emergency: {
    notice: "Medical emergency?",
    action: "Call 108 or 112",
    numbers: "108 or 112",
    disclaimer:
      "The clinic is an outpatient facility and does not handle emergencies. Call 108 or 112 or go to the nearest hospital.",
  },
  googleReviews: {
    // [CONFIRM: Google Business Profile review links for each centre]
    diabetesHeart: "TODO_CONFIRM",
    bloomingBuds: "TODO_CONFIRM",
  },
  social: {
    // [CONFIRM: Clinic social media handles] — hidden until confirmed
    facebook: "",
    instagram: "",
    youtube: "",
  },
  whatsappPrefill:
    "Hello, I would like to book an appointment at Niramay Clinics.",
  consentLine:
    "By submitting this form, you consent to Niramay Clinics contacting you by phone, SMS or WhatsApp to respond to your enquiry. We do not share your details with third parties.",
  mapUrl: "TODO_CONFIRM", // [CONFIRM] Google Maps share link
} as const;

export type Site = typeof site;
