import Image from "next/image";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContactForm } from "@/components/forms/ContactForm";
import { site } from "@/lib/site-config";

import { GlassCard } from "@/components/ui/GlassCard";
import { ClockIcon, EmergencyIcon, PhoneIcon } from "@/components/icons";
import { renderNodesPublic, splitBody } from "@/lib/content/render";
import type { ContentPage } from "@/lib/content/pages";

/**
 * Contact / book template (plan 3.3): form beside the clinic image with glass
 * info cards (address, hours, emergency). Body markdown renders above.
 */
export function ContactPageTemplate({ page }: { page: ContentPage }) {
  const h1 = page.h1 || page.meta.title;
  const { intro } = splitBody(page.body);

  // The first part of the body ("Ways to book" list) renders above the split.
  return (
    <article>
      <div className="mx-auto max-w-[1240px] px-4 pt-6 sm:px-6">
        <Breadcrumbs items={[{ label: "Contact", href: page.meta.url }]} />
        <h1 className="t-h2 mt-8 text-ink">{h1}</h1>
      </div>

      <div className="mx-auto mt-6 max-w-[1240px] px-4 sm:px-6">
        {/* "Ways to book" from the body, minus the form-field spec */}
        <WaysToBook intro={intro} />

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* left: clinic image + glass info cards */}
          <div className="space-y-5">
            <div className="overflow-hidden rounded-[20px]">
              <Image
                src="/images/clinic/exterior-entrance.jpg"
                alt="The street-level entrance of Niramay Clinics, look for this entrance"
                width={760}
                height={560}
                className="h-auto w-full object-cover"
                sizes="(min-width:1024px) 42vw, 100vw"
                loading="eager"
              />
            </div>
            <GlassCard icon={PhoneIcon} title="Address" titleAs="h2" className="border-plum/15 bg-plum-50/60">
              <p>
                {site.address.line1}, {site.address.line2},
                <br />
                {site.address.line3}, {site.address.city} {site.address.pin}
              </p>
              {(["clinic", "drAjay"] as const)
                .filter((k) => site.googleProfiles[k].mapsUrl)
                .map((k) => (
                  <a
                    key={k}
                    href={site.googleProfiles[k].mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 font-semibold text-plum transition-colors hover:text-plum-700"
                  >
                    See {site.googleProfiles[k].name} on Google Maps
                  </a>
                ))}
            </GlassCard>
            <GlassCard icon={ClockIcon} title="Hours" titleAs="h2" className="border-plum/15 bg-plum-50/60">
              <p>OPD: {site.hours.opd} ({site.hours.sunday.toLowerCase()})</p>
              <p className="mt-1">Laboratory: {site.hours.lab}</p>
              <p className="mt-1">Pharmacy: {site.hours.pharmacy}</p>
              <p className="mt-1">Phone: {site.hours.phone}</p>
              <p className="mt-1">{site.hours.holiday}</p>
            </GlassCard>
            <GlassCard icon={EmergencyIcon} title="Emergencies" titleAs="h2" className="border-red-200 bg-[#fdf1f1]">
              <p>{site.emergency.disclaimer}</p>
            </GlassCard>
          </div>

          {/* right: form */}
          <div className="rounded-[20px] border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:p-8">
            <h2 className="t-h4 text-ink">Appointment request form</h2>
            <p className="mt-1 text-[15px] text-ink-600">
              We will call or message you to confirm a time. Your appointment is
              confirmed only after you hear from us.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>

        {/* remaining body content (address block etc.) */}
        <div className="mt-12 max-w-[820px]">
          <RemainingBody page={page} />
        </div>
      </div>
    </article>
  );
}

function WaysToBook({ intro }: { intro: ReturnType<typeof splitBody>["intro"] }) {
  // keep only the "Ways to book" heading + its list from the intro
  return <>{renderNodesPublic(intro.slice(0, 2), "ways")}</>;
}

function RemainingBody({ page }: { page: ContentPage }) {
  const { intro, sections } = splitBody(page.body);
  // skip the "Ways to book" and form-fields sections — rendered by the template
  const rest = sections.filter((s) => !/ways to book|appointment request form/i.test(s.title));
  return (
    <>
      {intro.slice(2).length > 0 && renderNodesPublic(intro.slice(2), "intro-rest")}
      {rest.map((s) => (
        <section key={s.id} aria-labelledby={s.id} className="scroll-mt-28">
          <h2 id={s.id} className="t-h4 mt-9 text-ink">
            {s.title}
          </h2>
          {renderNodesPublic(s.nodes, s.id)}
        </section>
      ))}
    </>
  );
}
