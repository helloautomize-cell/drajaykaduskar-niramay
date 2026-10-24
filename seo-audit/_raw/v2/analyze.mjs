import { readFileSync, writeFileSync } from "node:fs";
const crawl = JSON.parse(readFileSync(new URL(process.env.IN || "./crawl.json", import.meta.url), "utf8"));
const SITE = "https://www.niramayclinics.com";
const rows = [];
const inbound = {};
const issues = { titles: {}, descs: {} };
for (const p of crawl) {
  for (const l of p.links) {
    if (!l.href.startsWith("/") || l.href.startsWith("//")) continue;
    const h = l.href.split("#")[0].split("?")[0];
    (inbound[h] ??= { total: new Set(), prose: new Set() }).total.add(p.url);
    if (l.zone === "main" && l.inProse) inbound[h].prose.add(p.url);
  }
}
for (const p of crawl) {
  const graphs = p.ld.map((s) => { try { return JSON.parse(s); } catch (e) { return { __invalid: String(e) }; } });
  const nodes = graphs.flatMap((g) => g["@graph"] ?? [g]);
  const types = nodes.map((n) => [].concat(n["@type"]).join("+"));
  const h1s = p.headings.filter((h) => h.tag === "h1");
  const levels = p.headings.map((h) => +h.tag[1]);
  let skips = [];
  for (let i = 1; i < levels.length; i++) if (levels[i] - levels[i - 1] > 1) skips.push(`${p.headings[i - 1].tag}>${p.headings[i].tag} "${p.headings[i].text.slice(0, 40)}"`);
  const internalOut = new Set(p.links.filter((l) => l.href.startsWith("/")).map((l) => l.href.split("#")[0]));
  const proseOut = new Set(p.links.filter((l) => l.href.startsWith("/") && l.zone === "main" && l.inProse).map((l) => l.href.split("#")[0]));
  const ext = p.links.filter((l) => /^https?:/.test(l.href) && !l.href.includes("niramayclinics.com"));
  const badAnchors = p.links.filter((l) => /^(click here|read more|learn more|here|more)$/i.test(l.text));
  const imgNoAlt = p.imgs.filter((i) => i.alt === null);
  const imgEmptyAlt = p.imgs.filter((i) => i.alt === "" && i.inMain);
  const imgNoDims = p.imgs.filter((i) => !i.fill && (!i.w || !i.h));
  const imgNotNext = p.imgs.filter((i) => !i.nextImage);
  const words = p.mainText.split(/\s+/).filter(Boolean).length;
  const faqNode = nodes.find((n) => n["@type"] === "FAQPage");
  const faqSchemaQ = faqNode ? faqNode.mainEntity.length : 0;
  let faqMismatch = 0;
  const faqLens = [];
  if (faqNode) {
    for (const qn of faqNode.mainEntity) {
      const vis = p.faqs.find((f) => f.q === qn.name);
      const norm = (s) => (s || "").replace(/\s+/g, " ").trim();
      if (!vis || norm(vis.a) !== norm(qn.acceptedAnswer.text)) faqMismatch++;
      faqLens.push(qn.acceptedAnswer.text.split(/\s+/).length);
    }
  }
  const webpage = nodes.find((n) => /WebPage|AboutPage|ContactPage|CollectionPage|ProfilePage/.test([].concat(n["@type"]).join()));
  const article = nodes.find((n) => n["@type"] === "BlogPosting");
  const ids = nodes.map((n) => n["@id"]).filter(Boolean);
  const dupIds = ids.filter((x, i) => ids.indexOf(x) !== i);
  issues.titles[p.title] = [...(issues.titles[p.title] ?? []), p.url];
  issues.descs[p.description] = [...(issues.descs[p.description] ?? []), p.url];
  rows.push({
    url: p.url,
    status: p.status,
    xRobots: p.xRobots,
    robots: p.robots,
    lang: p.lang,
    title: p.title,
    titleLen: p.title.length,
    desc: p.description,
    descLen: p.description?.length ?? 0,
    canonicalOk: p.canonical === SITE + p.url,
    canonical: p.canonical,
    og: Object.entries(p.og).filter(([, v]) => !v).map(([k]) => k),
    ogType: p.og.type,
    ogUrl: p.og.url,
    twitterMissing: Object.entries(p.twitter).filter(([, v]) => !v).map(([k]) => k),
    h1Count: h1s.length,
    h1: h1s.map((h) => h.text),
    headingSkips: skips,
    h2s: p.headings.filter((h) => h.tag === "h2" && !h.hidden).map((h) => h.text),
    breadcrumb: p.breadcrumb,
    ldScripts: p.ld.length,
    ldInvalid: graphs.filter((g) => g.__invalid).length,
    types,
    dupIds,
    webpageType: webpage ? [].concat(webpage["@type"]).join() : null,
    reviewedBy: webpage?.reviewedBy?.["@id"] ?? article?.reviewedBy?.["@id"] ?? null,
    lastReviewed: webpage?.lastReviewed ?? null,
    articleDates: article ? { pub: article.datePublished, mod: article.dateModified } : null,
    faqVisible: p.faqs.length,
    faqSchemaQ,
    faqMismatch,
    faqAvgWords: faqLens.length ? Math.round(faqLens.reduce((a, b) => a + b, 0) / faqLens.length) : 0,
    faqOutOfRange: faqLens.filter((n) => n < 40 || n > 60).length,
    internalOut: internalOut.size,
    proseOut: [...proseOut],
    inboundTotal: inbound[p.url]?.total.size ?? 0,
    inboundProse: [...(inbound[p.url]?.prose ?? [])],
    externalLinks: ext.map((l) => `${l.href} rel=${l.rel}`),
    badAnchors: badAnchors.map((l) => `${l.text} -> ${l.href}`),
    imgCount: p.imgs.length,
    imgNoAlt: imgNoAlt.map((i) => i.src),
    imgEmptyAltMain: imgEmptyAlt.map((i) => i.src),
    imgNoDims: imgNoDims.map((i) => i.src),
    imgNotNext: imgNotNext.map((i) => i.src),
    words,
    first100: p.mainText.split(/\s+/).slice(0, 110).join(" "),
    hasWrittenBy: p.hasWrittenBy,
    hasReviewedBy: p.hasReviewedBy,
    hasLastReviewed: p.hasLastReviewed,
    hasPublished: p.hasPublished,
    onclick: p.onclickNav,
    httpLinks: p.httpLinks,
    icons: p.icons,
  });
}
// broken internal links
const known = new Set(crawl.map((p) => p.url));
const allInternal = new Set(crawl.flatMap((p) => p.links.filter((l) => l.href.startsWith("/")).map((l) => l.href.split("#")[0].split("?")[0])));
const unknown = [...allInternal].filter((h) => !known.has(h));
const dupTitles = Object.entries(issues.titles).filter(([, v]) => v.length > 1);
const dupDescs = Object.entries(issues.descs).filter(([, v]) => v.length > 1);
writeFileSync(new URL(process.env.AOUT || "./analysis.json", import.meta.url), JSON.stringify({ rows, unknown, dupTitles, dupDescs }, null, 1));
console.log("unknown internal targets:", unknown);
console.log("dup titles:", dupTitles.length, "dup descs:", dupDescs.map(([k, v]) => `${k?.slice(0, 40)} ${v}`));
