import Link from "next/link";
import {
  GlucoseDropIcon,
  ScaleIcon,
  BpCuffIcon,
  ThyroidIcon,
  BabyIcon,
  TeenIcon,
} from "@/components/icons";

/**
 * "Find care by concern" — a compact row of text pills with line icons that
 * sits directly under the hero. One horizontal scroll row on mobile.
 */
const CONCERNS = [
  { label: "High sugar or diabetes", href: "/diabetes/", Icon: GlucoseDropIcon },
  { label: "Weight concerns", href: "/obesity/", Icon: ScaleIcon },
  { label: "Blood pressure or heart", href: "/heart-care/", Icon: BpCuffIcon },
  { label: "Thyroid", href: "/thyroid-clinic/", Icon: ThyroidIcon },
  { label: "My child's health", href: "/blooming-buds/", Icon: BabyIcon },
  { label: "My teenager", href: "/blooming-buds/adolescent-health/", Icon: TeenIcon },
] as const;

export function ConcernLinks() {
  return (
    <div
      aria-label="Find care by concern"
      className="flex gap-2 overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] max-md:-mx-4 max-md:px-4 max-md:pb-1 md:flex-wrap [&::-webkit-scrollbar]:hidden"
    >
      {CONCERNS.map(({ label, href, Icon }) => (
        <Link
          key={label}
          href={href}
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full border border-line bg-white px-4 text-[14.5px] font-medium text-ink shadow-[var(--shadow-card)] transition-colors hover:border-plum-300 hover:text-plum"
        >
          <Icon size={18} className="text-plum" />
          {label}
        </Link>
      ))}
    </div>
  );
}
