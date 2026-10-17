import type { Metadata } from "next";
import { NotFoundBody } from "@/components/layout/NotFoundBody";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundBody />;
}
