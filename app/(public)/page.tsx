import Hero from "@/components/homepage/hero";
import FeaturesSection from "@/components/homepage/featuresSection";
import Journey from "@/components/homepage/journey";
import Partners from "@/components/homepage/partners";
import WealthScan from "@/components/homepage/wealthScan";
import Pricing from "@/components/homepage/pricing";
// import Advisors from "@/components/homepage/advisors";
import InsightsSection from "@/components/homepage/insights";
import Community from "@/components/homepage/community";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturesSection />
      <Journey />
      <Partners />
      <WealthScan />
      <Pricing />
      {/* <Advisors /> */}
      <InsightsSection />
      <Community />
    </div>
  );
}
