"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { ServiceGlassCard, type BadgeTint } from "@/components/sections/ServiceGlassCard";

export interface ServiceSlide {
  badge: string;
  title: string;
  text: string;
  href?: string;
}

/**
 * Carousel of ServiceGlassCards for the active tab group: drag/swipe with
 * momentum, snap, arrows + pill dots, keyboard arrows, edge fade, no autoplay.
 * Remount per tab (parent passes key) so it resets to the first card.
 */
export function ServiceCarousel({
  items,
  tint = "plum",
  className,
}: {
  items: ServiceSlide[];
  tint?: BadgeTint;
  className?: string;
}) {
  const [emblaRef, embla] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>(items.map((_, i) => i));

  useEffect(() => {
    if (!embla) return;
    const sync = () => {
      setSelected(embla.selectedScrollSnap());
      setSnaps(embla.scrollSnapList());
    };
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

  const multi = snaps.length > 1;

  return (
    <div className={className}>
      <div ref={emblaRef} className="edge-fade overflow-hidden pb-2 pt-1">
        <div className="flex gap-5 px-1">
          {items.map((it) => (
            <ServiceGlassCard
              key={it.title}
              badge={it.badge}
              title={it.title}
              text={it.text}
              tint={tint}
              href={it.href}
            />
          ))}
        </div>
      </div>
      {multi && (
        <div className="mt-4 flex items-center justify-center gap-5">
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
      )}
    </div>
  );
}
