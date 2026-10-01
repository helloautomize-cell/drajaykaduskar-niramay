import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowIcon, type IconComponent } from "@/components/icons";

/**
 * Arch card: arch-shaped panel on plum-50 with a peach glow, holding either a
 * large line icon (default) or a photo. When the still-life arch photos exist,
 * pass `image` — no other change needed.
 */
export function ArchCard({
  icon: Icon,
  image,
  title,
  meta,
  href,
  className,
}: {
  icon?: IconComponent;
  image?: { src: string; alt: string };
  title: string;
  meta?: string;
  href?: string;
  className?: string;
}) {
  const inner = (
    <>
      <span className="arch-shape relative flex h-[212px] w-full items-end justify-center overflow-hidden bg-plum-50 pb-4">
        <span
          aria-hidden
          className="absolute inset-x-8 bottom-0 h-32 rounded-full bg-[radial-gradient(closest-side,rgba(242,149,122,.55),transparent)]"
        />
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="180px"
            className="object-cover"
          />
        ) : Icon ? (
          <Icon size={76} strokeWidth={1.4} className="relative z-10 text-plum" />
        ) : null}
        <span className="absolute -bottom-2 left-1/2 z-10 grid size-10 -translate-x-1/2 place-items-center rounded-full bg-[var(--grad)] text-white shadow-[0_8px_20px_-6px_rgba(69,62,109,.55)] transition-transform duration-300 ease-[var(--ease)] group-hover:-translate-y-0.5">
          <ArrowIcon size={16} />
        </span>
      </span>
      <span className="mt-4 block text-center text-[15px] font-semibold text-ink">
        {title}
        {meta && <span className="mt-0.5 block text-[12.5px] font-normal text-ink-600">{meta}</span>}
      </span>
    </>
  );

  const cls = cn(
    "group block w-[164px] shrink-0 snap-start outline-offset-4",
    className
  );

  return href ? (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
