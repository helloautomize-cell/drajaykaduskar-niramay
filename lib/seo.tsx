/** SEO helpers: generateMetadata inputs and JSON-LD builders. */
import type { Metadata } from "next";
import { site } from "@/lib/site-config";
import type { Doctor } from "@/lib/doctors";
import type { PageFrontmatter } from "@/lib/content/schema";

export const SITE_URL = "https://www.niramayclinics.com";

export function pageMetadata(meta: PageFrontmatter, opts?: { noindex?: boolean; image?: string }): Metadata {
  // seo_title already contains the "| Niramay Clinics, Nagpur" suffix — use
  // absolute so the root title template does not append it a second time.
  const title = meta.seo_title || meta.title;
  const description = meta.meta_description || undefined;
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
      type: "article",
      ...(opts?.image ? { images: [{ url: `${SITE_URL}${opts.image}` }] } : {}),
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
  {
    "@type": "GeoCircle",
    geoMidpoint: clinicGeo,
    geoRadius: "100000",
  },
];

export function medicalClinicJsonLd() {
  const sameAs = [site.googleProfiles.clinic.mapsUrl].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: site.name,
    alternateName: [site.centres.adult, site.centres.child],
    url: SITE_URL,
    telephone: "+91-712-2422214",
    email: site.email,
    address: postalAddress,
    foundingDate: site.foundedYear,
    medicalSpecialty: ["Diabetology", "Pediatric", "Cardiology"],
    availableService: [
      { "@type": "MedicalTest", name: "Laboratory services" },
      { "@type": "MedicalTest", name: "2D Echo, ECG and treadmill stress test" },
    ],
    areaServed,
    ...(sameAs.length ? { sameAs } : {}),
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

export function physicianJsonLd(d: Doctor, pageUrl: string) {
  const extra = physicianExtras[d.id] || {};
  const sameAs = [d.id === "ajay" ? site.googleProfiles.drAjay.mapsUrl : ""].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": ["Physician", "ProfilePage"],
    name: d.name,
    url: `${SITE_URL}${pageUrl}`,
    image: `${SITE_URL}${d.avatar}`,
    description: d.role,
    worksFor: { "@type": "MedicalClinic", name: site.name, address: postalAddress },
    knowsLanguage: ["en", "hi", "mr"],
    areaServed,
    ...(sameAs.length ? { sameAs } : {}),
    ...extra,
    mainEntity: {
      "@type": "Person",
      name: d.name,
      jobTitle: d.role,
      worksFor: { "@type": "MedicalClinic", name: site.name },
    },
  };
}

export function medicalWebPageJsonLd(
  meta: PageFrontmatter,
  doctor: Doctor | null,
  opts?: { lastReviewed?: string }
) {
  const ld: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: meta.title,
    url: `${SITE_URL}${meta.url}`,
    description: meta.meta_description || undefined,
    about: { "@type": "MedicalClinic", name: site.name },
  };
  if (doctor) {
    ld.reviewedBy = {
      "@type": "Physician",
      name: doctor.name,
      url: `${SITE_URL}${doctor.profileHref}`,
    };
    ld.lastReviewed = opts?.lastReviewed;
  }
  return ld;
}

export function medicalTestJsonLd(meta: PageFrontmatter) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalTest",
    name: meta.title,
    url: `${SITE_URL}${meta.url}`,
    description: meta.meta_description || undefined,
  };
}

export function faqPageJsonLd(items: { q: string; aText: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.aText },
    })),
  };
}

export function breadcrumbJsonLd(crumbs: { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${SITE_URL}${c.href}`,
    })),
  };
}

export function articleJsonLd(post: {
  title: string;
  url: string;
  published: string;
  updated?: string;
  author: Doctor;
  reviewedBy?: Doctor;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    url: `${SITE_URL}${post.url}`,
    datePublished: post.published || undefined,
    dateModified: post.updated || post.published || undefined,
    author: {
      "@type": "Physician",
      name: post.author.name,
      url: `${SITE_URL}${post.author.profileHref}`,
    },
    ...(post.reviewedBy
      ? {
          reviewedBy: {
            "@type": "Physician",
            name: post.reviewedBy.name,
            url: `${SITE_URL}${post.reviewedBy.profileHref}`,
          },
        }
      : {}),
    ...(post.image ? { image: `${SITE_URL}${post.image}` } : {}),
    publisher: { "@type": "Organization", name: site.name },
  };
}

/** VideoObject for the click-to-load YouTube facade on a post. */
export function videoJsonLd(video: {
  id: string;
  title: string;
  pageUrl: string;
  uploadDate?: string;
  thumbnail?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}`,
    url: `${SITE_URL}${video.pageUrl}`,
    ...(video.uploadDate ? { uploadDate: video.uploadDate } : {}),
    ...(video.thumbnail ? { thumbnailUrl: `${SITE_URL}${video.thumbnail}` } : {}),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  const arr = Array.isArray(data) ? data : [data];
  return (
    <>
      {arr.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
