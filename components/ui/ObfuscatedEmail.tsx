"use client";

import { useSyncExternalStore } from "react";

// Assembled client-side so the raw address never appears in HTML/source.
const PARTS = ["ajaykaduskar", "gmail", "com"] as const;
const email = () => `${PARTS[0]}@${PARTS[1]}.${PARTS[2]}`;

/**
 * mailto: link assembled after hydration so the raw address is not in the
 * served HTML for scrapers. SSR renders a plain span; on mount it becomes a
 * link. Shows `children` as the link text if given, else the address.
 */
export function ObfuscatedEmail({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const addr = mounted ? email() : null;

  if (!addr) {
    return <span className={className}>{children ?? "…"}</span>;
  }
  return (
    <a href={`mailto:${addr}`} className={className}>
      {children ?? addr}
    </a>
  );
}

/** For non-link contexts that still need the address text client-side. */
export function useEmail() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  return mounted ? email() : "";
}
export { email };
