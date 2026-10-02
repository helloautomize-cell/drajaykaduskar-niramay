"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

export interface FanCard {
  src: string;
  alt: string;
  caption: string;
  sub: string;
}

// position per stack depth (0 = front). Depth 1 keeps the approved -30% offset
// (slightly less on small screens so the back card stays on the viewport).
const DEPTH_STYLE = [
  "z-10 translate-x-0 translate-y-0 rotate-0 scale-100",
  "z-[8] -translate-x-[26%] translate-y-[10px] rotate-[-4deg] scale-[.94] sm:-translate-x-[30%]",
  "z-[6] -translate-x-[44%] translate-y-[18px] rotate-[-6deg] scale-[.90] opacity-90",
  "z-[4] -translate-x-[54%] translate-y-[24px] rotate-[-7deg] scale-[.87] opacity-80",
];

/**
 * Stacked photo cards that rotate the front card every `intervalMs`.
 * Paused on hover and when the visitor prefers reduced motion.
 */
export function HeroFan({
  cards,
  intervalMs = 5000,
  className,
}: {
  cards: FanCard[];
  intervalMs?: number;
  className?: string;
}) {
  const [front, setFront] = useState(0);
  // Back cards' images mount after hydration so the LCP image gets the
  // bandwidth — they're stacked behind the front card, so nothing shifts.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const reduce = useReducedMotion();
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    if (reduce || timer.current) return;
    timer.current = setInterval(() => setFront((f) => (f + 1) % cards.length), intervalMs);
  };
  const stop = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  };

  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  return (
    <div
      className={cn(
        "relative h-[400px] w-[260px] max-w-full sm:h-[460px] sm:w-[300px] lg:h-[500px] lg:w-[320px]",
        className
      )}
      onMouseEnter={stop}
      onMouseLeave={start}
    >
      {cards.map((c, i) => {
        const depth = (i - front + cards.length) % cards.length;
        const isFront = depth === 0;
        return (
          <figure
            key={c.src}
            aria-hidden={!isFront}
            className={cn(
              "absolute inset-0 overflow-hidden rounded-[24px] border-4 border-white shadow-[var(--shadow-hover)] transition-all duration-[600ms] ease-[var(--ease)]",
              DEPTH_STYLE[Math.min(depth, DEPTH_STYLE.length - 1)]
            )}
          >
            {/* plain img: cards are pre-sized to 640x960 so the runtime
                optimizer queue never delays the hero LCP */}
            {i === 0 || mounted ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={c.src}
                alt={c.alt}
                width={640}
                height={960}
                className="absolute inset-0 h-full w-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                decoding="async"
              />
            ) : (
              <span aria-hidden className="absolute inset-0 bg-plum-100" />
            )}
            {/* front card: full bottom caption */}
            <figcaption
              className={cn(
                "glass absolute inset-x-3 bottom-3 rounded-[14px] px-4 py-2.5 transition-opacity duration-300",
                isFront ? "opacity-100" : "opacity-0"
              )}
            >
              <span className="block text-[13.5px] font-semibold text-ink">{c.caption}</span>
              <span className="block text-[12px] text-ink-600">{c.sub}</span>
            </figcaption>
            {/* back card: only its left edge is visible, so the name moves to
                a vertical pill along that edge — never clipped */}
            <figcaption
              aria-hidden={isFront}
              className={cn(
                "glass absolute bottom-4 left-5 rounded-full px-1.5 py-3 transition-opacity duration-300 sm:left-3",
                isFront ? "opacity-0" : "opacity-100"
              )}
            >
              <span className="block rotate-180 text-[11.5px] font-semibold tracking-wide text-ink [writing-mode:vertical-rl]">
                {c.caption}
              </span>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
