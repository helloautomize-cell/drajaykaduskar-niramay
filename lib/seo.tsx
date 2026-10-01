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

export function medicalClinicJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: site.name,
    alternateName: [site.centres.adult, site.centres.child],
    url: SITE_URL,
    telephone: "+91-712-2422214",
    email: site.email,
    address: postalAddress,
    medicalSpecialty: ["Diabetology", "Pediatric", "Cardiology"],
    availableService: [
      { "@type": "MedicalTest", name: "Laboratory services" },
      { "@type": "MedicalTest", name: "2D Echo, ECG and treadmill stress test" },
    ],
  };
}

export function physicianJsonLd(d: Doctor, pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": ["Physician", "ProfilePage"],
    name: d.name,
    url: `${SITE_URL}${pageUrl}`,
    image: `${SITE_URL}${d.avatar}`,
    description: d.role,
    worksFor: { "@type": "MedicalClinic", name: site.name, address: postalAddress },
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
  author: Doctor;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    url: `${SITE_URL}${post.url}`,
    datePublished: post.published || undefined,
    author: {
      "@type": "Physician",
      name: post.author.name,
      url: `${SITE_URL}${post.author.profileHref}`,
    },
    ...(post.image ? { image: `${SITE_URL}${post.image}` } : {}),
    publisher: { "@type": "Organization", name: site.name },
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
