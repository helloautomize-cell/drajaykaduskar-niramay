"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site-config";
import { BookButton } from "@/components/ui/BookButton";
import { PhoneIcon } from "@/components/icons";

export interface TocEntry {
  id: string;
  text: string;
  depth: number;
}

/**
 * Sticky right-rail table of contents for service detail pages: scroll-spy
 * section links plus a Book card with both phone numbers.
 */
export function TocRail({ toc, className }: { toc: TocEntry[]; className?: string }) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const els = toc
      .map((t) => document.getElementById(t.id))
      .filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px" }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [toc]);

  return (
    <aside className={cn("lg:sticky lg:top-28 lg:self-start", className)} aria-label="On this page">
      {toc.length > 1 && (
        <nav className="rounded-[16px] border border-line bg-white p-5">
          <p className="eyebrow">On this page</p>
          <ul className="mt-3 space-y-1">
            {toc.map((t) => (
              <li key={t.id}>
                <a
                  href={`#${t.id}`}
                  className={cn(
                    "block rounded-[8px] px-2.5 py-2 text-[14.5px] leading-snug transition-colors",
                    "focus-visible:outline-2 focus-visible:outline-plum",
                    active === t.id
                      ? "bg-plum-50 font-semibold text-plum"
                      : "text-ink-600 hover:bg-plum-50/50 hover:text-ink"
                  )}
                  aria-current={active === t.id ? "true" : undefined}
                >
                  {t.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <div className="mt-4 rounded-[16px] border border-plum/20 bg-plum-50/60 p-5">
        <p className="text-[16px] font-bold text-ink">Book an appointment</p>
        <p className="mt-1 text-[14px] leading-relaxed text-ink-600">
          Call or message us to choose a time that suits you.
        </p>
        <BookButton href="/contact/#book" className="mt-4 w-full justify-center" />
        <div className="mt-4 space-y-2 text-[14.5px] font-medium">
          <a href={site.phone.tel} className="flex min-h-[44px] items-center gap-2 text-ink transition-colors hover:text-plum">
            <PhoneIcon size={16} aria-hidden className="text-plum" /> {site.phone.display}
          </a>
          <a href={site.mobile.tel} className="flex min-h-[44px] items-center gap-2 text-ink transition-colors hover:text-plum">
            <PhoneIcon size={16} aria-hidden className="text-plum" /> {site.mobile.display}
          </a>
        </div>
      </div>
    </aside>
  );
}
