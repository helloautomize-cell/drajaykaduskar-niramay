import { UtilityBar } from "@/components/layout/UtilityBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Analytics } from "@/components/analytics/Analytics";

/**
 * Global site shell (plan section 3.1): utility bar, sticky header, footer,
 * fixed mobile action bar, floating WhatsApp (desktop) and cookie banner.
 * The 80px bottom padding keeps the mobile bar from covering content.
 * Shared by app/(site)/layout.tsx and the root app/not-found.tsx so the
 * top-level 404 renders with the same chrome as every page.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
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
      <Analytics />
    </>
  );
}
