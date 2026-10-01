"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { badgeAlt } from "@/lib/service-badges";

const PX = { sm: 64, md: 112, lg: 160 } as const;

/**
 * Illustrated service badge (PNG from resources/images, processed to
 * public/images/icons/services/). Hover effects: conic orbit ring, lift,
 * optional coin turn (arch cards), sheen sweep. Touch devices get one ring
 * spin when the badge first scrolls into view. Reduced motion: ring and
 * glow fade in only.
 */
export function ServiceBadge({
  slug,
  size = "md",
  coin = false,
  circle = false,
  alt,
  className,
}: {
  slug: string;
  size?: keyof typeof PX;
  /** rotateY coin turn on hover — for arch / glass service cards */
  coin?: boolean;
  /** soft plum-50 circle behind the badge */
  circle?: boolean;
  alt?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const px = PX[size];

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: none)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("sb-play");
          io.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className={cn("sb sb-hover", coin && "sb-coin", className)}
      style={{ width: px, height: px, perspective: 600 }}
    >
      {circle && (
        <span
          aria-hidden
          className="absolute inset-[4%] rounded-full bg-plum-50"
          style={{ zIndex: -1 }}
        />
      )}
      <span aria-hidden className="sb-glow" />
      <span aria-hidden className="sb-ring" />
      <span className="sb-lift relative z-10">
        <Image
          src={`/images/icons/services/${slug}-512.png`}
          alt={alt ?? badgeAlt[slug] ?? ""}
          width={px}
          height={px}
          sizes={`${px}px`}
          className="sb-img"
        />
      </span>
      <span aria-hidden className="sb-sheen" />
    </span>
  );
}
