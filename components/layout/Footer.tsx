import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site-config";
import { footerDiabetesHeart, footerChildTeen, patientInfoLinks, footerLegal, type NavLink } from "@/lib/nav";
import { ObfuscatedEmail } from "@/components/ui/ObfuscatedEmail";
import { CookieSettingsLink } from "@/components/layout/CookieSettingsLink";
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon, ArrowIcon } from "@/components/icons";

/**
 * Footer (plan G4): white with a top hairline. Service columns are
 * text-only (no badges). Bottom row has Google review placeholders, social
 * icons (hidden until URLs are confirmed) and the legal line.
 */

function LinkColumn({ heading, links }: { heading: string; links: NavLink[] }) {
  return (
    <nav aria-label={heading}>
      <p className="eyebrow mb-4 !text-[11.5px]">{heading}</p>
      <ul className="space-y-1">
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
  );
}

const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.full)}`;

export function Footer() {
  return (
    <footer className="border-t border-line bg-white pb-[calc(80px+env(safe-area-inset-bottom))] lg:pb-0">
      <div className="mx-auto max-w-[1240px] px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
          {/* (a) Clinic */}
          <div>
            <Link href="/" aria-label="Niramay Clinics home" className="inline-block">
              <Image
                src="/images/brand/niramay-logo.png"
                alt="Niramay Clinics"
                width={512}
                height={339}
                sizes="90px"
                className="h-14 w-auto object-contain"
              />
            </Link>
            <address className="mt-5 text-[14.5px] not-italic leading-relaxed text-ink-600">
              {site.address.line1}, {site.address.line2},
              <br />
              {site.address.line3},
              <br />
              {site.address.city}, {site.address.state} {site.address.pin}
            </address>
            <div className="mt-4 space-y-2 text-[14.5px] text-ink-600">
              <p className="flex items-center gap-2">
                <ClockIcon size={15} className="shrink-0 text-plum-500" />
                OPD: {site.hours.opd}
              </p>
              <p className="flex items-center gap-2">
                <ClockIcon size={15} className="shrink-0 text-plum-500" />
                Lab: {site.hours.lab} · Pharmacy: {site.hours.pharmacy}
              </p>
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

          {/* (b)-(e) link columns */}
          <LinkColumn heading="Diabetes and Heart" links={footerDiabetesHeart} />
          <LinkColumn heading="Child and Teen" links={footerChildTeen} />
          <LinkColumn heading="Patient Info" links={patientInfoLinks} />
          <LinkColumn heading="Legal" links={footerLegal} />
        </div>

        {/* Bottom row */}
        <div className="mt-12 border-t border-line pt-6">
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
