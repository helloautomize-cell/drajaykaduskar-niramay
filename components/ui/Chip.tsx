import { cn } from "@/lib/utils";

export function Chip({
  active = false,
  className,
  children,
}: {
  active?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-semibold",
        active ? "bg-grad text-white" : "bg-plum-100 text-plum",
        className
      )}
    >
      {children}
    </span>
  );
}
