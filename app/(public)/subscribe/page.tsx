"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Essentials",
    price: "$99 (One-Time Access)",
    tagline: "Your Financial Clarity Starts Here",
    description:
      "Get a complete snapshot of your financial health and a personalized roadmap to build stronger money habits with expert guidance.",
    features: [
      "Personalized Financial Health Scan™",
      "Access to Celerey Dashboard",
      "45-Minute One-on-One Strategy Session",
      "Custom Financial Strategy Document",
      "30-Day Post-Session Support",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Core",
    price: "$299.99 / Year",
    tagline: "Smart Wealth Growth for Professionals",
    description:
      "Stay on track with expert-led reviews, personalized insights, and accountability check-ins designed to accelerate your financial progress.",
    features: [
      "Two Advisory Sessions per Year",
      "Quarterly Progress Reports",
      "Monthly Accountability Touchpoints",
      "Annual Portfolio & Health Review",
      "Member Webinars & Global Masterclasses",
      "Advisor-on-Demand Credits",
      "Email & WhatsApp Support",
      "Exclusive Partner Perks",
    ],
    cta: "Upgrade Plan",
    highlight: true,
  },
  {
    name: "Concierge",
    price: "$1,499 / Year",
    tagline: "A Private Family Office Experience",
    description:
      "Access full-service wealth management with a dedicated team, personalized strategy, and connections to global financial specialists.",
    features: [
      "Six Advisory Sessions Annually",
      "Monthly Check-Ins with Lead Advisor",
      "Quarterly Strategic Planning Meetings",
      "Dedicated Client Success Liaison",
      "Access to Global Advisory Network",
      "Comprehensive Wealth Blueprint",
      "Private Advisory Desk Access",
      "Investment & Legacy Planning Support",
      "Custom Dashboard Integration",
      "Quarterly Market & Investment Briefings",
    ],
    cta: "Join Concierge",
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
            From foundational clarity to advanced wealth management, Celerey’s
            plans are built to match your goals. Whether you’re just starting or
            expanding your financial strategy, we’ve got the right level of
            support for you.
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
            <span className="font-medium text-[#D4AF37]">
              Celerey Essentials
            </span>{" "}
            to uncover your financial health, get your custom strategy, and take
            the first confident step toward your goals. You can upgrade anytime
            as your needs grow.
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
