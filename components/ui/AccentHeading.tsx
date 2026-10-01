import { createElement, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Heading with one word rendered in Instrument Serif italic.
 * Pass the full text and the `accent` word (first occurrence is italicised).
 */
export function AccentHeading({
  as = "h2",
  accent,
  children,
  className,
}: {
  as?: ElementType;
  accent?: string;
  children: string;
  className?: string;
}) {
  let content: ReactNode = children;
  if (accent) {
    const i = children.toLowerCase().indexOf(accent.toLowerCase());
    if (i >= 0) {
      content = (
        <>
          {children.slice(0, i)}
          <em className="accent">{children.slice(i, i + accent.length)}</em>
          {children.slice(i + accent.length)}
        </>
      );
    }
  }
  return createElement(as, { className: cn("t-h2 text-ink", className) }, content);
}
