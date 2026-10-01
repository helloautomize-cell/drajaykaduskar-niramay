import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CtaBand } from "@/components/sections/CtaBand";
import type { ContentPage } from "@/lib/content/pages";
import type { RenderedDoc } from "@/lib/content/render";

/**
 * FAQs page: grouped accordions (auto-detected by the renderer) inside an
 * editorial layout. FAQPage JSON-LD is emitted by the route.
 */
export function FaqsTemplate({
  page,
  doc,
  crumbs,
}: {
  page: ContentPage;
  doc: RenderedDoc;
  crumbs: { label: string; href: string }[];
}) {
  const h1 = page.h1 || page.meta.title;
  return (
    <article>
      <div className="mx-auto max-w-[860px] px-4 pt-6 sm:px-6">
        <Breadcrumbs items={crumbs} />
        <h1 className="t-h2 mt-8 text-ink">{h1}</h1>
        {page.meta.meta_description && (
          <p className="mt-3 text-[17px] leading-relaxed text-ink-600">{page.meta.meta_description}</p>
        )}
        <div className="mt-6">{doc.content}</div>
        <CtaBand />
      </div>
    </article>
  );
}
