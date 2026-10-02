"use client";

import Image from "next/image";
import { useState } from "react";
import { StepTracker, type Step } from "@/components/sections/StepTracker";
import { SwipeCarousel } from "@/components/ui/SwipeCarousel";
import { cn } from "@/lib/utils";

export interface GalleryStep extends Step {
  image: { src: string; alt: string };
}

/**
 * "04 / Your first visit" — desktop keeps the StepTracker with a sticky
 * cross-fade image column. Mobile becomes a swipe carousel instead of six
 * stacked steps: one slide per step (16:10 image, "Step n of 6", title, one
 * line), auto-advancing with a progress bar; the dot rail is hidden.
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
    <div className={className}>
      {/* mobile: swipe carousel, one slide per step */}
      <div className="min-[900px]:hidden">
        <div className="eyebrow mb-5">{label}</div>
        <SwipeCarousel label={label} itemClass="w-[84%]">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="h-full overflow-hidden rounded-[18px] border border-line bg-card shadow-[var(--shadow-card)]"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={s.image.src}
                  alt={s.image.alt}
                  fill
                  sizes="84vw"
                  className="object-cover"
                  loading="lazy"
                />
                <span className="glass absolute left-3 top-3 rounded-full px-3 py-1 text-[12px] font-semibold text-ink">
                  Step {i + 1} of {steps.length}
                </span>
              </div>
              <div className="p-5">
                <h3 className="t-h3 text-ink">{s.title}</h3>
                <p className="mt-1 text-[14.5px] leading-relaxed text-ink-600">{s.body}</p>
              </div>
            </div>
          ))}
        </SwipeCarousel>
      </div>

      {/* desktop: tracker + sticky cross-fade image */}
      <div className="grid gap-10 max-[900px]:hidden min-[900px]:grid-cols-[1fr_360px] min-[900px]:gap-14">
        <StepTracker label={label} steps={steps} onStepChange={setCurrent} />
        <div className="relative">
          <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-[22px] border border-line shadow-[var(--shadow-card)]">
            <div className="relative h-full w-full">
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
      </div>
    </div>
  );
}
