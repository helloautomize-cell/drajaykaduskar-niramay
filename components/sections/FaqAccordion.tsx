"use client";

import { useId, useState } from "react";
import { ChevronIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export interface FaqItem {
  q: string;
  a: React.ReactNode;
  /** plain text, for FAQPage JSON-LD */
  aText: string;
}

/**
 * Accessible FAQ accordion, one open at a time. Native implementation:
 * h3 > button[aria-expanded] + region panels; Arrow/Home/End move between
 * questions; answers expand with a grid-rows transition.
 */
export function FaqAccordion({
  heading,
  id,
  items,
  className,
}: {
  heading?: string;
  id?: string;
  items: FaqItem[];
  className?: string;
}) {
  const [open, setOpen] = useState(-1);
  const base = useId();

  if (!items.length) return null;
  return (
    <section
      id={id}
      aria-label={heading ?? "Frequently asked questions"}
      className={cn("scroll-mt-28", className)}
    >
      {heading && <h2 className="t-h4 text-ink">{heading}</h2>}
      <div
        className="mt-5 divide-y divide-line overflow-hidden rounded-[16px] border border-line bg-white"
        onKeyDown={(e) => {
          const btns = Array.from(
            (e.currentTarget as HTMLElement).querySelectorAll<HTMLElement>("button[aria-expanded]")
          );
          const i = btns.indexOf(e.target as HTMLElement);
          if (i < 0) return;
          const next =
            e.key === "ArrowDown" ? (i + 1) % btns.length :
            e.key === "ArrowUp" ? (i - 1 + btns.length) % btns.length :
            e.key === "Home" ? 0 :
            e.key === "End" ? btns.length - 1 : -1;
          if (next >= 0) {
            e.preventDefault();
            btns[next].focus();
          }
        }}
      >
        {items.map((item, i) => {
          const expanded = i === open;
          return (
            <div key={i} className="group">
              <h3>
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={`${base}-panel-${i}`}
                  id={`${base}-q-${i}`}
                  onClick={() => setOpen(expanded ? -1 : i)}
                  className={cn(
                    "flex w-full items-center justify-between gap-4 px-5 py-4 text-left",
                    "text-[17px] font-semibold text-ink transition-colors",
                    "hover:bg-plum-50/60 focus-visible:outline-2 focus-visible:outline-plum",
                    "min-h-[48px]"
                  )}
                >
                  <span>{item.q}</span>
                  <ChevronIcon
                    size={18}
                    aria-hidden
                    className={cn(
                      "shrink-0 text-plum transition-transform duration-200",
                      expanded && "rotate-180"
                    )}
                  />
                </button>
              </h3>
              <div
                role="region"
                id={`${base}-panel-${i}`}
                aria-labelledby={`${base}-q-${i}`}
                hidden={!expanded}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 text-[16px] leading-relaxed text-ink-600 [&_p]:mt-2 [&_p:first-child]:mt-0">
                  {item.a}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
