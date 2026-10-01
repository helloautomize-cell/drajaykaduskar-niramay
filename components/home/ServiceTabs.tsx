"use client";

import { useId, useRef, useState } from "react";
import { ServiceCarousel, type ServiceSlide } from "@/components/sections/ServiceCarousel";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export interface ServiceTab {
  label: string;
  intro: string;
  slides: ServiceSlide[];
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

/**
 * "03 / How we can help" — service-group tabs, each with an intro line and a
 * ServiceCarousel of glass cards. Native roving-tabindex tabs: Arrow keys move
 * between tabs, selection follows focus.
 */
export function ServiceTabs({ tabs, className }: { tabs: ServiceTab[]; className?: string }) {
  const [active, setActive] = useState(0);
  const base = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const next =
      e.key === "ArrowRight" ? (i + 1) % tabs.length :
      e.key === "ArrowLeft" ? (i - 1 + tabs.length) % tabs.length :
      e.key === "Home" ? 0 :
      e.key === "End" ? tabs.length - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div className={className}>
      <div role="tablist" aria-label="Service groups" className="flex flex-wrap items-center gap-2">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${base}-tab-${slug(t.label)}`}
            aria-selected={i === active}
            aria-controls={`${base}-panel-${slug(t.label)}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
            className={cn(
              "min-h-[48px] rounded-full border border-transparent bg-plum-100 px-5 py-2.5 text-[15px] font-semibold text-plum transition-all duration-300 ease-[var(--ease)]",
              "hover:bg-plum-100/70",
              i === active &&
                "bg-grad text-white shadow-[0_10px_24px_-10px_rgba(69,62,109,.5)]"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div
          key={t.label}
          role="tabpanel"
          id={`${base}-panel-${slug(t.label)}`}
          aria-labelledby={`${base}-tab-${slug(t.label)}`}
          hidden={i !== active}
          className={cn("mt-8 outline-none", i === active && "animate-[tabin_.45s_var(--ease)]")}
        >
          <p className="max-w-[62ch] text-[16px] leading-relaxed text-ink-600">{t.intro}</p>
          {i === active && <ServiceCarousel items={t.slides} className="mt-6" />}
        </div>
      ))}
      <div className="mt-8">
        <ButtonLink href="/services/" variant="link" arrow className="text-[16px]">
          View all services
        </ButtonLink>
      </div>
    </div>
  );
}
