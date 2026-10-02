"use client";

import { useCallback, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

const KEY = "nm-font-lg";

const isBig = () => document.documentElement.classList.contains("font-lg");

/**
 * "A / A+" text-size switch: scales the root font to 112.5%, remembered per
 * visitor via localStorage. The matching class is also applied by the inline
 * boot script in the root layout so there is no flash of small text. The DOM
 * class is the source of truth (read through useSyncExternalStore, so SSR
 * renders the small-A state and hydration re-reads the real one).
 */
export function FontSizeToggle({ className }: { className?: string }) {
  const subscribe = useCallback((onChange: () => void) => {
    const mo = new MutationObserver(onChange);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => mo.disconnect();
  }, []);
  const big = useSyncExternalStore(subscribe, isBig, () => false);

  const toggle = () => {
    const next = !isBig();
    document.documentElement.classList.toggle("font-lg", next);
    try {
      localStorage.setItem(KEY, next ? "1" : "0");
    } catch {
      /* private mode — the toggle still works for this visit */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={big}
      aria-label="Larger text"
      className={cn(
        "inline-flex items-baseline gap-0.5 rounded-[8px] px-1.5 font-semibold text-ink-600 transition-colors hover:text-plum",
        className
      )}
    >
      <span className={cn("text-[12.5px]", !big && "text-ink")}>A</span>
      <span className="text-ink-400">/</span>
      <span className={cn("text-[15px]", big && "text-plum")}>A+</span>
    </button>
  );
}
