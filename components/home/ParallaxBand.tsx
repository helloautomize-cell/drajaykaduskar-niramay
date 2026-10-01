"use client";

import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Full-bleed "Visit us" band: the clinic photo is a sticky layer pinned under
 * the scrolling glass card, with a slow transform for depth (never
 * background-attachment: fixed). Reduced motion removes the transform.
 */
export function ParallaxBand({
  image,
  alt,
  children,
  className,
}: {
  image: string;
  alt: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const layer = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    const img = layer.current;
    if (!el || !img) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress 0 → section enters viewport bottom, 1 → leaves top
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      img.style.transform = `translateY(${(-8 + 16 * p).toFixed(2)}%)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <section ref={ref} className={cn("relative overflow-hidden", className)} aria-label="Visit us">
      {/* sticky image layer */}
      <div ref={layer} className="sticky top-0 -z-10 h-[105%] w-full will-change-transform">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      {/* scrolling glass card over the pinned image */}
      <div className="mx-auto max-w-[1240px] px-4 py-24 sm:px-6 sm:py-32">
        <div className="glass max-w-[520px] rounded-[24px] p-8 sm:p-10">{children}</div>
      </div>
    </section>
  );
}
