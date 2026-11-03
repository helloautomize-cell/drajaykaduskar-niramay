"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import {
  hasAnalyticsConsent,
  readConsent,
  subscribeConsent,
  type ConsentState,
} from "@/lib/consent";
import type { TrackEvent } from "@/lib/track";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-76B5MQMRY9";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __gaLoaded?: boolean;
  }
}

/**
 * GA4 + Consent Mode v2 (advanced).
 *
 * - gtag.js loads on every page so the tag is always detectable, but consent
 *   defaults are all-denied: until the visitor accepts, GA stores nothing and
 *   no analytics cookies are set.
 * - Only `analytics_storage` is ever granted. The ad signals stay denied
 *   forever. On withdrawal we re-deny, delete the _ga/_ga_* cookies and stop
 *   all events.
 * - page_location is sanitised: every query parameter is stripped except utm_*,
 *   so no form prefill or other data can reach GA.
 * - No personal or health data is ever sent: callers only pass event names and
 *   coarse labels (link_location, form_name). page_path is added centrally.
 */

// gtag.js only processes `arguments` objects on dataLayer; plain arrays are
// ignored, which silently dropped every hit before this fix.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function gtag(..._args: unknown[]) {
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer?.push(arguments);
}

function ensureStub() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || gtag;
}

function pushDefaults() {
  ensureStub();
  gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500,
  });
}

function injectGtag(onload: () => void) {
  if (window.__gaLoaded || !GA_ID) {
    onload();
    return;
  }
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  s.onload = () => {
    window.__gaLoaded = true;
    onload();
  };
  document.head.appendChild(s);
}

/** Delete every _ga/_ga_* cookie across plausible domain scopes. */
function deleteGaCookies() {
  const host = window.location.hostname;
  const parts = host.split(".");
  const domains = [
    host,
    `.${host}`,
    parts.length > 1 ? `.${parts.slice(-2).join(".")}` : host,
  ];
  for (const c of document.cookie.split(";")) {
    const name = c.split("=")[0].trim();
    if (!/^(_ga|_ga_.*)$/.test(name)) continue;
    for (const d of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${d}`;
    }
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
}

function denyAll() {
  if (!window.gtag) return;
  gtag("consent", "update", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

/** Build a page_location that keeps only utm_* query parameters. */
function sanitizedLocation() {
  const url = new URL(window.location.href);
  const keep = new URLSearchParams();
  url.searchParams.forEach((v, k) => {
    if (k.startsWith("utm_")) keep.set(k, v);
  });
  const qs = keep.toString();
  return url.origin + url.pathname + (qs ? `?${qs}` : "");
}

function sendPageView() {
  // Consent Mode handles storage: without consent the hit is cookieless.
  if (!window.__gaLoaded) return;
  gtag("event", "page_view", {
    page_location: sanitizedLocation(),
    page_path: window.location.pathname,
    page_title: document.title,
  });
}

// link_location: explicit data-ga-location wins (hero, sticky bar, menus),
// else the enclosing header/footer/nav landmark, else "body".
function linkLocation(el: Element): string {
  const tagged = el.closest("[data-ga-location]")?.getAttribute("data-ga-location");
  if (tagged) return tagged;
  const chrome = el.closest("header,footer,nav");
  if (chrome) return chrome.tagName.toLowerCase();
  return "body";
}

// CMS fallback only: booking-CTA link text, whole-word, case-insensitive.
// Excludes "ebook" and social links; never matches nav/header/footer links
// (those are handled by data-ga attributes or skipped outright).
const APPT_WORDS =
  /\b(book (an )?appointment|book now|book a consultation|consult now|schedule)\b/i;
const SOCIAL_HOST = /facebook|instagram|twitter|x\.com|linkedin|youtube|tiktok|threads/i;

function clickEvent(e: MouseEvent): { event: TrackEvent; el: Element } | null {
  const el = e.target as HTMLElement;
  if (!el.closest) return null;
  const tagged = el.closest<HTMLElement>('[data-ga="appointment"]');
  if (tagged) return { event: "appointment_click", el: tagged };
  const a = el.closest("a");
  if (!a) return null;
  const href = a.getAttribute("href") || "";
  if (href.startsWith("tel:")) return { event: "phone_click", el: a };
  // wa.me/<number>, api.whatsapp.com, whatsapp:// — but not bare wa.me/?text=
  // share links, which have no number.
  if (/wa\.me\/\d|api\.whatsapp\.com|whatsapp:\/\//.test(href))
    return { event: "whatsapp_click", el: a };
  if (href.startsWith("mailto:")) return { event: "email_click", el: a };
  if (/google\.com\/maps|maps\.google|maps\.app\.goo\.gl|goo\.gl\/maps/.test(href))
    return { event: "directions_click", el: a };
  // Content links (markdown) only: inside <main>, outside any <nav>.
  if (
    a.closest("main") &&
    !a.closest("nav") &&
    APPT_WORDS.test(a.textContent || "") &&
    !/ebook/i.test(a.textContent || "") &&
    !SOCIAL_HOST.test(href)
  )
    return { event: "appointment_click", el: a };
  return null;
}

export function Analytics() {
  const consent = useSyncExternalStore(subscribeConsent, readConsent, () => null as ConsentState | null);
  const pathname = usePathname();
  const grantedRef = useRef(false);
  const firstPath = useRef(true);

  // Delegated click tracking for phone / WhatsApp / email / directions /
  // appointment links across the whole site — no per-component wiring needed.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const hit = clickEvent(e);
      if (!hit) return;
      window.__niramayTrack?.(hit.event, { link_location: linkLocation(hit.el) });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // The real implementation behind lib/track.ts's window.__niramayTrack.
  // Every event carries page_path; callers add only their own params.
  useEffect(() => {
    window.__niramayTrack = (event: TrackEvent, params?: Record<string, string | number | boolean | undefined>) => {
      if (!window.__gaLoaded || !window.gtag) return;
      gtag("event", event, { page_path: window.location.pathname, ...params });
    };
    return () => {
      delete window.__niramayTrack;
    };
  }, []);

  // Mount once: denied defaults, then always load gtag.js — but not during
  // the critical window. Consent defaults queue on dataLayer immediately; the
  // tag itself fetches only after `load` when the browser is idle, so its
  // download, parse and execution never compete with LCP/hydration.
  useEffect(() => {
    if (!GA_ID) return;
    pushDefaults();
    const boot = () =>
      injectGtag(() => {
        if (!window.gtag) return;
        gtag("js", new Date());
        if (hasAnalyticsConsent()) {
          grantedRef.current = true;
          gtag("consent", "update", { analytics_storage: "granted" });
        }
        gtag("config", GA_ID, {
          send_page_view: false,
          allow_google_signals: false,
        });
        sendPageView();
      });
    const schedule = () => {
      if ("requestIdleCallback" in window) window.requestIdleCallback(boot, { timeout: 4000 });
      else setTimeout(boot, 1);
    };
    if (document.readyState === "complete") schedule();
    else {
      window.addEventListener("load", schedule, { once: true });
      return () => window.removeEventListener("load", schedule);
    }
  }, []);

  // Consent changes after mount: grant on accept; deny + wipe on withdrawal.
  useEffect(() => {
    if (!GA_ID) return;
    if (consent?.analytics === true && !grantedRef.current) {
      grantedRef.current = true;
      gtag("consent", "update", { analytics_storage: "granted" });
    } else if (consent?.analytics !== true && grantedRef.current) {
      // declined/withdrawn after being granted
      denyAll();
      deleteGaCookies();
      grantedRef.current = false;
    }
  }, [consent]);

  // Route-change page views (client navigations).
  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false;
      return; // initial view is fired by the consent effect
    }
    sendPageView();
  }, [pathname]);

  return null;
}
