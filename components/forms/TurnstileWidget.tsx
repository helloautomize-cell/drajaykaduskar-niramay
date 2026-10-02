"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: { sitekey: string; callback?: (t: string) => void }
      ) => string;
    };
    __tsResolve?: () => void;
  }
}

let scriptPromise: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("turnstile load failed"));
    document.head.appendChild(s);
  });
  return scriptPromise;
}

/**
 * Cloudflare Turnstile widget. Renders only when NEXT_PUBLIC_TURNSTILE_SITE_KEY
 * is set; calls onToken with the verification token. The hidden input name is
 * `cf-turnstile-response` (the api.js convention).
 */
export function TurnstileWidget({ onToken }: { onToken?: (t: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!sitekey || !ref.current) return;
    let cancelled = false;
    loadScript()
      .then(() => {
        if (!cancelled && ref.current && window.turnstile) {
          window.turnstile.render(ref.current, { sitekey, callback: onToken });
        }
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [sitekey, onToken]);

  if (!sitekey) return null;
  return <div ref={ref} className="mt-4" />;
}
