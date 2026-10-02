"use client";

import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { useAutoplay } from "@/lib/use-autoplay";
import { PlayIcon, PauseIcon } from "@/components/icons";

/** Class maps — full strings so Tailwind's static scan sees them. */
const GRID_AT = {
  md: {
    cont: "md:grid md:gap-5 md:overflow-visible md:px-0 md:snap-none",
    item: "md:w-auto md:shrink md:snap-none",
    controls: "md:hidden",
    bleed: "max-md:-mx-4",
  },
  lg: {
    cont: "lg:grid lg:gap-6 lg:overflow-visible lg:px-0 lg:snap-none",
    item: "lg:w-auto lg:shrink lg:snap-none",
    controls: "lg:hidden",
    bleed: "max-lg:-mx-4",
  },
} as const;

/**
 * Horizontal swipe carousel for repeated items on mobile.
 *
 * - native scroll + scroll-snap; each card ~84% wide so the next one peeks
 * - with `gridAt` the strip becomes a grid at that breakpoint (autoplay
 *   simply idles once nothing scrolls)
 * - autoplay per the global rule: 4.5s advance, loops, pauses on
 *   hover/focus/touch/hidden tab, resumes 6s after the last interaction,
 *   pause/play button, never under prefers-reduced-motion
 * - a thin progress bar replaces dots when there are more than 5 items
 * - edge fade only on sides that still have content
 */
export function SwipeCarousel({
  children,
  label,
  autoplay = true,
  /** breakpoint at which the strip becomes a grid (omit = always a strip) */
  gridAt,
  /** grid column classes applied at `gridAt`, e.g. "lg:grid-cols-2" */
  gridCols,
  /** fixed card width class for each slide */
  itemClass = "w-[84%]",
  /** set false to disable the edge-bleed (e.g. inside a padded panel) */
  bleed = true,
  className,
}: {
  children: ReactNode;
  label: string;
  autoplay?: boolean;
  gridAt?: keyof typeof GRID_AT;
  gridCols?: string;
  itemClass?: string;
  bleed?: boolean;
  className?: string;
}) {
  const items = Children.toArray(children);
  const n = items.length;
  const ref = useRef<HTMLDivElement>(null);
  const [scrollable, setScrollable] = useState(true);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const g = gridAt ? GRID_AT[gridAt] : null;

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollable(max > 8);
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setAtStart(el.scrollLeft <= 8);
    setAtEnd(el.scrollLeft >= max - 8);
  }, []);

  const advance = useCallback(() => {
    const el = ref.current;
    if (!el || el.scrollWidth - el.clientWidth <= 8) return;
    const slides = Array.from(el.children) as HTMLElement[];
    // current index = slide nearest the scroll position
    let idx = 0;
    let best = Infinity;
    slides.forEach((s, i) => {
      const d = Math.abs(s.offsetLeft - el.offsetLeft - el.scrollLeft);
      if (d < best) {
        best = d;
        idx = i;
      }
    });
    const next = (idx + 1) % slides.length;
    el.scrollTo({
      left: next === 0 ? 0 : slides[next].offsetLeft - el.offsetLeft,
      behavior: "smooth",
    });
  }, []);

  const { paused, togglePaused, bind } = useAutoplay({ advance, enabled: autoplay });

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // no poke() here: programmatic autoplay scrolls fire scroll events too,
  // which would starve the next advance; user drags are caught by `bind`.
  const onScroll = () => measure();

  const mask = !scrollable
    ? undefined
    : atStart
      ? "linear-gradient(90deg,#000 90%,transparent)"
      : atEnd
        ? "linear-gradient(90deg,transparent,#000 10%)"
        : "linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)";

  return (
    <div className={className}>
      <div
        ref={ref}
        role="region"
        aria-label={label}
        {...bind}
        onScroll={onScroll}
        style={mask ? { maskImage: mask, WebkitMaskImage: mask } : undefined}
        className={cn(
          "flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-1 pt-1",
          "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          bleed && (g ? g.bleed : "-mx-4"),
          g && `${g.cont} ${gridCols ?? ""}`
        )}
      >
        {items.map((c, i) => (
          <div
            key={i}
            className={cn("min-w-0 shrink-0 snap-start", itemClass, g?.item)}
          >
            {c}
          </div>
        ))}
      </div>

      {/* controls: thin progress bar (>5 items) + pause/play; hidden once
          the strip becomes a static grid (and when it can't scroll) */}
      {scrollable && (
        <div className={cn("mt-3 flex items-center gap-3 px-4", bleed && (g ? g.bleed : "-mx-4"), g?.controls)}>
          {n > 5 && (
            <div
              role="progressbar"
              aria-label="Carousel position"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress * 100)}
              className="h-[3px] flex-1 overflow-hidden rounded-full bg-line"
            >
              <div
                className="h-full rounded-full bg-plum transition-[width] duration-200"
                style={{ width: `${Math.max(6, progress * 100)}%` }}
              />
            </div>
          )}
          {autoplay && (
            <button
              type="button"
              onClick={togglePaused}
              aria-label={paused ? "Play carousel" : "Pause carousel"}
              aria-pressed={paused}
              className="ml-auto grid size-9 shrink-0 place-items-center rounded-full border border-line bg-card text-ink shadow-[var(--shadow-card)] transition-colors hover:text-plum"
            >
              {paused ? <PlayIcon size={14} className="ml-px" /> : <PauseIcon size={14} />}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
