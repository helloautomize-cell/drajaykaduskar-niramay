# Phase 6 setup instructions — exact, numbered

Do these in order. Everything below is "add new things only" — nothing existing is changed or deleted. Estimated total: about 1 hour.

## 1. Resend (sends the appointment and workshop emails)

1. Go to https://resend.com and create an account (use `ajaykaduskar@gmail.com` so the clinic owns it).
2. Left menu → **Domains** → **Add domain** → enter `niramayclinics.com` → Add.
3. Resend shows DNS records to add — typically:
   - `TXT` record `niramayclinics.com` → SPF value Resend shows (starts `v=spf1 ...`)
   - 3× `CNAME` or `TXT` DKIM records under `resend._domainkey...`
   - optionally a `TXT` DMARC record `_dmarc.niramayclinics.com` → `v=DMARC1; p=none`
4. Log into wherever `niramayclinics.com` DNS is hosted (domain registrar / Cloudflare) and **ADD** these records exactly.
   - **Do not change or delete any existing `MX` records** — they keep `ajaykaduskar@gmail.com` / Gmail working.
   - If an `SPF` TXT record already exists (`v=spf1 ...`), merge it: keep the existing value and add `include:amazonses.com` (or whatever Resend shows) inside the same record — do not create a second SPF TXT.
5. Back in Resend → click **Verify** next to the domain. Wait for green ticks (can take a few minutes).
6. Left menu → **API Keys** → **Create API key** → name it `niramay-website` → copy the key (shown once).

## 2. Cloudflare Turnstile (spam protection on the forms)

1. Log into https://dash.cloudflare.com → left menu → **Turnstile** → **Add site**.
2. Site name: `Niramay Clinics`. Hostnames: `niramayclinics.com`, `www.niramayclinics.com`, `drajaykaduskar-niramay.vercel.app` (add the preview hostname too so previews work).
3. Widget mode: **Managed**.
4. Copy the **Site Key** and **Secret Key** shown.

## 3. Google Analytics 4 (loads only after cookie consent)

1. Go to https://analytics.google.com → sign in with the clinic's Google account (`ajaykaduskar@gmail.com`) → Admin → **Create Property** → name `Niramay Clinics` → timezone India, currency INR.
2. **Data streams** → Web → URL `https://www.niramayclinics.com` → name `Website` → create. Copy the **Measurement ID** (`G-XXXXXXXXXX`).
3. Admin → **Data settings** → **Data collection** → turn **Google signals OFF** (we never send ad signals; Consent Mode keeps ad_storage denied).
4. Admin → **Data retention** → set **2 months**.
5. Admin → **Property access management** → add `ajaykaduskar@gmail.com` as **Administrator** so the clinic owns its data.

## 4. Google Search Console

1. Go to https://search.google.com/search-console → **Add property** → choose **Domain** type → enter `niramayclinics.com`.
2. It gives a `TXT` DNS record — add it where DNS is hosted (add only; do not touch other records). Click **Verify**.
   - Alternative (no DNS needed): use the **URL-prefix** property with `https://www.niramayclinics.com` and the HTML meta-tag method — the site already supports `NEXT_PUBLIC_GSC_VERIFICATION`.
3. Settings → **Users and permissions** → add `ajaykaduskar@gmail.com` as **Owner**.

## 5. Google Business Profile links

1. Go to https://business.google.com (the GBP manager for the clinic listings).
2. For **each** listing — (a) Niramay Clinics, (b) Dr. Ajay's profile:
   - Search for the business → it appears in Maps → **Share** → copy link → that is the `mapsUrl`.
   - **Ask for reviews / Get more reviews** → copy the review link → that is `reviewUrl`.
3. Send both pairs of links (or paste into `lib/site-config.ts` under `site.googleProfiles.clinic` / `.drAjay`).

## 6. Vercel environment variables

Vercel dashboard → project → **Settings → Environment Variables**. Add for **Production** (and Preview where useful):

| Variable | Value | Scope |
|---|---|---|
| `SITE_PASSWORD` | keep existing until launch; remove at launch | Production + Preview |
| `SITE_INDEXABLE` | `false` now; `true` only when the real domain goes live | Production |
| `RESEND_API_KEY` | key from step 1.6 | Production + Preview |
| `FORM_TO_EMAIL` | `ajaykaduskar@gmail.com` | Production + Preview |
| `FORM_FROM_EMAIL` | `Niramay Clinics <appointments@niramayclinics.com>` (after domain verifies; until then `Niramay Clinics <onboarding@resend.dev>` for Preview only) | Production + Preview |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | step 2 | Production + Preview |
| `TURNSTILE_SECRET_KEY` | step 2 | Production + Preview |
| `NEXT_PUBLIC_GA_ID` | `G-…` from step 3 | Production (+ Preview optional) |
| `NEXT_PUBLIC_GSC_VERIFICATION` | meta-tag token from step 4 (only if using meta method) | Production |
| `FORM_TEST_MODE` | leave **unset** in production — previews may set `1` | Preview only |

Then: Vercel → **Deployments** → latest → **Redeploy** so the variables take effect.

## After this

- Send me a test appointment + workshop request from the preview and I will verify the emails arrive (and screenshot them for the report).
- Phase 7 (not started): point `www.niramayclinics.com` at Vercel, set `SITE_INDEXABLE=true`, remove `SITE_PASSWORD`, submit the sitemap in Search Console.
