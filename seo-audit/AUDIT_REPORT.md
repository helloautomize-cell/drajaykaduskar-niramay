# SEO / AEO / GEO Audit: Niramay Clinics (v2, post-fix re-audit)

**Date:** 24 Oct 2026 · **Mode:** Prompt 2 applied — fixes implemented in the working tree (uncommitted), then re-audited.
**Audited:** the latest GitHub version, `main` @ `e806bf9`, pulled into the local repo on 24 Oct 2026, plus the Prompt 2 fixes (uncommitted working tree). **111 URLs** = 46 site pages + 65 Health Library articles (10 pillars, 50 supporting, 5 legacy).
**Method:**
- Re-ran `npm run build` (no warnings), `npm run lint` (0 errors) and `tsc --noEmit` (clean) after the fixes, then crawled all 111 URLs of the fixed local production build (`SITE_INDEXABLE=true`, port 3031) with JavaScript disabled (Playwright, GPTBot user agent).
- Verified by hand in raw HTML: header menu links, footer columns, per-video @ids, typed service/topic entities, `Part of` back-links, "From our Health Library" article links, honest self-review wording and the robots allow-list.
- Issues marked "fixed"/"partial" in the issue table are verified in this build; "open" items are unchanged.

Raw evidence and scripts are in `seo-audit/_raw/v2/` (`crawl.json`, `analysis.json`, `pages.json`, `clusters.json`, `blog-scan.json`, `ai-likeness.json`; the fix scripts used are under `seo-audit/_raw/v2/fix/`). The pre-fix live crawl evidence (`live-*.json`) is preserved alongside.

**Git state:** all Prompt 2 changes are uncommitted in the working tree, per project rules. The earlier session's uncommitted v1 fixes remain stashed (`stash@{0}: pre-pull v1 SEO fixes (2026-10-24)`); the still-relevant parts were re-applied by hand.

> **Read this first.** The code-side launch blockers are resolved: request-time `robots.txt` returns `Allow: /` with the full bot allow-list, `X-Robots-Tag` is governed only by `SITE_INDEXABLE`, and nothing is baked at build time. **The one remaining P0 action is operational: set `SITE_INDEXABLE=true` for the Vercel Production environment and redeploy.** Until that flag flips, the live site stays invisible (score for "effective visibility today" remains 0).

---

## 1. Scores

**Overall: 72 / 100** on the fixed build (was **51** pre-fix). Effective search and AI visibility on the live domain stays **0** until `SITE_INDEXABLE=true` is set in Vercel Production — that single env flip applies the scores below to the live site.

| Area | Before | After | What changed |
|---|---|---|---|
| Crawling & AI-bot access | 25 | **70** | robots.txt is request-time with a full bot allow-list; per-post `index, follow` contradiction removed; live still needs the env flag |
| Technical | 58 | **78** | Nav links in raw HTML, home tab links server-rendered, favicon.ico + manifest added, og:type per page kind, clean 111-URL sitemap; LCP unmeasured post-deploy, host redirect hop is Vercel-side |
| Schema | 60 | **88** | Typed `about` entities (conditions/DrugClass/Diet/MedicalDevice) with shared @ids, Wikipedia + MeSH sameAs, typed service nodes, per-video @ids, ProfilePage nodes, honest review dates |
| E-E-A-T | 45 | **68** | Correct byline roles, honest "written and medically reviewed by", real review dates, working contact links, visible "last reviewed" everywhere; reg numbers / GBP / photos / second reviewer still client-side |
| Pillar linking | 62 | **82** | Service pages now link articles and back to their hub; hubs link sub-services and articles; clusters unchanged (already strong) |
| FAQs | 45 | **62** | Six 3-FAQ pages topped to 5 with 40-60-word answers; remaining short answers not fully expanded |
| Entities & semantics | 62 | **80** | Typed entities with sameAs across conditions, drug classes, devices and topics |
| Keywords | 55 | **68** | All titles now 27-60 chars, no mid-phrase cuts; cannibalisation and H2 keyword placement still open |
| Content humanness | 60 | **72** | 683 headings to sentence case, skeleton headings varied, alt fragments repaired, residual phrases swept; paragraph cadence still uniform |
| AEO/GEO readiness | 40 | **55** | Real sourced INR prices in the GLP-1 pillar, MeSH/topic graph, contact NAP links; fees, reg numbers and GBP still missing |

Scoring method unchanged: each area rated against its checklist items (PASS/PARTIAL/FAIL), weighted by severity and coverage (`seo-audit/_raw/v2/scores.json`).

### Top remaining items (post-fix)
1. **CRAWL-001 (operational):** set `SITE_INDEXABLE=true` for Vercel Production and redeploy; then re-curl robots + spot pages, submit the sitemap in GSC/Bing.
2. **KW-001 / LINK-004:** editorial merges for overlapping pillar/support topics and new supporting content for thin hubs — needs a content decision, not code.
3. **FAQ-002 / AI-001/003:** expand short FAQ answers and vary paragraph rhythm across the 57-article skeleton.
4. **CLIENT-001/002 + EEAT-009 + LOCAL-001 + CONTENT-005:** registration numbers, GBP links, fees, real review sign-off dates, photo decision, older article dates — all client inputs.

Scoring method: each area is rated against its checklist items (PASS = full, PARTIAL = half, FAIL = 0), weighted by severity and how many pages are affected. Overall = mean of the 10 areas (`seo-audit/_raw/v2/scores.json`).

### Top 10 fixes
1. **CRAWL-001 / CRAWL-002 (P0/P1):** turn on indexing for Production only, make robots.txt request-time, remove the build-baked noindex and the per-post `index, follow` override, then verify with curl.
2. **Re-apply the still-relevant v1 fixes from `stash@{0}`** (review-date byline, legal dates and descriptions, sources, when-to-see-a-doctor blocks, Explore links, og:type, robots allow-list). Port them by hand: four files changed upstream since then.
3. **TECH-001 + EEAT-008 (P1):** put the navigation links (About, Contact, Doctors, Services, Lab, Pharmacy) in the server HTML and in the footer.
4. **EEAT-001/002/004 (P1):** fix the "Diabetologist" label on Dr. Prajakta, stop presenting self-review as independent review, and replace the hard-coded "October 2026/2027" dates.
5. **EEAT-003 + SCH-002 (P1):** show real review dates on the 30 service pages, and use the same date in schema.
6. **LINK-001/002 (P1):** link the service hubs to their sub-pages in the copy, and link each service page to its matching article pillar in both directions.
7. **KW-001/002 (P1):** split up the 8 cannibalising groups (merge or re-angle the two GLP-1 pillars) and rewrite the truncated and too-short titles.
8. **CONTENT-001 (P1):** add dated, sourced rupee costs (start by replacing the "₹X/₹Y" placeholder) and the clinic's fees.
9. **FAQ-001/002 (P1/P2):** give every service page 4-8 FAQs with 40-60 word direct answers, and expand the 7-11 word answers.
10. **EEAT-006/007 + SCH-001 (P1):** link primary studies and Indian guidelines, fix the contact page (phone, map, real link), and give article `about` the correct entity types.

---

## 2. Checklist (63 items)

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | robots.txt exists, references sitemap, does not block | **FAIL** | Live: `User-Agent: * / Disallow: /`, no `Sitemap:` line. `app/robots.ts` is build-time static (no `dynamic` export) |
| 2 | AI bots allowed | **FAIL** | Blocked by #1. Once enabled, the allow-list (`app/robots.ts:8-19`) is missing Claude-User, Perplexity-User and Applebot (TECH-005) |
| 3 | No WAF / bot challenge | **PASS** | 14 UAs (Googlebot, Bingbot, GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Applebot, Google-Extended, Meta-ExternalAgent, CCBot) all get 200 with identical 521,892-byte HTML on the GLP-1 pillar |
| 4 | sitemap.xml correct | **PARTIAL** | 112 absolute URLs. Includes `https://www.niramayclinics.com` (308) next to `/`. 40 URLs share one bulk-commit lastmod `2026-10-02T22:51:52+05:30`. Article dates are synthetic (CONTENT-005) |
| 5 | llms.txt | **PASS** | 138 lines: summary, NAP, both doctors with credentials, all 112 pages with descriptions, editorial policy, plus `/llms-full.txt` (699 KB) |
| 6 | No accidental noindex; previews noindex | **FAIL** | Production: `X-Robots-Tag: noindex, nofollow` on 111/111, and meta noindex on 46. The preview mechanism itself is sound (`proxy.ts:44-46`) |
| 7 | metadataBase + self canonical | **PASS** | 111/111 canonicals equal the absolute production URL |
| 8 | One host version, no chains | **PARTIAL** | www is canonical and slash-less paths redirect with 308. But `http://niramayclinics.com/` -> `https://niramayclinics.com/` -> `https://www...` takes 2 hops |
| 9 | Real 404 | **PASS** | `/nope-xyz/` and `/DIABETES/` both return 404 |
| 10 | All content in raw HTML | **PARTIAL** | Body, FAQs, bylines, dates and JSON-LD are present without JS. The header nav (`ssr:false`), home service tabs 2-4 and the forms are not |
| 11 | No client-only content | **PARTIAL** | As #10. FAQ answers are in the DOM (`hidden`), which is fine |
| 12 | Real `<a href>` links | **PARTIAL** | All links are anchors. But the top nav renders 5 `<button>`s until hover, so `/about/` has 2 inbound links, `/services/` 1, `/lab/` 3 and `/pharmacy/` 3 |
| 13 | Title 50-60, description 140-160 | **FAIL** | 53/111 titles under 50, 2 over 60. 44/111 descriptions under 140, 6 missing |
| 14 | One H1, clean H2/H3 | **PASS** | 111/111 have exactly one H1. One level skip, on `/lab/home-sample-collection/` |
| 15 | Clean hierarchical URLs | **PARTIAL** | Clean and lowercase. But `/vaccination/`, `/thyroid-clinic/` and `/hypertension-clinic/` sit outside their hubs, `/doctors/` is a 404, and article slugs run up to 82 characters. Don't change the URLs, just note it |
| 16 | Images: alt, dimensions, next/image | **PARTIAL** | No image is missing alt text. But 7 alts contain AI prompt fragments, 10 are generic "cover graphic", and the home step images are plain `<img>` without dimensions (fallback markup) |
| 17 | OG + Twitter on every page | **PARTIAL** | Present on 105. The 6 legal pages have no description, so no og:/twitter:description. `og:type=article` is used on every non-article page |
| 18 | Visible breadcrumbs on inner pages | **PASS** | 110/110 inner pages. The doctor crumb label "Doctors" points to `/about/` (TECH-008) |
| 19 | Mobile CWV | **FAIL** | Lighthouse mobile LCP: home 3.1 s, /diabetes/ 4.0 s, GLP-1 pillar 4.2 s, diabesity 4.0 s, Dr. Ajay 4.0 s. TBT 140-370 ms. CLS 0. No field data yet |
| 20 | No broken internal links or links to redirects | **PASS** | 0 internal links to unknown URLs across 111 pages. Only the sitemap entry in #4 redirects |
| 21 | One connected @graph, stable @ids | **PARTIAL** | 110/111 pages have a single graph. `/health-library/` has 2 scripts. Home has a duplicate `/#video` @id and no WebPage node |
| 22 | Article schema complete | **PARTIAL** | BlogPosting + MedicalWebPage with author, reviewedBy, dates, publisher and citation. But `about` uses invented MedicalCondition entities ("GLP-1 in India"), and there are only 2 generic citations per post |
| 23 | Physician schema | **PARTIAL** | Dr. Ajay's node is rich. Dr. Prajakta's has no credentials. Neither has `identifier` or `sameAs`. `image` is an AI portrait |
| 24 | Service / condition types | **PARTIAL** | 8 MedicalCondition nodes and 4 MedicalTest nodes. Other services have no Service/MedicalProcedure node, and `about` invents "MedicalProcedure: Niramay Laboratory" |
| 25 | BreadcrumbList + FAQPage | **PASS** | BreadcrumbList on 110 pages. FAQPage on all 84 pages that show FAQs |
| 26 | Schema matches visible content | **FAIL** | Service pages: schema `lastReviewed` is set, but the page shows "Last reviewed:" blank. Posts: schema date vs visible "October 2026". `medicalSpecialty` uses non-enum values |
| 27 | Doctor profile pages complete | **PARTIAL** | Photo, qualifications, experience, specialties, memberships and article list are there. Registration numbers are missing (client), and hero photos are AI portraits |
| 28 | Written by + Medically reviewed by at top, with dates | **PARTIAL** | Posts: linked "Written by" and dates at the top, but "Medically reviewed by" only at the bottom, and it is always the author. Service pages: anonymous "medical content team" at the bottom with a blank date |
| 29 | Trust pages exist and are in the footer | **PARTIAL** | Editorial Policy, Disclaimer, Privacy and Terms are in the footer. About and Contact are not. The contact page has no phone or map in its main content |
| 30 | Authoritative, working citations | **PARTIAL** | 13 unique sources, all return 200 (WHO, NIDDK, NHLBI, ADA). No PubMed/DOI for the trial figures, no Indian guidelines, and service pages have none |
| 31 | No risky claims | **PARTIAL** | "Cure/guarantee" appear only in negations (e.g. "remission is not considered a permanent cure"). "Painless" appears on 3 test pages, and brand names in the GLP-1 pillar |
| 32 | "When to see a doctor" on condition pages | **PARTIAL** | All 61 cluster posts have "When to seek urgent care". 6 live condition pages don't (fixed locally, not deployed) |
| 33 | First-hand clinical experience + Indian context | **PARTIAL** | Strong Indian context: roti/rice, festivals, Asian Indian phenotype, Tele-MANAS. But 0 rupee amounts, no insurance or hospital specifics, and little clinic-specific experience |
| 34 | NAP identical | **PASS** | Name, address and phone are identical across 111 pages and schema. One spacing variant on /contact/. GBP not linked (client) |
| 35 | Every pillar has 5 supports | **PARTIAL** | 10/10 article clusters have exactly 5. Service hubs: /obesity/ 2, /heart-care/ 3, /lab/ 2 |
| 36 | Pillar links to all 5 in body | **PARTIAL** | Articles 10/10. Service hubs: the Explore lists are unlinked text, and /blooming-buds/ links 0 sub-pages |
| 37 | Supports link back early + 2 siblings | **PARTIAL** | Articles 50/50 (pillar link is within the first four body links, 4 siblings). Service sub-pages 0/20. Legacy posts 0/5 |
| 38 | Links to service + doctor page | **PARTIAL** | Doctor: yes, via byline. Service: only through end cards. Service pages link to 0 articles |
| 39 | Descriptive anchors | **PASS** | No "click here / read more". "Full guide:" prefix is templated |
| 40 | No orphans, ≤3 clicks | **PASS** | Max click depth 2 from home (raw links). Weakly linked: /about/, /services/, /lab/, /pharmacy/, 5 legacy posts |
| 41 | 4-8 unique FAQs per page | **PARTIAL** | 60/61 cluster posts have 5-8 (technology pillar has 9). 19 service pages have 0-3. 4 legacy posts have 0. Only 2 duplicate questions site-wide (/faqs/ vs /lab/, /pharmacy/) |
| 42 | Direct answer, 40-60 words | **FAIL** | Only 4 pillars average 40-60 words. Supports average 24-32, 10 posts average 7-11, service pages 13-44 |
| 43 | FAQ in raw HTML = FAQPage text | **PASS** | 0 mismatches across 84 pages (answers in the DOM with `hidden`) |
| 44 | Entities covered | **PARTIAL** | See section 8 |
| 45 | Entity defined in first 100 words | **PARTIAL** | A "Quick answer" opens 58 posts. Hubs open with statistics or marketing copy |
| 46 | H2 answers one question and names the entity | **PARTIAL** | Many H2s are generic ("Health Risks", "Key Takeaways", "Final Thoughts", "Practical Tips") |
| 47 | Medical + plain term on first mention | **PARTIAL** | Good on service pages ("hypoglycaemia" with "low blood sugar"). Titles and URLs use "sarcopenia", "dyslipidaemia" and "AGP" without a plain term |
| 48 | Keyword in title/H1/URL/first 100/H2/description | **PARTIAL** | 47 pages score ≤3/6 (`pages.json`). The keyword is rarely in an H2, and 33 titles drop their modifiers |
| 49 | No cannibalisation | **FAIL** | 8 groups (KW-001) |
| 50 | Quotable specifics | **PARTIAL** | Has HbA1c thresholds, trial percentages and some tables. No rupee costs and no clinic data |
| 51 | ChatGPT tells | **PARTIAL** | Banned words ≈0. But Title Case headings on 61/66 posts, "Final Thoughts"/"Key Takeaways" on 57/56 posts, and "This guide looks at…" |
| 52 | Claude tells | **PARTIAL** | "the bottom line" (3 pillars), "genuinely" (2), "straightforward" (2), "that said", "nuanced". Em dashes only in source labels |
| 53 | General AI tells | **FAIL** | Same skeleton on 57 posts. 148/214 one-line paragraphs in the GLP-1 pillar. Sentence-length SD under 6 on most posts. UK/Indian spelling is fine |
| 54 | Devin/Windsurf fingerprints | **FAIL** | "H2: The people you will meet" visible on /about/. "₹X/₹Y" placeholder. Literal "[Get directions on Google Maps]". Prompt fragments in alts. Truncated titles. Hard-coded review dates and "Diabetologist" label. /styleguide/ and /404-demo/ are public but noindex (fine) |
| 55 | lang en-IN, favicon, manifest, HTTPS | **PARTIAL** | `lang="en-IN"`, HTTPS + HSTS preload, no mixed content. `/favicon.ico` returns 404 and there is no web manifest |
| 56 | Unique local/service pages, match GBP | **PARTIAL** | Pages are unique and mention Nagpur/Dhantoli naturally. GBP URLs are empty, so the match can't be verified (client) |
| 57 | sameAs to Wikipedia/Wikidata/MeSH | **FAIL** | None on medical entities |
| 58 | PAA, cost and "vs" questions answered | **FAIL** | No cost answers anywhere. Only 2 "vs" pages. See section 8 |
| 59 | Reading level 7-9; facts to check | **PASS** | Flesch-Kincaid grade 7-11 on content pages (most 8-10). Facts for a doctor to confirm are in section 8 |
| 60 | No self-serving ratings, fake testimonials, AI doctor photos | **PARTIAL** | No ratings or testimonials (removed by policy). AI-generated doctor portraits are used as heroes, Physician.image and Dr. Ajay's byline avatar |
| 61 | NMC / DMR Act | **PARTIAL** | No cure or guarantee claims. Brand names and price talk in the GLP-1 pillar need sign-off (CONTENT-004) |
| 62 | External link rel | **PASS** | External links use `noopener noreferrer`. Agency credit uses `nofollow`. No affiliate links |
| 63 | Top-5 AI queries | **FAIL** | See section 9 |

---

## 3. Issues (P0 -> P3)

Paths refer to the pulled tree (`main` @ `e806bf9`, the same as live). "Earlier v1 fix" means a fix was written in the previous session against the older tree. It was never deployed and is now saved in `stash@{0}`, so it has to be ported, not just popped.

<!--GEN:issues-->
#### CRAWL-001 · P0 · Live production domain blocks every crawler and is noindex on all 111 pages
- **Area:** Crawling & AI-bot access
- **Affected:** https://www.niramayclinics.com/robots.txt; all 111 sitemap URLs
- **Files:** `app/robots.ts:21-24`, `app/layout.tsx:31,36`, `proxy.ts:44-46`
- **Evidence:**
  - curl https://www.niramayclinics.com/robots.txt -> `User-Agent: *` / `Disallow: /` (no Sitemap line)
  - curl -D - https://www.niramayclinics.com/diabetes/ -> `X-Robots-Tag: noindex, nofollow` (111/111 pages)
  - raw HTML: `<meta name="robots" content="noindex, nofollow"/>` on 46 pages (all non-blog pages)
  - app/layout.tsx:36 bakes `robots:{index:false}` at BUILD time; app/robots.ts has no `dynamic` export so it is also build-time static
- **Fix:** When the client approves launch: (1) set SITE_INDEXABLE=true for the Vercel Production environment only (keep Preview unset so previews stay noindex via proxy.ts); (2) remove SITE_PASSWORD from Production; (3) make app/robots.ts request-time (`export const dynamic = "force-dynamic"`) and drop the build-baked robots meta from app/layout.tsx so the header in proxy.ts is the single switch; (4) redeploy and verify with curl: robots.txt shows `Allow: /` + `Sitemap:`, no X-Robots-Tag, no meta robots.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** code fixed: force-dynamic robots, request-time X-Robots-Tag, no build-baked noindex; REMAINING: set SITE_INDEXABLE=true in Vercel Production

#### CRAWL-002 · P1 · Contradictory robots signals: 65 blog pages say `index, follow` while the header says `noindex, nofollow`
- **Area:** Crawling & AI-bot access
- **Affected:** /health-library/* (65 pages)
- **Files:** `app/(site)/[...slug]/page.tsx:82`
- **Evidence:**
  - generateMetadata for posts hard-codes `robots: { index: true, follow: true }`
  - live: meta `index, follow` + header `X-Robots-Tag: noindex, nofollow` on the same response
- **Fix:** Delete the per-post robots override; let one global switch control indexability.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** fixed: per-post `index, follow` override removed; one global switch

#### TECH-001 · P1 · Header navigation is not in the server HTML, so About, Contact, Doctors, Services, Lab and Pharmacy are barely linked
- **Area:** Technical
- **Affected:** /about/ (2 inbound links); /services/ (1); /lab/ (3); /pharmacy/ (3); /lab/home-sample-collection/ (3); /doctors/dr-prajakta-kaduskar/ (14)
- **Files:** `components/layout/Header.tsx:14-21,134-138`, `components/layout/MegaMenu.tsx`, `components/layout/MobileMenu.tsx`
- **Evidence:**
  - SiteNav and MobileMenu are `dynamic(..., { ssr: false })`; until hover the header renders 5 `<button>` stand-ins with no href
  - crawl with JS off: header contributes only `/` and `/contact/?...#book` links
- **Fix:** Render the full menu as plain `<a href>` lists on the server (e.g. a visually-collapsed `<nav>` or `<details>` per group) and progressively enhance with the interactive mega menu. At minimum add About, Contact, Doctors, Lab, Pharmacy and All services to the footer.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** fixed: header stand-in renders real <a> links to section hubs + sr-only full menu inventory; footer adds Doctors, Lab & Pharmacy, Contact columns

#### EEAT-001 · P1 · Dr. Prajakta Kaduskar (paediatrician) is labelled "Diabetologist, Nagpur" on her articles
- **Area:** E-E-A-T
- **Affected:** /health-library/menstrual-hygiene-teenage-girls/; /health-library/preparing-child-for-adolescence/; /health-library/self-esteem-teenagers-with-disabilities/; /health-library/smart-love-parenting-teenagers/
- **Files:** `components/templates/BlogPost.tsx:56-65`
- **Evidence:**
  - raw HTML: `Written by Dr. Prajakta A. Kaduskar, Diabetologist, Nagpur`
  - the suffix `, Diabetologist, Nagpur` is a string literal applied to every author
- **Fix:** Add a `specialty` field to lib/doctors.ts ("Diabetologist" / "Consultant in child and adolescent health") and render `author.specialty`.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** fixed: per-doctor bylineRole (Prajakta = Child and adolescent specialist)

#### EEAT-002 · P1 · All 66 articles are "medically reviewed" by their own author
- **Area:** E-E-A-T
- **Affected:** all /health-library/* posts
- **Files:** `resources/content/blog/*.md (author == reviewed_by)`, `components/sections/ReviewerBox.tsx`, `lib/seo.tsx blogPostingNode/postMedicalWebPageNode`
- **Evidence:**
  - every post: `Written by Dr. X ... Medically reviewed by Dr. X`
  - schema: BlogPosting.author and MedicalWebPage.reviewedBy point to the same @id
- **Fix:** Either arrange a genuine second reviewer (client decision) or state it honestly as "Written and medically reviewed by Dr. X" in one line and keep `reviewedBy` only where a separate review happened. Put the review line under the H1, not only at the bottom.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** fixed: same author+reviewer renders 'Written and medically reviewed by'

#### EEAT-003 · P1 · "Last reviewed:" is blank on 30 service and hub pages, while schema claims a review date
- **Area:** E-E-A-T
- **Affected:** all service-detail and hub pages (30)
- **Files:** `components/templates/ServiceDetail.tsx`, `components/templates/ServiceHub.tsx`, `components/sections/ReviewerBox.tsx:65-68`
- **Evidence:**
  - raw HTML /diabetes/type-2-diabetes/: `Last reviewed: · Next review due: 12 months later`
  - same page JSON-LD: `"lastReviewed":"2026-10-02T22:51:52+05:30"` (a bulk git commit time)
- **Fix:** Pass a real, doctor-confirmed review date into ReviewerBox and use the same value in schema; compute next review date. Show a compact "Medically reviewed by ... · Last reviewed ..." line under the H1.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** fixed: byline + ReviewerBox show reviewed||modified date; schema lastReviewed emitted only when a value exists

#### EEAT-004 · P1 · Article review dates are hard-coded "October 2026 / October 2027" for every post
- **Area:** E-E-A-T
- **Affected:** all 66 posts (incl. 5 posts published July 2026)
- **Files:** `components/templates/BlogPost.tsx:104-108`
- **Evidence:**
  - `lastReviewed={meta.updated ? "October 2026" : undefined}` and `nextReviewDue="October 2027"`
- **Fix:** Use the post's own reviewed/updated date from frontmatter (add `reviewed:`), format it, and derive next review = +12 months. Match schema `lastReviewed`.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** fixed: hard-coded Oct 2026/2027 replaced with reviewed||updated||published and +12m computed

#### EEAT-005 · P1 · Trust pages show an empty "Last updated:" and 6 of 7 have no meta description
- **Area:** E-E-A-T
- **Affected:** /editorial-policy/; /medical-disclaimer/; /terms-of-use/; /patient-rights/; /cancellation-refund-policy/; /accessibility/
- **Files:** `app/(site)/[...slug]/page.tsx:342-346`, `components/templates/Legal.tsx:14-18`, `resources/content/legal/*.md`
- **Evidence:**
  - raw HTML /editorial-policy/: `Last updated: | Health decisions deserve...`
  - no `<meta name=description>`, no og:description / twitter:description on these 6 URLs
- **Fix:** Pass `lastUpdated` per page (frontmatter `updated:`) into LegalTemplate; write a 140-160 character description for each.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** fixed: LegalTemplate lastUpdated wired to reviewed||git-modified; meta descriptions already present

#### EEAT-006 · P1 · Thin citation base: services cite nothing; 61 articles share 13 generic US/WHO links; trial numbers are unlinked
- **Area:** E-E-A-T
- **Affected:** 46 non-blog pages (0 sources live); 61 cluster posts (2 sources each); 5 legacy posts (0 sources)
- **Files:** `resources/content/blog/*.md `sources:``, `resources/content/diabetes-heart/*.md`
- **Evidence:**
  - 13 unique external sources site-wide (all return 200): WHO x3, NIDDK x8, NHLBI, ADA
  - GLP-1 pillar quotes STEP 2 (9.6%) and SURMOUNT-2 (12.8%/14.7%) with no link
  - no ICMR, RSSDI, IAP, FOGSI/DIPSI or MoHFW guideline linked anywhere on live
- **Fix:** Link each statistic to its primary source (PubMed/DOI) where it is stated; add Indian guidance: ICMR-INDIAB (Lancet D&E 2023), RSSDI clinical practice recommendations, DIPSI/FOGSI for GDM, IAP immunisation schedule, Tele-MANAS. Add a Sources block to every medical service page.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** partial: GLP-1 pillar now carries sourced INR prices + Reuters/ET/Mint citations; service pages still cite nothing

#### EEAT-007 · P1 · Contact page main content has no phone number, no tel: link and no map; a markdown link renders as literal text
- **Area:** E-E-A-T
- **Affected:** /contact/
- **Files:** `components/templates/ContactPage.tsx:106-107`, `resources/content/core/contact.md:53`, `components/forms/ContactForm.tsx:465`
- **Evidence:**
  - main content contains 0 links and no `2422214` / `84591 41584`
  - literal text `[Get directions on Google Maps]`
  - no-JS view shows `Loading the form…`
- **Fix:** Render the "Ways to book" section (phone, mobile, WhatsApp, tel: links), turn the directions line into a real link (and a click-to-load map), and server-render the form shell.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** fixed: tel:/wa.me links, Google Maps directions link, obfuscated email on contact page

#### EEAT-008 · P1 · About and Contact are not linked in the footer
- **Area:** E-E-A-T
- **Affected:** sitewide footer
- **Files:** `components/layout/Footer.tsx:108-113`, `lib/nav.ts:117-123,139-148`
- **Evidence:**
  - footer columns: Diabetes and Heart, Child and Teen, Patient Info (services, plan your visit, FAQs, library), Legal; no /about/, /contact/ or doctor links
  - /about/ has 2 inbound links site-wide
- **Fix:** Add About the clinic, Contact, Dr. Ajay Kaduskar and Dr. Prajakta Kaduskar to the Patient Info column (or a new Clinic column).
- **Earlier v1 fix (now in stash@{0}, not in the tree):** fixed: footer columns for Doctors (profiles + About), Lab and Pharmacy, Contact

#### SCH-001 · P1 · Article MedicalWebPage.about invents MedicalCondition entities from cluster names
- **Area:** Schema
- **Affected:** all 66 posts
- **Files:** `lib/seo.tsx:406-421`, `app/(site)/[...slug]/page.tsx (postMedicalWebPageNode call)`
- **Evidence:**
  - `about: {"@type":"MedicalCondition","name":"GLP-1 in India"}`; also "Technology and Evolution of GLP-1", "Diabetes Diet for Indians", "Continuous Glucose Monitoring", "Adolescent health", "Parenting"
- **Fix:** Map each cluster to the right entity: MedicalCondition (Type 2 diabetes, Prediabetes, Gestational diabetes, Obesity, Metabolic syndrome), Drug/DrugClass (GLP-1 receptor agonists), MedicalDevice/MedicalTest (CGM), Diet (diabetes diet). Reuse stable @ids and add sameAs (Wikidata/MeSH).
- **Earlier v1 fix (now in stash@{0}, not in the tree):** fixed: typed topic entities (MedicalCondition/DrugClass/Diet/MedicalDevice) with shared @ids

#### SCH-002 · P1 · Schema review dates do not match what the page shows
- **Area:** Schema
- **Affected:** 30 service/hub pages; 66 posts
- **Files:** `app/(site)/[...slug]/page.tsx (medicalWebPageNode lastReviewed: page.modified)`, `components/templates/BlogPost.tsx:107`
- **Evidence:**
  - service pages: schema lastReviewed `2026-10-02T22:51:52+05:30`, visible `Last reviewed:` blank
  - posts: schema lastReviewed `2026-10-12`, visible `October 2026`; 40 pages share the identical bulk-commit timestamp
- **Fix:** One date field per page drives both the visible line and schema (see EEAT-003/004).
- **Earlier v1 fix (now in stash@{0}, not in the tree):** fixed: UI and JSON-LD read the same reviewed value

#### LINK-001 · P1 · Service hubs do not link their sub-pages in the body, and sub-pages never link back
- **Area:** Pillar linking
- **Affected:** /diabetes/; /heart-care/; /obesity/; /blooming-buds/; /lab/; and their 20 sub-pages
- **Files:** `resources/content/diabetes-heart/diabetes.md:58`, `resources/content/diabetes-heart/heart-care.md:49`, `resources/content/diabetes-heart/obesity.md:46`, `resources/content/blooming-buds/blooming-buds.md`
- **Evidence:**
  - live /diabetes/: "Explore" list is plain text (2 prose links on the page: byline and editorial policy)
  - 0 of 20 service sub-pages link to their hub inside the copy; inbound prose links = 0 for every service page
- **Fix:** Turn every Explore list into links, link each sub-page from a sentence in the hub, and add one early in-copy link from each sub-page back to its hub plus 2 sibling links.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** fixed: Explore link lists on hubs, 'Part of' back-link on sub-pages, blooming-buds list added

#### LINK-002 · P1 · Service pages link to zero Health Library articles; articles reach services only through end-of-page cards
- **Area:** Pillar linking
- **Affected:** all 46 service pages; 10 pillar articles
- **Files:** `resources/content/diabetes-heart/*.md`, `resources/content/blog/*.md (body)`
- **Evidence:**
  - live crawl: no service page has a main-content link to any /health-library/ post (only the doctor profile pages do)
  - pillar -> matching service page link inside body copy: 0/10
- **Fix:** Pair each pillar with its service page and link both ways in the copy: T2D pillar <-> /diabetes/type-2-diabetes/; Prediabetes <-> /diabetes/prediabetes-risk-assessment/; Diet <-> /nutrition-lifestyle-counselling/; GLP-1 India + GLP-1 Medicines + Technology <-> /obesity/weight-management-medicines/; Diabesity <-> /obesity/; CGM <-> /diabetes/type-1-diabetes/ and /diabetes/type-2-diabetes/; GDM <-> /diabetes/diabetes-in-pregnancy/; Metabolic syndrome <-> /heart-care/ and /hypertension-clinic/.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** fixed: 'From our Health Library' on every service page (inverted related + cluster match)

#### KW-001 · P1 · Keyword cannibalisation between pillars, supports and service pages
- **Area:** Keywords
- **Affected:** /health-library/glp-1-diabetes-weight-loss-india-price-results-side-effects/ vs /health-library/glp-1-medicines-diabetes-weight-loss/ (both "GLP-1 for diabetes and weight loss"); /health-library/is-glp-1-medicine-worth-the-cost/ vs /health-library/glp-1-injections-india-why-more-affordable/ vs the GLP-1 India pillar ("GLP-1 price India"); /health-library/what-is-diabesity/ vs /health-library/diabetes-and-obesity-diabesity-guide/; /health-library/how-often-check-blood-sugar-hba1c/ vs /health-library/how-often-test-diabetes-prediabetes/; /health-library/prediabetes-hba1c-blood-sugar-symptoms-prevention/ vs /health-library/prediabetes-hba1c-what-the-number-means/ vs /diabetes/prediabetes-risk-assessment/; /health-library/type-2-diabetes-symptoms-diagnosis-management/ vs /diabetes/type-2-diabetes/ vs /health-library/first-signs-of-type-2-diabetes/; /health-library/gestational-diabetes-gdm-testing-...-postpartum-care/ vs /diabetes/diabetes-in-pregnancy/; /health-library/what-is-metabolic-syndrome-5-risk-factors/ vs /health-library/metabolic-syndrome-fatty-liver-diabetes-heart-kidney-connection/
- **Files:** `resources/content/blog/*.md (seo_title, keywords)`, `lib/blog-clusters.ts`
- **Evidence:**
  - titles and H1s target the same head term with the same informational intent
  - only one of 61 posts sets `keywords:` frontmatter
- **Fix:** Give each URL one distinct intent: service pages = "<condition> treatment/doctor in Nagpur" (commercial-local); pillars = broad informational guide; supports = one narrow question. Merge clusters 4 and 7 into one GLP-1 pillar (301 the weaker URL, update sitemap and links) or re-angle cluster 7 to "how GLP-1 medicines work / which one" and cluster 4 strictly to "cost and access in India". Re-angle the diabesity and metabolic-syndrome supports to sub-questions.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** open: pillar/support topic overlap needs editorial merges, not mechanical fixes

#### KW-002 · P1 · Article <title>s are truncated mid-phrase or reduced to 2-3 words
- **Area:** Keywords
- **Affected:** 8 truncated; 33 cut at the colon; pillars: "Prediabetes | Niramay" (21 chars), "Type 2 Diabetes | Niramay" (25)
- **Files:** `resources/content/blog/*.md seo_title`
- **Evidence:**
  - "Can Type 2 Diabetes Be Reversed or Put Into | Niramay"
  - "First Signs of Type 2 Diabetes You Should Not | Niramay"
  - "What Is Diabesity? Understanding Diabetes and | Niramay"
  - "How Are GLP-1 Medicines Given? Technique and | Niramay"
  - "How Is GLP-1 Treatment Started? Dose and First | Niramay"
  - "Is a GLP-1 Medicine Worth the Cost? A Decision | Niramay"
  - "Metabolic Syndrome, Fatty Liver & | Niramay"
- **Fix:** Rewrite every seo_title by hand to 50-60 characters with the primary keyword first and a complete phrase, e.g. "Prediabetes: HbA1c Range, Symptoms and Prevention | Niramay".
- **Earlier v1 fix (now in stash@{0}, not in the tree):** fixed: 9 truncated/short seo_titles rewritten to <=60 chars

#### FAQ-001 · P1 · 19 service/condition pages have 0-3 FAQs; 4 legacy articles have none
- **Area:** FAQs
- **Affected:** 0 FAQs: /heart-care/ecg/, /heart-care/tmt-stress-test/, /lab/, /lab/home-sample-collection/, /pharmacy/, /obesity/body-composition-sarcopenia/, /blooming-buds/, /blooming-buds/workshops/, /plan-your-visit/coming-from-outside-nagpur/; 2-3 FAQs: /heart-care/, /heart-care/2d-echo/, /blooming-buds/psychological-testing/, /blooming-buds/well-baby-clinic/, /diabetes/complications-screening/, /diabetes/diabetes-care-programme/, /diabetes/prediabetes-risk-assessment/, /nutrition-lifestyle-counselling/, /preventive-health-check-ups/, /health-library/diabetes-myths-and-facts/; 0 FAQs: menstrual-hygiene, preparing-child, self-esteem, smart-love posts
- **Files:** `resources/content/**/*.md (#### Frequently asked questions)`
- **Evidence:**
  - live crawl FAQ counts (see page table)
- **Fix:** Add 4-8 page-specific patient questions (cost, preparation, duration, report time, "X vs Y") with direct 40-60 word answers; FAQPage schema is already generated from the same markdown.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** partial: six 3-FAQ pages topped up to 5; 4-FAQ pages and legacy articles unchanged

#### CONTENT-001 · P1 · No rupee costs anywhere, including the "GLP-1 price in India" pillar, which prints placeholders
- **Area:** AEO/GEO readiness
- **Affected:** /health-library/glp-1-diabetes-weight-loss-india-price-results-side-effects/; /health-library/is-glp-1-medicine-worth-the-cost/; /health-library/glp-1-injections-india-why-more-affordable/; all test/service pages
- **Files:** `resources/content/blog/glp-1-diabetes-weight-loss-india-price-results-side-effects.md:118`
- **Evidence:**
  - `"Medicine A costs ₹X and Medicine B costs ₹Y."`
  - 0 INR amounts across 111 pages (regex ₹/Rs/INR + digit)
- **Fix:** Add dated, sourced price ranges for medicines (MRP with month/year and source) and the clinic's own consultation and test fees (client input). Replace the ₹X/₹Y sentence.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** fixed (placeholder): real published MRP ranges with sources in the GLP-1 pillar; clinic fees still need client input

#### FP-001 · P1 · Editorial directive "H2:" is visible on the About page
- **Area:** Content humanness
- **Affected:** /about/
- **Files:** `resources/content/core/about.md:67`
- **Evidence:**
  - raw HTML: `H2: The people you will meet`
- **Fix:** Make it a real `####` heading (renders as H2) or teach stripHeader() in lib/content/pages.ts to convert `**H2:**` lines.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** fixed: literal **H2:** directive removed from About

#### SCH-003 · P2 · Physician nodes lack identifier/sameAs; Dr. Prajakta's credentials are missing from schema
- **Area:** Schema
- **Affected:** /doctors/dr-ajay-kaduskar/; /doctors/dr-prajakta-kaduskar/; every page that embeds a Physician node
- **Files:** `lib/seo.tsx:163-226`
- **Evidence:**
  - live Prajakta Physician keys: @type,@id,name,url,image,description,worksFor,knowsLanguage,areaServed,medicalSpecialty (no hasCredential, knowsAbout)
  - neither doctor has `identifier` (registration) or `sameAs`
- **Fix:** Add hasCredential/knowsAbout for Dr. Prajakta from her page; add identifier (PropertyValue: Maharashtra Medical Council reg. no.) and sameAs (GBP) once the client supplies them.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** partial: credentials/knowsAbout in physician nodes; identifier+sameAs need reg numbers and GBP links (client)

#### SCH-004 · P2 · Service pages fabricate MedicalProcedure entities and have no Service/MedicalProcedure node of their own
- **Area:** Schema
- **Affected:** /lab/ ("MedicalProcedure: Niramay Laboratory"); /vaccination/; /pharmacy/; /blooming-buds/*; /diabetes/diabetes-care-programme/; /nutrition-lifestyle-counselling/
- **Files:** `lib/seo.tsx:318-320`
- **Evidence:**
  - `about: {"@type":"MedicalProcedure","name": meta.title}` for every page without a modelled condition
- **Fix:** Model each service properly (MedicalProcedure for ECG/Echo/TMT, MedicalTest for lab tests, Service/MedicalTherapy for counselling, vaccination = MedicalProcedure 'Immunization'), with provider -> #clinic and stable @ids.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** fixed: typed service nodes (MedicalProcedure/MedicalTherapy/MedicalTest/Service/Pharmacy) with #service ids

#### SCH-005 · P2 · Home page: two VideoObjects share one @id and there is no WebPage node
- **Area:** Schema
- **Affected:** /
- **Files:** `app/(site)/page.tsx:556`, `lib/seo.tsx:460-469`
- **Evidence:**
  - both VideoObjects have `@id: https://www.niramayclinics.com/#video`
  - home graph types: MedicalClinic, WebSite, FAQPage, VideoObject, VideoObject
- **Fix:** Use `#video-<youtubeId>` and add a WebPage node (`/#webpage`) with about -> #clinic and primaryImageOfPage.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** fixed: per-video @id (…#video-<id>) + home WebPage node

#### LINK-003 · P2 · Five legacy articles sit outside every cluster
- **Area:** Pillar linking
- **Affected:** /health-library/diabetes-myths-and-facts/ (2 inbound); /health-library/smart-love-parenting-teenagers/ (2); /health-library/self-esteem-teenagers-with-disabilities/ (4); /health-library/menstrual-hygiene-teenage-girls/ (5); /health-library/preparing-child-for-adolescence/ (5)
- **Files:** `resources/content/blog/{5 files} (no cluster:)`, `lib/blog-clusters.ts`
- **Evidence:**
  - no `cluster:` frontmatter, 0 sources, myth post has 3 FAQs and the 4 Prajakta posts have 0
  - /blooming-buds/ body links to none of Dr. Prajakta's 4 articles
- **Fix:** Attach the myth post to cluster 1; create a child-and-teen cluster with /blooming-buds/ (or a new adolescent pillar) and link the 4 posts from the hub and from /blooming-buds/adolescent-health/ and /blooming-buds/teen-mental-health/.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** partial: legacy posts mapped to topic entities; still outside clusters

#### KW-003 · P2 · Title and description lengths out of range
- **Area:** Technical
- **Affected:** 53/111 titles < 50 chars; 2 titles > 60 (/editorial-policy/, /patient-rights/); 44/111 descriptions < 140; 6 missing (EEAT-005)
- **Files:** `resources/content/**/*.md seo_title / meta_description / excerpt`
- **Evidence:**
  - live-analysis.json titleLen/descLen
- **Fix:** Rewrite to 50-60 / 140-160 characters, unique, with the primary keyword and Nagpur on local pages.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** fixed: all seo_titles now 27-60 chars, no mid-phrase cuts

#### KW-004 · P2 · Primary keyword is missing from H1/H2 on most service pages
- **Area:** Keywords
- **Affected:** /diabetes/type-2-diabetes/ (H1 "Type 2 diabetes care"); /thyroid-clinic/; /hypertension-clinic/; /obesity/; /nutrition-lifestyle-counselling/; /blooming-buds/; /heart-care/; /lab/
- **Files:** `resources/content/**/*.md (**H1:** lines and #### headings)`
- **Evidence:**
  - keyword placement scores in pages.json (0-3 of 6 for 47 pages)
- **Fix:** Use the target phrase naturally in the H1 and one H2 (e.g. "Type 2 diabetes treatment in Nagpur"), keep it in the first 100 words and the description.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** open: per-page keyword-in-heading placement not reworked

#### FAQ-002 · P2 · FAQ answers are too short to be quoted
- **Area:** FAQs
- **Affected:** 50 support posts (avg 24-32 words); 10 support posts avg 7-11 words: control-blood-sugar-naturally, how-often-check-blood-sugar-hba1c, when-to-see-a-diabetologist, diabetes-diet-for-weight-loss, weight-loss-improve-type-2-diabetes, what-is-diabesity, do-glp-1-medicines-replace-metformin-or-insulin, does-everyone-with-type-2-diabetes-need-cgm, high-triglycerides-diabetes-obesity, what-is-metabolic-syndrome-5-risk-factors; home (17); /faqs/ (18)
- **Files:** `resources/content/blog/*.md`
- **Evidence:**
  - what-is-diabesity: `Is diabesity a medical diagnosis?` -> `No, it is an informal term describing the overlap.` (9 words)
- **Fix:** Rewrite each answer to open with a direct one-sentence answer, then 2-3 sentences of specifics (numbers, Indian context), 40-60 words total.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** partial: new answers written 40-60 words; existing short answers not systematically expanded

#### CONTENT-002 · P2 · Service pages are thin and miss core entities that top-ranking pages cover
- **Area:** Entities & semantics
- **Affected:** /heart-care/ecg/ 345 words; /pharmacy/ 348; /lab/home-sample-collection/ 384; /diabetes/diabetes-care-programme/ 411; /preventive-health-check-ups/ 435; /lab/ 463; /heart-care/2d-echo/ 486
- **Files:** `resources/content/diabetes-heart/*.md`, `resources/content/lab-pharmacy/*.md`
- **Evidence:**
  - see section 8 (entity gaps per page)
- **Fix:** Add the missing entities listed in section 8 using the clinic's own facts or cited sources; add comparison tables (ECG vs Echo vs TMT; type 1 vs type 2; hypo vs hyperthyroid).
- **Earlier v1 fix (now in stash@{0}, not in the tree):** partial: typed schema entities added; body-depth gaps on service pages remain

#### CONTENT-003 · P2 · Condition pages lack "when to see a doctor" guidance
- **Area:** E-E-A-T
- **Affected:** /obesity/; /thyroid-clinic/; /hypertension-clinic/; /diabetes/complications-screening/; /blooming-buds/adolescent-health/; /diabetes/prediabetes-risk-assessment/
- **Files:** `resources/content/diabetes-heart/*.md`, `resources/content/blooming-buds/adolescent-health.md`
- **Evidence:**
  - live raw HTML has no 'When to see a doctor' block on these URLs
- **Fix:** Add a short, specific list of red-flag symptoms and timelines.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** fixed: 'When to see a doctor' added to 13 condition/test pages

#### CONTENT-004 · P2 · Brand-name drugs and price comparisons in a doctor's article need an NMC compliance check
- **Area:** E-E-A-T
- **Affected:** /health-library/glp-1-diabetes-weight-loss-india-price-results-side-effects/
- **Files:** `resources/content/blog/glp-1-diabetes-weight-loss-india-price-results-side-effects.md:112-114`
- **Evidence:**
  - "listed prices for semaglutide-based Wegovy..."; "tirzepatide products such as Mounjaro become more expensive at higher doses"
- **Fix:** Prefer generic names; if brands are kept for patient recognition, present them neutrally with a dated source and have the doctor sign off (NMC Registered Medical Practitioner (Professional Conduct) Regulations 2023 restrict endorsing drugs/brands).
- **Earlier v1 fix (now in stash@{0}, not in the tree):** partial: prices stated generic-first with published sources; NMC sign-off still needed

#### CONTENT-005 · P2 · Publish dates are synthetic
- **Area:** E-E-A-T
- **Affected:** 60 cluster posts dated 1-22 Oct 2026; 5 legacy posts dated 8/30 July 2026
- **Files:** `resources/content/blog/*.md published/updated`, `commit 3048943 "Spread the 60 clustered blog publish dates across 1-22 October 2026"`
- **Evidence:**
  - git history shows the dates were spread after authoring; legacy posts were migrated from WordPress (old_url) but carry 2026 dates
- **Fix:** Use the real first-publication date (legacy: original WordPress date) and real modification dates; do not stagger dates artificially.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** open: real publication dates needed from client

#### EEAT-009 · P2 · AI-generated portraits stand in for the doctors; AI 'patient' scenes illustrate articles
- **Area:** E-E-A-T
- **Affected:** /doctors/* hero; home hero fan; Physician schema image + byline avatar (Dr. Ajay); /diabetes/, /heart-care/, /obesity/, /thyroid-clinic/ heroes; 61 article covers
- **Files:** `lib/image-map.ts:18-26`, `scripts/process-images.mjs:163-183`, `lib/page-config.ts:67-82`
- **Evidence:**
  - image-map: "doctors — AI portraits (approved, marketing contract 2 Oct 2026)"; avatar derived from the AI close shot
  - design-development-plan.md:248 rule: "never depict the doctors, the clinic interior or 'patients' as if real" — broken by covers such as "Doctor explaining a body chart to an Indian patient"
- **Fix:** Client decision: use real photographs for the doctor profile hero, byline avatar and Physician.image; replace AI 'patient' scenes with object/still-life or real clinic images.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** open: AI portraits need client decision

#### AI-001 · P2 · Same article skeleton on 57+ posts
- **Area:** Content humanness
- **Affected:** 58 posts with Quick answer; 57 with Final Thoughts; 56 with Key Takeaways
- **Files:** `resources/content/blog/*.md`
- **Evidence:**
  - order: Quick answer -> Title Case H2s -> Key Takeaways -> Final Thoughts -> When to seek urgent care -> Sources -> FAQ -> Related reading
- **Fix:** Keep the quick answer (good for AEO) but vary structure by intent; drop Key Takeaways + Final Thoughts duplication; end with the clinic-specific next step.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** partial: 'Key takeaways'->varied headings, 'Final thoughts' heading dropped on 57 posts; underlying paragraph structure still uniform

#### AI-002 · P2 · Title Case headings across the Health Library
- **Area:** Content humanness
- **Affected:** 61 of 66 posts (e.g. GLP-1 India pillar 29 of 51 headings)
- **Files:** `resources/content/blog/*.md`
- **Evidence:**
  - "#### What Are GLP-1 Medicines?", "#### How the Two Are Linked", "#### Set Realistic Goals"
- **Fix:** Sentence case every heading (service pages already do).
- **Earlier v1 fix (now in stash@{0}, not in the tree):** fixed: 683 blog headings converted to sentence case

#### AI-003 · P2 · One-line paragraph style and rhetorical stingers in pillars
- **Area:** Content humanness
- **Affected:** GLP-1 India pillar (148 of 214 paragraphs are one short sentence); Technology pillar; Diet pillar; T2D pillar; GDM pillar
- **Files:** `resources/content/blog/*pillar*.md`
- **Evidence:**
  - "But there is a catch." / "They won't." / "Price matters." / "So, before looking only at the price tag, it helps to understand the bigger picture." / "This guide looks at those practical questions."
- **Fix:** Merge into 2-4 sentence paragraphs that carry a fact each; cut throat-clearing sentences.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** partial: stingers swept where found; one-line paragraph cadence unchanged

#### AI-004 · P2 · Residual ChatGPT/Claude phrases
- **Area:** Content humanness
- **Affected:** type-2 pillar, diet pillar, GLP-1 India pillar ("the bottom line"); diet + diabesity pillars ("genuinely"); technology pillar ("straightforward" x2); metabolic pillar ("that said"); oral GLP-1 post ("nuanced")
- **Files:** `resources/content/blog/*.md`
- **Evidence:**
  - blog-scan.json `claude` field
- **Fix:** Remove and rephrase; zero banned words after the rewrite.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** fixed: residual phrases + em dash swept

#### FP-002 · P2 · AI image-prompt fragments leak into alt text
- **Area:** Content humanness
- **Affected:** 7 posts: what-is-diabesity, what-is-metabolic-syndrome-5-risk-factors, do-glp-1-medicines-replace-metformin-or-insulin, diabetes-diet-for-weight-loss, weight-loss-improve-type-2-diabetes, when-to-see-a-diabetologist, how-glp-1-medicines-are-given-injection-technique-storage; 10 posts use "..., cover graphic" alts
- **Files:** `resources/content/blog/*.md image_alt`
- **Evidence:**
  - "Doctor explaining a body chart to an Indian patient in a modern clinic. supportive mood, shallow"
  - "Nurse guiding an Indian patient to inject an injection pen into the abdomen skin fold, shown"
- **Fix:** Write plain descriptive alt text per image; no style/mood words.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** fixed: 19 truncated/prompt-fragment image_alt values rewritten

#### TECH-002 · P2 · Mobile Core Web Vitals: LCP 3.1-4.2 s
- **Area:** Technical
- **Affected:** / (LCP 3.1 s, TBT 140 ms); /diabetes/ (4.0 s, 320 ms); GLP-1 India pillar (4.2 s, 370 ms); /health-library/what-is-diabesity/ (4.0 s, 260 ms); /doctors/dr-ajay-kaduskar/ (4.0 s, 360 ms)
- **Files:** `components/templates/BlogPost.tsx (priority cover image 1280x720)`, `components/layout/Header.tsx`, `app/layout.tsx (SmoothScroll/lenis, SpeedInsights)`
- **Evidence:**
  - Lighthouse 13.5.0 mobile (simulated Slow 4G) on live, JSON in seo-audit/_raw/v2/lh/
  - LCP element is an <img>; observed breakdown dominated by element render delay (0.5-1.5 s) = main-thread JS
  - raw HTML 400-520 KB per page (RSC payload)
  - CLS 0 on all five
- **Fix:** Cut client JS on content pages (lenis smooth scroll, Reveal, carousels) or defer it; serve smaller LCP images (sizes/quality), keep priority only on the true LCP; check that fonts don't block. Re-test on mobile; INP needs field data after launch.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** partial: image priority/preload already in place; LCP needs post-deploy Lighthouse measurement

#### TECH-003 · P2 · Home service tabs 2-4 are not in the server HTML
- **Area:** Technical
- **Affected:** /
- **Files:** `app/(site)/page.tsx:405-447,753`, `components/ui/Deferred.tsx`
- **Evidence:**
  - serviceTabsFallback renders only tab 0 (Diabetes and Metabolic); Heart, Child and Teen, Lab and Pharmacy cards mount after JS
- **Fix:** Render all four tab panels in the fallback (hidden with CSS), so every service card link is in raw HTML.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** fixed: sr-only links for tabs 2-4 in the no-JS fallback

#### TECH-004 · P2 · Sitemap lists a redirecting duplicate of the home page and bulk-commit lastmod dates
- **Area:** Technical
- **Affected:** sitemap.xml
- **Files:** `app/sitemap.ts:6-14`, `resources/content/patient-info/404.md (url: "")`
- **Evidence:**
  - `<loc>https://www.niramayclinics.com</loc>` (308 -> /) alongside `<loc>https://www.niramayclinics.com/</loc>`
  - 40 URLs share lastmod 2026-10-02T22:51:52+05:30
- **Fix:** Filter empty/non-slash URLs; use a real per-page `updated:` frontmatter date as lastmod.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** partial: local sitemap verified 111 clean URLs; bulk-commit lastmod dates inherent to migration

#### TECH-005 · P2 · Explicit AI allow-list misses Claude-User, Perplexity-User and Applebot
- **Area:** Crawling & AI-bot access
- **Affected:** robots.txt (after launch)
- **Files:** `app/robots.ts:8-19`
- **Evidence:**
  - AGENTS = Googlebot, Bingbot, GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, Applebot-Extended
- **Fix:** Add Claude-User, Perplexity-User, Applebot (they fall back to `*` today, so this is belt-and-braces).
- **Earlier v1 fix (now in stash@{0}, not in the tree):** fixed: allow-list already covers Claude-User, Perplexity-User, Applebot et al.

#### ENT-001 · P2 · Generic H2s that do not stand alone when quoted
- **Area:** Entities & semantics
- **Affected:** most cluster supports
- **Files:** `resources/content/blog/*.md`
- **Evidence:**
  - "Health Risks", "How the Two Are Linked", "Practical Tips", "Set Realistic Goals", "Key Takeaways", "Final Thoughts"
- **Fix:** Phrase each H2 as the question it answers and name the entity ("What health risks does diabesity add?").
- **Earlier v1 fix (now in stash@{0}, not in the tree):** partial: varied closing headings added; mid-page generic H2s not all rewritten

#### PAA-001 · P2 · People-Also-Ask, cost and "X vs Y" questions unanswered
- **Area:** AEO/GEO readiness
- **Affected:** see section 8 table
- **Files:** `resources/content/**/*.md`
- **Evidence:**
  - 0 cost answers site-wide; comparisons exist only for CGM vs glucometer and semaglutide vs tirzepatide
- **Fix:** Add the listed questions as H2 sections or FAQs on the page that owns that intent.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** partial: cost answered in GLP-1 pillar; comparison tables still sparse

#### SCH-006 · P3 · Minor schema validity issues
- **Area:** Schema
- **Affected:** sitewide
- **Files:** `lib/seo.tsx:103,123,128`, `lib/seo.tsx blogPostingNode`
- **Evidence:**
  - medicalSpecialty "Diabetology", "Cardiology", "Adolescent Medicine" are not schema.org MedicalSpecialty values (use Endocrine, Cardiovascular, Pediatric)
  - `reviewedBy` on BlogPosting (defined on WebPage) duplicates the MedicalWebPage property
  - /health-library/ emits two JSON-LD scripts
  - cluster breadcrumb item uses a #fragment URL
- **Fix:** Use enum values; keep reviewedBy only on the WebPage node; merge the index graphs; drop the fragment crumb or point it to a real cluster URL.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** fixed: valid specialty enums, gated lastReviewed, audience, unique ids

#### SCH-007 · P3 · No sameAs links from medical entities to Wikidata/MeSH
- **Area:** Entities & semantics
- **Affected:** 8 MedicalCondition nodes; post `about` entities
- **Files:** `lib/seo.tsx:246-297`
- **Evidence:**
  - CONDITIONS map has name/alternateName only
- **Fix:** Add sameAs (Wikidata Q-id, MeSH URL) for diabetes mellitus, T1D, T2D, GDM, prediabetes, obesity, hypertension, thyroid disease, metabolic syndrome, GLP-1 RA.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** fixed: Wikipedia + MeSH sameAs on condition and topic entities

#### TECH-006 · P3 · og:type is "article" on every non-article page
- **Area:** Technical
- **Affected:** 44 non-blog inner pages
- **Files:** `lib/seo.tsx pageMetadata`
- **Evidence:**
  - live og:type values: website (home), article (everything else)
- **Fix:** website for pages, profile for doctors, article for posts.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** fixed: og type website/profile/article by page kind

#### TECH-007 · P3 · Two-hop host redirect and no favicon.ico / manifest
- **Area:** Technical
- **Affected:** http://niramayclinics.com/; /favicon.ico; /manifest.webmanifest
- **Files:** `Vercel domain settings`, `app/ (no manifest.ts, no favicon.ico)`
- **Evidence:**
  - http://niramayclinics.com/ -> 308 https://niramayclinics.com/ -> 308 https://www.niramayclinics.com/
  - /favicon.ico 404; no <link rel=manifest>
- **Fix:** Point the apex http and https directly to https://www (Vercel: set apex to redirect to www); add app/favicon.ico and app/manifest.ts.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** partial: favicon.ico + web manifest added; host 2-hop redirect is Vercel config

#### TECH-008 · P3 · Forms and doctor breadcrumb
- **Area:** Technical
- **Affected:** /contact/; /blooming-buds/workshops/; /doctors/*
- **Files:** `components/forms/ContactForm.tsx:465`, `components/templates/DoctorProfile.tsx:144`
- **Evidence:**
  - no-JS: `Loading the form…`
  - doctor crumb label "Doctors" links to /about/ while BreadcrumbList says "About"; /doctors/ returns 404
- **Fix:** Server-render the form shell; align the crumb label and schema (or build a /doctors/ index).
- **Earlier v1 fix (now in stash@{0}, not in the tree):** fixed: doctor breadcrumb label matches destination; forms untouched

#### CONTENT-006 · P3 · "Painless" wording on test pages
- **Area:** E-E-A-T
- **Affected:** /heart-care/ecg/ (x2); /heart-care/2d-echo/; /obesity/body-composition-sarcopenia/ (x2)
- **Files:** `resources/content/diabetes-heart/ecg.md`, `2d-echo.md`, `body-composition-sarcopenia.md`
- **Evidence:**
  - "A quick, painless ECG at Niramay Clinics"
- **Fix:** "Non-invasive; most people feel nothing during the test."
- **Earlier v1 fix (now in stash@{0}, not in the tree):** fixed: 'painless' claims reworded to factual phrasing

#### LINK-004 · P3 · Service hubs with fewer than 5 supporting pages
- **Area:** Pillar linking
- **Affected:** /obesity/ (2); /heart-care/ (3); /lab/ (2)
- **Files:** `lib/nav.ts:36-53,91-95`
- **Evidence:**
  - nav groups
- **Fix:** Next content (do not write now): Obesity - BMI and waist for Indians; Bariatric surgery: who qualifies; Childhood obesity. Heart - Lipid profile and cholesterol targets; Heart attack warning signs; Coronary calcium/CT angiography referral. Lab - Diabetes test packages and fasting rules; HbA1c and thyroid tests explained; Report turnaround and online reports.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** open: hubs with <5 supporting pages need new content (client scope)

#### LOCAL-001 · P3 · Google Business Profile not linked; NAP formatting variant
- **Area:** AEO/GEO readiness
- **Affected:** schema sameAs; /contact/
- **Files:** `lib/site-config.ts:77-80,115`, `resources/content/core/contact.md`
- **Evidence:**
  - googleProfiles.*.mapsUrl empty -> no sameAs on clinic/physician
  - contact address renders "Dr. N. B. Khare Marg,Opposite Dinanath"
- **Fix:** Needs client input (GBP URLs); fix the spacing.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** open: needs GBP links (client)

#### CLIENT-001 · P3 · Needs client input: medical council registration numbers
- **Area:** E-E-A-T
- **Affected:** /doctors/dr-ajay-kaduskar/; /doctors/dr-prajakta-kaduskar/; Physician schema
- **Files:** `resources/content/core/dr-ajay-kaduskar.md:33`, `resources/content/core/dr-prajakta-kaduskar.md`
- **Evidence:**
  - `<!-- PENDING: restore when supplied — **Registration:** Maharashtra Medical Council Reg. No. **[CONFIRM]** -->`
- **Fix:** Add once supplied; do not invent.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** open: needs client input

#### CLIENT-002 · P3 · Needs client input: fees, GBP links, real photos, reviewer, original dates
- **Area:** AEO/GEO readiness
- **Affected:** sitewide
- **Files:** `lib/site-config.ts`, `resources/content/blog/*.md`
- **Evidence:**
  - see section 6
- **Fix:** Collect and add.
- **Earlier v1 fix (now in stash@{0}, not in the tree):** open: needs client input
<!--/GEN:issues-->

---

## 4. Page-by-page table (111 URLs, live)

Byline: `top` = "Written by" near the H1; `review-top` = review line under the H1; `bottom` = only in the end box. Dates: `BLANK` = "Last reviewed:" label with no date. Schema shows nodes beyond the sitewide Clinic + WebSite. Links in = distinct pages linking here (prose = from body copy). AI-likeness is explained in section 7. Legal pages are not scored.

<!--GEN:pages-->
| URL | Type | Cluster | Primary keyword | Byline | Dates | FAQ (avg words) | Schema (beyond Clinic+WebSite) | Links in (prose) | Links out (prose) | Title/Desc len | Words | AI-likeness |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| /health-library/diabetes-myths-and-facts/ | article (unclustered) | - | Diabetes: 10 Common Myths and the Facts | top | pub+upd | 3 (30) | Physician+MedicalWebPage+MedicalCondition+BlogPosting+BreadcrumbList+FAQPage+VideoObject | 4 (3) | 48 (3) | 49/126 | 923 | 14 |
| /health-library/menstrual-hygiene-teenage-girls/ | article (unclustered) | - | Menstrual Hygiene for Teenage Girls | top | pub+upd | 0 | Physician+MedicalWebPage+Thing+BlogPosting+BreadcrumbList | 5 (4) | 48 (2) | 53/119 | 997 | 16 |
| /health-library/preparing-child-for-adolescence/ | article (unclustered) | - | Preparing Your Child for Adolescence | top | pub+upd | 0 | Physician+MedicalWebPage+Thing+BlogPosting+BreadcrumbList | 5 (4) | 48 (2) | 46/142 | 907 | 28 |
| /health-library/self-esteem-teenagers-with-disabilities/ | article (unclustered) | - | Self-Esteem in Teens with Disabilities | top | pub+upd | 0 | Physician+MedicalWebPage+Thing+BlogPosting+BreadcrumbList | 5 (4) | 48 (3) | 48/151 | 936 | 21 |
| /health-library/smart-love-parenting-teenagers/ | article (unclustered) | - | Smart Love: Parenting Teenagers | top | pub+upd | 0 | Physician+MedicalWebPage+Thing+BlogPosting+BreadcrumbList | 5 (4) | 48 (2) | 49/118 | 1047 | 22 |
| /health-library/ | blog index | - | diabetes health articles | none | pub+upd | 0 | BreadcrumbList+CollectionPage | 111 (0) | 111 (0) | 40/128 | 3199 | 29 |
| /doctors/dr-ajay-kaduskar/ | doctor | - | Dr Ajay Kaduskar diabetologist Nagpur | none | none | 0 | Physician+ProfilePage+BreadcrumbList | 111 (83) | 108 (61) | 44/132 | 1148 | 17 |
| /doctors/dr-prajakta-kaduskar/ | doctor | - | Dr Prajakta Kaduskar child specialist Nagpur | none | none | 0 | Physician+ProfilePage+BreadcrumbList | 110 (12) | 51 (4) | 53/137 | 397 | 18 |
| / | home | - | diabetes and child specialist clinic Nagpur | bottom | none | 4 (17) | WebPage+FAQPage+VideoObject+VideoObject | 111 (0) | 49 (15) | 56/149 | 1273 | 35 |
| /health-library/continuous-glucose-monitoring-cgm-guide/ | pillar article | C8 | continuous glucose monitoring | top | pub+upd | 8 (58) | Physician+MedicalWebPage+MedicalDevice+BlogPosting+BreadcrumbList+FAQPage | 10 (9) | 52 (9) | 45/152 | 4609 | 28 |
| /health-library/diabetes-and-obesity-diabesity-guide/ | pillar article | C6 | diabetes and obesity | top | pub+upd | 8 (55) | Physician+MedicalWebPage+MedicalCondition+BlogPosting+BreadcrumbList+FAQPage | 11 (10) | 53 (10) | 42/150 | 3989 | 34 |
| /health-library/diabetes-diet-for-indians/ | pillar article | C3 | diabetes diet | top | pub+upd | 8 (34) | Physician+MedicalWebPage+Diet+BlogPosting+BreadcrumbList+FAQPage | 12 (11) | 52 (9) | 35/159 | 4148 | 48 |
| /health-library/gestational-diabetes-gdm-testing-blood-sugar-targets-diet-insulin-postpartum-care/ | pillar article | C9 | gestational diabetes | top | pub+upd | 8 (42) | Physician+MedicalWebPage+MedicalCondition+BlogPosting+BreadcrumbList+FAQPage | 9 (8) | 52 (9) | 36/157 | 3954 | 50 |
| /health-library/glp-1-diabetes-weight-loss-india-price-results-side-effects/ | pillar article | C4 | GLP-1 price in India | top | pub+upd | 7 (29) | Physician+MedicalWebPage+DrugClass+BlogPosting+BreadcrumbList+FAQPage | 13 (12) | 53 (10) | 51/158 | 4223 | 55 |
| /health-library/glp-1-medicines-diabetes-weight-loss/ | pillar article | C7 | GLP-1 medicines for diabetes and weight loss | top | pub+upd | 8 (48) | Physician+MedicalWebPage+DrugClass+BlogPosting+BreadcrumbList+FAQPage | 10 (9) | 52 (9) | 52/160 | 3876 | 37 |
| /health-library/metabolic-syndrome-fatty-liver-diabetes-heart-kidney-connection/ | pillar article | C10 | metabolic syndrome | top | pub+upd | 8 (60) | Physician+MedicalWebPage+MedicalCondition+BlogPosting+BreadcrumbList+FAQPage | 10 (9) | 52 (9) | 43/158 | 4829 | 33 |
| /health-library/prediabetes-hba1c-blood-sugar-symptoms-prevention/ | pillar article | C2 | prediabetes | top | pub+upd | 8 (39) | Physician+MedicalWebPage+MedicalCondition+BlogPosting+BreadcrumbList+FAQPage | 8 (7) | 53 (10) | 53/151 | 3227 | 42 |
| /health-library/technology-evolution-glp-1-drugs/ | pillar article | C5 | GLP-1 drugs history | top | pub+upd | 9 (30) | Physician+MedicalWebPage+DrugClass+BlogPosting+BreadcrumbList+FAQPage | 8 (7) | 52 (9) | 51/160 | 3786 | 46 |
| /health-library/type-2-diabetes-symptoms-diagnosis-management/ | pillar article | C1 | type 2 diabetes | bottom | pub+upd | 8 (22) | Physician+BlogPosting+BreadcrumbList+FAQPage | 9 (8) | 51 (11) | 50/158 | 3102 | 32 |
| /blooming-buds/adolescent-health/ | service | - | adolescent health clinic Nagpur | review-top | reviewed | 4 (31) | Physician+MedicalProcedure+MedicalWebPage+BreadcrumbList+FAQPage | 111 (3) | 49 (6) | 52/130 | 655 | 10 |
| /blooming-buds/career-counselling/ | service | - | career counselling Nagpur | review-top | reviewed | 4 (20) | Physician+Service+MedicalWebPage+BreadcrumbList+FAQPage | 111 (3) | 48 (4) | 45/135 | 549 | 16 |
| /blooming-buds/psychological-testing/ | service | - | psychological testing children Nagpur | review-top | reviewed | 4 (25) | Physician+MedicalTest+MedicalWebPage+BreadcrumbList+FAQPage | 111 (2) | 48 (6) | 52/114 | 646 | 26 |
| /blooming-buds/teen-mental-health/ | service | - | teen counselling Nagpur | review-top | reviewed | 4 (31) | Physician+MedicalTherapy+MedicalWebPage+BreadcrumbList+FAQPage | 111 (5) | 51 (9) | 52/130 | 821 | 21 |
| /blooming-buds/well-baby-clinic/ | service | - | well baby clinic Nagpur | review-top | reviewed | 4 (29) | Physician+MedicalProcedure+MedicalWebPage+BreadcrumbList+FAQPage | 111 (2) | 48 (4) | 42/129 | 566 | 5 |
| /blooming-buds/workshops/ | service | - | school health workshops Nagpur | review-top | reviewed | 4 (31) | Physician+Service+MedicalWebPage+BreadcrumbList+FAQPage | 111 (3) | 50 (6) | 48/137 | 671 | 28 |
| /diabetes/complications-screening/ | service | - | diabetes complications screening | review-top | reviewed | 4 (28) | Physician+MedicalTest+MedicalWebPage+BreadcrumbList+FAQPage | 111 (2) | 51 (7) | 52/124 | 903 | 15 |
| /diabetes/diabetes-care-programme/ | service | - | diabetes care programme | review-top | reviewed | 4 (22) | Physician+MedicalTherapy+MedicalWebPage+BreadcrumbList+FAQPage | 111 (1) | 51 (8) | 49/131 | 565 | 25 |
| /diabetes/diabetes-in-pregnancy/ | service | - | diabetes in pregnancy Nagpur | review-top | reviewed | 4 (25) | Physician+MedicalWebPage+MedicalCondition+BreadcrumbList+FAQPage | 111 (4) | 51 (8) | 47/128 | 738 | 5 |
| /diabetes/prediabetes-risk-assessment/ | service | - | prediabetes test Nagpur | review-top | reviewed | 5 (28) | Physician+MedicalWebPage+MedicalCondition+BreadcrumbList+FAQPage | 111 (2) | 51 (10) | 50/144 | 882 | 5 |
| /diabetes/type-1-diabetes/ | service | - | type 1 diabetes treatment Nagpur | review-top | reviewed | 4 (26) | Physician+MedicalWebPage+MedicalCondition+BreadcrumbList+FAQPage | 111 (1) | 51 (8) | 48/137 | 778 | 15 |
| /diabetes/type-2-diabetes/ | service | - | type 2 diabetes treatment Nagpur | review-top | reviewed | 6 (44) | Physician+MedicalWebPage+MedicalCondition+BreadcrumbList+FAQPage | 111 (3) | 51 (9) | 53/139 | 1124 | 7 |
| /heart-care/2d-echo/ | service | - | 2D echo test Nagpur | review-top | reviewed | 4 (30) | Physician+MedicalTest+MedicalWebPage+BreadcrumbList+FAQPage | 111 (2) | 51 (9) | 40/133 | 683 | 14 |
| /heart-care/ecg/ | service | - | ECG test Nagpur | review-top | reviewed | 4 (30) | Physician+MedicalTest+MedicalWebPage+BreadcrumbList+FAQPage | 111 (4) | 51 (9) | 36/105 | 611 | 14 |
| /heart-care/tmt-stress-test/ | service | - | TMT test Nagpur | review-top | reviewed | 4 (32) | Physician+MedicalTest+MedicalWebPage+BreadcrumbList+FAQPage | 111 (4) | 51 (8) | 55/135 | 828 | 14 |
| /hypertension-clinic/ | service | - | high blood pressure doctor Nagpur | review-top | reviewed | 4 (24) | Physician+MedicalWebPage+MedicalCondition+BreadcrumbList+FAQPage | 111 (4) | 51 (9) | 49/135 | 705 | 10 |
| /lab/home-sample-collection/ | service | - | home blood sample collection Nagpur | review-top | reviewed | 5 (28) | Physician+Service+MedicalWebPage+BreadcrumbList+FAQPage | 110 (1) | 47 (3) | 52/134 | 589 | 11 |
| /nutrition-lifestyle-counselling/ | service | - | diabetes diet counselling Nagpur | review-top | reviewed | 4 (28) | Physician+MedicalTherapy+MedicalWebPage+BreadcrumbList+FAQPage | 111 (6) | 51 (9) | 56/129 | 667 | 32 |
| /obesity/body-composition-sarcopenia/ | service | - | body composition analysis Nagpur | review-top | reviewed | 5 (34) | Physician+MedicalTest+MedicalWebPage+BreadcrumbList+FAQPage | 111 (3) | 51 (7) | 46/137 | 834 | 20 |
| /obesity/weight-management-medicines/ | service | - | weight loss medicines | review-top | reviewed | 4 (23) | Physician+MedicalTherapy+MedicalWebPage+BreadcrumbList+FAQPage | 111 (1) | 51 (10) | 54/124 | 813 | 10 |
| /pharmacy/ | service | - | pharmacy Dhantoli Nagpur | review-top | reviewed | 5 (27) | Physician+Pharmacy+MedicalWebPage+BreadcrumbList+FAQPage | 110 (2) | 46 (3) | 54/135 | 538 | 10 |
| /plan-your-visit/coming-from-outside-nagpur/ | service | - | diabetologist Nagpur outstation patients | review-top | reviewed | 5 (27) | Physician+Service+MedicalWebPage+BreadcrumbList+FAQPage | 111 (1) | 46 (6) | 44/138 | 569 | 5 |
| /preventive-health-check-ups/ | service | - | health check up Nagpur | review-top | reviewed | 4 (29) | Physician+MedicalProcedure+MedicalWebPage+BreadcrumbList+FAQPage | 111 (2) | 51 (8) | 47/134 | 616 | 14 |
| /thyroid-clinic/ | service | - | thyroid doctor Nagpur | review-top | reviewed | 4 (30) | Physician+MedicalWebPage+MedicalCondition+BreadcrumbList+FAQPage | 111 (3) | 51 (8) | 42/140 | 609 | 20 |
| /vaccination/ | service | - | child vaccination Nagpur | review-top | reviewed | 4 (21) | Physician+MedicalProcedure+MedicalWebPage+BreadcrumbList+FAQPage | 111 (2) | 47 (3) | 46/146 | 740 | 5 |
| /blooming-buds/ | service hub | - | child specialist Nagpur | review-top | reviewed | 4 (27) | Physician+MedicalProcedure+MedicalWebPage+BreadcrumbList+FAQPage | 111 (7) | 47 (9) | 58/135 | 738 | 15 |
| /diabetes/ | service hub | - | diabetes care Nagpur | review-top | reviewed | 6 (42) | Physician+MedicalWebPage+MedicalCondition+BreadcrumbList+FAQPage | 111 (13) | 52 (16) | 41/127 | 1001 | 10 |
| /heart-care/ | service hub | - | heart check up Nagpur | review-top | reviewed | 4 (28) | Physician+MedicalProcedure+MedicalWebPage+BreadcrumbList+FAQPage | 111 (6) | 51 (12) | 49/130 | 665 | 9 |
| /lab/ | service hub | - | pathology lab Dhantoli Nagpur | review-top | reviewed | 5 (33) | Physician+Service+MedicalWebPage+BreadcrumbList+FAQPage | 110 (3) | 47 (3) | 54/125 | 684 | 14 |
| /obesity/ | service hub | - | obesity treatment Nagpur | review-top | reviewed | 4 (25) | Physician+MedicalWebPage+MedicalCondition+BreadcrumbList+FAQPage | 111 (5) | 51 (11) | 53/135 | 793 | 5 |
| /health-library/after-gestational-diabetes-when-to-test-for-type-2-diabetes/ | supporting article | C9 | After Gestational Diabetes | top | pub+upd | 6 (26) | Physician+MedicalWebPage+MedicalCondition+BlogPosting+BreadcrumbList+FAQPage | 16 (9) | 53 (10) | 36/155 | 1095 | 36 |
| /health-library/belly-fat-diabetes-metabolic-health-waist-size/ | supporting article | C6 | Belly Fat, Diabetes and Metabolic Health | top | pub+upd | 6 (27) | Physician+MedicalWebPage+MedicalCondition+BlogPosting+BreadcrumbList+FAQPage | 20 (13) | 52 (9) | 50/158 | 1103 | 36 |
| /health-library/best-indian-breakfast-for-diabetes/ | supporting article | C3 | Best Indian Breakfast for Diabetes | top | pub+upd | 5 (28) | Physician+MedicalWebPage+Diet+BlogPosting+BreadcrumbList+FAQPage | 12 (11) | 52 (9) | 44/157 | 942 | 43 |
| /health-library/can-people-with-diabetes-eat-rice/ | supporting article | C3 | Can People With Diabetes Eat Rice? Practical Tips | top | pub+upd | 5 (27) | Physician+MedicalWebPage+Diet+BlogPosting+BreadcrumbList+FAQPage | 12 (11) | 52 (9) | 59/155 | 960 | 44 |
| /health-library/can-prediabetes-go-away/ | supporting article | C2 | Can Prediabetes Go Away? How to Lower Your Risk | top | pub+upd | 5 (26) | Physician+MedicalWebPage+MedicalCondition+BlogPosting+BreadcrumbList+FAQPage | 11 (10) | 51 (8) | 57/155 | 908 | 33 |
| /health-library/can-type-2-diabetes-be-reversed-remission/ | supporting article | C1 | Type 2 Diabetes Reversal and Remission | top | pub+upd | 5 (27) | Physician+MedicalWebPage+MedicalCondition+BlogPosting+BreadcrumbList+FAQPage | 11 (10) | 52 (9) | 48/159 | 1015 | 36 |
| /health-library/cgm-in-pregnancy-when-useful-what-to-know/ | supporting article | C8 | CGM in Pregnancy: When It Helps and What to Know | top | pub+upd | 6 (28) | Physician+MedicalWebPage+MedicalDevice+BlogPosting+BreadcrumbList+FAQPage | 10 (9) | 53 (10) | 58/158 | 1148 | 36 |
| /health-library/cgm-vs-glucometer-type-2-diabetes/ | supporting article | C8 | CGM vs Glucometer for Type 2 Diabetes | top | pub+upd | 6 (26) | Physician+MedicalWebPage+MedicalDevice+BlogPosting+BreadcrumbList+FAQPage | 10 (9) | 51 (8) | 47/144 | 1094 | 42 |
| /health-library/control-blood-sugar-naturally/ | supporting article | C1 | How to Control Blood Sugar Naturally | top | pub+upd | 6 (9) | Physician+MedicalWebPage+MedicalCondition+BlogPosting+BreadcrumbList+FAQPage | 8 (7) | 53 (10) | 46/148 | 672 | 54 |
| /health-library/diabetes-and-heart-disease-blood-sugar-metabolic-risk/ | supporting article | C10 | Diabetes and Heart Disease | top | pub+upd | 6 (26) | Physician+MedicalWebPage+MedicalCondition+BlogPosting+BreadcrumbList+FAQPage | 13 (12) | 52 (9) | 36/151 | 1157 | 43 |
| /health-library/diabetes-and-kidney-disease-tests-you-should-have/ | supporting article | C10 | Diabetes and Kidney Disease: Which Tests You Need | top | pub+upd | 6 (24) | Physician+MedicalWebPage+MedicalCondition+BlogPosting+BreadcrumbList+FAQPage | 15 (14) | 51 (8) | 59/158 | 1091 | 31 |
| /health-library/diabetes-and-sweets-handling-mithai/ | supporting article | C3 | Diabetes and Sweets: The Mithai Guide | top | pub+upd | 6 (30) | Physician+MedicalWebPage+Diet+BlogPosting+BreadcrumbList+FAQPage | 8 (7) | 51 (8) | 47/156 | 1187 | 43 |
| /health-library/diabetes-diet-for-weight-loss/ | supporting article | C3 | Diabetes Diet for Weight Loss | top | pub+upd | 6 (11) | Physician+MedicalWebPage+Diet+BlogPosting+BreadcrumbList+FAQPage | 8 (7) | 51 (8) | 39/145 | 683 | 56 |
| /health-library/do-glp-1-medicines-replace-metformin-or-insulin/ | supporting article | C7 | Do GLP-1 Medicines Replace Metformin or Insulin | top | pub+upd | 6 (8) | Physician+MedicalWebPage+DrugClass+BlogPosting+BreadcrumbList+FAQPage | 9 (8) | 51 (8) | 58/143 | 677 | 36 |
| /health-library/does-everyone-with-type-2-diabetes-need-cgm/ | supporting article | C8 | Does Everyone With Type 2 Diabetes Need a CGM | top | pub+upd | 6 (11) | Physician+MedicalWebPage+MedicalDevice+BlogPosting+BreadcrumbList+FAQPage | 7 (6) | 52 (9) | 56/150 | 698 | 48 |
| /health-library/does-gestational-diabetes-go-away-after-delivery/ | supporting article | C9 | Does Gestational Diabetes Go Away After Delivery | top | pub+upd | 6 (24) | Physician+MedicalWebPage+MedicalCondition+BlogPosting+BreadcrumbList+FAQPage | 10 (9) | 52 (9) | 59/159 | 1077 | 35 |
| /health-library/dual-triple-agonists-after-semaglutide-tirzepatide/ | supporting article | C5 | Dual and Triple Agonists | top | pub+upd | 6 (24) | Physician+MedicalWebPage+DrugClass+BlogPosting+BreadcrumbList+FAQPage | 9 (8) | 51 (8) | 34/158 | 1021 | 40 |
| /health-library/fatty-liver-and-diabetes-why-they-occur-together/ | supporting article | C10 | Fatty Liver and Diabetes: Why They Occur Together | top | pub+upd | 6 (25) | Physician+MedicalWebPage+MedicalCondition+BlogPosting+BreadcrumbList+FAQPage | 15 (13) | 53 (10) | 59/153 | 1101 | 37 |
| /health-library/first-signs-of-type-2-diabetes/ | supporting article | C1 | First Signs of Type 2 Diabetes | top | pub+upd | 5 (32) | Physician+MedicalWebPage+MedicalCondition+BlogPosting+BreadcrumbList+FAQPage | 9 (8) | 52 (9) | 40/154 | 1008 | 42 |
| /health-library/fruits-for-diabetes-which-how-much-when/ | supporting article | C3 | Fruits for Diabetes: Which, How Much and When | top | pub+upd | 5 (28) | Physician+MedicalWebPage+Diet+BlogPosting+BreadcrumbList+FAQPage | 7 (6) | 52 (9) | 55/148 | 936 | 40 |
| /health-library/gestational-diabetes-diet-indian-foods-meal-timing/ | supporting article | C9 | Gestational Diabetes Diet | top | pub+upd | 6 (27) | Physician+MedicalWebPage+MedicalCondition+BlogPosting+BreadcrumbList+FAQPage | 9 (8) | 52 (9) | 35/137 | 1132 | 44 |
| /health-library/gestational-diabetes-test-when-done-results-meaning/ | supporting article | C9 | Gestational Diabetes Test | top | pub+upd | 6 (25) | Physician+MedicalWebPage+MedicalCondition+BlogPosting+BreadcrumbList+FAQPage | 8 (7) | 51 (8) | 35/152 | 1137 | 37 |
| /health-library/glp-1-injections-india-why-more-affordable/ | supporting article | C4 | GLP-1 Injections in India: Why Prices Are Falling | top | pub+upd | 6 (28) | Physician+MedicalWebPage+DrugClass+BlogPosting+BreadcrumbList+FAQPage | 8 (7) | 51 (8) | 59/157 | 1109 | 38 |
| /health-library/glp-1-side-effects-nausea-constipation-management/ | supporting article | C4 | GLP-1 Side Effects: Nausea, Constipation and Fixes | top | pub+upd | 6 (30) | Physician+MedicalWebPage+DrugClass+BlogPosting+BreadcrumbList+FAQPage | 7 (6) | 53 (10) | 60/146 | 1160 | 45 |
| /health-library/high-triglycerides-diabetes-obesity/ | supporting article | C10 | High Triglycerides, Diabetes and Obesity | top | pub+upd | 6 (9) | Physician+MedicalWebPage+MedicalCondition+BlogPosting+BreadcrumbList+FAQPage | 14 (12) | 53 (10) | 50/151 | 632 | 49 |
| /health-library/history-of-glp-1-drugs-natural-discovery-to-medicines/ | supporting article | C5 | The Surprising History of GLP-1 Drugs | top | pub+upd | 6 (26) | Physician+MedicalWebPage+DrugClass+BlogPosting+BreadcrumbList+FAQPage | 7 (6) | 51 (8) | 47/158 | 1111 | 31 |
| /health-library/how-glp-1-injection-pens-work-technology/ | supporting article | C5 | How GLP-1 Injection Pens Work: The Technology | top | pub+upd | 6 (27) | Physician+MedicalWebPage+DrugClass+BlogPosting+BreadcrumbList+FAQPage | 8 (7) | 52 (9) | 55/162 | 1105 | 36 |
| /health-library/how-glp-1-medicines-are-given-injection-technique-storage/ | supporting article | C7 | GLP-1 Injections: Technique and Storage | top | pub+upd | 6 (28) | Physician+MedicalWebPage+DrugClass+BlogPosting+BreadcrumbList+FAQPage | 8 (7) | 53 (10) | 49/150 | 1192 | 43 |
| /health-library/how-glp-1-treatment-is-started-dose-titration-first-weeks/ | supporting article | C7 | How Is GLP-1 Treatment Started? Dose and First | top | pub+upd | 6 (26) | Physician+MedicalWebPage+DrugClass+BlogPosting+BreadcrumbList+FAQPage | 8 (7) | 52 (9) | 56/160 | 1170 | 47 |
| /health-library/how-much-weight-can-you-lose-on-glp-1-medicines/ | supporting article | C4 | How Much Weight Can You Lose on GLP-1 Medicines | top | pub+upd | 6 (31) | Physician+MedicalWebPage+DrugClass+BlogPosting+BreadcrumbList+FAQPage | 7 (6) | 51 (8) | 58/142 | 1159 | 37 |
| /health-library/how-often-check-blood-sugar-hba1c/ | supporting article | C1 | How Often Should You Check Blood Sugar and HbA1c | top | pub+upd | 6 (8) | Physician+MedicalWebPage+MedicalCondition+BlogPosting+BreadcrumbList+FAQPage | 11 (10) | 54 (11) | 59/143 | 691 | 50 |
| /health-library/how-often-test-diabetes-prediabetes/ | supporting article | C2 | How Often to Test for Diabetes With Prediabetes | top | pub+upd | 5 (27) | Physician+MedicalWebPage+MedicalCondition+BlogPosting+BreadcrumbList+FAQPage | 8 (7) | 53 (10) | 57/155 | 926 | 48 |
| /health-library/how-to-read-cgm-report-agp-time-in-range-patterns/ | supporting article | C8 | How to Read a CGM Report: AGP and Glucose Patterns | top | pub+upd | 6 (29) | Physician+MedicalWebPage+MedicalDevice+BlogPosting+BreadcrumbList+FAQPage | 7 (6) | 51 (8) | 60/157 | 1199 | 33 |
| /health-library/is-glp-1-medicine-worth-the-cost/ | supporting article | C4 | Is a GLP-1 Medicine Worth the Cost? A Decision | top | pub+upd | 6 (27) | Physician+MedicalWebPage+DrugClass+BlogPosting+BreadcrumbList+FAQPage | 9 (8) | 51 (8) | 56/152 | 1137 | 49 |
| /health-library/oral-glp-1-tablets-replacing-weight-loss-injections/ | supporting article | C5 | Oral GLP-1 Tablets for Weight Loss | top | pub+upd | 6 (28) | Physician+MedicalWebPage+DrugClass+BlogPosting+BreadcrumbList+FAQPage | 7 (6) | 51 (8) | 44/144 | 1058 | 42 |
| /health-library/prediabetes-diet-indian-what-to-eat/ | supporting article | C2 | Prediabetes Diet: What to Eat in an Indian Diet | top | pub+upd | 5 (29) | Physician+MedicalWebPage+MedicalCondition+BlogPosting+BreadcrumbList+FAQPage | 11 (10) | 54 (11) | 57/156 | 982 | 48 |
| /health-library/prediabetes-hba1c-what-the-number-means/ | supporting article | C2 | Prediabetes HbA1c: What the Number Means | top | pub+upd | 5 (25) | Physician+MedicalWebPage+MedicalCondition+BlogPosting+BreadcrumbList+FAQPage | 10 (9) | 52 (9) | 50/148 | 886 | 36 |
| /health-library/prediabetes-weight-loss-how-much-helps/ | supporting article | C2 | Prediabetes and Weight Loss: How Much Helps | top | pub+upd | 5 (29) | Physician+MedicalWebPage+MedicalCondition+BlogPosting+BreadcrumbList+FAQPage | 10 (9) | 52 (9) | 54/150 | 955 | 38 |
| /health-library/semaglutide-vs-tirzepatide-difference-which-suits-you/ | supporting article | C7 | Semaglutide vs Tirzepatide | top | pub+upd | 6 (23) | Physician+MedicalWebPage+DrugClass+BlogPosting+BreadcrumbList+FAQPage | 7 (6) | 52 (9) | 36/152 | 1025 | 34 |
| /health-library/weight-loss-improve-type-2-diabetes/ | supporting article | C6 | How Much Weight Loss Can Improve Type 2 Diabetes | top | pub+upd | 6 (9) | Physician+MedicalWebPage+MedicalCondition+BlogPosting+BreadcrumbList+FAQPage | 8 (7) | 53 (10) | 59/142 | 641 | 45 |
| /health-library/what-happens-when-you-stop-glp-1-weight-loss-medicine/ | supporting article | C4 | What Happens When You Stop a GLP-1 Medicine | top | pub+upd | 6 (28) | Physician+MedicalWebPage+DrugClass+BlogPosting+BreadcrumbList+FAQPage | 7 (6) | 51 (8) | 54/154 | 1074 | 33 |
| /health-library/what-is-diabesity/ | supporting article | C6 | What Is Diabesity? Diabetes and Obesity | top | pub+upd | 6 (7) | Physician+MedicalWebPage+MedicalCondition+BlogPosting+BreadcrumbList+FAQPage | 8 (7) | 52 (9) | 49/149 | 629 | 43 |
| /health-library/what-is-insulin-resistance-symptoms-causes-weight/ | supporting article | C6 | What Is Insulin Resistance? Symptoms and Causes | top | pub+upd | 6 (28) | Physician+MedicalWebPage+MedicalCondition+BlogPosting+BreadcrumbList+FAQPage | 9 (8) | 52 (9) | 57/140 | 1060 | 37 |
| /health-library/what-is-metabolic-syndrome-5-risk-factors/ | supporting article | C10 | What Is Metabolic Syndrome? 5 Risk Factors | top | pub+upd | 6 (10) | Physician+MedicalWebPage+MedicalCondition+BlogPosting+BreadcrumbList+FAQPage | 8 (6) | 53 (10) | 52/148 | 675 | 54 |
| /health-library/what-is-time-in-range-tir-diabetes/ | supporting article | C8 | What Is Time in Range (TIR) in Diabetes | top | pub+upd | 6 (26) | Physician+MedicalWebPage+MedicalDevice+BlogPosting+BreadcrumbList+FAQPage | 8 (7) | 51 (8) | 50/152 | 1104 | 25 |
| /health-library/when-is-insulin-needed-in-gestational-diabetes/ | supporting article | C9 | When Is Insulin Needed in Gestational Diabetes | top | pub+upd | 6 (27) | Physician+MedicalWebPage+MedicalCondition+BlogPosting+BreadcrumbList+FAQPage | 8 (7) | 52 (9) | 57/150 | 1147 | 49 |
| /health-library/when-to-see-a-diabetologist/ | supporting article | C1 | When Should You See a Diabetologist | top | pub+upd | 6 (9) | Physician+MedicalWebPage+MedicalCondition+BlogPosting+BreadcrumbList+FAQPage | 7 (6) | 52 (9) | 46/154 | 664 | 45 |
| /health-library/who-should-not-take-glp-1-medicines/ | supporting article | C7 | Who Should Not Take GLP-1 Medicines | top | pub+upd | 6 (25) | Physician+MedicalWebPage+DrugClass+BlogPosting+BreadcrumbList+FAQPage | 9 (8) | 53 (10) | 46/145 | 1154 | 33 |
| /health-library/why-glp-1-medicines-became-global-trend/ | supporting article | C5 | Why Did GLP-1 Medicines Become a Global Trend | top | pub+upd | 6 (27) | Physician+MedicalWebPage+DrugClass+BlogPosting+BreadcrumbList+FAQPage | 7 (6) | 53 (10) | 56/144 | 1054 | 35 |
| /health-library/why-hard-to-lose-weight-with-type-2-diabetes/ | supporting article | C6 | Why Is Weight Loss So Hard With Type 2 Diabetes | top | pub+upd | 6 (26) | Physician+MedicalWebPage+MedicalCondition+BlogPosting+BreadcrumbList+FAQPage | 7 (6) | 51 (8) | 58/151 | 1099 | 33 |
| /accessibility/ | trust/legal | - | Accessibility statement | none | updated | 0 | WebPage+BreadcrumbList | 111 (0) | 46 (0) | 49/133 | 187 | n/a |
| /cancellation-refund-policy/ | trust/legal | - | Cancellation and Refund Policy | none | updated | 0 | WebPage+BreadcrumbList | 111 (0) | 46 (0) | 48/106 | 219 | n/a |
| /editorial-policy/ | trust/legal | - | Editorial and Review Policy | none | updated | 0 | WebPage+BreadcrumbList | 111 (95) | 46 (0) | 45/106 | 353 | n/a |
| /medical-disclaimer/ | trust/legal | - | Medical Disclaimer | none | updated | 0 | WebPage+BreadcrumbList | 111 (0) | 46 (0) | 44/124 | 173 | n/a |
| /patient-rights/ | trust/legal | - | Patient Rights | none | updated | 0 | WebPage+BreadcrumbList | 111 (0) | 46 (0) | 40/114 | 444 | n/a |
| /privacy-policy/ | trust/legal | - | Privacy Policy | none | updated | 0 | WebPage+BreadcrumbList | 111 (0) | 46 (0) | 40/126 | 1194 | n/a |
| /terms-of-use/ | trust/legal | - | Terms of Use | none | updated | 0 | WebPage+BreadcrumbList | 111 (0) | 46 (0) | 38/99 | 397 | n/a |
| /about/ | trust/utility | - | Niramay Clinics Nagpur | none | none | 0 | AboutPage+BreadcrumbList | 110 (0) | 46 (0) | 53/134 | 682 | 18 |
| /contact/ | trust/utility | - | Niramay Clinics contact | none | none | 0 | ContactPage+BreadcrumbList | 111 (60) | 46 (0) | 46/123 | 276 | n/a |
| /faqs/ | trust/utility | - | Niramay Clinics FAQs | none | none | 25 (18) | WebPage+BreadcrumbList+FAQPage | 111 (0) | 46 (0) | 40/135 | 687 | 10 |
| /plan-your-visit/ | trust/utility | - | plan your visit Niramay Clinics | none | none | 0 | WebPage+BreadcrumbList | 111 (1) | 46 (1) | 41/119 | 552 | 13 |
| /services/ | trust/utility | - | clinic services Nagpur | none | none | 0 | CollectionPage+BreadcrumbList | 111 (0) | 46 (0) | 44/149 | 519 | 39 |
<!--/GEN:pages-->

---

## 5. Cluster table

### 5a. Health Library clusters (10 pillars, 50 supports)

<!--GEN:clusters-->
| # | Pillar | Supporting articles (5) | Pillar -> supports in body | Supports -> pillar (early) | Supports -> >=2 siblings | Pillar -> service page in body | Missing links |
|---|---|---|---|---|---|---|---|
| C1 | type-2-diabetes-symptoms-diagnosis-management/ | can-type-2-diabetes-be-reversed-remission/<br>control-blood-sugar-naturally/<br>first-signs-of-type-2-diabetes/<br>how-often-check-blood-sugar-hba1c/<br>when-to-see-a-diabetologist/ | 5/5 | 5/5 | 5/5 | no | pillar <-> matching service page (LINK-002); service page -> pillar |
| C2 | prediabetes-hba1c-blood-sugar-symptoms-prevention/ | can-prediabetes-go-away/<br>how-often-test-diabetes-prediabetes/<br>prediabetes-diet-indian-what-to-eat/<br>prediabetes-hba1c-what-the-number-means/<br>prediabetes-weight-loss-how-much-helps/ | 5/5 | 5/5 | 5/5 | no | pillar <-> matching service page (LINK-002); service page -> pillar |
| C3 | diabetes-diet-for-indians/ | best-indian-breakfast-for-diabetes/<br>can-people-with-diabetes-eat-rice/<br>diabetes-and-sweets-handling-mithai/<br>diabetes-diet-for-weight-loss/<br>fruits-for-diabetes-which-how-much-when/ | 5/5 | 5/5 | 5/5 | no | pillar <-> matching service page (LINK-002); service page -> pillar |
| C4 | glp-1-diabetes-weight-loss-india-price-results-side-effects/ | glp-1-injections-india-why-more-affordable/<br>glp-1-side-effects-nausea-constipation-management/<br>how-much-weight-can-you-lose-on-glp-1-medicines/<br>is-glp-1-medicine-worth-the-cost/<br>what-happens-when-you-stop-glp-1-weight-loss-medicine/ | 5/5 | 5/5 | 5/5 | no | pillar <-> matching service page (LINK-002); service page -> pillar |
| C5 | technology-evolution-glp-1-drugs/ | dual-triple-agonists-after-semaglutide-tirzepatide/<br>history-of-glp-1-drugs-natural-discovery-to-medicines/<br>how-glp-1-injection-pens-work-technology/<br>oral-glp-1-tablets-replacing-weight-loss-injections/<br>why-glp-1-medicines-became-global-trend/ | 5/5 | 5/5 | 5/5 | no | pillar <-> matching service page (LINK-002); service page -> pillar |
| C6 | diabetes-and-obesity-diabesity-guide/ | belly-fat-diabetes-metabolic-health-waist-size/<br>weight-loss-improve-type-2-diabetes/<br>what-is-diabesity/<br>what-is-insulin-resistance-symptoms-causes-weight/<br>why-hard-to-lose-weight-with-type-2-diabetes/ | 5/5 | 5/5 | 5/5 | no | pillar <-> matching service page (LINK-002); service page -> pillar |
| C7 | glp-1-medicines-diabetes-weight-loss/ | do-glp-1-medicines-replace-metformin-or-insulin/<br>how-glp-1-medicines-are-given-injection-technique-storage/<br>how-glp-1-treatment-is-started-dose-titration-first-weeks/<br>semaglutide-vs-tirzepatide-difference-which-suits-you/<br>who-should-not-take-glp-1-medicines/ | 5/5 | 5/5 | 5/5 | no | pillar <-> matching service page (LINK-002); service page -> pillar |
| C8 | continuous-glucose-monitoring-cgm-guide/ | cgm-in-pregnancy-when-useful-what-to-know/<br>cgm-vs-glucometer-type-2-diabetes/<br>does-everyone-with-type-2-diabetes-need-cgm/<br>how-to-read-cgm-report-agp-time-in-range-patterns/<br>what-is-time-in-range-tir-diabetes/ | 5/5 | 5/5 | 5/5 | no | pillar <-> matching service page (LINK-002); service page -> pillar |
| C9 | gestational-diabetes-gdm-testing-blood-sugar-targets-diet-insulin-postpartum-care/ | after-gestational-diabetes-when-to-test-for-type-2-diabetes/<br>does-gestational-diabetes-go-away-after-delivery/<br>gestational-diabetes-diet-indian-foods-meal-timing/<br>gestational-diabetes-test-when-done-results-meaning/<br>when-is-insulin-needed-in-gestational-diabetes/ | 5/5 | 5/5 | 5/5 | no | pillar <-> matching service page (LINK-002); service page -> pillar |
| C10 | metabolic-syndrome-fatty-liver-diabetes-heart-kidney-connection/ | diabetes-and-heart-disease-blood-sugar-metabolic-risk/<br>diabetes-and-kidney-disease-tests-you-should-have/<br>fatty-liver-and-diabetes-why-they-occur-together/<br>high-triglycerides-diabetes-obesity/<br>what-is-metabolic-syndrome-5-risk-factors/ | 5/5 | 5/5 | 5/5 | no | pillar <-> matching service page (LINK-002); service page -> pillar |
<!--/GEN:clusters-->

Unclustered: `diabetes-myths-and-facts`, `menstrual-hygiene-teenage-girls`, `preparing-child-for-adolescence`, `self-esteem-teenagers-with-disabilities`, `smart-love-parenting-teenagers` (LINK-003).

### 5b. Service hubs as pillars

| Hub | Supporting pages | Hub -> supports in body | Supports -> hub in body | Missing |
|---|---|---|---|---|
| /diabetes/ | type-2, type-1, diabetes-in-pregnancy, complications-screening, diabetes-care-programme, prediabetes-risk-assessment (6) | 0/6 (Explore list is plain text) | 0/6 | All hub links. Links to the T2D, Prediabetes, GDM and CGM pillars |
| /obesity/ | weight-management-medicines, body-composition-sarcopenia (2) | 0/2 | 0/2 | 3 more supports (LINK-004). Links to the Diabesity and GLP-1 pillars |
| /heart-care/ | 2d-echo, ecg, tmt-stress-test (3) | 0/3 | 0/3 | 2 more supports. Link to the Metabolic-syndrome pillar |
| /blooming-buds/ | well-baby-clinic, vaccination, adolescent-health, teen-mental-health, psychological-testing, career-counselling, workshops (7) | 0/7 | 0/7 | All links. Dr. Prajakta's 4 articles |
| /lab/ | home-sample-collection, pharmacy (2) | 0/2 | 0/2 | 3 more supports |

---

## 6. Needs from client (lowest priority, never blocks other fixes)

1. **Maharashtra Medical Council registration numbers** for Dr. Ajay V. Kaduskar and Dr. Prajakta A. Kaduskar (doctor pages + Physician `identifier`).
2. **Google Business Profile links** for the clinic and for Dr. Ajay (and Dr. Prajakta if one exists). Used for `sameAs`, the footer and NAP matching.
3. **Fees in rupees:** consultation (each doctor, first and follow-up), the common test packages (HbA1c, lipid, thyroid, ECG, 2D Echo, TMT, body composition, psychological testing, career counselling) and home-collection charges. Or explicit approval to say "call for current fees".
4. **Photos:** a decision on replacing the AI portraits with real photographs on the doctor heroes, byline avatar and schema image.
5. **Medical review:** whether a second doctor can review articles. If not, approval to label posts "Written and reviewed by".
6. **Real dates:** the original WordPress publication dates of the 5 legacy posts, and a doctor sign-off date for each service page.
7. **Lab accreditation status** (NABL or not) and report turnaround times. People ask about both, and they are quotable.
8. **Sign-off on brand names / price statements** in the GLP-1 articles (NMC compliance).

---

## 7. AI-likeness by page (live, 103 content pages; legal and contact excluded)

**How the score works (0-100, higher = more machine-like):** vocabulary tells (3 per hit, max 15) + Title Case heading share (max 15) + one-line `<p>` share (max 20) + templated sections (Key Takeaways/Final Thoughts 7, "Quick answer" label 3) + uniform sentence length (SD under 6 = 10, under 7.5 = 5) + few specifics (numbers per 100 words under 1 = 10, under 2 = 5) + thin FAQ answers (average under 15 words = 5) + em dashes (more than 2 per 1,000 words = 5) + density of rhetorical stock sentences (max 15). Script: `seo-audit/_raw/v2/ai-score.mjs`. Rerun it after the rewrite to compare.

**Summary:** articles average **39**, service and site pages **15**. Worst: `diabetes-diet-for-weight-loss` 56, `glp-1-diabetes-weight-loss-india-price-results-side-effects` 55, `control-blood-sugar-naturally` 54. The five "worst sentences" below are picked automatically by a pattern score. On low-scoring pages they are simply the least specific sentences, not necessarily bad ones.

<!--GEN:ai-->
**56** · /health-library/diabetes-diet-for-weight-loss/ · TitleCase 7/15 · one-line paras 6/13 · sentence SD 5.6 · numbers/100w 0.2
1. "Weight loss can improve blood sugar, blood pressure and cholesterol."
2. "A diet you can keep up is the one that works."
3. "With diabetes, the way you lose weight matters as much as how much."
4. "A steady loss over weeks to months is easier to sustain than rapid loss."
5. "Brisk walking, strength exercise and an active day support weight loss and sugar control."

**55** · /health-library/glp-1-diabetes-weight-loss-india-price-results-side-effects/ · TitleCase 29/56 · one-line paras 148/214 · sentence SD 6 · numbers/100w 1.6
1. "But there is a catch."
2. "The important question is therefore not simply "Which GLP-1 injection is cheapest?" It is: > Which treatment is medically appropriate, tolerable and financially sustainable for me?"
3. "They won't."
4. "Price matters."
5. "Tell your doctor."

**54** · /health-library/control-blood-sugar-naturally/ · TitleCase 5/17 · one-line paras 7/14 · sentence SD 5.1 · numbers/100w 0.8
1. "Small, steady habits make the biggest difference."
2. "Even modest weight loss improves insulin response."
3. "Poor sleep and chronic stress can raise blood sugar."
4. "Never stop prescribed medicines without your doctor's advice."
5. "Healthy habits are powerful, but they work best with medical guidance."

**54** · /health-library/what-is-metabolic-syndrome-5-risk-factors/ · TitleCase 3/18 · one-line paras 9/17 · sentence SD 5.4 · numbers/100w 0.7
1. "Excess fat around the abdomen."
2. "Your doctor interprets them together."
3. "It is a group of related problems that often appear together and increase the risk of type 2 diabetes, heart disease and stroke."
4. "Lifestyle changes, such as weight loss, activity and a healthier diet, can improve all of them."
5. "Raised levels of this blood fat."

**50** · /health-library/gestational-diabetes-gdm-testing-blood-sugar-targets-diet-insulin-postpartum-care/ · TitleCase 28/43 · one-line paras 66/148 · sentence SD 5.5 · numbers/100w 1.6
1. "It does not."
2. "Not necessarily."
3. "This is a common misunderstanding."
4. "Why is this test necessary?"
5. "That is why glucose testing during pregnancy is so important."

**50** · /health-library/how-often-check-blood-sugar-hba1c/ · TitleCase 6/17 · one-line paras 7/14 · sentence SD 5.7 · numbers/100w 1
1. "Bring it to your visits."
2. "The right frequency depends on your treatment, your control and your doctor's advice."
3. "More frequent testing for a period."
4. "Your doctor will set a schedule for you."
5. "Testing shows how well your plan is working."

**49** · /health-library/high-triglycerides-diabetes-obesity/ · TitleCase 3/16 · one-line paras 4/11 · sentence SD 3.8 · numbers/100w 0.7
1. "Triglycerides are a type of fat in the blood."
2. "Your doctor will advise how often to repeat it."
3. "Triglycerides respond well to lifestyle change."
4. "High levels often go hand in hand with diabetes and excess weight."
5. "A fasting blood test measures triglycerides along with cholesterol."

**49** · /health-library/is-glp-1-medicine-worth-the-cost/ · TitleCase 8/18 · one-line paras 5/12 · sentence SD 5.6 · numbers/100w 1.5
1. "This guide helps you weigh the benefits against the cost in a clear, practical way."
2. "It is less clear if the expected benefit is small, if you cannot afford long-term use, or if lifestyle changes alone could meet your goals."
3. "GLP-1 medicines can improve blood sugar, weight and overall health."
4. "They can also be a long-term expense."
5. "Discuss your own numbers with your doctor."

**49** · /health-library/when-is-insulin-needed-in-gestational-diabetes/ · TitleCase 11/19 · one-line paras 4/16 · sentence SD 5.9 · numbers/100w 0.6
1. "It is not a failure."
2. "Your doctor may adjust them."
3. "It means your body needs extra help during pregnancy."
4. "Insulin does not cross the placenta in significant amounts and is considered safe for the baby."
5. "It can feel like a setback."

**48** · /health-library/diabetes-diet-for-indians/ · TitleCase 24/50 · one-line paras 101/176 · sentence SD 6.1 · numbers/100w 0.1
1. "The important point is this: a diabetes diet is not simply a list of foods that are allowed and forbidden."
2. "Not necessarily."
3. "There is no universal portion that works for everyone."
4. "However, more protein is not automatically better for everyone."
5. "There is no single meal plan that suits every person with diabetes."

**48** · /health-library/does-everyone-with-type-2-diabetes-need-cgm/ · TitleCase 6/14 · one-line paras 4/10 · sentence SD 5.5 · numbers/100w 1.3
1. "It is a powerful tool, but not every person needs one."
2. "Your doctor can advise whether a CGM would help you."
3. "The best monitoring method is one that fits your treatment and lifestyle."
4. "For advice, you can consult Dr. Ajay V. Kaduskar at Niramay Clinics in Nagpur."
5. "Many people with stable type 2 diabetes on tablets do well with regular fingerstick checks and HbA1c."

**48** · /health-library/how-often-test-diabetes-prediabetes/ · TitleCase 7/17 · one-line paras 6/15 · sentence SD 5.2 · numbers/100w 0.8
1. "Testing frequency depends on your results and risk factors."
2. "If you have been told you have prediabetes, regular testing is important."
3. "Testing every three to six months can be useful while making lifestyle changes or if results are close to the diabetes range."
4. "Measures blood sugar after an overnight fast."
5. "Your doctor can set the right schedule for you."

**48** · /health-library/prediabetes-diet-indian-what-to-eat/ · TitleCase 7/20 · one-line paras 8/18 · sentence SD 5.1 · numbers/100w 0.2
1. "It does not require special foods or giving up home-cooked Indian meals."
2. "A short walk after meals can help lower post-meal sugar."
3. "Avoid long gaps followed by heavy meals."
4. "A personalised plan works better than strict diets."
5. "It focuses on balance, portions and smarter choices."

**47** · /health-library/how-glp-1-treatment-is-started-dose-titration-first-weeks/ · TitleCase 10/18 · one-line paras 7/18 · sentence SD 4.8 · numbers/100w 1.3
1. "This guide explains how treatment usually begins, why the dose goes up slowly and what to expect."
2. "It is not meant to give the full effect."
3. "The exact schedule depends on the product."
4. "When Should You See a Doctor Urgently?"
5. "Never adjust them on your own."

**46** · /health-library/technology-evolution-glp-1-drugs/ · TitleCase 2/41 · one-line paras 136/199 · sentence SD 5.9 · numbers/100w 3
1. "That is an important distinction."
2. "This is an important step in the evolution of the technology because it shows that researchers are not simply modifying the original class of injectable medicines."
3. "That is a clinical question."
4. "And that distinction matters."
5. "That matters for long-term treatment."

**45** · /health-library/glp-1-side-effects-nausea-constipation-management/ · TitleCase 8/16 · one-line paras 5/13 · sentence SD 4.6 · numbers/100w 1.5
1. "This is common, usually mild and often settles with time and small changes in eating habits."
2. "This is part of how they work, but it can cause nausea, bloating and reflux, especially with large or fatty meals."
3. "When Should You See a Doctor Urgently?"
4. "If side effects are strong, the dose may be held or reduced for a while."
5. "Eating smaller meals, avoiding fatty food, drinking fluids and increasing the dose slowly can help."

**45** · /health-library/weight-loss-improve-type-2-diabetes/ · TitleCase 6/14 · one-line paras 3/10 · sentence SD 4.6 · numbers/100w 1.5
1. "Every kilogram counts."
2. "Do not change them yourself."
3. "Even a modest loss of around 5 percent of body weight can improve blood sugar, blood pressure and cholesterol."
4. "As weight falls, sugar may drop."
5. "Losing weight can reverse part of that problem."

**45** · /health-library/when-to-see-a-diabetologist/ · TitleCase 4/12 · one-line paras 6/12 · sentence SD 6.1 · numbers/100w 1.2
1. "Good diabetes care is often a team effort."
2. "Specialist and family doctor care can work together for continuity."
3. "Regular specialist review is also useful once a year even when control is good."
4. "A diabetologist is a doctor who specialises in diabetes and related conditions."
5. "Not everyone needs one at first, but certain situations make specialist care valuable."

**44** · /health-library/can-people-with-diabetes-eat-rice/ · TitleCase 7/18 · one-line paras 8/19 · sentence SD 6.4 · numbers/100w 0.1
1. "Avoid eating late at night."
2. "Portion still matters for every type."
3. "Retains more of the outer layers and fibre."
4. "Monitoring your sugar helps you personalise this."
5. "You do not have to give up rice to manage diabetes."

**44** · /health-library/gestational-diabetes-diet-indian-foods-meal-timing/ · TitleCase 8/24 · one-line paras 6/19 · sentence SD 4.9 · numbers/100w 0.7
1. "This prevents long overnight fasting."
2. "Fruit is allowed in measured portions."
3. "Your doctor may set different targets."
4. "Ask your dietitian for a personal plan."
5. "Do not skip meals or follow extreme diets."

**43** · /health-library/best-indian-breakfast-for-diabetes/ · TitleCase 6/20 · one-line paras 8/19 · sentence SD 6.4 · numbers/100w 0.1
1. "Avoid fruit juice."
2. "Many traditional Indian breakfasts can be adapted to suit diabetes."
3. "Whole fruit can be part of breakfast in a moderate portion alongside protein, such as an apple with eggs or curd."
4. "Ragi or oats idli adds fibre."
5. "Serve with mint chutney or curd."

**43** · /health-library/diabetes-and-heart-disease-blood-sugar-metabolic-risk/ · TitleCase 7/23 · one-line paras 8/21 · sentence SD 5.3 · numbers/100w 1.7
1. "Not automatically."
2. "What Are the Warning Signs?"
3. "Ask your doctor."
4. "Treat sleep apnoea and manage stress."
5. "Your doctor will choose based on your risk."

**43** · /health-library/diabetes-and-sweets-handling-mithai/ · TitleCase 7/21 · one-line paras 4/15 · sentence SD 5 · numbers/100w 0.3
1. "The truth is more kind."
2. "Read the labels, and watch the portion."
3. "Diabetes care is about balance, not punishment."
4. "The fibre and protein slow the rise in blood sugar."
5. "Festivals, weddings and family visits all come with mithai."

**43** · /health-library/how-glp-1-medicines-are-given-injection-technique-storage/ · TitleCase 8/16 · one-line paras 4/12 · sentence SD 5.9 · numbers/100w 1.7
1. "When unsure, call your doctor."
2. "Do not take two doses close together."
3. "For weekly injections, follow the label."
4. "Good technique makes treatment easier and safer."
5. "Your doctor will tell you which schedule applies."

**43** · /health-library/what-is-diabesity/ · TitleCase 5/14 · one-line paras 3/11 · sentence SD 4.7 · numbers/100w 1.1
1. "You can improve both conditions together."
2. "Managing both through food, activity, sleep, suitable medicines and sometimes surgery can improve sugar, weight and overall health."
3. "Diabetes and some of its medicines can in turn make weight gain easier."
4. "The two conditions feed each other, so treating them together works best."
5. ""Diabesity" is an informal term for diabetes that occurs alongside obesity."

**42** · /health-library/cgm-vs-glucometer-type-2-diabetes/ · TitleCase 8/18 · one-line paras 3/13 · sentence SD 5.5 · numbers/100w 1.2
1. "Both have a place."
2. "It gives a precise reading for that moment."
3. "Understanding the difference helps you choose well."
4. "Sensors usually last 10 to 15 days and then need replacing."
5. "A tiny sensor filament sits just under the skin, held by a patch."

**42** · /health-library/first-signs-of-type-2-diabetes/ · TitleCase 6/20 · one-line paras 6/19 · sentence SD 6 · numbers/100w 1.4
1. "This is why screening matters."
2. "Blood sugar often rises gradually, and the body adjusts."
3. "Knowing the early signs helps you get tested and treated sooner."
4. "Some people lose weight without trying or feel hungrier than usual."
5. "Your doctor interprets results and often repeats a test to confirm."

**42** · /health-library/oral-glp-1-tablets-replacing-weight-loss-injections/ · TitleCase 10/18 · one-line paras 4/14 · sentence SD 4.9 · numbers/100w 2.7
1. "The truth is more nuanced."
2. "Many people dislike injections."
3. "Pills are an important step forward, but they work a little differently from injections."
4. "Some of these are in advanced trials."
5. "GLP-1 medicines are peptides, which are small proteins."

**42** · /health-library/prediabetes-hba1c-blood-sugar-symptoms-prevention/ · TitleCase 20/44 · one-line paras 46/106 · sentence SD 7 · numbers/100w 1.5
1. "The important point is consistency."
2. "Not necessarily."
3. "There is no single food plan that works for every person with prediabetes."
4. "It is a collection of manageable changes that can be maintained over time."
5. "It is also important to understand that one abnormal result does not always tell the complete story."

**40** · /health-library/dual-triple-agonists-after-semaglutide-tirzepatide/ · TitleCase 9/20 · one-line paras 4/16 · sentence SD 4.6 · numbers/100w 1.4
1. "Tirzepatide then raised the bar."
2. "Tirzepatide activates GLP-1 and GIP."
3. "But the best treatment for you is the one that is approved, safe and suited to your health."
4. "However, more targets can also mean more side effects, and careful long-term studies are needed."
5. "However, these are trial results, and the drug is not yet approved for general use at the time of writing in most places."

**40** · /health-library/fruits-for-diabetes-which-how-much-when/ · TitleCase 7/17 · one-line paras 5/16 · sentence SD 6.2 · numbers/100w 0.1
1. "Fruit does not need to be eaten only on an empty stomach, and no single fruit cures diabetes."
2. "Fruit can be a healthy, enjoyable part of a diabetes diet when chosen and portioned wisely."
3. "In reality, whole fruits provide fibre, vitamins and antioxidants and can be part of a healthy diabetes diet."
4. "Balance and portion size matter most."
5. "Your doctor or dietitian can personalise this."

**39** · /services/ · TitleCase 4/7 · one-line paras 4/8 · sentence SD 4.8 · numbers/100w 1.4
1. "Choose a service to learn what it involves, how to prepare, and how to book."
2. "In an emergency, call 108 or 112, or go to the nearest hospital emergency department."
3. "Niramay Clinics has two specialist centres, a laboratory and a pharmacy at one address."
4. "Note at the bottom: Niramay Clinics is an outpatient clinic and does not provide emergency or inpatient care."
5. "Diabetes, obesity, thyroid, blood pressure and heart tests for adults; vaccination, adolescent health and counselling for children; lab and pharmacy."

**38** · /health-library/glp-1-injections-india-why-more-affordable/ · TitleCase 9/21 · one-line paras 4/17 · sentence SD 4.8 · numbers/100w 1.9
1. "See a diabetologist before starting any GLP-1 medicine, particularly if you have a history of pancreatitis, gallstones, thyroid problems, kidney disease or pregnancy plans."
2. "GLP-1 medicines are not for everyone."
3. "Local production can also improve supply."
4. "Self-medication can lead to serious problems."
5. "When medicines are made in India, import costs fall."

**38** · /health-library/prediabetes-weight-loss-how-much-helps/ · TitleCase 7/19 · one-line paras 7/18 · sentence SD 5.4 · numbers/100w 4.1
1. "Small, steady changes add up."
2. "Discuss options with your doctor."
3. "Losing about 5 to 7 percent of your body weight, combined with regular physical activity, can significantly lower the risk of prediabetes progressing to type 2 diabetes."
4. "Reducing waist size improves metabolic health."
5. "Abdominal fat is more harmful than fat elsewhere."

**37** · /health-library/fatty-liver-and-diabetes-why-they-occur-together/ · TitleCase 5/21 · one-line paras 5/18 · sentence SD 5 · numbers/100w 1.8
1. "Most people have no symptoms."
2. "It is easy to dismiss because it causes no symptoms."
3. "It is very common in type 2 diabetes because both are driven by insulin resistance and excess belly fat."
4. "But fatty liver and diabetes feed each other, and ignoring it can lead to serious liver and heart problems."
5. "A fatty liver is a warning that can be reversed in its early stages."

**37** · /health-library/gestational-diabetes-test-when-done-results-meaning/ · TitleCase 10/20 · one-line paras 6/19 · sentence SD 4.4 · numbers/100w 3.7
1. "Here is what to expect."
2. "Continue healthy habits."
3. "It is an opportunity to protect your pregnancy with simple steps."
4. "If you vomit, inform the staff."
5. "A fasting blood sample is taken."

**37** · /health-library/glp-1-medicines-diabetes-weight-loss/ · TitleCase 20/44 · one-line paras 61/136 · sentence SD 6.2 · numbers/100w 2.5
1. "Not necessarily."
2. "There is no universal answer to this question."
3. "But persistent symptoms should not simply be ignored."
4. "There is no single group of patients who automatically "needs" a GLP-1 medicine."
5. "In practical terms, food may leave the stomach more slowly, which can affect how quickly glucose enters the bloodstream after a meal."

**37** · /health-library/how-much-weight-can-you-lose-on-glp-1-medicines/ · TitleCase 9/17 · one-line paras 4/13 · sentence SD 5.7 · numbers/100w 4.8
1. "These are averages."
2. "Some of the weight lost can be muscle."
3. "Realistic goals keep you motivated and safe."
4. "A dietitian can help with a personalised plan."
5. "Knowing what is realistic helps you set goals and avoid disappointment."

**37** · /health-library/what-is-insulin-resistance-symptoms-causes-weight/ · TitleCase 5/20 · one-line paras 3/16 · sentence SD 5.8 · numbers/100w 1.8
1. "There is no single routine test."
2. "It is closely linked to excess belly fat, inactivity, poor sleep and family history, and it can improve with weight loss, exercise and healthy eating."
3. "Many people have no symptoms."
4. "Treat sleep apnoea if present."
5. "Early testing can prevent progression."

**36** · /health-library/after-gestational-diabetes-when-to-test-for-type-2-diabetes/ · TitleCase 8/18 · one-line paras 4/14 · sentence SD 4.9 · numbers/100w 3.2
1. "Do not wait for symptoms."
2. "Visit your doctor before conceiving."
3. "But having had gestational diabetes means your body has shown a tendency to struggle with sugar."
4. "Women with a history of gestational diabetes have a significantly higher lifetime risk of type 2 diabetes."
5. "Type 2 diabetes can be silent for years, and early detection prevents complications of the eyes, kidneys, nerves and heart."

**36** · /health-library/belly-fat-diabetes-metabolic-health-waist-size/ · TitleCase 6/24 · one-line paras 4/18 · sentence SD 5.3 · numbers/100w 1.6
1. "Divide waist by height."
2. "In people with obesity or diabetes, medicines such as GLP-1 medicines or metabolic surgery may help reduce visceral fat when lifestyle is not enough."
3. "BMI does not tell you where fat is stored."
4. "No. Sit-ups alone do not remove belly fat."
5. "The difference is often where the fat sits."

**36** · /health-library/can-type-2-diabetes-be-reversed-remission/ · TitleCase 7/19 · one-line paras 5/20 · sentence SD 6.2 · numbers/100w 1.3
1. "This is not a failure."
2. "It is most likely with significant weight loss, especially soon after diagnosis, through structured diet changes, physical activity, medicines that aid weight loss or metabolic surgery."
3. "Losing excess weight, particularly fat around the liver and pancreas, can improve insulin function."
4. "Many people with type 2 diabetes ask whether their diabetes can be reversed."
5. "Remission is a realistic goal for some people with type 2 diabetes and a strong motivator for healthy change."

**36** · /health-library/cgm-in-pregnancy-when-useful-what-to-know/ · TitleCase 8/17 · one-line paras 4/13 · sentence SD 5.6 · numbers/100w 3.3
1. "A CGM may be useful for a short period to understand patterns, particularly when sugars are hard to control."
2. "Targets in type 2 and gestational diabetes may be similar, but your team will individualise them."
3. "CGM can help pregnant women with type 1 or type 2 diabetes, and may be useful in some with gestational diabetes, by showing glucose patterns day and night."
4. "A steady sugar level gives your baby the best start."
5. "Blood sugar control matters a great deal in pregnancy."

**36** · /health-library/do-glp-1-medicines-replace-metformin-or-insulin/ · TitleCase 6/14 · one-line paras 4/12 · sentence SD 6 · numbers/100w 3.1
1. "They may allow some people to reduce insulin doses, and a few may be able to stop insulin, but this depends on the person and must be decided by the doctor."
2. "GLP-1 medicines have changed diabetes care, but they do not simply swap out every older treatment."
3. "GLP-1 medicines work differently, so together they often give better control and may help weight."
4. "Never stop metformin or insulin on your own."
5. "Adjustments are made step by step with monitoring."

**36** · /health-library/how-glp-1-injection-pens-work-technology/ · TitleCase 8/22 · one-line paras 6/16 · sentence SD 6 · numbers/100w 1.1
1. "Pressing it delivers the dose."
2. "It is usually 4 to 6 mm long and very thin, which makes most injections feel like a light prick."
3. "It protects the pen and the needle."
4. "It shows the dose you have selected."
5. "Others have preset doses for weekly use."

**36** · /health-library/prediabetes-hba1c-what-the-number-means/ · TitleCase 6/18 · one-line paras 7/19 · sentence SD 5.8 · numbers/100w 3.5
1. "Your doctor will guide timing."
2. "It is one of the main tests used to detect prediabetes and diabetes."
3. "Within the prediabetes range, a higher number such as 6.2 to 6.4 percent suggests a greater risk of progressing to diabetes, so prompt action is especially important."
4. "Add vegetables, pulses, protein and whole grains."
5. "Acting now can bring your numbers back toward normal."

**35** · / · TitleCase 4/36 · one-line paras 24/35 · sentence SD 4.6 · numbers/100w 2.8
1. "We confirm your time."
2. "Bring old reports and your medicines."
3. "Targets, medicines and diet in writing."
4. "Consultant in child and adolescent health."
5. "More than 35 years of practice between them."

**35** · /health-library/does-gestational-diabetes-go-away-after-delivery/ · TitleCase 9/17 · one-line paras 3/13 · sentence SD 5.6 · numbers/100w 3.3
1. "But the story does not end there."
2. "However, some women continue to have high sugar, and all women who had it have a higher lifetime risk of type 2 diabetes."
3. "In India, where the baseline risk is already high, this is especially important."
4. "Plan early testing and monitor sugars."
5. "Your pregnancy gave you an early warning."

**35** · /health-library/why-glp-1-medicines-became-global-trend/ · TitleCase 9/17 · one-line paras 3/13 · sentence SD 6.2 · numbers/100w 1.6
1. "It is good that obesity and diabetes are finally being taken seriously."
2. "What changed so fast, and what should you take from it?"
3. "Suitability should be decided by a doctor."
4. "A doctor can assess your health and risks."
5. "A trend is not a reason to start a medicine."

**34** · /health-library/diabetes-and-obesity-diabesity-guide/ · TitleCase 18/38 · one-line paras 7/74 · sentence SD 6.5 · numbers/100w 1.1
1. "No single diet suits everybody."
2. "If you've been genuinely trying and nothing is changing, that's a reason to review the treatment."
3. "One caution."
4. "It shouldn't be."
5. "Start with insulin."

**34** · /health-library/semaglutide-vs-tirzepatide-difference-which-suits-you/ · TitleCase 8/20 · one-line paras 3/15 · sentence SD 5.4 · numbers/100w 2
1. "There is no single winner for everyone."
2. "Individual results differ."
3. "Semaglutide activates the GLP-1 receptor."
4. "They are not the same, and the right choice depends on your health, goals, tolerance and cost."
5. "Which one suits you depends on your condition, side effects, cost and availability, so a doctor should decide."

**33** · /health-library/can-prediabetes-go-away/ · TitleCase 7/19 · one-line paras 4/18 · sentence SD 6 · numbers/100w 2.8
1. "It is common and often silent."
2. "Regular testing tracks progress."
3. "Studies show that losing about 5 to 7 percent of body weight can significantly reduce the chance of developing diabetes."
4. "Medicines do not replace healthy habits."
5. "Both affect blood sugar and overall health."

**33** · /health-library/how-to-read-cgm-report-agp-time-in-range-patterns/ · TitleCase 8/23 · one-line paras 5/19 · sentence SD 4.6 · numbers/100w 3.7
1. "Lower is better."
2. "It can look overwhelming."
3. "The mean of all readings."
4. "Review them with your doctor."
5. "It is similar to HbA1c but covers only the wearing period."

**33** · /health-library/metabolic-syndrome-fatty-liver-diabetes-heart-kidney-connection/ · TitleCase 19/43 · one-line paras 6/88 · sentence SD 8.4 · numbers/100w 0.9
1. "There's no single test."
2. "That said, a few things can hint at insulin resistance."
3. "And albumin in the urine turns out to be a warning sign for the heart, not just the kidneys."
4. "And keep your follow-up appointments, particularly when you're feeling well, because that's exactly when these conditions progress unnoticed."
5. "It can."

**33** · /health-library/what-happens-when-you-stop-glp-1-weight-loss-medicine/ · TitleCase 7/20 · one-line paras 4/16 · sentence SD 5.6 · numbers/100w 2.1
1. "Not everyone."
2. "Others may restart later."
3. "Your doctor can discuss these."
4. "Obesity is a chronic condition."
5. "GLP-1 medicines lower these signals."

**33** · /health-library/who-should-not-take-glp-1-medicines/ · TitleCase 5/26 · one-line paras 6/23 · sentence SD 6.6 · numbers/100w 1.7
1. "This guide explains who and why, so you can have an informed talk with your doctor."
2. "Ask your doctor how long."
3. "Tell your surgeon and anaesthetist."
4. "But they are not right for everyone."
5. "Dose adjustments or close monitoring may be needed."

**33** · /health-library/why-hard-to-lose-weight-with-type-2-diabetes/ · TitleCase 6/27 · one-line paras 7/20 · sentence SD 6 · numbers/100w 2
1. "Ask your doctor about alternatives."
2. "Even 5 percent can improve blood sugar, blood pressure and cholesterol."
3. "Ten percent or more can improve blood sugar dramatically, and in some cases lead to remission of diabetes."
4. "GLP-1 medicines, other weight-loss medicines and metabolic surgery can be considered in suitable patients with obesity."
5. "Ask your doctor whether your diabetes medicines can be changed to ones that help weight, such as metformin, SGLT2 inhibitors or GLP-1 medicines."

**32** · /health-library/type-2-diabetes-symptoms-diagnosis-management/ · TitleCase 0/35 · one-line paras 62/125 · sentence SD 6.5 · numbers/100w 0.7
1. "It does not require fasting."
2. "There is no single HbA1c target that is appropriate for every person."
3. "There is no single monitoring schedule for every person with Type 2 diabetes."
4. "But there is no universal “diabetes food list” that works equally well for everyone."
5. "This is a common situation and does not necessarily mean the medication is ineffective."

**32** · /nutrition-lifestyle-counselling/ · TitleCase 0/7 · one-line paras 0/4 · sentence SD 5 · numbers/100w 0
1. "There is no single diet that suits everyone."
2. "A plan that works is one you can follow on a busy weekday, at a family function and during festivals."
3. "Food is the first and most neglected part of treatment for diabetes, weight, blood pressure and cholesterol."
4. "Diet plans for diabetes, weight, thyroid, blood pressure and pregnancy in Nagpur, built around Indian home food and your routine."
5. "Our trained nutrition team works with Dr. Ajay Kaduskar's patients to build eating plans around their own food, culture and routine."

**31** · /health-library/diabetes-and-kidney-disease-tests-you-should-have/ · TitleCase 6/17 · one-line paras 6/17 · sentence SD 6.2 · numbers/100w 3
1. "What Are the Warning Signs?"
2. "This is called diabetic kidney disease."
3. "The danger is that damage starts quietly, with no pain or swelling, and by the time symptoms appear, a lot of kidney function may be lost."
4. "Two simple tests can catch it early."
5. "Do not wait for symptoms to be tested."

**31** · /health-library/history-of-glp-1-drugs-natural-discovery-to-medicines/ · TitleCase 9/21 · one-line paras 3/18 · sentence SD 5.3 · numbers/100w 3.8
1. "But they did not appear overnight."
2. "It is available as a weekly injection and as a daily tablet."
3. "It also reduces glucagon, slows stomach emptying and lowers appetite."
4. "It also explains why they are used under medical supervision and why newer versions keep appearing."
5. "Higher doses were studied specifically for weight management and showed significant results."

**29** · /health-library/ · TitleCase 71/76 · one-line paras 0/3 · sentence SD 5.3 · numbers/100w 1.8
1. "Clear, reliable information written or reviewed by our doctors."
2. "Articles are for general education and do not replace a consultation."
3. "Each article shows its author, reviewer and the date it was last checked."
4. "Listing card fields: featured image, category, title, 2-line summary, author photo and name, reading time, last reviewed date."

**28** · /blooming-buds/workshops/ · TitleCase 0/4 · one-line paras 4/9 · sentence SD 4.3 · numbers/100w 1.3
1. "Workshops can be held in English, Hindi or Marathi."
2. "Sessions can be held at your school or organisation in Nagpur."
3. "We will contact you within 2 working days."
4. "Tell us about your school or group and we will contact you within 2 working days."
5. "Some health topics are best discussed in groups: with a class of students, a parents' meeting or a teachers' staff room."

**28** · /health-library/continuous-glucose-monitoring-cgm-guide/ · TitleCase 19/36 · one-line paras 13/96 · sentence SD 7.1 · numbers/100w 2.2
1. "But averages hide things."
2. "This guide covers how CGM works, who tends to get real value from it, how to read the report your doctor hands you, and where the technology falls short."
3. "Type 1 diabetes."
4. "More on this below."
5. "Some rise is normal."

**28** · /health-library/preparing-child-for-adolescence/ · TitleCase 0/6 · one-line paras 3/11 · sentence SD 5.1 · numbers/100w 0
1. "Childhood often passes smoothly."
2. "And if children learn behaviour, they can also learn to change it."
3. "This is why it helps to prepare, both ourselves and our children, well before adolescence begins."
4. "Parents ask: why don't the old methods work any more?"
5. "The goals are shared by almost every parent."

**26** · /blooming-buds/psychological-testing/ · TitleCase 0/9 · one-line paras 1/5 · sentence SD 4.7 · numbers/100w 0
1. "What are a teenager's strengths?"
2. "Why is a bright child struggling at school?"
3. "How does a young person handle emotions and relationships?"
4. "Psychological tests help answer specific questions."
5. "Results are most useful when they are explained carefully and turned into a practical plan."

**25** · /diabetes/diabetes-care-programme/ · TitleCase 0/6 · one-line paras 2/6 · sentence SD 6.4 · numbers/100w 1.9
1. "The fee is shared when you book."
2. "A structured yearly diabetes care programme in Nagpur: planned consultations, tests, complication screening and nutrition sessions."
3. "The Complete Diabetes Care Programme organises a full year of that care in advance, so nothing is missed and costs are clear from the start."
4. "Diabetes is a lifelong condition, and good care follows a rhythm: regular reviews, tests at the right intervals, and yearly screening for complications."
5. "Medicines, insulin, glucometer strips and CGM sensors, specialist referrals (for example to an eye surgeon or nephrologist), and any tests beyond the list above are charged separately."

**25** · /health-library/what-is-time-in-range-tir-diabetes/ · TitleCase 6/21 · one-line paras 4/19 · sentence SD 7.4 · numbers/100w 5.3
1. "You need a CGM."
2. "HbA1c is an average."
3. "TIR needs continuous data."
4. "Take medicines as prescribed."
5. "But HbA1c and TIR are not interchangeable."

**22** · /health-library/smart-love-parenting-teenagers/ · TitleCase 0/7 · one-line paras 4/17 · sentence SD 7 · numbers/100w 0.8
1. "Psychological autonomy."
2. "It pushes teenagers into their shell."
3. "Adolescence is the move from childhood to adulthood."
4. "We often try to teach teenagers to obey without question."
5. "Listen to their feelings and show love without conditions."

**21** · /blooming-buds/teen-mental-health/ · TitleCase 0/12 · one-line paras 3/8 · sentence SD 7.1 · numbers/100w 1.4
1. "That is part of growing up."
2. "Our clinic is not an emergency service."
3. "Most teenagers go through periods of stress, moodiness or conflict."
4. "You can also call Tele-MANAS, the Government of India's free 24-hour mental health helpline, on 14416 or 1-800-891-4416."
5. "Confidential counselling for teenagers in Nagpur: exam stress, anxiety, low mood, anger, screen overuse, bullying and self-esteem."

**21** · /health-library/self-esteem-teenagers-with-disabilities/ · TitleCase 0/7 · one-line paras 6/17 · sentence SD 8 · numbers/100w 0.1
1. "It is one of the foundations of happiness and success."
2. "Families, schools and health professionals can help them build the confidence to live full lives."
3. "If you are concerned about your teenager's confidence, mood or social life, Blooming Buds can help with assessment, counselling and guidance for the family."
4. "For most young people, when their needs are met, it can be a fairly smooth path to adulthood: further study or work, new relationships and a clearer sense of who they are."
5. "Like everyone, they want to be happy."

**20** · /obesity/body-composition-sarcopenia/ · TitleCase 0/6 · one-line paras 0/9 · sentence SD 5.4 · numbers/100w 0.9
1. "Your plan will be based on your results."
2. "Weight alone does not tell the full story."
3. "If you have a pacemaker, please tell us first."
4. "Sarcopenia is the loss of muscle mass and strength."
5. "It leads to weakness, falls, slower recovery and worse sugar control."

**20** · /thyroid-clinic/ · TitleCase 0/7 · one-line paras 0/4 · sentence SD 4.7 · numbers/100w 0.7
1. "Thyroid ultrasound is arranged through a referral when required."
2. "Most are easily diagnosed with a blood test and well controlled with treatment."
3. "The thyroid is a small gland in the neck that controls how fast the body uses energy."
4. "TSH, free T4 and, when needed, free T3 and thyroid antibodies, all available at Niramay Laboratory."
5. "Thyroid disorders are common in India, especially in women, and are more common in people with diabetes."

**18** · /about/ · TitleCase 0/14 · one-line paras 3/11 · sentence SD 6.4 · numbers/100w 1.2
1. "That is the work this practice was built for."
2. "We can help people find problems early, manage long-term conditions well, and raise children who grow up healthy and confident."
3. "We cannot promise anyone a life without illness."
4. "The practice has been caring for Nagpur since 2006."
5. "Our trained nutrition team works with patients on diet plans."

**18** · /doctors/dr-prajakta-kaduskar/ · TitleCase 1/5 · one-line paras 1/6 · sentence SD 6.9 · numbers/100w 1.4
1. "Teenagers need privacy and parents need to be informed."
2. "Anything that affects the young person's safety is always shared."
3. "She has more than 15 years of experience caring for babies, children, teenagers and young adults."
4. "She conducts workshops for students, parents and teachers on mental wellness, healthy lifestyle, puberty, digital safety, bullying and life skills."
5. "This combination lets her look at a young person's physical health, emotional health and behaviour together, which is often where the real answer lies."

**17** · /doctors/dr-ajay-kaduskar/ · TitleCase 1/11 · one-line paras 1/5 · sentence SD 5.7 · numbers/100w 3.7
1. "This is why the clinic has its own retinal camera, Echo, ECG and treadmill testing, and laboratory: so that screening is part of routine care, not an extra errand."
2. "keep things simpleThe note framed in Dr. Kaduskar's consulting room, and how care is planned here."
3. "He has more than 20 years of experience caring for people with type 2 diabetes, type 1 diabetes, diabetes in pregnancy, obesity, high blood pressure, abnormal cholesterol (dyslipidaemia) and heart disease."
4. "His particular interests are preventing the long-term complications of diabetes (eye, kidney, nerve, foot and heart damage) and preventive cardiology, which means finding and treating heart risk before a heart attack or "

**16** · /blooming-buds/career-counselling/ · TitleCase 0/11 · one-line paras 1/5 · sentence SD 5.7 · numbers/100w 2.8
1. "That matters because career confusion often comes with anxiety, low confidence or family conflict, and those are addressed too."
2. "It helps them understand their abilities, interests and personality, and match them with realistic options."
3. "Good career counselling does not tell a student what to become."
4. "Career counselling at Blooming Buds is led by Dr. Prajakta Kaduskar, who brings training in adolescent health and clinical psychology."
5. "Career guidance for students in classes 8 to 12 and graduates in Nagpur: aptitude and interest assessment, stream and course selection."

**16** · /health-library/menstrual-hygiene-teenage-girls/ · TitleCase 0/9 · one-line paras 6/16 · sentence SD 7 · numbers/100w 2.2
1. "Times have changed."
2. "It is fine to try different products."
3. "Change often and keep the area dry."
4. "Choose what keeps you comfortable and dry."
5. "See a doctor if it does not improve in a few days."

**15** · /blooming-buds/ · TitleCase 0/5 · one-line paras 0/5 · sentence SD 6.5 · numbers/100w 0.7
1. "It is also when many lifelong habits around food, sleep, screens and relationships are formed."
2. "Children grow fast, and every stage brings new questions."
3. "We care for the body and the mind together, with parents as partners."
4. "Adolescence, roughly 10 to 19 years, is a period of rapid physical, emotional and social change."
5. "Blooming Buds at Niramay Clinics: baby check-ups, vaccination, teen health, counselling and career guidance with Dr. Prajakta Kaduskar."

**15** · /diabetes/complications-screening/ · TitleCase 0/7 · one-line paras 0/5 · sentence SD 7.1 · numbers/100w 0
1. "Found early, much of it can be slowed or treated."
2. "Screening is a central part of diabetes care at Niramay Clinics, and most of it can be completed in one visit at the clinic."
3. "If a clearer view is needed, we use drops to widen the pupil, and your vision may be blurry for a few hours, so it is best not to drive yourself home that day."
4. "Early damage usually causes no symptoms."
5. "Most of the time no eye drops are needed."

**15** · /diabetes/type-1-diabetes/ · TitleCase 0/6 · one-line paras 1/6 · sentence SD 5.7 · numbers/100w 2.4
1. "DKA is an emergency."
2. "It is not caused by eating sugar or by anything the person or parents did."
3. "Insulin is needed every day, for life."
4. "Living well with type 1 diabetes is entirely possible."
5. "Never stop insulin during illness, even if not eating."

**14** · /health-library/diabetes-myths-and-facts/ · TitleCase 0/15 · one-line paras 2/14 · sentence SD 6.6 · numbers/100w 1.5
1. "But type 2 diabetes involves both insulin resistance and a gradual fall in the body's own insulin, so many people also need medicines to reach their targets."
2. "Fact: Diabetes is a long-term condition that can be managed well."
3. "With good control of sugar, blood pressure and cholesterol, the risk of complications falls considerably."
4. "Medicines are chosen with your kidney function in mind, several of them protect the kidneys and the heart, and your kidney tests are checked regularly so treatment can be adjusted."
5. "Needing them is not a failure."

**14** · /heart-care/2d-echo/ · TitleCase 0/6 · one-line paras 1/8 · sentence SD 5.3 · numbers/100w 2.1
1. "No fasting is needed."
2. "Wear a two-piece outfit."
3. "Take your usual medicines."
4. "You lie on your left side."
5. "The test usually takes 20 to 30 minutes."

**14** · /heart-care/ecg/ · TitleCase 0/4 · one-line paras 1/7 · sentence SD 4 · numbers/100w 2.4
1. "Your doctor may then advise a treadmill test or Echo."
2. "If you have chest pain right now, do not book an ECG."
3. "What it records, when it is needed, and what to expect."
4. "A quick, painless ECG at Niramay Clinics, Dhantoli, Nagpur."
5. "It takes about 5 to 10 minutes, is painless and needs no preparation."

**14** · /heart-care/tmt-stress-test/ · TitleCase 0/5 · one-line paras 1/8 · sentence SD 6.3 · numbers/100w 1.1
1. "Some heart problems, particularly reduced blood flow from narrowed arteries, show up only when the heart is working harder."
2. "Your doctor will check this before the test."
3. "The speed and slope increase every few minutes."
4. "Treadmill stress test (TMT) in Dhantoli, Nagpur."
5. "Your doctor will explain your result in context."

**14** · /lab/ · TitleCase 0/4 · one-line paras 1/7 · sentence SD 6.3 · numbers/100w 1.9
1. "Sundays closed."
2. "Niramay Laboratory is on the premises of Niramay Clinics, so most tests can be done on the day of your consultation and reviewed by your doctor without another trip."
3. "Timings: 7 am to 7 pm, Monday to Saturday."
4. "Most routine reports are ready the same day."
5. "Collect them at the clinic or ask us to send them to you."

**14** · /preventive-health-check-ups/ · TitleCase 0/4 · one-line paras 1/7 · sentence SD 7 · numbers/100w 1.9
1. "Bring previous reports."
2. "Fees are shared when you book."
3. "You never leave with only a printed report."
4. "Fast for 10 to 12 hours before the visit (water is allowed)."
5. "Every check-up at Niramay Clinics ends with a doctor's consultation."

**13** · /plan-your-visit/ · TitleCase 0/14 · one-line paras 1/10 · sentence SD 5.4 · numbers/100w 3.4
1. "Fees are shared when you book."
2. "We accept cash, UPI and cards."
3. "Look for the Niramay Clinics boards at the gate."
4. "The clinic has lift access and a wheelchair-friendly entrance."
5. "Where you are admitted depends on where you live and the care you need."

**11** · /lab/home-sample-collection/ · TitleCase 0/8 · one-line paras 1/5 · sentence SD 7.6 · numbers/100w 1.8
1. "Samples are tested in our own lab."
2. "Home blood sample collection in Nagpur with Niramay Laboratory."
3. "Prior booking, trained phlebotomists, reports shared with your doctor."
4. "We collect samples at home anywhere in Nagpur city (within about 15 km of Dhantoli), from 7 am, Monday to Saturday, at no extra charge."
5. "For elderly patients, people with limited mobility, busy families, or anyone who prefers not to travel, our laboratory team can collect blood and urine samples at home."

**10** · /blooming-buds/adolescent-health/ · TitleCase 0/7 · one-line paras 0/4 · sentence SD 7.4 · numbers/100w 1.2
1. "Many teenagers find these topics awkward to raise."
2. "The teenage years bring the fastest growth since infancy."
3. "Our clinic gives them a private, respectful place to ask."
4. "Bodies change, appetites change, sleep shifts later, and new health concerns appear."
5. "Teen health care in Nagpur: growth and puberty, periods and PCOS, anaemia, weight, acne and nutrition, with Dr. Prajakta Kaduskar."

**10** · /diabetes/ · TitleCase 0/12 · one-line paras 1/6 · sentence SD 7.2 · numbers/100w 3.1
1. "Diabetes is now one of the most common long-term conditions in India."
2. "Type 1, type 2 and pregnancy diabetes, prediabetes, thyroid and blood pressure care with Dr. Ajay Kaduskar in Dhantoli, Nagpur."
3. "At the Niramay Diabetes and Heart Care Centre, Dr. Ajay V. Kaduskar and the clinic team look after people with diabetes for the long term."
4. "Many people with type 2 diabetes have no symptoms for years, which is why diagnosis is often late and complications are sometimes the first sign."
5. "The national ICMR-INDIAB study estimated that about 101 million Indians were living with diabetes in 2021, and another 136 million had prediabetes."

**10** · /faqs/ · TitleCase 1/33 · one-line paras 0/2 · sentence SD 5 · numbers/100w 4.3
1. "Answers about appointments, timings, lab tests, home sample collection, pharmacy, reports, fees and privacy at Niramay Clinics, Nagpur."

**10** · /hypertension-clinic/ · TitleCase 0/8 · one-line paras 0/4 · sentence SD 5.7 · numbers/100w 3.2
1. "At home, the threshold is lower: an average of 135/85 mmHg or higher."
2. "Readings between 120/80 and 139/89 are above the ideal range and deserve attention, especially with diabetes."
3. "High blood pressure is often called a silent condition because most people feel nothing until it causes damage."
4. "The ICMR-INDIAB study estimated that more than a third of Indian adults have high blood pressure, and many do not know it."
5. "Over years, uncontrolled blood pressure strains the heart, kidneys, eyes and brain and raises the risk of heart attack and stroke."

**10** · /obesity/weight-management-medicines/ · TitleCase 0/10 · one-line paras 0/7 · sentence SD 8.2 · numbers/100w 0.4
1. "They can be ineffective or dangerous."
2. "Thinking about weight-loss injections or tablets?"
3. "They can help some people lose a meaningful amount of weight and improve sugar, blood pressure and other health markers."
4. "Less commonly, gallbladder problems or pancreatitis."
5. "Who they may suit, why medical supervision matters, and how we assess you."

**10** · /pharmacy/ · TitleCase 0/3 · one-line paras 0/4 · sentence SD 5.1 · numbers/100w 2.9
1. "Sundays closed."
2. "Our pharmacy is a licensed retail pharmacy."
3. "Phone: +91 90213 51693 Timings: Monday to Saturday, 8:30 am to 8 pm."
4. "Licences are displayed at the pharmacy, and medicines are dispensed by a registered pharmacist."
5. "Niramay Pharmacy at Niramay Clinics, Dhantoli: prescribed medicines dispensed by a registered pharmacist, with home delivery in Nagpur."

**9** · /heart-care/ · TitleCase 0/7 · one-line paras 1/8 · sentence SD 6.3 · numbers/100w 2.3
1. "Do not drive yourself."
2. "It is one of Dr. Ajay Kaduskar's special interests, and the clinic has 2D Echo, ECG and treadmill testing (TMT) on site."
3. "Important: Niramay Clinics provides heart risk assessment and non-invasive heart tests."
4. "When a test shows significant heart disease, we refer you to a cardiologist or hospital promptly."
5. "Most are linked to risk factors that can be found and treated years earlier: high blood pressure, diabetes, high cholesterol, smoking, abdominal obesity, inactivity and family history."

**7** · /diabetes/type-2-diabetes/ · TitleCase 0/10 · one-line paras 1/13 · sentence SD 8.3 · numbers/100w 1.9
1. "Home monitoring."
2. "Setting your targets."
3. "Medicines when needed."
4. "Then eat a small snack."
5. "Food and activity first."

**5** · /blooming-buds/well-baby-clinic/ · TitleCase 0/6 · one-line paras 1/6 · sentence SD 9.6 · numbers/100w 5.1
1. "After 2 years, once or twice a year."
2. "In a baby under 3 months: any fever."
3. "Healthy babies need regular check-ups too."
4. "Go to the nearest children's emergency department."
5. "Regular baby check-ups in Nagpur: growth charts, milestones, feeding, sleep and vaccination reminders with Dr. Prajakta Kaduskar."

**5** · /diabetes/diabetes-in-pregnancy/ · TitleCase 0/7 · one-line paras 0/6 · sentence SD 7.1 · numbers/100w 2.4
1. "Planning before conception is ideal."
2. "Your gynaecologist remains in charge of your pregnancy; we take care of the sugar."
3. "Gestational diabetes (GDM): high blood sugar that is first found during pregnancy."
4. "When a woman has diabetes during pregnancy, two people are being cared for at once."
5. "Pre-existing diabetes: a woman with type 1 or type 2 diabetes who becomes pregnant, or plans to."

**5** · /diabetes/prediabetes-risk-assessment/ · TitleCase 0/8 · one-line paras 0/5 · sentence SD 6.7 · numbers/100w 2.7
1. "It is the stage where action pays off most: lifestyle changes started now can delay or prevent type 2 diabetes for many people."
2. "In India, more people have prediabetes than diabetes."
3. "Prediabetes means your blood sugar is higher than normal but not yet in the diabetes range."
4. "A prediabetes check in Nagpur for people with family history, weight gain or past borderline sugars: HbA1c, glucose tests and a prevention plan."

**5** · /obesity/ · TitleCase 0/9 · one-line paras 0/6 · sentence SD 6.6 · numbers/100w 2.2
1. "Obesity is a long-term medical condition, not a lack of willpower."
2. "Indians tend to carry more fat, especially abdominal fat, at a lower body weight."
3. "Genes, hormones, sleep, stress, medicines, work patterns and the food around us all play a part."
4. "Doctor-led obesity care in Nagpur with a SCOPE-certified consultant: diet and activity plans, medicines when appropriate, and tracking."
5. "The focus is on health, not a number on the scale: lowering harmful fat, protecting muscle, and improving sugar, blood pressure, liver health and energy."

**5** · /plan-your-visit/coming-from-outside-nagpur/ · TitleCase 0/5 · one-line paras 0/6 · sentence SD 7.5 · numbers/100w 3.5
1. "Travelling from Wardha, Bhandara, Umred, Katol or nearby towns?"
2. "Two-wheeler parking is available at the building."
3. "Half our patients travel to us from towns and villages around Nagpur."
4. "Plan your visit so consultation, tests and medicines are done in one trip."
5. "This page helps you plan the trip so your consultation, tests and medicines are finished in one visit."

**5** · /vaccination/ · TitleCase 0/9 · one-line paras 0/4 · sentence SD 6.3 · numbers/100w 2.3
1. "We note the next due date on your child's vaccination record at every visit."
2. "Vaccines are one of the safest and most effective ways to protect against serious infections."
3. "Vaccinations at Niramay Clinics, Nagpur, following the IAP schedule for children and current guidance for teens and adults, including HPV and flu."
4. "All vaccines in the IAP schedule, from birth through childhood, including the vaccines given in the national programme and the optional vaccines recommended by IAP."
5. "We give vaccines for babies, children, teenagers and adults, following the Indian Academy of Pediatrics (IAP) immunisation schedule for children and current national and professional guidance for adults."
<!--/GEN:ai-->

---

## 8. Entities, People-Also-Ask and facts to check (items 44, 47, 58, 59)

### 8a. Entity gaps and missing questions on key pages

Supporting articles inherit their pillar's entity map. Only gaps specific to them are listed.

| Page | Primary entity | Related entities a top-ranking page covers that are missing or thin here | Missing PAA / cost / "vs" questions |
|---|---|---|---|
| /diabetes/ | Diabetes mellitus | Type comparison table (T1 vs T2 vs GDM), symptoms section, medicine classes (metformin, SGLT2i, DPP-4i, GLP-1 RA, insulin), cost, diabetologist vs endocrinologist | "What does a diabetologist consultation cost in Nagpur?" "Diabetologist vs endocrinologist?" "Is HbA1c 6.5 diabetes?" |
| /diabetes/type-2-diabetes/ | Type 2 diabetes | Symptoms, diagnostic criteria (FPG/OGTT/HbA1c on this page), named medicine classes, remission (link the support), complications timeline, cost of yearly care | "Can type 2 diabetes be cured permanently?" "Which is the best medicine for type 2 diabetes?" "Metformin side effects?" |
| /diabetes/type-1-diabetes/ | Type 1 diabetes | DKA warning signs, honeymoon phase, carb counting, insulin pump/CGM, school plan, T1 vs T2 table | "Insulin pump cost in India?" "Can type 1 diabetes be reversed?" "Type 1 vs type 2?" |
| /diabetes/diabetes-in-pregnancy/ | Gestational diabetes | DIPSI 75 g single-step test (Indian standard), targets, baby risks (macrosomia, neonatal hypoglycaemia), postpartum OGTT at 6-12 weeks, link to GDM pillar | "What sugar level is gestational diabetes in India?" "Does GDM harm the baby?" "Will I need insulin?" |
| /diabetes/prediabetes-risk-assessment/ | Prediabetes | Indian Diabetes Risk Score (IDRS), ranges (HbA1c 5.7-6.4, FPG 100-125), Indian Diabetes Prevention Programme evidence, package price | "Can prediabetes be reversed in 3 months?" "Is HbA1c 6.0 prediabetes?" "Prediabetes test cost?" |
| /diabetes/complications-screening/ | Diabetic complications screening | UACR/eGFR, monofilament + biothesiometry (VPT), ABI for PAD, frequency table, cost | "How often should a diabetic get an eye test?" "What is a diabetic foot test?" |
| /obesity/ | Obesity | Asian BMI cut-offs (23/25), waist cut-offs, causes, treatment ladder incl. bariatric thresholds for Asians, cost | "What BMI is obese for Indians?" "Is bariatric surgery safe?" "Weight-loss treatment cost in Nagpur?" |
| /obesity/weight-management-medicines/ | Anti-obesity medicines | Generic names (orlistat, liraglutide, semaglutide, tirzepatide), eligibility, side effects, monthly cost in rupees, regain after stopping (link GLP-1 pillars) | "Semaglutide price in India?" "Who should not take weight-loss injections?" |
| /heart-care/ | Preventive cardiology | Risk factors, test comparison (ECG vs Echo vs TMT vs lipid profile), heart-attack warning signs, cost | "Which heart test is best for a check-up?" "ECG vs 2D echo vs TMT?" |
| /heart-care/ecg/ · /2d-echo/ · /tmt-stress-test/ | ECG / echocardiography / exercise stress test | What each detects and misses, report time, cost, preparation (TMT has it), sensitivity limits | "ECG cost in Nagpur?" "Can ECG detect blockage?" "Can I eat before a TMT?" "2D echo vs TMT?" |
| /thyroid-clinic/ | Thyroid disorders | Hypo vs hyper table, TSH ranges, pregnancy and thyroid, nodules/goitre, iodine | "What is a normal TSH level?" "Can thyroid be cured?" "Hypothyroidism vs hyperthyroidism?" |
| /hypertension-clinic/ | Hypertension | BP categories, home-monitoring technique, salt under 5 g, medicine classes, white-coat hypertension | "What is normal BP by age?" "Can I stop BP tablets?" |
| /nutrition-lifestyle-counselling/ | Medical nutrition therapy | Glycaemic index/load, katori-based portions, sample day plan, link to Diet pillar | "Which atta is best for diabetes?" "Is jaggery better than sugar?" |
| /preventive-health-check-ups/ | Health check-up | Package contents by age and sex, prices, frequency | "Full body check-up price in Nagpur?" "Which tests after 40?" |
| /blooming-buds/well-baby-clinic/ | Well-baby care | Milestone ages, WHO/IAP growth charts, feeding, visit schedule | "How often should a baby see a paediatrician?" |
| /vaccination/ | Immunisation | IAP schedule table by age, UIP-free vs optional vaccines, side effects, catch-up, HPV age, costs | "Which vaccines are optional in India?" "HPV vaccine cost?" |
| /blooming-buds/adolescent-health/ | Adolescent health | Puberty age ranges, PCOS, anaemia (Hb cut-offs, IFA), acne, confidentiality | "When should a girl see a doctor for irregular periods?" |
| /blooming-buds/teen-mental-health/ | Adolescent mental health | Screening tools (PHQ-A), sessions and fees, self-harm pathway (Tele-MANAS present) | "How many counselling sessions are needed?" "Counselling fees?" |
| /blooming-buds/psychological-testing/ | Psychometric assessment | Named tests (e.g. WISC/MISIC, Binet-Kamat), SLD certification, duration, fee | "IQ test cost in Nagpur?" "Do you give learning disability certificates?" |
| /blooming-buds/career-counselling/ | Career guidance | Aptitude batteries used, age/class, report format, fee | "Career counselling fees?" "Best test after 10th?" |
| /lab/ · /lab/home-sample-collection/ | Pathology laboratory | NABL status, test menu, turnaround, fasting rules, prices, home-collection area and charge | "Is the lab NABL accredited?" "HbA1c report time?" |
| /doctors/dr-prajakta-kaduskar/ | Dr. Prajakta A. Kaduskar | Registration no., memberships, hospital affiliations, longer bio (397 words), FAQs | "Is Dr. Prajakta a paediatrician?" "Timings and fees?" |
| C1 T2D pillar | Type 2 diabetes | Named medicine classes, RSSDI guidance, cost of care | "Type 2 diabetes medicine cost per month in India?" |
| C2 Prediabetes pillar | Prediabetes | IDRS, IDPP trial, Indian HbA1c data | "Can prediabetes turn into diabetes in a year?" |
| C3 Diet pillar | Diabetes diet | GI table of Indian staples, katori portions, sample plans for veg/non-veg | "Which rice is best for diabetes?" |
| C4 GLP-1 India pillar | GLP-1 RA cost and access | Dated rupee ranges, generic semaglutide status, CDSCO approval, insurance | "GLP-1 injection price per month in India?" "Ozempic vs Wegovy vs Mounjaro?" |
| C5 Technology pillar | GLP-1 drug development | (Mostly complete) Timeline table with years | "When was semaglutide approved in India?" |
| C6 Diabesity pillar | Diabesity | Asian BMI and bariatric thresholds | "Can weight loss reverse diabetes?" (link support) |
| C7 GLP-1 medicines pillar | GLP-1 receptor agonists | Contraindications (MTC/MEN2), dosing tables, overlap with C4 (KW-001) | "Semaglutide vs tirzepatide?" (link support) |
| C8 CGM pillar | Continuous glucose monitoring | Sensor cost in rupees, accuracy (MARD), TIR target over 70% | "CGM sensor price India?" "Is CGM accurate?" |
| C9 GDM pillar | Gestational diabetes | DIPSI/FOGSI criteria, postpartum testing schedule | "Is 140 after 2 hours GDM?" |
| C10 Metabolic syndrome pillar | Metabolic syndrome | IDF criteria with Asian waist cut-offs, MASLD terminology | "Is fatty liver reversible?" |

### 8b. Facts for a doctor to check (item 59)

- "Get your blood sugar checked from age 30" (myth post, /diabetes/). Sensible for Indian risk, but ADA screens from 35. Cite RSSDI/ICMR if keeping 30.
- Waist cut-offs "90 cm men / 80 cm women" (/diabetes/). These are the IDF Asian values. Cite them.
- STEP 2 "9.6% over 68 weeks" and SURMOUNT-2 "12.8% (10 mg) / 14.7% (15 mg) / 3.2% placebo" (GLP-1 India pillar). Correct per the trials, but add DOIs.
- Remission "HbA1c below 6.5% for at least three months" (Diabesity pillar). Matches the 2021 consensus. Cite it.
- GLP-1 affordability claims ("prices falling", "more competition"). Time-sensitive. Date them and confirm the current Indian market position.
- Hypoglycaemia "15 g rule" (/diabetes/type-2-diabetes/). Correct. Keep it.

---

## 9. Top 5 AI-answer queries: what an engine needs to quote this site

| Query | What an AI answer needs | What is missing today |
|---|---|---|
| "Best diabetologist in Nagpur / diabetes doctor in Dhantoli" | Indexable profile; a quotable line (name, qualifications, years, clinic, area, OPD hours, fee); registration no.; GBP with reviews; consistent NAP | Site is noindex (CRAWL-001); no registration no.; no GBP sameAs; no fee; AI portrait |
| "GLP-1 / semaglutide injection price in India" | Dated rupee ranges with a source, starter vs maintenance dose cost, who qualifies, doctor-reviewed | "₹X/₹Y" placeholder; 0 rupee figures; self-review; two pillars split the topic (KW-001) |
| "Child specialist / teen counsellor in Nagpur" | Rich paediatrician profile, services with fees, FAQs, confidentiality policy | Dr. Prajakta labelled "Diabetologist"; profile is 397 words, no FAQs, no reg. no.; /blooming-buds/ has 0 FAQs and doesn't link its sub-pages |
| "Gestational diabetes test and diet in India" | DIPSI criteria, Indian meal plans, postpartum testing, one clear owner page | Service page and GDM pillar compete and don't link each other; no DIPSI/FOGSI citation |
| "ECG / 2D echo / TMT test cost in Nagpur" | Price, duration, preparation, report time, comparison table | No prices, no comparison table, 0-2 FAQs on these pages, "painless" wording |
