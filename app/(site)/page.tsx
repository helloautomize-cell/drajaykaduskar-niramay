import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ReactDOM from "react-dom";
import type { Paragraph, PhrasingContent, RootContent } from "mdast";

import { site } from "@/lib/site-config";
import { doctors } from "@/lib/doctors";
import { allPosts, pageByUrl, type BlogPost } from "@/lib/content/pages";
import { splitBody } from "@/lib/content/render";
import { serviceCardText } from "@/lib/page-config";
import { postBadgeFor } from "@/lib/service-badges";
import { diabetesHeartGroups, childTeenGroups, labPharmacyLinks } from "@/lib/nav";
import {
  clinicNode,
  websiteNode,
  faqPageNode,
  videoNode,
  JsonLd,
} from "@/lib/seo";

import { BookButton } from "@/components/ui/BookButton";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { AccentHeading } from "@/components/ui/AccentHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { DoctorChip } from "@/components/ui/DoctorChip";

import { ServiceBadge } from "@/components/ui/ServiceBadge";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";
import { DeferredSwipe } from "@/components/ui/DeferredSwipe";
import { ConcernLinks } from "@/components/home/ConcernLinks";
import { HeroFan, type FanCard } from "@/components/sections/HeroFan";
import { DoctorCard, type Doctor } from "@/components/sections/DoctorCard";
import { ConditionsMarquee, type ConditionPill } from "@/components/home/ConditionsMarquee";
import { FaqAccordion, type FaqItem } from "@/components/sections/FaqAccordion";
import { CtaBand } from "@/components/sections/CtaBand";
import { type ServiceTab } from "@/components/home/ServiceTabs";
import { type GalleryStep } from "@/components/home/StepsGallery";
import { ParallaxBand } from "@/components/home/ParallaxBand";
import { Deferred } from "@/components/ui/Deferred";
import { ObfuscatedEmail } from "@/components/ui/ObfuscatedEmail";
import { VideoFacade } from "@/components/sections/VideoFacade";
import { ServiceGlassCard } from "@/components/sections/ServiceGlassCard";
import {
  PhoneIcon,
  MapPinIcon,
  MailIcon,
  ClockIcon,
  EmergencyIcon,
  SpecialistIcon,
  TrainedIcon,
  LabIcon,
  NutritionPlateIcon,
  CalendarCheckIcon,
  WheelchairIcon,
  LiftIcon,
  ParkingIcon,
} from "@/components/icons";

const CONT = "mx-auto max-w-[1240px] px-4 sm:px-6";
// One spacing scale: 56px mobile / 96px desktop section padding
const SECTION = "py-14 lg:py-24";

export const dynamic = "error"; // fully static

/* ------------------------------------------------------------ metadata */

const home = pageByUrl().get("/")!;

export function generateMetadata(): Metadata {
  return {
    title: { absolute: home.meta.seo_title || home.meta.title },
    description: home.meta.meta_description,
    alternates: { canonical: "/" },
    openGraph: {
      title: home.meta.seo_title || home.meta.title,
      description: home.meta.meta_description,
      url: "/",
      siteName: site.name,
      locale: "en_IN",
      type: "website",
    },
    twitter: { card: "summary_large_image" },
  };
}

/* --------------------------------------------------------------- data */

const fanCards: FanCard[] = [
  {
    src: "/images/doctors/dr-ajay-kaduskar-fan.jpg",
    alt: "Dr. Ajay Kaduskar in a white coat and navy scrubs standing in a hospital corridor",
    caption: "Dr. Ajay Kaduskar",
    sub: "Diabetes, obesity and heart care",
  },
  {
    src: "/images/doctors/dr-prajakta-kaduskar-fan.jpg",
    alt: "Dr. Prajakta Kaduskar in a white coat over a purple saree standing in a hospital corridor",
    caption: "Dr. Prajakta Kaduskar",
    sub: "Child and adolescent care",
  },
];

const whyCards = [
  {
    icon: SpecialistIcon,
    title: "Decades of specialist practice",
    text: "More than 35 years of clinical experience between our two doctors.",
  },
  {
    icon: TrainedIcon,
    title: "Trained for what we treat",
    text: "MD with diabetology training and a Netherlands fellowship; paediatrics with adolescent health and clinical psychology.",
  },
  {
    icon: LabIcon,
    title: "Tests under one roof",
    text: "Laboratory, 2D Echo, ECG, treadmill test, retinal photography and body composition analysis at the clinic.",
  },
  {
    icon: NutritionPlateIcon,
    title: "Diet advice you can follow",
    text: "Our nutritionist plans meals around your home food and routine.",
  },
  {
    icon: CalendarCheckIcon,
    title: "Care that continues",
    text: "Planned follow-ups, with your results and prescriptions kept together.",
  },
  {
    icon: WheelchairIcon,
    title: "Easy to reach",
    text: "Lab open 7 am to 7 pm, home sample collection, pharmacy with home delivery, lift and wheelchair access.",
  },
];

/* Slides are re-ordered so cards that must share a badge never sit side by
 * side (the four diabetes-care cards are separated by pregnancy, screening
 * and prediabetes; the two obesity-care cards are split by body
 * composition; teen-counselling and career-counselling alternate). */
const linkByHref = (hrefs: string[]) => {
  const all = [
    ...diabetesHeartGroups.flatMap((g) => g.links),
    ...childTeenGroups.flatMap((g) => g.links),
    ...labPharmacyLinks,
  ];
  return hrefs
    .map((h) => all.find((l) => l.href === h))
    .filter((l): l is (typeof all)[number] => !!l);
};

const toSlides = (links: { label: string; href: string; badge?: string }[], fallback: string) =>
  links.map((l) => ({
    badge: l.badge ?? fallback,
    title: l.label,
    text: serviceCardText[l.href] ?? "",
    href: l.href,
  }));

const serviceTabs: ServiceTab[] = [
  {
    label: "Diabetes and Metabolic",
    intro:
      "Long-term care for diabetes, prediabetes, thyroid, blood pressure and weight, with complication screening built in.",
    slides: toSlides(
      linkByHref([
        "/diabetes/",
        "/diabetes/diabetes-in-pregnancy/",
        "/diabetes/type-2-diabetes/",
        "/diabetes/complications-screening/",
        "/diabetes/type-1-diabetes/",
        "/diabetes/prediabetes-risk-assessment/",
        "/diabetes/diabetes-care-programme/",
        "/obesity/",
        "/obesity/body-composition-sarcopenia/",
        "/obesity/weight-management-medicines/",
      ]),
      "health-checkup"
    ),
  },
  {
    label: "Heart",
    intro: "Find heart risk early with ECG, 2D Echo and treadmill testing, and a clear plan to lower it.",
    slides: toSlides(
      linkByHref([
        "/heart-care/",
        "/heart-care/2d-echo/",
        "/heart-care/ecg/",
        "/heart-care/tmt-stress-test/",
      ]),
      "heart-care"
    ),
  },
  {
    label: "Child and Teen",
    intro: "From baby check-ups and vaccines to puberty, stress, screens and career choices.",
    slides: toSlides(
      linkByHref([
        "/blooming-buds/",
        "/blooming-buds/well-baby-clinic/",
        "/vaccination/",
        "/blooming-buds/adolescent-health/",
        "/blooming-buds/teen-mental-health/",
        "/blooming-buds/career-counselling/",
        "/blooming-buds/psychological-testing/",
        "/blooming-buds/workshops/",
      ]),
      "adolescent-health"
    ),
  },
  {
    label: "Lab and Pharmacy",
    intro: "Tests from 7 am to 7 pm, home sample collection, and medicines dispensed on site.",
    slides: toSlides(labPharmacyLinks, "diagnostic-lab"),
  },
];

const visitSteps: GalleryStep[] = [
  {
    title: "Book.",
    body: "Call, WhatsApp or send a request. We confirm your time.",
    image: { src: "/images/clinic/exterior-entrance.jpg", alt: "The street-level entrance of Niramay Clinics" },
  },
  {
    title: "Arrive and register.",
    body: "Bring old reports and your medicines. Our staff check weight, waist and blood pressure.",
    image: { src: "/images/clinic/reception.jpg", alt: "The Niramay Clinics reception and waiting lounge" },
  },
  {
    title: "Consultation.",
    body: "Your doctor takes a full history, examines you and explains what they find.",
    image: { src: "/images/doctors/dr-ajay-kaduskar-consult.jpg", alt: "Dr. Ajay Kaduskar explaining results at his desk" },
  },
  {
    title: "Tests, if needed.",
    body: "Blood tests, ECG, Echo or eye screening, mostly done the same day.",
    image: { src: "/images/services/diabetic-eye-screening.jpg", alt: "Retinal screening in progress at the clinic" },
  },
  {
    title: "Your plan.",
    body: "Targets, medicines and diet in writing. Collect medicines from our pharmacy if prescribed.",
    image: { src: "/images/services/pharmacy.jpg", alt: "The in-house Niramay Pharmacy counter" },
  },
  {
    title: "Follow-up.",
    body: "We book your next review so progress is tracked.",
    image: { src: "/images/doctors/dr-ajay-kaduskar-tablet.jpg", alt: "Dr. Ajay Kaduskar reviewing records on a tablet" },
  },
];

// Conditions marquee pills — small line icons (iconSet), each links to its page
const conditionPills: ConditionPill[] = [
  { icon: "glucose-drop", label: "Type 2 diabetes", href: "/diabetes/type-2-diabetes/" },
  { icon: "insulin-pen", label: "Type 1 diabetes", href: "/diabetes/type-1-diabetes/" },
  { icon: "check-up", label: "Prediabetes", href: "/diabetes/prediabetes-risk-assessment/" },
  { icon: "pregnancy", label: "Diabetes in pregnancy", href: "/diabetes/diabetes-in-pregnancy/" },
  { icon: "thyroid", label: "Thyroid disorders", href: "/thyroid-clinic/" },
  { icon: "bp-cuff", label: "High blood pressure", href: "/hypertension-clinic/" },
  { icon: "waist-tape", label: "Weight and obesity", href: "/obesity/" },
  { icon: "heart", label: "Heart risk", href: "/heart-care/" },
  { icon: "baby", label: "Baby growth and vaccines", href: "/blooming-buds/well-baby-clinic/" },
  { icon: "mind", label: "Teen stress and anxiety", href: "/blooming-buds/teen-mental-health/" },
  { icon: "teen-pair", label: "PCOS and periods", href: "/blooming-buds/adolescent-health/" },
  { icon: "compass", label: "Career confusion", href: "/blooming-buds/career-counselling/" },
];

const doctorCards: Doctor[] = [
  {
    name: doctors.ajay.name,
    shortName: "Dr. Ajay",
    qualifications: "MD (Medicine), PGDHSc (Diabetology), FEACD (Netherlands)",
    role: "Consultant in diabetes, obesity and metabolic diseases. Director, Niramay Diabetes and Heart Care Centre.",
    experience: `${site.experienceYears.drAjay}+ years`,
    photo: { src: "/images/doctors/dr-ajay-kaduskar-card.jpg", alt: "Dr. Ajay Kaduskar" },
    languages: ["English", "Hindi", "Marathi"],
    bookHref: "/contact/#book",
    profileHref: doctors.ajay.profileHref,
  },
  {
    name: doctors.prajakta.name,
    shortName: "Dr. Prajakta",
    qualifications: doctors.prajakta.qualifications,
    role: "Consultant in child and adolescent health. Blooming Buds Child and Adolescent Care Centre.",
    experience: `${site.experienceYears.drPrajakta}+ years`,
    photo: { src: "/images/doctors/dr-prajakta-kaduskar-card.jpg", alt: "Dr. Prajakta Kaduskar" },
    languages: ["English", "Hindi", "Marathi"],
    bookHref: "/contact/#book",
    profileHref: doctors.prajakta.profileHref,
  },
];

// Google profile links are [CONFIRM] in site-config; until they land, these
// buttons deep-link a Google search for the public listings.
const directionsUrl =
  site.googleProfiles.clinic.mapsUrl ||
  (site.mapUrl.startsWith("http") ? site.mapUrl : "") ||
  `https://maps.google.com/?q=${encodeURIComponent(site.name + ", " + site.address.short)}`;

/* ---------------------------------------------- quick-answer extraction */

function textOfNode(node: RootContent | PhrasingContent): string {
  if (node.type === "text") return node.value;
  if ("children" in node) return (node.children as PhrasingContent[]).map(textOfNode).join("");
  return "";
}

/** Pull the 4 quick-answer Q/A pairs out of home.md ("#### Section: Quick answers"). */
function homeFaqs(): { q: string; aText: string }[] {
  const { sections } = splitBody(home.body);
  const sec = sections.find((s) => /quick answers/i.test(s.title));
  if (!sec) return [];
  const items: { q: string; aText: string }[] = [];
  let cur: { q: string; aText: string } | null = null;
  for (const n of sec.nodes) {
    if (n.type === "paragraph") {
      const first = (n as Paragraph).children[0];
      const isQ =
        first?.type === "strong" && textOfNode(first as PhrasingContent).trim().endsWith("?");
      if (isQ) {
        // The answer sits in the same paragraph after the bold question
        // (soft line break), then may continue in following nodes.
        const rest = (n as Paragraph).children.slice(1).map(textOfNode).join("").trim();
        cur = { q: textOfNode(first as PhrasingContent).trim(), aText: rest };
        items.push(cur);
        continue;
      }
    }
    if (cur) cur.aText = (cur.aText + " " + textOfNode(n)).trim();
  }
  return items.slice(0, 4);
}

const quickAnswers = homeFaqs();

/* "Watch Dr. Ajay" videos (client-answers item 30) — real YouTube titles and
   upload dates, self-hosted posters so nothing touches Google until clicked. */
const watchVideos = [
  {
    id: "G2I1fNgxzkE",
    title: "The Pillars of Health, Episode 05: Dr. Ajay Kaduskar",
    description: "Dr. Ajay on everyday habits that protect long-term health.",
    credit: "Loktantra Mirror",
    uploadDate: "2025-07-08",
    poster: "/images/video/G2I1fNgxzkE.jpg",
  },
  {
    id: "YjXtEOQ724Y",
    title: "Diabetes and obesity: myth vs fact",
    description: "Dr. Ajay separates common diabetes myths from the facts.",
    credit: "Bluetree Healthcare Solutions",
    uploadDate: "2025-09-30",
    poster: "/images/video/YjXtEOQ724Y.jpg",
  },
];
const faqItems: FaqItem[] = quickAnswers.map((f) => ({
  q: f.q,
  aText: f.aText,
  a: <p>{f.aText}</p>,
}));

/* ------------------------------------------------------------ JSON-LD */




/* ------------------------------------------------------------- helpers */

function SectionHead({
  num,
  label,
  title,
  accent,
  lead,
}: {
  num: string;
  label: string;
  title: string;
  accent?: string;
  lead?: string;
}) {
  return (
    <div className="mb-10 max-w-[720px]">
      <Eyebrow>{`${num} / ${label}`}</Eyebrow>
      <AccentHeading accent={accent} className="mt-4">
        {title}
      </AccentHeading>
      {lead && <p className="mt-4 text-[17px] leading-relaxed text-ink-600">{lead}</p>}
    </div>
  );
}

const postDate = (p: BlogPost) =>
  p.meta.published
    ? new Date(p.meta.published).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : "";

/* --------------------------------------------- static SSR fallbacks (no-JS
   and pre-hydration); the interactive islands mount as they near the viewport */

const pillBase =
  "inline-flex min-h-[48px] items-center rounded-full border border-transparent bg-plum-100 px-5 py-2.5 text-[15px] font-semibold text-plum";

const serviceTabsFallback = (
  <div>
    <div
      className="flex items-center gap-2 max-md:-mx-4 max-md:flex-nowrap max-md:overflow-x-auto max-md:px-4 md:flex-wrap"
      aria-hidden
    >
      {serviceTabs.map((t, i) => (
        <span
          key={t.label}
          className={
            i === 0
              ? `${pillBase} shrink-0 whitespace-nowrap bg-grad text-white shadow-[0_10px_24px_-10px_rgba(69,62,109,.5)]`
              : `${pillBase} shrink-0 whitespace-nowrap`
          }
        >
          {t.label}
        </span>
      ))}
    </div>
    <p className="mt-8 max-w-[62ch] text-[16px] leading-relaxed text-ink-600">
      {serviceTabs[0].intro}
    </p>
    <div className="fade-edge-r mt-6 overflow-x-auto pb-2 pt-1">
      <div className="flex gap-5 px-1">
        {serviceTabs[0].slides.map((s) => (
          <ServiceGlassCard
            key={s.title}
            badge={s.badge}
            title={s.title}
            text={s.text}
            href={s.href}
            lift={false}
          />
        ))}
      </div>
    </div>
    <div className="mt-8">
      <ButtonLink href="/services/" variant="link" arrow className="text-[16px]">
        View all services
      </ButtonLink>
    </div>
  </div>
);

const stepsFallback = (
  <div>
    {/* mobile: static swipe strip (autoplay mounts with the island) */}
    <div className="min-[900px]:hidden">
      <div className="eyebrow mb-5">04 / Your first visit, step by step</div>
      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 [scrollbar-width:none]">
        {visitSteps.map((s, i) => (
          <div
            key={s.title}
            className="w-[84%] shrink-0 snap-start overflow-hidden rounded-[18px] border border-line bg-card shadow-[var(--shadow-card)]"
          >
            <div className="relative aspect-[16/10]">
              {/* eslint-disable-next-line @next/next/no-img-element -- fallback, lazy */}
              <img src={s.image.src} alt={s.image.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <span className="glass absolute left-3 top-3 rounded-full px-3 py-1 text-[12px] font-semibold text-ink">
                Step {i + 1} of {visitSteps.length}
              </span>
            </div>
            <div className="p-5">
              <h3 className="t-h3 text-ink">{s.title}</h3>
              <p className="mt-1 text-[14.5px] leading-relaxed text-ink-600">{s.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    {/* desktop fallback: tracker + sticky image */}
    <div className="grid gap-10 max-[900px]:hidden min-[900px]:grid-cols-[1fr_360px] min-[900px]:gap-14">
      <div className="relative grid gap-10 min-[900px]:grid-cols-[300px_1fr] min-[900px]:gap-16">
        <div>
          <div className="eyebrow">04 / Your first visit, step by step</div>
          <div className="mt-2 text-[64px] font-bold leading-none tracking-tight text-plum max-[900px]:hidden">
            01
          </div>
          <p className="mt-1 text-[15px] font-semibold text-ink max-[900px]:hidden">
            {visitSteps[0].title}
          </p>
        </div>
        <ol className="divide-y divide-line">
          {visitSteps.map((s) => (
            <li key={s.title} className="py-8 first:pt-0">
              <h3 className="t-h3 mb-1.5 text-ink-600">{s.title}</h3>
              <p className="text-[15.5px] leading-relaxed text-ink-600">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="relative max-[900px]:hidden">
        <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-[22px] border border-line shadow-[var(--shadow-card)]">
          <div className="relative h-full w-full">
            <Image
              src={visitSteps[0].image.src}
              alt={visitSteps[0].image.alt}
              fill
              sizes="360px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const mapFallback = (
  <a
    href={directionsUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative block w-full overflow-hidden rounded-[20px] border border-line"
    aria-label="Show map, opens Google Maps"
  >
    <Image
      src="/images/clinic/exterior-entrance.jpg"
      alt="The street-level entrance of Niramay Clinics opposite Dinanath High School"
      width={640}
      height={400}
      className="aspect-[8/5] w-full object-cover"
      loading="lazy"
      sizes="(min-width:1024px) 45vw, 100vw"
    />
    <span className="absolute inset-0 grid place-items-center bg-ink/20 transition-colors group-hover:bg-ink/30">
      <span className="glass inline-flex min-h-[48px] items-center gap-2 rounded-full px-6 text-[15px] font-semibold text-ink">
        <MapPinIcon size={18} aria-hidden className="text-plum" /> Show map
      </span>
    </span>
  </a>
);

/* ---------------------------------------------------------------- page */

export default function Home() {
  // LCP: preload the front fan card (plain img, not next/image, so it needs
  // an explicit preload link).
  ReactDOM.preload("/images/doctors/dr-ajay-kaduskar-fan.jpg", { as: "image", fetchPriority: "high" });
  const posts = [...allPosts()]
    .sort((a, b) => (b.meta.published || "").localeCompare(a.meta.published || ""))
    .slice(0, 3);

  return (
    <>
      <JsonLd
        nodes={[
          clinicNode(),
          websiteNode(),
          faqItems.length ? faqPageNode(faqItems, "/") : null,
          ...watchVideos.map((v) =>
            videoNode({ id: v.id, title: v.title, pageUrl: "/", uploadDate: v.uploadDate, thumbnail: v.poster })
          ),
        ]}
      />

      {/* ── H1 HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 size-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(242,149,122,.4),transparent)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-48 bottom-0 size-[480px] rounded-full bg-[radial-gradient(closest-side,rgba(115,69,105,.14),transparent)]"
        />
        <div
          className={`${CONT} relative flex flex-col py-8 lg:grid lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:gap-x-12 lg:py-16`}
        >
          {/* A: eyebrow + headline */}
          <div className="lg:col-start-1 lg:row-start-1">
            <Eyebrow>NIRAMAY CLINICS · DHANTOLI, NAGPUR</Eyebrow>
            <h1 className="t-display mt-4 text-ink lg:mt-5">
              Specialist care for diabetes, heart health and growing <em className="accent">children</em>
            </h1>
          </div>

          {/* fan: right under the headline on mobile so both doctors show
              above the fold; right column on desktop */}
          <div className="order-2 mt-7 flex justify-center lg:order-none lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:justify-end">
            <HeroFan cards={fanCards} intervalMs={5000} className="max-sm:translate-x-[15%]" />
          </div>

          {/* B: lead line + buttons + chips */}
          <div className="order-3 mt-6 lg:col-start-1 lg:row-start-2 lg:mt-0">
            <p className="t-lead hidden max-w-[54ch] sm:block">
              Two experienced doctors, an in-house laboratory and pharmacy, and tests like 2D Echo,
              ECG and retinal screening, at one address in Dhantoli.
            </p>
            <p className="text-[15.5px] leading-relaxed text-ink-600 sm:hidden">
              Two experienced doctors, an in-house lab and pharmacy, at one address in Dhantoli.
            </p>
            <div className="mt-5 flex items-center gap-3 sm:mt-8 sm:gap-4">
              <BookButton href="/contact/#book" className="flex-1 sm:flex-none" />
              <a
                href={site.phone.tel}
                aria-label={`Call Niramay Clinics on ${site.phone.display}`}
                className="grid size-[52px] shrink-0 place-items-center rounded-[14px] border border-plum/30 bg-white/70 text-ink backdrop-blur-md sm:hidden"
              >
                <PhoneIcon size={20} aria-hidden />
              </a>
              <ButtonLink href={site.phone.tel} variant="secondary" className="hidden sm:inline-flex">
                <PhoneIcon size={18} aria-hidden /> Call {site.phone.display}
              </ButtonLink>
            </div>
            {/* service chips: a compact row, no orphan word; hidden on mobile */}
            <div className="mt-6 hidden flex-wrap gap-2 sm:flex">
              {[
                "In-house laboratory",
                "Pharmacy",
                "2D Echo, ECG and TMT",
                "Retinal screening",
                "Body composition analysis",
              ].map((c) => (
                <Chip key={c} className="px-3 py-1.5 text-[13px]">
                  {c}
                </Chip>
              ))}
            </div>
            {/* the fan already shows the doctors on mobile — hide the pill */}
            <DoctorChip className="mt-6 max-sm:hidden" />
          </div>
        </div>
      </section>

      {/* find care by concern: one row of text pills, straight after the hero */}
      <div className={`${CONT} mt-7 lg:mt-9`}>
        <ConcernLinks />
      </div>

      {/* ── H2 01 / WHY NIRAMAY ─────────────────────────────────────── */}
      <Reveal>
        <section className={SECTION}>
          <div className={CONT}>
            <SectionHead num="01" label="Why Niramay" title="Care that is planned around you" accent="around you" />
            {/* soft gradient panel with glows so the cards can be glass */}
            <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-plum-50 via-white to-[#fdf3ee] p-5 sm:p-8 lg:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-32 -top-32 size-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(242,149,122,.3),transparent)]"
              />
              {/* mobile: swipe carousel (6 cards); desktop: unchanged grid */}
              <DeferredSwipe
                label="Why Niramay"
                gridAt="md"
                gridCols="md:grid-cols-2 lg:grid-cols-3"
                itemClass="w-[80%]"
              >
                {whyCards.map((c) => (
                  <GlassCard key={c.title} icon={c.icon} title={c.title} glass className="h-full">
                    <p className="line-clamp-3">{c.text}</p>
                  </GlassCard>
                ))}
              </DeferredSwipe>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── H3 02 / TWO SPECIALISTS ─────────────────────────────────── */}
      <Reveal>
        <section className={SECTION}>
          <div className={`${CONT} grid items-center gap-12 lg:grid-cols-2`}>
            {/* photo + floating glass badges */}
            <div className="group relative">
              <div
                aria-hidden
                className="pointer-events-none absolute -left-16 -top-16 size-[380px] rounded-full bg-[radial-gradient(closest-side,rgba(242,149,122,.35),transparent)]"
              />
              <div className="relative overflow-hidden rounded-[24px] border border-line shadow-[var(--shadow-card)]">
                <Image
                  src="/images/team/doctors-and-staff.jpg"
                  alt="The doctors and staff of Niramay Clinics outside the clinic"
                  width={900}
                  height={640}
                  className="h-auto w-full object-cover"
                  sizes="(min-width:1024px) 45vw, 100vw"
                />
              </div>
              {/* floating labels kept off the people: wall top-left, ground
                  bottom-right; inside the photo edges on mobile so nothing
                  overflows the screen */}
              <div className="pointer-events-none absolute left-3 top-3 sm:-left-5 sm:-top-4">
                <span className="home-badge-drift pointer-events-auto glass block rounded-full px-4 py-2 text-[13.5px] font-semibold text-ink">
                  Caring for Nagpur since 2006
                </span>
              </div>
              <div className="pointer-events-none absolute bottom-3 right-3 sm:-bottom-4 sm:right-8">
                <span
                  className="home-badge-drift pointer-events-auto glass block rounded-full px-4 py-2 text-[13.5px] font-semibold text-ink"
                  style={{ animationDelay: "1.4s" }}
                >
                  Lab open 7 am to 7 pm
                </span>
              </div>
            </div>
            {/* text + centre mini cards */}
            <div>
              <SectionHead
                num="02"
                label="About Niramay"
                title="Two clinics, one address"
              />
              <p className="text-[17px] leading-relaxed text-ink-600">
                Niramay Clinics brings two specialist practices under one roof, so most families can
                manage adult and child care at a single visit. Between them, the doctors bring more than
                35 years of clinical practice.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  {
                    badge: "doctor-male" as const,
                    centre: site.centres.adult,
                    doctor: doctors.ajay.name,
                    href: doctors.ajay.profileHref,
                  },
                  {
                    badge: "doctor-female" as const,
                    centre: site.centres.child,
                    doctor: doctors.prajakta.name,
                    href: doctors.prajakta.profileHref,
                  },
                ].map((d) => (
                  <Link
                    key={d.doctor}
                    href={d.href}
                    className="group flex items-center gap-4 rounded-[16px] border border-line bg-card p-4 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-0.5 hover:border-plum/40 hover:shadow-[var(--shadow-hover)]"
                  >
                    <ServiceBadge slug={d.badge} size="sm" alt="" />
                    <span>
                      <span className="block text-[14px] font-medium text-ink-600">{d.centre}</span>
                      <span className="block text-[16px] font-bold text-ink group-hover:text-plum">
                        {d.doctor}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── H4 03 / HOW WE CAN HELP ─────────────────────────────────── */}
      <Reveal>
        <section className={SECTION}>
          <div className={CONT}>
            <SectionHead num="03" label="How we can help" title="Care for every age and stage" accent="every age" />
            <Deferred of="serviceTabs" props={{ tabs: serviceTabs }} fallback={serviceTabsFallback} />
          </div>
        </section>
      </Reveal>

      {/* ── H5 04 / FIRST VISIT ─────────────────────────────────────── */}
      <Reveal>
        <section className={SECTION}>
          <div className={CONT}>
            <Deferred
              of="stepsGallery"
              props={{ label: "04 / Your first visit, step by step", steps: visitSteps }}
              fallback={stepsFallback}
            />
          </div>
        </section>
      </Reveal>

      {/* ── H6 PARALLAX VISIT BAND (full-bleed) ─────────────────────── */}
      <ParallaxBand
        image="/images/clinic/exterior-wide.jpg"
        alt="The Indu Bhaskar Apartments building that houses Niramay Clinics in Dhantoli"
      >
        <Eyebrow>Visit us</Eyebrow>
        <h2 className="t-h3 mt-3 text-ink">Visit us in Dhantoli</h2>
        <p className="mt-3 text-[15.5px] leading-relaxed text-ink-600">
          {site.address.full}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Chip className="gap-1.5"><LiftIcon size={14} aria-hidden /> Lift</Chip>
          <Chip className="gap-1.5"><WheelchairIcon size={14} aria-hidden /> Wheelchair friendly</Chip>
          <Chip className="gap-1.5"><ParkingIcon size={14} aria-hidden /> Two-wheeler parking</Chip>
        </div>
        <div className="mt-5 flex gap-3 max-sm:[&>*]:flex-1">
          <ButtonLink href={directionsUrl} target="_blank" rel="noopener noreferrer" className="h-11 px-4 text-[14px]">
            <MapPinIcon size={17} aria-hidden /> Get directions
          </ButtonLink>
          <ButtonLink href="/plan-your-visit/" variant="secondary" arrow className="h-11 px-4 text-[14px]">
            Plan your visit
          </ButtonLink>
        </div>
      </ParallaxBand>

      {/* ── H7 05 / YOUR DOCTORS ────────────────────────────────────── */}
      <Reveal>
        <section className={SECTION}>
          <div className={CONT}>
            <SectionHead
              num="05"
              label="Your doctors"
              title="Meet your doctors"
              lead="More than 35 years of practice between them."
            />
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
              {doctorCards.map((d) => (
                <DoctorCard key={d.name} doctor={d} />
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── H7b 06 / WATCH DR. AJAY ─────────────────────────────────── */}
      <Reveal>
        <section className={SECTION}>
          <div className={CONT}>
            <SectionHead
              num="06"
              label="Watch Dr. Ajay"
              title="Dr. Ajay talks about diabetes and long-term health"
              accent="diabetes"
            />
            {/* two items: swipe with peek on mobile (no autoplay needed),
                side-by-side cards on desktop */}
            <DeferredSwipe
              label="Watch Dr. Ajay"
              autoplay={false}
              gridAt="lg"
              gridCols="lg:grid-cols-2"
            >
              {watchVideos.map((v) => (
                <VideoFacade
                  key={v.id}
                  id={v.id}
                  title={v.title}
                  description={v.description}
                  poster={v.poster}
                  credit={v.credit}
                />
              ))}
            </DeferredSwipe>
          </div>
        </section>
      </Reveal>

      {/* ── H8 07 / CONDITIONS ──────────────────────────────────────── */}
      <Reveal>
        <section className={SECTION}>
          <div className={CONT}>
            <SectionHead num="07" label="Conditions we look after" title="Care for the conditions we see most" accent="see most" />
            <ConditionsMarquee items={conditionPills} />
          </div>
        </section>
      </Reveal>

      {/* (The old "Patient reviews" block was removed — links-only policy,
          no ratings, no review counts, no Places API.) */}

      {/* ── H10 08 / HEALTH LIBRARY ─────────────────────────────────── */}
      <Reveal>
        <section className={SECTION}>
          <div className={CONT}>
            <div className="mb-10 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
              <div className="max-w-[720px]">
                <Eyebrow>08 / FROM OUR HEALTH LIBRARY</Eyebrow>
                <AccentHeading accent="before" className="mt-4">
                  Read before your visit
                </AccentHeading>
              </div>
              <ButtonLink href="/health-library/" variant="link" arrow className="text-[16px]">
                Visit the Health Library
              </ButtonLink>
            </div>
            {/* designed covers only — gradient + per-post badge, never the
                YouTube thumbnails (they carry other channels' branding) */}
            <DeferredSwipe
              label="Health Library"
              gridAt="md"
              gridCols="md:grid-cols-2 lg:grid-cols-3"
            >
              {posts.map((p) => {
                const author = p.meta.author.includes("Prajakta") ? doctors.prajakta : doctors.ajay;
                const category =
                  p.meta.category || (p.meta.author.includes("Prajakta") ? "Child and teen" : "Diabetes and heart");
                return (
                  <Link
                    key={p.slug}
                    href={p.meta.url}
                    className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-line bg-card shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)]"
                  >
                    <span className="relative block aspect-[3/2] bg-gradient-to-br from-plum-100 via-plum-50 to-[#fdf3ee] md:aspect-video">
                      <span
                        aria-hidden
                        className="absolute -right-16 -top-16 size-[240px] rounded-full bg-[radial-gradient(closest-side,rgba(242,149,122,.35),transparent)]"
                      />
                      <span className="absolute inset-0 grid place-items-center">
                        <ServiceBadge slug={postBadgeFor(p.slug)} size="md" alt="" />
                      </span>
                    </span>
                    <span className="flex flex-1 flex-col p-5 md:p-6">
                      <Chip className="self-start">{category}</Chip>
                      <span className="mt-3 block text-[17px] font-bold leading-snug text-ink group-hover:text-plum md:text-[18px]">
                        {p.meta.title}
                      </span>
                      <span className="mt-auto block whitespace-nowrap pt-4 text-[13.5px] text-ink-600">
                        Written by {author.shortName}
                        {postDate(p) ? ` · ${postDate(p)}` : ""}
                        {p.meta.reading_time ? (
                          <>
                            {" · "}
                            <span className="whitespace-nowrap">{p.meta.reading_time} read</span>
                          </>
                        ) : null}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </DeferredSwipe>
          </div>
        </section>
      </Reveal>

      {/* ── H11 09 / QUICK ANSWERS ──────────────────────────────────── */}
      <Reveal>
        <section className={SECTION}>
          <div className={`${CONT} max-w-[860px]`}>
            <SectionHead num="09" label="Quick answers" title="Questions patients ask us" accent="patients" />
            <FaqAccordion items={faqItems} />
            <div className="mt-6">
              <ButtonLink href="/faqs/" variant="link" arrow className="text-[16px]">
                See all FAQs
              </ButtonLink>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── H12 CONTACT STRIP ───────────────────────────────────────── */}
      <Reveal>
        <section className={SECTION}>
          <div className={`${CONT} grid items-stretch gap-8 lg:grid-cols-2`}>
            <div className="glass rounded-[24px] p-8 sm:p-10">
              <Eyebrow>Contact</Eyebrow>
              <h2 className="t-h3 mt-3 text-ink">Find us and talk to us</h2>
              <ul className="mt-6 space-y-4 text-[15.5px]">
                <li className="flex gap-3">
                  <MapPinIcon size={18} aria-hidden className="mt-0.5 shrink-0 text-plum" />
                  <span className="text-ink-600">{site.address.full}</span>
                </li>
                <li className="flex gap-3">
                  <PhoneIcon size={18} aria-hidden className="mt-0.5 shrink-0 text-plum" />
                  <span className="text-ink-600">
                    <a href={site.phone.tel} className="font-semibold text-ink hover:text-plum">
                      {site.phone.display}
                    </a>
                    {" · "}
                    <a href={site.mobile.tel} className="font-semibold text-ink hover:text-plum">
                      {site.mobile.display}
                    </a>
                  </span>
                </li>
                <li className="flex gap-3">
                  <MailIcon size={18} aria-hidden className="mt-0.5 shrink-0 text-plum" />
                  <ObfuscatedEmail className="font-semibold text-ink hover:text-plum" />
                </li>
                {[
                  `OPD: ${site.hours.opd}`,
                  `Lab: ${site.hours.lab}`,
                  `Pharmacy: ${site.hours.pharmacy}`,
                  "Phone: Every day, 8 am to 9 pm",
                ].map((line) => (
                  <li key={line} className="flex gap-3">
                    <ClockIcon size={18} aria-hidden className="mt-0.5 shrink-0 text-plum" />
                    <span className="text-ink-600">{line}</span>
                  </li>
                ))}
                <li className="flex gap-3">
                  <EmergencyIcon size={18} aria-hidden className="mt-0.5 shrink-0 text-[#C01521]" />
                  <span className="font-medium text-[#C01521]">
                    {site.emergency.notice} {site.emergency.action}
                  </span>
                </li>
              </ul>
            </div>
            <Deferred of="map" fallback={mapFallback} />
          </div>
        </section>
      </Reveal>

      {/* ── CTA BAND ────────────────────────────────────────────────── */}
      <div className={`${CONT} pb-14 lg:pb-24`}>
        <CtaBand className="mt-0" />
      </div>
    </>
  );
}
