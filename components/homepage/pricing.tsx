"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
// import { CheckCircle } from "lucide-react";

const plans = [
  {
    name: "Lite",
    price: "Free",
    description:
      "Essential wealth tracking and basic insights to get you started on your financial journey.",
    cta: "Start Free",
    highlight: false,
  },
  {
    name: "Core",
    price: "$29/mo",
    description:
      "Advanced analytics, personalized recommendations, and quarterly advisor check-ins.",
    cta: "Upgrade",
    highlight: true,
  },
  {
    name: "Concierge",
    price: "$199/mo",
    description:
      "Full-service wealth management with dedicated advisor and premium execution partners.",
    cta: "Book Consultation",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section className="relative py-24 text-white overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0   pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto text-center px-6">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-semibold mb-6"
        >
          Choose Your <span className="text-blue-400">Celerey</span> Experience
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-gray-400 max-w-2xl mx-auto mb-12"
        >
          Tailored experiences designed to match your wealth journey — whether
          you’re starting small or optimizing your global portfolio.
        </motion.p>

        {/* Plans */}
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
                  ? "bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600"
                  : "bg-gradient-to-r from-gray-700/50 via-gray-800 to-gray-900"
              }`}
            >
              <div className="relative bg-black rounded-2xl p-8 h-full flex flex-col items-center justify-between text-center">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                  <p className="text-blue-400 text-lg font-medium mb-4">
                    {plan.price}
                  </p>
                  <p className="text-gray-400 mb-8">{plan.description}</p>
                </div>

                <Button
                  variant={plan.highlight ? "default" : "outline"}
                  className={`rounded-full px-6 py-2 transition-all ${
                    plan.highlight
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : "border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400"
                  }`}
                >
                  {plan.cta}
                </Button>

                {/* Subtle glow effect */}
                {plan.highlight && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="absolute inset-0 rounded-2xl bg-blue-500/10 blur-3xl -z-10"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
