"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const plans = [
  {
    name: "Essentials",
    price: "$99 (One-Time Access)",
    description:
      "Personalized Financial Health Scan™, interactive dashboard access, and a 45-minute strategy session with follow-up support.",
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Core",
    price: "$299.99 / Year",
    description:
      "Two yearly advisory sessions, quarterly progress reviews, and access to member webinars, accountability calls, and partner perks.",
    cta: "Upgrade Plan",
    highlight: true,
  },
  {
    name: "Concierge",
    price: "$1,499 / Year",
    description:
      "Comprehensive wealth management with six annual sessions, strategic planning, dedicated liaison, and access to Celerey’s Global Advisory Network.",
    cta: "Join Concierge",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section className="relative py-28 text-white overflow-hidden bg-gradient-to-b from-[#0D0C22] via-[#101028] to-[#0B0A1C]">
      {/* Soft gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.08),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto text-center px-6">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-semibold mb-6"
        >
          Choose Your <span className="text-[#D4AF37]">Celerey</span> Experience
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-gray-400 max-w-2xl mx-auto mb-14 leading-relaxed"
        >
          Tailored experiences designed to match your wealth journey — whether
          you’re starting small or optimizing your global portfolio.
        </motion.p>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
              className={`relative p-[1px] rounded-2xl ${
                plan.highlight
                  ? "bg-gradient-to-r from-[#D4AF37] via-[#FDE68A] to-[#D4AF37]"
                  : "bg-gradient-to-r from-gray-700/50 via-gray-800 to-gray-900"
              }`}
            >
              <div className="relative bg-[#0C0C18] rounded-2xl p-8 h-full flex flex-col items-center justify-between text-center shadow-lg">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                  <p
                    className={`text-lg font-medium mb-4 ${
                      plan.highlight ? "text-[#D4AF37]" : "text-blue-400"
                    }`}
                  >
                    {plan.price}
                  </p>
                  <p className="text-gray-400 mb-8">{plan.description}</p>
                </div>

                <Button
                  variant={plan.highlight ? "default" : "outline"}
                  className={`rounded-full px-6 py-2 transition-all ${
                    plan.highlight
                      ? "bg-[#D4AF37] hover:bg-[#C29E2C] text-[#1B1856]"
                      : "border-gray-600 text-gray-300 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                  }`}
                >
                  {plan.cta}
                </Button>

                {/* Soft glow on highlight plan */}
                {plan.highlight && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="absolute inset-0 rounded-2xl bg-[#D4AF37]/10 blur-3xl -z-10"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Learn More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link href="/subscribe">
            <Button className="bg-[#D4AF37] hover:bg-[#C29E2C] text-[#1B1856] rounded-full px-8 py-3 text-base font-light shadow-md hover:shadow-lg transition-all">
              Compare Plans & Explore Features
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
