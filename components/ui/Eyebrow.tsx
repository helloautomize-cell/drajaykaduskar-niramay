import { cn } from "@/lib/utils";

/** Section eyebrow, e.g. "01 / WHY NIRAMAY". */
export function Eyebrow({
  num,
  as: Tag = "p",
  children,
  className,
}: {
  num?: string;
  as?: "p" | "h2" | "h3" | "div";
  children: string;
  className?: string;
}) {
  return (
    <Tag className={cn("eyebrow", className)}>
      {num ? (
        <>
          <span className="text-plum">{num}</span>
          <span className="mx-2 text-plum-500">/</span>
          {children}
        </>
      ) : (
        children
      )}
    </Tag>
  );
}
