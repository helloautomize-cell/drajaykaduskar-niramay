import { cn } from "@/lib/utils";
import { ServiceGlassCard } from "@/components/sections/ServiceGlassCard";

export interface RelatedService {
  badge: string;
  title: string;
  text: string;
  href: string;
}

/** "Related services" row: 3 ServiceGlassCards from the same service group. */
export function RelatedServices({
  items,
  className,
}: {
  items: RelatedService[];
  className?: string;
}) {
  if (!items.length) return null;
  return (
    <section aria-label="Related services" className={cn("mt-14", className)}>
      <h2 className="t-h4 text-ink">Related services</h2>
      <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.slice(0, 3).map((s) => (
          <ServiceGlassCard
            key={s.href}
            badge={s.badge}
            title={s.title}
            text={s.text}
            href={s.href}
            className="!w-full"
          />
        ))}
      </div>
    </section>
  );
}
