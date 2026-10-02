"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Shared carousel autoplay state machine (WCAG 2.2.2).
 *
 * - advances via `advance()` every `delay` ms while playing
 * - pauses on hover, focus-within, touch/drag and a hidden tab
 * - resumes `resumeAfter` ms after the last interaction ends
 * - a user-toggled pause (the pause/play button) persists until toggled back
 * - never autoplay under prefers-reduced-motion
 *
 * Returns `bind` event handlers to spread onto the carousel container and a
 * `controls` object for the pause/play button.
 */
export function useAutoplay({
  advance,
  delay = 4500,
  resumeAfter = 6000,
  enabled = true,
}: {
  advance: () => void;
  delay?: number;
  resumeAfter?: number;
  enabled?: boolean;
}) {
  const reduce = useReducedMotion();
  const [userPaused, setUserPaused] = useState(false);
  const hover = useRef(false);
  const focus = useRef(false);
  const touch = useRef(false);
  // interactions suppress advancing until this timestamp (covers "resume 6s
  // after the last interaction" without a second timer)
  const quietUntil = useRef(0);
  const advanceRef = useRef(advance);
  useEffect(() => {
    advanceRef.current = advance;
  });

  useEffect(() => {
    if (reduce || !enabled) return;
    let hidden = false;
    const onVis = () => {
      hidden = document.hidden;
      if (!hidden) quietUntil.current = Date.now() + resumeAfter;
    };
    document.addEventListener("visibilitychange", onVis);
    const t = setInterval(() => {
      if (document.hidden || hidden) return;
      if (hover.current || focus.current || touch.current) return;
      if (Date.now() < quietUntil.current) return;
      advanceRef.current();
    }, delay);
    return () => {
      clearInterval(t);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduce, enabled, delay, resumeAfter]);

  const poke = useCallback(() => {
    quietUntil.current = Date.now() + resumeAfter;
  }, [resumeAfter]);

  const bind = {
    onMouseEnter: () => {
      hover.current = true;
    },
    onMouseLeave: () => {
      hover.current = false;
      poke();
    },
    onFocusIn: () => {
      focus.current = true;
    },
    onFocusOut: (e: React.FocusEvent) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
        focus.current = false;
        poke();
      }
    },
    onPointerDown: () => {
      touch.current = true;
    },
    onPointerUp: () => {
      touch.current = false;
      poke();
    },
    onPointerCancel: () => {
      touch.current = false;
      poke();
    },
    onTouchEnd: () => {
      touch.current = false;
      poke();
    },
  };

  return {
    /** user-facing paused state: reduced motion counts as paused */
    paused: userPaused || reduce,
    togglePaused: () => {
      setUserPaused((p) => !p);
      poke();
    },
    /** call from scroll/drag handlers so manual swipes reset the quiet period */
    poke,
    bind,
  };
}
