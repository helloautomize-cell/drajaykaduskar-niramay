import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const UTILITY = ["/styleguide", "/404-demo", "/thank-you/"];

// Search engines and AI crawlers explicitly allowed at launch; only the
// utility routes are disallowed.
const AGENTS = [
  "Googlebot",
  "Bingbot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  // Until launch (SITE_INDEXABLE=true) the whole site is disallowed.
  if (process.env.SITE_INDEXABLE !== "true") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: UTILITY },
      ...AGENTS.map((userAgent) => ({
        userAgent,
        allow: "/" as const,
        disallow: UTILITY,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
