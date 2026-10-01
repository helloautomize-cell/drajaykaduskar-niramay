import { cn } from "@/lib/utils";

/**
 * Responsive wrapper for content tables: horizontal scroll inside its own
 * container on small screens, sticky first column, card chrome.
 */
export function ContentTable({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "mt-6 overflow-x-auto rounded-[14px] border border-line bg-white",
        "[&_table]:w-full [&_table]:border-collapse [&_table]:text-left",
        "[&_th:first-child]:sticky [&_th:first-child]:left-0 [&_th:first-child]:z-10",
        "[&_td:first-child]:sticky [&_td:first-child]:left-0 [&_td:first-child]:bg-white [&_td:first-child]:font-medium [&_td:first-child]:text-ink",
        "[&_th:first-child]:bg-plum-50",
        "[&_th]:shadow-[inset_-1px_0_0_var(--color-line)] [&_td]:shadow-[inset_-1px_0_0_var(--color-line)]",
        className
      )}
    >
      <table>{children}</table>
    </div>
  );
}
