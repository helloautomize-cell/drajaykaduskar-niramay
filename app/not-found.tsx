import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { NotFoundBody } from "@/components/layout/NotFoundBody";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

/**
 * Root 404 for URLs that never enter a route (static catch-all uses
 * dynamicParams=false). Renders the same body and chrome as
 * app/(site)/not-found.tsx so the footer credit shows here too.
 */
export default function RootNotFound() {
  return (
    <SiteShell>
      <NotFoundBody />
    </SiteShell>
  );
}
