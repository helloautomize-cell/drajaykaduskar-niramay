import { UtilityBar } from "@/components/layout/UtilityBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { CookieBanner } from "@/components/layout/CookieBanner";

/**
 * Global site shell (plan section 3.1): utility bar, sticky header, footer,
 * fixed mobile action bar, floating WhatsApp (desktop) and cookie banner.
 * The 80px bottom padding keeps the mobile bar from covering content.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UtilityBar />
      <Header />
      <main id="main" className="pb-20 lg:pb-0">
        {children}
      </main>
      <Footer />
      <MobileActionBar />
      <FloatingWhatsApp />
      <CookieBanner />
    </>
  );
}
