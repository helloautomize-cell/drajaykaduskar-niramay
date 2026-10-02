import type { MetadataRoute } from "next";
import { allPages, allPosts } from "@/lib/content/pages";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = allPages()
    .map((p) => ({ url: p.meta.url, modified: p.modified }))
    .filter((p) => p.url !== "-")
    .map((p) => ({
      url: `${SITE_URL}${p.url}`,
      lastModified: p.modified || undefined,
      changeFrequency: "monthly" as const,
    }));
  const posts = allPosts().map((p) => ({
    url: `${SITE_URL}${p.meta.url}`,
    lastModified: p.meta.updated || p.meta.published || undefined,
    changeFrequency: "yearly" as const,
  }));
  return [...pages, ...posts];
}
