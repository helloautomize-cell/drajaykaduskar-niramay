import Image from "next/image";
import Link from "next/link";
import type { RootContent, List } from "mdast";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BookButton } from "@/components/ui/BookButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { ChipGroup } from "@/components/ui/ChipGroup";
import { SpecialistIcon } from "@/components/icons";
import { CtaBand } from "@/components/sections/CtaBand";
import {
  splitBody,
  renderNodesPublic,
  nodesText,
} from "@/lib/content/render";
import type { ContentPage } from "@/lib/content/pages";
import type { Doctor } from "@/lib/doctors";

/** Pull bullet item texts out of a section's nodes (for chips). */
function listItems(nodes: RootContent[]): string[] {
  const out: string[] = [];
  for (const n of nodes) {
    if (n.type === "list") {
      for (const li of (n as List).children) {
        out.push(nodesText(li.children));
      }
    }
  }
  return out;
}

/**
 * "Conditions and services" groups: paragraphs like "*Diabetes care:* a · b · c"
 * become a labelled group of non-clickable chips.
 */
function conditionGroups(nodes: RootContent[]): { label: string; items: string[] }[] {
  const out: { label: string; items: string[] }[] = [];
  for (const n of nodes) {
    if (n.type !== "paragraph") continue;
    const first = n.children[0];
    if (!first || first.type !== "emphasis") continue;
    const label = nodesText(first.children).replace(/:\s*$/, "");
    const rest = nodesText(n.children.slice(1) as RootContent[]);
    const items = rest.split("·").map((i) => i.trim()).filter(Boolean);
    if (items.length) out.push({ label, items });
  }
  return out;
}

/** "keep things simple" pull quote (serif accent) beside the real photo. */
function ApproachBlock({ doctor }: { doctor: Doctor }) {
  const img =
    doctor.id === "ajay"
      ? {
          src: "/images/doctors/dr-ajay-kaduskar-keep-simple.jpg",
          alt: "Dr. Ajay Kaduskar beside the 'keep things simple' print in his consulting room",
        }
      : {
          src: "/images/doctors/dr-prajakta-kaduskar-portrait.jpg",
          alt: "Dr. Prajakta Kaduskar at her desk in the Blooming Buds consulting room",
        };
  return (
    <div className="mt-6 grid items-center gap-6 rounded-[20px] border border-line bg-plum-50/50 p-6 sm:grid-cols-[220px_1fr]">
      <Image
        src={img.src}
        alt={img.alt}
        width={440}
        height={520}
        className="h-auto w-full max-w-[220px] rounded-[16px] object-cover"
        sizes="220px"
      />
      <p className="t-h3 text-ink">
        <em className="accent">keep things simple</em>
        <span className="mt-2 block text-[15px] font-normal not-italic leading-relaxed text-ink-600">
          The note framed in Dr. Kaduskar&apos;s consulting room, and how care
          is planned here.
        </span>
      </p>
    </div>
  );
}

/**
 * Doctor profile template (plan 3.3): split hero (portrait + key-facts glass
 * card), About, Areas of care chips, Approach with pull quote, awards,
 * memberships, articles, Book CTA.
 */
export function DoctorProfileTemplate({
  page,
  doctor,
  heroImage,
  keyFactsImage,
  articles,
}: {
  page: ContentPage;
  doctor: Doctor;
  heroImage: string;
  keyFactsImage?: string;
  articles: { title: string; href: string }[];
}) {
  const { intro, sections } = splitBody(page.body);

  // intro contains "**Sub-heading:** ..." paragraph + "**Key facts box**" + ul
  let subtitle = "";
  let keyFactsNode: RootContent | null = null;
  const introRest: RootContent[] = [];
  for (const n of intro) {
    const t = nodesText([n]);
    if (/^Sub-heading:/.test(t)) {
      subtitle = t.replace(/^Sub-heading:\s*/, "");
      continue;
    }
    if (/^Key facts box$/i.test(t.trim())) continue; // marker paragraph
    if (n.type === "list" && !keyFactsNode) {
      keyFactsNode = n;
      continue;
    }
    introRest.push(n);
  }

  const about = sections.filter((s) => /^about/i.test(s.title));
  const areas = sections.find((s) => /areas of care/i.test(s.title));
  const conditions = sections.find((s) => /conditions and services/i.test(s.title));
  const approach = sections.filter((s) => /approach|working with parents/i.test(s.title));
  const rest = sections.filter(
    (s) =>
      !/^about/i.test(s.title) &&
      !/areas of care/i.test(s.title) &&
      !/conditions and services/i.test(s.title) &&
      !/approach|working with parents/i.test(s.title) &&
      // the template renders real article links — skip the body's placeholder section
      !/articles by|writing/i.test(s.title)
  );
  const areaChips = areas ? listItems(areas.nodes) : [];
  const condGroups = conditions ? conditionGroups(conditions.nodes) : [];

  const h1 = page.h1 || page.meta.title;
  const bookLabel = doctor.id === "ajay" ? "Book with Dr. Ajay" : "Book with Dr. Prajakta";

  return (
    <article>
      <div className="mx-auto max-w-[1240px] px-4 pt-6 sm:px-6">
        <Breadcrumbs
          items={[
            { label: "Doctors", href: "/about/" },
            { label: h1, href: page.meta.url },
          ]}
        />
      </div>

      {/* split hero */}
      <div className="mx-auto mt-8 max-w-[1240px] px-4 sm:px-6">
        <div className="grid items-end gap-8 rounded-[24px] bg-gradient-to-br from-plum-50 via-white to-[#fdf3ee] p-6 sm:p-10 lg:grid-cols-[340px_1fr]">
          <div className="relative mx-auto w-full max-w-[340px] overflow-hidden rounded-t-[170px] rounded-b-[20px]">
            <Image
              src={heroImage}
              alt={doctor.name}
              width={680}
              height={850}
              className="h-auto w-full object-cover"
              priority
              sizes="(min-width:1024px) 340px, 80vw"
            />
          </div>
          <div>
            <h1 className="t-h2 text-ink">{h1}</h1>
            {subtitle && (
              <p className="mt-3 text-[17px] leading-relaxed text-ink-600">{subtitle}</p>
            )}
            <div className="mt-6">
              <BookButton href="/contact/#book" label={bookLabel} />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-[1240px] px-4 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0 max-w-[820px]">
            {renderNodesPublic(introRest, "intro")}
            {about.map((s) => (
              <section key={s.id} aria-labelledby={s.id} className="scroll-mt-28">
                <h2 id={s.id} className="t-h4 mt-9 text-ink">
                  {s.title}
                </h2>
                {renderNodesPublic(s.nodes, s.id)}
              </section>
            ))}

            {areaChips.length > 0 && (
              <section aria-labelledby="areas-of-care" className="mt-9 scroll-mt-28" id="areas-of-care">
                <h2 className="t-h4 text-ink">{areas!.title}</h2>
                {/* mobile: first 6 chips + "Show all"; desktop: full list */}
                <ChipGroup items={areaChips} className="mt-4" />
              </section>
            )}

            {condGroups.length > 0 && (
              <section aria-labelledby="conditions-services" className="mt-9 scroll-mt-28" id="conditions-services">
                <h2 className="t-h4 text-ink">{conditions!.title}</h2>
                <div className="mt-4 space-y-5">
                  {condGroups.map((g) => (
                    <div key={g.label}>
                      <h3 className="text-[13.5px] font-semibold uppercase tracking-wide text-ink-600">
                        {g.label}
                      </h3>
                      <ChipGroup items={g.items} className="mt-2" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {approach.map((s) => (
              <section key={s.id} aria-labelledby={s.id} className="scroll-mt-28">
                <h2 id={s.id} className="t-h4 mt-9 text-ink">
                  {s.title}
                </h2>
                {doctor.id === "ajay" && /approach/i.test(s.title) && (
                  <ApproachBlock doctor={doctor} />
                )}
                {renderNodesPublic(s.nodes, s.id)}
              </section>
            ))}

            {rest.map((s) => (
              <section key={s.id} aria-labelledby={s.id} className="scroll-mt-28">
                <h2 id={s.id} className="t-h4 mt-9 text-ink">
                  {s.title}
                </h2>
                {renderNodesPublic(s.nodes, s.id)}
              </section>
            ))}

            {articles.length > 0 && (
              <section
                aria-labelledby="articles-by-doctor"
                className="mt-9 scroll-mt-28"
                id="articles-by-doctor"
              >
                <h2 className="t-h4 text-ink">Articles by {doctor.shortName}</h2>
                <ul className="mt-3 space-y-2">
                  {articles.map((a) => (
                    <li key={a.href}>
                      <Link
                        href={a.href}
                        className="font-medium text-plum underline decoration-plum/30 underline-offset-2 hover:decoration-plum"
                      >
                        {a.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <CtaBand />
          </div>

          {/* key facts glass card */}
          <div className="lg:sticky lg:top-28">
            {keyFactsImage && (
              <Image
                src={keyFactsImage}
                alt={doctor.avatarAlt}
                width={640}
                height={640}
                className="mb-4 hidden w-full rounded-[18px] object-cover lg:block"
                sizes="320px"
              />
            )}
            {keyFactsNode && (
              <GlassCard icon={SpecialistIcon} title="Key facts" className="border-plum/15 bg-plum-50/60">
                <div className="text-[14.5px] [&_ul]:mt-0 [&_li]:text-[14.5px] [&_p]:text-[14.5px]">
                  {renderNodesPublic([keyFactsNode], "keyfacts")}
                </div>
              </GlassCard>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
