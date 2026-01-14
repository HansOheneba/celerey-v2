"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// import Services from "./components/services";

const LOCAL_PLANS: Plan[] = [
  {
    id: 1,
    name: "Foundation",
    price: 300,
    billing_cycle: "yearly",
    tagline: "Structured annual guidance",
    description:
      "Designed for individuals seeking clarity and direction with light-touch advisory support.",
    features: [
      "1 advisory session per year",
      "Full access to Celerey masterclasses",
      "Member briefings and insights",
      "Community access",
    ],
    button_text: "Get Started",
    popular: false,
    payment_link: "#",
    created_at: "",
    updated_at: "",
  },
  {
    id: 2,
    name: "Advisory",
    price: 1500,
    billing_cycle: "yearly",
    tagline: "Ongoing strategic support",
    description:
      "For individuals seeking deeper involvement, accountability, and recurring advisory touchpoints.",
    features: [
      "Up to 3 advisory sessions per year",
      "Priority access to advisors",
      "Advanced masterclasses & sessions",
      "All Foundation benefits included",
    ],
    button_text: "Join Advisory",
    popular: true,
    payment_link: "#",
    created_at: "",
    updated_at: "",
  },
  {
    id: 3,
    name: "Concierge",
    price: 300,
    billing_cycle: "starting_at",
    tagline: "Bespoke, pay-per-session access",
    description:
      "A fully customized advisory engagement. Select the services you need and receive pricing based on scope and objectives.",
    features: [
      "Pay per session",
      "Custom advisory scope",
      "Specialized or one-off consultations",
      "No ongoing commitment required",
    ],
    button_text: "Request Concierge Access",
    popular: false,
    payment_link: "/subscribe/concierge",
    created_at: "",
    updated_at: "",
  },
];


interface Plan {
  id: number;
  name: string;
  price: number;
  billing_cycle: string;
  description: string;
  tagline: string; // Added tagline field
  features: string[];
  button_text: string;
  popular: boolean;
  payment_link: string;
  created_at: string;
  updated_at: string;
}

export default function PricingPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;

  // useEffect(() => {
  //   const fetchPlans = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch(`${apiBase}/plans/`);

  //       if (!response.ok) {
  //         throw new Error(`Failed to fetch plans: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       setPlans(data);
  //     } catch (err) {
  //       setError(err instanceof Error ? err.message : "Failed to fetch plans");
  //       console.error("Error fetching plans:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPlans();
  // }, [apiBase]);


useEffect(() => {
  setPlans(LOCAL_PLANS);
  setLoading(false);
}, []);


const formatPrice = (plan: Plan) => {
  if (plan.billing_cycle === "starting_at") {
    return (
      <div>
        <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">
          Starting at
        </p>
        <span className="text-3xl font-bold">
          ${plan.price}{" "}
          <span className="text-base font-normal text-gray-500">
            per session
          </span>
        </span>
      </div>
    );
  }

  // DEFAULT RETURN (required)
  return (
    <span>
      ${plan.price}{" "}
      <span className="text-base font-normal text-gray-500">/ Year</span>
    </span>
  );
};


if (loading) {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-slate-50">
      <div className="w-10 h-10 border-4 border-[#1B1856]/20 border-t-[#1B1856] rounded-full animate-spin" />
    </section>
  );
}


  if (error) {
    return (
      <section className="relative min-h-screen py-42 px-6 bg-gradient-to-b from-white to-slate-50 text-[#1B1856]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-red-600">Error: {error}</div>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4 bg-[#1B1856] hover:bg-[#1B1856]/90 text-white rounded-full px-6 py-2"
          >
            Retry
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen py-42 px-6 bg-gradient-to-b from-white to-slate-50 text-[#1B1856]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Choose the <span className="text-[#D4AF37]">Celerey</span> Plan That
            Fits You
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            From foundational clarity to advanced wealth management,
            Celerey&apos;s plans are built to match your goals. Whether
            you&apos;re just starting or expanding your financial strategy,
            we&apos;ve got the right level of support for you.
          </p>
        </motion.div>

        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto mb-16"
        >
          <div className="rounded-3xl border border-gray-200 bg-white p-10 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              
              <div className="flex-1">
                <h3 className="text-3xl font-semibold mb-2">
                  Essentials (Pay-As-You-Go)
                </h3>
                <p className="text-[#D4AF37] font-medium mb-3">
                  One-time financial clarity
                </p>

                <p className="text-4xl font-bold mb-4">$99.99</p>
                <p className="text-gray-600 mb-4">
                  Ideal for individuals seeking one-off support.
                </p>

                <ul className="space-y-2 text-gray-700">
                  <li className="flex gap-2">
                    <Check className="w-4 h-4 text-[#D4AF37] mt-1" />
                    <span>1 dedicated 45-minute advisory call</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="w-4 h-4 text-[#D4AF37] mt-1" />
                    <span>Post-session summary</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="w-4 h-4 text-[#D4AF37] mt-1" />
                    <span>Personalized action roadmap</span>
                  </li>
                </ul>
              </div>

          
              <div className="md:w-auto">
                <Link href="https://your-payment-link.com" target="_blank">
                  <Button className="w-full md:w-auto px-8 py-3 text-sm font-semibold bg-[#1B1856] hover:bg-[#1B1856]/90 text-white">
                    Book Session
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div> */}

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className={`relative rounded-3xl shadow-sm border ${
                plan.popular
                  ? "border-[#D4AF37] shadow-md bg-gradient-to-b from-white via-amber-50/20 to-white"
                  : "border-gray-200 bg-white"
              } p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-md`}
            >
              {plan.popular && (
                <div className="absolute -top-4 right-6">
                  <span className="inline-block rounded-full bg-[#D4AF37] px-4 py-1 text-xs font-semibold text-white shadow-sm">
                    Recommended
                  </span>
                </div>
              )}

              <div>
                <h3 className="text-2xl font-semibold mb-1">{plan.name}</h3>
                <p className="text-[#D4AF37] font-medium mb-3">
                  {plan.tagline}{" "}
                  {/* Updated to use tagline instead of description */}
                </p>
                <div className="mb-6 text-3xl font-bold">
                  {formatPrice(plan)}
                </div>
                {/* <p className="text-3xl font-bold mb-6">{formatPrice(plan)}</p> */}
                <p className="text-gray-600 mb-6">{plan.description}</p>{" "}
                {/* Added description paragraph */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-gray-700"
                    >
                      <Check className="w-4 h-4 text-[#D4AF37] mt-1" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={plan.payment_link}
                target={
                  plan.billing_cycle === "starting_at" ? "_self" : "_blank"
                }
                rel="noopener noreferrer"
              >
                <Button
                  className={`w-full px-6 py-2 text-sm font-semibold transition-all ${
                    plan.popular
                      ? "bg-[#1B1856] hover:bg-[#1B1856]/90 text-white"
                      : "border border-[#1B1856] text-white hover:bg-[#1B1856] hover:text-white"
                  }`}
                >
                  {plan.button_text}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* <Services /> */}

        {/* Footer Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-24 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-semibold mb-4">
            Not Sure Where to Begin?
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Start with{" "}
            <span className="font-medium text-[#D4AF37]">
              Celerey Foundation
            </span>{" "}
            to uncover your financial health, get your custom strategy, and take
            the first confident step toward your goals. You can upgrade anytime
            as your needs grow.
          </p>
          <Link href="#">
            <Button className="bg-[#1B1856] hover:bg-[#1B1856]/90 text-white rounded-full px-8 py-3 font-light">
              Get Started
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
