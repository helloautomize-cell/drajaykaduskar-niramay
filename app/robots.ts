import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/styleguide", "/404-demo", "/contact/thank-you/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
