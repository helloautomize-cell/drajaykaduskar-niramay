import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowIcon } from "@/components/icons";

type Variant = "primary" | "secondary" | "link";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold transition-[transform,box-shadow,background-position,border-color] duration-300 ease-[var(--ease)] focus-visible:outline-3 focus-visible:outline-plum-500 focus-visible:outline-offset-3";

const variants: Record<Variant, string> = {
  primary:
    "h-[52px] px-6 rounded-[14px] text-white bg-[linear-gradient(90deg,var(--plum),var(--indigo))] bg-[length:160%_100%] bg-[position:0%_0] hover:bg-[position:100%_0] hover:-translate-y-px hover:shadow-[0_14px_30px_-10px_rgba(69,62,109,.5)]",
  secondary:
    "h-[52px] px-6 rounded-[14px] text-ink bg-white/70 border border-plum/30 backdrop-blur-md hover:border-plum/60 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]",
  link: "h-auto px-0 rounded-none text-plum font-semibold group",
};

interface ButtonProps extends ComponentProps<"button"> {
  variant?: Variant;
  arrow?: boolean;
}
interface ButtonLinkProps extends ComponentProps<typeof Link> {
  variant?: Variant;
  arrow?: boolean;
  children: ReactNode;
}

export function Button({ variant = "primary", arrow, className, children, ...props }: ButtonProps) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
      {arrow && (
        <ArrowIcon size={17} className={variant === "link" ? "transition-transform duration-300 ease-[var(--ease)] group-hover:translate-x-1" : ""} />
      )}
    </button>
  );
}

export function ButtonLink({ variant = "primary", arrow, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={cn(base, variants[variant], className)} {...props}>
      {children}
      {arrow && (
        <ArrowIcon size={17} className={variant === "link" ? "transition-transform duration-300 ease-[var(--ease)] group-hover:translate-x-1" : ""} />
      )}
    </Link>
  );
}
