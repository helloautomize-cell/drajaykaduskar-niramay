# SEO Changelog — Niramay Clinics — 24 Oct 2026

Internal, technical. All changes uncommitted in the working tree (no branch/commits per project rule). Issue IDs refer to `seo-audit/audit.json`. Verification: `npm run build` + `next start` on :3020 with `SITE_INDEXABLE=true`, curl-checked raw HTML.

## A. Crawl access & indexability

- **TECH-001** `app/robots.ts` — added `export const dynamic = "force-dynamic"` so robots.txt is generated per request (reads `SITE_INDEXABLE` at serve time, not build time). Verified: `/robots.txt` now returns `Allow: /` + utility disallows when the flag is on, `Disallow: /` when off.
- **TECH-001** `app/layout.tsx` — removed the build-time-baked `robots: {index:false}` meta. Noindex now lives only in the `X-Robots-Tag` header set per-request by `proxy.ts`, so a flag flip no longer requires a rebuild. Verified: no `<meta name="robots">` in output.
- **TECH-002** `app/sitemap.ts` — filter now drops `""` and non-`/` URLs. Sitemap went 52 → 51 entries; the bare-domain `https://www.niramayclinics.com` (no slash) entry from `404.md` is gone.
- **TECH-003** `next.config.ts` — `/videos` and `/contact/thank-you` changed `permanent:false` → `true` (307 → 308). Note: slash-less legacy URLs still take 2 hops (`/videos` →308→ `/videos/` →308→ `/`) — trailing-slash normalization runs before redirect matching in Next.js, unavoidable via config; slash-form requests (the common case, matching old WP permalinks) are single-hop.
- **TECH-011** `app/robots.ts` — AGENTS list completed: added `Claude-User`, `Perplexity-User`, `Applebot`, `CCBot`, `Meta-ExternalAgent`.

## B. Rendering

- **TECH-010** — NOT FIXED: appointment/workshop forms still require JS (`useSearchParams` inside the client form keeps them out of the prerender). Phone/WhatsApp CTAs cover no-JS users. Effort M; parked for a later session.

## C. Structured data

- **SCH-001** `lib/seo.tsx` — `physicianExtras.prajakta` now emits `hasCredential` (MBBS, DCH, PGDAP, MA Clinical Psychology) and `knowsAbout` (7 topics). Verified: 4 credential nodes in her @graph. `identifier`/`sameAs` still pending client data (reg numbers, GBP URLs).
- **SCH-002** `lib/seo.tsx` + `app/(site)/[...slug]/page.tsx` — new `webPageNode()` emits WebPage/AboutPage/ContactPage/CollectionPage per the frontmatter `schema` field on non-medical pages (about, contact, services, faqs, health-library, plan-your-visit, legal pages). `medicalWebPageNode` `about` fallback changed from fabricated `MedicalProcedure` to `{@id: #clinic}`.
- **TECH-006** `lib/seo.tsx` — `pageMetadata` og:type now `profile` on doctor pages, `website` elsewhere (was `article` everywhere).

## D. E-E-A-T

- **EEAT-002** `components/sections/ReviewerBox.tsx` + ServiceDetail/ServiceHub/Editorial templates — templates now pass `lastReviewed` (real git-derived `page.modified`, same date as schema) and `nextReview` (`plusYear` helper added to `lib/utils.ts`). Verified: "Last reviewed: 2 October 2026 · Next review due: 2 October 2027".
- **EEAT-003** `app/(site)/[...slug]/page.tsx` — passes `site.legalLastUpdated` ("21 August 2026") into `LegalTemplate`. Verified on /privacy-policy/.
- **EEAT-006** new `components/sections/ReviewByline.tsx` — compact above-fold "Medically reviewed by Dr. X · Last reviewed <date>" rendered under the H1 on service/hub/editorial pages.
- **CONTENT-005** "Next review due" now renders a computed date instead of the literal "12 months later".
- **EEAT-004** — Sources sections added to 11 medical pages (ICMR-INDIAB DOI, WHO fact sheets, ADA Standards, MedlinePlus, IAP) — see DOCTOR_REVIEW_QUEUE for the exact files.
- **CONTENT-002** — "When to see a doctor" safety blocks added to 6 pages (obesity, thyroid, hypertension, complications-screening, adolescent-health, prediabetes).
- **EEAT-001, EEAT-005, EEAT-007, CONTENT-006** — NOT FIXED (need client input: reg numbers, real photos decision, lawyer sign-off, doctor quotes).

## E. Content & entities

- **CONTENT-004** — `vaccination.md`: new "Which vaccines are available" section naming BCG, hep B, polio, DPT, Hib, rotavirus, pneumococcal, MMR, typhoid, hep A, chickenpox, HPV, flu, Tdap. `obesity.md`: bariatric-surgery referral boundary + adolescent scope note.
- **TECH-004** — meta_description written for all 6 legal pages that had none.
- **TECH-009** — `seo_title` overrides: editorial-policy (61→49 chars), patient-rights (61→40 chars).
- **CONTENT-003** — `/blooming-buds/` hub: new "One centre, one record" section (light expansion; fuller pillar deepening parked pending doctor input).
- **AEO-001** — partial: stats now have cited sources via Sources sections; INR cost data still pending client.

## F. Interlinking

- **LINK-001** — "Explore" lists on `/diabetes/`, `/heart-care/`, `/obesity/` converted to real links. ~60 contextual markdown links added across 26 pages (supports → pillar, siblings, related services, blog cross-links) — first in-prose links on the site.
- **LINK-002** — removed the `/vaccination/` exclusion in `hubSubServices()`; the Blooming Buds hub now lists it.
- **LINK-004** — blog posts each gained 1-2 in-copy links to service pages; `/diabetes/` hub links the diabetes-myths post.
- **TECH-007** — `/services/` added to `patientInfoLinks` (header Patient Info menu + footer column).
- **LINK-003** — doctor-page breadcrumb mid-crumb relabeled to its actual destination ("About" → `/about/`).

## G. FAQs

- **FAQ-001** — new FAQ sections: workshops +4, ecg +4, tmt +4, body-composition +3, lab +3, home-sample-collection +3, pharmacy +3, blooming-buds hub +4, coming-from-outside +3 (31 new Q&A). Top-ups to ≥4: well-baby +1, psych-testing +2, heart-care +2, 2d-echo +2, care-programme +2, preventive +2, complications-screening +1, nutrition +1, prediabetes +1 (14 more). Rendered via existing FaqAccordion pipeline so visible text and FAQPage schema stay identical.

## H. Cleanup

- **TECH-008** — `public/images/alt-text.json` → `lib/alt-text.json` (now imported via new `lib/alt-text.ts`); `public/images/_todo.md` → `resources/docs/images-todo.md`. No longer publicly served.
- **TECH-005** — ServiceDetail/ServiceHub hero `<Image>` alt now resolves through the alt map (`altFor()`) instead of reusing the H1.

## Verification results (post-fix build)

- `/robots.txt`: `Allow: /` + disallows on 3 utility routes ✓ · per-UA rules for 15 bots ✓
- `<meta robots>`: absent ✓ (X-Robots-Tag still enforced per-request when flag off)
- sitemap.xml: 51 canonical trailing-slash URLs, real lastmod ✓
- /diabetes/: byline above fold, "Last reviewed: 2 October 2026", Explore list = links, Sources section, FAQ schema present ✓
- /privacy-policy/: "Last updated: 21 August 2026", meta description, WebPage node ✓
- /heart-care/ecg/: 4 FAQ Questions in schema matching visible accordion ✓
- /blooming-buds/: /vaccination/ linked, new FAQs + section ✓
- /doctors/dr-prajakta-kaduskar/: Physician node now has hasCredential×4, knowsAbout ✓
- lint ✓, tsc ✓, build ✓ (113 routes)

## Not fixed / deferred

| Issue | Reason |
|---|---|
| EEAT-001 reg numbers, SCH-001 identifier/sameAs | needs client input |
| CONTENT-001 fees/INR | needs client price list |
| EEAT-005 AI portraits | client decision pending |
| EEAT-007 lawyer review, CONTENT-006 doctor quotes | needs client input |
| TECH-010 no-JS form shell | effort M, conversion element, phone/WhatsApp cover |
| TECH-003 residual 2-hop on slash-less legacy URLs | Next.js platform behavior |
| CONTENT-003 deeper hub expansion | parked until doctor quotes available |
| TECH-012 case-sensitivity, #24 Lighthouse, WAF rules | must run on the live domain |

---

# Prompt 2 fixes — 24 Oct 2026 (v2, post-pull)

Verification: `npm run build`, `npm run lint`, `tsc --noEmit` clean; `next start` on :3031 with `SITE_INDEXABLE=true`; JS-off crawl of all 111 URLs.

## Indexability & crawling
- `app/(site)/[...slug]/page.tsx` — removed hard-coded `robots: {index:true, follow:true}` from post metadata (CRAWL-002). robots.ts already `force-dynamic` + full AI allow-list (TECH-005 verified complete).

## Navigation & internal links
- `components/layout/Header.tsx` — the pre-JS stand-in now renders real `<a>` links to section hubs plus an sr-only list of all 30+ menu links (TECH-001).
- `components/layout/Footer.tsx` + `lib/nav.ts` — new columns: Doctors (profiles + About), Lab and Pharmacy; "Contact us" added to Patient Info (EEAT-008).
- `app/(site)/page.tsx` — home service tabs 2-4 links now in server HTML via sr-only list (TECH-003); home graph gets a WebPage node (SCH-005).
- `app/(site)/[...slug]/page.tsx` — `relatedArticlesFor()` inverts post `related:` frontmatter + cluster map; `parent` crumb passed down. `ServiceDetail`/`ServiceHub` render "From our Health Library" + "Part of <hub>" (LINK-001/002). blooming-buds hub got its missing Explore list.

## Schema
- `lib/seo.tsx` — CONDITIONS entries carry Wikipedia + MeSH `sameAs` (SCH-007); MedicalSpecialty values use schema.org enums; `serviceNode()` emits typed entities (MedicalProcedure/MedicalTherapy/MedicalTest/Service/Pharmacy) with `#service` @ids (SCH-004); `webPageNode()` for non-medical page types with `aboutId` option; `medicalWebPageNode` about falls back to clinic/service/test @id — never a fabricated entity (SCH-001); TOPICS map gives each cluster a typed entity (MedicalCondition/DrugClass/Diet/MedicalDevice) with shared @id; post crumbs point at the real pillar URL; `videoNode` uses per-video `#video-<id>` (SCH-005); `lastReviewed`/`reviewedBy` only emitted with real values (SCH-002/006); `pageMetadata` adds Twitter card + og:type website/profile/article (TECH-006).

## E-E-A-T & content
- `lib/doctors.ts` — new `bylineRole`: Ajay "Diabetologist", Prajakta "Child and adolescent specialist" (EEAT-001).
- `ReviewerBox` — same author+reviewer renders "Written and medically reviewed by" (EEAT-002); templates show `formatDate(meta.reviewed || modified)` and +12m next review (EEAT-003/004); `BlogPost` drops hard-coded Oct 2026/2027.
- `lib/content/schema.ts` — optional `reviewed:` frontmatter field (page + post).
- Contact page: real `tel:`/`wa.me` links, Google Maps directions link, obfuscated email, no more literal `[email](mailto:)` (EEAT-007).
- About: literal `**H2:**` directive removed (FP-001).
- GLP-1 pillar: `₹X/₹Y` placeholders replaced with published MRP table (Wegovy/Ozempic/Mounjaro, generic-first) + Reuters/ET/Mint sources (CONTENT-001).
- 13 condition/test pages gained "When to see a doctor" blocks (CONTENT-003); six 3-FAQ pages topped to 5 (FAQ-001).
- "painless" claims reworded to factual phrasing (CONTENT-006).
- 19 fragmented `image_alt` values rewritten (FP-002); 683 blog headings to sentence case (AI-002); "Key takeaways" varied per post, "Final thoughts" heading dropped on 57 posts (AI-001 partial); residual phrases + em dash swept (AI-004).
- `app/favicon.ico` (real ICO around the PNG) + `app/manifest.ts` added (TECH-007); doctor breadcrumb label corrected (TECH-008).

## Not changed (need client/deploy)
- Vercel Production `SITE_INDEXABLE=true`; host 2-hop redirect; reg numbers; GBP links; fees; real review sign-off dates; photo decision; older article dates; topic-merge editorial calls.
