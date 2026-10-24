// Builds seo-audit/audit.json and injects generated tables into
// seo-audit/AUDIT_REPORT.md (between <!--GEN:name--> ... <!--/GEN:name--> markers).
import { readFileSync, writeFileSync } from "node:fs";
import { issues } from "./issues.mjs";
const here = (p) => new URL(p, import.meta.url);
const pages = JSON.parse(readFileSync(here("./pages.json"), "utf8"));
const clusters = JSON.parse(readFileSync(here("./clusters.json"), "utf8"));
const ai = JSON.parse(readFileSync(here("./ai-likeness.json"), "utf8"));
const scores = JSON.parse(readFileSync(here("./scores.json"), "utf8"));

const order = { P0: 0, P1: 1, P2: 2, P3: 3 };
issues.sort((a, b) => order[a.priority] - order[b.priority]);
writeFileSync(here("../../audit.json"), JSON.stringify({
  site: "https://www.niramayclinics.com",
  audited: "2026-10-24",
  target: { live: "https://www.niramayclinics.com (Vercel, origin/main @ e806bf9)", local_tree: "main @ e806bf9 (pulled 24 Oct 2026, identical to live); v1 uncommitted fixes saved in stash@{0}" },
  method: "Live raw-HTML crawl with JavaScript disabled (Playwright, GPTBot UA) of all 111 sitemap URLs; 14 crawler UAs tested; source read from origin/main; Lighthouse 13.5.0 mobile on 5 URLs.",
  scores,
  counts: Object.fromEntries(["P0", "P1", "P2", "P3"].map((p) => [p, issues.filter((i) => i.priority === p).length])),
  issues,
  pages,
  clusters: clusters.out,
  ai_likeness: ai.map(({ url, score, parts, worst }) => ({ url, score, parts, worst })),
}, null, 2));

const esc = (s) => String(s ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
const issueMd = issues.map((i) => [
  `#### ${i.id} · ${i.priority} · ${i.title}`,
  `- **Area:** ${i.area}`,
  `- **Affected:** ${i.affected.join("; ")}`,
  `- **Files:** ${i.files.map((f) => "`" + f + "`").join(", ")}`,
  `- **Evidence:**\n${i.evidence.map((e) => `  - ${e}`).join("\n")}`,
  `- **Fix:** ${i.fix}`,
  i.local_fix ? `- **Earlier v1 fix (now in stash@{0}, not in the tree):** ${i.local_fix}` : null,
].filter(Boolean).join("\n")).join("\n\n");

const pageMd = [
  "| URL | Type | Cluster | Primary keyword | Byline | Dates | FAQ (avg words) | Schema (beyond Clinic+WebSite) | Links in (prose) | Links out (prose) | Title/Desc len | Words | AI-likeness |",
  "|---|---|---|---|---|---|---|---|---|---|---|---|---|",
  ...pages.sort((a, b) => a.type.localeCompare(b.type) || a.url.localeCompare(b.url)).map((p) =>
    `| ${esc(p.url)} | ${p.type} | ${p.cluster} | ${esc(p.primaryKeyword)} | ${p.byline} | ${p.dates} | ${p.faq}${p.faq ? ` (${p.faqAvgWords})` : ""} | ${esc(p.schema)} | ${p.linksIn} (${p.linksInProse}) | ${p.linksOut} (${p.linksOutProse}) | ${p.titleLen}/${p.descLen} | ${p.words} | ${p.ai ?? "n/a"} |`),
].join("\n");

const short = (u) => u.replace("/health-library/", "");
const clusterMd = [
  "| # | Pillar | Supporting articles (5) | Pillar -> supports in body | Supports -> pillar (early) | Supports -> >=2 siblings | Pillar -> service page in body | Missing links |",
  "|---|---|---|---|---|---|---|---|",
  ...clusters.out.map((c) => {
    const back = c.supportRows.filter((s) => s.toPillar).length;
    const sib = c.supportRows.filter((s) => s.siblings >= 2).length;
    return `| C${c.cluster} | ${short(c.pillar)} | ${c.supports.map(short).join("<br>")} | ${c.pillarLinksToSupports}/5 | ${back}/5 | ${sib}/5 | ${c.pillarToService ? "yes" : "no"} | ${c.pillarToService ? "-" : "pillar <-> matching service page (LINK-002); service page -> pillar"} |`;
  }),
].join("\n");

const aiMd = ai.map((r) => `**${r.score}** · ${r.url} · TitleCase ${r.tc} · one-line paras ${r.oneLiners} · sentence SD ${r.sd} · numbers/100w ${r.numsPer100}\n${r.worst.map((s, i) => `${i + 1}. "${s.replace(/\s+/g, " ").slice(0, 220)}"`).join("\n")}`).join("\n\n");

let md = readFileSync(here("../../AUDIT_REPORT.md"), "utf8");
const inject = (name, body) => {
  const re = new RegExp(`(<!--GEN:${name}-->)[\\s\\S]*?(<!--/GEN:${name}-->)`);
  if (!re.test(md)) throw new Error(`marker ${name} missing`);
  md = md.replace(re, `$1\n${body}\n$2`);
};
inject("issues", issueMd);
inject("pages", pageMd);
inject("clusters", clusterMd);
inject("ai", aiMd);
writeFileSync(here("../../AUDIT_REPORT.md"), md);
console.log("issues", issues.length, JSON.stringify(Object.fromEntries(["P0", "P1", "P2", "P3"].map((p) => [p, issues.filter((i) => i.priority === p).length]))));
