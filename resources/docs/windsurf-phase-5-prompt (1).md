# Windsurf prompt: Phase 4 approval + fixes + Phase 5 (one pass)

Before starting, confirm these paths exist and list them: `resources/content/blog/` (5 post files), `resources/docs/design-development-plan.md`, `resources/docs/site-plan.md`, and the attached `blog-posts-revised.md`. If any is missing, STOP and tell me. Do not substitute another file.

**PHASE 4 IS APPROVED.** Decisions on your two open items:
- **JS budget:** accepted. The new budget is 230 KB gzipped on Home. Do NOT rewrite the Radix header.
- **Mobile performance:** do NOT change the hero design yet. We measure on a real deployment first (Part 3).

---

## PART 1. Fix first: nested links (hydration error)

The dev overlay on `/plan-your-visit/` shows "In HTML, `<a>` cannot be a descendant of `<a>`". It comes from a card with `className "group block h-full rounded-[18px] border border-line bg-white p-6 ..."` that wraps a Link to `/health-library/...` (a Health Library or related-content card with another link inside it).

1. Fix with the "stretched link" pattern:
   - The card is a `<div>` or `<article>` with `position: relative`.
   - The main title is the ONLY `<a>`, with an `::after` covering the whole card (`inset: 0`), so the whole card stays clickable.
   - Secondary links inside (author, category chip) sit above it with `position: relative; z-index: 1`.
   - Hover and focus styles stay on the card (`group-hover` / `focus-within`).
2. Audit the WHOLE codebase for the same pattern: ServiceGlassCard, DoctorCard, blog cards, mega-menu featured cards, condition carousel cards, related-services rows, footer, step tracker. There must be no `<a>` inside `<a>`, no `<button>` inside `<a>` and no `<a>` inside `<button>`, anywhere.
3. Confirm the dev overlay shows ZERO issues on: `/`, `/about/`, `/services/`, `/diabetes/`, `/diabetes/type-2-diabetes/`, `/heart-care/2d-echo/`, `/blooming-buds/`, `/vaccination/`, `/lab/`, `/pharmacy/`, `/plan-your-visit/`, `/faqs/`, `/contact/`, `/health-library/`, every blog post, both doctor pages, `/privacy-policy/`. Report the list with "0 issues" against each.
4. Add a Playwright check that fails if `document.querySelectorAll('a a, a button, button a').length > 0` on any of these routes.

---

## PART 1B. Home hero fan: back to TWO doctor cards

The Phase 4 hero fan has 4 cards (Dr. Ajay, Dr. Prajakta, eye screening, reception). It looks crowded, and Dr. Prajakta's caption is cut off ("Dr. Praj..."). Revert to the approved Phase 1 version:
1. Exactly TWO cards: `dr-ajay-kaduskar-hero.jpg` (front by default, caption "Dr. Ajay Kaduskar · Diabetes, obesity and heart care") and `dr-prajakta-kaduskar-hero.jpg` (back, caption "Dr. Prajakta Kaduskar · Child and adolescent care").
2. Back card: the approved offset (`-translate-x-[30%] rotate(-4deg) scale(.94)`). About 32% of it is visible, her face is clearly visible, and her FULL caption is readable (not clipped). If the caption cannot fit in the visible part, move the back card's caption to the visible left edge or shorten it to "Dr. Prajakta Kaduskar" only.
3. The cards swap front and back every 5s (smooth 600ms transition), pause on hover, and stay still under reduced motion.
4. Remove the eye-screening and reception images from the hero, and stop preloading them. They stay in use elsewhere (step tracker, services).
5. Keep the hero layout balanced: the fan's right edge aligns with the container, with no empty gap on the right, and the peach glow sits behind the cards.
6. On mobile, show the two-card fan below the text (same behaviour, smaller cards).
7. Re-check the hero at 1440, 1024, 768 and 390. This change should also help mobile performance (fewer images), so measure Home AFTER this change in Part 3.

---

## PART 2. Blog posts: replace with the revised versions

The attached `blog-posts-revised.md` contains improved, corrected versions of all 5 posts (from the old website), approved for the site.

1. For each post, replace the BODY of the matching file in `resources/content/blog/` with the revised text. Merge in the frontmatter fields given (title, url, old_url, author, author_credentials, reviewed_by, published, updated, category, reading_time, image, video, excerpt, related). Keep any existing keys the loader needs. Extend the Zod schema for the new fields.
2. **Dates:** show "Published [published date]" and "Updated [updated date]" on each post, e.g. "Published 30 July 2026 · Updated 2 October 2026". Use `published` as `datePublished` and `updated` as `dateModified` in BlogPosting / MedicalWebPage JSON-LD. The reviewer box shows "Medically reviewed by [doctor]" with the updated date.
3. **Author:** the author chip and author box use the doctor's square avatar (Dr. Ajay: headshot avatar; Dr. Prajakta: her avatar), name, credentials and a link to their profile.
4. **Summary box:** render the "Summary box" bullet list at the top of each post as a soft plum-50 card titled "In brief".
5. **Video:** the diabetes-myths post embeds YouTube `YjXtEOQ724Y` where the text marker *[Video: ...]* appears. Use a lightweight click-to-load facade (thumbnail from `blog/diabetes-myths.jpg` + play button; the iframe loads only on click, `youtube-nocookie.com`). Add VideoObject JSON-LD.
6. **Callouts:** the Tele-MANAS helpline block in "Smart Love" renders as the emergency Callout. The "When to see a doctor" list in "Menstrual hygiene" uses a warning Callout, with the tampon emergency line inside the emergency style.
7. **FAQs:** "Frequently asked questions" in the diabetes-myths post renders as the accordion + FAQPage JSON-LD.
8. **Related:** the "related" URLs render as 3 ServiceGlassCards at the end of each post, followed by 2 related posts.
9. **Health Library hub:** category chips (Diabetes, Parenting, Adolescent health), newest first, with the cards showing author avatar, "Published" date and reading time.
10. Redirects from each `old_url` still point to the new URL (verify).
11. Remove the now-completed items from your "deferred copy-edits" list.

---

## PART 3. Phase 5: preview deployment, real performance, site-wide QA

### 1. Deploy a preview on Vercel
- Use region `bom1` for functions.
- If the project is not linked yet, give me the exact commands to run (`vercel login` / `vercel link`) and wait.
- Preview URL only; the production domain is NOT connected yet.
- Add a site-wide noindex (`X-Robots-Tag` header + meta) on preview deployments only, so Google does not index the preview.

### 2. Real performance
Run PageSpeed Insights / Lighthouse mobile against the PREVIEW URL (3 runs each, report the median) for: `/`, `/diabetes/type-2-diabetes/`, `/doctors/dr-ajay-kaduskar/`, `/contact/`, and one blog post.
- **Targets:** Performance 90+, Accessibility 100, Best Practices 100, SEO 100. On preview, ignore the noindex item only.
- **ONLY if Home is still under 90 on the deployed preview:** below 768px, reduce the hero fan height so the FRONT card is fully visible above the fold at 390x844. Same design, just shorter cards; the back cards can stay partly hidden. Re-measure and report before/after.

### 3. Site-wide visual QA
At 390, 768, 1024 and 1440px, on every route (all pages and posts), check:
- the same section spacing, container width, radius and shadows everywhere
- no text overflow, no horizontal scroll, no orphan single words in headings
- every image has the right crop (faces never cut), and every ServiceBadge matches its service (`lib/service-badges.ts`)
- every medical page shows the reviewer box, CTA band, and the emergency line where the content mentions symptoms
- every H1 has at most one accent word
- the mobile action bar never covers content, forms or the cookie banner

Fix what you find, and list each fix with before/after screenshots.

### 4. Accessibility pass
- Keyboard-only walkthrough of Home, a service page, a blog post and Contact.
- Screen-reader labels on the carousels, tabs, step tracker, video facade, map button and mobile bar.
- Visible focus everywhere.
- 200% zoom without breakage.

### 5. Cross-browser
Safari (macOS, and the iOS simulator if available) and Chrome Android emulation: glass blur fallbacks, sticky parallax band, Lenis, carousels, video facade, and safe-area insets on the mobile bar.

---

## PART 4. Final report + "CLIENT INPUTS NEEDED" list

**A. Report:**
- the preview URL
- the "0 issues" route list
- PSI medians (and the mobile hero before/after, if done)
- the QA fix list
- the blog changes made
- any remaining known issues

**B. Create `resources/docs/client-inputs-needed.md`:** ONE complete, plain-language checklist of everything the clinic must supply or approve before launch. Generate it from:
- `npm run launch-check`: every `[CONFIRM]`, grouped by topic, not by file
- every `TODO_CONFIRM` in `lib/site-config.ts`
- every placeholder URL or key in the code
- `public/images/_todo.md`

Group it like this, with each item as a checkbox, the page(s) it appears on, and an example answer:

1. **Timings:** OPD days and hours per doctor, Sunday and holiday status, phone-line hours, pharmacy hours, lab days
2. **Fees and payments:** consultation fees (and whether shown), payment methods, insurance or cashless, package or programme prices
3. **Registrations and legal:** MMC registration numbers for both doctors, legal entity name, drug licence numbers, pharmacist name and registration, Grievance Officer name and email, NABL or lab accreditation and the signing pathologist, partner lab
4. **Doctor credentials:** practice start years, SCOPE and FEACD years, awards (title, body, year), memberships, publications and talks, languages, hospital affiliations
5. **Services:** Diabetes Care Programme contents, health check-up packages, who performs and reports the Echo and TMT, retinal screening details, sarcopenia tests, psychological tests used, counselling session length, workshop details, teleconsultation yes/no, vaccination reminders, home collection areas and fee, pharmacy delivery areas and outstation dispatch
6. **Media and permissions:** permission to embed "Sugar ki Baat" and use its thumbnail, other video links, social media URLs
7. **Google and integrations (for Phase 6):** both Google Business Profile URLs and review links, Google Maps place link, Places API key, GA4 property ID, Search Console access, the email address that should receive appointment requests, the sending email or domain (Resend), the WhatsApp number confirmation
8. **Brand assets:** logo SVG / vector file
9. **Launch and hosting:** domain registrar access, DNS access, current email (MX) provider, Vercel account owner
10. **Approvals:** final sign-off of all medical pages by each doctor (sets the "Last reviewed" dates), legal review of the 7 legal pages

At the top, show the totals: "X items, Y block launch". Mark launch blockers with ★.

STOP after this. Do not start forms, email, the Google reviews API or analytics (that is Phase 6).
