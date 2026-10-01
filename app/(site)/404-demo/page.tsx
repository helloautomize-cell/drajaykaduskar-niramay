import type { Metadata } from "next";
import NotFound from "../not-found";

export const metadata: Metadata = {
  title: "Page not found demo",
  robots: { index: false, follow: false },
};

/**
 * Renders the 404 view with a 200 status purely so tooling (Lighthouse etc.)
 * can audit it. The real not-found.tsx keeps the 404 status.
 */
export default function NotFoundDemo() {
  return <NotFound />;
}
