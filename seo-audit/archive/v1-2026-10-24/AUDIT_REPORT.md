# SEO / AEO / GEO Audit — Niramay Clinics

**Date:** 24 Oct 2026 · **Scope:** full site (52 URLs) · **Mode:** read-only investigation
**Method:** production build served locally (`npm run build` → `next start` on :3020, `SITE_INDEXABLE=true`), every sitemap URL crawled with plain HTTP, JSON-LD parsed and validated, all 48 content files read, rendered HTML diffed against markdown source. No source files were modified.

---

## Executive summary

This is an unusually well-engineered pre-launch build: fully static rendering, a single clean JSON-LD `@graph` per page, real NAP everywhere, generated `llms.txt`/`llms-full.txt`, consent-gated analytics, honest medical copy with zero AI-vocabulary hits. The foundations are strong.

The problems are concentrated in three places. **(1) Launch risk:** indexability (`SITE_INDEXABLE`) is baked at *build* time — verified: this build serves `Disallow: /` and `noindex` on every page even when the runtime flag says indexable. If Vercel's build env misses the flag, the site launches invisible. **(2) E-E-A-T/YMYL:** every service page renders "Last reviewed:" **blank**, every legal page renders "Last updated:" **blank**, there is not a single external citation on the site, and both doctors' council registration numbers are still pending. **(3) Topical architecture:** the site has ~zero contextual body links — all interlinking is nav/footer/widgets, and three hub "Explore" lists are dead text. FAQs and cost information are missing on many service pages.

**Overall score: 71 / 100**

| Area | Score |
|---|---|
| Technical | 78 |
| Crawl & AI-bot access | 86 |
| Schema | 82 |
| E-E-A-T / YMYL | 60 |
| Entities & semantics | 72 |
| Keywords | 86 |
| Cluster linking | 35 |
| FAQs | 55 |
| Content humanness | 90 |
| AEO / GEO readiness | 66 |

## Top 10 most damaging issues

1. **TECH-001 (P0)** — Indexability baked at build time: `robots.ts` and the `noindex` meta are prerendered; runtime `SITE_INDEXABLE` cannot change them. Launch-verify or the whole YMYL site ships invisible.
2. **LINK-001 (P1)** — Zero contextual body links site-wide; "Explore" lists on /diabetes/, /heart-care/, /obesity/ are plain unlinked text.
3. **EEAT-002 (P1)** — "Last reviewed:" renders **empty** on ~30 service pages (ReviewerBox never gets a date) while schema claims a date.
4. **EEAT-003 (P1)** — "Last updated:" renders **empty** on all 7 legal/trust pages (`legalLastUpdated` defined but never passed).
5. **EEAT-001 (P1)** — Medical council registration numbers missing for both doctors (PENDING in source). *Needs client input.*
6. **EEAT-004 (P1)** — Zero external citations site-wide; named studies (ICMR-INDIAB, IAP) unlinked. Nothing for AI engines to cite.
7. **CONTENT-001 (P1)** — No fee/cost (₹) information anywhere — the top commercial patient question is unanswered. *Needs client input.*
8. **SCH-001 (P1)** — Dr. Prajakta's Physician schema omits her credentials (visible on the page); both doctors lack `identifier`/`sameAs`. *Partly client input.*
9. **FAQ-001 (P1)** — 9 indexable service pages have no FAQ; 10 more have under 4 questions.
10. **EEAT-005 (P1)** — AI-generated doctor portraits used as hero/schema imagery on YMYL pages (client-approved per code comment — keep documented, prefer real photos for identity surfaces). *Client decision.*

## The 45-point checklist

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | robots.txt exists, 200, text/plain, doesn't block assets | **PARTIAL** | Served text/plain ✓; but output is build-time static — currently `Disallow: /` until a build with SITE_INDEXABLE=true ships (TECH-001) |
| 2 | AI crawlers explicitly allowed | **PARTIAL** | 10 bots named in app/robots.ts (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, Applebot-Extended…); Claude-User, Perplexity-User, Applebot, CCBot, Meta-ExternalAgent pass only via `*` (TECH-011) |
| 3 | No WAF/bot challenge for AI crawlers | **PASS (local)** | All 11 test UAs → 200 on / ; Vercel Firewall/Cloudflare rules can't be seen until deploy — re-verify on the domain |
| 4 | sitemap.xml correct | **PARTIAL** | Present, referenced in robots, absolute URLs, real git lastmod ✓; contains bare-domain `https://www.niramayclinics.com` (no slash) from 404.md's empty url (TECH-002) |
| 5 | /llms.txt | **PASS** | Plus /llms-full.txt, both generated from real content with doctors, NAP, page map |
| 6 | No stray noindex | **PARTIAL** | Deliberate pre-launch noindex everywhere; flag is build-time baked (TECH-001) |
| 7 | Previews noindex / production indexable | **PASS** | proxy.ts sets `X-Robots-Tag: noindex,nofollow` unless SITE_INDEXABLE=true; SITE_PASSWORD basic-auth for previews |
| 8 | metadataBase + absolute self-referencing canonicals | **PASS** | Verified on every crawled URL (e.g. `/diabetes/` → canonical `https://www.niramayclinics.com/diabetes/`) |
| 9 | One host version, consistent trailing-slash | **PASS** | `trailingSlash:true`; slash-less → 308 (verified). www/https split is a Vercel-domain setting — verify at launch |
| 10 | Redirects: no chains/loops, permanent for moves | **FAIL** | `/videos` →308→ `/videos/` →307→ `/` (2 hops); same for ~85 slash-less legacy URLs; `/videos` and `/contact/thank-you` are temporary 307 (TECH-003) |
| 11 | Real 404s | **PASS** | `/nonexistent-page-xyz/` → 404 + branded not-found |
| 12 | No duplicate content (params/case/paths) | **PARTIAL** | `/contact/?doctor=…` canonicals to `/contact/` ✓; `/DIABETES/` served 200 on Windows (would 404 on Linux host — verify post-launch) |
| 13 | All content in raw server HTML | **PASS** | Body, FAQs (in DOM via `hidden`), bylines, links, JSON-LD all present without JS. Exception: the appointment/workshop **forms** are client-only (TECH-010) |
| 14 | Links are real `<a href>` | **PASS** | next/link throughout; nav/footer/cards all anchors |
| 15 | No iframe/canvas/image-of-text content | **PASS** | YouTube + Maps are click-to-load facades |
| 16 | Unique titles + meta descriptions | **PARTIAL** | All titles unique (36–61 chars); 6 legal pages have **no meta description** (TECH-004); 2 titles at 61 chars (TECH-009) |
| 17 | One H1, logical H2–H3 | **PASS** | Verified — e.g. /diabetes/: h1 → h2 sections → h3 FAQ items, no skips |
| 18 | Clean, descriptive, hierarchical URLs | **PASS** | e.g. `/diabetes/type-2-diabetes/`, `/obesity/body-composition-sarcopenia/` |
| 19 | next/image, dimensions, descriptive alt, LCP priority | **PARTIAL** | next/image + `priority` on heroes ✓; but hero `alt` = page H1, not a photo description (TECH-005) |
| 20 | OG + Twitter cards, absolute 1200×630 | **PARTIAL** | All pages have generated /og/ images + `summary_large_image` ✓; `og:type:article` on non-article pages (TECH-006) |
| 21 | Breadcrumbs visible + matching schema | **PASS** | BreadcrumbList on every page; matches visible crumbs (minor: "Doctors" crumb → /about/) |
| 22 | html lang correct | **PASS** | `lang="en-IN"` |
| 23 | Favicon / apple-touch-icon / manifest | **PARTIAL** | favicon.png, icon.png, apple-icon.png exist; no web manifest |
| 24 | Core Web Vitals | **N/A — not measurable in this env** | Proxy: all pages pre-rendered HTML, hero images `priority`, fonts via next/font, third parties deferred. Run Lighthouse mobile on home + /diabetes/ + a post + a doctor page post-launch |
| 25 | JS bundle / script hygiene | **PASS** | "use client" only on leaf widgets; largest chunk ~450KB lazy; GA4 consent-gated; Turnstile on demand |
| 26 | Mobile: viewport, tap targets, no h-scroll | **PASS** | Viewport present; 48px tap targets on accordions/buttons; Tailwind responsive throughout (visual check at launch) |
| 27 | Accessibility basics | **PARTIAL** | FAQ accordion fully aria-wired, `lang`, focus styles, alt map exists; hero alt text wrong target (19); no skip-link observed |
| 28 | No broken internal/external links | **PASS** | All 52 sitemap URLs → 200; all rendered internal hrefs resolve to known routes |
| 29 | Crawl depth ≤ 3 | **PASS** | Every page ≤ 2 clicks via mega-menu/footer |
| 30 | No orphans (≥2 *contextual* inbound) | **FAIL** | Contextual body inbound ≈ 0 for all pages — everything relies on nav/footer/widgets (LINK-001); /services/ nearly absent from nav (TECH-007); /vaccination/ not linked from its hub (LINK-002) |
| 31 | External links carry right rel attrs | **N/A** | Site has zero external content links (itself a problem — item 43) |
| 32 | HTTPS, HSTS, no mixed content | **PASS** | HSTS `max-age=63072000; includeSubDomains; preload`, tight CSP, no mixed content |
| 33 | Trust pages exist + footer-linked | **PASS** | Privacy, Terms, Medical Disclaimer, Editorial Policy, Patient Rights, Cancellation/Refund, Accessibility — all footer-linked and indexable |
| 34 | Contact page real NAP + map + hours | **PASS** | Full address, landline + mobile + pharmacy numbers, OPD/lab/pharmacy hours, click-to-load Google map, identical NAP in footer + schema + llms.txt |
| 35 | Site-wide @graph with stable @ids | **PASS** | Single `@graph` per page; `#clinic`, `#website`, `#dr-ajay`, `#dr-prajakta`, `#webpage/#condition/#faq/#breadcrumb` — entities cross-reference by @id |
| 36 | Per-template schema completeness | **PARTIAL** | MedicalClinic(+departments, hours, geo, areaServed), Physician, MedicalWebPage, MedicalCondition, MedicalTest, BlogPosting, FAQPage, BreadcrumbList, VideoObject, ProfilePage all present. Gaps: no WebPage node on legal/editorial pages; Prajakta's node thin; no `identifier`/`sameAs` (SCH-001, SCH-002) |
| 37 | Schema matches visible content | **FAIL** | `lastReviewed` in MedicalWebPage while the visible "Last reviewed:" is blank (EEAT-002); FAQ schema generated from same data as visible FAQs — verified identical counts/text (/faqs/: 25=25) |
| 38 | No duplicate/conflicting/invalid schema | **PASS** | One block per page, parses clean on all 52 URLs, ISO dates, absolute URLs, no AggregateRating/Review self-praise |
| 39 | Schema from real data | **PASS** | From site-config/doctors/content sources; GBP sameAs omitted until supplied (correct, not faked) |
| 40 | Doctor pages: photo, quals, reg no., affiliations, articles | **PARTIAL** | Strong profiles (quals, experience, languages, memberships, article lists). Missing: **MMC registration numbers** (pending), external profile sameAs; hero/avatar photos are AI-generated (EEAT-001, EEAT-005) |
| 41 | Byline + reviewer + dates above the fold | **PARTIAL** | Blog posts: author chip + Published/Updated up top + ReviewerBox ✓. Service pages: bottom-only box, "Written by content team", blank Last reviewed (EEAT-002, EEAT-006) |
| 42 | Trust pages complete + linked site-wide | **PASS** | All expected pages exist incl. Editorial & Medical Review Policy, Patient Rights, Accessibility |
| 43 | Claims cited to authoritative sources | **FAIL** | 0 external links; stats named ("ICMR-INDIAB, 101M, 2021") but never linked (EEAT-004) |
| 44 | Claims compliance (no cure/guarantee/superlatives) | **PASS** | Careful copy: "remission, not cure", "not a substitute for a consultation", "painless" only factually (ECG). No testimonials/ratings faked |
| 45 | First-hand experience signals | **PARTIAL** | India-specific detail (Navratri/Ramzan fasting advice, roti/dal diet planning, OPD/casualty, 108/112) is genuine experience; but no attributed doctor quotes or case examples on service pages (CONTENT-006) |

**Totals: PASS 20 · PARTIAL 16 · FAIL 4 · N/A 2** (items 24, 31 — plus 3 counted PASS-locally)

## Issue list (full detail in audit.json)

### P0 — launch blockers
- **TECH-001** Indexability (robots.txt + meta robots + robots route) is baked at *build* time; runtime flag can't fix a build that lacked it.

### P1 — major ranking/citation impact
- **LINK-001** No contextual body links; dead-text "Explore" lists on 3 hubs.
- **LINK-002** `/vaccination/` not linked from its own hub (`hubSubServices` excludes it).
- **EEAT-001** No MMC registration numbers for either doctor (page + schema). **[client]**
- **EEAT-002** "Last reviewed:" blank on ~30 service pages; contradicts schema date.
- **EEAT-003** "Last updated:" blank on all 7 legal pages.
- **EEAT-004** Zero citations/sources site-wide.
- **SCH-001** Dr. Prajakta's Physician node missing credentials; both doctors missing `identifier` + `sameAs`. **[client: reg nos, GBP]**
- **EEAT-005** AI-generated doctor portraits on YMYL identity surfaces. **[client decision]**
- **FAQ-001** 9 service pages with 0 FAQs; 10 more with <4.
- **CONTENT-001** No cost/fee (₹) information anywhere. **[client: price list]**

### P2 — moderate
- **TECH-002** Sitemap contains bare-domain URL (no trailing slash) from 404.md.
- **TECH-003** 2-hop redirect chains on slash-less legacy URLs; 2 rules wrongly temporary (307).
- **TECH-004** 6 legal pages missing meta descriptions.
- **CONTENT-002** No "when to see a doctor" safety block on ~9 condition pages.
- **CONTENT-003** Hub pages thin vs pillar model (290–705 body words).
- **EEAT-006** "Content team" byline + bottom-only reviewer box; nothing above the fold.
- **SCH-002** No WebPage/AboutPage/ContactPage nodes on non-service pages; `about` fallback mistypes services as MedicalProcedure.
- **CONTENT-004** Entity gaps: vaccination lacks vaccine names/schedule, obesity lacks bariatric/adolescent scope, diabetes hub lacks neuropathy/CGM.
- **TECH-005** Hero image alt = page H1, not photo description.
- **LINK-004** Blog posts have 1–4 widget-only inbound links; no service page links to a post.
- **CONTENT-006** No first-person doctor voice on service pages. **[client: doctor quotes]**
- **AEO-001** Statistics undated and source-free; nothing for AI engines to cite.

### P3 — polish
- **TECH-006** `og:type:article` site-wide. **TECH-007** `/services/` not in nav/footer. **TECH-008** `public/images/_todo.md` + `alt-text.json` served publicly. **TECH-009** 2 titles at 61 chars. **TECH-010** Contact/workshop forms absent from no-JS HTML. **LINK-003** "Doctors" breadcrumb → /about/. **EEAT-007** Legal pages pending lawyer sign-off; stale _index CONFIRM counts. **[client]** **TECH-011** robots AGENTS list incomplete (harmless — wildcard covers). **TECH-012** Case-sensitivity is Windows-dev artifact — verify live. **CONTENT-005** "Next review due: 12 months later" literal text. **TECH-013** Uniform lastmod (honest, low signal).

## Quick wins (high impact, small effort — all S)

1. Pass `lastReviewed`/`legalLastUpdated` into the two boxes — fixes visibly blank dates on ~37 pages (EEAT-002, EEAT-003).
2. Filter empty `url` in `app/sitemap.ts` (TECH-002).
3. Make `/videos` and `/contact/thank-you` redirects `permanent:true` (TECH-003, half-fix).
4. Convert the three "Explore" text lists to links (LINK-001 partial).
5. Remove the `/vaccination/` exclusion in `hubSubServices()` (LINK-002).
6. Map hero image alts through `alt-text.json` (TECH-005).
7. Write the 6 missing legal meta descriptions (TECH-004).
8. Move `_todo.md`/`alt-text.json` out of `public/` (TECH-008).

## What this site already does right (do not regress)

Full SSG with zero client-only content · single validated `@graph` per page with stable entity @ids · generated llms.txt + llms-full.txt · real NAP consistent across footer/schema/llms · complete WP→Next redirect table · consent-gated GA4 + Turnstile · strong security headers (HSTS, CSP, nosniff) · FAQ schema provably identical to visible text · genuinely human, India-specific, medically careful copy with **zero** AI-vocabulary fingerprints · careful claims compliance (no cure/guarantee/superlative language, emergency safety numbers).

## Verification notes for the fix phase

- Lighthouse was not runnable here; measure LCP/INP/CLS on the deployed preview (home, /diabetes/, one post, one doctor page).
- WAF/CDN bot rules (Vercel Firewall, Cloudflare) are invisible from the repo — test all 11 user agents against the real domain at launch.
- www/non-www and http/https redirects are Vercel-domain settings — verify at launch.
- `SITE_PASSWORD` must be unset on the production deployment.
