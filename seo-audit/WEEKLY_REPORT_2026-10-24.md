# Weekly SEO report — Niramay Clinics — 24 Oct 2026

*For Dr. Ajay and Dr. Prajakta — what we did this week, what it means, and what we need from you.*

## Summary

Two weeks of work are now on the newest version of the site (the one actually live on GitHub/Vercel). We re-audited all 111 pages, then fixed every issue that could be fixed from code and existing content — 30 of 53 — and improved another 15. The site scored **51 out of 100** before this work; the fixed version scores **72**.

One important thing: **the website is still invisible to Google today — on purpose.** The site was launched with a "do not index" flag so nothing goes live before you approve it. All the code work for launch is done and tested. Going live now takes exactly one setting on the hosting dashboard (`SITE_INDEXABLE=true` on Vercel Production) followed by a redeploy. The moment that flag flips, everything below is live.

## Scores, before → after

| Area | Before | After |
|---|---|---|
| Crawling & AI-bot access | 25 | 70 |
| Technical | 58 | 78 |
| Structured data (schema) | 60 | 88 |
| Trust signals (E-E-A-T) | 45 | 68 |
| Internal linking | 62 | 82 |
| FAQs | 45 | 62 |
| Entities & semantics | 62 | 80 |
| Keywords & titles | 55 | 68 |
| Content reads human | 60 | 72 |
| AI-answer readiness | 40 | 55 |
| **Overall** | **51** | **72** |

## What was fixed (30 issues)

- **Navigation visitors and Google can see.** Previously the menu only existed after JavaScript loaded — Google saw almost no links. The menu and footer now carry real links in the page's HTML: every service, both doctor profiles, About, Contact, Lab and Pharmacy.
- **Service pages and articles now connect.** Every service page lists relevant Health Library articles, every sub-page links back to its centre, and the Blooming Buds page got its missing link list.
- **Honest doctor labels and dates.** Dr. Prajakta is no longer called a "Diabetologist". Articles now say "Written and medically reviewed by" the same doctor (true) instead of implying a second reviewer. "Last reviewed" shows a real date instead of a blank or a hard-coded "October 2026".
- **Accurate structured data.** Pages now describe themselves correctly to Google: real medical conditions with links to Wikipedia/MeSH medical definitions, proper page types (article, profile, service, pharmacy, test), no invented entities, no duplicate IDs.
- **Real prices.** The GLP-1 pillar's placeholder text ("₹X and ₹Y") now shows published Indian prices for semaglutide (Wegovy, Ozempic) and tirzepatide (Mounjaro) — generic name first, sourced to Reuters/ET/Mint.
- **Working contact page.** Phone numbers are tappable `tel:` links, WhatsApp links work, directions open Google Maps, and the broken email link is replaced by the protected email widget.
- **Safety guidance.** 13 condition and test pages gained a "When to see a doctor" section.
- **Titles fixed.** 9 article titles that were cut off mid-word or too short were rewritten (e.g. "Can Type 2 Diabetes Be Reversed or Put Into | Niramay" → "Type 2 Diabetes Reversal and Remission | Niramay").
- **More useful FAQs.** Six pages that had only 3 questions now have 5, with fuller answers.
- **Human touches.** 683 headings converted from ALL-CAPITALS style to normal sentence case, 19 photo descriptions that had AI-prompt fragments were rewritten, the identical "Key takeaways / Final thoughts" ending on 57 articles was varied, and "painless" claims were reworded to factual language.
- **Small technical wins.** Favicon and web app manifest added, doctor-page breadcrumb fixed, legal pages show a real "Last updated" date, home-page videos no longer share an ID.

## What this means practically

- Once the flag is flipped, Google, Bing and AI assistants (ChatGPT, Perplexity, Claude, Gemini) can all read the full site — every page's text is in the HTML, not hidden behind JavaScript.
- Articles and services now reinforce each other for searches like "type 2 diabetes Nagpur" or "GLP-1 price in India", and the site's medical claims are backed by named doctors, real dates and published sources — the signals Google weighs heaviest for medical sites.
- No ranking guarantees — medical search is competitive — but the technical debt that would have capped results is cleared.

## Still needs you (client inputs)

1. **Approval to go live** — we then flip the one hosting flag and re-verify.
2. **Medical council registration numbers** for both doctors (for doctor schema).
3. **Google Business Profile links** (clinic + Dr. Ajay) for the footer and schema.
4. **Fees** for consultations/tests if you want them published.
5. **Whether to keep or replace the AI-generated portraits** on the site.
6. **A second reviewer**, or approval that "written and medically reviewed by the same doctor" is the right label.
7. **Real publication dates** for the 5 older articles, and sign-off on the review dates currently derived from content history.

## Next week's plan

- Flip `SITE_INDEXABLE=true` on Production after your approval; re-check robots, redirects and all bot user agents on the live domain.
- Submit the sitemap to Google Search Console and Bing; run Lighthouse on the live pages.
- Merge or retitle the ~8 overlapping article topics; expand the shortest FAQ answers; add "X vs Y" comparison tables where patients ask for them.

Details: `seo-audit/AUDIT_REPORT.md` (full audit), `seo-audit/audit.json` (issue list), `seo-audit/CLIENT_INPUTS_NEEDED.md`.
