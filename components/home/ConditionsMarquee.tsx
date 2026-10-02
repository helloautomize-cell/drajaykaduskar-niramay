import Link from "next/link";
import { cn } from "@/lib/utils";
import { iconSet } from "@/components/icons";

export interface ConditionPill {
  /** line-icon name from iconSet (18px) */
  icon: string;
  label: string;
  href: string;
}

function Pill({ it, hidden }: { it: ConditionPill; hidden?: boolean }) {
  const Icon = iconSet[it.icon];
  return (
    <Link
      href={it.href}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-line bg-card px-4 py-2 text-[15px] font-semibold text-ink shadow-[var(--shadow-card)] transition-colors hover:border-plum/40 hover:text-plum"
    >
      {Icon ? <Icon size={18} className="text-plum" aria-hidden /> : null}
      {it.label}
    </Link>
  );
}

function Row({ items, reverse, className }: { items: ConditionPill[]; reverse?: boolean; className?: string }) {
  return (
    <div className={cn("marquee overflow-hidden", className)}>
      <div
        className={cn("marquee-track", reverse && "marquee-reverse")}
        style={{ ["--marquee-speed" as string]: `${items.length * 9}s` }}
      >
        {items.map((it) => (
          <Pill key={it.href} it={it} />
        ))}
        {/* duplicate for the seamless loop; hidden from AT and in reduced motion */}
        <span className="marquee-clone contents">
          {items.map((it) => (
            <Pill key={`${it.href}-x`} it={it} hidden />
          ))}
        </span>
      </div>
    </div>
  );
}

/**
 * "Conditions we look after" pills marquee (replaces the second card
 * carousel): two rows drifting in opposite directions on desktop, a single
 * row with every pill on mobile. Pauses on hover/focus/press; the pills
 * wrap statically under prefers-reduced-motion.
 */
export function ConditionsMarquee({ items }: { items: ConditionPill[] }) {
  const half = Math.ceil(items.length / 2);
  return (
    <div className="space-y-3">
      {/* mobile: one row with all conditions */}
      <Row items={items} className="md:hidden" />
      {/* desktop: two rows, opposite directions */}
      <Row items={items.slice(0, half)} className="max-md:hidden" />
      <Row items={items.slice(half)} reverse className="max-md:hidden" />
    </div>
  );
}
