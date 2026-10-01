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
import { diabetesHeartGroups, childTeenGroups, labPharmacyLinks } from "@/lib/nav";
import {
  medicalClinicJsonLd,
  faqPageJsonLd,
  JsonLd,
  SITE_URL,
} from "@/lib/seo";

import { BookButton } from "@/components/ui/BookButton";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { AccentHeading } from "@/components/ui/AccentHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { DoctorChip } from "@/components/ui/DoctorChip";
import { Confirm } from "@/components/ui/Confirm";
import { ServiceBadge } from "@/components/ui/ServiceBadge";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";
import { HeroFan, type FanCard } from "@/components/sections/HeroFan";
import { DoctorCard, type Doctor } from "@/components/sections/DoctorCard";
import { type CarouselItem } from "@/components/sections/CenteredCarousel";
import { FaqAccordion, type FaqItem } from "@/components/sections/FaqAccordion";
import { CtaBand } from "@/components/sections/CtaBand";
import { type ServiceTab } from "@/components/home/ServiceTabs";
import { type GalleryStep } from "@/components/home/StepsGallery";
import { ParallaxBand } from "@/components/home/ParallaxBand";
import { Deferred } from "@/components/ui/Deferred";
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
  ArrowRightIcon,
} from "@/components/icons";

const CONT = "mx-auto max-w-[1240px] px-4 sm:px-6";
const SECTION = "py-[72px] lg:py-[120px]";

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
      images: [{ url: `${SITE_URL}/images/doctors/dr-ajay-kaduskar-hero.jpg` }],
    },
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
  {
    src: "/images/services/diabetic-eye-screening-fan.jpg",
    alt: "A retinal camera screening a patient's eyes for diabetic changes",
    caption: "Retinal screening",
    sub: "Retinal screening for diabetes",
  },
  {
    src: "/images/clinic/reception-fan.jpg",
    alt: "The Niramay Clinics reception and waiting lounge",
    caption: "One address",
    sub: "Lab, pharmacy and tests in one place",
  },
];

const whyCards = [
  {
    icon: SpecialistIcon,
    title: "20+ years of specialist practice",
    text: "Each of our doctors has more than two decades of clinical experience.",
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

const serviceTabs: ServiceTab[] = [
  {
    label: "Diabetes and Metabolic",
    intro:
      "Long-term care for diabetes, prediabetes, thyroid, blood pressure and weight, with complication screening built in.",
    slides: [...diabetesHeartGroups[0].links, ...diabetesHeartGroups[1].links].map((l) => ({
      badge: l.badge ?? "health-checkup",
      title: l.label,
      text: serviceCardText[l.href] ?? "",
      href: l.href,
    })),
  },
  {
    label: "Heart",
    intro: "Find heart risk early with ECG, 2D Echo and treadmill testing, and a clear plan to lower it.",
    slides: diabetesHeartGroups[2].links.map((l) => ({
      badge: l.badge ?? "heart-care",
      title: l.label,
      text: serviceCardText[l.href] ?? "",
      href: l.href,
    })),
  },
  {
    label: "Child and Teen",
    intro: "From baby check-ups and vaccines to puberty, stress, screens and career choices.",
    slides: childTeenGroups
      .flatMap((g) => g.links)
      .map((l) => ({
        badge: l.badge ?? "adolescent-health",
        title: l.label,
        text: serviceCardText[l.href] ?? "",
        href: l.href,
      })),
  },
  {
    label: "Lab and Pharmacy",
    intro: "Tests from 7 am to 7 pm, home sample collection, and medicines dispensed on site.",
    slides: labPharmacyLinks.map((l) => ({
      badge: l.badge ?? "diagnostic-lab",
      title: l.label,
      text: serviceCardText[l.href] ?? "",
      href: l.href,
    })),
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

const conditionCards: CarouselItem[] = [
  { badge: "diabetes-care", title: "Type 2 diabetes", body: serviceCardText["/diabetes/type-2-diabetes/"], href: "/diabetes/type-2-diabetes/" },
  { badge: "diabetes-care", title: "Type 1 diabetes", body: serviceCardText["/diabetes/type-1-diabetes/"], href: "/diabetes/type-1-diabetes/" },
  { badge: "health-checkup", title: "Prediabetes", body: serviceCardText["/diabetes/prediabetes-risk-assessment/"], href: "/diabetes/prediabetes-risk-assessment/" },
  { badge: "diabetes-in-pregnancy", title: "Diabetes in pregnancy", body: serviceCardText["/diabetes/diabetes-in-pregnancy/"], href: "/diabetes/diabetes-in-pregnancy/" },
  { badge: "thyroid", title: "Thyroid disorders", body: serviceCardText["/thyroid-clinic/"], href: "/thyroid-clinic/" },
  { badge: "hypertension", title: "High blood pressure", body: serviceCardText["/hypertension-clinic/"], href: "/hypertension-clinic/" },
  { badge: "obesity-care", title: "Weight and obesity", body: serviceCardText["/obesity/"], href: "/obesity/" },
  { badge: "heart-care", title: "Heart risk", body: serviceCardText["/heart-care/"], href: "/heart-care/" },
  { badge: "well-baby", title: "Baby growth and vaccines", body: serviceCardText["/blooming-buds/well-baby-clinic/"], href: "/blooming-buds/well-baby-clinic/" },
  { badge: "teen-counselling", title: "Teen stress and anxiety", body: serviceCardText["/blooming-buds/teen-mental-health/"], href: "/blooming-buds/teen-mental-health/" },
  { badge: "adolescent-health", title: "PCOS and periods", body: serviceCardText["/blooming-buds/adolescent-health/"], href: "/blooming-buds/adolescent-health/" },
  { badge: "career-counselling", title: "Career confusion", body: serviceCardText["/blooming-buds/career-counselling/"], href: "/blooming-buds/career-counselling/" },
];

const doctorCards: Doctor[] = [
  {
    name: doctors.ajay.name,
    shortName: "Dr. Ajay",
    qualifications: doctors.ajay.qualifications,
    role: "Consultant in diabetes, obesity and metabolic diseases. Director, Niramay Diabetes and Heart Care Centre.",
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
    photo: { src: "/images/doctors/dr-prajakta-kaduskar-card.jpg", alt: "Dr. Prajakta Kaduskar" },
    languages: ["English", "Hindi", "Marathi"],
    bookHref: "/contact/#book",
    profileHref: doctors.prajakta.profileHref,
  },
];

// Google profile links are [CONFIRM] in site-config; until they land, these
// buttons deep-link a Google search for the public listings.
const G_SEARCH = "https://www.google.com/search?q=";
const reviewLinks = {
  centre: `${G_SEARCH}${encodeURIComponent("Niramay Diabetes and Heart Care Centre Dhantoli reviews")}`,
  doctor: `${G_SEARCH}${encodeURIComponent("Dr. Ajay Kaduskar Niramay Clinics Nagpur reviews")}`,
};
const directionsUrl = site.mapUrl.startsWith("http")
  ? site.mapUrl
  : `https://maps.google.com/?q=${encodeURIComponent(site.name + ", " + site.address.short)}`;

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
const faqItems: FaqItem[] = quickAnswers.map((f) => ({
  q: f.q,
  aText: f.aText,
  a: <p>{f.aText}</p>,
}));

/* ------------------------------------------------------------ JSON-LD */

const httpOrNull = (v: string) => (v.startsWith("http") ? v : null);
const clinicLd = {
  ...medicalClinicJsonLd(),
  geo: {
    "@type": "GeoCoordinates",
    latitude: 21.134804,
    longitude: 79.083769,
  },
  contactPoint: [
    { "@type": "ContactPoint", telephone: "+91-712-2422214", contactType: "appointments" },
    { "@type": "ContactPoint", telephone: "+91-84591-41584", contactType: "customer service" },
  ],
  department: [
    {
      "@type": "MedicalClinic",
      name: site.centres.adult,
      medicalSpecialty: ["Diabetology", "Cardiology"],
    },
    {
      "@type": "MedicalClinic",
      name: site.centres.child,
      medicalSpecialty: ["Pediatric", "Adolescent Medicine"],
    },
  ],
  sameAs: [httpOrNull(site.googleReviews.diabetesHeart), httpOrNull(site.googleReviews.bloomingBuds)].filter(
    (v): v is string => !!v
  ),
};
const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: SITE_URL,
};

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
    <div className="flex flex-wrap items-center gap-2" aria-hidden>
      {serviceTabs.map((t, i) => (
        <span
          key={t.label}
          className={
            i === 0
              ? `${pillBase} bg-grad text-white shadow-[0_10px_24px_-10px_rgba(69,62,109,.5)]`
              : pillBase
          }
        >
          {t.label}
        </span>
      ))}
    </div>
    <p className="mt-8 max-w-[62ch] text-[16px] leading-relaxed text-ink-600">
      {serviceTabs[0].intro}
    </p>
    <div className="edge-fade mt-6 overflow-x-auto pb-2 pt-1">
      <div className="flex gap-5 px-1">
        {serviceTabs[0].slides.map((s) => (
          <ServiceGlassCard
            key={s.title}
            badge={s.badge}
            title={s.title}
            text={s.text}
            href={s.href}
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
  <div className="grid gap-10 min-[900px]:grid-cols-[1fr_360px] min-[900px]:gap-14">
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
        {visitSteps.map((s, i) => (
          <li key={s.title} className="py-8 first:pt-0">
            {s.image && (
              // eslint-disable-next-line @next/next/no-img-element -- small, mobile-only, lazy
              <img
                src={s.image.src}
                alt={s.image.alt}
                loading="lazy"
                className="mb-4 aspect-[16/9] w-full rounded-[14px] object-cover min-[900px]:hidden"
              />
            )}
            <h3 className="t-h3 mb-1.5 text-ink">{s.title}</h3>
            <p className={i === 0 ? "text-[15.5px] leading-relaxed text-ink-600" : "text-[15.5px] leading-relaxed text-ink"}>
              {s.body}
            </p>
          </li>
        ))}
      </ol>
    </div>
    <div className="relative max-[900px]:hidden">
      <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-[22px] border border-line shadow-[var(--shadow-card)]">
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
);

const conditionsFallback = (
  <div className="edge-fade overflow-x-auto py-8" role="region" aria-label="Conditions we look after">
    <div className="flex">
      {conditionCards.map((it) => (
        <div key={it.title} className="min-w-0 flex-[0_0_min(300px,78%)] px-3">
          <div className="h-full rounded-[20px] border border-line bg-card p-7 shadow-[var(--shadow-card)]">
            <div className="mb-4 flex justify-center">
              <ServiceBadge slug={it.badge} size="sm" alt="" />
            </div>
            <h3 className="t-h3 mb-2 text-ink">{it.title}</h3>
            <p className="text-[15px] leading-relaxed text-ink-600">{it.body}</p>
            {it.href && (
              <Link
                href={it.href}
                aria-label={`Learn more about ${it.title}`}
                className="mt-4 inline-flex min-h-[44px] items-center gap-1.5 text-[14.5px] font-semibold text-plum transition-colors hover:text-plum-500"
              >
                Learn more <span className="sr-only">about {it.title}</span>
                <ArrowRightIcon size={15} aria-hidden />
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const mapFallback = (
  <a
    href={directionsUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative block w-full overflow-hidden rounded-[20px] border border-line"
    aria-label="Show map — opens Google Maps"
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
      <JsonLd data={[clinicLd, websiteLd, ...(faqItems.length ? [faqPageJsonLd(faqItems)] : [])]} />

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
        <div className={`${CONT} relative grid items-center gap-12 py-14 lg:grid-cols-[1.1fr_.9fr] lg:py-20`}>
          <div>
            <Eyebrow>NIRAMAY CLINICS · DHANTOLI, NAGPUR</Eyebrow>
            <h1 className="t-display mt-5 text-ink">
              Specialist care for diabetes, heart health and growing <em className="accent">children</em>
            </h1>
            <p className="t-lead mt-6 max-w-[54ch]">
              Two experienced doctors, an in-house laboratory and pharmacy, and tests like 2D Echo,
              ECG and retinal screening, at one address in Dhantoli.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <BookButton href="/contact/#book" />
              <ButtonLink href={site.phone.tel} variant="secondary">
                <PhoneIcon size={18} aria-hidden /> Call {site.phone.display}
              </ButtonLink>
            </div>
            <p className="mt-6 text-[14px] font-medium text-ink-600">
              In-house laboratory · Pharmacy · 2D Echo, ECG and TMT · Retinal screening · Body
              composition analysis
            </p>
            <DoctorChip className="mt-6" />
          </div>
          <div className="cv-auto flex justify-center max-lg:mt-16 lg:justify-end">
            <HeroFan cards={fanCards} intervalMs={5000} />
          </div>
        </div>
      </section>

      {/* ── H2 01 / WHY NIRAMAY ─────────────────────────────────────── */}
      <Reveal>
        <section className={SECTION}>
          <div className={CONT}>
            <SectionHead num="01" label="Why Niramay" title="Care that is planned around you" accent="around you" />
            {/* soft gradient panel with glows so the cards can be glass */}
            <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-plum-50 via-white to-[#fdf3ee] p-6 sm:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-32 -top-32 size-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(242,149,122,.3),transparent)]"
              />
              <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {whyCards.map((c) => (
                  <GlassCard key={c.title} icon={c.icon} title={c.title} glass>
                    <p>{c.text}</p>
                  </GlassCard>
                ))}
              </div>
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
              <div className="pointer-events-none absolute -right-3 -top-4 sm:-right-6">
                <span className="home-badge-drift pointer-events-auto glass block rounded-full px-4 py-2 text-[13.5px] font-semibold text-ink">
                  20+ years each in practice
                </span>
              </div>
              <div className="pointer-events-none absolute -left-3 top-1/2 sm:-left-6">
                <span
                  className="home-badge-drift pointer-events-auto glass block rounded-full px-4 py-2 text-[13.5px] font-semibold text-ink"
                  style={{ animationDelay: "1.4s" }}
                >
                  2 specialist centres, 1 address
                </span>
              </div>
              <div className="pointer-events-none absolute -bottom-4 right-8">
                <span
                  className="home-badge-drift pointer-events-auto glass block rounded-full px-4 py-2 text-[13.5px] font-semibold text-ink"
                  style={{ animationDelay: "2.8s" }}
                >
                  Lab open 7 am to 7 pm
                </span>
              </div>
            </div>
            {/* text + centre mini cards */}
            <div>
              <SectionHead
                num="02"
                label="Two specialists, one family practice"
                title="Two clinics, one address"
              />
              <p className="text-[17px] leading-relaxed text-ink-600">
                Niramay Clinics brings two specialist practices under one roof, so most families can
                manage adult and child care at a single visit. Each doctor has more than 20 years of
                clinical practice.
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
        <p className="mt-1 text-[15.5px] font-medium text-ink">Opposite Dinanath High School</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Chip className="gap-1.5"><LiftIcon size={14} aria-hidden /> Lift</Chip>
          <Chip className="gap-1.5"><WheelchairIcon size={14} aria-hidden /> Wheelchair friendly</Chip>
          <Chip className="gap-1.5"><ParkingIcon size={14} aria-hidden /> Two-wheeler parking</Chip>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href={directionsUrl} target="_blank" rel="noopener noreferrer">
            <MapPinIcon size={17} aria-hidden /> Get directions
          </ButtonLink>
          <ButtonLink href="/plan-your-visit/" variant="secondary" arrow>
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
              lead="Each with more than 20 years of practice."
            />
            <div className="grid gap-6 lg:grid-cols-2">
              {doctorCards.map((d) => (
                <DoctorCard key={d.name} doctor={d} />
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── H8 06 / CONDITIONS ──────────────────────────────────────── */}
      <Reveal>
        <section className={SECTION}>
          <div className={CONT}>
            <SectionHead num="06" label="Conditions we look after" title="Care for the conditions we see most" accent="see most" />
            <Deferred
              of="conditions"
              props={{ items: conditionCards, ariaLabel: "Conditions we look after" }}
              fallback={conditionsFallback}
            />
          </div>
        </section>
      </Reveal>

      {/* ── H9 07 / PATIENT REVIEWS (compliant) ─────────────────────── */}
      <Reveal>
        <section className={SECTION}>
          <div className={CONT}>
            <div className="mx-auto max-w-[760px] rounded-[24px] border border-line bg-card p-8 text-center shadow-[var(--shadow-card)] sm:p-12">
              {/* Google "G" mark */}
              <svg viewBox="0 0 24 24" className="mx-auto size-10" aria-hidden="true">
                <path fill="#4285F4" d="M23.5 12.3c0-.9-.1-1.5-.3-2.2H12v4.1h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.5z" />
                <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3a7.3 7.3 0 0 1-10.8-3.8H1.3v3.1A12 12 0 0 0 12 24z" />
                <path fill="#FBBC05" d="M5.2 14.3a7.4 7.4 0 0 1 0-4.6v-3H1.3a12 12 0 0 0 0 10.6l3.9-3z" />
                <path fill="#EA4335" d="M12 4.8a6.9 6.9 0 0 1 4.9 1.9l3.6-3.6A12 12 0 0 0 1.3 6.7l3.9 3a7.4 7.4 0 0 1 6.8-4.9z" />
              </svg>
              <Eyebrow className="mt-5">07 / Patient reviews</Eyebrow>
              <h2 className="t-h3 mt-3 text-ink">Read what patients say about us on Google</h2>
              <p className="mx-auto mt-3 max-w-[52ch] text-[15.5px] leading-relaxed text-ink-600">
                We do not publish testimonials on this website. You can read independent patient
                reviews on our Google profiles.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <ButtonLink href={reviewLinks.centre} variant="secondary" target="_blank" rel="noopener noreferrer">
                  Reviews: {site.centres.adult}
                </ButtonLink>
                <ButtonLink href={reviewLinks.doctor} variant="secondary" target="_blank" rel="noopener noreferrer">
                  Reviews: {doctors.ajay.name}
                </ButtonLink>
                <ButtonLink href={reviewLinks.centre} variant="link" arrow target="_blank" rel="noopener noreferrer">
                  Write a review
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── H10 08 / HEALTH LIBRARY ─────────────────────────────────── */}
      <Reveal>
        <section className={SECTION}>
          <div className={CONT}>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <SectionHead num="08" label="From our Health Library" title="Read before your visit" accent="before" />
              <ButtonLink href="/health-library/" variant="link" arrow className="mb-2 text-[16px]">
                Visit the Health Library
              </ButtonLink>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => {
                const author = p.meta.author.includes("Prajakta") ? doctors.prajakta : doctors.ajay;
                const img =
                  p.slug === "diabetes-myths-and-facts" ? "/images/blog/diabetes-myths.jpg" : null;
                const category = p.meta.author.includes("Prajakta") ? "Child and teen" : "Diabetes and heart";
                return (
                  <Link
                    key={p.slug}
                    href={p.meta.url}
                    className="group flex flex-col overflow-hidden rounded-[20px] border border-line bg-card shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)]"
                  >
                    {img ? (
                      <span className="relative block aspect-[16/9] overflow-hidden">
                        <Image
                          src={img}
                          alt=""
                          fill
                          sizes="(min-width:1024px) 33vw, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      </span>
                    ) : (
                      <span className="relative block aspect-[16/9] bg-gradient-to-br from-plum-100 via-plum-50 to-[#fdf3ee]">
                        <span className="absolute inset-0 grid place-items-center">
                          <ServiceBadge
                            slug={p.meta.author.includes("Prajakta") ? "teen-counselling" : "diabetes-care"}
                            size="md"
                            alt=""
                          />
                        </span>
                      </span>
                    )}
                    <span className="flex flex-1 flex-col p-6">
                      <Chip className="self-start">{category}</Chip>
                      <span className="mt-3 block text-[18px] font-bold leading-snug text-ink group-hover:text-plum">
                        {p.meta.title}
                      </span>
                      <span className="mt-auto block pt-4 text-[13.5px] text-ink-600">
                        Written by {author.name}
                        {postDate(p) ? ` · ${postDate(p)}` : ""}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
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
        <section className="pb-[72px] lg:pb-[120px]">
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
                  <a href={`mailto:${site.email}`} className="font-semibold text-ink hover:text-plum">
                    {site.email}
                  </a>
                </li>
                <li className="flex gap-3">
                  <ClockIcon size={18} aria-hidden className="mt-0.5 shrink-0 text-plum" />
                  <span className="text-ink-600">
                    Lab: {site.labHours.short}
                    <Confirm> · OPD hours: to be confirmed</Confirm>
                  </span>
                </li>
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
      <div className={`${CONT} pb-[72px] lg:pb-[120px]`}>
        <CtaBand className="mt-0" />
      </div>
    </>
  );
}
