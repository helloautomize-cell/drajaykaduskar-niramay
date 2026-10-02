import { Children, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { GRID_AT } from "@/lib/carousel-classes";

/**
 * Server-rendered stand-in for SwipeCarousel: the same scroll strip without
 * the interactive controls, used as the Deferred fallback so the interactive
 * carousel's JS only loads when the section nears the viewport. Swiping still
 * works natively; autoplay and the pause button appear on hydration.
 */
export function StaticStrip({
  children,
  gridAt,
  gridCols,
  itemClass = "w-[84%]",
  bleed = true,
  className,
}: {
  children: ReactNode;
  gridAt?: keyof typeof GRID_AT;
  gridCols?: string;
  itemClass?: string;
  bleed?: boolean;
  className?: string;
}) {
  const g = gridAt ? GRID_AT[gridAt] : null;
  return (
    <div className={className}>
      <div
        className={cn(
          "flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-1 pt-1",
          "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          bleed && (g ? g.bleed : "-mx-4"),
          g && `${g.cont} ${gridCols ?? ""}`
        )}
      >
        {Children.toArray(children).map((c, i) => (
          <div
            key={i}
            className={cn("min-w-0 shrink-0 snap-start", itemClass, g?.item)}
          >
            {c}
          </div>
        ))}
      </div>
    </div>
  );
}
