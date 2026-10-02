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

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __gaLoaded?: boolean;
  }
}

/**
 * GA4 + Consent Mode v2.
 *
 * - gtag.js is injected ONLY after the visitor clicks Accept. Before that no
 *   request is made to any Google domain.
 * - Default consent is all-denied; only `analytics_storage` is ever granted.
 *   The ad signals stay denied forever.
 * - On withdrawal we re-deny, delete the _ga/_ga_* cookies and stop all events.
 * - page_location is sanitised: every query parameter is stripped except utm_*,
 *   so no form prefill or other data can reach GA.
 * - No personal or health data is ever sent: callers only pass event names and
 *   coarse labels (location, form_type).
 */

function gtag(...args: unknown[]) {
  window.dataLayer?.push(args);
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
  if (!window.__gaLoaded || !hasAnalyticsConsent()) return;
  gtag("event", "page_view", {
    page_location: sanitizedLocation(),
    page_path: window.location.pathname,
    page_title: document.title,
  });
}

export function Analytics() {
  const consent = useSyncExternalStore(subscribeConsent, readConsent, () => null as ConsentState | null);
  const pathname = usePathname();
  const grantedRef = useRef(false);
  const firstPath = useRef(true);

  // Delegated click tracking for phone / WhatsApp / directions links across
  // the whole site — no per-component wiring needed.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (href.startsWith("tel:")) window.__niramayTrack?.("call_click");
      else if (/wa\.me|whatsapp/.test(href)) window.__niramayTrack?.("whatsapp_click");
      else if (/google\.com\/maps|maps\.app\.goo\.gl|goo\.gl\/maps/.test(href))
        window.__niramayTrack?.("directions_click");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // The real implementation behind lib/track.ts's window.__niramayTrack.
  useEffect(() => {
    window.__niramayTrack = (event: TrackEvent, params?: Record<string, string | number | boolean | undefined>) => {
      if (!window.__gaLoaded || !hasAnalyticsConsent() || !window.gtag) return;
      gtag("event", event, params || {});
    };
    return () => {
      delete window.__niramayTrack;
    };
  }, []);

  // Consent lifecycle: inject gtag on accept; deny + wipe on withdrawal.
  useEffect(() => {
    if (!GA_ID) return;
    if (consent?.analytics === true && !grantedRef.current) {
      pushDefaults();
      injectGtag(() => {
        if (!window.gtag) return;
        gtag("consent", "update", { analytics_storage: "granted" });
        gtag("js", new Date());
        gtag("config", GA_ID, {
          send_page_view: false,
          allow_google_signals: false,
        });
        grantedRef.current = true;
        sendPageView();
      });
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
