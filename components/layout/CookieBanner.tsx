"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import {
  CONSENT_OPEN_EVENT,
  readConsent,
  writeConsent,
  subscribeConsent,
  type ConsentState,
} from "@/lib/consent";
import { CloseIcon } from "@/components/icons";

const SSR_PENDING = Symbol("ssr");
const serverSnapshot = (): typeof SSR_PENDING => SSR_PENDING;

/**
 * Cookie banner: small glass card bottom left. On phones it sits
 * above the fixed action bar (bar height + safe-area). Choice persists in
 * localStorage; analytics loads only after hasAnalyticsConsent() is true.
 */
export function CookieBanner() {
  const consent = useSyncExternalStore<ConsentState | null | typeof SSR_PENDING>(
    subscribeConsent,
    readConsent,
    serverSnapshot
  );
  const [settings, setSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  // forced open via the footer "Cookie settings" link, even after a stored choice
  const [forcedOpen, setForcedOpen] = useState(false);

  useEffect(() => {
    const open = () => {
      setAnalytics(readConsent()?.analytics === true);
      setSettings(true);
      setForcedOpen(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, open);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, open);
  }, []);

  // SSR/first paint renders nothing; appears only when no choice is stored,
  // or when the footer link re-opens it.
  if (!forcedOpen && (consent === SSR_PENDING || consent !== null)) return null;

  const decide = (decided: "accepted" | "declined" | "custom", a: boolean) => {
    writeConsent({ analytics: a, decided, at: new Date().toISOString() });
    setForcedOpen(false);
    setSettings(false);
  };

  return (
    <div
      data-print-hide
      role="dialog"
      aria-label="Cookie settings"
      className={cn(
        "fixed z-[55] w-[min(360px,calc(100vw-24px))]",
        // above the mobile action bar on phones; bottom left on desktop
        "bottom-[calc(92px+env(safe-area-inset-bottom))] left-3",
        "lg:bottom-6 lg:left-6"
      )}
    >
      <div className="glass rounded-[20px] p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[15px] font-semibold text-ink">Cookies on this site</p>
          <button
            type="button"
            aria-label="Close cookie notice"
            onClick={() =>
              forcedOpen ? (setForcedOpen(false), setSettings(false)) : decide("declined", false)
            }
            className="grid size-8 shrink-0 place-items-center rounded-[8px] text-ink-600 transition-colors hover:bg-plum-50 hover:text-ink"
          >
            <CloseIcon size={16} />
          </button>
        </div>
        <p className="mt-1.5 text-[14px] leading-snug text-ink-600">
          We use essential cookies, and analytics only if you agree.
        </p>

        {settings && (
          <label className="mt-3 flex min-h-12 cursor-pointer items-center justify-between gap-3 rounded-[12px] border border-line bg-white/60 px-3 py-2">
            <span className="text-[14px] font-medium text-ink">Analytics cookies</span>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="size-5 accent-plum"
            />
          </label>
        )}

        <div className="mt-4 flex items-center gap-2">
          {settings ? (
            <>
              <button
                type="button"
                onClick={() => decide("custom", analytics)}
                className="h-11 flex-1 rounded-[12px] bg-grad text-[14.5px] font-semibold text-white transition-transform duration-200 hover:-translate-y-px"
              >
                Save choices
              </button>
              <button
                type="button"
                onClick={() => setSettings(false)}
                className="h-11 rounded-[12px] px-4 text-[14.5px] font-semibold text-plum transition-colors hover:bg-plum-50"
              >
                Back
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => decide("accepted", true)}
                className="h-11 flex-1 rounded-[12px] bg-grad text-[14.5px] font-semibold text-white transition-transform duration-200 hover:-translate-y-px"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={() => decide("declined", false)}
                className="h-11 rounded-[12px] border border-line bg-white/70 px-4 text-[14.5px] font-semibold text-ink transition-colors hover:border-plum/40"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => setSettings(true)}
                className="h-11 rounded-[12px] px-3 text-[14.5px] font-semibold text-plum transition-colors hover:bg-plum-50"
              >
                Settings
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
