import Image from "next/image";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ServiceBadge } from "@/components/ui/ServiceBadge";
import { TocRail } from "@/components/sections/TocRail";
import { ReviewerBox } from "@/components/sections/ReviewerBox";
import { RelatedServices, type RelatedService } from "@/components/sections/RelatedServices";
import { CtaBand } from "@/components/sections/CtaBand";
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
}: {
  page: ContentPage;
  doc: RenderedDoc;
  crumbs: { label: string; href: string }[];
  badge?: string;
  heroImage: string | null;
  reviewer: Doctor | null;
  related: RelatedService[];
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
              </div>
              {heroImage && (
                <Image
                  src={heroImage}
                  alt={h1}
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

            {reviewer && <ReviewerBox doctor={reviewer} />}
            <RelatedServices items={related} />
            <CtaBand />
          </div>

          <TocRail toc={doc.toc} className="hidden lg:block" />
        </div>
      </div>
    </article>
  );
}
