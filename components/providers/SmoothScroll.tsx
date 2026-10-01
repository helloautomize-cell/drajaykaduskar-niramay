"use client";

import { useEffect } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/** Lenis smooth scrolling, lerp 0.1; disabled under prefers-reduced-motion.
 *  Loaded via dynamic import after first paint so it stays out of the
 *  critical-path bundle. */
export function SmoothScroll() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let raf = 0;
    let cancelled = false;
    const loop = (t: number) => {
      lenis?.raf(t);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      import("lenis").then(({ default: Lenis }) => {
        if (cancelled) return;
        lenis = new Lenis({ lerp: 0.1 });
        raf = requestAnimationFrame(loop);
      });
    };
    const idle =
      "requestIdleCallback" in window
        ? (fn: () => void) => (window as Window).requestIdleCallback(fn, { timeout: 1500 })
        : (fn: () => void) => window.setTimeout(fn, 400);
    idle(start);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, [reduce]);

  return null;
}
