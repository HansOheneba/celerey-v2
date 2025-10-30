"use client";

import { motion } from "framer-motion";
import { BarChart3, ShieldCheck, Cpu, Users2 } from "lucide-react";

const partners = [
  {
    title: "Investment",
    description:
      "Leading investment platforms and portfolio management solutions for optimal asset allocation.",
    icon: BarChart3,
    color: "#3B82F6", // blue tone
  },
  {
    title: "Insurance",
    description:
      "Comprehensive protection strategies through top-tier insurance providers and risk management tools.",
    icon: ShieldCheck,
    color: "#06B6D4", // cyan tone
  },
  {
    title: "Technology",
    description:
      "Cutting-edge fintech solutions and AI-powered analytics for intelligent financial decision-making.",
    icon: Cpu,
    color: "#A855F7", // purple tone
  },
  {
    title: "Advisory",
    description:
      "Network of certified financial advisors and wealth management experts across global markets.",
    icon: Users2,
    color: "#FACC15", // gold tone
  },
];

export default function BuildWithBest() {
  return (
    <section className="relative w-full py-28 overflow-hidden bg-black">
      {/* Subtle radial background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_70%)] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            We Build with the Best
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Celerey collaborates with trusted execution partners across
            investment, insurance, career, and technology ecosystems.
          </p>
        </motion.div>

        {/* Partner Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="relative group rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10 p-6 text-center shadow-[0_0_40px_-10px_rgba(59,130,246,0.2)] hover:shadow-[0_0_60px_-10px_rgba(59,130,246,0.4)] transition-all duration-300"
              >
                <div className="flex flex-col items-center space-y-3">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="p-3 rounded-full bg-white/10"
                  >
                    <Icon size={32} color={item.color} strokeWidth={2} />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Gradient glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500 pointer-events-none"></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
