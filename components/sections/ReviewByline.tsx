import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Doctor } from "@/lib/doctors";

/**
 * Compact above-the-fold medical review line: named reviewer (linked to the
 * doctor profile) plus the last-reviewed date, matching the page's JSON-LD.
 */
export function ReviewByline({
  doctor,
  lastReviewed,
  className,
}: {
  doctor: Doctor;
  lastReviewed?: string;
  className?: string;
}) {
  return (
    <p className={cn("mt-3 text-[13.5px] leading-relaxed text-ink-600", className)}>
      Medically reviewed by{" "}
      <Link
        href={doctor.profileHref}
        className="font-medium text-plum underline decoration-plum/30 underline-offset-2 hover:decoration-plum"
      >
        {doctor.name}
      </Link>
      {lastReviewed && <> · Last reviewed {lastReviewed}</>}
    </p>
  );
}
