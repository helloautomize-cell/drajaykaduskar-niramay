import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { allPages, allPosts, pageByUrl, postBySlug, type ContentPage } from "@/lib/content/pages";
import { renderMarkdown } from "@/lib/content/render";
import { templateFor, badgeFor, heroImageFor, midImageFor, serviceCardText } from "@/lib/page-config";
import { reviewerFor, doctors } from "@/lib/doctors";
import {
  pageMetadata,
  JsonLd,
  medicalWebPageJsonLd,
  medicalTestJsonLd,
  medicalClinicJsonLd,
  faqPageJsonLd,
  articleJsonLd,
  videoJsonLd,
} from "@/lib/seo";
import {
  diabetesHeartGroups,
  childTeenGroups,
  labPharmacyLinks,
} from "@/lib/nav";
import { ServiceHubTemplate } from "@/components/templates/ServiceHub";
import { ServiceDetailTemplate } from "@/components/templates/ServiceDetail";
import { EditorialTemplate } from "@/components/templates/Editorial";
import { LegalTemplate } from "@/components/templates/Legal";
import { ContactPageTemplate } from "@/components/templates/ContactPage";
import { BlogListTemplate } from "@/components/templates/BlogList";
import { BlogPostTemplate } from "@/components/templates/BlogPost";
import { ServicesIndexTemplate } from "@/components/templates/ServicesIndex";
import { FaqsTemplate } from "@/components/templates/FaqsPage";
import type { RelatedService } from "@/components/sections/RelatedServices";
import type { ServiceSlide } from "@/components/sections/ServiceCarousel";

export const dynamic = "error"; // fully static
export const dynamicParams = false;

function urlOf(params: { slug?: string[] }): string {
  const parts = params.slug ?? [];
  return "/" + parts.join("/") + "/";
}

/* ------------------------------------------------------ static params */

export function generateStaticParams() {
  const pageParams = allPages()
    .map((p) => p.meta.url)
    // "/" is the home placeholder; "-" is the 404; /doctors/* have a dedicated route
    .filter((u) => u !== "/" && u !== "-" && !u.startsWith("/doctors/"))
    .map((u) => ({ slug: u.replace(/^\/|\/$/g, "").split("/") }));
  const postParams = allPosts().map((p) => ({ slug: ["health-library", p.slug] }));
  return [...pageParams, ...postParams];
}

/* ---------------------------------------------------------- metadata */

export function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  return params.then((p) => {
    const url = urlOf(p);
    const post = p.slug?.[0] === "health-library" && p.slug.length === 2 ? postBySlug().get(p.slug[1]) : undefined;
    if (post) {
      return {
        title: post.meta.title,
        description:
          post.meta.excerpt ||
          `An article by ${post.meta.author} on the Niramay Clinics Health Library.`,
        alternates: { canonical: post.meta.url },
      };
    }
    const page = pageByUrl().get(url);
    if (!page) return {};
    return pageMetadata(page.meta);
  });
}

/* ------------------------------------------------- navigation helpers */

function siblingLinks(url: string): { label: string; href: string; badge?: string }[] {
  for (const g of [...diabetesHeartGroups, ...childTeenGroups]) {
    if (g.links.some((l) => l.href === url)) {
      return g.links.filter((l) => l.href !== url).concat(
        // top up from sibling groups in the same menu
        []
      );
    }
  }
  if (labPharmacyLinks.some((l) => l.href === url)) return labPharmacyLinks.filter((l) => l.href !== url);
  return [];
}

function relatedFor(url: string): RelatedService[] {
  // same-menu siblings first, then fill from the same top-level group
  const inDh = diabetesHeartGroups.some((g) => g.links.some((l) => l.href === url));
  const inCt = childTeenGroups.some((g) => g.links.some((l) => l.href === url));
  const pool = inDh
    ? diabetesHeartGroups.flatMap((g) => g.links)
    : inCt
      ? childTeenGroups.flatMap((g) => g.links)
      : labPharmacyLinks;
  const siblings = siblingLinks(url);
  const ordered = [...siblings, ...pool.filter((l) => !siblings.some((s) => s.href === l.href) && l.href !== url)];
  return ordered.slice(0, 3).map((l) => ({
    badge: l.badge ?? "health-checkup",
    title: l.label,
    text: serviceCardText[l.href] ?? "",
    href: l.href,
  }));
}

/** Resolve a post's `related:` URL list into ServiceGlassCard data. */
function relatedPagesFor(urls: string[]): RelatedService[] {
  const navLinks = [
    ...diabetesHeartGroups.flatMap((g) => g.links),
    ...childTeenGroups.flatMap((g) => g.links),
    ...labPharmacyLinks,
  ];
  return urls.slice(0, 3).map((href) => {
    const nav = navLinks.find((l) => l.href === href);
    const page = pageByUrl().get(href);
    return {
      badge: nav?.badge ?? badgeFor(href) ?? "health-checkup",
      title: nav?.label ?? page?.h1 ?? page?.meta.title ?? href,
      text: serviceCardText[href] ?? page?.meta.meta_description ?? "",
      href,
    };
  });
}

function hubSubServices(url: string): ServiceSlide[] {
  const links =
    url === "/diabetes/"
      ? diabetesHeartGroups[0].links.filter((l) => l.href !== "/diabetes/")
      : url === "/obesity/"
        ? diabetesHeartGroups[1].links.filter((l) => l.href !== "/obesity/")
        : url === "/heart-care/"
          ? diabetesHeartGroups[2].links.filter((l) => l.href !== "/heart-care/")
          : url === "/blooming-buds/"
            ? childTeenGroups.flatMap((g) => g.links).filter((l) => l.href !== "/blooming-buds/" && l.href !== "/vaccination/")
            : [];
  return links.map((l) => ({
    badge: l.badge ?? "health-checkup",
    title: l.label,
    text: serviceCardText[l.href] ?? "",
    href: l.href,
  }));
}

function crumbsFor(page: ContentPage): { label: string; href: string }[] {
  const parts = page.meta.url.replace(/^\/|\/$/g, "").split("/");
  const crumbs: { label: string; href: string }[] = [];
  if (parts.length > 1) {
    const parentUrl = `/${parts.slice(0, -1).join("/")}/`;
    const parent = pageByUrl().get(parentUrl);
    crumbs.push({ label: parent ? parent.h1 || parent.meta.title : titleize(parts[0]), href: parentUrl });
  }
  crumbs.push({ label: page.h1 || page.meta.title, href: page.meta.url });
  return crumbs;
}

function titleize(s: string) {
  return s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/* -------------------------------------------------------------- page */

export default async function CatchAll({ params }: { params: Promise<{ slug?: string[] }> }) {
  const p = await params;
  const url = urlOf(p);

  /* blog posts */
  if (p.slug?.[0] === "health-library" && p.slug.length === 2) {
    const post = postBySlug().get(p.slug[1]);
    if (!post) notFound();
    const author = post.meta.author.includes("Prajakta") ? doctors.prajakta : doctors.ajay;
    const reviewer = post.meta.reviewed_by.includes("Prajakta")
      ? doctors.prajakta
      : post.meta.reviewed_by.includes("Ajay")
        ? doctors.ajay
        : author;
    const doc = renderMarkdown(post.body, { videoId: post.meta.video || undefined });
    const relatedPosts = allPosts()
      .filter((r) => r.slug !== post.slug && (r.meta.author.includes("Prajakta") === post.meta.author.includes("Prajakta")))
      .slice(0, 2);
    const relatedPages = relatedPagesFor(post.meta.related);
    const postImage = post.meta.image ? `/images/${post.meta.image}` : undefined;

    const jsonLd: object[] = [
      articleJsonLd({
        title: post.meta.title,
        url: post.meta.url,
        published: post.meta.published,
        updated: post.meta.updated,
        author,
        reviewedBy: reviewer,
        image: postImage,
      }),
    ];
    if (doc.faq.length > 0) jsonLd.push(faqPageJsonLd(doc.faq));
    if (post.meta.video) {
      jsonLd.push(
        videoJsonLd({
          id: post.meta.video,
          title: `${post.meta.title}: video`,
          pageUrl: post.meta.url,
          uploadDate: post.meta.published || undefined,
          thumbnail: postImage,
        })
      );
    }
    return (
      <>
        <JsonLd data={jsonLd} />
        <BlogPostTemplate
          post={post}
          doc={doc}
          author={author}
          reviewer={reviewer}
          relatedPages={relatedPages}
          relatedPosts={relatedPosts}
        />
      </>
    );
  }

  const page = pageByUrl().get(url);
  if (!page) notFound();

  const template = templateFor(page.meta);
  const doc = renderMarkdown(page.body);
  const reviewer = reviewerFor(page.meta.section, page.meta.reviewed_by);
  const badge = badgeFor(page.meta.url);
  const crumbs = crumbsFor(page);

  const schemaField = page.meta.schema;
  // BreadcrumbList JSON-LD is emitted by the <Breadcrumbs/> component in each template.
  const jsonLd: object[] = [];
  if (/MedicalTest|DiagnosticLab/i.test(schemaField)) jsonLd.push(medicalTestJsonLd(page.meta));
  if (/MedicalWebPage|MedicalCondition/i.test(schemaField) || template === "service-detail" || template === "hub") {
    jsonLd.push(medicalWebPageJsonLd(page.meta, reviewer));
  }
  if (/MedicalClinic|ContactPage/i.test(schemaField)) jsonLd.push(medicalClinicJsonLd());
  if (doc.faq.length > 0) jsonLd.push(faqPageJsonLd(doc.faq));

  const ld = <JsonLd data={jsonLd} />;

  switch (template) {
    case "hub":
      return (
        <>
          {ld}
          <ServiceHubTemplate
            page={page}
            doc={doc}
            crumbs={crumbs}
            badge={badge}
            heroImage={heroImageFor(page.meta)}
            midImage={midImageFor(page.meta)}
            reviewer={reviewer}
            subServices={hubSubServices(url)}
          />
        </>
      );
    case "service-detail":
      return (
        <>
          {ld}
          <ServiceDetailTemplate
            page={page}
            doc={doc}
            crumbs={crumbs}
            badge={badge}
            heroImage={heroImageFor(page.meta)}
            reviewer={reviewer}
            related={relatedFor(url)}
          />
        </>
      );
    case "legal":
      return (
        <>
          {ld}
          <LegalTemplate page={page} doc={doc} />
        </>
      );
    case "contact":
      return (
        <>
          {ld}
          <ContactPageTemplate page={page} />
        </>
      );
    case "services-index":
      return (
        <>
          {ld}
          <ServicesIndexTemplate page={page} doc={doc} crumbs={crumbs} />
        </>
      );
    case "faqs":
      return (
        <>
          {ld}
          <FaqsTemplate page={page} doc={doc} crumbs={crumbs} />
        </>
      );
    case "blog-list":
      return (
        <>
          {ld}
          <BlogListTemplate page={page} posts={allPosts()} />
        </>
      );
    case "editorial":
    default:
      return (
        <>
          {ld}
          <EditorialTemplate
            page={page}
            doc={doc}
            crumbs={crumbs}
            reviewer={reviewer}
            images={
              url === "/plan-your-visit/"
                ? [
                    { src: "/images/clinic/exterior-entrance.jpg", alt: "The street-level entrance of Niramay Clinics opposite Dinanath High School" },
                    { src: "/images/clinic/signboard-marathi.jpg", alt: "The Marathi signboard of Niramay Clinics on the outside wall" },
                    { src: "/images/clinic/reception-board.jpg", alt: "The Niramay Clinics reception board showing both centre names" },
                  ]
                : []
            }
          />
        </>
      );
  }
}
