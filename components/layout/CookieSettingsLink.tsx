"use client";

import { openCookieSettings } from "@/lib/consent";

/** Footer "Cookie settings" button — re-opens the banner's settings view. */
export function CookieSettingsLink() {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className="inline-flex min-h-9 items-center text-ink-600 underline decoration-line underline-offset-4 transition-colors hover:text-plum"
    >
      Cookie settings
    </button>
  );
}
