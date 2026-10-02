import type { ReactNode } from "react";
import { GRID_AT } from "@/lib/carousel-classes";
import { Deferred } from "@/components/ui/Deferred";
import { StaticStrip } from "@/components/ui/StaticStrip";

/**
 * Server-side drop-in for SwipeCarousel that renders the static strip until
 * the interactive carousel's JS is needed, keeping SwipeCarousel out of the
 * first-load bundle.
 */
export function DeferredSwipe({
  children,
  label,
  autoplay,
  gridAt,
  gridCols,
  itemClass,
  bleed,
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
  return (
    <Deferred
      of="swipe"
      className={className}
      props={{ children, label, autoplay, gridAt, gridCols, itemClass, bleed }}
      fallback={
        <StaticStrip
          gridAt={gridAt}
          gridCols={gridCols}
          itemClass={itemClass}
          bleed={bleed}
        >
          {children}
        </StaticStrip>
      }
    />
  );
}
