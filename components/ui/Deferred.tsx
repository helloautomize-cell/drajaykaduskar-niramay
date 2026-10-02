"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";

/**
 * Viewport-gated islands for below-fold interactive sections. The server
 * renders the `fallback` markup (full content, no JS needed); the interactive
 * component's JS chunk only downloads once the section nears the viewport.
 */
const registry = {
  serviceTabs: dynamic(
    () => import("@/components/home/ServiceTabs").then((m) => m.ServiceTabs),
    { ssr: false }
  ),
  stepsGallery: dynamic(
    () => import("@/components/home/StepsGallery").then((m) => m.StepsGallery),
    { ssr: false }
  ),
  conditions: dynamic(
    () => import("@/components/sections/CenteredCarousel").then((m) => m.CenteredCarousel),
    { ssr: false }
  ),
  map: dynamic(() => import("@/components/home/MapToggle").then((m) => m.MapToggle), {
    ssr: false,
  }),
  swipe: dynamic(
    () => import("@/components/ui/SwipeCarousel").then((m) => m.SwipeCarousel),
    { ssr: false }
  ),
} as const;

export function Deferred({
  of,
  fallback,
  props,
  rootMargin = "600px",
  className,
}: {
  of: keyof typeof registry;
  /** server-rendered static markup shown until the island loads */
  fallback: ReactNode;
  props?: Record<string, unknown>;
  rootMargin?: string;
  className?: string;
}) {
  const [on, setOn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || on) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [on, rootMargin]);

  const Comp = registry[of] as ComponentType<Record<string, unknown>>;
  return (
    <div ref={ref} className={className}>
      {on ? <Comp {...props} /> : fallback}
    </div>
  );
}
