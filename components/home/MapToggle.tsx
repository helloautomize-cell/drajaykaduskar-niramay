"use client";

import Image from "next/image";
import { useState } from "react";
import { MapPinIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const MAP_EMBED =
  "https://maps.google.com/maps?q=Niramay%20Clinics%2C%20Dhantoli%2C%20Nagpur&output=embed";

/**
 * Click-to-load Google Map: a styled photo placeholder until the visitor taps
 * "Show map" — no map JS or tracking loads before that.
 */
export function MapToggle({ className }: { className?: string }) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        title="Map: Niramay Clinics, Dhantoli, Nagpur"
        src={MAP_EMBED}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className={cn("h-full min-h-[320px] w-full rounded-[20px] border border-line", className)}
      />
    );
  }
  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      aria-label="Show map"
      className={cn(
        "group relative block w-full overflow-hidden rounded-[20px] border border-line text-left",
        className
      )}
    >
      <Image
        src="/images/clinic/exterior-entrance.jpg"
        alt="The street-level entrance of Niramay Clinics opposite Dinanath High School"
        width={640}
        height={400}
        className="aspect-[8/5] w-full object-cover"
        loading="lazy"
        sizes="(min-width:1024px) 45vw, 100vw"
      />
      <span className="absolute inset-0 grid place-items-center bg-ink/20 transition-colors group-hover:bg-ink/30">
        <span className="glass inline-flex min-h-[48px] items-center gap-2 rounded-full px-6 text-[15px] font-semibold text-ink">
          <MapPinIcon size={18} aria-hidden className="text-plum" /> Show map
        </span>
      </span>
    </button>
  );
}
