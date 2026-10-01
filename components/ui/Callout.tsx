import { cn } from "@/lib/utils";
import { EmergencyIcon, InfoIcon, type IconComponent } from "@/components/icons";

const styles = {
  emergency: {
    box: "border-l-4 border-logo-red bg-[#fdf1f1]",
    icon: "text-logo-red",
    title: "text-red-700",
  },
  info: {
    box: "border border-plum/20 bg-plum-50",
    icon: "text-plum",
    title: "text-plum",
  },
  warning: {
    box: "border-l-4 border-[#d97706] bg-[#fef8ec]",
    icon: "text-[#b45309]",
    title: "text-[#92400e]",
  },
} as const;

export function Callout({
  variant = "info",
  title,
  icon,
  className,
  children,
}: {
  variant?: keyof typeof styles;
  title?: string;
  icon?: IconComponent;
  className?: string;
  children: React.ReactNode;
}) {
  const s = styles[variant];
  const Icon = icon ?? (variant === "emergency" ? EmergencyIcon : InfoIcon);
  return (
    <div className={cn("flex gap-4 rounded-[16px] p-5", s.box, className)} role={variant === "emergency" ? "alert" : undefined}>
      <Icon size={22} className={cn("mt-0.5 shrink-0", s.icon)} />
      <div>
        {title && <p className={cn("mb-1 text-[15px] font-bold", s.title)}>{title}</p>}
        <div className="text-[15px] leading-relaxed text-ink-600">{children}</div>
      </div>
    </div>
  );
}
