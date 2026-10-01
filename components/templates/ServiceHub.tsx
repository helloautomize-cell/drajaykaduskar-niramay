import Image from "next/image";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { AccentHeading } from "@/components/ui/AccentHeading";
import { ServiceBadge } from "@/components/ui/ServiceBadge";
import { BookButton } from "@/components/ui/BookButton";
import { ButtonLink } from "@/components/ui/Button";
import { PhoneIcon } from "@/components/icons";
import { ServiceCarousel } from "@/components/sections/ServiceCarousel";
import { ReviewerBox } from "@/components/sections/ReviewerBox";
import { CtaBand } from "@/components/sections/CtaBand";
import type { ContentPage } from "@/lib/content/pages";
import type { RenderedDoc } from "@/lib/content/render";
import type { Doctor } from "@/lib/doctors";
import type { ServiceSlide } from "@/components/sections/ServiceCarousel";

/**
 * Service hub template (plan 3.3): breadcrumb, hero with lg badge + hero
 * image, body sections, sub-service ServiceCarousel, FAQ + reviewer box +
 * CTA band.
 */
export function ServiceHubTemplate({
  page,
  doc,
  crumbs,
  badge,
  heroImage,
  midImage,
  reviewer,
  subServices,
}: {
  page: ContentPage;
  doc: RenderedDoc;
  crumbs: { label: string; href: string }[];
  badge?: string;
  heroImage: string | null;
  midImage: string | null;
  reviewer: Doctor | null;
  subServices: ServiceSlide[];
}) {
  const h1 = page.h1 || page.meta.title;
  const words = h1.split(" ");
  const accent = words.length > 2 ? words[words.length - 1] : words[0];

  return (
    <article>
      <div className="mx-auto max-w-[1240px] px-4 pt-6 sm:px-6">
        <Breadcrumbs items={crumbs} />
      </div>

      {/* hero */}
      <div className="mx-auto mt-8 max-w-[1240px] px-4 sm:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            {badge && <ServiceBadge slug={badge} size="lg" circle className="mb-5" />}
            <AccentHeading as="h1" accent={accent}>
              {h1}
            </AccentHeading>
            <p className="mt-4 max-w-[52ch] text-[18px] leading-relaxed text-ink-600">
              {page.meta.meta_description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <BookButton href="/contact/#book" />
              <ButtonLink
                variant="secondary"
                href={site.phone.tel}
                aria-label={`Call the clinic on ${site.phone.display}`}
              >
                <PhoneIcon size={18} aria-hidden /> {site.phone.display}
              </ButtonLink>
            </div>
          </div>
          {heroImage && (
            <div className="relative overflow-hidden rounded-t-[160px] rounded-b-[24px]">
              <Image
                src={heroImage}
                alt={h1}
                width={720}
                height={620}
                className="h-auto w-full object-cover"
                priority
                sizes="(min-width:1024px) 45vw, 100vw"
              />
            </div>
          )}
        </div>
      </div>

      {/* body */}
      <div className="mx-auto mt-12 max-w-[820px] px-4 sm:px-6">{doc.content}</div>

      {/* optional mid image (e.g. diabetes hub "What your care includes") */}
      {midImage && (
        <div className="mx-auto mt-12 max-w-[820px] px-4 sm:px-6">
          <Image
            src={midImage}
            alt="Dr. Ajay Kaduskar during a consultation"
            width={820}
            height={540}
            className="w-full rounded-[20px] object-cover"
            sizes="(min-width:860px) 820px, 100vw"
          />
        </div>
      )}

      {/* sub-services carousel */}
      {subServices.length > 0 && (
        <div className="mx-auto mt-16 max-w-[1240px] px-4 sm:px-6">
          <h2 className="t-h3 text-ink">Services in this centre</h2>
          <ServiceCarousel items={subServices} tint="plum" className="mt-6" />
        </div>
      )}

      <div className={cn("mx-auto max-w-[820px] px-4 sm:px-6")}>
        {reviewer && <ReviewerBox doctor={reviewer} />}
        <CtaBand />
      </div>
    </article>
  );
}
