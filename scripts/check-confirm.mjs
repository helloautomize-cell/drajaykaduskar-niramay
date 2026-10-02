#!/usr/bin/env node
/**
 * Launch check: list every remaining [CONFIRM] marker in the content files
 * and site config. Exits non-zero if any remain — run before go-live.
 * A normal `npm run build` does NOT run this; previews may ship with
 * markers still hidden in production output.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const DIRS = [
  path.join(ROOT, "resources/content"),
];
const EXTRA_FILES = [path.join(ROOT, "lib/site-config.ts")];

const MARKER = /\[CONFIRM(?::[^\]]*)?\]|TODO_CONFIRM/g;

function* files(dir) {
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) yield* files(p);
    // _-prefixed files are build tooling (tracker, index, notes), not pages
    else if (name.endsWith(".md") && !name.startsWith("_")) yield p;
  }
}

let total = 0;
const report = [];

function scan(file, label) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    const hits = line.match(MARKER);
    if (hits) {
      total += hits.length;
      report.push(`${label}:${i + 1}: ${hits.join(" ")} — ${line.trim().slice(0, 110)}`);
    }
  });
}

for (const d of DIRS) for (const f of files(d)) scan(f, path.relative(ROOT, f));
for (const f of EXTRA_FILES) scan(f, path.relative(ROOT, f));

// --- Production environment rules ---
// These are errors when VERCEL_ENV=production, warnings otherwise.
// Locally, values may live in .env.local (gitignored) — load it for the check.
try {
  for (const line of readFileSync(path.join(ROOT, ".env.local"), "utf8").split("\n")) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && process.env[m[1]] === undefined) {
      process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
    }
  }
} catch {
  /* no .env.local — Vercel injects vars directly */
}
const isProd = process.env.VERCEL_ENV === "production";
const envErrors = [];
const envWarnings = [];

const REQUIRED_ENV = [
  "RESEND_API_KEY",
  "FORM_TO_EMAIL",
  "FORM_FROM_EMAIL",
];
for (const v of REQUIRED_ENV) {
  if (!process.env[v]) envErrors.push(`missing env var ${v}`);
}
if (/resend\.dev/i.test(process.env.FORM_FROM_EMAIL || "")) {
  envErrors.push("FORM_FROM_EMAIL uses resend.dev — verify the domain in Resend first");
}
if (process.env.FORM_TEST_MODE) {
  envErrors.push("FORM_TEST_MODE is set — emails would be silently skipped");
}

// googleProfiles links empty → warning only (links simply do not render)
const siteConfig = readFileSync(path.join(ROOT, "lib/site-config.ts"), "utf8");
if (/mapsUrl:\s*""/.test(siteConfig)) {
  envWarnings.push("site.googleProfiles mapsUrl is empty — Google Maps links will not render");
}
if (process.env.SITE_INDEXABLE !== "true") {
  envWarnings.push("SITE_INDEXABLE is not true — site stays noindexed (fine until launch)");
}

// --- Rendered-HTML hygiene (built output in .next/server/app) ---
// React's own hydration markers (<!-- -->, <!--$--> …) are expected and
// excluded; everything else listed here must not reach production HTML.
const BUILD_APP = path.join(ROOT, ".next/server/app");
const renderErrors = [];

function* htmlFiles(dir) {
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) yield* htmlFiles(p);
    else if (name.endsWith(".html")) yield p;
  }
}

try {
  statSync(BUILD_APP);
  const htmlChecks = [
    [/(?<!-)<!--(?![-$/?#!]|\s*-->)[^>]{0,200}/, "authored HTML comment"],
    [/data-testid=/g, "data-testid attribute"],
    [/lorem ipsum/gi, "lorem ipsum"],
    [/>\s*TODO\b|\bTODO:/g, "TODO"],
    [/FIXME/g, "FIXME"],
    [/\[CONFIRM[^\]]*\]/g, "[CONFIRM] marker"],
    [/[\u2014\u2013]/g, "em/en dash"],
  ];
  for (const f of htmlFiles(BUILD_APP)) {
    const html = readFileSync(f, "utf8");
    const rel = path.relative(ROOT, f);
    for (const [re, label] of htmlChecks) {
      const m = html.match(re);
      if (m) {
        const idx = html.indexOf(m[0]);
        renderErrors.push(
          `${rel}: ${label} (${JSON.stringify(html.slice(Math.max(0, idx - 40), idx + 60))})`
        );
      }
    }
  }
} catch {
  envWarnings.push("no production build found — rendered-HTML checks skipped (run after npm run build)");
}

if (renderErrors.length > 0) {
  console.log(`launch-check: ${renderErrors.length} rendered-HTML problem(s):`);
  for (const e of renderErrors.slice(0, 30)) console.log("  ERROR: " + e);
  process.exit(1);
}

if (total === 0 && envErrors.length === 0) {
  console.log("launch-check: no [CONFIRM] markers remain.");
  if (!isProd) console.log("launch-check: env rules are warnings outside production.");
}
if (total > 0) {
  console.log(`launch-check: ${total} unresolved [CONFIRM] marker(s):`);
  for (const r of report) console.log("  " + r);
}
for (const w of envWarnings) console.log("  warning: " + w);
if (envErrors.length > 0) {
  if (isProd) {
    console.log("launch-check: PRODUCTION environment errors:");
    for (const e of envErrors) console.log("  ERROR: " + e);
    process.exit(1);
  }
  for (const e of envErrors) console.log("  warning (would fail in production): " + e);
}
process.exit(total > 0 ? 1 : 0);
