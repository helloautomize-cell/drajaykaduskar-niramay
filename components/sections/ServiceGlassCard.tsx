"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ArrowIcon } from "@/components/icons";
import { ServiceBadge } from "@/components/ui/ServiceBadge";

export type BadgeTint = "plum" | "indigo" | "lilac" | "indigo-plum";

/** Blob colour pairs per service group. */
const TINTS: Record<BadgeTint, [string, string]> = {
  plum: ["rgba(115,69,105,.22)", "rgba(242,149,122,.3)"],
  indigo: ["rgba(69,62,109,.22)", "rgba(242,149,122,.3)"],
  lilac: ["rgba(115,69,105,.2)", "rgba(201,182,228,.4)"],
  "indigo-plum": ["rgba(69,62,109,.22)", "rgba(243,236,242,.9)"],
};

/**
 * Arch-topped glass service card: frosted glass over two slowly drifting
 * colour blobs (gated by IntersectionObserver + reduced-motion), md service
 * badge with all hover effects, gradient arrow circle overlapping the arch's
 * bottom edge, title and one-liner below.
 */
export function ServiceGlassCard({
  badge,
  title,
  text,
  tint = "plum",
  href = "#",
  lift = true,
  className,
}: {
  badge: string;
  title: string;
  text: string;
  tint?: BadgeTint;
  href?: string;
  /** false inside carousels so a hovered card stays on the shared baseline */
  lift?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  // Run blob drift only while on screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => el.classList.toggle("in-view", e.isIntersecting),
      { rootMargin: "80px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const [a, b] = TINTS[tint];
  return (
    <Link
      ref={ref}
      href={href}
      className={cn(
        "sg-card group block w-[200px] shrink-0 snap-start outline-offset-4 transition-transform duration-500 ease-[var(--ease)] sm:w-[240px]",
        lift && "hover:-translate-y-1.5",
        className
      )}
    >
      <span className="sg-arch glass arch-shape relative flex h-[240px] items-center justify-center overflow-hidden sm:h-[280px]">
        <span
          aria-hidden
          className="sg-blob sg-blob-a size-[60%] opacity-80"
          style={{ background: a, left: "-8%", top: "8%" }}
        />
        <span
          aria-hidden
          className="sg-blob sg-blob-b size-[60%] opacity-80"
          style={{ background: b, right: "-8%", bottom: "6%" }}
        />
        <ServiceBadge slug={badge} size="md" coin className="relative z-10" alt="" />
        <span className="absolute -bottom-2 left-1/2 z-10 grid size-10 -translate-x-1/2 place-items-center rounded-full bg-grad text-white shadow-[0_8px_20px_-6px_rgba(69,62,109,.55)] transition-transform duration-300 ease-[var(--ease)] group-hover:translate-x-[calc(-50%+3px)]">
          <ArrowIcon size={16} />
        </span>
      </span>
      <span className="mt-5 block px-1 text-center">
        <span className="block text-[15.5px] font-semibold text-ink">{title}</span>
        <span className="mt-1 block text-[13px] leading-snug text-ink-600">{text}</span>
      </span>
    </Link>
  );
}
