#!/usr/bin/env node
/**
 * IndexNow ping — tells Bing (which also feeds ChatGPT search and Copilot)
 * about changed URLs after a production deploy.
 *
 * Disabled until launch: exits silently unless SITE_INDEXABLE=true.
 * Changed URLs = content files touched by the deploy commit; if the diff is
 * unavailable (e.g. no previous sha) the full sitemap is submitted instead.
 *
 * Run:  SITE_INDEXABLE=true node scripts/indexnow.mjs
 */
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SITE = "https://www.niramayclinics.com";
const KEY = "29520e80f0702ffe72f763c310bef685";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

if (process.env.SITE_INDEXABLE !== "true") {
  console.log("indexnow: SITE_INDEXABLE is not true, skipping (pre-launch)");
  process.exit(0);
}

// the content loader is TypeScript; this standalone script reads the URLs
// from the built sitemap instead
function allUrls() {
  try {
    const xml = readFileSync(path.join(root, ".next/server/app/sitemap.xml.body"), "utf8");
    return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  } catch {
    return null;
  }
}

function changedUrls() {
  const prev = process.env.VERCEL_GIT_PREVIOUS_COMMIT_SHA || "HEAD~1";
  let files;
  try {
    files = execFileSync("git", ["diff", "--name-only", prev, "HEAD", "--", "resources/content"], {
      cwd: root,
      encoding: "utf8",
    }).trim();
  } catch {
    return null;
  }
  if (!files) return [];
  // map changed content files to their page URLs via frontmatter url fields
  const urls = [];
  for (const f of files.split("\n")) {
    try {
      const raw = readFileSync(path.join(root, f), "utf8");
      const m = raw.match(/^url:\s*"([^"]+)"/m);
      if (m && m[1] && m[1] !== "-") urls.push(`${SITE}${m[1]}`);
    } catch {
      // file deleted — submit the sitemap instead
      return null;
    }
  }
  return [...new Set(urls)];
}

const urlList = changedUrls() ?? allUrls() ?? [`${SITE}/`];
if (urlList.length === 0) {
  console.log("indexnow: no changed URLs, nothing to submit");
  process.exit(0);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    host: "www.niramayclinics.com",
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList,
  }),
});
console.log(`indexnow: submitted ${urlList.length} URLs, HTTP ${res.status}`);
process.exit(res.ok || res.status === 202 ? 0 : 1);
