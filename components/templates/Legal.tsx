import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Confirm } from "@/components/ui/Confirm";
import { cn } from "@/lib/utils";
import type { ContentPage } from "@/lib/content/pages";
import type { RenderedDoc } from "@/lib/content/render";

/**
 * Legal template (plan 3.3): narrow readable column, left table of contents
 * on desktop, "Last updated" line, no hero image.
 */
export function LegalTemplate({
  page,
  doc,
  lastUpdated,
}: {
  page: ContentPage;
  doc: RenderedDoc;
  lastUpdated?: string;
}) {
  const h1 = page.h1 || page.meta.title;
  const toc = doc.toc.filter((t) => t.depth === 4);

  return (
    <article>
      <div className="mx-auto max-w-[1240px] px-4 pt-6 sm:px-6">
        <Breadcrumbs items={[{ label: h1, href: page.meta.url }]} />
      </div>
      <div className="mx-auto mt-8 max-w-[1240px] px-4 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-[260px_1fr]">
          {/* left TOC */}
          {toc.length > 1 && (
            <nav aria-label="Contents" className="hidden lg:sticky lg:top-28 lg:block">
              <p className="eyebrow">On this page</p>
              <ul className="mt-3 space-y-1 border-l border-line">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a
                      href={`#${t.id}`}
                      className="block py-1.5 pl-4 text-[14px] leading-snug text-ink-600 transition-colors hover:text-plum"
                    >
                      {t.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className="min-w-0 max-w-[720px]">
            <h1 className="t-h2 text-ink">{h1}</h1>
            <p className="mt-3 text-[14px] text-ink-600">
              <strong className="font-semibold text-ink">Last updated:</strong>{" "}
              {lastUpdated ?? <Confirm>date</Confirm>}
            </p>
            <div className={cn("mt-6")}>{doc.content}</div>
          </div>
        </div>
      </div>
    </article>
  );
}
