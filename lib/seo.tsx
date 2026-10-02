/**
 * SEO helpers: generateMetadata inputs and JSON-LD graph builders.
 *
 * Structured data is emitted as ONE `@graph` per page with stable @ids so
 * entities link to each other instead of being duplicated:
 *   https://www.niramayclinics.com/#clinic   - the clinic (MedicalClinic +
 *                                              LocalBusiness + Organization)
 *   https://www.niramayclinics.com/#website  - WebSite
 *   https://www.niramayclinics.com/#dr-ajay / #dr-prajakta - Physicians
 *   <pageUrl>#webpage | #condition | #article | #faq | #breadcrumb | #video
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
      type: "article",
      ...(opts?.image ? { images: [{ url: `${SITE_URL}${opts.image}` }] } : ogImages ? { images: ogImages } : {}),
    },
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

/** The clinic node — identical on every page so crawlers see one entity. */
export function clinicNode() {
  const sameAs = [
    httpOrNull(site.googleProfiles.clinic.mapsUrl),
    httpOrNull(site.googleProfiles.drAjay.mapsUrl),
  ].filter((v): v is string => !!v);
  return {
    "@type": ["MedicalClinic", "LocalBusiness"],
    "@id": CLINIC_ID,
    name: site.name,
    alternateName: [site.centres.adult, site.centres.child],
    url: `${SITE_URL}/`,
    telephone: "+91-712-2422214",
    email: site.email,
    address: postalAddress,
    geo: clinicGeo,
    foundingDate: site.foundedYear,
    founder: { "@id": PHYSICIAN_ID.ajay },
    medicalSpecialty: ["Diabetology", "Pediatric", "Cardiology"],
    openingHoursSpecification: [hoursSpec(MON_SAT, "08:30", "18:00")],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-712-2422214",
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
        medicalSpecialty: ["Diabetology", "Cardiology"],
      },
      {
        "@type": "MedicalClinic",
        name: site.centres.child,
        medicalSpecialty: ["Pediatric", "Adolescent Medicine"],
      },
      {
        "@type": "MedicalBusiness",
        name: "Niramay in-house laboratory",
        openingHoursSpecification: [hoursSpec(MON_SAT, "07:00", "19:00")],
      },
      {
        "@type": "Pharmacy",
        name: site.pharmacy.name,
        telephone: site.pharmacy.display,
        openingHoursSpecification: [hoursSpec(MON_SAT, "08:30", "20:00")],
      },
    ],
    availableService: [
      { "@type": "MedicalTest", name: "Laboratory services" },
      { "@type": "MedicalTest", name: "2D Echo, ECG and treadmill stress test" },
    ],
    areaServed,
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
  },
};

export function physicianNode(d: Doctor) {
  const sameAs = [d.id === "ajay" ? site.googleProfiles.drAjay.mapsUrl : ""].filter(Boolean);
  return {
    "@type": "Physician",
    "@id": PHYSICIAN_ID[d.id],
    name: d.name,
    url: `${SITE_URL}${d.profileHref}`,
    image: `${SITE_URL}${d.avatar}`,
    description: d.role,
    worksFor: { "@id": CLINIC_ID },
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
  { name: string; alternateName?: string; treatments: string[]; specialty: string }
> = {
  "/diabetes/": {
    name: "Diabetes mellitus",
    alternateName: "Madhumeh",
    treatments: ["Nutrition and lifestyle changes", "Oral medicines", "Insulin therapy"],
    specialty: "Diabetology",
  },
  "/diabetes/type-1-diabetes/": {
    name: "Type 1 diabetes mellitus",
    alternateName: "Type 1 diabetes",
    treatments: ["Insulin therapy", "Blood glucose monitoring", "Diabetes education"],
    specialty: "Diabetology",
  },
  "/diabetes/type-2-diabetes/": {
    name: "Type 2 diabetes mellitus",
    alternateName: "Madhumeh",
    treatments: ["Nutrition and lifestyle changes", "Oral medicines", "Insulin therapy when needed"],
    specialty: "Diabetology",
  },
  "/diabetes/diabetes-in-pregnancy/": {
    name: "Gestational diabetes mellitus",
    alternateName: "Diabetes in pregnancy",
    treatments: ["Nutrition and lifestyle changes", "Blood glucose monitoring", "Insulin therapy when needed"],
    specialty: "Diabetology",
  },
  "/diabetes/prediabetes-risk-assessment/": {
    name: "Prediabetes",
    treatments: ["Nutrition and lifestyle changes", "Weight management", "Regular blood sugar checks"],
    specialty: "Diabetology",
  },
  "/obesity/": {
    name: "Obesity",
    alternateName: "Motapa",
    treatments: ["Nutrition and lifestyle changes", "Medical weight management", "Behavioural support"],
    specialty: "Diabetology",
  },
  "/hypertension-clinic/": {
    name: "Hypertension",
    alternateName: "High blood pressure",
    treatments: ["Lifestyle changes", "Antihypertensive medicines", "Regular blood pressure monitoring"],
    specialty: "Cardiology",
  },
  "/thyroid-clinic/": {
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
    possibleTreatment: c.treatments.map((t) => ({ "@type": "MedicalTherapy", name: t })),
    relevantSpecialty: { "@type": "MedicalSpecialty", name: c.specialty },
  };
}

export function medicalWebPageNode(
  meta: PageFrontmatter,
  doctor: Doctor | null,
  opts?: { lastReviewed?: string }
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
    about: cond
      ? { "@id": `${SITE_URL}${meta.url}#condition` }
      : { "@type": "MedicalProcedure", name: meta.title },
  };
  if (doctor) {
    node.reviewedBy = { "@id": PHYSICIAN_ID[doctor.id] };
    node.lastReviewed = opts?.lastReviewed;
  }
  return node;
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
  reviewedBy?: Doctor;
  image?: string;
}) {
  return {
    "@type": "BlogPosting",
    "@id": `${SITE_URL}${post.url}#article`,
    headline: post.title,
    url: `${SITE_URL}${post.url}`,
    inLanguage: "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    datePublished: post.published || undefined,
    dateModified: post.updated || post.published || undefined,
    author: { "@id": PHYSICIAN_ID[post.author.id] },
    ...(post.reviewedBy ? { reviewedBy: { "@id": PHYSICIAN_ID[post.reviewedBy.id] } } : {}),
    ...(post.image ? { image: `${SITE_URL}${post.image}` } : {}),
    publisher: { "@id": CLINIC_ID },
  };
}

/** VideoObject for the click-to-load YouTube facade on a page or post. */
export function videoNode(video: {
  id: string;
  title: string;
  pageUrl: string;
  uploadDate?: string;
  thumbnail?: string;
}) {
  return {
    "@type": "VideoObject",
    "@id": `${SITE_URL}${video.pageUrl}#video`,
    name: video.title,
    embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}`,
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
