"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site-config";
import { waLinkFor } from "@/lib/whatsapp";
import { CalendarIcon, PhoneIcon, WhatsAppIcon, CloseIcon } from "@/components/icons";

const btnCls =
  "flex flex-col items-center gap-1 py-3 text-white transition-all duration-200 ease-[var(--ease)] active:scale-[0.97] active:opacity-85";

/** "Call Now" sheet: lets the visitor pick the landline or the mobile. */
function CallSheet({ children }: { children: React.ReactNode }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          data-sheet-overlay
          className="fixed inset-0 z-[70] bg-ink/30 backdrop-blur-[2px]"
        />
        <Dialog.Content
          data-callsheet
          aria-label="Call Niramay Clinics"
          className="fixed bottom-0 left-0 right-0 z-[71] mx-auto w-[min(400px,100vw)] rounded-t-[20px] bg-white p-5 pb-[calc(20px+env(safe-area-inset-bottom))] shadow-[0_-16px_50px_-16px_rgba(42,36,64,.35)] lg:bottom-6 lg:rounded-[20px]"
        >
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="t-h3 !text-[17px] text-ink">
              Call Niramay Clinics
            </Dialog.Title>
            <Dialog.Close
              aria-label="Close"
              className="grid size-10 place-items-center rounded-[10px] text-ink-600 transition-colors hover:bg-plum-50 hover:text-ink"
            >
              <CloseIcon size={18} />
            </Dialog.Close>
          </div>
          <div className="space-y-2">
            <a
              href={site.phone.tel}
              className="flex min-h-14 items-center gap-3 rounded-[14px] border border-line px-4 transition-colors hover:border-plum/40 hover:bg-plum-50"
            >
              <PhoneIcon size={20} className="text-plum" />
              <span>
                <span className="block text-[15px] font-semibold text-ink">
                  Clinic {site.phone.display}
                </span>
                <span className="block text-[13px] text-ink-600">Reception and appointments</span>
              </span>
            </a>
            <a
              href={site.mobile.tel}
              className="flex min-h-14 items-center gap-3 rounded-[14px] border border-line px-4 transition-colors hover:border-plum/40 hover:bg-plum-50"
            >
              <PhoneIcon size={20} className="text-plum" />
              <span>
                <span className="block text-[15px] font-semibold text-ink">
                  Mobile {site.mobile.display}
                </span>
                <span className="block text-[13px] text-ink-600">Calls and WhatsApp</span>
              </span>
            </a>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/**
 * Fixed mobile action bar (plan section 2.10): glass over brand gradient,
 * three equal buttons with 20px icons over 13px labels. Hidden above 1024px,
 * while a text input is focused, and on /contact/thank-you/.
 */
export function MobileActionBar({
  whatsappText,
  className,
  fixed = true,
}: {
  whatsappText?: string;
  className?: string;
  /** false = render in place (styleguide phone demo), true = fixed bottom bar */
  fixed?: boolean;
}) {
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onFocus = (e: FocusEvent) => {
      const t = e.target as HTMLElement;
      setHidden(t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
    };
    document.addEventListener("focusin", onFocus);
    document.addEventListener("focusout", onFocus);
    return () => {
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("focusout", onFocus);
    };
  }, []);

  const waUrl = whatsappText
    ? `${site.whatsapp.url}?text=${encodeURIComponent(whatsappText)}`
    : waLinkFor(pathname ?? "/");

  if (fixed && pathname === "/contact/thank-you/") return null;

  return (
    <nav
      aria-label="Quick actions"
      className={cn(
        "overflow-hidden rounded-t-2xl border-t border-white/25 bg-[linear-gradient(90deg,rgba(115,69,105,.92),rgba(69,62,109,.92))] backdrop-blur-[18px] pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_-10px_rgba(42,36,64,.35)] transition-transform duration-300 ease-[var(--ease)]",
        fixed && "fixed inset-x-0 bottom-0 z-40 lg:hidden",
        hidden && "translate-y-full",
        className
      )}
    >
      <div className="grid grid-cols-3">
        <Link href="/contact/#book" aria-label="Book Now" className={btnCls}>
          <CalendarIcon size={20} />
          <span className="text-[13px] font-semibold">Book Now</span>
        </Link>
        <CallSheet>
          <button type="button" aria-label="Call Now" className={cn(btnCls, "border-x border-white/15")}>
            <PhoneIcon size={20} />
            <span className="text-[13px] font-semibold">Call Now</span>
          </button>
        </CallSheet>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className={btnCls}
        >
          <WhatsAppIcon size={20} />
          <span className="text-[13px] font-semibold">WhatsApp</span>
        </a>
      </div>
    </nav>
  );
}
