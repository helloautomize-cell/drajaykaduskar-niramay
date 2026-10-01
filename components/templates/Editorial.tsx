import Image from "next/image";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ReviewerBox } from "@/components/sections/ReviewerBox";
import { CtaBand } from "@/components/sections/CtaBand";
import type { ContentPage } from "@/lib/content/pages";
import type { RenderedDoc } from "@/lib/content/render";
import type { Doctor } from "@/lib/doctors";

/**
 * Editorial template for core and patient-info pages: breadcrumb, H1, intro
 * body, optional supporting images, reviewer box and CTA band.
 */
export function EditorialTemplate({
  page,
  doc,
  crumbs,
  images = [],
  reviewer,
  cta = true,
}: {
  page: ContentPage;
  doc: RenderedDoc;
  crumbs: { label: string; href: string }[];
  images?: { src: string; alt: string }[];
  reviewer?: Doctor | null;
  cta?: boolean;
}) {
  const h1 = page.h1 || page.meta.title;
  return (
    <article>
      <div className="mx-auto max-w-[820px] px-4 pt-6 sm:px-6">
        <Breadcrumbs items={crumbs} />
        <h1 className="t-h2 mt-8 text-ink">{h1}</h1>
        {page.meta.meta_description && (
          <p className="mt-3 text-[17px] leading-relaxed text-ink-600">
            {page.meta.meta_description}
          </p>
        )}
        <div className="mt-6">{doc.content}</div>
        {images.map((img) => (
          <Image
            key={img.src}
            src={img.src}
            alt={img.alt}
            width={820}
            height={520}
            className="mt-8 w-full rounded-[18px] object-cover"
            sizes="(min-width:860px) 820px, 100vw"
          />
        ))}
        {reviewer && <ReviewerBox doctor={reviewer} />}
        {cta && <CtaBand />}
      </div>
    </article>
  );
}
