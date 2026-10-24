import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** ISO date shifted by N years (used for "next review due" = lastReviewed + 12m). */
export function plusYear(iso: string, years = 1): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  d.setFullYear(d.getFullYear() + years);
  return d.toISOString();
}
