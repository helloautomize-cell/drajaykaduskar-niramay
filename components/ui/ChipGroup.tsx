"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const chipCls =
  "rounded-full border border-plum/25 bg-plum-50 px-4 py-2 text-[14.5px] font-medium text-ink";

/**
 * Non-clickable chip list. On mobile only the first `visible` chips show,
 * with a "Show all (n)" button; on md+ the full list is always expanded.
 */
export function ChipGroup({
  items,
  visible = 6,
  className,
}: {
  items: string[];
  visible?: number;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const extra = items.length - visible;

  return (
    <div className={className}>
      <ul className="flex flex-wrap gap-2">
        {items.map((c, i) => (
          <li key={c} className={cn(chipCls, !open && i >= visible && "max-md:hidden")}>
            {c}
          </li>
        ))}
      </ul>
      {extra > 0 && (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mt-3 inline-flex min-h-11 items-center rounded-full border border-line bg-card px-4 text-[14px] font-semibold text-plum transition-colors hover:border-plum/40 md:hidden"
        >
          {open ? "Show fewer" : `Show all (${items.length})`}
        </button>
      )}
    </div>
  );
}
