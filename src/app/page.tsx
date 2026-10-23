import Header from "@/components/sections/header";
import MovingShortageTicker from "@/components/sections/moving-shortage-ticker";
import EmergencyBanner from "@/components/sections/emergency-banner";
import HeroSection from "@/components/sections/hero";
import LiveImpact from "@/components/sections/live-impact";
import DoctorQuote from "@/components/sections/doctor-quote";
import DonorJourney from "@/components/sections/donor-journey";
import CaptureMomentSection from "@/components/sections/capture-moment";
import FinalCTA from "@/components/sections/final-cta";
import SiteFooter from "@/components/sections/site-footer";
import CookieConsent from "@/components/sections/cookie-consent";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <MovingShortageTicker />
      <Header />
      <main className="flex-1">
        <EmergencyBanner />
        <HeroSection />
        <LiveImpact />
        <DoctorQuote />
        <DonorJourney />
        <CaptureMomentSection />
        <FinalCTA />
        <SiteFooter />
      </main>
      <CookieConsent />
    </div>
  );
}

