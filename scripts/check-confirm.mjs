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

if (total === 0) {
  console.log("launch-check: no [CONFIRM] markers remain. Ready to launch.");
  process.exit(0);
}
console.log(`launch-check: ${total} unresolved [CONFIRM] marker(s):`);
for (const r of report) console.log("  " + r);
process.exit(1);
