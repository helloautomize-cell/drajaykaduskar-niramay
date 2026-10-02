import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  // Until launch (SITE_INDEXABLE=true) the whole site is disallowed.
  if (process.env.SITE_INDEXABLE !== "true") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/styleguide", "/404-demo", "/thank-you/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
