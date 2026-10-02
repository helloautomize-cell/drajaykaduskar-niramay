"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";
import { useAutoplay } from "@/lib/use-autoplay";
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon, PauseIcon } from "@/components/icons";
import { ServiceGlassCard, type BadgeTint } from "@/components/sections/ServiceGlassCard";

export interface ServiceSlide {
  badge: string;
  title: string;
  text: string;
  href?: string;
}

/**
 * Carousel of ServiceGlassCards for the active tab group: drag/swipe with
 * momentum, snap, arrows + pill dots on desktop, a thin progress bar on
 * mobile (>5 slides), edge fade only where content remains, and autoplay:
 * 4.5s advance looping back to the start, pausing on hover/focus/touch or a
 * hidden tab, resuming 6s after the last interaction, never under
 * prefers-reduced-motion. Remount per tab (parent passes key).
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
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const advance = useCallback(() => {
    if (!embla) return;
    if (embla.canScrollNext()) embla.scrollNext();
    else embla.scrollTo(0); // loop back to the start
  }, [embla]);

  const { paused, togglePaused, poke, bind } = useAutoplay({ advance });

  useEffect(() => {
    if (!embla) return;
    const sync = () => {
      setSelected(embla.selectedScrollSnap());
      setSnaps(embla.scrollSnapList());
      setCanPrev(embla.canScrollPrev());
      setCanNext(embla.canScrollNext());
    };
    // pointerDown marks a user drag; programmatic autoplay scrolls must not
    // poke() or each advance would push its own successor past the 4.5s mark
    const interact = () => poke();
    embla.on("select", sync).on("reInit", sync).on("pointerDown", interact);
    queueMicrotask(sync);
    return () => {
      embla.off("select", sync).off("reInit", sync);
    };
  }, [embla, poke]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") embla?.scrollPrev();
      if (e.key === "ArrowRight") embla?.scrollNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [embla]);

  const multi = snaps.length > 1;
  const mask = !canPrev
    ? "linear-gradient(90deg,#000 90%,transparent)"
    : !canNext
      ? "linear-gradient(90deg,transparent,#000 10%)"
      : "linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)";

  return (
    <div className={className} {...bind}>
      <div
        ref={emblaRef}
        className="overflow-hidden pb-2 pt-1"
        style={{ maskImage: mask, WebkitMaskImage: mask }}
      >
        <div className="flex gap-5 px-1">
          {items.map((it) => (
            <ServiceGlassCard
              key={it.title}
              badge={it.badge}
              title={it.title}
              text={it.text}
              tint={tint}
              href={it.href}
              lift={false}
            />
          ))}
        </div>
      </div>
      {multi && (
        <div className="mt-4 flex items-center gap-5 max-md:gap-3">
          <button
            aria-label="Previous"
            onClick={() => embla?.scrollPrev()}
            className="grid size-11 place-items-center rounded-full border border-line bg-card text-ink shadow-[var(--shadow-card)] transition-all duration-300 ease-[var(--ease)] hover:border-plum-500 hover:text-plum max-md:hidden"
          >
            <ChevronLeftIcon size={20} />
          </button>
          {/* >5 slides on mobile: thin progress bar instead of dots */}
          {snaps.length > 5 ? (
            <div
              role="progressbar"
              aria-label="Carousel position"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(((selected + 1) / snaps.length) * 100)}
              className="h-[3px] flex-1 overflow-hidden rounded-full bg-line md:hidden"
            >
              <div
                className="h-full rounded-full bg-plum transition-[width] duration-300"
                style={{ width: `${((selected + 1) / snaps.length) * 100}%` }}
              />
            </div>
          ) : null}
          <div
            className={cn("flex items-center", snaps.length > 5 && "max-md:hidden")}
            role="tablist"
            aria-label="Slides"
          >
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
            className="grid size-11 place-items-center rounded-full border border-line bg-card text-ink shadow-[var(--shadow-card)] transition-all duration-300 ease-[var(--ease)] hover:border-plum-500 hover:text-plum max-md:hidden"
          >
            <ChevronRightIcon size={20} />
          </button>
          <button
            type="button"
            onClick={togglePaused}
            aria-label={paused ? "Play carousel" : "Pause carousel"}
            aria-pressed={paused}
            className="grid size-9 shrink-0 place-items-center rounded-full border border-line bg-card text-ink shadow-[var(--shadow-card)] transition-colors hover:text-plum md:ml-auto"
          >
            {paused ? <PlayIcon size={14} className="ml-px" /> : <PauseIcon size={14} />}
          </button>
        </div>
      )}
    </div>
  );
}
