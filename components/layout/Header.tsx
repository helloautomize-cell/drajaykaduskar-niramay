"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { BookButton } from "@/components/ui/BookButton";
import { MenuIcon, ChevronIcon } from "@/components/icons";

// Menu code stays out of the first-load bundle: the desktop mega menu mounts
// on the first hover/focus of the nav, and the mobile sheet mounts on the
// first tap of its trigger. Until then identical static stand-ins render.
const SiteNav = dynamic(
  () => import("@/components/layout/MegaMenu").then((m) => m.SiteNav),
  { ssr: false }
);
const MobileMenu = dynamic(
  () => import("@/components/layout/MobileMenu").then((m) => m.MobileMenu),
  { ssr: false }
);

const NAV_LABELS: [string, string][] = [
  ["Diabetes and Heart", "diabetes-heart"],
  ["Child and Teen", "child-teen"],
  ["Lab and Pharmacy", "lab-pharmacy"],
  ["Doctors", "doctors"],
  ["Patient Info", "patient-info"],
];

function StaticNavButtons({ onIntent }: { onIntent: (value: string) => void }) {
  return (
    <div className="flex items-center gap-0.5">
      {NAV_LABELS.map(([label, value]) => (
        <button
          key={value}
          type="button"
          tabIndex={-1}
          onPointerEnter={() => onIntent(value)}
          onFocus={() => onIntent(value)}
          className="inline-flex h-11 items-center gap-1.5 whitespace-nowrap rounded-[10px] px-2.5 text-[14.5px] font-semibold text-ink"
        >
          {label}
          <ChevronIcon size={15} className="text-plum-500" />
        </button>
      ))}
    </div>
  );
}

/**
 * Sticky site header: 88px tall, white at rest; on scroll it
 * becomes white glass (blur 16px + bottom shadow) and shrinks to 68px with
 * the logo scaling 56 -> 44px. Sticks below the utility bar, which scrolls
 * away. Mark-only logo under 400px. No layout jump: the header is sticky,
 * so height changes never reflow the page.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [navOn, setNavOn] = useState<string | null>(null);
  const [menuOn, setMenuOn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const armMenu = () => {
    if (!menuOn) {
      setMenuOn(true);
      setMenuOpen(true);
    }
  };

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
        data-header-shell
        className={cn(
          "mx-auto flex max-w-[1240px] items-center gap-3 px-4 transition-[height] duration-300 ease-[var(--ease)] sm:px-6",
          scrolled ? "h-[60px] lg:h-[68px]" : "h-[60px] lg:h-[88px]"
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
              scrolled ? "h-10 lg:h-11" : "h-10 lg:h-14"
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
              "h-9"
            )}
            priority
          />
        </Link>

        <div
          className="ml-auto flex items-center gap-4"
          onFocusCapture={() => setNavOn((v) => v ?? "")}
        >
          <nav
            className="hidden lg:block"
            onPointerMove={() => setNavOn((v) => v ?? "")}
          >
            {navOn !== null ? (
              <SiteNav openOn={navOn || undefined} />
            ) : (
              <StaticNavButtons onIntent={(v) => setNavOn(v)} />
            )}
          </nav>
          <BookButton className="hidden min-[1100px]:inline-flex" />
          {menuOn ? (
            <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} />
          ) : (
            <button
              type="button"
              aria-label="Open menu"
              onPointerDown={armMenu}
              onClick={armMenu}
              className="grid size-11 place-items-center rounded-[12px] text-ink transition-colors hover:bg-plum-50 lg:hidden"
            >
              <MenuIcon size={24} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
