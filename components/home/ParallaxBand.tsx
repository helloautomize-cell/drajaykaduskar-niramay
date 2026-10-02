"use client";

import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * "Visit us" band. Desktop: a 60vh photo band with a slow parallax drift and
 * the glass card sitting on the photo, bottom-left with a 48px inset.
 * Mobile: the photo band is removed entirely — only the compact card shows.
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
      img.style.transform = `translateY(${(-6 + 12 * p).toFixed(2)}%)`;
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

  const card = <div className="glass max-w-[520px] rounded-[24px] p-6 sm:p-8">{children}</div>;

  return (
    <section ref={ref} className={cn("relative", className)} aria-label="Visit us">
      {/* desktop: 60vh photo band, card on the photo bottom-left */}
      <div className="relative hidden h-[60vh] min-h-[440px] overflow-hidden lg:block">
        <div ref={layer} className="absolute -top-[8%] h-[116%] w-full will-change-transform">
          <Image src={image} alt={alt} fill sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute bottom-12 left-12 right-12">
          <div className="mx-auto max-w-[1240px]">{card}</div>
        </div>
      </div>
      {/* mobile: no photo band, just the compact card */}
      <div className="px-4 py-14 sm:px-6 lg:hidden">
        <div className="mx-auto max-w-[1240px]">{card}</div>
      </div>
    </section>
  );
}
