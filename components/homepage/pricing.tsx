"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const plans = [
  {
    name: "Foundation",
    price: "300",
    period: "year",
    description:
      "One annual advisory session plus full access to Celerey masterclasses, member briefings, insights, and community resources.",
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Advisory",
    price: "1,500",
    period: "year",
    description:
      "Up to three advisory sessions annually with deeper strategic guidance, priority access, advanced sessions, and all member benefits.",
    cta: "Join Advisory",
    highlight: true,
  },
  {
    name: "Concierge",
    price: "300+",
    period: "session",
    description:
      "A fully customized advisory experience. Select the services you need and receive bespoke pricing based on scope and objectives.",
    cta: "Explore Concierge",
    highlight: false,
    link: "/subscribe",
  },
];

export default function Pricing() {
  return (
    <section className="relative py-28 text-white overflow-hidden bg-gradient-to-b from-[#0D0C22] via-[#101028] to-[#0B0A1C]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.12),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto text-center px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-semibold mb-6"
        >
          Choose Your <span className="text-blue-600">Celerey</span> Experience
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-gray-400 max-w-2xl mx-auto mb-14 leading-relaxed"
        >
          Advisory access designed with clarity, flexibility, and discretion.
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
                  ? "bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400"
                  : "bg-gradient-to-r from-gray-700/50 via-gray-800 to-gray-900"
              }`}
            >
              <div className="relative bg-[#0C0C18] rounded-2xl p-8 h-full flex flex-col justify-between text-center shadow-lg">
                <div>
                  <h3 className="text-2xl font-semibold mb-6">{plan.name}</h3>
                  {/* Price */}
                  {plan.name === "Concierge" ? (
                    <div className="mb-6">
                      <div className="flex items-end justify-center gap-2">
                        <span className="text-sm text-gray-400">From USD</span>
                        <span className="text-5xl font-thin tracking-tight text-[#F8FFF4]">
                          600
                        </span>
                        <span className="text-sm text-gray-400">
                          / session
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-end justify-center gap-2 mb-6">
                      <span className="text-sm text-gray-400">USD</span>
                      <span className="text-5xl font-thin tracking-tight text-[#F8FFF4]">
                        {plan.price}
                      </span>
                      <span className="text-sm text-gray-400">
                        / {plan.period}
                      </span>
                    </div>
                  )}

                  <p className="text-gray-400 leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                {plan.link ? (
                  <Link href={plan.link}>
                    <Button variant="outline" className="mt-10">
                      {plan.cta}
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant={plan.highlight ? "default" : "outline"}
                    className={`mt-10 ${
                      plan.highlight
                        ? "bg-blue-600 hover:bg-blue-900 text-white"
                        : ""
                    }`}
                  >
                    {plan.cta}
                  </Button>
                )}

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

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link href="/subscribe">
            <Button>View Full Details & Customize Your Plan</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
