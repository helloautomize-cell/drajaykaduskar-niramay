import type { NextConfig } from "next";
import { offerRedirects, pageRedirects } from "./lib/wp-redirects";

// Redirect tables live in lib/wp-redirects.ts (old WordPress URLs -> new IA,
// every destination a canonical trailing-slash URL).
/**
 * Content-Security-Policy: self plus exactly the third parties this site
 * loads, all behind user interaction or consent —
 *   GA (gtag) after consent; YouTube-nocookie + i.ytimg after the video
 *   click; Google Maps embed after the map click; Cloudflare Turnstile on
 *   the forms; Vercel Speed Insights.
 * style/script 'unsafe-inline' are required by the framework's inline
 * bootstrap and style attributes; everything else is locked down.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://i.ytimg.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://*.google-analytics.com https://www.googletagmanager.com https://challenges.cloudflare.com",
  "frame-src https://www.youtube-nocookie.com https://maps.google.com https://www.google.com https://challenges.cloudflare.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Content-Security-Policy", value: csp },
];

const nextConfig: NextConfig = {
  // canonical URLs, sitemap and internal links all use trailing slashes;
  // serve them directly instead of 308-redirecting to the slash-less form
  trailingSlash: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      ...pageRedirects.map(([source, destination]) => ({
        source: source.replace(/\/$/, ""),
        destination,
        permanent: true,
      })),
      ...Object.entries(offerRedirects).map(([slug, destination]) => ({
        source: `/offer/${slug}`,
        destination,
        permanent: true,
      })),
      // about-page photo slider items -> About
      { source: "/slide/:slug", destination: "/about/", permanent: true },
      // BeTheme builder template leftovers should not be public
      { source: "/template-item/:slug", destination: "/", permanent: true },
      // safety net for any unlisted /offer/ slug
      { source: "/offer/:slug", destination: "/services/", permanent: true },
      // old stub thank-you path -> /thank-you/?type=
      { source: "/contact/thank-you", destination: "/thank-you/", permanent: false },
      // retired standalone videos page -> home
      { source: "/videos", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
