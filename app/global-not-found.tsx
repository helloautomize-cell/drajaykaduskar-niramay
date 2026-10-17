import type { Metadata } from "next";
import { Figtree, Instrument_Serif, Noto_Sans_Devanagari } from "next/font/google";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { SiteShell } from "@/components/layout/SiteShell";
import { NotFoundBody } from "@/components/layout/NotFoundBody";
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

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

/**
 * Routing-level 404 for URLs that match no route at all (the catch-all is
 * fully static). Bypasses app/layout.tsx, so it supplies its own document
 * and imports globals.css — same chrome as app/(site)/not-found.tsx.
 */
export default function GlobalNotFound() {
  return (
    <html
      lang="en-IN"
      className={`${figtree.variable} ${instrumentSerif.variable} ${notoDevanagari.variable}`}
    >
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('nm-font-lg')==='1')document.documentElement.classList.add('font-lg')}catch(e){}",
          }}
        />
        <SmoothScroll />
        <SiteShell>
          <NotFoundBody />
        </SiteShell>
      </body>
    </html>
  );
}
