"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Expert Advisors",
    description:
      "Certified financial professionals with decades of experience, ready to guide your wealth journey with personalized strategies.",
  },
  {
    title: "Powerful Technology",
    description:
      "AI-driven insights and analytics that process market data in real-time to optimize your financial decisions.",
  },
  {
    title: "Personal Ecosystem",
    description:
      "A comprehensive platform that connects all aspects of your financial life in one intelligent, secure environment.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 text-center bg-white text-gray-900">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-bold mb-12 text-gray-900"
      >
        What Makes Celerey Different
      </motion.h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.15,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
            className="rounded-2xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white p-8 backdrop-blur-md shadow-sm hover:shadow-md transition-all"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {feature.title}
            </h3>
            <p className="text-sm leading-relaxed text-gray-600">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
