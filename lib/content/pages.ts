/**
 * Build-time content loader. Reads every .md under resources/content/,
 * validates frontmatter with Zod, strips the metadata header block from the
 * body (URL / SEO title / Meta description / Schema / Images / Reviewed by
 * bullets and the "Page N." heading), and keeps the raw markdown for the
 * segment renderer.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { parse as parseYaml } from "yaml";
import { pageFrontmatter, postFrontmatter, type PageFrontmatter, type PostFrontmatter } from "./schema";

const CONTENT_ROOT = path.join(process.cwd(), "resources/content");

export interface ContentPage {
  meta: PageFrontmatter;
  /** markdown body with the metadata header block removed */
  body: string;
  /** H1 text pulled from the "**H1:** ..." line */
  h1: string;
  file: string;
  /** last content change date (ISO): git commit date, falling back to mtime */
  modified: string;
}

export interface BlogPost {
  meta: PostFrontmatter;
  body: string;
  file: string;
  slug: string;
}

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    if (name.startsWith("_")) continue;
    const p = path.join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...walk(p));
    else if (name.endsWith(".md")) out.push(p);
  }
  return out;
}

function splitFrontmatter(raw: string, file: string): { data: unknown; body: string } {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error(`[content] ${file}: missing YAML frontmatter block`);
  let data: unknown;
  try {
    data = parseYaml(m[1]);
  } catch (e) {
    throw new Error(`[content] ${file}: invalid YAML frontmatter — ${(e as Error).message}`);
  }
  return { data, body: m[2] };
}

/**
 * Remove the generated header block at the top of each page file:
 *   ### Page N. Title
 *   - **URL:** ... / - **SEO title:** ... etc.
 *   **H1:** ...
 * Returns the visible body and the extracted H1.
 */
function stripHeader(body: string): { body: string; h1: string } {
  let h1 = "";
  const lines = body.split("\n");
  const keep: string[] = [];
  for (const line of lines) {
    const t = line.trim();
    if (/^#{1,4}\s+Page\s+\S+/i.test(t)) continue; // "### Page 7. ..." heading
    if (/^-\s+\*\*(URL|SEO title|Meta description|Schema|Images|Reviewed by|Old URL|Excerpt):\*\*/i.test(t)) continue;
    const h1m = t.match(/^\*\*H1:\*\*\s*(.+)$/i);
    if (h1m) {
      h1 = h1m[1].trim();
      continue;
    }
    // "**CTA:** ..." lines are editorial directives — the templates render the
    // CTA band, so the directive text itself is not user-facing copy.
    if (/^\*\*CTA:\*\*/i.test(t)) continue;
    keep.push(line);
  }
  return { body: keep.join("\n").replace(/^\n+/, ""), h1 };
}

/** Last content-change date for a file: git commit date, else file mtime. */
function contentModified(file: string): string {
  try {
    const iso = execFileSync("git", ["log", "-1", "--format=%cI", "--", file], {
      cwd: process.cwd(),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (iso) return iso;
  } catch {
    // not a git checkout (or file never committed) — fall back to mtime
  }
  try {
    return statSync(file).mtime.toISOString();
  } catch {
    return "";
  }
}

let pagesCache: ContentPage[] | null = null;
let postsCache: BlogPost[] | null = null;
let byUrlCache: Map<string, ContentPage> | null = null;
let postBySlugCache: Map<string, BlogPost> | null = null;

export function allPages(): ContentPage[] {
  if (pagesCache) return pagesCache;
  const files = walk(CONTENT_ROOT).filter((f) => !f.includes(`${path.sep}blog${path.sep}`));
  const pages: ContentPage[] = [];
  for (const file of files) {
    const rel = path.relative(CONTENT_ROOT, file);
    const { data, body } = splitFrontmatter(readFileSync(file, "utf8"), rel);
    const parsed = pageFrontmatter.safeParse(data);
    if (!parsed.success) {
      throw new Error(`[content] ${rel}: invalid frontmatter — ${parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ")}`);
    }
    const { body: visible0, h1 } = stripHeader(body);
    const patch = PAGE_PATCHES[parsed.data.url];
    const visible = patch ? patch(visible0) : visible0;
    pages.push({ meta: parsed.data, body: visible, h1, file: rel, modified: contentModified(file) });
  }
  pagesCache = pages;
  return pages;
}

/**
 * Required copy corrections applied at render time (resources/ is not edited).
 * Sources: content/blog/_migration-notes.md and per-page editorial notes.
 */
const BODY_PATCHES: Record<string, (body: string) => string> = {
  // Post bodies were replaced by the revised, corrected versions — no
  // render-time patches needed. Keep entries here only for future copy fixes.
};

/** Page-level body trims: cut editorial-notes sections out of page bodies. */
const PAGE_PATCHES: Record<string, (body: string) => string> = {
  "/health-library/": (b) => b.replace(/\n####\s+5\.1[\s\S]*$/, "\n"),
  // "(highlighted)" is an editorial note inside the heading, not copy
  "/contact/": (b) => b.replace("Emergency notice (highlighted)", "Emergency notice"),
};

export function allPosts(): BlogPost[] {
  if (postsCache) return postsCache;
  const dir = path.join(CONTENT_ROOT, "blog");
  const posts: BlogPost[] = [];
  for (const name of readdirSync(dir)) {
    if (!name.endsWith(".md") || name.startsWith("_")) continue;
    const file = path.join(dir, name);
    const rel = path.relative(CONTENT_ROOT, file);
    const { data, body } = splitFrontmatter(readFileSync(file, "utf8"), rel);
    const parsed = postFrontmatter.safeParse(data);
    if (!parsed.success) {
      throw new Error(`[content] ${rel}: invalid frontmatter — ${parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ")}`);
    }
    const slug = parsed.data.url.replace(/^\/health-library\//, "").replace(/\/$/, "");
    // strip the migration metadata bullets (Old URL / Excerpt / Featured image)
    const { body: visible } = stripHeader(body);
    let cleaned = visible.trim();
    // strip the duplicate title heading at the top of migrated posts
    cleaned = cleaned.replace(/^#{1,6}\s+.*\n/, "");
    const patch = BODY_PATCHES[slug];
    if (patch) cleaned = patch(cleaned);
    posts.push({ meta: parsed.data, body: cleaned, file: rel, slug });
  }
  postsCache = posts;
  return posts;
}

export function pageByUrl(): Map<string, ContentPage> {
  if (!byUrlCache) {
    byUrlCache = new Map(allPages().map((p) => [p.meta.url, p]));
  }
  return byUrlCache;
}

export function postBySlug(): Map<string, BlogPost> {
  if (!postBySlugCache) {
    postBySlugCache = new Map(allPosts().map((p) => [p.slug, p]));
  }
  return postBySlugCache;
}
