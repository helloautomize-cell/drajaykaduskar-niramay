"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

export const Tabs = TabsPrimitive.Root;

export function TabsList({ className, ...props }: TabsPrimitive.TabsListProps) {
  return (
    <TabsPrimitive.List
      className={cn("flex flex-wrap items-center gap-2", className)}
      {...props}
    />
  );
}

export function TabsTrigger({ className, ...props }: TabsPrimitive.TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "min-h-[48px] rounded-full border border-transparent bg-plum-100 px-5 py-2.5 text-[15px] font-semibold text-plum transition-all duration-300 ease-[var(--ease)]",
        "hover:bg-plum-100/70",
        "data-[state=active]:bg-grad data-[state=active]:border-transparent data-[state=active]:text-white data-[state=active]:shadow-[0_10px_24px_-10px_rgba(69,62,109,.5)]",
        className
      )}
      {...props}
    />
  );
}

export function TabsContent({ className, ...props }: TabsPrimitive.TabsContentProps) {
  return (
    <TabsPrimitive.Content
      className={cn(
        "outline-none data-[state=active]:animate-[tabin_.45s_var(--ease)]",
        className
      )}
      {...props}
    />
  );
}
