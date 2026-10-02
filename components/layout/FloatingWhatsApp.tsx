"use client";

import { usePathname } from "next/navigation";
import { waLinkFor } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons";

/**
 * Floating WhatsApp button (plan section 2.10): 56px glass circle, bottom
 * right, desktop only. Message is built from the current page title.
 */
export function FloatingWhatsApp() {
  const pathname = usePathname();
  return (
    <a
      href={waLinkFor(pathname ?? "/")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
      className="group fixed bottom-6 right-6 z-40 hidden size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_36px_-10px_rgba(37,211,102,.55)] transition-all duration-300 ease-[var(--ease)] hover:-translate-y-1 hover:shadow-[0_20px_44px_-12px_rgba(37,211,102,.65)] lg:flex"
    >
      <WhatsAppIcon size={26} />
    </a>
  );
}
