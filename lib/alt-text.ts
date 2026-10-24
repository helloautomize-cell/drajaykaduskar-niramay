import altMap from "@/lib/alt-text.json";

const ALTS = altMap as Record<string, string>;

/** Descriptive alt text for a /images/ path, falling back to a caller value. */
export function altFor(src: string | null | undefined, fallback: string): string {
  if (!src) return fallback;
  const key = src.replace(/^\/images\//, "");
  return ALTS[key] ?? fallback;
}
