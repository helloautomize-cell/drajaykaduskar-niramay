import Link from "next/link";
import { ChevronRightIcon } from "@/components/icons";

/**
 * Breadcrumbs with BreadcrumbList JSON-LD (plan section 6 SEO layer).
 * Renders nothing for a single-item trail.
 */
export function Breadcrumbs({
  items,
  className,
}: {
  items: { label: string; href: string }[];
  className?: string;
}) {
  const trail = [{ label: "Home", href: "/" }, ...items];
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.label,
      item: `https://niramayclinics.com${it.href}`,
    })),
  };
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1 text-[13.5px]">
        {trail.map((it, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={it.href + it.label} className="flex items-center gap-1">
              {i > 0 && <ChevronRightIcon size={13} className="text-ink-600/60" aria-hidden />}
              {last ? (
                <span aria-current="page" className="font-semibold text-ink">
                  {it.label}
                </span>
              ) : (
                <Link href={it.href} className="text-ink-600 transition-colors hover:text-plum">
                  {it.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </nav>
  );
}
