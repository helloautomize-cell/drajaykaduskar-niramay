import type { Metadata } from "next";
import { Figtree, Instrument_Serif, Noto_Sans_Devanagari } from "next/font/google";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../styles/globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "fallback",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "optional",
  preload: false,
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-devanagari",
  display: "optional",
  preload: false,
});

const indexable = process.env.SITE_INDEXABLE === "true";
const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.niramayclinics.com"),
  ...(indexable ? {} : { robots: { index: false, follow: false } }),
  ...(gscVerification ? { verification: { google: gscVerification } } : {}),
  title: {
    default: "Niramay Clinics, Dhantoli, Nagpur",
    template: "%s | Niramay Clinics, Nagpur",
  },
  description:
    "Specialist outpatient clinic in Dhantoli, Nagpur. Dr. Ajay Kaduskar for diabetes, obesity, thyroid, blood pressure and heart care. Dr. Prajakta Kaduskar for child and adolescent health, counselling and vaccination.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${instrumentSerif.variable} ${notoDevanagari.variable}`}
    >
      <body>
        <SmoothScroll />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
