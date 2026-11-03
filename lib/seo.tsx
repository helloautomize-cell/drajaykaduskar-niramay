/**
 * SEO helpers: generateMetadata inputs and JSON-LD graph builders.
 *
 * Structured data is emitted as ONE `@graph` per page with stable @ids so
 * entities link to each other instead of being duplicated:
 *   https://www.niramayclinics.com/#clinic   - the clinic (MedicalClinic +
 *                                              LocalBusiness + Organization)
 *   https://www.niramayclinics.com/#website  - WebSite
 *   https://www.niramayclinics.com/#dr-ajay / #dr-prajakta - Physicians
 *   <pageUrl>#webpage | #condition | #service | #test | #article | #faq | #breadcrumb | #video-<id>
 *   https://www.niramayclinics.com/health-library/#topic-<key> - article topics
 */
import type { Metadata } from "next";
import { site } from "@/lib/site-config";
import type { Doctor } from "@/lib/doctors";
import type { PageFrontmatter } from "@/lib/content/schema";

export const SITE_URL = "https://www.niramayclinics.com";

export const CLINIC_ID = `${SITE_URL}/#clinic`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const PHYSICIAN_ID: Record<Doctor["id"], string> = {
  ajay: `${SITE_URL}/#dr-ajay`,
  prajakta: `${SITE_URL}/#dr-prajakta`,
};

export function pageMetadata(meta: PageFrontmatter, opts?: { noindex?: boolean; image?: string }): Metadata {
  // seo_title already contains the "| Niramay Clinics, Nagpur" suffix — use
  // absolute so the root title template does not append it a second time.
  const title = meta.seo_title || meta.title;
  const description = meta.meta_description || undefined;
  // Doctor pages get their OG card from the doctors/[slug]/opengraph-image
  // file convention; everything else uses the generated /og/ route.
  const ogImages = meta.url.startsWith("/doctors/")
    ? undefined
    : [{ url: `${SITE_URL}/og${meta.url}`, width: 1200, height: 630 }];
  return {
    title: meta.seo_title ? { absolute: title } : title,
    description,
    alternates: { canonical: meta.url },
    ...(opts?.noindex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title,
      description,
      url: meta.url,
      siteName: site.name,
      locale: "en_IN",
      // blog posts set type "article" in their own generateMetadata
      type: meta.url.startsWith("/doctors/") ? "profile" : "website",
      ...(opts?.image ? { images: [{ url: `${SITE_URL}${opts.image}` }] } : ogImages ? { images: ogImages } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: "572, Indu Bhaskar Apartments, Dr. N. B. Khare Marg, opposite Dinanath High School, Dhantoli",
  addressLocality: "Nagpur",
  addressRegion: "Maharashtra",
  postalCode: "440012",
  addressCountry: "IN",
};

// Catchment per client-answers item 12: Nagpur city + district, Bhandara and
// Wardha districts, and a 100 km GeoCircle around the clinic.
const clinicGeo = { "@type": "GeoCoordinates", latitude: 21.1348, longitude: 79.0838 };
const areaServed = [
  { "@type": "City", name: "Nagpur" },
  { "@type": "AdministrativeArea", name: "Nagpur district" },
  { "@type": "AdministrativeArea", name: "Bhandara district" },
  { "@type": "AdministrativeArea", name: "Wardha district" },
  { "@type": "GeoCircle", geoMidpoint: clinicGeo, geoRadius: "100000" },
];

const MON_SAT = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const ALL_DAYS = [...MON_SAT, "Sunday"];

const hoursSpec = (days: string[], opens: string, closes: string) => ({
  "@type": "OpeningHoursSpecification",
  dayOfWeek: days,
  opens,
  closes,
});

const httpOrNull = (v: string) => (v.startsWith("http") ? v : null);

const CLINIC_TEL = "+91-712-2422214";
const CLINIC_LOGO = `${SITE_URL}/images/brand/niramay-logo.png`;
const CLINIC_IMAGE = `${SITE_URL}/images/clinic/exterior-entrance.jpg`;
const LAB_IMAGE = `${SITE_URL}/images/services/lab-analysers.jpg`;
const PHARMACY_IMAGE = `${SITE_URL}/images/services/pharmacy.jpg`;
// [CONFIRM] real consultation fee range — neutral price-level placeholder
// until the client supplies the actual fee.
const PRICE_RANGE = "₹₹";
const OPD_HOURS = [hoursSpec(MON_SAT, "08:30", "18:00")];

/** The clinic node — identical on every page so crawlers see one entity. */
export function clinicNode() {
  // GBP 2 is specifically the "Niramay Diabetes & Heart Care Centre" listing:
  // it is hasMap for the clinic and sameAs+hasMap for that department, never
  // the main clinic's sameAs. GBP 1 (Dr. Ajay's listing) stays in sameAs.
  const clinicMap = httpOrNull(site.googleProfiles.clinic.mapsUrl);
  const sameAs = [httpOrNull(site.googleProfiles.drAjay.mapsUrl)].filter(
    (v): v is string => !!v
  );
  return {
    "@type": ["MedicalClinic", "LocalBusiness"],
    "@id": CLINIC_ID,
    name: site.name,
    alternateName: [site.centres.adult, site.centres.child],
    url: `${SITE_URL}/`,
    telephone: CLINIC_TEL,
    email: site.email,
    image: CLINIC_IMAGE,
    logo: CLINIC_LOGO,
    priceRange: PRICE_RANGE,
    address: postalAddress,
    geo: clinicGeo,
    foundingDate: site.foundedYear,
    founder: { "@id": PHYSICIAN_ID.ajay },
    medicalSpecialty: ["Endocrine", "Pediatric", "Cardiovascular"],
    openingHoursSpecification: OPD_HOURS,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: CLINIC_TEL,
        contactType: "appointments",
        hoursAvailable: hoursSpec(ALL_DAYS, "08:00", "21:00"),
      },
      {
        "@type": "ContactPoint",
        telephone: "+91-84591-41584",
        contactType: "customer service",
        hoursAvailable: hoursSpec(ALL_DAYS, "08:00", "21:00"),
      },
    ],
    department: [
      {
        "@type": "MedicalClinic",
        name: site.centres.adult,
        medicalSpecialty: ["Endocrine", "Cardiovascular"],
        url: `${SITE_URL}/`,
        telephone: CLINIC_TEL,
        image: CLINIC_IMAGE,
        priceRange: PRICE_RANGE,
        address: postalAddress,
        geo: clinicGeo,
        openingHoursSpecification: OPD_HOURS,
        ...(clinicMap ? { sameAs: [clinicMap], hasMap: clinicMap } : {}),
      },
      {
        "@type": "MedicalClinic",
        name: site.centres.child,
        medicalSpecialty: ["Pediatric"],
        url: `${SITE_URL}/`,
        telephone: CLINIC_TEL,
        image: CLINIC_IMAGE,
        priceRange: PRICE_RANGE,
        address: postalAddress,
        geo: clinicGeo,
        openingHoursSpecification: OPD_HOURS,
      },
      {
        "@type": "MedicalBusiness",
        name: "Niramay in-house laboratory",
        url: `${SITE_URL}/lab/`,
        telephone: CLINIC_TEL,
        image: LAB_IMAGE,
        priceRange: PRICE_RANGE,
        address: postalAddress,
        geo: clinicGeo,
        openingHoursSpecification: [hoursSpec(MON_SAT, "07:00", "19:00")],
      },
      {
        "@type": "Pharmacy",
        name: site.pharmacy.name,
        url: `${SITE_URL}/pharmacy/`,
        telephone: site.pharmacy.display,
        image: PHARMACY_IMAGE,
        priceRange: PRICE_RANGE,
        address: postalAddress,
        geo: clinicGeo,
        openingHoursSpecification: [hoursSpec(MON_SAT, "08:30", "20:00")],
      },
    ],
    availableService: [
      { "@type": "MedicalTest", name: "Laboratory services" },
      { "@type": "MedicalTest", name: "2D Echo, ECG and treadmill stress test" },
    ],
    areaServed,
    ...(clinicMap ? { hasMap: clinicMap } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: site.name,
    url: `${SITE_URL}/`,
    inLanguage: "en-IN",
    publisher: { "@id": CLINIC_ID },
  };
}

// Dr. Ajay's enriched credential graph (client-answers "Schema (Dr. Ajay)").
const physicianExtras: Record<string, Record<string, unknown>> = {
  ajay: {
    medicalSpecialty: ["Endocrine", "Cardiovascular", "PrimaryCare"],
    knowsAbout: [
      "Type 2 diabetes", "Type 1 diabetes", "Gestational diabetes", "Prediabetes",
      "Insulin therapy", "Obesity", "Hypertension", "Dyslipidemia", "Thyroid disorders",
      "PCOS", "Gout", "Diabetic complications", "Preventive cardiology",
    ],
    availableService: [
      { "@type": "MedicalTest", name: "ECG" },
      { "@type": "MedicalTest", name: "2D echocardiography" },
      { "@type": "MedicalTest", name: "Treadmill stress test" },
      { "@type": "MedicalTest", name: "Continuous glucose monitoring" },
      { "@type": "MedicalTest", name: "Retinal photography for diabetic eye screening" },
      { "@type": "MedicalTherapy", name: "Insulin treatment" },
      { "@type": "MedicalTherapy", name: "Medical weight management" },
      { "@type": "MedicalProcedure", name: "Body composition analysis" },
    ],
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Government Medical College, Nagpur" },
      { "@type": "CollegeOrUniversity", name: "Lokmanya Tilak Municipal Medical College, Sion, Mumbai" },
    ],
    hasCredential: [
      "MBBS", "MD (Medicine)", "PG Diploma in Health Sciences (Diabetology)",
      "Fellowship, Euro Asian Academy of Clinical Diabetology (FEACD)",
      "SCOPE certified obesity management specialist (World Obesity Federation)",
    ].map((c) => ({ "@type": "EducationalOccupationalCredential", name: c })),
    memberOf: [
      { "@type": "Organization", name: "Diabetic Association of India, Nagpur" },
      { "@type": "Organization", name: "Association of Physicians of India, Vidarbha Chapter" },
    ],
    affiliation: { "@type": "NGO", name: "Dr. V. S. Kaduskar Memorial Foundation" },
  },
  prajakta: {
    medicalSpecialty: ["Pediatric"],
    knowsAbout: [
      "Well baby care", "Childhood and adolescent vaccination", "Puberty and adolescent health",
      "Teen mental health and counselling", "Psychological and aptitude testing",
      "Career guidance", "Parenting support",
    ],
    hasCredential: [
      "MBBS", "DCH (Diploma in Child Health)",
      "PG Diploma in Adolescent Paediatrics (PGDAP)", "MA (Clinical Psychology)",
    ].map((c) => ({ "@type": "EducationalOccupationalCredential", name: c })),
  },
};

export function physicianNode(d: Doctor) {
  const sameAs = [d.id === "ajay" ? site.googleProfiles.drAjay.mapsUrl : ""].filter(Boolean);
  return {
    "@type": "Physician",
    "@id": PHYSICIAN_ID[d.id],
    name: d.name,
    identifier: {
      "@type": "PropertyValue",
      propertyID: `${d.registration.council} Registration Number`,
      name: `${d.registration.council} Reg. No.`,
      value: d.registration.number,
    },
    url: `${SITE_URL}${d.profileHref}`,
    image: `${SITE_URL}${d.avatar}`,
    description: d.role,
    worksFor: { "@id": CLINIC_ID },
    // Both doctors consult at the clinic, same OPD hours (site.opdHours) —
    // Physician is a LocalBusiness subtype, so it carries the same fields.
    address: postalAddress,
    telephone: CLINIC_TEL,
    geo: clinicGeo,
    priceRange: PRICE_RANGE,
    openingHoursSpecification: OPD_HOURS,
    knowsLanguage: ["en", "hi", "mr"],
    areaServed,
    ...(sameAs.length ? { sameAs } : {}),
    ...physicianExtras[d.id],
  };
}

export function profilePageNode(d: Doctor) {
  return {
    "@type": "ProfilePage",
    "@id": `${SITE_URL}${d.profileHref}#profilepage`,
    name: d.name,
    url: `${SITE_URL}${d.profileHref}`,
    inLanguage: "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": CLINIC_ID },
    mainEntity: { "@id": PHYSICIAN_ID[d.id] },
  };
}

/**
 * MedicalCondition data for the condition pages. `alternateName` carries the
 * common Hindi/Marathi name where one is natural; `possibleTreatment` is
 * generic with no brand names.
 */
const CONDITIONS: Record<
  string,
  { name: string; alternateName?: string; treatments: string[]; specialty: string; sameAs?: string[] }
> = {
  "/diabetes/": {
    sameAs: ["https://en.wikipedia.org/wiki/Diabetes", "https://meshb.nlm.nih.gov/record/ui?ui=D003920"],
    name: "Diabetes mellitus",
    alternateName: "Madhumeh",
    treatments: ["Nutrition and lifestyle changes", "Oral medicines", "Insulin therapy"],
    specialty: "Endocrine",
  },
  "/diabetes/type-1-diabetes/": {
    sameAs: ["https://en.wikipedia.org/wiki/Type_1_diabetes", "https://meshb.nlm.nih.gov/record/ui?ui=D003922"],
    name: "Type 1 diabetes mellitus",
    alternateName: "Type 1 diabetes",
    treatments: ["Insulin therapy", "Blood glucose monitoring", "Diabetes education"],
    specialty: "Endocrine",
  },
  "/diabetes/type-2-diabetes/": {
    sameAs: ["https://en.wikipedia.org/wiki/Type_2_diabetes", "https://meshb.nlm.nih.gov/record/ui?ui=D003924"],
    name: "Type 2 diabetes mellitus",
    alternateName: "Madhumeh",
    treatments: ["Nutrition and lifestyle changes", "Oral medicines", "Insulin therapy when needed"],
    specialty: "Endocrine",
  },
  "/diabetes/diabetes-in-pregnancy/": {
    sameAs: ["https://en.wikipedia.org/wiki/Gestational_diabetes", "https://meshb.nlm.nih.gov/record/ui?ui=D016640"],
    name: "Gestational diabetes mellitus",
    alternateName: "Diabetes in pregnancy",
    treatments: ["Nutrition and lifestyle changes", "Blood glucose monitoring", "Insulin therapy when needed"],
    specialty: "Endocrine",
  },
  "/diabetes/prediabetes-risk-assessment/": {
    sameAs: ["https://en.wikipedia.org/wiki/Prediabetes", "https://meshb.nlm.nih.gov/record/ui?ui=D011236"],
    name: "Prediabetes",
    treatments: ["Nutrition and lifestyle changes", "Weight management", "Regular blood sugar checks"],
    specialty: "Endocrine",
  },
  "/obesity/": {
    sameAs: ["https://en.wikipedia.org/wiki/Obesity", "https://meshb.nlm.nih.gov/record/ui?ui=D009765"],
    name: "Obesity",
    alternateName: "Motapa",
    treatments: ["Nutrition and lifestyle changes", "Medical weight management", "Behavioural support"],
    specialty: "Endocrine",
  },
  "/hypertension-clinic/": {
    sameAs: ["https://en.wikipedia.org/wiki/Hypertension", "https://meshb.nlm.nih.gov/record/ui?ui=D006973"],
    name: "Hypertension",
    alternateName: "High blood pressure",
    treatments: ["Lifestyle changes", "Antihypertensive medicines", "Regular blood pressure monitoring"],
    specialty: "Cardiovascular",
  },
  "/thyroid-clinic/": {
    sameAs: ["https://en.wikipedia.org/wiki/Thyroid_disease", "https://meshb.nlm.nih.gov/record/ui?ui=D013959"],
    name: "Thyroid disorder",
    alternateName: "Thyroid",
    treatments: ["Thyroid hormone medicines", "Regular thyroid function tests"],
    specialty: "Endocrine",
  },
};

export const conditionFor = (url: string) => CONDITIONS[url];

export function medicalConditionNode(meta: PageFrontmatter) {
  const c = CONDITIONS[meta.url];
  if (!c) return null;
  return {
    "@type": "MedicalCondition",
    "@id": `${SITE_URL}${meta.url}#condition`,
    name: c.name,
    ...(c.alternateName ? { alternateName: c.alternateName } : {}),
    ...(c.sameAs ? { sameAs: c.sameAs } : {}),
    possibleTreatment: c.treatments.map((t) => ({ "@type": "MedicalTherapy", name: t })),
    relevantSpecialty: { "@type": "MedicalSpecialty", name: c.specialty },
  };
}

export function medicalWebPageNode(
  meta: PageFrontmatter,
  doctor: Doctor | null,
  opts?: { lastReviewed?: string; aboutId?: string }
) {
  const cond = CONDITIONS[meta.url];
  const node: Record<string, unknown> = {
    "@type": "MedicalWebPage",
    "@id": `${SITE_URL}${meta.url}#webpage`,
    name: meta.title,
    url: `${SITE_URL}${meta.url}`,
    inLanguage: "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    description: meta.meta_description || undefined,
    // about: the modelled condition, else the page's own service/test node,
    // else the clinic. Never a fabricated entity.
    about: cond
      ? { "@id": `${SITE_URL}${meta.url}#condition` }
      : opts?.aboutId
        ? { "@id": opts.aboutId }
        : { "@id": CLINIC_ID },
    audience: { "@type": "Patient" },
  };
  if (doctor) {
    node.reviewedBy = { "@id": PHYSICIAN_ID[doctor.id] };
    if (opts?.lastReviewed) node.lastReviewed = opts.lastReviewed;
  }
  return node;
}

/** Generic page node for non-medical pages (AboutPage, ContactPage, home ...). */
export function webPageNode(meta: PageFrontmatter, type: string = "WebPage", opts?: { aboutId?: string }) {
  return {
    "@type": type,
    "@id": `${SITE_URL}${meta.url}#webpage`,
    name: meta.title,
    url: `${SITE_URL}${meta.url}`,
    inLanguage: "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": opts?.aboutId ?? CLINIC_ID },
    ...(type === "ProfilePage" && opts?.aboutId ? { mainEntity: { "@id": opts.aboutId } } : {}),
    ...(meta.meta_description ? { description: meta.meta_description } : {}),
  };
}

/**
 * Service entity for pages that describe something the clinic does (not a
 * condition and not a lab test). Type per page; provider is the clinic.
 */
const SERVICES: Record<string, { type: string; name: string; extra?: Record<string, unknown> }> = {
  "/vaccination/": { type: "MedicalProcedure", name: "Vaccination for children, teenagers and adults" },
  "/diabetes/diabetes-care-programme/": { type: "MedicalTherapy", name: "Structured yearly diabetes care programme" },
  "/nutrition-lifestyle-counselling/": { type: "MedicalTherapy", name: "Medical nutrition and lifestyle counselling" },
  "/obesity/weight-management-medicines/": { type: "MedicalTherapy", name: "Medical weight management with medicines" },
  "/preventive-health-check-ups/": { type: "MedicalProcedure", name: "Preventive health check-up" },
  "/heart-care/": { type: "MedicalProcedure", name: "Preventive heart check-up" },
  "/blooming-buds/": { type: "MedicalProcedure", name: "Child and adolescent health care" },
  "/blooming-buds/well-baby-clinic/": { type: "MedicalProcedure", name: "Well-baby check-up" },
  "/blooming-buds/adolescent-health/": { type: "MedicalProcedure", name: "Adolescent health consultation" },
  "/blooming-buds/teen-mental-health/": { type: "MedicalTherapy", name: "Teen counselling" },
  "/blooming-buds/psychological-testing/": { type: "MedicalTest", name: "Psychological testing for children and teenagers" },
  "/blooming-buds/career-counselling/": { type: "Service", name: "Career counselling and aptitude testing" },
  "/blooming-buds/workshops/": { type: "Service", name: "Health and life-skills workshops for schools" },
  "/lab/": { type: "Service", name: "In-house pathology laboratory" },
  "/lab/home-sample-collection/": { type: "Service", name: "Home blood sample collection" },
  "/pharmacy/": {
    type: "Pharmacy",
    name: "Niramay Pharmacy (in-house)",
    extra: {
      telephone: site.pharmacy.display,
      address: postalAddress,
      geo: clinicGeo,
      image: PHARMACY_IMAGE,
      priceRange: PRICE_RANGE,
      openingHoursSpecification: [hoursSpec(MON_SAT, "08:30", "20:00")],
      parentOrganization: { "@id": CLINIC_ID },
    },
  },
  "/plan-your-visit/coming-from-outside-nagpur/": { type: "Service", name: "Planned visits for patients from outside Nagpur" },
};

export const serviceIdFor = (url: string) => (SERVICES[url] ? `${SITE_URL}${url}#service` : undefined);

export function serviceNode(meta: PageFrontmatter) {
  const s = SERVICES[meta.url];
  if (!s) return null;
  return {
    "@type": s.type,
    "@id": `${SITE_URL}${meta.url}#service`,
    name: s.name,
    url: `${SITE_URL}${meta.url}`,
    ...(s.type === "Service" ? { provider: { "@id": CLINIC_ID }, areaServed } : {}),
    ...(meta.meta_description ? { description: meta.meta_description } : {}),
    ...(s.extra ?? {}),
  };
}

export function medicalTestNode(meta: PageFrontmatter) {
  return {
    "@type": "MedicalTest",
    "@id": `${SITE_URL}${meta.url}#test`,
    name: meta.title,
    url: `${SITE_URL}${meta.url}`,
    isPartOf: { "@id": WEBSITE_ID },
    description: meta.meta_description || undefined,
  };
}

export function faqPageNode(items: { q: string; aText: string }[], pageUrl: string) {
  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}${pageUrl}#faq`,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.aText },
    })),
  };
}

export function breadcrumbNode(crumbs: { label: string; href: string }[], pageUrl: string) {
  const trail = [{ label: "Home", href: "/" }, ...crumbs];
  return {
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}${pageUrl}#breadcrumb`,
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${SITE_URL}${c.href}`,
    })),
  };
}

export function blogPostingNode(post: {
  title: string;
  url: string;
  published: string;
  updated?: string;
  author: Doctor;
  image?: string;
  description?: string;
  wordCount?: number;
  articleSection?: string;
  keywords?: string[];
  citation?: { name: string; url: string }[];
}) {
  return {
    "@type": "BlogPosting",
    "@id": `${SITE_URL}${post.url}#article`,
    headline: post.title,
    url: `${SITE_URL}${post.url}`,
    mainEntityOfPage: `${SITE_URL}${post.url}`,
    inLanguage: "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    datePublished: post.published || undefined,
    dateModified: post.updated || post.published || undefined,
    author: { "@id": PHYSICIAN_ID[post.author.id] },
    // reviewedBy lives on the MedicalWebPage node (a WebPage property).
    // Articles need an image: posts without a featured image get the same
    // generated OG card the openGraph metadata points at.
    image: `${SITE_URL}${post.image ?? `/og${post.url}`}`,
    ...(post.description ? { description: post.description } : {}),
    ...(post.wordCount ? { wordCount: post.wordCount } : {}),
    ...(post.articleSection ? { articleSection: post.articleSection } : {}),
    ...(post.keywords?.length ? { keywords: post.keywords } : {}),
    ...(post.citation?.length
      ? { citation: post.citation.map((c) => ({ "@type": "CreativeWork", name: c.name, url: c.url })) }
      : {}),
    publisher: { "@id": CLINIC_ID },
  };
}

/**
 * What each Health Library cluster is about, typed correctly (a drug class is
 * not a MedicalCondition). Shared @ids so all posts in a cluster point at one
 * entity. Keyed by cluster number; legacy posts key by category.
 */
const W = "https://en.wikipedia.org/wiki/";
const MESH = "https://meshb.nlm.nih.gov/record/ui?ui=";
type Topic = { key: string; type: string; name: string; sameAs?: string[] };
const TOPICS: Record<string, Topic> = {
  "1": { key: "type-2-diabetes", type: "MedicalCondition", name: "Type 2 diabetes mellitus", sameAs: [`${W}Type_2_diabetes`, `${MESH}D003924`] },
  "2": { key: "prediabetes", type: "MedicalCondition", name: "Prediabetes", sameAs: [`${W}Prediabetes`, `${MESH}D011236`] },
  "3": { key: "diabetic-diet", type: "Diet", name: "Diet for diabetes", sameAs: [`${W}Diabetic_diet`] },
  "4": { key: "glp-1-ra", type: "DrugClass", name: "GLP-1 receptor agonists", sameAs: [`${W}GLP-1_receptor_agonist`, `${MESH}D000097789`] },
  "5": { key: "glp-1-ra", type: "DrugClass", name: "GLP-1 receptor agonists", sameAs: [`${W}GLP-1_receptor_agonist`, `${MESH}D000097789`] },
  "6": { key: "obesity", type: "MedicalCondition", name: "Obesity with type 2 diabetes (diabesity)", sameAs: [`${W}Obesity`, `${MESH}D009765`] },
  "7": { key: "glp-1-ra", type: "DrugClass", name: "GLP-1 receptor agonists", sameAs: [`${W}GLP-1_receptor_agonist`, `${MESH}D000097789`] },
  "8": { key: "cgm", type: "MedicalDevice", name: "Continuous glucose monitor", sameAs: [`${W}Continuous_glucose_monitor`] },
  "9": { key: "gestational-diabetes", type: "MedicalCondition", name: "Gestational diabetes mellitus", sameAs: [`${W}Gestational_diabetes`, `${MESH}D016640`] },
  "10": { key: "metabolic-syndrome", type: "MedicalCondition", name: "Metabolic syndrome", sameAs: [`${W}Metabolic_syndrome`, `${MESH}D024821`] },
  Diabetes: { key: "diabetes", type: "MedicalCondition", name: "Diabetes mellitus", sameAs: [`${W}Diabetes`, `${MESH}D003920`] },
  "Adolescent health": { key: "adolescent-health", type: "Thing", name: "Adolescent health", sameAs: [`${W}Adolescent_health`] },
  Parenting: { key: "parenting", type: "Thing", name: "Parenting teenagers", sameAs: [`${W}Parenting`] },
};

export function topicNode(clusterOrCategory: string | number | undefined): (Topic & { "@id": string }) | null {
  const t = clusterOrCategory !== undefined ? TOPICS[String(clusterOrCategory)] : undefined;
  return t ? { ...t, "@id": `${SITE_URL}/health-library/#topic-${t.key}` } : null;
}

export function topicEntity(clusterOrCategory: string | number | undefined) {
  const t = topicNode(clusterOrCategory);
  if (!t) return null;
  return { "@type": t.type, "@id": t["@id"], name: t.name, ...(t.sameAs ? { sameAs: t.sameAs } : {}) };
}

/** MedicalWebPage node for a blog article (audience Patient, physician-reviewed). */
export function postMedicalWebPageNode(post: {
  title: string;
  url: string;
  description?: string;
  aboutId?: string;
  lastReviewed?: string;
  reviewedBy?: Doctor;
}) {
  const node: Record<string, unknown> = {
    "@type": "MedicalWebPage",
    "@id": `${SITE_URL}${post.url}#webpage`,
    name: post.title,
    url: `${SITE_URL}${post.url}`,
    inLanguage: "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": `${SITE_URL}${post.url}#article` },
    ...(post.aboutId ? { about: { "@id": post.aboutId } } : {}),
    audience: { "@type": "Patient" },
    ...(post.description ? { description: post.description } : {}),
  };
  if (post.reviewedBy) {
    node.reviewedBy = { "@id": PHYSICIAN_ID[post.reviewedBy.id] };
    node.lastReviewed = post.lastReviewed;
  }
  return node;
}

/** CollectionPage + ItemList for the grouped blog index. */
export function collectionPageNode(index: {
  title: string;
  url: string;
  description?: string;
  items: { name: string; url: string }[];
}) {
  return {
    "@type": "CollectionPage",
    "@id": `${SITE_URL}${index.url}#webpage`,
    name: index.title,
    url: `${SITE_URL}${index.url}`,
    inLanguage: "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    ...(index.description ? { description: index.description } : {}),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: index.items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: it.name,
        url: `${SITE_URL}${it.url}`,
      })),
    },
  };
}

/** Real titles, descriptions and YouTube upload dates for the videos
 *  embedded on the site (client-answers item 30), keyed by YouTube id. */
export const VIDEO_META: Record<string, { title: string; description: string; uploadDate: string }> = {
  G2I1fNgxzkE: {
    title: "The Pillars of Health, Episode 05: Dr. Ajay Kaduskar",
    description: "Dr. Ajay on everyday habits that protect long-term health.",
    uploadDate: "2025-07-08",
  },
  YjXtEOQ724Y: {
    title: "Diabetes and obesity: myth vs fact",
    description: "Dr. Ajay separates common diabetes myths from the facts.",
    uploadDate: "2025-09-30",
  },
};

/** VideoObject for the click-to-load YouTube facade on a page or post. */
export function videoNode(video: {
  id: string;
  title: string;
  pageUrl: string;
  description?: string;
  uploadDate?: string;
  thumbnail?: string;
}) {
  return {
    "@type": "VideoObject",
    // per-video id: a page can embed more than one video
    "@id": `${SITE_URL}${video.pageUrl}#video-${video.id}`,
    name: video.title,
    embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}`,
    ...(video.description ? { description: video.description } : {}),
    url: `${SITE_URL}${video.pageUrl}`,
    ...(video.uploadDate ? { uploadDate: video.uploadDate } : {}),
    ...(video.thumbnail ? { thumbnailUrl: `${SITE_URL}${video.thumbnail}` } : {}),
  };
}

/** Renders the whole page graph as a single JSON-LD script. */
export function JsonLd({ nodes }: { nodes: (object | null)[] }) {
  const graph = nodes.filter((n): n is object => !!n);
  if (graph.length === 0) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(
          /</g,
          "\\u003c"
        ),
      }}
    />
  );
}
