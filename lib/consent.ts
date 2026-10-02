/**
 * Cookie consent (DPDP-friendly): choice stored in localStorage; analytics
 * must not load unless hasAnalyticsConsent() is true (plan section 6).
 *
 * getSnapshot caching: readConsent() returns the SAME object while the raw
 * localStorage value is unchanged, so useSyncExternalStore never sees a new
 * snapshot per render (which would loop).
 */

export const CONSENT_KEY = "nc-consent";
export const CONSENT_EVENT = "niramay-consent-change";
export const CONSENT_OPEN_EVENT = "niramay-cookie-settings";

export interface ConsentState {
  analytics: boolean;
  decided: "accepted" | "declined" | "custom";
  at: string; // ISO timestamp
}

// module-level snapshot cache, keyed by the raw stored string
let cachedRaw: string | null | undefined;
let cachedValue: ConsentState | null = null;

export function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  let raw: string | null;
  try {
    raw = localStorage.getItem(CONSENT_KEY);
  } catch {
    // private mode / storage blocked — fall back to the last known value
    return cachedValue;
  }
  if (raw === cachedRaw) return cachedValue;
  cachedRaw = raw;
  if (!raw) {
    cachedValue = null;
    return cachedValue;
  }
  try {
    const v = JSON.parse(raw) as ConsentState;
    cachedValue = typeof v.analytics === "boolean" ? v : null;
  } catch {
    cachedValue = null;
  }
  return cachedValue;
}

export function writeConsent(s: ConsentState) {
  const raw = JSON.stringify(s);
  try {
    localStorage.setItem(CONSENT_KEY, raw);
  } catch {
    /* storage blocked — keep in-memory cache */
  }
  cachedRaw = raw;
  cachedValue = s;
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: s }));
}

/** subscribe to storage + the custom event fired by writeConsent() */
export function subscribeConsent(cb: () => void) {
  window.addEventListener(CONSENT_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(CONSENT_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

/** True only after the visitor has explicitly accepted analytics cookies. */
export function hasAnalyticsConsent(): boolean {
  return readConsent()?.analytics === true;
}

/** Ask the cookie banner to open its settings view (footer "Cookie settings"). */
export function openCookieSettings() {
  window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT));
}
