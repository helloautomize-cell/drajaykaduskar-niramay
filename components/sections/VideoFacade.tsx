"use client";

import Image from "next/image";
import { useState } from "react";
import { PlayIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

/**
 * Click-to-load YouTube facade: a still image + play button. The iframe
 * (youtube-nocookie.com) only mounts after the visitor asks for it — no
 * Google scripts or tracking before that.
 */
export function VideoFacade({
  id,
  title,
  poster = "/images/blog/diabetes-myths.jpg",
  className,
}: {
  id: string;
  title: string;
  poster?: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <div className={cn("mt-8 overflow-hidden rounded-[18px] border border-line", className)}>
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
    <button
      type="button"
      onClick={() => setLoaded(true)}
      aria-label={`Play video: ${title}`}
      className={cn(
        "group relative mt-8 block w-full overflow-hidden rounded-[18px] border border-line text-left shadow-[var(--shadow-card)]",
        className
      )}
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
      <span className="absolute inset-0 grid place-items-center bg-ink/25 transition-colors group-hover:bg-ink/35">
        <span className="grid size-16 place-items-center rounded-full bg-white/90 text-plum shadow-[var(--shadow-hover)] transition-transform duration-300 ease-[var(--ease)] group-hover:scale-105">
          <PlayIcon size={26} aria-hidden className="ml-0.5" />
        </span>
      </span>
      <span className="absolute inset-x-4 bottom-4 text-[13px] font-medium text-white drop-shadow">
        {title}
      </span>
    </button>
  );
}
