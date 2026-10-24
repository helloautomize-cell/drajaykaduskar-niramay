// Cluster link matrix for the live Health Library (origin/main frontmatter).
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { parse } from "yaml";
const SRC = process.env.SRC; // extracted origin/main tree
const crawl = JSON.parse(readFileSync(new URL("./live-crawl.json", import.meta.url), "utf8"));
const byUrl = new Map(crawl.map((p) => [p.url, p]));
const dir = path.join(SRC, "resources/content/blog");
const posts = readdirSync(dir).filter((f) => f.endsWith(".md") && !f.startsWith("_")).map((f) => {
  const raw = readFileSync(path.join(dir, f), "utf8");
  const fm = parse(raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)[1]);
  return { file: `resources/content/blog/${f}`, ...fm };
});
const clusters = {};
for (const p of posts) if (p.cluster) (clusters[p.cluster] ??= { pillar: null, supports: [] })[p.pillar ? "pillar" : "supports"] = p.pillar ? p : [...(clusters[p.cluster]?.supports ?? []), p];
const serviceFor = {
  1: "/diabetes/type-2-diabetes/", 2: "/diabetes/prediabetes-risk-assessment/", 3: "/nutrition-lifestyle-counselling/",
  4: "/obesity/weight-management-medicines/", 5: "/obesity/weight-management-medicines/", 6: "/obesity/",
  7: "/obesity/weight-management-medicines/", 8: "/diabetes/type-2-diabetes/", 9: "/diabetes/diabetes-in-pregnancy/", 10: "/heart-care/",
};
const prose = (p) => p.links.filter((l) => l.zone === "main" && l.inProse).map((l) => l.href.split("#")[0]);
const mainLinks = (p) => p.links.filter((l) => l.zone === "main").map((l) => l.href.split("#")[0]);
const out = [];
for (const [n, c] of Object.entries(clusters).sort((a, b) => a[0] - b[0])) {
  const pil = byUrl.get(c.pillar.url);
  const pp = new Set(prose(pil));
  const row = {
    cluster: +n, pillar: c.pillar.url, pillarTitle: c.pillar.title, supports: c.supports.map((s) => s.url),
    pillarLinksToSupports: c.supports.filter((s) => pp.has(s.url)).length,
    pillarMissing: c.supports.filter((s) => !pp.has(s.url)).map((s) => s.url),
    pillarToService: pp.has(serviceFor[n]), pillarToDoctor: mainLinks(pil).includes("/doctors/dr-ajay-kaduskar/"),
    supportRows: [],
  };
  for (const s of c.supports) {
    const sp = byUrl.get(s.url);
    const pr = prose(sp);
    const body = sp.paras.join(" ");
    const idxPillarInText = pr.indexOf(c.pillar.url);
    const sib = c.supports.filter((x) => x.url !== s.url && pr.includes(x.url)).length;
    row.supportRows.push({
      url: s.url, toPillar: pr.includes(c.pillar.url), pillarLinkRank: idxPillarInText, siblings: sib,
      toService: pr.includes(serviceFor[n]) || mainLinks(sp).includes(serviceFor[n]), toDoctor: mainLinks(sp).includes("/doctors/dr-ajay-kaduskar/"),
      words: body.split(/\s+/).length,
    });
  }
  out.push(row);
}
writeFileSync(new URL("./clusters.json", import.meta.url), JSON.stringify({ out, unclustered: posts.filter((p) => !p.cluster).map((p) => p.url) }, null, 1));
for (const r of out) {
  console.log(`C${r.cluster} ${r.pillar} supports=${r.supports.length} pillar->supports(body)=${r.pillarLinksToSupports} missing=${r.pillarMissing.join(",")} ->service=${r.pillarToService} ->doctor=${r.pillarToDoctor}`);
  for (const s of r.supportRows) console.log(`   ${s.url} ->pillar=${s.toPillar}(rank ${s.pillarLinkRank}) siblings=${s.siblings} ->service=${s.toService} ->doctor=${s.toDoctor} words=${s.words}`);
}
console.log("unclustered:", posts.filter((p) => !p.cluster).map((p) => p.url));
