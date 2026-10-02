/**
 * Global navigation model (plan Appendix A.6). URLs come from
 * resources/content/_index.md frontmatter. `badge` values are slugs in
 * lib/service-badges.ts (ServiceBadge sm). Pages not built yet may 404.
 */

export interface NavLink {
  label: string;
  href: string;
  /** service badge slug — used in mega menus and the mobile sheet */
  badge?: string;
}

export interface NavGroup {
  heading: string;
  icon?: string; // line icon name for column headings
  links: NavLink[];
}

/* ---- Diabetes and Heart (4 columns) ---- */
export const diabetesHeartGroups: NavGroup[] = [
  {
    heading: "Diabetes",
    icon: "glucose-drop",
    links: [
      { label: "Diabetes care", href: "/diabetes/", badge: "diabetes-care" },
      { label: "Type 2 diabetes", href: "/diabetes/type-2-diabetes/", badge: "diabetes-care" },
      { label: "Type 1 diabetes", href: "/diabetes/type-1-diabetes/", badge: "diabetes-care" },
      { label: "Diabetes in pregnancy", href: "/diabetes/diabetes-in-pregnancy/", badge: "diabetes-in-pregnancy" },
      { label: "Complications screening", href: "/diabetes/complications-screening/", badge: "eye-screening" },
      { label: "Diabetes care programme", href: "/diabetes/diabetes-care-programme/", badge: "diabetes-care" },
      { label: "Prediabetes check", href: "/diabetes/prediabetes-risk-assessment/", badge: "health-checkup" },
    ],
  },
  {
    heading: "Weight",
    icon: "waist-tape",
    links: [
      { label: "Obesity care", href: "/obesity/", badge: "obesity-care" },
      { label: "Weight-loss medicines", href: "/obesity/weight-management-medicines/", badge: "obesity-care" },
      { label: "Body composition", href: "/obesity/body-composition-sarcopenia/", badge: "body-composition" },
    ],
  },
  {
    heading: "Heart",
    icon: "heart",
    links: [
      { label: "Heart care", href: "/heart-care/", badge: "heart-care" },
      { label: "2D Echo", href: "/heart-care/2d-echo/", badge: "heart-care" },
      { label: "ECG", href: "/heart-care/ecg/", badge: "heart-care" },
      { label: "TMT stress test", href: "/heart-care/tmt-stress-test/", badge: "heart-care" },
    ],
  },
  {
    heading: "More",
    icon: "check-up",
    links: [
      { label: "Thyroid clinic", href: "/thyroid-clinic/", badge: "thyroid" },
      { label: "Hypertension clinic", href: "/hypertension-clinic/", badge: "hypertension" },
      { label: "Nutrition counselling", href: "/nutrition-lifestyle-counselling/", badge: "nutrition" },
      { label: "Health check-ups", href: "/preventive-health-check-ups/", badge: "health-checkup" },
    ],
  },
];

/* ---- Child and Teen (2 columns + promo card) ---- */
export const childTeenGroups: NavGroup[] = [
  {
    heading: "Clinic care",
    icon: "baby",
    links: [
      { label: "Blooming Buds", href: "/blooming-buds/", badge: "adolescent-health" },
      { label: "Well baby clinic", href: "/blooming-buds/well-baby-clinic/", badge: "well-baby" },
      { label: "Vaccinations", href: "/vaccination/", badge: "vaccination" },
      { label: "Teen health", href: "/blooming-buds/adolescent-health/", badge: "adolescent-health" },
    ],
  },
  {
    heading: "Counselling and growth",
    icon: "mind",
    links: [
      { label: "Teen counselling", href: "/blooming-buds/teen-mental-health/", badge: "teen-counselling" },
      { label: "Psychological testing", href: "/blooming-buds/psychological-testing/", badge: "teen-counselling" },
      { label: "Career counselling", href: "/blooming-buds/career-counselling/", badge: "career-counselling" },
      { label: "School workshops", href: "/blooming-buds/workshops/", badge: "career-counselling" },
    ],
  },
];

/* ---- Lab and Pharmacy ---- */
export const labPharmacyLinks: NavLink[] = [
  { label: "Laboratory", href: "/lab/", badge: "diagnostic-lab" },
  { label: "Home sample collection", href: "/lab/home-sample-collection/", badge: "home-sample-collection" },
  { label: "Pharmacy", href: "/pharmacy/", badge: "pharmacy" },
];

/* ---- Doctors ---- */
export const doctorLinks = [
  {
    name: "Dr. Ajay V. Kaduskar",
    line: "Diabetes, obesity and heart care",
    href: "/doctors/dr-ajay-kaduskar/",
    badge: "doctor-male",
    face: "/images/doctors/dr-ajay-kaduskar-avatar.jpg",
  },
  {
    name: "Dr. Prajakta A. Kaduskar",
    line: "Child and adolescent care",
    href: "/doctors/dr-prajakta-kaduskar/",
    badge: "doctor-female",
    face: "/images/doctors/dr-prajakta-kaduskar-face.jpg",
  },
] as const;
export const aboutClinicLink: NavLink = { label: "About the clinic", href: "/about/" };

/* ---- Patient Info ---- */
export const patientInfoLinks: NavLink[] = [
  { label: "Plan your visit", href: "/plan-your-visit/" },
  { label: "FAQs", href: "/faqs/" },
  { label: "Health Library", href: "/health-library/" },
  { label: "Patient rights", href: "/patient-rights/" },
];

/* ---- Featured ServiceGlassCards (mega menu rows) ---- */
export const diabetesHeartFeatured = [
  { badge: "diabetes-care", title: "Diabetes care", text: "Long-term sugar control with screening built in.", href: "/diabetes/" },
  { badge: "heart-care", title: "Heart care", text: "ECG, 2D Echo and treadmill testing in-house.", href: "/heart-care/" },
  { badge: "eye-screening", title: "Eye screening", text: "Retinal photography to protect your sight.", href: "/diabetes/complications-screening/" },
] as const;
export const childTeenFeatured = [
  { badge: "well-baby", title: "Well baby clinic", text: "Growth checks and early milestones.", href: "/blooming-buds/well-baby-clinic/" },
  { badge: "teen-counselling", title: "Teen counselling", text: "A calm space for stress, study and screens.", href: "/blooming-buds/teen-mental-health/" },
  { badge: "career-counselling", title: "Career counselling", text: "Aptitude testing and honest guidance.", href: "/blooming-buds/career-counselling/" },
] as const;

/* ---- Footer link columns (text only) ---- */
export const footerDiabetesHeart: NavLink[] = diabetesHeartGroups.flatMap((g) => g.links);
export const footerChildTeen: NavLink[] = childTeenGroups.flatMap((g) => g.links);
export const footerLegal: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Terms of Use", href: "/terms-of-use/" },
  { label: "Medical Disclaimer", href: "/medical-disclaimer/" },
  { label: "Editorial Policy", href: "/editorial-policy/" },
  { label: "Patient Rights", href: "/patient-rights/" },
  { label: "Cancellation and Refund", href: "/cancellation-refund-policy/" },
  { label: "Accessibility", href: "/accessibility/" },
];

/** Top-level nav labels for header + mobile sheet. */
export const topNav = [
  { label: "Diabetes and Heart", key: "diabetes-heart" },
  { label: "Child and Teen", key: "child-teen" },
  { label: "Lab and Pharmacy", key: "lab-pharmacy" },
  { label: "Doctors", key: "doctors" },
  { label: "Patient Info", key: "patient-info" },
] as const;
export type TopNavKey = (typeof topNav)[number]["key"];
