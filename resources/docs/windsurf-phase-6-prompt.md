# Windsurf prompt: Phase 5 approval + client answers + Phase 6 (forms, Google links, analytics)

## Before you start
Confirm these paths exist and list them:
- the attached `client-answers.md` (save a copy as `resources/docs/client-answers-2026-10-02.md`)
- `resources/docs/design-development-plan.md`
- `resources/docs/site-plan.md`
- `resources/docs/client-inputs-needed.md`
- `resources/content/`, including:
  - the contact page file with "Appointment request form"
  - the Blooming Buds workshops page
  - `privacy-policy`, `terms-of-use`, `cancellation-and-refund-policy`, `patient-rights`
  - the preventive health check-ups, pharmacy and lab pages
  - both doctor profiles
- `lib/site-config.ts`, `lib/consent.ts`, `lib/whatsapp.ts`
- the CookieBanner component, the VideoFacade component and the `/thank-you/` route

If any is missing, STOP and tell me. Do not substitute another file.

`client-answers.md` is the clinic's answer sheet. **It is the source of truth for every content change in Part 1.** Where it gives a "Copy:" line, use that wording exactly.

**Branch rule:** work on a new branch `phase-6` and deploy it as a preview. Do NOT merge to `main` until I approve the report.

**PHASE 5 IS APPROVED.** Great work on CLS and accessibility. Answers to your open items:
- **Blog dates are real.** They come from the old WordPress export (8 July 2026 for the 4 adolescent posts, 30 July 2026 for the diabetes post). Keep them.
- **Safari:** I will check it on a real iPhone and Mac. Skip WebKit automation.
- **Preview protection:** keep Vercel SSO on for previews.

---

## PART 0. Do these first, then deploy

### 0.1 Lock down the public production URL until launch
`https://drajaykaduskar-niramay.vercel.app/` is open to anyone and can be indexed by Google. It shows unconfirmed details as final (the `[CONFIRM]` chips are hidden in production), and it would compete with niramayclinics.com later.

1. **Password.** Add HTTP Basic Auth in `proxy.ts` (Next 16's name for middleware).
   - It is active only when `SITE_PASSWORD` is set (user name `niramay`).
   - Generate a strong password, set it for Production in Vercel, and tell me what it is.
   - Exclude only `/_next/static`, `/_next/image`, `/images`, the favicon and icons.
   - It will be removed at launch by unsetting the env var.
2. **`SITE_INDEXABLE` env var** (set to `true` only at launch). Until then:
   - every response sends `X-Robots-Tag: noindex, nofollow`
   - every page has `<meta name="robots" content="noindex,nofollow">`
   - `robots.txt` returns `Disallow: /`
   - the sitemap is still generated
3. Report which canonical host the code uses (`https://niramayclinics.com` or `https://www.niramayclinics.com`) and where it is set. Do not change it.

### 0.2 Checks from your Phase 5 report
1. **Lighthouse.** If your numbers were not medians of 3 runs, re-run 3 times per route against production, using the auth header via `--extra-headers`, and report the medians.
2. **`content-visibility: auto`** must not be used on anything that can be above the fold at any width. List every element that uses it.
3. **Hero screenshots** at 1440, 1024 and 390, in both swap states. I want to see the "vertical name pill".

---

## PART 1. Apply the client answers (content and data)

Work through `client-answers.md` item by item. In summary:

### 1.1 Contact data, hours and email
1. **One email everywhere:** replace `ajaykaduskar@gmail.com` with `ajaykaduskar@gmail.com` across:
   - code, content, legal pages, the footer and Contact
   - JSON-LD `email`
   - `.env.example`

   Show it as a `mailto:` link, but assemble it client-side so scrapers do not harvest it. `grep` must find zero `ajaykaduskar@gmail.com` afterwards.
2. **Hours, in `site-config` and used everywhere** (header utility bar, footer, Contact, Plan your visit, FAQs, both profiles, Lab, Pharmacy):

   | Service | Days | Hours |
   |---|---|---|
   | OPD (both doctors) | Mon to Sat | 8:30 am to 6 pm |
   | Lab | Mon to Sat | 7 am to 7 pm |
   | Pharmacy | Mon to Sat | 8:30 am to 8 pm |
   | Phone answered | Every day, including Sunday | 8 am to 9 pm |

   - OPD, lab and pharmacy are closed on Sunday.
   - Holiday line: "Please call before visiting on public holidays."
   - Remove every "9 am to 5 pm".
3. **JSON-LD hours:**
   - `openingHoursSpecification` on the MedicalClinic for the OPD hours
   - lab and pharmacy as `department` entries with their own hours
   - a `ContactPoint` with the phone hours for all 7 days
4. **Numbers** (confirmed): clinic 0712 2422214, mobile and WhatsApp +91 84591 41584, pharmacy +91 90213 51693.

### 1.2 Fees, packages, insurance, policies
1. **Fees:** never show any fee. The Plan your visit "Fees" section becomes: "Fees are shared when you book. We accept cash, UPI and cards."
2. **Complete Diabetes Care Package:** 12 months, made up of:
   - 12 consultations
   - 4 HbA1c tests
   - eye and foot screening
   - 4 diet sessions

   No price.
3. **Preventive health check-ups:** delete the proposed package tiers. Rewrite the page around item 8: every check-up is designed by the doctor after consultation and examination, based on the patient's conditions, symptoms and risk, so no test is repeated or wasted. Keep the page's structure: hero, who it is for, what to expect, FAQs.
4. **Insurance:** use the item 9 copy, plus Dr. Ajay's "not tied to any hospital" paragraph, on:
   - Plan your visit
   - FAQs
   - About
   - his profile
5. **Cancellation and Refund Policy:** use the simple version (item 10). No advance payments; cancel or reschedule any time by phone or WhatsApp; refunds only for billing errors, handled at the clinic. Remove the notice-period and refund-time placeholders.
6. **Home sample collection:** use the item 12 copy (anywhere in Nagpur city within about 15 km, from 7 am, Mon to Sat, no extra charge). Put "Samples are tested in our own lab" on the Lab and Home collection pages. Remove all "partner lab" wording.

### 1.3 Local SEO for a 100 km catchment (item 12, "Plan")
Patients come 30% from within 5 km, 20% from 6 to 15 km, and 50% from towns 16 to 100 km away.
1. **`site-config.serviceArea`:** the town list and the Nagpur locality list from item 12.
2. **`areaServed`** on the MedicalClinic and both Physicians:
   - City Nagpur
   - AdministrativeArea: Nagpur district, Bhandara district, Wardha district
   - a `GeoCircle` (clinic geo, `geoRadius` 100000)
3. **One new page, `/plan-your-visit/coming-from-outside-nagpur/`.** No per-town or per-locality pages: Google treats them as doorway pages. Contents:
   - getting here and parking
   - reach the lab by 7 am for fasting tests
   - consultation, lab and pharmacy in one visit
   - same-day reports
   - follow-up by phone or WhatsApp where the doctor finds it suitable
   - pick up medicines before you leave
   - "Patients regularly visit us from" followed by the town list as plain text

   Give it a breadcrumb and a link from Plan your visit, Contact and the footer. Add it to the sitemap.
4. **Line on Contact, Plan your visit and the footer:** "Patients come to us from across Nagpur and from towns up to 100 km away, including Wardha, Bhandara, Umred, Katol, Saoner and Ramtek."

### 1.4 Doctors
1. **Dr. Ajay's profile.** Apply the full enrichment block in `client-answers.md` (after item 13):
   - **Title line:** "Diabetologist and metabolic diseases consultant · Director, Niramay Diabetes and Heart Care Centre, Nagpur"
   - **Education timeline**
   - **"Certifications and roles":**
     - SCOPE (no year)
     - NUS "AI for Healthcare"
     - the CME topics
     - Former President, Diabetic Association of India, Nagpur
     - Former Chairman, API Vidarbha Chapter
     - Joint Organising Secretary, MAPCON 2023
     - President, Dr. V. S. Kaduskar Memorial Foundation
   - **"How Dr. Ajay works"** principles block
   - **Services list:** the 5 groups as NON-clickable chips. Use a glass chip style (static, no hover lift, `role="list"`). They go on his profile only, NOT in the menu.
   - **EXCLUDED items:** never add them anywhere.
2. **Dr. Ajay's Physician JSON-LD:** `medicalSpecialty`, `knowsAbout`, `availableService` (MedicalTest / MedicalTherapy / MedicalProcedure), `alumniOf`, `hasCredential`, `memberOf`, `affiliation`, `knowsLanguage` `["en","hi","mr"]`.
3. **Dr. Prajakta:**
   - Qualifications stay as they are: MBBS, DCH, PGDAP (Adolescent), MA (Clinical Psychology).
   - **Experience changes to "more than 15 years" everywhere:** her profile, About, Blooming Buds, Home, doctor cards, meta descriptions and JSON-LD.
   - Hide the Awards and Memberships sections for her.
4. **Experience in `site-config`:** store as `experienceYears` (Ajay 20, Prajakta 15) and render "more than X years".
5. **Founding year:** "Caring for Nagpur since 2006" on About and in the footer; `foundingDate: "2006"` in JSON-LD.
6. **Staff:** name no staff anywhere. Team photo caption: "Our team at Niramay Clinics". The Nutrition page refers to "our trained nutrition team".
7. **Diabetes page:** add the item 32 line (any age; children and teens are often seen with Dr. Prajakta).
8. **Remove "Sugar ki Baat"** everywhere.

### 1.5 Home: "Watch Dr. Ajay" video section (item 30)
1. **Placement:** a new section directly after the doctors section, titled "Watch Dr. Ajay". It holds two VideoFacades: `G2I1fNgxzkE` and `YjXtEOQ724Y`.
   - Desktop: 2 columns. Mobile: stacked.
   - **First check whether the two IDs are the same video.** If they are, show it once and tell me.
2. **Each video:**
   - its real YouTube title
   - a self-hosted thumbnail (download it into `public/images/video/`, so there is no Google request before the click)
   - a "Video: [channel name]" credit
   - VideoObject JSON-LD with the real `uploadDate`
3. The diabetes-myths blog post keeps its `YjXtEOQ724Y` embed.
4. Do not add the videos to the profile or a separate Videos page.
5. Check the Home JS budget (230 KB) and LCP after adding this section.

### 1.6 Legal pages
1. **Who runs the site** (Privacy Policy and Terms): "This website is run by Niramay Clinics, 572, Indu Bhaskar Apartments, Dr. N. B. Khare Marg, Dhantoli, Nagpur 440012." Never write "sole proprietorship".
2. **Privacy contact:** Dr. Ajay Kaduskar, ajaykaduskar@gmail.com.
3. **"Last updated":** 21 August 2026, from `site-config.legalLastUpdated`.
4. **Processors** (item 19): Vercel, Resend, Cloudflare Turnstile, Google Analytics (only with consent), Google Maps and YouTube (only when clicked), WhatsApp and Gmail (when you contact us there). Add: "Clinic records are kept on paper and stored securely at the clinic."
5. **Retention:** the item 20 and 21 copy (medical records at least 3 years; enquiries without a visit deleted within 12 months).
6. **Patient rights:** complaints copy from item 22. Keep the Charter-at-reception line.
7. **Pharmacy:**
   - Remove the drug licence and pharmacist lines (also from `launch-check`), using the item 15 copy.
   - Remove outstation courier dispatch everywhere.
   - Keep "Home delivery available in Nagpur".

### 1.7 Service pages: the "no treatment details" rule (items 33 to 45)
The client's rule: the site says WHAT is offered and how the visit feels. **It never states protocols, test names, session counts or machine models.** Every patient is different, and the doctor decides after examining them.
1. **Use the exact copy for:**
   - 2D Echo (item 33)
   - TMT (34)
   - Retinal screening (35)
   - Body composition (36: the 4-step list plus the prep line)
   - Insulin pump (37)
   - Psychological testing (38)
   - Teen counselling (39)
   - Vaccination (40)
   - Well-baby (41)
   - Workshops (42)
   - Lab (43)
   - Pharmacy (44)
   - Career counselling (45)
2. **For every other `[CONFIRM]`** that asks for a treatment modality, protocol, test name, session length or frequency, machine or model, or an internal process: delete the request and write a patient-friendly sentence, e.g. "Dr. [name] decides the right tests and treatment for you after examining you." **Never invent a specific to fill a gap.**
3. Keep all compliance rules: no "best", no cure or guarantee wording, no drug brands, no testimonials.

### 1.8 Logo, social, Google links
1. **Logo:** no vector file exists. Redraw the current logo as a clean SVG.
   - Match it exactly; do not redesign. Hand-built paths, real text converted to outlines, the same colours.
   - Show the PNG and SVG side by side at 1x and 4x for my approval.
   - Use the SVG in the header and footer only after I approve. Until then keep the PNG.
2. **Social media:** none. Keep all social icons hidden.
3. **Google profiles:** see Part 3.

### 1.9 After Part 1
Run `npm run launch-check`. The ONLY remaining markers should be:
- the two MMC registration numbers
- the medical and legal sign-offs
- integration keys and links I will supply

Report the exact remaining list. Anything else still marked is a miss.

---

## PART 2. Forms with real email delivery

**General rules:**
- React Hook Form + one shared Zod schema per form, used on both client and server; a Server Action; Resend for sending.
- **No database.**
- **Never show success unless Resend accepted the email.**

### 2.1 Environment variables
Put them in `.env.example` with comments. Real values go only in Vercel and `.env.local` (which must be gitignored).

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | sending |
| `FORM_TO_EMAIL` | default `ajaykaduskar@gmail.com` |
| `FORM_FROM_EMAIL` | `Niramay Clinics <appointments@niramayclinics.com>` |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | spam protection |
| `FORM_TEST_MODE` | `1` = the action returns success without sending; ignored when `VERCEL_ENV=production` |

- Until the domain is verified in Resend, previews may use `onboarding@resend.dev`, which only delivers to the Resend account owner's address.
- I have DNS access and will set up Resend myself, using your instructions (Part 5B).
- **DNS records are ADDED only. Existing MX records must not be touched.**

### 2.2 Appointment request form (`/contact/#book`)
Use the fields and wording from the contact content file, with these rules:

1. **Patient's full name:** required, 2 to 80 characters.
2. **Mobile:** required.
   - Accept `98…`, `098…`, `+91 98…` and spaces; normalise to `+91XXXXXXXXXX`. It must be 10 digits starting 6 to 9.
   - `inputmode="tel"`, `autocomplete="tel"`.
3. **Patient's age:** required. A number plus a Years (default) / Months select: 0 to 120 years, or 0 to 24 months.
4. **Which doctor?** required: Dr. Ajay Kaduskar / Dr. Prajakta Kaduskar / Not sure.
5. **Reason for visit:** the dropdown list from the content file.
6. **Preferred date:** native date input, from today to +60 days.
   - Sundays: show the note "We are closed on Sundays. Please choose another day."
   - Time of day: Morning (8:30 am to 12 pm) / Afternoon (12 to 3 pm) / Late afternoon (3 to 6 pm).
7. **City:** optional, `autocomplete="address-level2"`.
8. **Under-18 checkbox.** When ticked:
   - Show "Parent or guardian's name" (required).
   - The consent text becomes: "I am the parent or legal guardian of the patient. I agree that Niramay Clinics may contact me about this appointment by phone, SMS or WhatsApp. I have read the Privacy Policy."
   - If the age is under 18 years (or given in months) and the box is not ticked, show an inline message and block the submit.
9. **Consent checkbox:** required, unticked by default, exact text from the content file, with a Privacy Policy link.
10. **Button:** "Request appointment" (BookButton style, full width on mobile).
11. **Line under the form:** "Please do not include detailed medical information or upload reports here. Bring them to your visit."

**Prefill from context:**
- Every "Book Appointment" link passes `?doctor=` and `?reason=` from one mapping file, `lib/booking-context.ts`. Examples:
  - `/diabetes/…`: Ajay + Diabetes
  - `/vaccination/`: Prajakta + "Child check-up or vaccination"
  - `/doctors/dr-prajakta-kaduskar/`: Prajakta
- Pages without a clear match prefill nothing.
- The mobile bar's "Book Now" uses the same mapping.

### 2.3 Workshop request form (Blooming Buds workshops page)
Fields:
- school or organisation name (required)
- audience: Students / Parents / Teachers / Mixed
- class or age range (optional)
- approximate number of people
- preferred dates (free text)
- topics: multi-select from that page's topics, plus "Other"
- preferred language: English / Hindi / Marathi
- contact person's name (required)
- mobile (required)
- email (required)
- consent checkbox: "I agree that Niramay Clinics may contact me about this workshop request. I have read the Privacy Policy."

Button: "Request a workshop".

### 2.4 Spam protection
- A hidden honeypot field (silently "succeeds" without sending).
- A minimum fill time of 3 seconds.
- Cloudflare Turnstile (managed), verified server-side; active only when its keys are set.

### 2.5 Emails
**To the clinic** (`FORM_TO_EMAIL`, branded HTML plus plain text):
- **Subject:** `Appointment request · [Doctor] · [Patient name]` or `Workshop request · [Organisation]`.
- **Top line:** "Online request. Not yet confirmed. Please call or WhatsApp to confirm."
- **Body:**
  - a table of all fields
  - a `tel:` link
  - a `wa.me` link prefilled with "Hello, this is Niramay Clinics about your appointment request."
  - the source page
  - the date and time in IST
  - **the exact consent text shown and the time it was given**
- For workshops, `reply-to` is the contact person's email.

**To the requester:**
- Workshop form only (the appointment form has no email field, and we do not add one).
- A short acknowledgement: what they asked for, "We will contact you within 2 working days", and the clinic's phone numbers. No medical content.

### 2.6 States
- **Submitting:** spinner; the button is disabled.
- **Validation errors:**
  - an error summary at the top, linked to each field
  - `aria-invalid` and `aria-describedby` on the fields
  - focus moves to the first error
  - plain-word messages
- **Send failure:**
  - inline message: "We could not send your request just now. Please call 0712 2422214 or message us on WhatsApp."
  - Call and WhatsApp buttons (the WhatsApp message carries the form summary, with no medical details)
  - the entered data is kept
- **Success:** go to `/thank-you/?type=appointment|workshop`.
  - Appointment: "Thank you. We have received your request. This is not a confirmed appointment yet. We usually confirm within 30 to 90 minutes between 8 am and 9 pm. Requests sent after 9 pm are confirmed the next morning."
  - Workshop: "Thank you. We have received your workshop request and will contact you within 2 working days."
  - Both: "In an emergency, call 108 or 112."

**Accessibility and form basics:**
- real labels
- 48px targets, 17px minimum text
- correct `autocomplete` attributes
- works with JavaScript off

---

## PART 3. Google Business Profiles: links only

The client decided: **no star rating, no review count and no review text on the site.** Therefore:
- no Places API and no Google API key
- no `AggregateRating` or `Review` JSON-LD

1. **`site-config.googleProfiles`:** two entries, each with a name, `mapsUrl` and `reviewUrl`, all empty for now. I will paste the links from Google Business Profile manager:
   - GBP A: the clinic
   - GBP B: Dr. Ajay
2. **Contact and footer:** for each profile with a `mapsUrl`, a small Google-styled link "See us on Google Maps" (new tab, `rel="noopener"`). If both are empty, show nothing. **No "Write a review" button.**
3. **"Get directions" buttons:** use `mapsUrl` when set; otherwise keep the current address search link.
4. **`sameAs`** in the MedicalClinic / Physician JSON-LD: only the non-empty `mapsUrl` values. No social links (there are none).
5. **Remove the old "Patient reviews" block (plan H9) from Home.** Replace it with nothing, or move the trust strip up so there is no gap. Show me a screenshot.
6. **Map:** confirm the contact page map is click-to-load, with zero requests to Google domains before the click.

---

## PART 4. Analytics (only after consent)

1. **GA4 via `gtag.js`** (not GTM). The ID is `NEXT_PUBLIC_GA_ID`; if it is not set, nothing loads.
2. **Consent Mode v2:**
   - Default: `analytics_storage`, `ad_storage`, `ad_user_data` and `ad_personalization` all `denied`.
   - **Inject the gtag script only after the visitor clicks Accept** (use `hasAnalyticsConsent()`).
   - On Accept: `analytics_storage` becomes `granted`. The ad signals stay denied forever.
   - On withdrawal (the footer "Cookie settings" link):
     - update to `denied`
     - delete the `_ga` and `_ga_*` cookies
     - stop sending events
3. **Events** (only when consented):
   - `book_click` (with `location`: header, hero, mobile_bar, page_cta)
   - `call_click`
   - `whatsapp_click`
   - `directions_click`
   - `map_load`
   - `video_play`
   - `generate_lead` (ONLY `form_type`)
4. **No personal or health data in GA:**
   - Never send names, phone numbers, ages, reasons, form contents or the doctor chosen.
   - Strip all query parameters from `page_location` except `utm_*`.
   - Turn off Google signals and ad personalisation.
5. **Vercel Speed Insights** (cookieless). Report its JS cost; it must stay within the 230 KB Home budget.
6. **Search Console:** support `NEXT_PUBLIC_GSC_VERIFICATION` (meta tag). DNS TXT verification is preferred at launch.

---

## PART 5. Tests, report, then STOP

### A. Playwright and launch-check
**Playwright:**
- Appointment form:
  - empty submit shows the error summary and focus moves to it
  - invalid mobile number
  - age 12 without the guardian box is blocked, and works with it
  - Sunday note
  - success (`FORM_TEST_MODE=1`)
  - a forced failure shows the Call and WhatsApp fallback, with the data kept
- Workshop form: success and failure.
- Honeypot filled: no send.
- Before consent: zero requests to googletagmanager, google-analytics, google.com/maps, youtube or youtube-nocookie on Home, Contact and one blog post.
- After Accept: gtag loads and `page_view` fires. After withdrawal: the cookies are gone.
- Prefill works on 4 sample pages.
- The nested-links check still passes.
- `grep` finds zero `ajaykaduskar@gmail.com` and zero "Sugar ki Baat".

**`launch-check` fails in production if:**
- any of the `RESEND_*` or `FORM_*` variables is missing
- `FORM_FROM_EMAIL` uses `resend.dev`
- `FORM_TEST_MODE` is set
- `googleProfiles` links are empty (warning only)
- `SITE_INDEXABLE` is not `true` on the final domain (warning until Phase 7)

**Real send test:** after I add the keys, send one appointment request and one workshop request from the preview. Screenshot the received emails and the workshop acknowledgement.

### B. Report
- the preview URL
- Part 0 results:
  - Basic Auth working
  - `curl -I` showing the noindex headers and `robots.txt`
  - the canonical host
  - the `cv-auto` list
  - the Lighthouse medians
  - the hero screenshots
- Part 1:
  - a checklist of every `client-answers.md` item with done / not done
  - before/after screenshots: Dr. Ajay's profile (full page at 1440 and 390), Home video section, check-ups page, the new "coming from outside Nagpur" page, Pharmacy, Cancellation policy
  - the logo PNG vs SVG comparison
  - the remaining `launch-check` list
- Part 2: screenshots of both forms at 390 and 1440 in these states: empty, errors, guardian, failure, thank-you.
- Part 3: the Contact and footer Google links, and Home without the reviews block.
- Part 4: the consent test results.
- Home JS size before and after.
- Env vars: the list, and which are set.

### C. Setup instructions for me (exact, numbered)
1. **Resend:**
   - create the account
   - add the domain `niramayclinics.com`
   - the exact DNS records to ADD (SPF / DKIM / DMARC), with a warning not to change MX
   - verify
2. **Cloudflare Turnstile:** the site and secret keys.
3. **GA4:**
   - create the property and web data stream
   - turn off Google signals
   - set data retention to 2 months
   - add `ajaykaduskar@gmail.com` as an Administrator so the clinic owns its data
4. **Search Console:** the domain property, also shared with `ajaykaduskar@gmail.com`.
5. **Google Business Profile:** where to copy each profile's Maps share link and review link.
6. **Vercel:** the env vars to add for Preview and Production.

### D. Rewrite `resources/docs/client-inputs-needed.md`
It is now short. Remove everything `client-answers.md` has resolved. List only:
- the MMC registration numbers (Dr. Ajay, Dr. Prajakta) ★
- the medical sign-off of all pages by both doctors ★
- the legal review of the legal pages ★
- logo SVG approval
- agency tasks: Resend DNS, Turnstile, GA4, Search Console, the two GBP links

Update the totals and the ★ items.

STOP after this. Do not start Phase 7 (domain switch, go-live redirects, Search Console submission, Blooming Buds GBP).
