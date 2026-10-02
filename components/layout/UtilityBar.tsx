import Link from "next/link";
import { site } from "@/lib/site-config";
import { FontSizeToggle } from "@/components/ui/FontSizeToggle";
import { ClockIcon, PhoneIcon, EmergencyIcon } from "@/components/icons";

/**
 * Utility bar: thin white bar with a bottom hairline.
 * Desktop and tablet only (hidden under 768px). Left: language placeholder
 * and quick links; right: hours, phone and the emergency line in red.
 */
export function UtilityBar() {
  return (
    <div data-print-hide className="hidden border-b border-line bg-white md:block">
      <div className="mx-auto flex h-9 max-w-[1240px] items-center gap-5 whitespace-nowrap px-6 text-[12.5px] font-medium text-ink-600">
        <Link
          href="/plan-your-visit/"
          className="hidden transition-colors hover:text-plum lg:inline"
        >
          Plan your visit
        </Link>
        <Link
          href="/health-library/"
          className="hidden transition-colors hover:text-plum lg:inline"
        >
          Health Library
        </Link>
        <FontSizeToggle />

        <div className="ml-auto flex items-center gap-5">
          <span className="hidden items-center gap-1.5 lg:inline-flex">
            <ClockIcon size={14} aria-hidden />
            OPD {site.hours.opd}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ClockIcon size={14} aria-hidden />
            Lab {site.labHours.short}
          </span>
          <span className="hidden items-center gap-1.5 xl:inline-flex">
            <ClockIcon size={14} aria-hidden />
            Phone 8 am to 9 pm daily
          </span>
          <a
            href={site.phone.tel}
            className="inline-flex items-center gap-1.5 font-semibold text-ink transition-colors hover:text-plum"
          >
            <PhoneIcon size={14} aria-hidden />
            {site.phone.display}
          </a>
          <span className="inline-flex items-center gap-1.5 font-semibold text-red-700">
            <EmergencyIcon size={14} aria-hidden />
            {site.emergency.notice} Call {site.emergency.numbers}
          </span>
        </div>
      </div>
    </div>
  );
}
