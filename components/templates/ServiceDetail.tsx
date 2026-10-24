import Image from "next/image";
import Link from "next/link";
import { altFor } from "@/lib/alt-text";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ServiceBadge } from "@/components/ui/ServiceBadge";
import { TocRail } from "@/components/sections/TocRail";
import { ReviewerBox } from "@/components/sections/ReviewerBox";
import { RelatedServices, type RelatedService } from "@/components/sections/RelatedServices";
import { ReviewByline } from "@/components/sections/ReviewByline";
import { CtaBand } from "@/components/sections/CtaBand";
import { WorkshopForm } from "@/components/forms/WorkshopForm";
import { formatDate } from "./BlogList";
import { plusYear } from "@/lib/utils";
import type { ContentPage } from "@/lib/content/pages";
import type { RenderedDoc } from "@/lib/content/render";
import type { Doctor } from "@/lib/doctors";

/**
 * Service detail template (plan 3.3): compact hero with lg badge + optional
 * image, sticky right-rail TOC + Book card on desktop, body, FAQ, reviewer
 * box, related services, CTA band.
 */
export function ServiceDetailTemplate({
  page,
  doc,
  crumbs,
  badge,
  heroImage,
  reviewer,
  related,
  articles = [],
  parent,
}: {
  page: ContentPage;
  doc: RenderedDoc;
  crumbs: { label: string; href: string }[];
  badge?: string;
  heroImage: string | null;
  reviewer: Doctor | null;
  related: RelatedService[];
  articles?: { title: string; href: string }[];
  /** parent hub — rendered as a "Part of" back-link under the byline */
  parent?: { label: string; href: string };
}) {
  const h1 = page.h1 || page.meta.title;

  return (
    <article>
      <div className="mx-auto max-w-[1240px] px-4 pt-6 sm:px-6">
        <Breadcrumbs items={crumbs} />
      </div>

      <div className="mx-auto mt-8 max-w-[1240px] px-4 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0 max-w-[820px]">
            {/* compact hero */}
            <div className="flex items-start gap-6">
              <div className="min-w-0 flex-1">
                {badge && <ServiceBadge slug={badge} size="lg" circle className="mb-4" />}
                <h1 className="t-h2 text-ink">{h1}</h1>
                <p className="mt-3 text-[17px] leading-relaxed text-ink-600">
                  {page.meta.meta_description}
                </p>
                {reviewer && (
                  <ReviewByline
                    doctor={reviewer}
                    lastReviewed={formatDate(page.meta.reviewed || page.modified)}
                  />
                )}
                {parent && (
                  <p className="mt-2 text-[13.5px] text-ink-600">
                    Part of{" "}
                    <Link
                      href={parent.href}
                      className="font-medium text-plum underline decoration-plum/30 underline-offset-2 hover:decoration-plum"
                    >
                      {parent.label}
                    </Link>
                  </p>
                )}
              </div>
              {heroImage && (
                <Image
                  src={heroImage}
                  alt={altFor(heroImage, h1)}
                  width={360}
                  height={300}
                  className="hidden w-[240px] shrink-0 rounded-t-[120px] rounded-b-[18px] object-cover md:block"
                  priority
                  sizes="240px"
                />
              )}
            </div>

            {/* body + FAQ (rendered inline via segments); no reveal wrapper —
                it contains the LCP element and must paint without waiting for JS */}
            <div className="mt-4">{doc.content}</div>

            {page.meta.url === "/blooming-buds/workshops/" && (
              <section aria-labelledby="workshop-form" className="mt-10 scroll-mt-28" id="request-a-workshop">
                <h2 id="workshop-form" className="t-h4 text-ink">
                  Request a workshop
                </h2>
                <p className="mt-2 mb-5 text-[15.5px] text-ink-600">
                  Tell us about your school or group and we will contact you within 2 working days.
                </p>
                <WorkshopForm />
              </section>
            )}

            {articles.length > 0 && (
              <section aria-label="From our Health Library" className="mt-12">
                <h2 className="t-h4 text-ink">From our Health Library</h2>
                <ul className="mt-4 space-y-2.5">
                  {articles.map((a) => (
                    <li key={a.href}>
                      <Link
                        href={a.href}
                        className="text-[15.5px] font-medium text-plum underline decoration-plum/30 underline-offset-2 hover:decoration-plum"
                      >
                        {a.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {reviewer && (
              <ReviewerBox
                doctor={reviewer}
                lastReviewed={formatDate(page.meta.reviewed || page.modified)}
                nextReviewDue={formatDate(plusYear(page.meta.reviewed || page.modified))}
              />
            )}
            <RelatedServices items={related} />
            <CtaBand />
          </div>

          <TocRail toc={doc.toc} className="hidden lg:block" />
        </div>
      </div>
    </article>
  );
}
