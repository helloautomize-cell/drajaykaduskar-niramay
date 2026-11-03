import Script from "next/script";
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

// Noindex is enforced per-request by proxy.ts via the X-Robots-Tag header, so
// the flag can flip at deploy time without rebuilding. No robots meta here:
// a build-time baked value would go stale the moment the flag changes.
const GSC_VERIFICATION = "M6BbZSRldubQX38EfqxJ5-w1omT5dw0e1uONmqeCdjg";
// Extra verification codes can be added at deploy time via env; the
// hardcoded code above always renders so Search Console can verify.
const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.niramayclinics.com"),
  verification: {
    google:
      gscVerification && gscVerification !== GSC_VERIFICATION
        ? [GSC_VERIFICATION, gscVerification]
        : GSC_VERIFICATION,
  },
  title: {
    default: "Niramay Clinics, Dhantoli, Nagpur",
    template: "%s | Niramay Clinics, Nagpur",
  },
  description:
    "Specialist outpatient clinic in Dhantoli, Nagpur. Dr. Ajay Kaduskar for diabetes, obesity, thyroid, blood pressure and heart care. Dr. Prajakta Kaduskar for child and adolescent health, counselling and vaccination.",
  openGraph: { locale: "en_IN" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${figtree.variable} ${instrumentSerif.variable} ${notoDevanagari.variable}`}
    >
      <body>
        {/* remembered A+ text size, applied before paint to avoid a flash */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('nm-font-lg')==='1')document.documentElement.classList.add('font-lg')}catch(e){}",
          }}
        />
        <SmoothScroll />
        {children}
        <SpeedInsights />
        {/* Vercel Web Analytics: cookieless, no personal data, counts every
            visit regardless of the cookie banner. GA4 stays consent-based. */}
        <Script id="vercel-web-analytics" strategy="afterInteractive">
          {`window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments)};`}
        </Script>
        <Script src="/_vercel/insights/script.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
