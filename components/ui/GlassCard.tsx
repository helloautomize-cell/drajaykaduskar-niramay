import { cn } from "@/lib/utils";
import type { IconComponent } from "@/components/icons";

/**
 * Card with a 48px plum-100 icon tile, title and text.
 * `glass` applies the frosted treatment (only over tint, glow or photo — never flat white).
 */
export function GlassCard({
  icon: Icon,
  title,
  titleAs: Title = "h3",
  children,
  glass = false,
  dark = false,
  className,
}: {
  icon: IconComponent;
  title: string;
  /** heading level for the card title — keep page outlines sequential */
  titleAs?: "h2" | "h3";
  children: React.ReactNode;
  glass?: boolean;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[20px] p-[26px] transition-all duration-500 ease-[var(--ease)] hover:-translate-y-1 hover:shadow-[var(--shadow-hover)]",
        glass ? (dark ? "glass-dark" : "glass") : "border border-line bg-card shadow-[var(--shadow-card)]",
        className
      )}
    >
      <div
        className={cn(
          "mb-4 grid size-12 place-items-center rounded-[14px]",
          dark ? "bg-white/15 text-white" : "bg-plum-100 text-plum"
        )}
      >
        <Icon size={22} />
      </div>
      <Title className={cn("t-h3 mb-2", dark ? "text-white" : "text-ink")}>{title}</Title>
      <div className={cn("text-[15px] leading-relaxed", dark ? "text-white/85" : "text-ink-600")}>
        {children}
      </div>
    </div>
  );
}
