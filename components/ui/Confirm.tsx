import { cn } from "@/lib/utils";

/**
 * Renders unconfirmed facts as a yellow placeholder while content awaits
 * doctor sign-off. Hidden entirely in production builds.
 */
export function Confirm({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <span className={cn("confirm-chip", className)} title="Awaiting confirmation">
      {children}
    </span>
  );
}
