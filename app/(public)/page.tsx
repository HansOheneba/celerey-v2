import Hero from "@/components/homepage/hero";
import FeaturesSection from "@/components/homepage/featuresSection";
// import {Journey} from "@/components/homepage/journey";
import WealthScan from "@/components/homepage/wealthScan";
import Pricing from "@/components/homepage/pricing";
// import Advisors from "@/components/homepage/advisors";
import InsightsSection from "@/components/homepage/insights";
import Community from "@/components/homepage/community";
import ChallengeSection from "@/components/homepage/challenge";
import ApproachSection from "@/components/homepage/approach";
import AlaCarteServices from "@/components/homepage/concierge";
import TestimonialsSection from "@/components/homepage/testimonials";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />

      <ApproachSection />
        <ChallengeSection />

<TestimonialsSection />
      <WealthScan />
      <div id="challenge">
      </div>


        {/* <Pricing id="entry-pricing" /> */}

      <InsightsSection />
      <FeaturesSection />

        <AlaCarteServices />


      <Community />
      {/* <Advisors /> */}
      {/* <Partners /> */}
      {/* <Journey /> */}
    </div>
  );
}
