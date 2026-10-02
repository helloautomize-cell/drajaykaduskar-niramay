# Client inputs needed before launch

**7 items, 4 block launch (marked ★).** Everything else from the earlier list was resolved by `client-answers.md` (2 October 2026) and is already applied on the site.

How to use: answer each item once, in plain words, in a reply or on a call. ★ items must be answered before the site goes live — they are legal requirements or promises made in the copy.

---

## 1. Registrations ★

- [ ] **Maharashtra Medical Council registration number — Dr. Ajay V. Kaduskar** ★
  Pages: Dr. Ajay's profile (required by NMC professional conduct rules to display).
  Example: "MMC Reg. No. 62xxx"
- [ ] **Maharashtra Medical Council registration number — Dr. Prajakta A. Kaduskar** ★
  Pages: Dr. Prajakta's profile.
  Example: "MMC Reg. No. 70xxx"

## 2. Sign-offs ★

- [ ] **Medical sign-off** ★ — Dr. Ajay reviews all diabetes, heart and lab pages; Dr. Prajakta reviews all Blooming Buds pages. Each page is read once on the preview link and confirmed.
- [ ] **Legal sign-off** ★ — the Privacy Policy, Terms of Use, Cancellation and Refund Policy and Patient Rights pages are checked once by whoever reviews the clinic's legal documents.

## 3. Design approval

- [ ] **Logo SVG approval** — the redrawn vector logo is in `public/images/brand/niramay-logo.svg`; a side-by-side PNG vs SVG comparison is saved at `resources/docs/logo-svg-comparison.png`. Approve it and we swap the header/footer to the SVG.

## 4. Agency / integrations

- [ ] **Resend domain setup** (see `phase-6-setup.md`): create the Resend account, add `niramayclinics.com`, add the DNS records (SPF/DKIM/DMARC — add only, do not touch existing MX records), verify, and paste `RESEND_API_KEY`, `FORM_TO_EMAIL`, `FORM_FROM_EMAIL` into Vercel.
- [ ] **Cloudflare Turnstile**: create the widget, paste `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` into Vercel.
- [ ] **GA4**: create the property + web stream (Google signals OFF, data retention 2 months), add `ajaykaduskar@gmail.com` as Administrator, paste `NEXT_PUBLIC_GA_ID` into Vercel.
- [ ] **Search Console**: create the domain property and share it with `ajaykaduskar@gmail.com`. Paste `NEXT_PUBLIC_GSC_VERIFICATION` into Vercel (meta-tag method) or add the DNS TXT at launch.
- [ ] **Google Business Profile links**: copy the Maps share link for (a) the clinic listing and (b) Dr. Ajay's listing from Google Business Profile manager → paste into `site.googleProfiles` in `lib/site-config.ts` (`mapsUrl`, and `reviewUrl` for reference).
