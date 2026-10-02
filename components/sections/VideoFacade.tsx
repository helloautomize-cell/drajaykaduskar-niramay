"use client";

import Image from "next/image";
import { useState } from "react";
import { PlayIcon } from "@/components/icons";
import { track } from "@/lib/track";
import { cn } from "@/lib/utils";

/**
 * Click-to-load YouTube facade: a still image + play button. The iframe
 * (youtube-nocookie.com) only mounts after the visitor asks for it — no
 * Google scripts or tracking before that. Thumbnails stay clean (no text
 * overlay); the title, a one-line description and the channel credit sit
 * underneath.
 */
export function VideoFacade({
  id,
  title,
  description,
  poster = "/images/blog/diabetes-myths.jpg",
  credit,
  className,
}: {
  id: string;
  title: string;
  /** one-line description shown under the title */
  description?: string;
  poster?: string;
  /** channel credit line, e.g. "Loktantra Mirror" -> "Video: Loktantra Mirror" */
  credit?: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <div className={cn("overflow-hidden rounded-[18px] border border-line", className)}>
        <iframe
          title={title}
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="aspect-video w-full"
        />
      </div>
    );
  }

  return (
    <span className={cn("block", className)}>
      <button
        type="button"
        onClick={() => {
          setLoaded(true);
          track("video_play", { video: id });
        }}
        aria-label={`Play video: ${title}`}
        className="group relative block w-full overflow-hidden rounded-[18px] border border-line text-left shadow-[var(--shadow-card)]"
      >
        <Image
          src={poster}
          alt=""
          width={1280}
          height={720}
          className="aspect-video w-full object-cover"
          loading="lazy"
          sizes="(min-width:860px) 68ch, 100vw"
        />
        <span className="absolute inset-0 grid place-items-center bg-ink/20 transition-colors group-hover:bg-ink/30">
          <span className="grid size-16 place-items-center rounded-full bg-white/90 text-plum shadow-[var(--shadow-hover)] transition-transform duration-300 ease-[var(--ease)] group-hover:scale-105">
            <PlayIcon size={26} aria-hidden className="ml-0.5" />
          </span>
        </span>
      </button>
      <span className="mt-3 block text-[16px] font-semibold leading-snug text-ink">
        {title}
      </span>
      {description && (
        <span className="mt-1 block text-[14px] leading-snug text-ink-600">
          {description}
        </span>
      )}
      {credit && (
        <span className="mt-1.5 block text-[12.5px] text-ink-600">Video: {credit}</span>
      )}
    </span>
  );
}
