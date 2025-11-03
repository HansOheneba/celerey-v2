"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Lite",
    price: "Free",
    tagline: "Your Wealth Journey Starts Here",
    description:
      "Get started on your financial journey with essential tools to organize your finances, understand your wealth health, and take your first confident steps.",
    features: [
      "Personalized Financial Health Check",
      "Access to Private Wealth Dashboard",
      "AI-Powered Smart Insights",
      "Free Intro Session with a Celerey Advisor",
      "100% Confidential & Judgment-Free",
    ],
    cta: "Start Free",
    highlight: false,
  },
  {
    name: "Core",
    price: "$29/mo",
    tagline: "Best Value for Growing Professionals",
    description:
      "Gain structure, accountability, and personalized insights to help you plan, grow, and protect your wealth with expert guidance and powerful tools.",
    features: [
      "Quarterly sessions with a Celerey Advisor",
      "Personalized financial roadmap",
      "Cashflow & expense planning",
      "Savings & investment allocation strategy",
      "2 Masterclasses per year",
      "Market Outlook briefings",
      "Full access to Celerey Dashboard",
    ],
    cta: "Upgrade to Core",
    highlight: true,
  },
  {
    name: "Concierge",
    price: "$199/mo",
    tagline: "A Virtual Family Office Experience",
    description:
      "Exclusive access for executives and entrepreneurs who want hands-on advisory, global strategy, and full-service wealth management support.",
    features: [
      "Dedicated Celerey Wealth Advisor",
      "Monthly strategy check-ins",
      "Advanced portfolio structuring",
      "Retirement & succession planning",
      "Tax efficiency optimization",
      "Unlimited access to Masterclasses",
      "Exclusive Celerey Circles & Events",
      "Premium AI-Powered Dashboard",
    ],
    cta: "Book Consultation",
    highlight: false,
  },
];

export default function PricingPage() {
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
            At Celerey, wealth is more than money — it’s clarity, control, and
            confidence at every stage of your journey. Every plan gives you
            access to tools and insights designed to help you build your
            financial future with purpose.
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className={`rounded-3xl shadow-sm border ${
                plan.highlight
                  ? "border-[#D4AF37] shadow-md bg-gradient-to-b from-white via-amber-50/20 to-white"
                  : "border-gray-200 bg-white"
              } p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-md`}
            >
              <div>
                <h3 className="text-2xl font-semibold mb-1">{plan.name}</h3>
                <p className="text-[#D4AF37] font-medium mb-3">
                  {plan.tagline}
                </p>
                <p className="text-3xl font-bold mb-6">{plan.price}</p>
                <p className="text-gray-600 mb-6">{plan.description}</p>

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

              <Button
                className={`rounded-full px-6 py-2 text-sm font-semibold transition-all ${
                  plan.highlight
                    ? "bg-[#1B1856] hover:bg-[#1B1856]/90 text-white"
                    : "border border-[#1B1856] text-[#1B1856] hover:bg-[#1B1856] hover:text-white"
                }`}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

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
            <span className="font-medium text-[#D4AF37]">Celerey Free</span> to
            get your personalized wealth health scan, explore your dashboard,
            and discover how small steps can transform your financial future.
            You can always upgrade later — no pressure, just progress.
          </p>
         <Link href="https://celerey.app">
           <Button className="bg-[#1B1856] hover:bg-[#1B1856]/90 text-white rounded-full px-8 py-3 text-lg font-light">
             Get Started
           </Button>
         </Link>
        </motion.div>
      </div>
    </section>
  );
}
