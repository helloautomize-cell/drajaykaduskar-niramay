import type { MetadataRoute } from "next";
import { allPages, allPosts } from "@/lib/content/pages";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = allPages()
    .map((p) => p.meta.url)
    .filter((u) => u !== "-")
    .map((url) => ({ url: `${SITE_URL}${url}`, changeFrequency: "monthly" as const }));
  const posts = allPosts().map((p) => ({
    url: `${SITE_URL}${p.meta.url}`,
    lastModified: p.meta.published || undefined,
    changeFrequency: "yearly" as const,
  }));
  return [...pages, ...posts];
}
