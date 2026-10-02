"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@/components/icons";
import { bookHrefFor } from "@/lib/booking-context";
import { track } from "@/lib/track";

/** Two-part booking button: plum calendar block + indigo label block (preview).
 *  Carries the page's booking context (?doctor=&reason=) to the contact form. */
export function BookButton({
  href,
  label = "Book Appointment",
  className,
  location,
}: {
  href?: string;
  label?: string;
  className?: string;
  /** analytics location for book_click */
  location?: "header" | "hero" | "mobile_bar" | "page_cta";
}) {
  const pathname = usePathname() || "/";
  const computed = href && !href.startsWith("/contact") ? href : bookHrefFor(pathname);
  return (
    <Link
      href={computed}
      onClick={() => track("book_click", { location: location || "page_cta" })}
      className={cn(
        "group inline-flex h-[52px] items-stretch overflow-hidden rounded-[14px] text-white shadow-[0_10px_30px_-10px_rgba(69,62,109,.55)] transition-all duration-300 ease-[var(--ease)] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgba(69,62,109,.6)]",
        className
      )}
    >
      <span className="grid w-[52px] place-items-center bg-plum transition-colors duration-300 group-hover:bg-plum-500">
        <CalendarIcon size={20} />
      </span>
      <span className="flex items-center whitespace-nowrap bg-indigo px-6">
        <span className="text-[15.5px] font-semibold">{label}</span>
      </span>
    </Link>
  );
}
