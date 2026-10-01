"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon, ArrowRightIcon } from "@/components/icons";
import { ServiceBadge } from "@/components/ui/ServiceBadge";

export interface CarouselItem {
  /** Service badge slug (public/images/icons/services/) */
  badge: string;
  title: string;
  body: string;
  /** optional "Learn more" destination */
  href?: string;
}

/**
 * Centred carousel (Embla). Active slide full size; neighbours scale(.92)
 * rotate(±1deg) at 50% opacity. Round arrows + pill dots, drag and swipe,
 * keyboard arrows, no autoplay.
 */
export function CenteredCarousel({
  items,
  className,
  ariaLabel = "Featured topics",
}: {
  items: CarouselItem[];
  className?: string;
  ariaLabel?: string;
}) {
  const [emblaRef, embla] = useEmblaCarousel({ align: "center", loop: true, skipSnaps: false });
  const [selected, setSelected] = useState(0);
  const snaps = items.map((_, i) => i);

  useEffect(() => {
    if (!embla) return;
    const sync = () => setSelected(embla.selectedScrollSnap());
    embla.on("select", sync).on("reInit", sync);
    queueMicrotask(sync);
    return () => {
      embla.off("select", sync).off("reInit", sync);
    };
  }, [embla]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") embla?.scrollPrev();
      if (e.key === "ArrowRight") embla?.scrollNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [embla]);

  return (
    <div className={className}>
      <div
        ref={emblaRef}
        className="edge-fade overflow-hidden py-8"
        role="region"
        aria-label={ariaLabel}
      >
        <div className="flex">
          {items.map((it, i) => {
            const on = i === selected;
            const offset = i - selected;
            return (
              <div
                key={it.title}
                className="min-w-0 flex-[0_0_min(300px,78%)] px-3"
                aria-hidden={!on}
              >
                <div
                  className={cn(
                    "h-full rounded-[20px] border border-line bg-card p-7 shadow-[var(--shadow-card)] transition-all duration-700 ease-[var(--ease)]",
                    on
                      ? "scale-100 opacity-100"
                      : "scale-[.92] opacity-50",
                    !on && offset < 0 && "-rotate-1",
                    !on && offset > 0 && "rotate-1"
                  )}
                >
                  <div className="mb-4 flex justify-center">
                    <ServiceBadge slug={it.badge} size="sm" alt="" />
                  </div>
                  <h3 className="t-h3 mb-2 text-ink">{it.title}</h3>
                  <p className="text-[15px] leading-relaxed text-ink-600">{it.body}</p>
                  {it.href && (
                    <Link
                      href={it.href}
                      aria-label={`Learn more about ${it.title}`}
                      className="mt-4 inline-flex min-h-[44px] items-center gap-1.5 text-[14.5px] font-semibold text-plum transition-colors hover:text-plum-500"
                    >
                      Learn more <span className="sr-only">about {it.title}</span>
                      <ArrowRightIcon size={15} aria-hidden />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-2 flex items-center justify-center gap-6">
        <button
          aria-label="Previous"
          onClick={() => embla?.scrollPrev()}
          className="grid size-11 place-items-center rounded-full border border-line bg-card text-ink shadow-[var(--shadow-card)] transition-all duration-300 ease-[var(--ease)] hover:border-plum-500 hover:text-plum"
        >
          <ChevronLeftIcon size={20} />
        </button>
        <div className="flex items-center" role="tablist" aria-label="Slides">
          {snaps.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === selected}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => embla?.scrollTo(i)}
              className={cn(
                "relative h-11 w-8 after:absolute after:left-1/2 after:top-1/2 after:h-[7px] after:-translate-y-1/2 after:rounded-full after:transition-all after:duration-400 after:ease-[var(--ease)]",
                i === selected
                  ? "after:w-[26px] after:-translate-x-1/2 after:bg-plum"
                  : "after:w-[7px] after:-translate-x-1/2 after:bg-line hover:after:bg-plum-500/50"
              )}
            />
          ))}
        </div>
        <button
          aria-label="Next"
          onClick={() => embla?.scrollNext()}
          className="grid size-11 place-items-center rounded-full border border-line bg-card text-ink shadow-[var(--shadow-card)] transition-all duration-300 ease-[var(--ease)] hover:border-plum-500 hover:text-plum"
        >
          <ChevronRightIcon size={20} />
        </button>
      </div>
    </div>
  );
}
