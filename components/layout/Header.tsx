"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { BookButton } from "@/components/ui/BookButton";
import { SiteNav } from "@/components/layout/MegaMenu";
import { MobileMenu } from "@/components/layout/MobileMenu";

/**
 * Sticky site header (plan G2): 88px tall, white at rest; on scroll it
 * becomes white glass (blur 16px + bottom shadow) and shrinks to 68px with
 * the logo scaling 56 -> 44px. Sticks below the utility bar, which scrolls
 * away. Mark-only logo under 400px. No layout jump: the header is sticky,
 * so height changes never reflow the page.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-[env(safe-area-inset-top)] z-50 transition-[height,background-color,box-shadow] duration-300 ease-[var(--ease)]",
        scrolled
          ? "border-b border-white/50 bg-white/60 shadow-[0_8px_30px_-12px_rgba(69,62,109,.18)] backdrop-blur-[16px] saturate-[140%] supports-[not_(backdrop-filter:blur(1px))]:bg-white/95"
          : "border-b border-transparent bg-white"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-[1240px] items-center gap-3 px-4 transition-[height] duration-300 ease-[var(--ease)] sm:px-6",
          scrolled ? "h-[68px]" : "h-[88px]"
        )}
      >
        <Link
          href="/"
          aria-label="Niramay Clinics home"
          className="relative block shrink-0"
        >
          {/* stacked wordmark logo (>=400px) */}
          <Image
            src="/images/brand/niramay-logo.png"
            alt="Niramay Clinics"
            width={512}
            height={339}
            sizes="90px"
            className={cn(
              "hidden w-auto object-contain transition-[height] duration-300 ease-[var(--ease)] min-[400px]:block",
              scrolled ? "h-11" : "h-14"
            )}
            priority
          />
          {/* mark only (<400px) */}
          <Image
            src="/images/brand/niramay-mark.png"
            alt="Niramay Clinics"
            width={468}
            height={468}
            className={cn(
              "w-auto object-contain transition-[height] duration-300 ease-[var(--ease)] min-[400px]:hidden",
              scrolled ? "h-10" : "h-11"
            )}
            priority
          />
        </Link>

        <div className="ml-auto flex items-center gap-4">
          <SiteNav />
          <BookButton className="hidden min-[1100px]:inline-flex" />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
