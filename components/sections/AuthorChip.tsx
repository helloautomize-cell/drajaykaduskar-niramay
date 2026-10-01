import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Doctor } from "@/lib/doctors";

/** Small author byline chip: circular avatar + name + role line. */
export function AuthorChip({ doctor, meta, className }: { doctor: Doctor; meta?: string; className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Image
        src={doctor.avatar}
        alt={doctor.avatarAlt}
        width={44}
        height={44}
        className="h-11 w-11 rounded-full object-cover ring-2 ring-white"
      />
      <div className="leading-tight">
        <Link href={doctor.profileHref} className="text-[15px] font-semibold text-ink underline-offset-2 hover:text-plum hover:underline">
          {doctor.name}
        </Link>
        {meta && <p className="mt-0.5 text-[13px] text-ink-600">{meta}</p>}
      </div>
    </div>
  );
}
