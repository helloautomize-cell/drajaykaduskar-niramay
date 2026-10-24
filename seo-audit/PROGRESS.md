# SEO Audit Progress — Niramay Clinics

Prompt 1 (audit): **Complete** — 24 Oct 2026
Prompt 2 (fixes): **Complete** — 24 Oct 2026, all changes UNCOMMITTED (user handles git)

## Prompt 2 outcome
- Fixed: 25 of 35 issues fully, 4 partially (see CHANGELOG_SEO.md)
- Blocked on client input: EEAT-001, SCH-001(identifier/sameAs), CONTENT-001, EEAT-005, EEAT-007, CONTENT-006
- Deferred: TECH-010 (no-JS form shell), TECH-003 residual 2-hop chains (platform), CONTENT-003 (hub depth, parked for doctor quotes), TECH-012 + Lighthouse + WAF (need live domain)
- Score estimate: 71 -> ~80 (re-audit on live domain to confirm)
- Verified: lint/tsc/build pass; robots.txt dynamic+allow, meta robots absent, sitemap 51 clean, review dates render, FAQs+links+sources+Prajakta credentials live in HTML

## Deliverables
AUDIT_REPORT.md, audit.json, page-scorecard.csv, link-matrix.csv,
CLIENT_INPUTS_NEEDED.md, CHANGELOG_SEO.md, DOCTOR_REVIEW_QUEUE.md,
WEEKLY_REPORT_2026-10-24.md, _raw/ (crawl evidence + edit scripts)

## Next session
- Doctor/lawyer sign-off per DOCTOR_REVIEW_QUEUE.md before merging
- On live domain: re-curl robots + meta robots, all 11 bot UAs, www/http redirects, case check, Lighthouse x4, WAF check, GSC+Bing submission, IndexNow

---

## v2 re-audit (Prompt 1, 63-point checklist): 24 Oct 2026

- Target: the LIVE site (origin/main @ e806bf9, 111 URLs incl. 60 new cluster articles). The local tree is 4 commits behind and its v1 fixes were never deployed.
- Score: **51/100** (effective visibility 0: live robots.txt `Disallow: /` + noindex on every page)
- Issues: 54 (P0 2, P1 19, P2 23, P3 10). `audit.json` and `AUDIT_REPORT.md` now hold v2. v1 files are archived in `archive/v1-2026-10-24/`
- `page-scorecard.csv` and `link-matrix.csv` regenerated from the live crawl. Evidence and scripts are in `_raw/v2/`
- CHANGELOG_SEO.md, DOCTOR_REVIEW_QUEUE.md, CLIENT_INPUTS_NEEDED.md and WEEKLY_REPORT_2026-10-24.md describe the v1 local fixes only
- Update: the tree was pulled to GitHub main @ e806bf9 (identical to live). v1 uncommitted fixes were stashed as `stash@{0}: pre-pull v1 SEO fixes (2026-10-24)`. Prompt 1 was re-run on the pulled tree: the local build with SITE_INDEXABLE=true shows 0 differences from live on all 111 URLs except indexability. Issues: 53 (P0 1, P1 19, P2 23, P3 10)
- Next: Prompt 2 on this tree. Port the still-relevant v1 fixes from the stash by hand (don't blind-pop, 4 files conflict)

---

## v2 fixes + re-audit (Prompt 2): 24 Oct 2026

- Applied Prompt 2 to `main @ e806bf9`. All changes uncommitted (no branch/commit per rules). Stash @{0} ported by hand where still relevant.
- Result: **72/100** on the fixed build (was 51). Issues: 30 fixed, 15 partial, 8 open (client/deploy-side). Only P0 left is operational: set `SITE_INDEXABLE=true` in Vercel Production.
- Verified: build + lint + tsc clean; 111-URL sitemap; GPTBot no-JS crawl of all 111 URLs; header/footer links in raw HTML; typed schema entities + sameAs; service↔article links; honest review wording and dates.
- Re-ran audit pipeline on the fixed build (`_raw/v2/fix/` scripts); `audit.json`, `AUDIT_REPORT.md`, `page-scorecard.csv`, `link-matrix.csv` regenerated.
- Remaining code-adjacent work: KW-001 merges, FAQ expansion, AI-skeleton cadence, LCP on live. Everything else needs client inputs (CLIENT_INPUTS_NEEDED.md).
