import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageByUrl, allPosts } from "@/lib/content/pages";
import { doctors } from "@/lib/doctors";
import { pageMetadata, JsonLd, physicianJsonLd } from "@/lib/seo";
import { DoctorProfileTemplate } from "@/components/templates/DoctorProfile";

export const dynamicParams = false;

const SLUGS: Record<string, { doctor: keyof typeof doctors; hero: string; keyFacts?: string }> = {
  "dr-ajay-kaduskar": {
    doctor: "ajay",
    hero: "/images/doctors/dr-ajay-kaduskar-hero.jpg",
    keyFacts: "/images/doctors/dr-ajay-kaduskar-arms-crossed.jpg",
  },
  "dr-prajakta-kaduskar": {
    doctor: "prajakta",
    hero: "/images/doctors/dr-prajakta-kaduskar-hero.jpg",
  },
};

export function generateStaticParams() {
  return Object.keys(SLUGS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = pageByUrl().get(`/doctors/${slug}/`);
  if (!page) return {};
  return pageMetadata(page.meta);
}

export default async function DoctorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cfg = SLUGS[slug];
  const page = pageByUrl().get(`/doctors/${slug}/`);
  if (!cfg || !page) notFound();

  const doctor = doctors[cfg.doctor];
  const articles = allPosts()
    .filter((p) => p.meta.author.includes(doctor.shortName.split(" ")[1]))
    .map((p) => ({ title: p.meta.title, href: p.meta.url }));

  return (
    <>
      {/* BreadcrumbList JSON-LD comes from the <Breadcrumbs/> component */}
      <JsonLd data={physicianJsonLd(doctor, page.meta.url)} />
      <DoctorProfileTemplate
        page={page}
        doctor={doctor}
        heroImage={cfg.hero}
        keyFactsImage={cfg.keyFacts}
        articles={articles}
      />
    </>
  );
}
