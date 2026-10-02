# Niramay Clinics website

Website for Niramay Clinics, a specialist outpatient clinic in Dhantoli, Nagpur.
Two practices share the site:

- **Niramay Diabetes and Heart Care Centre** — Dr. Ajay V. Kaduskar (diabetes,
  obesity, thyroid, blood pressure, metabolic and heart care)
- **Blooming Buds Child and Adolescent Care Centre** — Dr. Prajakta A. Kaduskar
  (child and adolescent health, counselling, vaccination and career guidance)

The site also covers the in-house laboratory and pharmacy.

## Stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS v4
- Radix UI primitives (navigation menu, dialog, accordion)
- Content lives in Markdown under `resources/content/` and is rendered at
  build time into static pages
- Forms post to Next server actions and send mail through Resend
- Cloudflare Turnstile (optional) and GA4 (consent-gated, Consent Mode v2)

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | local dev server |
| `npm run build` | production build |
| `npm start` | serve the production build |
| `npm run lint` | ESLint |
| `npm run images` | re-encode and strip metadata from images in `public/` |
| `npm run launch-check` | pre-launch check: unresolved markers, rendered-HTML hygiene, env rules |
| `npm run check-links` | nested-link validity check |
| `node scripts/check-design.mjs` | layout, overflow and carousel checks (Playwright) |
| `node scripts/check-menus.mjs` | desktop mega-menu geometry + keyboard checks |
| `node scripts/check-forms.mjs` | appointment/workshop form flows |
| `node scripts/check-consent.mjs` | consent banner and GA gating |
| `node scripts/check-console.mjs` | browser console errors |
| `node scripts/indexnow.mjs` | ping changed URLs to IndexNow (no-op until launch) |

Playwright checks expect the production build running on `127.0.0.1:3020`
(`PORT=3020 npm start`) and read `SITE_PASSWORD` from `.env.local` when basic
auth is enabled.

## Environment variables

See `.env.example` for the full list. In short:

- `SITE_PASSWORD` — enables basic auth on the whole site (previews)
- `SITE_INDEXABLE` — when `true`, the site is indexable; anything else keeps
  `noindex` and a disallow-all robots.txt
- `RESEND_API_KEY`, `FORM_TO_EMAIL`, `FORM_FROM_EMAIL` — form email delivery
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` — spam protection
- `FORM_TEST_MODE` — logs form submissions instead of sending (dev only)
- `NEXT_PUBLIC_GA_ID` — GA4 measurement id, loaded only after consent
- `NEXT_PUBLIC_GSC_VERIFICATION` — Search Console site-verification token

## Content workflow

1. Pages are Markdown files under `resources/content/<section>/` with YAML
   frontmatter (`title`, `url`, `seo_title`, `meta_description`, `schema`,
   `reviewed_by`, `section`).
2. Blog posts live in `resources/content/blog/` with `published`, `updated`,
   `author` and `reviewed_by` fields.
3. `lib/content/pages.ts` validates frontmatter (Zod), strips the metadata
   header block, and exposes `allPages()`/`allPosts()` to the catch-all route
   in `app/(site)/[...slug]/page.tsx`, which picks a template via
   `lib/page-config.ts`.
4. Navigation, footer links and doctor facts come from `lib/nav.ts`,
   `lib/doctors.ts` and `lib/site-config.ts` — update those single sources,
   not hardcoded strings.
5. `llms.txt`, `llms-full.txt`, `sitemap.xml` and `robots.txt` are generated
   from the same content at build time.

## Deployment

Hosted on Vercel; pushes to `main` deploy automatically. Launch steps
(domain, `SITE_INDEXABLE`, Search Console, Bing, GBP) are handled separately.
