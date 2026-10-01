import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Confirm } from "@/components/ui/Confirm";
import type { Doctor } from "@/lib/doctors";

/**
 * "Written by / medically reviewed by" box at the bottom of every medical
 * page, per site-plan.md 0.5.
 */
export function ReviewerBox({
  doctor,
  lastReviewed,
  className,
}: {
  doctor: Doctor;
  lastReviewed?: string;
  className?: string;
}) {
  return (
    <aside
      aria-label="Medical review information"
      className={cn(
        "mt-14 flex gap-5 rounded-[18px] border border-line bg-plum-50/60 p-6",
        className
      )}
    >
      <Image
        src={doctor.avatar}
        alt={doctor.avatarAlt}
        width={64}
        height={64}
        className="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-white"
      />
      <div className="text-[15px] leading-relaxed text-ink-600">
        <p>
          <strong className="text-ink">Written by</strong> the Niramay Clinics
          medical content team. <strong className="text-ink">Medically reviewed by</strong>{" "}
          <Link href={doctor.profileHref} className="font-medium text-plum underline decoration-plum/30 underline-offset-2 hover:decoration-plum">
            {doctor.name}
          </Link>
          , {doctor.qualifications}.
        </p>
        <p className="mt-2">
          <strong className="text-ink">Last reviewed:</strong>{" "}
          {lastReviewed ? lastReviewed : <Confirm>date of sign-off</Confirm>}
          {" · "}
          <strong className="text-ink">Next review due:</strong> 12 months later
        </p>
        <p className="mt-2">
          This page is for general information and is not a substitute for a
          consultation.{" "}
          <Link href="/editorial-policy/" className="font-medium text-plum underline decoration-plum/30 underline-offset-2 hover:decoration-plum">
            Read our Editorial Policy
          </Link>
          .
        </p>
      </div>
    </aside>
  );
}
