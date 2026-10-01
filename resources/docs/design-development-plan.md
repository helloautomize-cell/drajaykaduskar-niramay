# Niramay Clinics: Design and Development Plan

**Purpose:** the single plan for designing and building the new Next.js website.
**Inputs:** `resources/content/` (48 pages + 5 blog posts), `resources/images/IMAGE-GUIDE.md`, `resources/docs/site-plan.md`, the Niramay logo, the plum to indigo gradient, and reference screenshots of olivaclinic.com (desktop and mobile) and automizemedialabs.com.
**Prepared:** October 2026

---

## 0. Approved decisions (1 Oct 2026)

- **Background:** white throughout (approved white preview). Ivory `#F8F5F1` is no longer the page background; use `#FFFFFF` for page and hero, keep `--plum-50` / `--plum-100` tints for chips, tabs and soft glows. The hero is a **white panel** with peach and plum glows, ink text, and the gradient kept for buttons, the active tab and the mobile bar.
- **Dr. Ajay hero image:** `Dr ajay Kaduskar in appron.png` (AI-generated, white coat), processed as `public/images/doctors/dr-ajay-kaduskar-hero.jpg`. Approved by Dr. Ajay (marketing contract); a real portrait may still replace it after the photo shoot if preferred. The doctor card keeps the real "keep things simple" photo, recropped.
- **Dr. Prajakta hero image:** the AI-generated white-coat portrait (purple saree), processed as `public/images/doctors/dr-prajakta-kaduskar-hero.jpg`. Approved by Dr. Prajakta (marketing contract). Her doctor card keeps the real photo `Child specialist niramay.jpg`.
- **Everything else** in the preview (cards, colours, type, buttons, step tracker, carousel, mobile bar) is approved as shown.
- All AI doctor images approved by both doctors; all clinic photo consents confirmed (marketing contract).

## 1. Design direction in one paragraph

A calm, premium medical site that feels like a senior specialist practice, not a chain. Structure, rhythm and conversion patterns come from **Oliva**: utility bar, mega menu, dark hero with a doctor chip, icon cards, tabbed services with arch images, doctor cards, blog cards with author and date, rich footer, fixed mobile action bar. Refinement comes from **Automize**: warm ivory backgrounds, numbered eyebrow labels ("01 / ..."), one italic serif accent word per headline, the centred card carousel, and the vertical step tracker with progress dots. Colour comes from the **Niramay gradient (plum to indigo)**. Red stays inside the logo and urgent alerts only.

### 1.1 What we take from the references, and what we must not

| From | We adopt | We do not adopt (and why) |
|---|---|---|
| Oliva | Utility bar, mega menu with category icons, dark gradient hero, doctor chip in hero, 6 "why choose" icon cards, tabbed service section with arch-shaped images, doctor cards with credentials, languages and Book button, blog cards with "Written by / Updated on", large link footer, fixed mobile bar (Book, Call, Chat), book-appointment page with form beside an image | "8 lakh happy clients", "95% satisfaction", "Best dermatologists", "Leading chain", "Achieve improvement in a few sessions", star ratings per doctor, testimonial cards, before and after gallery, price offers ("starting at ₹4000"), push-notification pop-up. These are self-praise, inducements or testimonials, which the 2002 conduct regulations and the Drugs and Magic Remedies Act rule out for doctors (see `resources/docs/site-plan.md` §0.4). |
| Automize | Ivory background, numbered eyebrow labels, italic serif accent word, centred carousel with faded side cards and pill dots, vertical step tracker ("pointer") with numbered stages, thin divider lines, generous whitespace | Marketing language. Their copper accent (we use our plum). |
| Both | Restraint: few colours, one sans family, large headings, lots of air | Copying their text, photos, icons or exact layouts. We match the quality and patterns, not the assets. |

---

## 2. Design system

### 2.1 Colour palette

Sampled from the supplied gradient (`#734569` to `#453E6D`) and the logo (red `#E61E25`, peach `#F2957A`). Contrast ratios are measured against white.

| Token | Hex | Use | Contrast on white |
|---|---|---|---|
| `--plum-700` | `#734569` | Primary brand, links, active states, gradient start | 7.5 : 1 |
| `--indigo-800` | `#453E6D` | Gradient end, primary buttons, hero panels | 9.7 : 1 |
| `--plum-500` | `#8E5A83` | Hover states, icon strokes, secondary text accents | 5.3 : 1 |
| `--plum-100` | `#F3ECF2` | Tinted section backgrounds, chips, tab inactive | |
| `--plum-50` | `#FAF6F9` | Card fill on ivory | |
| `--ink-900` | `#2A2440` | Headings and body text (warm near-black, not pure black) | 14.7 : 1 |
| `--ink-600` | `#5B5670` | Secondary text, captions | 7.0 : 1 |
| `--ivory-50` | `#F8F5F1` | Main page background (from Automize) | |
| `--white` | `#FFFFFF` | Cards, header | |
| `--line` | `#E8E2E6` | Dividers, card borders | |
| `--peach-300` | `#F2957A` | Decorative only: arch backgrounds, soft glows, illustration accents. **Never for text.** | 2.2 : 1 |
| `--logo-red` | `#E61E25` | Logo, and emergency notices only | 4.6 : 1 |
| `--success` | `#2F7D5B` | Form success | |

**Gradients**
- `--grad-brand: linear-gradient(90deg, #734569 0%, #453E6D 100%)` for primary buttons, the hero panel and the active tab.
- `--grad-hero: radial-gradient(120% 120% at 15% 10%, #5C416B 0%, #453E6D 55%, #2E2A4D 100%)` for the dark hero panel (gives Oliva-style depth).
- `--grad-soft: linear-gradient(180deg, #FAF6F9 0%, #F8F5F1 100%)` for section transitions.
- `--glow-peach: radial-gradient(closest-side, rgba(242,149,122,.35), transparent)` as a soft blurred blob behind arch images and the doctor cut-out.

**Rules:** at most one gradient surface per viewport. Body text is always `--ink-900` on white or ivory, or white on `--grad-hero`.

### 2.2 Typography

- **Primary family: Figtree** (Google Fonts, variable 300 to 800). This is the closest open-licence match to Oliva's geometric sans. Windsurf should confirm Oliva's font in Chrome DevTools (Computed, font-family). If Oliva uses a licensed font, keep Figtree. Do not copy licensed font files.
- **Accent family: Instrument Serif, italic** (Google Fonts). Used for **one word or short phrase per section heading** only, as Automize does ("care that is *planned around you*").
- **Devanagari: Noto Sans Devanagari** for Marathi and Hindi text (the brand name निरामय, the prayer, later translations).
- Load with `next/font` (self-hosted, `display: swap`, subset latin + devanagari).

| Style | Desktop | Mobile | Weight | Notes |
|---|---|---|---|---|
| Display (hero H1) | 64 / 68 | 38 / 44 | 700 | letter-spacing −0.02em |
| H1 (page) | 52 / 58 | 34 / 40 | 700 | |
| H2 (section) | 40 / 48 | 28 / 34 | 650 | |
| H3 (card) | 22 / 30 | 20 / 28 | 600 | |
| Eyebrow | 13 / 16 | 12 / 16 | 600 | uppercase, letter-spacing 0.14em, `--plum-700`, format "01 / WHY NIRAMAY" |
| Body large | 19 / 30 | 18 / 28 | 400 | intros |
| Body | 17 / 28 | 17 / 27 | 400 | **minimum 17px**; older patients |
| Small | 14 / 20 | 14 / 20 | 500 | captions, meta |

### 2.3 Spacing, radius, elevation

- 8px grid. Section padding 120px desktop, 72px mobile. Max content width 1240px; text measure max 68ch.
- Radius: cards 20px, buttons 12px (Oliva-like squared pill), chips 999px, arches `border-radius: 999px 999px 24px 24px`.
- Shadows: `--shadow-card: 0 1px 2px rgba(42,36,64,.04), 0 12px 32px -12px rgba(69,62,109,.18)`; hover `0 20px 48px -16px rgba(69,62,109,.28)`.

### 2.4 Glass effect (cards, carousels, header, mobile bar)

```css
.glass {
  background: rgba(255,255,255,.62);
  backdrop-filter: blur(18px) saturate(140%);
  -webkit-backdrop-filter: blur(18px) saturate(140%);
  border: 1px solid rgba(255,255,255,.55);
  box-shadow: var(--shadow-card), inset 0 1px 0 rgba(255,255,255,.6);
}
.glass-dark { /* on the hero gradient */
  background: rgba(255,255,255,.10);
  border: 1px solid rgba(255,255,255,.18);
  backdrop-filter: blur(16px);
  color: #fff;
}
@supports not (backdrop-filter: blur(1px)) { .glass { background: rgba(255,255,255,.94); } }
```

**Rules:** glass only works over something worth blurring. Place glass cards over a gradient, a soft peach glow or a photo, never over flat white. Text inside glass must still reach 4.5:1. Use at most about 12 blurred elements per viewport, for performance.

### 2.5 Motion and interaction

- **Smooth scrolling:** Lenis, with `lerp 0.1`; disabled when `prefers-reduced-motion`.
- **Reveal on scroll:** fade up 16px, 500ms, `cubic-bezier(.22,1,.36,1)`, staggered 60ms inside groups. Runs once.
- **Card hover:** lift 4px, shadow to hover level, icon stroke changes to the gradient, arrow slides 4px right. 200ms. On touch devices, the same state applies to `:active`.
- **Carousels:** Embla Carousel with free drag, snap, momentum, arrows plus pill dots (Automize style: the active dot widens into a pill). Keyboard arrows work. Auto-play off by default (accessibility). Side cards in the centred carousel scale to 0.92 with 0.55 opacity and slight tilt.
- **Buttons:** primary is the gradient fill; on hover the gradient shifts position (background-size 200%) plus a 1px lift. Book Appointment uses the Oliva two-part style: icon block plus label.
- **Parallax band** (from the old site): sticky image layer with the content card scrolling over it, built with `position: sticky` and transforms, not `background-attachment: fixed` (which breaks on iOS).
- All motion is wrapped in a `useReducedMotion` check.

### 2.6 The "pointer": step tracker (from Automize)

A sticky left column shows a large number ("03"), a short label, and a vertical line with dots. Dots fill with plum as the user scrolls through stages; completed stages are filled, the current stage gets a halo ring, and future stages are grey. The right column lists the stages. The current stage is full opacity; others are at 40%.

**Where we use it**
1. Home: "Your first visit, step by step" (Book → Arrive and register → Consultation → Tests in-house → Plan and pharmacy → Follow-up)
2. Plan Your Visit page (same stages, more detail)
3. Diabetes hub: "What your care includes" (6 stages)
4. Career counselling: process (5 stages)

On mobile it collapses to a horizontal progress bar with numbered dots above the content.

### 2.7 Iconography

- One custom **line-icon SVG set**: 1.75px stroke, 24px grid, rounded caps, `currentColor`, with a gradient stroke on hover. Built as React components.
- It replaces the interim PNG icons in `resources/images/` (they have a white background, are raster, and include the leaf/DNA issues).
- Icons needed: diabetes (glucometer drop), type 1 (insulin pen, neutral, no brand), pregnancy, eye screening, kidney, foot, heart, ECG wave, echo, treadmill, blood pressure cuff, thyroid, scale/tape (no body silhouette), nutrition plate, muscle, check-up clipboard, baby, syringe/vaccine, teen, mind/brain, IQ puzzle, career compass, workshop, lab flask, home collection, pharmacy, delivery parcel, lift, wheelchair, parking, clock, phone, WhatsApp, calendar, map pin, emergency.
- Base set: Lucide (MIT) where suitable; custom-draw the medical ones in the same stroke style.

### 2.8 Imagery style

- **Real photos** for doctors, team and clinic (from `IMAGE-GUIDE.md`), colour-graded to a consistent warm-neutral look.
- **Doctor cut-outs:** background removed, placed on the hero gradient with a peach glow behind (Oliva doctor-group style).
- **Arch images** for the service tabs (Oliva style): an object or lifestyle image inside an arch shape on a `--plum-50` arch with a peach glow. See §5.2 for the set to create.
- No stock "patients", no before and after, no images implying results.

### 2.9 Buttons and CTAs

| Button | Style | Label examples |
|---|---|---|
| Primary | gradient fill, white text, 12px radius, 52px height | Book appointment |
| Book (header) | Oliva two-part: plum calendar block + indigo label block | Book Appointment |
| Secondary | white glass, plum border | Call 0712 2422214 |
| Text link | plum, arrow icon that slides on hover | Read profile → |
| Tab | inactive `--plum-100`, active gradient fill | Diabetes and Metabolic |

### 2.10 Fixed mobile action bar (Oliva-style, our theme)

- Visible under 1024px on every page. 64px tall plus `env(safe-area-inset-bottom)`.
- Glass background over a plum to indigo gradient at 92% opacity, 1px top highlight, top corners 16px.
- Three equal buttons, each with a 20px line icon above a 13px/600 label, separated by thin 20% white dividers:
  1. **Book Now** (calendar icon) → `/contact/#book`
  2. **Call Now** (phone icon) → `tel:+917122422214`. On tap, a small sheet lets the user choose between the landline and the mobile.
  3. **WhatsApp** (WhatsApp glyph) → `https://wa.me/918459141584?text=` with a pre-filled message based on the current page (e.g. "Hello, I would like to book an appointment for Thyroid Clinic").
- Tap targets of at least 48px, a pressed state that dims to 85%, a haptic-style scale to 0.97, and an `aria-label` on each button.
- Page bottom padding adds 80px so the footer is never hidden.
- The bar hides while the on-screen keyboard is open (form focus) and on the thank-you page.
- **Desktop:** a floating WhatsApp button at bottom right (glass circle, 56px), plus Book in the header.

---

## 3. Screen-by-screen review: reference → Niramay section spec

### 3.1 Global shell

| # | Reference screen | Niramay version | Resources | Status |
|---|---|---|---|---|
| G1 | Oliva utility bar (language, links, hours, phone) | Thin ivory bar: "English" (Marathi later) · Plan your visit · Health Library · "OPD Mon to Sat [hours]" · "Lab 7 am to 7 pm" · phone · red "Emergency? 108 / 112" | Hours **[CONFIRM]** | Content ready except hours |
| G2 | Oliva header: logo left, menus, two-part Book button | White glass header, sticky, shrinks on scroll (88px to 68px). Logo left (`Nirmay-nlogo-retina.png` now, SVG later). Menus: Diabetes and Heart · Child and Teen · Lab and Pharmacy · Doctors · Patient Info · Book Appointment | Logo SVG **needed** | Partly ready |
| G3 | Oliva mega menu (treatments with category icons, multi-column) | **Diabetes and Heart** mega menu: 4 columns (Diabetes · Weight · Heart · Other: thyroid, BP, nutrition, check-ups), each with an icon heading. **Child and Teen**: 2 columns plus a promo card for the doctor. A "Conditions" column lists common conditions linking to pages. | Icons (§2.7) | Content ready |
| G4 | Oliva footer (link columns, social, legal) | Ivory footer: logo + address + hours + map link · Services columns · Patient info · Legal (7 pages) · emergency line · Google review links · social icons [CONFIRM accounts] · © line | All content ready | Ready |
| G5 | Oliva mobile bar | §2.10 | Ready | Ready |
| G6 | Oliva push pop-up, newsletter | **Drop both.** A newsletter needs a DPDP-compliant consent flow and adds no value at launch. | | |
| G7 | Cookie banner | Small glass card bottom left: "We use essential cookies, and analytics only if you agree. [Accept] [Decline] [Settings]" | Text ready (privacy page) | Ready |

### 3.2 Home page (top to bottom)

| # | Reference | Niramay section | Content source | Images | Gap |
|---|---|---|---|---|---|
| H1 | Oliva dark hero: big headline left, doctor chip, stacked photo cards right with dots | **Hero.** `--grad-hero` panel with 24px radius inset (as Oliva). Left: eyebrow "NIRAMAY CLINICS · DHANTOLI, NAGPUR", H1 from home.md with an italic accent word, two buttons, a glass doctor chip ("Specialist-led care · Dr. Ajay and Dr. Prajakta Kaduskar"). Right: a fan of 4 stacked glass-framed cards that rotate every 6s (pausable): (1) Dr. Ajay standing cut-out, (2) Dr. Prajakta, (3) eye screening, (4) reception. | home.md + Appendix A | `Dr ajay.jpg` cut-out ✅ · Prajakta 4:5 portrait ⚠️ crop of desk photo for now · `slide_img2` ✅ · `Niramay waiting launge.jpg` (blurred faces) ✅ | **Need:** Dr. Prajakta standing portrait (shoot); background-removed cut-outs |
| H2 | Oliva "Why choose" 6 icon cards | **"01 / Why Niramay"**: 6 glass cards on the soft gradient. Facts only (Appendix A.2). | Appendix A.2 | Icons (§2.7) | Icons to draw |
| H3 | Oliva doctors group + floating stat badges | **"02 / Two specialists, one family practice"**: left, team photo `slide_img6` (cropped) or both cut-outs on an arch with peach glow; 3 floating glass badges: "20+ years each in practice", "2 specialist centres", "Lab open 7 am to 7 pm". Right: heading, short text, buttons to both doctor profiles. | about.md | `slide_img6` ✅ | Badge facts **[CONFIRM years]** |
| H4 | Oliva tabbed treatments with arch images | **"03 / How we can help"**: tabs "Diabetes and Metabolic · Heart · Child and Teen · Lab and Pharmacy". Each tab has a one-line intro plus 4 to 6 arch cards (image, title, arrow) in a smooth Embla row with "View all". | services.md | **16 arch images** (§5.2) | **Biggest gap** |
| H5 | Automize step tracker | **"04 / Your first visit, step by step"** (§2.6) | plan-your-visit.md + Appendix A.4 | Icons | Ready |
| H6 | Old site parallax band | **Sticky exterior image** (`Section_bg_img2`) with a glass card: address, "Lift · Wheelchair friendly · Parking", "Get directions" | plan-your-visit.md | ✅ | Ready |
| H7 | Oliva doctor cards (photo, name, degrees, rating, languages, Book) | **"05 / Your doctors"**: 2 large cards: square portrait on matching ivory background, name, degrees, role, languages, "View profile" + "Book". **No star rating per doctor.** | doctor pages | Portraits: Ajay ✅ (crop), Prajakta ⚠️ | Matching-background portraits (shoot or cut-out on a plain backdrop) |
| H8 | Automize centred carousel | **"06 / Conditions we look after"**: centred carousel of 8 condition cards (Type 2 diabetes, Prediabetes, Thyroid, High BP, Weight, Teen stress, PCOS, Vaccinations), each with a 2-line description and link. Side cards faded. | Page intros | Icons | Ready |
| H9 | Oliva reviews block | **"07 / Patient reviews"** (compliant): Google logo, aggregate rating and count pulled live from both profiles (Places API, cached daily), "Read reviews on Google" and "Write a review" buttons. **No quote cards.** | site-plan | none | Places API key |
| H10 | Oliva blog cards with author and updated date | **"08 / From our Health Library"**: 3 glass cards: image, category chip, title, "Written by Dr. ... · Reviewed on ..." | blog/ | Blog hero images (§5.2) | 4 blog images |
| H11 | (Oliva FAQ elsewhere) | **"09 / Quick answers"**: accordion, 4 FAQs from home.md + link to FAQs | home.md | none | Ready |
| H12 | Contact strip | Map embed (lazy, click-to-load for privacy) + hours + phones + Book CTA | contact.md | none | Hours |

### 3.3 Other templates

| Template | Reference cues | Structure |
|---|---|---|
| **Service hub** (diabetes, obesity, heart-care, blooming-buds) | Oliva treatment pages + Automize sections | Breadcrumb · hero (H1, intro, image on arch, Book + Call) · "Conditions we care for" icon grid · step tracker "What care includes" · sub-service cards carousel · stat/fact strip · FAQ accordion · reviewer box · related pages · CTA band |
| **Service detail** (type-2, 2d-echo, etc.) | Oliva | Breadcrumb · compact hero with arch image · sticky in-page table of contents (desktop right rail, with Book card) · content sections from MD (tables styled, warning boxes styled) · FAQ · reviewer box · related services · CTA |
| **Doctor profile** | Oliva doctor card, expanded | Split hero: portrait cut-out on gradient + key-facts glass card · About · Areas of care chips · Approach (pull quote "keep things simple" in serif italic) · Awards grid [CONFIRM] · Memberships · Articles · Videos · Book CTA |
| **Book appointment / Contact** | Oliva book page (form right, image left) | Left: clinic image with glass info cards (address, hours, emergency); right: form (contact.md fields). **No price offers.** |
| **Blog list** | Oliva topics chips + recent post cards | Topic chips (categories) · featured post · grid of cards with author and updated date |
| **Blog post** | | Title, author chip with photo, reviewed date, reading time, hero image, body (68ch), summary box, FAQ, sources, author box, related posts |
| **Legal** | | Simple, readable: left TOC, last-updated date, print button |
| **Utility** | | Thank-you and 404 with gradient illustration and CTAs |

---

## 4. Content resources: status and gaps

| Need | Status | Action |
|---|---|---|
| Page body content (48 pages) | ✅ `resources/content/` | Render from MD |
| 5 blog posts | ✅ text, ⚠️ edits needed (§5.1 of migration notes) | Apply medical correction and copy-edit before launch |
| Home microcopy (hero variants, why-choose cards, badges, tab intros, step tracker, carousel cards) | ✅ written in **Appendix A** of this file | Save as `resources/content/core/home-microcopy.md` |
| Mega menu groupings and labels | ✅ Appendix A.6 | |
| Alt text for every image | ❌ | Write during build, one per image, in `resources/images/alt-text.json` |
| Doctor facts: hours, fees, registration, awards, memberships | ❌ `[CONFIRM]` (112 items) | Send `doctor-questionnaire.md` now. **Launch blockers:** hours, registration numbers, Grievance Officer, pharmacy licence, doctor sign-off. |
| Google Places API key, social links | ❌ | Get from the clinic's Google account |

---

## 5. Image resources: status and gaps

### 5.1 What we have (usable now)

Logo PNG, both doctors (Ajay excellent; Prajakta usable), team outdoor, care team, 2 exteriors, Marathi board, reception board, reception with patients (blur faces), eye screening, sample collection, lab analysers, pharmacy, cardiac room, fundus detail, blog thumbnail.

### 5.2 What we must create

| # | Asset | Qty | How | Priority |
|---|---|---|---|---|
| I1 | **Logo SVG** (wordmark + mark) | 1 | Get the original from the designer, or have it vector-traced professionally | Launch blocker |
| I2 | **Doctor cut-outs** (background removed) from `Dr ajay.jpg` and the Prajakta photo | 2 | Background removal tool (remove.bg or `rembg` locally), edge clean-up, export PNG/WebP with alpha | Week 1 |
| I3 | **Professional photo shoot** (half day) | about 25 frames | Both doctors standing and seated on a plain ivory backdrop (matching), both together, consultation moments (staff or consenting adult volunteers acting as patients, with written consent), cardiac room clean, lab wide, InBody in use, counselling room, waiting area, awards close-ups, exterior at golden hour without vehicles | Before launch; **hero quality depends on it** |
| I4 | **16 arch images** for the service tabs and hub heroes (Oliva style) | 16 | Option A (recommended): object and still-life photography in one shoot (glucometer and fresh plate, BP cuff, stethoscope on ECG paper, measuring tape with vegetables, baby shoes with vaccination card, school bag with notebook, lab tubes, pharmacy shelf, etc.) on plum/peach backdrops. Option B: AI-generated still-life images using the prompts in Appendix B, **objects only, no people presented as patients, no brand names**. Each is cut out and placed on the CSS arch. | Week 2 |
| I5 | **Line-icon set** (SVG) | about 40 | Built in code (§2.7) | Week 1 |
| I6 | Hero decorative shapes: soft peach blobs, thin arc lines (as in Oliva's hero curves) | 3 | SVG in code | Week 1 |
| I7 | **Blog hero images** (5 posts + future) | 5 | Still-life or illustration per topic (Appendix B), 1600×900 | Week 3 |
| I8 | OG / social share images | 1 template | Generated per page with `next/og` (gradient, title, logo) | Week 4 |
| I9 | Favicon set | 1 | From the logo mark (SVG + PNG sizes) | Week 1 |
| I10 | Empty-state / 404 illustration | 1 | Simple SVG in brand colours | Week 4 |

**Rule for any AI-generated image:** never depict the doctors, the clinic interior or "patients" as if real. Objects, textures and abstract shapes only. Note AI use in the Editorial Policy (already drafted).

---

## 6. Technical architecture

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js (App Router, latest stable at build time), TypeScript, React Server Components | SEO, speed, static generation |
| Styling | Tailwind CSS (v4) with design tokens from §2 as CSS variables | Fast, consistent |
| UI primitives | Radix UI via shadcn/ui (Navigation Menu, Accordion, Dialog, Tabs, Sheet) | Accessible mega menu, accordions, mobile sheet |
| Motion | Motion (Framer Motion) + Lenis | Reveal, hover, smooth scroll |
| Carousels | Embla Carousel | Smooth drag, snap, accessible |
| Content | MD/MDX files in `resources/content/`, parsed at build time with frontmatter validated by Zod (Velite or a small custom loader) | Content stays editable as files |
| Forms | React Hook Form + Zod, Server Action → email to clinic (Resend or SMTP) + optional WhatsApp notification; hCaptcha or Turnstile | Spam-safe, no database at launch |
| Images | `next/image` (AVIF/WebP), blur placeholders, art-directed crops | LCP |
| Maps | Google Maps embed loaded on click (privacy and speed) | |
| SEO | `generateMetadata`, JSON-LD (MedicalClinic, Physician, MedicalWebPage with reviewedBy/lastReviewed, FAQPage, BreadcrumbList), `sitemap.ts`, `robots.ts`, 301 redirects from the audit §5 in `next.config` | |
| Analytics | GA4 via Google Tag Manager, **only after cookie consent**; Search Console; Vercel Speed Insights | DPDP-friendly |
| Hosting | Vercel (Mumbai region `bom1` for functions) | |
| Quality | ESLint, Prettier, Playwright smoke tests, Lighthouse CI, axe accessibility checks | |

### 6.1 Folder structure

```
niramayclinic-website/
├── resources/                    (all source material, not imported at runtime except content/)
├── app/
│   ├── (site)/layout.tsx         utility bar, header, footer, mobile bar, cookie banner
│   ├── (site)/page.tsx           home
│   ├── (site)/[...slug]/page.tsx renders any content page by URL from frontmatter
│   ├── (site)/doctors/[slug]/
│   ├── (site)/health-library/[slug]/
│   ├── (site)/contact/thank-you/
│   ├── api/ or actions/          appointment form action
│   ├── sitemap.ts  robots.ts  opengraph-image.tsx  not-found.tsx
├── components/
│   ├── layout/   UtilityBar, Header, MegaMenu, Footer, MobileActionBar, FloatingWhatsApp, CookieBanner, EmergencyNote
│   ├── sections/ Hero, WhyCards, DoctorsBadges, ServiceTabs, StepTracker, ParallaxBand, DoctorCards, CenteredCarousel, ReviewsGoogle, BlogCards, FaqAccordion, CtaBand, MapCard
│   ├── ui/       Button, BookButton, GlassCard, ArchImage, Eyebrow, AccentHeading, Chip, Tabs, Accordion, Breadcrumbs, ReviewerBox, Callout (info / warning / emergency), Table
│   └── icons/    custom SVG icon components
├── lib/          content loader + Zod schema, seo/jsonld helpers, site config (canonical NAP from site-plan)
├── public/images/ processed images only (kebab-case, from IMAGE-GUIDE)
└── styles/globals.css  tokens
```

---

## 7. Build phases (with acceptance criteria)

| Phase | Work | Done when |
|---|---|---|
| **0. Decisions and requests** (now) | Approve the palette and fonts in this file. Send the doctor questionnaire. Book the photo shoot. Request the logo vector. Move the project out of iCloud. | Approvals recorded here; shoot date fixed |
| **1. Foundation** | Next.js setup, tokens, fonts, Tailwind theme, `/styleguide` page showing every colour, type style, button, card, glass sample, chip, tab, accordion, callout and icon | Styleguide reviewed and approved on desktop and mobile |
| **2. Shell** | Utility bar, sticky header, mega menus, footer, mobile action bar, floating WhatsApp, cookie banner, emergency note, breadcrumbs, 404 | Navigation works by keyboard; mobile bar matches §2.10 on iPhone and Android |
| **3. Content pipeline** | Loader for `resources/content/` with Zod frontmatter; MD rendering with styled tables, callouts (detect "Emergency", "When to see a doctor urgently", "Important" blocks), FAQ extraction for schema; `[CONFIRM]` markers render as a visible yellow placeholder in dev and **fail the production build** | All 48 pages render at their URLs; build fails if any `[CONFIRM]` remains when `NODE_ENV=production` |
| **4. Home page** | Sections H1 to H12 | Design review passed; Lighthouse mobile ≥ 90 performance, 100 accessibility |
| **5. Templates** | Service hub, service detail, doctor, contact/book, blog list, blog post, legal | Every page uses a template; no one-off layouts |
| **6. Forms and integrations** | Appointment form, workshop request form, WhatsApp deep links per page, Google reviews widget, map click-to-load | Test submissions reach the clinic email; consent checkbox stored with the timestamp in the email |
| **7. SEO** | Metadata from frontmatter, JSON-LD, sitemap, robots, 301 redirects (audit §5), OG images | Rich Results Test passes; every old URL redirects |
| **8. Images** | Insert shoot photos, arch set, cut-outs; alt text for all | No placeholder images remain |
| **9. QA** | §8 checklist | All checks green |
| **10. Launch** | Doctor sign-off and legal review, DNS to Vercel, keep MX records, update both Google profiles' website links with UTM, Search Console sitemap submit, monitor 404s for 2 weeks | Live |

---

## 8. Quality bars and QA checklist

**Performance (mobile, 4G):** LCP < 2.0s, CLS < 0.05, INP < 200ms, total JS on home < 170 KB gzipped, hero image preloaded, fonts self-hosted.

**Accessibility (WCAG 2.1 AA):** contrast 4.5:1 (including text on glass), visible focus rings in plum, full keyboard use of mega menu, carousels and tabs, `prefers-reduced-motion` respected, form labels and errors announced, tap targets 48px, page usable at 200% zoom.

**Design:** same radius, shadow and spacing everywhere; one gradient surface per viewport; one italic accent per heading at most; no orphaned single words in headings; image crops face-safe on all breakpoints (360, 390, 768, 1024, 1280, 1440, 1920).

**Compliance:** no testimonials, ratings per doctor, before and after, superlatives, prices as offers, or medicine brand names; reviewer and last-reviewed date on every medical page; emergency guidance present; consent text under every form; cookie consent blocks analytics until accepted; no identifiable patient without consent.

**Content:** zero `[CONFIRM]` left; NAP identical to `site-plan.md` everywhere; all internal links resolve; spelling "Niramay" consistent.

**Devices to test:** iPhone SE and 15 (Safari), a mid-range Android (Chrome), iPad, MacBook Safari and Chrome, Windows Chrome and Edge.

---

## Appendix A. Home page microcopy (new, ready to use)

### A.1 Hero
- **Eyebrow:** NIRAMAY CLINICS · DHANTOLI, NAGPUR
- **H1:** Specialist care for diabetes, heart health and growing *children*
- **Sub:** Two experienced doctors, an in-house laboratory and pharmacy, and tests like 2D Echo, ECG and retinal screening, at one address in Dhantoli.
- **Buttons:** Book appointment · Call 0712 2422214
- **Doctor chip:** Specialist-led care · Dr. Ajay and Dr. Prajakta Kaduskar
- **Card captions (stacked fan):** "Diabetes, obesity and heart care" · "Child and adolescent care" · "Retinal screening for diabetes" · "Lab, pharmacy and tests in one place"

### A.2 "01 / Why Niramay" cards (facts only)
1. **20+ years of specialist practice.** Each of our doctors has more than two decades of clinical experience. [CONFIRM start years]
2. **Trained for what we treat.** MD with diabetology training and a Netherlands fellowship; paediatrics with adolescent health and clinical psychology.
3. **Tests under one roof.** Laboratory, 2D Echo, ECG, treadmill test, retinal photography and body composition analysis at the clinic.
4. **Diet advice you can follow.** Our nutritionist plans meals around your home food and routine.
5. **Care that continues.** Planned follow-ups, with your results and prescriptions kept together.
6. **Easy to reach.** Lab open 7 am to 7 pm, home sample collection, pharmacy with home delivery, lift and wheelchair access.

### A.3 Service tab intros
- **Diabetes and Metabolic:** Long-term care for diabetes, prediabetes, thyroid, blood pressure and weight, with complication screening built in.
- **Heart:** Find heart risk early with ECG, 2D Echo and treadmill testing, and a clear plan to lower it.
- **Child and Teen:** From baby check-ups and vaccines to puberty, stress, screens and career choices.
- **Lab and Pharmacy:** Tests from 7 am to 7 pm, home sample collection, and medicines dispensed on site.

### A.4 Step tracker: "Your first visit, step by step"
1. **Book.** Call, WhatsApp or send a request. We confirm your time.
2. **Arrive and register.** Bring old reports and your medicines. Our staff check weight, waist and blood pressure.
3. **Consultation.** Your doctor takes a full history, examines you and explains what they find.
4. **Tests, if needed.** Blood tests, ECG, Echo or eye screening, mostly done the same day.
5. **Your plan.** Targets, medicines and diet in writing. Collect medicines from our pharmacy if prescribed.
6. **Follow-up.** We book your next review so progress is tracked.

### A.5 "06 / Conditions we look after" carousel cards
Type 2 diabetes · Type 1 diabetes · Prediabetes · Diabetes in pregnancy · Thyroid disorders · High blood pressure · Weight and obesity · Heart risk · Baby growth and vaccines · Teen stress and anxiety · PCOS and periods · Career confusion
Each card: title, one line from the page intro, "Learn more →".

### A.6 Mega menu
- **Diabetes and Heart** · *Diabetes:* Diabetes care, Type 2, Type 1, Diabetes in pregnancy, Complications screening, Care programme, Prediabetes check · *Weight:* Obesity care, Weight-loss medicines, Body composition · *Heart:* Heart care, 2D Echo, ECG, TMT · *More:* Thyroid clinic, Hypertension clinic, Nutrition counselling, Health check-ups
- **Child and Teen** · Blooming Buds, Well baby clinic, Vaccinations, Teen health, Teen counselling, Psychological testing, Career counselling, School workshops · promo card: Dr. Prajakta Kaduskar
- **Lab and Pharmacy** · Laboratory, Home sample collection, Pharmacy
- **Doctors** · Dr. Ajay V. Kaduskar, Dr. Prajakta A. Kaduskar, About the clinic
- **Patient Info** · Plan your visit, FAQs, Health Library, Videos, Patient rights

### A.7 Badges (section H3)
"20+ years each in practice" · "2 specialist centres, 1 address" · "Lab open 7 am to 7 pm"

### A.8 CTA band (bottom of most pages)
**Heading:** Ready to talk to a *specialist*?
**Text:** Book a consultation by phone, WhatsApp or online. Bring your previous reports and medicines.
**Buttons:** Book appointment · WhatsApp us

---

## Appendix B. Image creation briefs (arch set and blog heroes)

**Common style for all:** soft natural light, shallow depth of field, warm ivory and plum/peach backdrop, clean composition with space at the top for the arch crop, no text, no logos or brand names, no people's faces, photorealistic still life. 1600×2000 portrait. Export cut-out PNG if the object sits on a plain backdrop.

| # | Use | Brief |
|---|---|---|
| 1 | Diabetes care | Glucometer with a test strip beside a steel thali with dal, roti, salad and curd, on a light wooden table |
| 2 | Type 1 diabetes | Generic insulin pen (no branding) and a small glucose sensor on a neat school-desk with a notebook |
| 3 | Diabetes in pregnancy | Soft folded baby blanket, a glucometer and a glass of water on a bedside table, morning light |
| 4 | Complications screening | Close-up of a retinal camera eyepiece with soft plum bokeh |
| 5 | Prediabetes check | Measuring tape loosely around a bowl of sprouts and fruit |
| 6 | Thyroid clinic | Blood test tubes in a rack with a lab request slip (blank), clinical but warm |
| 7 | Hypertension | Upper-arm BP monitor cuff on a table with a cup of herbal tea |
| 8 | Nutrition | Overhead view of a balanced Indian plate: millet roti, vegetables, paneer, dal, salad |
| 9 | Weight management | Measuring tape, a pair of walking shoes and a water bottle (no body shown) |
| 10 | Body composition | Feet-plate and handles of a body composition analyser, abstract crop |
| 11 | Heart care | Stethoscope resting on an ECG printout strip |
| 12 | 2D Echo / TMT | Treadmill console and ECG leads, clean crop, plum ambient light |
| 13 | Well baby / vaccination | Tiny knitted baby shoes beside a vaccination record card (blank) |
| 14 | Teen health and counselling | School bag, earphones and an open journal on a window seat |
| 15 | Career counselling | Compass on a notebook with blank mind-map sketches |
| 16 | Lab and pharmacy | Neatly arranged unlabelled medicine boxes and a pharmacy paper bag |
| B1 to B5 | Blog heroes | Diabetes myths: sugar cubes and a glucometer; Smart Love: two coffee mugs on a balcony at dusk; Self-esteem: hand-drawn sunrise in a sketchbook; Preparing for adolescence: growth-height marks on a door frame; Menstrual hygiene: soft folded cloth pouch and a calendar (tasteful, no products shown in use) |

---

## Appendix C. First prompt for Windsurf (Phase 1)

```
Read resources/docs/design-development-plan.md fully. We are starting Phase 1 only.
1. Create a Next.js app (App Router, TypeScript, Tailwind, ESLint) in this folder without touching resources/.
2. Implement the design tokens from section 2 (colours, gradients, type scale, spacing, radius, shadows, glass utilities) as CSS variables and Tailwind theme.
3. Load Figtree, Instrument Serif (italic) and Noto Sans Devanagari with next/font.
4. Install Motion, Lenis, Embla Carousel, Radix/shadcn primitives.
5. Build a /styleguide page showing every token and component in section 2: buttons (incl. the two-part Book button), glass cards (light and on the hero gradient), eyebrow, accent heading, chips, tabs, accordion, arch image frame, step tracker demo, centred carousel demo, mobile action bar (section 2.10), callouts (info, warning, emergency).
6. Respect prefers-reduced-motion everywhere. Body text minimum 17px.
Stop after Phase 1 and show me screenshots at 390px and 1440px.
```
