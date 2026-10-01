"use client";

import Image from "next/image";
import { useState } from "react";
import { StepTracker, type Step } from "@/components/sections/StepTracker";
import { cn } from "@/lib/utils";

export interface GalleryStep extends Step {
  image: { src: string; alt: string };
}

/**
 * "04 / Your first visit" — StepTracker on the left, a sticky image column on
 * the right that cross-fades with the active step (300ms). On mobile the same
 * image renders above each step inside the tracker (hidden on desktop rail).
 */
export function StepsGallery({
  label,
  steps,
  className,
}: {
  label: string;
  steps: GalleryStep[];
  className?: string;
}) {
  const [current, setCurrent] = useState(0);

  return (
    <div className={cn("grid gap-10 min-[900px]:grid-cols-[1fr_360px] min-[900px]:gap-14", className)}>
      <StepTracker label={label} steps={steps} onStepChange={setCurrent} />
      {/* sticky cross-fade image column — desktop only */}
      <div className="relative max-[900px]:hidden">
        <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-[22px] border border-line shadow-[var(--shadow-card)]">
          {steps.map((s, i) => (
            <Image
              key={s.image.src}
              src={s.image.src}
              alt={s.image.alt}
              fill
              sizes="360px"
              className={cn(
                "object-cover transition-opacity duration-300 ease-[var(--ease)]",
                i === current ? "opacity-100" : "opacity-0"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
