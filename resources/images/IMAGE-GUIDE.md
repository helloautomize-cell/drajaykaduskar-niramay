# Niramay Clinics — Image Guide

Source images from the old WordPress site and new icons. Use this table to know
which image goes where and what preparation it needs.

## IMAGES TO USE

| File | Where | Pre-treatment |
|------|-------|---------------|
| **BRAND** | | |
| `Nirmay-nlogo-retina.png` | Header and footer logo, OG image | Trim the transparent padding; trace to SVG later (the only logo source available) |
| `Niramayclinic_favicon.png` | Favicon and app icons | Export 16/32/180/192/512 px icon set |
| **DOCTORS** | | |
| `Dr ajay.jpg` | Homepage hero + Dr. Ajay profile page (best image) | Crop 4:5 and 3:4; even out the warm wall tone slightly |
| `NiramayClinic_Dr_AjayKaduskar.jpg` | Small avatar / blog author byline | Circle crop, light sharpen (only 556 px) |
| `Child specialist niramay.jpg` | Dr. Prajakta profile hero + Blooming Buds section | Crop 4:5 centred on her; crop out desk clutter; slight warmth and brightness lift |
| `Dr Ajay Kaduskar close shot..png` | AI headshot — avatar fallback ONLY | Use only after the doctor approves. Never use as a hero image |
| **TEAM** | | |
| `NiramayClinics_slide_img6.jpg` | About page "Our Team" hero | Crop out the parked car and sign on the right; lightly blur or desaturate the background |
| `NiramayClinics_slide_img7.jpg` | "Meet our care team" strip | None beyond the crop |
| **CLINIC** | | |
| `NiramayClinic_Section_bg_img2.jpg` | Full-width parallax / "Visit us" band (building exterior) | Blur vehicle number plates; dark gradient overlay for text |
| `Niramay clinic outside.jpg` | Contact page "How to find us" | Blur bike number plates |
| `Niramay board.jpg` | About/credentials section (Marathi signboard with both doctors' degrees) | Crop out the scooter mirror at the bottom |
| `NiramayClinic_Section_bg_img1.jpg` | "Two centres, one family" band (blue reception board) | Reduce glare and reflections slightly |
| `Niramay waiting launge.jpg` | Homepage "Inside the clinic" section | PATIENTS ARE IDENTIFIABLE: blur their faces, or crop to staff + board + InBody machine, until consent is confirmed |
| **SERVICES** | | |
| `NiramayClinics_slide_img2.jpg` | Diabetic eye screening (complications) page hero | None; patient in profile, consent still pending |
| `NiramayClinics_slide_img3.jpg` | Pathology / home sample collection | Crop out the fan and empty chairs; neutralise the yellow wall cast; blur the patient's face |
| `NirmayClinics_Inhouse_pathology.jpg` | Lab page / "quick turnaround" card | Contrast and clarity boost |
| `NirmayClinics_Pharmacy.jpg` | Pharmacy page | Straighten verticals; slight brightness lift |
| `NirmayClinics_Diabetes_Complication_Screening2.jpg` | Heart care page (TMT, ECG, Echo room) | Tight crop on the equipment; brighten. VERIFY it shows the cardiac room; if not, swap with Screening1 |
| `NirmayClinics_Diabetes_Complication_Screening1.jpg` | Small detail image (retina camera close-up) | None |
| **ICONS** — service cards on Services and About pages | | |
| `Diabetes_Care.png` | Service grid icon | Remove the off-white background (make transparent), trim, export at 256 px and 512 px |
| `Obesity_Care.png` | Service grid icon | Same as above |
| `Adolescent_Health_Care.png` | Service grid icon | Same as above |
| `Career_Counselling.png` | Service grid icon | Same as above |
| `Pharmacy.png` | Service grid icon | Same as above |
| `Diagnostic_Lab.png` | Service grid icon | Same as above |

Note: icons are interim only — to be replaced by a consistent SVG icon set later.

| **BLOG** | | |
| `Niramayclinics_Diabetes_Separating_Myths_Facts_By_Dr_Ajay_Kaduskar.jpg` | Hero for the diabetes-myths blog post / video section | None |

## GLOBAL PRE-TREATMENT RULES

- Do not edit the originals. Write processed versions into `public/images/` with
  kebab-case names only when we start building pages.
- Serve all photos through `next/image` (AVIF/WebP, responsive sizes). Always
  write descriptive alt text.
- Do not resize below the original resolution and do not upscale.

## DO NOT USE (kept in this folder as reference only)

| File | Reason |
|------|--------|
| `home_slider_img2.jpg`, `home_slider_img3.jpg`, `home_slider_img4.jpg` | Washed-out / duplicate versions |
| `home_slider_mob_img1–5.jpg` | Washed-out / duplicate versions |
| `NiramayClinics_slide_img1.jpg` | Washed-out / duplicate |
| `NiramayClinic_Top_Section_bg_img1.jpg` | Washed-out / duplicate |
| `NiramayClinic_Top_Section_mob_bg_img.jpg` | Washed-out / duplicate |
| `NiramayClinic_Dr_PrajaktaKaduskar.jpg` | Washed-out / duplicate |
| `NiramayClinic_Dr_PrajaktaKaduskarN.jpg` | Washed-out / duplicate |
| `nirmay-logo-retina.png` | Washed-out / duplicate |
| `cropped-Niramayclinic_favicon.png` | Washed-out / duplicate |
| `home_niramay_display_logo.png` | Washed-out / duplicate |
| `home_niramay_slider_upper_img2.png` | Just a plum→navy gradient (#a14667 → #1e3875); recreate it in CSS |
| `NiramayClinics_slide_img4.jpg` | Fake cut-out team composite |
| `NirmayClinics_Complete_Diabetes_Care_Package.jpg` | Services poster: content only |
| `NirmayClinics_Nutritional_Counseling.jpg` | Empty room |
| `NirmayClinics_Pharmacotherapy_Obesity_Management.jpg` | Stock photo of a branded-looking pen; do not use |
| `Male_Doctor.png`, `Female_Doctor.png` | Faceless avatars; never use them for the real doctors |
| `Dr ajay Kaduskar in appron.png`, `Dr_Ajay_Variation_1–5.png` | AI images in hospital settings that aren't this clinic; do not use |
