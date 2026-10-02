"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface Step {
  title: string;
  body: string;
  /** shown above the step on mobile (desktop uses the sticky image column) */
  image?: { src: string; alt: string };
}

/**
 * Sticky step tracker: left rail with big number, current step name and a
 * vertical rail of dots joined by a 2px line (plum-500 fills completed
 * segments). Right column of steps separated by hairlines; current step full
 * opacity, others dimmed. Scroll-driven via IntersectionObserver; dots are
 * clickable. Horizontal dot bar under 900px.
 */
export function StepTracker({
  label,
  steps,
  onStepChange,
  className,
}: {
  label: string;
  steps: Step[];
  /** fires when the active step changes (scroll-spy or click) */
  onStepChange?: (index: number) => void;
  className?: string;
}) {
  const [current, setCurrent] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const cbRef = useRef(onStepChange);
  useEffect(() => {
    cbRef.current = onStepChange;
  });

  const activate = (i: number) => {
    setCurrent(i);
    cbRef.current?.(i);
  };

  useEffect(() => {
    const items = listRef.current?.querySelectorAll("[data-step]");
    if (!items?.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) activate(Number((e.target as HTMLElement).dataset.step));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);

  const go = (i: number) => {
    activate(i);
    listRef.current
      ?.querySelector(`[data-step="${i}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const n = steps.length;
  const fillPct = n > 1 ? (current / (n - 1)) * 100 : 0;

  return (
    <div className={cn("relative grid gap-10 min-[900px]:grid-cols-[300px_1fr] min-[900px]:gap-16", className)}>
      {/* Sticky rail */}
      <div className="min-[900px]:sticky min-[900px]:top-28 min-[900px]:self-start">
        <div className="eyebrow">{label}</div>
        <div className="mt-2 text-[64px] font-bold leading-none tracking-tight text-plum max-[900px]:hidden">
          {String(current + 1).padStart(2, "0")}
        </div>
        <p className="mt-1 text-[15px] font-semibold text-ink max-[900px]:hidden">
          {steps[current].title}
        </p>
        <div
          role="tablist"
          aria-label="Steps"
          className="relative mt-6 flex gap-2 max-[900px]:mt-4 min-[900px]:w-10 min-[900px]:flex-col min-[900px]:gap-0"
        >
          {/* vertical connecting line (desktop) */}
          <span
            aria-hidden
            className="absolute bottom-6 left-1/2 top-6 w-[2px] -translate-x-1/2 bg-line max-[900px]:hidden"
          />
          <span
            aria-hidden
            className="absolute left-1/2 top-6 w-[2px] -translate-x-1/2 bg-plum-500 transition-[height] duration-500 ease-[var(--ease)] max-[900px]:hidden"
            style={{ height: `calc((100% - 48px) * ${fillPct / 100})` }}
          />
          {steps.map((s, i) => {
            const state = i < current ? "done" : i === current ? "current" : "todo";
            return (
              <button
                key={s.title}
                role="tab"
                aria-selected={state === "current"}
                aria-label={`Step ${i + 1}: ${s.title}`}
                onClick={() => go(i)}
                className={cn(
                  "relative z-10 min-h-10 min-w-10 shrink-0 rounded-full bg-card outline-none",
                  "after:absolute after:left-1/2 after:top-1/2 after:size-[9px] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:transition-all after:duration-500 after:ease-[var(--ease)]",
                  state === "done" && "after:bg-plum-500",
                  state === "current" &&
                    "after:bg-plum after:shadow-[0_0_0_10px_var(--plum-100)]",
                  state === "todo" && "after:bg-line hover:after:bg-plum-500/50"
                )}
              />
            );
          })}
        </div>
      </div>

      {/* Steps: hairline-divided list */}
      <ol ref={listRef} className="divide-y divide-line">
        {steps.map((s, i) => (
          <li
            key={s.title}
            data-step={i}
            className="py-8 first:pt-0"
          >
            {s.image && (
              // eslint-disable-next-line @next/next/no-img-element -- small, mobile-only, lazy
              <img
                src={s.image.src}
                alt={s.image.alt}
                loading="lazy"
                className="mb-4 aspect-[16/9] w-full rounded-[14px] object-cover min-[900px]:hidden"
              />
            )}
            <h3
              className={cn(
                "t-h3 mb-1.5",
                i === current ? "text-ink" : "text-ink-600"
              )}
            >
              {s.title}
            </h3>
            <p className="text-[15.5px] leading-relaxed text-ink-600">
              {s.body}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
