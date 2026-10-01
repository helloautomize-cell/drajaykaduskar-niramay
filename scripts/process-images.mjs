#!/usr/bin/env node
/**
 * Process originals from resources/images/ (never modified) into public/images/.
 * JPEG quality 85 for photos; PNG with transparency for brand assets.
 * Manual tasks that cannot be automated go into public/images/_todo.md.
 */
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SRC = path.join(ROOT, "resources/images");
const OUT = path.join(ROOT, "public/images");

const JPEG = { quality: 85, mozjpeg: true };
const todo = [];
const alt = {};

/**
 * Illustrated service badges: knock out the off-white background
 * (min(R,G,B) > 245 transparent, feather 235..245), trim, centre on a square
 * canvas with ~4% padding, export 512 and 256 as PNG + WebP.
 */
async function badge(src, slug) {
  const img = sharp(path.join(SRC, src)).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const px = data;
  for (let i = 0; i < px.length; i += 4) {
    const m = Math.min(px[i], px[i + 1], px[i + 2]);
    if (m > 245) px[i + 3] = 0;
    else if (m > 235) px[i + 3] = Math.round(px[i + 3] * ((245 - m) / 10));
  }
  const trimmed = await sharp(px, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim({ threshold: 10 })
    .png()
    .toBuffer({ resolveWithObject: true });
  const side = Math.ceil(Math.max(trimmed.info.width, trimmed.info.height) * 1.08);
  const dest = path.join(OUT, "icons/services");
  await mkdir(dest, { recursive: true });
  // sharp composites at the final canvas size, so fit the badge inside first.
  for (const size of [512, 256]) {
    if (side < size) todo.push(`icons/services/${slug}: source ${side}px square after trim is under ${size}px; exported at source resolution`);
    const inner = Math.round(size * 0.92); // 4% padding each side
    const fitted = await sharp(trimmed.data)
      .resize(inner, inner, { fit: "inside", kernel: "lanczos3", withoutEnlargement: true })
      .png()
      .toBuffer();
    const canvas = sharp({
      create: { width: size, height: size, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
    }).composite([{ input: fitted, gravity: "centre" }]);
    await canvas.clone().png().toFile(path.join(dest, `${slug}-${size}.png`));
    await canvas.webp({ quality: 92 }).toFile(path.join(dest, `${slug}-${size}.webp`));
  }
  console.log(`ok  icons/services/${slug} (trimmed ${trimmed.info.width}x${trimmed.info.height})`);
}

const badges = [
  ["Diabetes_Care.png", "diabetes-care"],
  ["Pregnancy_Diabetes.png", "diabetes-in-pregnancy"],
  ["Eye_Screening.png", "eye-screening"],
  ["Thyroid_Clinic.png", "thyroid"],
  ["Hypertension.png", "hypertension"],
  ["Heart_Care.png", "heart-care"],
  ["Obesity_Care.png", "obesity-care"],
  ["Body_Composition.png", "body-composition"],
  ["Nutrition.png", "nutrition"],
  ["Health_Checkup.png", "health-checkup"],
  ["Adolescent_Health_Care.png", "adolescent-health"],
  ["Teen_Counselling.png", "teen-counselling"],
  ["Career_Counselling.png", "career-counselling"],
  ["Well_Baby.png", "well-baby"],
  ["Vaccination.png", "vaccination"],
  ["Diagnostic_Lab.png", "diagnostic-lab"],
  ["Home_Sample_Collection.png", "home-sample-collection"],
  ["Pharmacy.png", "pharmacy"],
  ["Male_Doctor.png", "doctor-male"],
  ["Female_Doctor.png", "doctor-female"],
];

async function jpg(src, out, altText, { extract, modulate, linear, blurRegions } = {}) {
  let p = sharp(path.join(SRC, src)).rotate();
  if (extract) p = p.extract(extract);
  if (modulate) p = p.modulate(modulate);
  if (linear) p = p.linear(linear.a, linear.b);
  let buf = await p.jpeg(JPEG).toBuffer();
  if (blurRegions) {
    const composites = [];
    for (const r of blurRegions) {
      const face = await sharp(buf)
        .extract(r)
        .blur(20)
        .toBuffer();
      composites.push({ input: face, left: r.left, top: r.top });
    }
    buf = await sharp(buf).composite(composites).jpeg(JPEG).toBuffer();
  }
  const dest = path.join(OUT, out);
  await mkdir(path.dirname(dest), { recursive: true });
  await writeFile(dest, buf);
  alt[out] = altText;
  console.log("ok  " + out);
}

async function png(src, out, altText, { extract, trim = false, resize } = {}) {
  let p = sharp(path.join(SRC, src));
  if (extract) p = p.extract(extract);
  if (trim) p = p.trim({ threshold: 14 });
  if (resize) p = p.resize(resize, resize, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } });
  const dest = path.join(OUT, out);
  await mkdir(path.dirname(dest), { recursive: true });
  await p.png().toFile(dest);
  alt[out] = altText;
  console.log("ok  " + out);
}

async function icon(src, out, { extract, size }) {
  let p = sharp(path.join(SRC, src));
  if (extract) p = p.extract(extract);
  if (size) p = p.resize(size, size);
  const dest = out.startsWith("app/") ? path.join(ROOT, out) : path.join(OUT, out);
  await mkdir(path.dirname(dest), { recursive: true });
  await p.png().toFile(dest);
  console.log("ok  " + out);
}

/* Brand */
// Logo: same off-white knockout as the badges, so no white box shows on tint.
{
  const img = sharp(path.join(SRC, "Nirmay-nlogo-retina.png")).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const m = Math.min(data[i], data[i + 1], data[i + 2]);
    if (m > 245) data[i + 3] = 0;
    else if (m > 235) data[i + 3] = Math.round(data[i + 3] * ((245 - m) / 10));
  }
  const t = await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim({ threshold: 10 })
    // displayed at 56px tall (~84px wide) — 512px covers 3x retina comfortably
    .resize({ width: 512, withoutEnlargement: true })
    .png()
    .toBuffer({ resolveWithObject: true });
  const dest = path.join(OUT, "brand/niramay-logo.png");
  await mkdir(path.dirname(dest), { recursive: true });
  await writeFile(dest, t.data);
  alt["brand/niramay-logo.png"] = "Niramay Clinics logo: two stylised red figures forming a heart inside a circle, with the clinic name above";
  console.log(`ok  brand/niramay-logo.png (trimmed ${t.info.width}x${t.info.height}, transparent bg)`);
}
todo.push("Get or trace an SVG of the Niramay logo. The PNG is now transparent but raster (1092px wide) and stacked, so it is not ideal for the header at all sizes.");

// Favicon source: 512px mark on white with a thin dark frame — crop the frame, then trim.
const favSrc = { extract: { left: 22, top: 22, width: 468, height: 468 } };
await png("Niramayclinic_favicon.png", "brand/niramay-mark.png",
  "Niramay Clinics mark: two stylised red figures forming a heart inside a circle", { extract: favSrc.extract });
await icon("Niramayclinic_favicon.png", "app/favicon.png", { extract: favSrc.extract, size: 32 });
await icon("Niramayclinic_favicon.png", "app/icon.png", { extract: favSrc.extract, size: 192 });
await icon("Niramayclinic_favicon.png", "app/apple-icon.png", { extract: favSrc.extract, size: 180 });
await icon("Niramayclinic_favicon.png", "public/images/brand/favicon-16.png", { extract: favSrc.extract, size: 16 });
await icon("Niramayclinic_favicon.png", "public/images/brand/favicon-32.png", { extract: favSrc.extract, size: 32 });
await icon("Niramayclinic_favicon.png", "public/images/brand/icon-512.png", { extract: favSrc.extract, size: 512 });

/* Doctors */
// AI portraits: approved in writing by both doctors (marketing contract, 2 Oct 2026).
await jpg("Dr ajay Kaduskar in appron.png", "doctors/dr-ajay-kaduskar-hero.jpg",
  "Dr. Ajay Kaduskar in a white coat and navy scrubs standing in a hospital corridor");
await jpg("Dr prajakta in appron.png", "doctors/dr-prajakta-kaduskar-hero.jpg",
  "Dr. Prajakta Kaduskar in a white coat over a purple saree standing in a hospital corridor");

// AI variations of Dr. Ajay (approved). No upscaling; used at card/half-width sizes.
await jpg("Dr Ajay Kaduskar close shot..png", "doctors/dr-ajay-kaduskar-headshot.jpg",
  "Dr. Ajay Kaduskar in a dark suit, pink shirt and purple tie");
await jpg("Dr Ajay Kaduskar close shot..png", "doctors/dr-ajay-kaduskar-avatar.jpg",
  "Dr. Ajay Kaduskar",
  { extract: { left: 260, top: 80, width: 740, height: 740 } });
await jpg("Dr_Ajay_Variation_1.png", "doctors/dr-ajay-kaduskar-corridor.jpg",
  "Dr. Ajay Kaduskar in a white coat standing in a hospital corridor");
await jpg("Dr_Ajay_Variation_2.png", "doctors/dr-ajay-kaduskar-consult.jpg",
  "Dr. Ajay Kaduskar gesturing while talking during a consultation at his desk");
await jpg("Dr_Ajay_Variation_3.png", "doctors/dr-ajay-kaduskar-arms-crossed.jpg",
  "Dr. Ajay Kaduskar standing with arms crossed, in a white coat");
await jpg("Dr_Ajay_Variation_4.png", "doctors/dr-ajay-kaduskar-desk-smile.jpg",
  "Dr. Ajay Kaduskar smiling at his desk with his hands folded");
await jpg("Dr_Ajay_Variation_5.png", "doctors/dr-ajay-kaduskar-tablet.jpg",
  "Dr. Ajay Kaduskar holding a tablet while standing near a window");

// Source is 1680x2525: he stands right of the "keep things simple" frame.
// Source is 1680x2525: he stands right of the "keep things simple" frame.
await jpg("Dr ajay.jpg", "doctors/dr-ajay-kaduskar-portrait.jpg",
  "Dr. Ajay Kaduskar in a dark suit and red tie standing in his consulting room",
  { extract: { left: 840, top: 680, width: 620, height: 800 } });
await jpg("Dr ajay.jpg", "doctors/dr-ajay-kaduskar-keep-simple.jpg",
  "Dr. Ajay Kaduskar standing beside a framed 'keep things simple' print in his consulting room",
  { extract: { left: 0, top: 200, width: 1680, height: 2240 } });
await jpg("NiramayClinic_Dr_AjayKaduskar.jpg", "doctors/dr-ajay-kaduskar-at-desk.jpg",
  "Dr. Ajay Kaduskar at his desk",
  { extract: { left: 125, top: 140, width: 220, height: 220 } });
await jpg("Child specialist niramay.jpg", "doctors/dr-prajakta-kaduskar-portrait.jpg",
  "Dr. Prajakta Kaduskar at her desk in the Blooming Buds consulting room",
  { extract: { left: 430, top: 60, width: 700, height: 875 } });
await jpg("Child specialist niramay.jpg", "doctors/dr-prajakta-kaduskar-avatar.jpg",
  "Dr. Prajakta Kaduskar",
  { extract: { left: 555, top: 170, width: 430, height: 430 } });

// Circular face crops from the hero portraits (doctor chip, hero avatars).
await jpg("Dr ajay Kaduskar in appron.png", "doctors/dr-ajay-kaduskar-face.jpg",
  "Dr. Ajay Kaduskar",
  { extract: { left: 320, top: 80, width: 380, height: 380 } });
await jpg("Dr prajakta in appron.png", "doctors/dr-prajakta-kaduskar-face.jpg",
  "Dr. Prajakta Kaduskar",
  { extract: { left: 335, top: 115, width: 370, height: 370 } });

// 4:5 head-to-waist crops from the hero portraits (doctor cards).
await jpg("Dr ajay Kaduskar in appron.png", "doctors/dr-ajay-kaduskar-card.jpg",
  "Dr. Ajay Kaduskar in a white coat and navy scrubs",
  { extract: { left: 92, top: 70, width: 840, height: 1050 } });
await jpg("Dr prajakta in appron.png", "doctors/dr-prajakta-kaduskar-card.jpg",
  "Dr. Prajakta Kaduskar in a white coat over a purple saree",
  { extract: { left: 72, top: 90, width: 880, height: 1100 } });

/* Team and clinic */
await jpg("NiramayClinics_slide_img6.jpg", "team/doctors-and-staff.jpg",
  "The Niramay Clinics team, both doctors and staff, standing together outside the clinic entrance",
  { extract: { left: 0, top: 0, width: 1400, height: 800 } });
await jpg("NiramayClinics_slide_img7.jpg", "team/care-team.jpg",
  "Niramay Clinics care team standing together in the clinic");
await jpg("NiramayClinic_Section_bg_img2.jpg", "clinic/exterior-wide.jpg",
  "The Indu Bhaskar Apartments building that houses Niramay Clinics, seen from Dr. N. B. Khare Marg");
await jpg("Niramay clinic outside.jpg", "clinic/exterior-entrance.jpg",
  "The street-level entrance of Niramay Clinics opposite Dinanath High School, Dhantoli");
await jpg("Niramay board.jpg", "clinic/signboard-marathi.jpg",
  "The Marathi signboard of Niramay Clinics naming Dr. Ajay Kaduskar and Dr. Prajakta Kaduskar, on the wall outside the clinic",
  { extract: { left: 0, top: 70, width: 1568, height: 860 } });
await jpg("NiramayClinic_Section_bg_img1.jpg", "clinic/reception-board.jpg",
  "The Niramay Clinics reception board showing both centre names", { modulate: { brightness: 0.98 } });
// Full waiting lounge photo — patient consents confirmed (marketing contract).
await jpg("Niramay waiting launge.jpg", "clinic/reception.jpg",
  "The Niramay Clinics waiting lounge and reception desk with the centre names board");
await jpg("Niramay waiting launge.jpg", "clinic/body-composition-analyser.jpg",
  "The body composition analyser near the Niramay Clinics reception desk",
  { extract: { left: 715, top: 320, width: 140, height: 390 } });


/* Services */
await jpg("NiramayClinics_slide_img2.jpg", "services/diabetic-eye-screening.jpg",
  "Diabetic eye screening with a fundus camera at Niramay Clinics");
await jpg("NirmayClinics_Diabetes_Complication_Screening1.jpg", "services/fundus-camera-detail.jpg",
  "Close-up of the fundus camera used for diabetic retinal screening at Niramay Clinics");
await jpg("NirmayClinics_Diabetes_Complication_Screening2.jpg", "services/cardiac-room.jpg",
  "The cardiac testing room at Niramay Clinics with treadmill, ECG and echo machines",
  { extract: { left: 0, top: 60, width: 700, height: 560 }, modulate: { brightness: 1.08 } });
await jpg("NiramayClinics_slide_img3.jpg", "services/sample-collection.jpg",
  "A technician collecting a blood sample from a patient at the Niramay Clinics laboratory",
  {
    extract: { left: 520, top: 60, width: 520, height: 720 },
    modulate: { brightness: 1.02, saturation: 0.88 },
    blurRegions: [
      { left: 350, top: 270, width: 80, height: 85 }, // patient's face
      { left: 118, top: 265, width: 65, height: 70 }, // technician's face
    ],
  });

await jpg("NirmayClinics_Inhouse_pathology.jpg", "services/lab-analysers.jpg",
  "Laboratory analysers on the workbench at the Niramay Clinics in-house pathology lab",
  { linear: { a: 1.08, b: -10 } });
await jpg("NirmayClinics_Pharmacy.jpg", "services/pharmacy.jpg",
  "The in-house Niramay Pharmacy counter with stocked medicine shelves");


/* Blog */
await jpg("Niramayclinics_Diabetes_Separating_Myths_Facts_By_Dr_Ajay_Kaduskar.jpg", "blog/diabetes-myths.jpg",
  "Illustration for the article 10 Common Myths About Diabetes by Dr. Ajay Kaduskar");

/* Illustrated service badges (20) */
for (const [src, slug] of badges) await badge(src, slug);

await writeFile(
  path.join(OUT, "alt-text.json"),
  JSON.stringify(alt, null, 2) + "\n"
);
await writeFile(
  path.join(OUT, "_todo.md"),
  "# Image tasks that still need manual work\n\n" +
    "Doctor AI portraits approved and clinic photo consents confirmed by the client (marketing contract), 2 Oct 2026.\n\n" +
    todo.map((t) => "- [ ] " + t).join("\n") + "\n"
);
console.log(`\nDone. ${Object.keys(alt).length} images, ${todo.length} manual tasks.`);
