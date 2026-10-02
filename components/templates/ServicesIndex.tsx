import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SwipeCarousel } from "@/components/ui/SwipeCarousel";
import { ServiceGlassCard } from "@/components/sections/ServiceGlassCard";
import { CtaBand } from "@/components/sections/CtaBand";
import {
  diabetesHeartGroups,
  childTeenGroups,
  labPharmacyLinks,
} from "@/lib/nav";
import { serviceCardText } from "@/lib/page-config";
import type { ContentPage } from "@/lib/content/pages";
import type { RenderedDoc } from "@/lib/content/render";

/**
 * Services index: grouped grid of ServiceGlassCards — all services grouped
 * by centre (plan 3.3 editorial variant for /services/).
 */
export function ServicesIndexTemplate({
  page,
  doc,
  crumbs,
}: {
  page: ContentPage;
  doc: RenderedDoc;
  crumbs: { label: string; href: string }[];
}) {
  const h1 = page.h1 || page.meta.title;

  const groups: { heading: string; links: { label: string; href: string; badge?: string }[] }[] = [
    { heading: "Diabetes and Heart", links: diabetesHeartGroups.flatMap((g) => g.links) },
    { heading: "Blooming Buds: Child and Teen", links: childTeenGroups.flatMap((g) => g.links) },
    { heading: "Lab and Pharmacy", links: labPharmacyLinks },
  ];

  return (
    <article>
      <div className="mx-auto max-w-[1240px] px-4 pt-6 sm:px-6">
        <Breadcrumbs items={crumbs} />
        <h1 className="t-h2 mt-8 text-ink">{h1}</h1>
        {page.meta.meta_description && (
          <p className="mt-3 max-w-[60ch] text-[17px] leading-relaxed text-ink-600">
            {page.meta.meta_description}
          </p>
        )}

        {groups.map((g) => (
          <section key={g.heading} className="mt-12">
            <h2 className="t-h4 text-ink">{g.heading}</h2>
            {/* >3 cards: swipe carousel on mobile, grid on md+ */}
            <SwipeCarousel
              label={g.heading}
              gridAt="md"
              gridCols="md:grid-cols-2 lg:grid-cols-3"
              itemClass="w-[68%]"
              className="mt-5"
            >
              {g.links.map((l) => (
                <ServiceGlassCard
                  key={l.href}
                  badge={l.badge ?? "health-checkup"}
                  title={l.label}
                  text={serviceCardText[l.href] ?? ""}
                  href={l.href}
                  lift={false}
                  className="!w-full"
                />
              ))}
            </SwipeCarousel>
          </section>
        ))}

        <div className="mt-12 max-w-[820px]">
          {doc.content}
          <CtaBand />
        </div>
      </div>
    </article>
  );
}
