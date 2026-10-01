# Windsurf build prompt: Phase 1 (Foundation) and Phase 2 (Site shell)

> Attach to Windsurf with this prompt: `niramay-design-preview-white.html` and its PDF export (the approved visual reference). Everything else is already inside `resources/`.

---

## 1. Who we are building for, and what "done" looks like

We are building the new website for **Niramay Clinics, Dhantoli, Nagpur**: a two-doctor specialist outpatient practice.
- **Dr. Ajay V. Kaduskar**: diabetes, obesity, thyroid, blood pressure and heart care (Niramay Diabetes and Heart Care Centre).
- **Dr. Prajakta A. Kaduskar**: child and adolescent health, counselling, vaccination, career guidance (Blooming Buds Child and Adolescent Care Centre).
- The clinic also has an in-house laboratory and pharmacy.

The audience includes elderly diabetic patients and worried parents. The site must feel **calm, senior, trustworthy and premium**: closer to a high-end specialist practice than a chain clinic. It must be fast, accessible, mobile-first, and compliant with Indian medical advertising and data protection rules.

**This run covers Phase 1 (foundation and styleguide) and Phase 2 (global site shell) only.** No content pages yet. Stop after each phase, show screenshots, and wait for my approval.

---

## 2. Read these first (in this order) before writing any code

1. `resources/docs/design-development-plan.md`: **the master plan. Section 0 (Approved decisions) overrides everything else.** Read sections 2 (design system), 3.1 (global shell), 6 (architecture) and 8 (quality bars) in full.
2. **The attached `niramay-design-preview-white.html` (and PDF)**: the approved look. Open the HTML in a browser and study it closely: colours, spacing, glass cards, hover lifts, the step tracker, the centred carousel, the tabs with arch cards, the doctor cards, the callouts and the mobile action bar. **The production components must match this preview visually and in behaviour.** Where the preview and the plan differ, the preview wins for visuals; the plan wins for rules (compliance, accessibility, performance).
3. `resources/docs/site-plan.md`: page list, URL structure, navigation, footer contents, canonical clinic details (name, address, phones, email). **Use those details exactly, character for character, everywhere.**
4. `resources/images/IMAGE-GUIDE.md`: which image goes where and what preparation it needs.
5. `resources/content/_index.md`: the 48 pages and their URLs (needed for the mega menu and footer links).

Do not modify anything inside `resources/` except where this prompt says so.

---

## 3. Non-negotiable rules for the whole project

**Design**
- Background is **white** (`#FFFFFF`) everywhere, including the hero. Tints `#FAF6F9` / `#F3ECF2` are for chips, tabs, soft section washes and glows only.
- Brand gradient `linear-gradient(90deg, #734569, #453E6D)` is used for primary buttons, the active tab, the Book button and the mobile action bar. **At most one gradient surface per viewport.**
- Text: `#2A2440` (ink) and `#5B5670` (soft ink). Never pure black. Peach `#F2957A` is decorative only (glows, arch backgrounds), **never text**. Logo red `#E61E25` only in the logo and emergency notices.
- Fonts: **Figtree** (all UI and text), **Instrument Serif italic** (one accent word per section heading at most), **Noto Sans Devanagari** (Marathi and Hindi). Load with `next/font`, self-hosted, `display: swap`.
- **Body text minimum 17px.** Tap targets minimum 48px.
- Glass effect exactly as in the plan §2.4 and the preview: only over a tint, glow or photo, never over flat white; text inside must reach 4.5:1 contrast; provide the `@supports not (backdrop-filter)` fallback.
- Motion: 200 to 600ms with `cubic-bezier(.22,1,.36,1)`. Hover lifts 4px with a deeper shadow. Every animation respects `prefers-reduced-motion`. Lenis smooth scroll is disabled under reduced motion.
- No em dashes in any UI text you write.

**Compliance (medical website in India)**
- No testimonials, no star ratings per doctor, no "best", "No. 1", "leading", "guaranteed", "cure", no before and after images, no price offers, no medicine brand names.
- An emergency line appears in the utility bar and on every medical page: "Medical emergency? Call 108 or 112."
- Analytics must not load until the visitor accepts cookies.
- Every form shows the consent line from `site-plan.md` §0.5.

**Engineering**
- Next.js App Router (latest stable), TypeScript strict, Tailwind CSS v4 with tokens as CSS variables, ESLint and Prettier.
- Libraries: `motion` (Framer Motion), `lenis`, `embla-carousel-react`, Radix primitives via shadcn/ui (Navigation Menu, Accordion, Tabs, Dialog, Sheet), `lucide-react` as the base icon set, `sharp` for the image script.
- Server Components by default; client components only where interaction needs them.
- Images only through `next/image`, with explicit `sizes`, AVIF/WebP, and blur placeholders.

---

## 4. Phase 1: Foundation and `/styleguide`

### 4.1 Project setup
- Create the Next.js app in the project root alongside `resources/` (do not move or rename `resources/`).
- Folder structure exactly as in plan §6.1.
- Set up `lib/site-config.ts` with the canonical clinic details from `site-plan.md` (name, both centre names, address lines, phones, WhatsApp number `918459141584`, pharmacy number, email, lab hours "7 am to 7 pm", emergency numbers). Mark unknown OPD hours as `TODO_CONFIRM` constants, which render as a yellow placeholder in development.

### 4.2 Design tokens (`styles/globals.css` + Tailwind theme)
Implement every token from plan §2.1 to §2.3 with the white-background override from section 0:
- Colours: plum `#734569`, indigo `#453E6D`, plum-500 `#8E5A83`, plum-100 `#F3ECF2`, plum-50 `#FAF6F9`, ink `#2A2440`, ink-600 `#5B5670`, line `#E8E2E6`, peach `#F2957A`, logo-red `#E61E25`, success `#2F7D5B`, page `#FFFFFF`.
- Gradients: brand, hero glow (peach radial at top right + faint plum ring, as in the preview hero), soft section wash.
- Type scale from §2.2 (desktop and mobile sizes, weights, line heights, eyebrow style "01 / LABEL" with 0.14em tracking).
- Spacing (8px grid, section padding 120 / 72), radius (cards 20, buttons 12, chips pill, arch `999px 999px 24px 24px`), shadows (card and hover).
- Utility classes: `.glass`, `.glass-dark`, `.accent` (Instrument Serif italic), `.eyebrow`.

### 4.3 Components to build (each one must match the preview)
| Component | Notes |
|---|---|
| `Button` | Variants: primary (gradient, background-position shift on hover, 1px lift), secondary (white glass, plum border), text link (plum, arrow slides 4px on hover). Height 52px. |
| `BookButton` | Two-part: plum calendar-icon block + indigo label block, as in the preview hero. |
| `Eyebrow`, `AccentHeading` | `AccentHeading` takes a string and an `accent` word to render in Instrument Serif italic. |
| `GlassCard` | Icon tile (48px, plum-100 background, plum line icon), title, text; hover lift. Used for "Why Niramay". |
| `Chip`, `Tabs` | Tabs: inactive plum-100, active gradient; keyboard accessible (Radix). |
| `ArchCard` | Arch shape on plum-50 with a peach glow at the bottom, image or icon inside, round gradient arrow button overlapping the bottom edge, title below. Horizontal scroll row with snap. |
| `StepTracker` | Sticky left column (big number, label, vertical rail of dots: done = plum-500, current = plum with a plum-100 halo ring, future = line colour); right column of steps where the current step is full opacity and others are 40%. Driven by IntersectionObserver on scroll and by click. Collapses to a horizontal dot bar under 900px. |
| `CenteredCarousel` | Embla. Active card centred at full size; side cards `scale(.92) rotate(-1deg)` at 0.5 opacity. Round arrow buttons and pill dots (active dot widens to 26px). Drag and swipe, keyboard arrows, no autoplay. |
| `DoctorCard` | Photo left (42%), body right: name in plum, qualifications, role, language chips (English, हिन्दी, मराठी), Book button. Stacks on mobile. **No star rating.** |
| `Callout` | Variants: `emergency` (red-tinted, warning icon), `info` (plum-50, "Medically reviewed by ..."), `warning`. |
| `HeroFan` | Two stacked photo cards with 4px white border and frosted caption bar; they swap front and back every 4.5s (paused on hover and under reduced motion). |
| `DoctorChip` | Glass pill with two overlapping round avatars and the text "Specialist-led care · Dr. Ajay and Dr. Prajakta Kaduskar". |
| Icon set | `components/icons/`: line icons at 1.75px stroke, 24px grid, `currentColor`. Use Lucide where a good match exists; draw custom ones for glucometer drop, thyroid, kidney, foot, BP cuff, ECG wave, echo, treadmill, baby, vaccine, teen pair, career compass, lab flask, home collection, pharmacy, parcel. Match the icon styles in the preview. List all icons on the styleguide with their names. |

### 4.4 `/styleguide` page
One page showing: colour swatches with hex and contrast ratios; the type scale (including Devanagari sample "निरामय क्लिनिक"); all button variants; a "Why Niramay" row of 6 glass cards using the real copy from plan Appendix A.2; the tabs + arch row using the real tab intros from Appendix A.3; the step tracker with the 6 real steps from Appendix A.4; the centred carousel with 6 condition cards from Appendix A.5; both doctor cards; all callouts; the hero fan with the doctor chip; the full icon grid; and a phone-frame demo of the mobile action bar. `noindex` this page.

### 4.5 Phase 1 acceptance (show me before continuing)
- Screenshots of `/styleguide` at **390px** and **1440px**.
- Side-by-side comparison with the attached preview HTML; list any differences you could not match and why.
- Lighthouse accessibility score of 100 on `/styleguide`; no console errors; reduced-motion check done.

**Stop here and wait for my approval.**

---

## 5. Image processing (do this in Phase 1, after the styleguide is approved)

Write `scripts/process-images.mjs` using `sharp`. It reads originals from `resources/images/` (never changes them) and writes processed copies to `public/images/` with kebab-case names. Rules:
- Keep original resolution or smaller; never upscale. Output high-quality JPEG (quality 85) or PNG with transparency for logos; `next/image` handles AVIF/WebP at runtime.
- Apply only the treatments listed in the map below (crop, light brightness or contrast lift, white-background removal for icons). If a treatment cannot be automated well (face blurring, background removal for portraits), **do not fake it**: output an uncropped copy, add it to `public/images/_todo.md` with the exact task, and use a safe crop meanwhile.
- Write `public/images/alt-text.json` with descriptive alt text for every processed image (plain, factual, no promotional words).

### 5.1 Image map: source → processed file → where it is used

**Brand**
| Source (resources/images/) | Output (public/images/) | Used in |
|---|---|---|
| `Nirmay-nlogo-retina.png` | `brand/niramay-logo.png` (trim transparent padding) | Header logo, footer logo, OG template, schema `logo`. Add `_todo`: get or trace an SVG. |
| `Niramayclinic_favicon.png` | `brand/niramay-mark.png` + favicons 16, 32, 180, 192, 512 in `app/` | Favicon, app icons, compact sticky header on scroll, loader |

**Doctors**
| Source | Output | Used in |
|---|---|---|
| `Dr ajay Kaduskar in appron.png` | `doctors/dr-ajay-kaduskar-hero.jpg` | **Home hero fan (front card)**, Dr. Ajay profile hero, hero doctor-chip avatar (circle crop of face) |
| The Dr. Prajakta white-coat portrait (purple saree, hospital corridor) recently added to `resources/images/`; find it by viewing the newest images | `doctors/dr-prajakta-kaduskar-hero.jpg` | **Home hero fan (back card)**, Dr. Prajakta profile hero, Blooming Buds hub hero, hero doctor-chip avatar |
| `Dr ajay.jpg` | `doctors/dr-ajay-kaduskar-portrait.jpg` (crop to head and shoulders, centred on him, frame excluded) and `doctors/dr-ajay-kaduskar-keep-simple.jpg` (uncropped, 3:4) | Doctor card on Home and About (portrait crop); "Approach to care" section on his profile, showing the "keep things simple" frame |
| `NiramayClinic_Dr_AjayKaduskar.jpg` | `doctors/dr-ajay-kaduskar-avatar.jpg` (square, circle-safe) | Blog author byline, reviewer box on all diabetes and heart pages |
| `Child specialist niramay.jpg` | `doctors/dr-prajakta-kaduskar-portrait.jpg` (4:5 crop centred on her, desk clutter cropped) and `doctors/dr-prajakta-kaduskar-avatar.jpg` (square) | Doctor card on Home and About; byline and reviewer box on Blooming Buds pages and her 4 blog posts |
| `Dr Ajay Kaduskar close shot..png` | not processed | Keep as an alternative only. Do not use. |

**Team and clinic**
| Source | Output | Used in |
|---|---|---|
| `NiramayClinics_slide_img6.jpg` | `team/doctors-and-staff.jpg` (crop out the parked car and the sign on the right) | Home section "02 / Two specialists, one family practice"; About page hero |
| `NiramayClinics_slide_img7.jpg` | `team/care-team.jpg` | About page "The people you will meet" |
| `NiramayClinic_Section_bg_img2.jpg` | `clinic/exterior-wide.jpg` | Home sticky parallax "Visit us" band; Plan Your Visit hero. `_todo`: blur vehicle number plates |
| `Niramay clinic outside.jpg` | `clinic/exterior-entrance.jpg` | Contact page "Look for this entrance"; Plan Your Visit "Finding us". `_todo`: blur number plates |
| `Niramay board.jpg` | `clinic/signboard-marathi.jpg` (crop out the scooter mirror at the bottom) | About page credentials section; Plan Your Visit "Look for this board" |
| `NiramayClinic_Section_bg_img1.jpg` | `clinic/reception-board.jpg` | "Two centres, one family" band on About and Blooming Buds hub |
| `Niramay waiting launge.jpg` | `clinic/reception.jpg` (**until patient consent is confirmed, crop to the left part: staff, desk, reception board and the body composition analyser only, so no patient faces are visible**) and `clinic/body-composition-analyser.jpg` (tight crop on the analyser) | Home "Inside the clinic" card; Body Composition page; About facilities. `_todo`: full image only after consent or face blur |

**Services**
| Source | Output | Used in |
|---|---|---|
| `NiramayClinics_slide_img2.jpg` | `services/diabetic-eye-screening.jpg` | Diabetes Complications Screening hero; Home hero caption card option; Diabetes hub "What your care includes" |
| `NirmayClinics_Diabetes_Complication_Screening1.jpg` | `services/fundus-camera-detail.jpg` | Complications Screening page, "About the eye screening" |
| `NirmayClinics_Diabetes_Complication_Screening2.jpg` | `services/cardiac-room.jpg` (tight crop on the echo, ECG and treadmill; brightness +8%) | Heart Care hub, 2D Echo, ECG and TMT pages |
| `NiramayClinics_slide_img3.jpg` | `services/sample-collection.jpg` (crop out the fan and the chairs; reduce the yellow cast) | Home Sample Collection page; Laboratory page. `_todo`: blur patient face |
| `NirmayClinics_Inhouse_pathology.jpg` | `services/lab-analysers.jpg` (contrast +8%) | Laboratory page hero; "Lab and Pharmacy" tab arch card |
| `NirmayClinics_Pharmacy.jpg` | `services/pharmacy.jpg` | Pharmacy page hero; "Lab and Pharmacy" tab arch card |

**Verify first:** open both `Complication_Screening` files. Screening1 must be the fundus camera close-up and Screening2 the cardiac room. If they are the other way round, swap the output names.

**Blog**
| Source | Output | Used in |
|---|---|---|
| `Niramayclinics_Diabetes_Separating_Myths_Facts_By_Dr_Ajay_Kaduskar.jpg` | `blog/diabetes-myths.jpg` | Hero of "10 Common Myths About Diabetes"; Videos page thumbnail; Home "Health Library" card |
| (none for the other 4 posts) | | Use a generated gradient card with the category icon until the blog images in plan Appendix B are created |

**Icons**
- Do **not** use the PNG icons (`Diabetes_Care.png`, `Obesity_Care.png`, `Adolescent_Health_Care.png`, `Career_Counselling.png`, `Pharmacy.png`, `Diagnostic_Lab.png`). They are style references only. All icons on the site come from the SVG icon set built in 4.3.
- Arch cards in the service tabs use the large line icons on the arch (as in the preview) until the 16 still-life arch photos (plan Appendix B) exist. Build `ArchCard` so swapping in a photo later is a one-line change.

**Never use** (from IMAGE-GUIDE "Do not use"): washed-out slider images, mobile crops, the cut-out team composite, the stock injection-pen photo, the faceless doctor avatars, the other AI variations, the gradient PNG.

---

## 6. Phase 2: Global site shell

Build in `app/(site)/layout.tsx`. Every item below must work on all page sizes from 360px to 1920px.

1. **Utility bar** (desktop and tablet only; thin, white with a bottom hairline): "English" (language placeholder, non-functional for now) · Plan your visit · Health Library · "OPD: [TODO_CONFIRM hours]" · "Lab 7 am to 7 pm" · phone 0712 2422214 · **"Medical emergency? Call 108 or 112"** in logo red.
2. **Header**: sticky, white glass on scroll, height 88px shrinking to 68px; logo left (swap to the mark-only logo below 400px); nav right: Diabetes and Heart · Child and Teen · Lab and Pharmacy · Doctors · Patient Info; `BookButton` at far right linking to `/contact/#book`. Use the top offset `env(safe-area-inset-top)`.
3. **Mega menus** (Radix Navigation Menu), groupings exactly as plan Appendix A.6. Each column has an icon heading. "Child and Teen" includes a promo card for Dr. Prajakta (her avatar, name, one line, "View profile"). Open on hover and on click, close on Escape; fully keyboard navigable; links point to the URLs in `_index.md` (pages that do not exist yet can 404 for now).
4. **Mobile menu**: hamburger opens a full-height Sheet with accordion groups, the same links, and the Book and Call buttons at the bottom.
5. **Fixed mobile action bar** (under 1024px, every page), exactly as plan §2.10 and the preview phone demo:
   - glass over the brand gradient at 92% opacity, top corners 16px, 1px top highlight, `padding-bottom: env(safe-area-inset-bottom)`;
   - three equal buttons, each a 20px line icon above a 13px/600 label, thin white dividers: **Book Now** (`/contact/#book`), **Call Now** (opens a small Sheet: "Clinic 0712 2422214" and "Mobile +91 84591 41584", each a `tel:` link), **WhatsApp** (`https://wa.me/918459141584?text=` plus a message built from the current page title, for example "Hello, I would like to book an appointment for Thyroid Clinic.");
   - pressed state: scale 0.97 and 85% opacity; `aria-label` on each button; hides while a text input is focused (mobile keyboard open) and on `/contact/thank-you/`;
   - add 80px bottom padding to `<main>` and the footer on mobile so nothing is hidden behind it.
6. **Floating WhatsApp button** (desktop only): 56px glass circle at the bottom right, WhatsApp glyph in green, tooltip "Chat on WhatsApp".
7. **Footer**: white with a top hairline. Columns: (a) logo, full address, hours, phones, email, "Get directions" link; (b) Diabetes and Heart links; (c) Child and Teen links; (d) Patient Info links; (e) Legal: Privacy Policy, Terms of Use, Medical Disclaimer, Editorial Policy, Patient Rights, Cancellation and Refund, Accessibility. A bottom row with the Google review links for both profiles (placeholder URLs in `site-config`), social icons (hidden until URLs are confirmed), and "© 2026 Niramay Clinics, Nagpur. Information on this website is for general education and does not replace a consultation."
8. **Cookie banner**: small glass card at the bottom left (above the mobile bar on phones), with the text from plan §3.1 G7 and Accept, Decline and Settings buttons. Store the choice; expose `hasAnalyticsConsent()`. Load nothing analytics-related yet.
9. **Breadcrumbs** component (with BreadcrumbList JSON-LD) and **404 page** using the copy from `content/patient-info/404.md`.
10. **Smooth scroll** with Lenis (off under reduced motion) and the reveal-on-scroll helper (fade up 16px, once, with visible content at rest so screenshots and no-JS views still show everything).

### 6.1 Phase 2 acceptance
- Screenshots at 390px, 768px, 1024px and 1440px of: the header (default and scrolled), each mega menu open, the mobile menu open, the mobile action bar (with the Call sheet open), the footer and the cookie banner.
- Keyboard-only walkthrough of the header and mega menus works.
- The WhatsApp message changes with the page title.
- Lighthouse on the 404 page: Accessibility 100, Best Practices 100, Performance 95 or higher on mobile.
- A short report: what was built, deviations from the preview and why, and the contents of `public/images/_todo.md`.

**Stop after Phase 2 and wait for my approval before building any content page.**
