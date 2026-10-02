import { z } from "zod";

/** Frontmatter for the 48 page files under resources/content/ */
export const pageFrontmatter = z.object({
  page_number: z.union([z.number(), z.string()]).optional(),
  title: z.string().min(1),
  /** "" is allowed: the 404 content file has no URL */
  url: z.string().default(""),
  seo_title: z.string().default(""),
  meta_description: z.string().default(""),
  schema: z.string().default(""),
  images: z.array(z.string()).default([]),
  reviewed_by: z.string().default(""),
  section: z.string().min(1),
  status: z.string().default("draft"),
  has_confirm_items: z.boolean().default(false),
});
export type PageFrontmatter = z.infer<typeof pageFrontmatter>;

/** Frontmatter for the migrated blog posts in resources/content/blog/ */
export const postFrontmatter = z.object({
  title: z.string().min(1),
  url: z.string().min(1),
  original_title: z.string().default(""),
  original_url: z.string().default(""),
  /** old WordPress permalink, kept for redirect bookkeeping */
  old_url: z.string().default(""),
  author: z.string().min(1),
  author_credentials: z.string().default(""),
  reviewed_by: z.string().default(""),
  published: z.string().default(""),
  updated: z.string().default(""),
  category: z.string().default(""),
  reading_time: z.string().default(""),
  /** processed image path under /images/, e.g. "blog/diabetes-myths.jpg" */
  image: z.string().default(""),
  /** YouTube video id for the click-to-load facade */
  video: z.string().default(""),
  excerpt: z.string().default(""),
  /** related service/page URLs shown as glass cards at the end of the post */
  related: z.array(z.string()).default([]),
  section: z.literal("blog").or(z.string()),
  status: z.string().default("draft"),
  has_confirm_items: z.boolean().default(false),
});
export type PostFrontmatter = z.infer<typeof postFrontmatter>;
