/**
 * Breakpoint classes shared by SwipeCarousel (client) and StaticStrip
 * (server fallback). Kept in a plain module so server components can
 * reference them without pulling the client bundle. Full strings so
 * Tailwind's static scan sees them.
 */
export const GRID_AT = {
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
