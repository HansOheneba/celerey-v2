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

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />

      <ApproachSection />
        <ChallengeSection />

      {/* Philosophy / Challenge section — target: #challenge */}
      <WealthScan />
      <div id="challenge">
      </div>

      {/* Pricing / Entry point — target: #entry-pricing */}
      {/* <div id="entry-pricing"> */}
        {/* <Pricing id="entry-pricing" /> */}
      {/* </div> */}

      {/* A la carte services — target: #ala-carte */}
      <InsightsSection />
      <FeaturesSection />
      {/* <div id="ala-carte">
        <AlaCarteServices />
      </div> */}

      <Community />
      {/* <Advisors /> */}
      {/* <Partners /> */}
      {/* <Journey /> */}
    </div>
  );
}
