import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site-config";
import { footerDiabetesHeart, footerChildTeen, patientInfoLinks, footerLegal, type NavLink } from "@/lib/nav";
import { ObfuscatedEmail } from "@/components/ui/ObfuscatedEmail";
import { CookieSettingsLink } from "@/components/layout/CookieSettingsLink";
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon, ArrowIcon, ChevronIcon } from "@/components/icons";

/**
 * Footer (plan G4): white with a top hairline. Service columns are
 * text-only (no badges); on mobile they collapse into accordions while
 * contact, hours and address stay open at the top. Bottom row has Google
 * profile links (only when configured) and the legal line.
 */

const HOURS = [
  `OPD: ${site.hours.opd}`,
  `Lab: ${site.hours.lab}`,
  `Pharmacy: ${site.hours.pharmacy}`,
  "Phone: Every day, 8 am to 9 pm",
];

/** Collapsed accordion on mobile, always-open column on md+ (CSS only). */
function LinkColumn({ heading, links }: { heading: string; links: NavLink[] }) {
  return (
    <details className="fcol -mx-2 border-b border-line px-2 py-1 md:mx-0 md:border-0 md:p-0">
      <summary className="flex min-h-12 items-center justify-between gap-2">
        <span className="eyebrow !text-[11.5px]">{heading}</span>
        <ChevronIcon size={15} className="fcol-chev text-plum-500" />
      </summary>
      <nav aria-label={heading} className="fcol-body">
        <ul className="space-y-1 pb-3 md:mt-3 md:pb-0">
          {links.map((l) => (
            <li key={l.href + l.label}>
              <Link
                href={l.href}
                className="inline-flex min-h-9 items-center text-[14.5px] text-ink-600 transition-colors hover:text-plum"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}

const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.full)}`;

export function Footer() {
  return (
    <footer className="border-t border-line bg-white pb-[calc(80px+env(safe-area-inset-bottom))] lg:pb-0">
      <div className="mx-auto max-w-[1240px] px-4 py-10 sm:px-6 md:py-14">
        <div className="grid gap-6 md:grid-cols-2 md:gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
          {/* (a) Clinic: contact, hours and address stay open at the top */}
          <div>
            <Link href="/" aria-label="Niramay Clinics home" className="inline-block">
              <Image
                src="/images/brand/niramay-logo.png"
                alt="Niramay Clinics"
                width={512}
                height={339}
                sizes="90px"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <address className="mt-5 text-[14.5px] not-italic leading-relaxed text-ink-600">
              {site.address.line1},
              <br />
              <span className="whitespace-nowrap">{site.address.line2}</span>, Dhantoli,
              <br />
              {site.address.city}, {site.address.state} {site.address.pin}
              <span className="mt-1 block text-[13px]">{site.address.line3.replace(", Dhantoli", "")}</span>
            </address>
            <div className="mt-4 space-y-2 text-[14.5px] text-ink-600">
              {HOURS.map((line) => (
                <p key={line} className="flex items-center gap-2">
                  <ClockIcon size={15} className="shrink-0 text-plum-500" />
                  {line}
                </p>
              ))}
              <a href={site.phone.tel} className="flex items-center gap-2 font-semibold text-ink transition-colors hover:text-plum">
                <PhoneIcon size={15} className="shrink-0 text-plum-500" />
                {site.phone.display}
              </a>
              <a href={site.mobile.tel} className="flex items-center gap-2 font-semibold text-ink transition-colors hover:text-plum">
                <PhoneIcon size={15} className="shrink-0 text-plum-500" />
                {site.mobile.display}
              </a>
              <span className="flex items-center gap-2">
                <MailIcon size={15} className="shrink-0 text-plum-500" />
                <ObfuscatedEmail className="transition-colors hover:text-plum" />
              </span>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 pt-1 font-semibold text-plum"
              >
                <MapPinIcon size={15} className="shrink-0" />
                Get directions
                <ArrowIcon size={14} className="transition-transform duration-300 ease-[var(--ease)] group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* (b)-(e) link columns: accordions on mobile */}
          <LinkColumn heading="Diabetes and Heart" links={footerDiabetesHeart} />
          <LinkColumn heading="Child and Teen" links={footerChildTeen} />
          <LinkColumn heading="Patient Info" links={patientInfoLinks} />
          <LinkColumn heading="Legal" links={footerLegal} />
        </div>

        {/* Bottom row */}
        <div className="mt-10 border-t border-line pt-6">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-[14px]">
            {(["clinic", "drAjay"] as const)
              .filter((k) => site.googleProfiles[k].mapsUrl)
              .map((k) => (
                <a
                  key={k}
                  href={site.googleProfiles[k].mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-ink transition-colors hover:text-plum"
                >
                  <MapPinIcon size={15} className="shrink-0 text-plum" />
                  See {site.googleProfiles[k].name} on Google Maps
                </a>
              ))}
            <Link
              href="/plan-your-visit/coming-from-outside-nagpur/"
              className="inline-flex items-center gap-2 text-ink-600 transition-colors hover:text-plum"
            >
              Coming from outside Nagpur?
            </Link>
            <CookieSettingsLink />
          </div>
          <p className="mt-4 max-w-[720px] text-[13px] leading-relaxed text-ink-600">
            {site.serviceArea.line}
          </p>
          {/* No social media accounts (client-answers) — icons stay hidden. */}
          <p className="mt-5 text-[13px] leading-relaxed text-ink-600">
            Caring for Nagpur since {site.foundedYear}. © 2026 Niramay Clinics,
            Nagpur. Information on this website is for general education and
            does not replace a consultation.
          </p>
        </div>
      </div>
    </footer>
  );
}
