import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site-config";
import { Button, ButtonLink } from "@/components/ui/Button";
import { BookButton } from "@/components/ui/BookButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { AccentHeading } from "@/components/ui/AccentHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Chip } from "@/components/ui/Chip";
import { Callout } from "@/components/ui/Callout";
import { DoctorChip } from "@/components/ui/DoctorChip";
import { Confirm } from "@/components/ui/Confirm";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { StepTracker } from "@/components/sections/StepTracker";
import { CenteredCarousel } from "@/components/sections/CenteredCarousel";
import { ServiceCarousel, type ServiceSlide } from "@/components/sections/ServiceCarousel";
import type { BadgeTint } from "@/components/sections/ServiceGlassCard";
import { DoctorCard, type Doctor } from "@/components/sections/DoctorCard";
import { HeroFan } from "@/components/sections/HeroFan";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { ServiceBadge } from "@/components/ui/ServiceBadge";
import { iconSet, type IconComponent } from "@/components/icons";
import {
  ClockIcon, TrainedIcon, LabIcon, NutritionPlateIcon,
  CalendarCheckIcon, MapPinIcon, PhoneIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const CONT = "mx-auto w-full max-w-[1240px] px-5 sm:px-8";

function Section({
  num,
  label,
  children,
  className,
}: {
  num: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn(CONT, "py-14", className)}>
      <Eyebrow num={num} as="h2">{label}</Eyebrow>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Swatch({ name, hex, note, textLight }: { name: string; hex: string; note: string; textLight?: boolean }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-line shadow-[var(--shadow-card)]">
      <div className={cn("flex h-24 items-end p-3", textLight ? "text-white" : "text-ink")} style={{ background: hex }}>
        <span className="text-[13px] font-bold">{hex}</span>
      </div>
      <figcaption className="bg-card p-3">
        <span className="block text-[13px] font-semibold text-ink">{name}</span>
        <span className="block text-[12px] text-ink-600">{note}</span>
      </figcaption>
    </figure>
  );
}

const whyCards: { icon: IconComponent; title: string; body: string }[] = [
  { icon: ClockIcon, title: "20+ years of specialist practice", body: "Each of our doctors has more than two decades of clinical experience." },
  { icon: TrainedIcon, title: "Trained for what we treat", body: "MD with diabetology training and a Netherlands fellowship; paediatrics with adolescent health and clinical psychology." },
  { icon: LabIcon, title: "Tests under one roof", body: "Laboratory, 2D Echo, ECG, treadmill test, retinal photography and body composition analysis at the clinic." },
  { icon: NutritionPlateIcon, title: "Diet advice you can follow", body: "Our nutritionist plans meals around your home food and routine." },
  { icon: CalendarCheckIcon, title: "Care that continues", body: "Planned follow-ups, with your results and prescriptions kept together." },
  { icon: MapPinIcon, title: "Easy to reach", body: "Lab open 7 am to 7 pm, home sample collection, pharmacy with home delivery, lift and wheelchair access." },
];

const tabGroups: {
  value: string;
  label: string;
  intro: string;
  tint: BadgeTint;
  cards: ServiceSlide[];
}[] = [
  {
    value: "diabetes",
    label: "Diabetes and Metabolic",
    intro: "Long-term care for diabetes, prediabetes, thyroid, blood pressure and weight, with complication screening built in.",
    tint: "plum",
    cards: [
      { badge: "diabetes-care", title: "Diabetes care", text: "Ongoing management" },
      { badge: "diabetes-in-pregnancy", title: "Diabetes in pregnancy", text: "Before and during" },
      { badge: "eye-screening", title: "Complication screening", text: "Eyes, kidneys, feet" },
      { badge: "thyroid", title: "Thyroid clinic", text: "Hypo and hyper" },
      { badge: "hypertension", title: "Hypertension clinic", text: "Blood pressure" },
      { badge: "nutrition", title: "Nutrition counselling", text: "Home food plans" },
    ],
  },
  {
    value: "heart",
    label: "Heart",
    intro: "Find heart risk early with ECG, 2D Echo and treadmill testing, and a clear plan to lower it.",
    tint: "indigo",
    cards: [
      { badge: "heart-care", title: "Heart care", text: "Risk and prevention" },
      { badge: "health-checkup", title: "Health check-ups", text: "Preventive screening" },
    ],
  },
  {
    value: "child",
    label: "Child and Teen",
    intro: "From baby check-ups and vaccines to puberty, stress, screens and career choices.",
    tint: "lilac",
    cards: [
      { badge: "well-baby", title: "Well baby clinic", text: "Growth and feeding" },
      { badge: "vaccination", title: "Vaccinations", text: "All ages" },
      { badge: "adolescent-health", title: "Teen health", text: "Puberty and growth" },
      { badge: "teen-counselling", title: "Teen counselling", text: "Stress and anxiety" },
      { badge: "career-counselling", title: "Career counselling", text: "Aptitude and choice" },
    ],
  },
  {
    value: "lab",
    label: "Lab and Pharmacy",
    intro: "Tests from 7 am to 7 pm, home sample collection, and medicines dispensed on site.",
    tint: "indigo-plum",
    cards: [
      { badge: "diagnostic-lab", title: "Laboratory", text: "7 am to 7 pm" },
      { badge: "home-sample-collection", title: "Home sample collection", text: "At your door" },
      { badge: "pharmacy", title: "Pharmacy", text: "In-house" },
    ],
  },
];

const steps = [
  { title: "Book", body: "Call, WhatsApp or send a request. We confirm your time." },
  { title: "Arrive and register", body: "Bring old reports and your medicines. Our staff check weight, waist and blood pressure." },
  { title: "Consultation", body: "Your doctor takes a full history, examines you and explains what they find." },
  { title: "Tests, if needed", body: "Blood tests, ECG, Echo or eye screening, mostly done the same day." },
  { title: "Your plan", body: "Targets, medicines and diet in writing. Collect medicines from our pharmacy if prescribed." },
  { title: "Follow-up", body: "We book your next review so progress is tracked." },
];

const conditions = [
  { badge: "diabetes-care", title: "Type 2 diabetes", body: "Steady sugar control, complication screening and a routine that fits your life." },
  { badge: "thyroid", title: "Thyroid disorders", body: "Diagnosis and monitoring for under- and over-active thyroid." },
  { badge: "hypertension", title: "High blood pressure", body: "Measured properly, explained clearly, and managed with a long-term plan." },
  { badge: "obesity-care", title: "Weight and obesity", body: "Medical weight care using food, activity, body composition and medicines where needed." },
  { badge: "teen-counselling", title: "Teen stress and anxiety", body: "A safe place for teenagers to talk, with psychology and paediatrics in one visit." },
  { badge: "vaccination", title: "Vaccinations", body: "Baby, child and adolescent vaccines with reminders for what is due next." },
];

const doctors: Doctor[] = [
  {
    name: "Dr. Ajay V. Kaduskar",
    shortName: "Dr. Ajay",
    qualifications: "MD (Medicine), PGDHSc (Diabetology), FEACD (Netherlands)",
    role: "Diabetes, obesity, thyroid and heart care at Niramay Diabetes and Heart Care Centre.",
    photo: { src: "/images/doctors/dr-ajay-kaduskar-card.jpg", alt: "Dr. Ajay Kaduskar in a white coat and navy scrubs" },
    languages: ["English", "हिन्दी", "मराठी"],
    bookHref: "/contact/#book",
    profileHref: "/doctors/dr-ajay-kaduskar/",
  },
  {
    name: "Dr. Prajakta A. Kaduskar",
    shortName: "Dr. Prajakta",
    qualifications: "MBBS, DCH, PGDAP, MA (Clinical Psychology)",
    role: "Child and adolescent health, counselling and career guidance at Blooming Buds.",
    photo: { src: "/images/doctors/dr-prajakta-kaduskar-card.jpg", alt: "Dr. Prajakta Kaduskar in a white coat over a purple saree" },
    languages: ["English", "हिन्दी", "मराठी"],
    bookHref: "/contact/#book",
    profileHref: "/doctors/dr-prajakta-kaduskar/",
  },
];

const allBadges = [
  "diabetes-care", "diabetes-in-pregnancy", "eye-screening", "thyroid", "hypertension",
  "heart-care", "obesity-care", "body-composition", "nutrition", "health-checkup",
  "adolescent-health", "teen-counselling", "career-counselling", "well-baby", "vaccination",
  "diagnostic-lab", "home-sample-collection", "pharmacy", "doctor-male", "doctor-female",
];

export default function Styleguide() {
  return (
    <main className="pb-24 max-lg:pb-32">
      {/* Header */}
      <header className="border-b border-line">
        <div className={cn(CONT, "flex items-center justify-between py-4")}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/brand/niramay-logo.png" alt="Niramay Clinics" className="h-11 w-auto sm:h-14" />
          <Chip>Niramay design system</Chip>
        </div>
      </header>

      {/* Hero demo: white panel, peach + plum glows, fan, doctor chip */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 size-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(242,149,122,.4),transparent)]" />
        <div aria-hidden className="pointer-events-none absolute -left-48 bottom-0 size-[480px] rounded-full bg-[radial-gradient(closest-side,rgba(115,69,105,.14),transparent)]" />
        <div className={cn(CONT, "relative grid items-center gap-12 py-20 lg:grid-cols-[1.1fr_.9fr]")}>
          <div>
            <Eyebrow>NIRAMAY CLINICS · DHANTOLI, NAGPUR</Eyebrow>
            <h1 className="t-display mt-5 text-ink">
              Specialist care for diabetes, heart health and growing <em className="accent">children</em>
            </h1>
            <p className="t-lead mt-6 max-w-[54ch]">
              Two experienced doctors, an in-house laboratory and pharmacy, and tests like 2D Echo, ECG and retinal screening, at one address in Dhantoli.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <BookButton />
              <ButtonLink href={site.phone.tel} variant="secondary">
                <PhoneIcon size={18} /> Call {site.phone.display}
              </ButtonLink>
            </div>
            <DoctorChip className="mt-8" />
          </div>
          <div className="flex justify-center lg:justify-end">
            <HeroFan
              cards={[
                {
                  src: "/images/doctors/dr-ajay-kaduskar-hero.jpg",
                  alt: "Dr. Ajay Kaduskar in a white coat and navy scrubs standing in a hospital corridor",
                  caption: "Dr. Ajay Kaduskar",
                  sub: "Diabetes, obesity and heart care",
                },
                {
                  src: "/images/doctors/dr-prajakta-kaduskar-hero.jpg",
                  alt: "Dr. Prajakta Kaduskar in a white coat over a purple saree standing in a hospital corridor",
                  caption: "Dr. Prajakta Kaduskar",
                  sub: "Child and adolescent care",
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* 01 Colour */}
      <Section num="01" label="COLOUR">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <Swatch name="Plum" hex="#734569" note="Primary text accent, buttons. White on it: 7.54:1" textLight />
          <Swatch name="Indigo" hex="#453E6D" note="Gradient partner, labels. White on it: 9.71:1" textLight />
          <Swatch name="Plum 500" hex="#8E5A83" note="Secondary accent, done states. On white: 5.33:1" textLight />
          <Swatch name="Plum 100" hex="#F3ECF2" note="Chips, tabs, soft surfaces. Ink on it: 12.70:1" />
          <Swatch name="Plum 50" hex="#FAF6F9" note="Soft washes. Ink on it: 13.77:1" />
          <Swatch name="Ink" hex="#2A2440" note="Body headings and text. On white: 14.74:1" textLight />
          <Swatch name="Ink 600" hex="#5B5670" note="Secondary text. On white: 6.98:1" textLight />
          <Swatch name="Line" hex="#E8E2E6" note="Hairlines and borders, not text" />
          <Swatch name="Peach" hex="#F2957A" note="Decorative glows only, never text" />
          <Swatch name="Logo red" hex="#E61E25" note="Logo and emergency notices. On white: 4.59:1" textLight />
          <Swatch name="Success" hex="#2F7D5B" note="Confirmations. On white: 4.99:1" textLight />
          <Swatch name="Page" hex="#FFFFFF" note="Background everywhere, including hero" />
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <figure className="overflow-hidden rounded-2xl border border-line">
            <div className="bg-grad flex h-24 items-end p-3 text-white"><span className="text-[13px] font-bold">brand gradient</span></div>
            <figcaption className="bg-card p-3 text-[12px] text-ink-600">90deg plum to indigo. Buttons, active tab, Book button, mobile bar.</figcaption>
          </figure>
          <figure className="overflow-hidden rounded-2xl border border-line">
            <div className="bg-grad-hero flex h-24 items-end p-3 text-white"><span className="text-[13px] font-bold">hero gradient</span></div>
            <figcaption className="bg-card p-3 text-[12px] text-ink-600">Radial plum to indigo, kept for dark panels only.</figcaption>
          </figure>
          <figure className="overflow-hidden rounded-2xl border border-line">
            <div className="flex h-24 items-end bg-[radial-gradient(closest-side_at_70%_30%,rgba(242,149,122,.5),transparent)] p-3"><span className="text-[13px] font-bold">peach glow</span></div>
            <figcaption className="bg-card p-3 text-[12px] text-ink-600">Radial glow used in the hero and arch cards.</figcaption>
          </figure>
        </div>
      </Section>

      {/* 02 Type */}
      <Section num="02" label="TYPE">
        <div className="space-y-6 rounded-[20px] border border-line bg-card p-8 shadow-[var(--shadow-card)]">
          <div>
            <p className="mb-1 text-[12px] uppercase tracking-wide text-ink-600">Display · Figtree 700 · clamp(34,5.4vw,60)</p>
            <p className="t-display">Care that feels <em className="accent">simpler</em></p>
          </div>
          <div>
            <p className="mb-1 text-[12px] uppercase tracking-wide text-ink-600">H1 · clamp(34,5vw,52)</p>
            <p className="t-h1">Specialist care, close to home</p>
          </div>
          <div>
            <p className="mb-1 text-[12px] uppercase tracking-wide text-ink-600">H2 · clamp(28,3.4vw,40)</p>
            <p className="t-h2">Two specialists, one family practice</p>
          </div>
          <div>
            <p className="mb-1 text-[12px] uppercase tracking-wide text-ink-600">H3 · 21px 600</p>
            <p className="t-h3">Tests under one roof</p>
          </div>
          <div>
            <p className="mb-1 text-[12px] uppercase tracking-wide text-ink-600">Lead · 19px, ink-600</p>
            <p className="t-lead">Your doctor explains what is happening, why it matters and what to do next.</p>
          </div>
          <div>
            <p className="mb-1 text-[12px] uppercase tracking-wide text-ink-600">Body · 17px minimum, 1.65 line height</p>
            <p className="t-body">Bring your previous reports and your current medicines, and we will take it from there.</p>
          </div>
          <div>
            <p className="mb-1 text-[12px] uppercase tracking-wide text-ink-600">Small · 14px, ink-600</p>
            <p className="t-small">OPD hours <Confirm>TODO_CONFIRM</Confirm> · Lab {site.labHours.short}</p>
          </div>
          <div>
            <p className="mb-1 text-[12px] uppercase tracking-wide text-ink-600">Eyebrow · 12.5px, 0.14em tracking</p>
            <Eyebrow num="02">TWO SPECIALISTS</Eyebrow>
          </div>
          <div>
            <p className="mb-1 text-[12px] uppercase tracking-wide text-ink-600">Devanagari · Noto Sans Devanagari</p>
            <p className="deva text-[26px] font-semibold">निरामय क्लिनिक</p>
            <p className="deva mt-1 text-ink-600">मुलांची काळजी, किशोरवयीनांचे मार्गदर्शन आणि मधुमेह व्यवस्थापन.</p>
          </div>
          <div>
            <p className="mb-1 text-[12px] uppercase tracking-wide text-ink-600">Accent word · Instrument Serif italic</p>
            <AccentHeading as="h3" accent="specialist" className="t-h2">Ready to talk to a specialist?</AccentHeading>
          </div>
        </div>
      </Section>

      {/* 03 Buttons */}
      <Section num="03" label="BUTTONS">
        <div className="flex flex-wrap items-center gap-5 rounded-[20px] border border-line bg-card p-8 shadow-[var(--shadow-card)]">
          <Button variant="primary">Book appointment</Button>
          <Button variant="secondary">
            <PhoneIcon size={18} /> Call {site.phone.display}
          </Button>
          <Button variant="link" arrow>Learn more</Button>
          <BookButton />
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Chip>English</Chip>
          <Chip>हिन्दी</Chip>
          <Chip>मराठी</Chip>
          <Chip active>Active chip</Chip>
        </div>
      </Section>

      {/* 04 Why Niramay — glass cards on soft diagonal panel */}
      <Section num="04" label="WHY NIRAMAY · GLASS CARDS">
        <div className="bg-soft p-10">
          <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyCards.map((c) => (
              <GlassCard key={c.title} icon={c.icon} title={c.title} glass className="h-full">
                {c.body}
              </GlassCard>
            ))}
          </div>
        </div>
      </Section>

      {/* Glass on hero gradient */}
      <Section num="05" label="GLASS ON DARK">
        <div className="bg-grad-hero rounded-[24px] p-6 sm:p-10">
          <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyCards.slice(0, 3).map((c) => (
              <GlassCard key={c.title} icon={c.icon} title={c.title} glass dark className="h-full">
                {c.body}
              </GlassCard>
            ))}
          </div>
        </div>
      </Section>

      {/* 06 Services: tabs + living-glass carousel */}
      <Section num="06" label="SERVICES · GLASS CARDS">
        <Tabs defaultValue="diabetes">
          <TabsList>
            {tabGroups.map((g) => (
              <TabsTrigger key={g.value} value={g.value}>{g.label}</TabsTrigger>
            ))}
          </TabsList>
          {tabGroups.map((g) => (
            <TabsContent key={g.value} value={g.value} className="mt-8">
              <p className="t-lead mb-7 max-w-[58ch]">{g.intro}</p>
              <div className="bg-soft p-6 sm:p-10">
                <ServiceCarousel key={g.value} items={g.cards} tint={g.tint} />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Section>

      {/* 07 Step tracker */}
      <Section num="07" label="YOUR FIRST VISIT · STEP TRACKER">
        <StepTracker label="STEP BY STEP" steps={steps} />
      </Section>

      {/* 08 Carousel */}
      <Section num="08" label="CONDITIONS WE LOOK AFTER · CAROUSEL">
        <CenteredCarousel items={conditions} />
      </Section>

      {/* 09 Doctor cards */}
      <Section num="09" label="DOCTOR CARDS">
        <div className="grid gap-6 lg:grid-cols-2">
          {doctors.map((d) => (
            <DoctorCard key={d.name} doctor={d} />
          ))}
        </div>
      </Section>

      {/* 10 Callouts */}
      <Section num="10" label="CALLOUTS">
        <div className="space-y-4">
          <Callout variant="emergency" title="Medical emergency? Call 108 or 112.">
            The clinic is an outpatient facility and does not handle emergencies. Call 108 or 112 or go to the nearest hospital.
          </Callout>
          <Callout variant="info" title="Medically reviewed by Dr. Ajay V. Kaduskar">
            This page explains care at Niramay Clinics. It is general education and does not replace a consultation.
          </Callout>
          <Callout variant="warning" title="Before your test">
            Some blood tests need 8 to 12 hours of fasting. Please confirm fasting instructions when you book.
          </Callout>
        </div>
      </Section>

      {/* 11 Service badges */}
      <Section num="11" label="SERVICE BADGES">
        <div className="rounded-[20px] border border-line bg-card p-8 shadow-[var(--shadow-card)]">
          <p className="mb-6 text-[13px] font-semibold uppercase tracking-wide text-ink-600">All 20 · md (112px) · hover for orbit ring, lift and sheen</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-5">
            {allBadges.map((slug) => (
              <div key={slug} className="flex flex-col items-center gap-3">
                <ServiceBadge slug={slug} size="md" coin circle />
                <span className="text-center text-[12px] font-medium leading-tight text-ink-600">{slug}</span>
              </div>
            ))}
          </div>
          <p className="mb-6 mt-12 text-[13px] font-semibold uppercase tracking-wide text-ink-600">sm (64px) — lists, menus, carousel cards</p>
          <div className="flex flex-wrap gap-6">
            {allBadges.slice(0, 10).map((slug) => (
              <ServiceBadge key={slug} slug={slug} size="sm" />
            ))}
          </div>
          <p className="mb-6 mt-12 text-[13px] font-semibold uppercase tracking-wide text-ink-600">lg (160px) — service page heroes</p>
          <div className="flex flex-wrap gap-8">
            <ServiceBadge slug="diabetes-care" size="lg" coin circle />
            <ServiceBadge slug="heart-care" size="lg" coin circle />
            <ServiceBadge slug="well-baby" size="lg" coin circle />
            <ServiceBadge slug="pharmacy" size="lg" coin circle />
          </div>
        </div>
      </Section>

      {/* 12 Two centres demo */}
      <Section num="12" label="TWO CENTRES · DOCTOR BADGES">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex items-center gap-5 rounded-[20px] border border-line bg-card p-7 shadow-[var(--shadow-card)]">
            <ServiceBadge slug="doctor-male" size="md" />
            <div>
              <h3 className="t-h3 text-plum">Niramay Diabetes and Heart Care Centre</h3>
              <p className="mt-1 text-[14.5px] text-ink-600">Dr. Ajay V. Kaduskar · diabetes, obesity, thyroid and heart care.</p>
            </div>
          </div>
          <div className="flex items-center gap-5 rounded-[20px] border border-line bg-card p-7 shadow-[var(--shadow-card)]">
            <ServiceBadge slug="doctor-female" size="md" />
            <div>
              <h3 className="t-h3 text-plum">Blooming Buds Child and Adolescent Care Centre</h3>
              <p className="mt-1 text-[14.5px] text-ink-600">Dr. Prajakta A. Kaduskar · child health, teen counselling, vaccination.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* 13 Icon set */}
      <Section num="13" label="ICON SET · UI LINE ICONS">
        <div className="rounded-[20px] border border-line bg-card p-8 shadow-[var(--shadow-card)]">
          <p className="mb-6 text-[13px] font-semibold uppercase tracking-wide text-ink-600">24px (default) · hover shifts to plum-500 at 1.08x</p>
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-10">
            {Object.entries(iconSet).map(([name, Icon]) => (
              <div key={name} className="flex flex-col items-center gap-2 rounded-xl p-3 text-plum">
                <Icon size={24} className="icon-line" />
                <span className="text-center text-[10.5px] leading-tight text-ink-600">{name}</span>
              </div>
            ))}
          </div>
          <p className="mb-6 mt-10 text-[13px] font-semibold uppercase tracking-wide text-ink-600">48px</p>
          <div className="flex flex-wrap gap-6 text-plum">
            {Object.entries(iconSet).map(([name, Icon]) => (
              <Icon key={name} size={48} className="icon-line" aria-label={name} />
            ))}
          </div>
        </div>
      </Section>

      {/* 14 Mobile action bar — phone frame */}
      <Section num="14" label="MOBILE ACTION BAR">
        <div className="flex justify-center">
          <div className="relative h-[560px] w-[300px] overflow-hidden rounded-[36px] border-4 border-ink/80 bg-plum-50 shadow-[var(--shadow-hover)]">
            <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
              <Eyebrow>PHONE PREVIEW</Eyebrow>
              <p className="t-small">The bar is fixed to the bottom of the viewport under 1024px, above the safe area inset.</p>
            </div>
            <MobileActionBar fixed={false} whatsappText="Hello, I would like to book an appointment at Niramay Clinics." className="absolute inset-x-0 bottom-0" />
          </div>
        </div>
        <p className="t-small mt-4 text-center">The real fixed bar is also live on this page at widths under 1024px.</p>
      </Section>

      {/* Real fixed mobile action bar on this page */}
      <MobileActionBar />
    </main>
  );
}

