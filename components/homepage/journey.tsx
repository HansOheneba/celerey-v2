"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  ClipboardList,
  Search,
  BarChart3,
  RotateCcw,
} from "lucide-react";

const steps = [
  {
    title: "Discover",
    icon: Search,
    description: "Understand your goals and financial priorities.",
  },
  {
    title: "Assess",
    icon: BarChart3,
    description: "We analyze your assets, income, and risk profile.",
  },
  {
    title: "Plan",
    icon: ClipboardList,
    description: "A personalized strategy designed for sustainable growth.",
  },
  {
    title: "Grow",
    icon: TrendingUp,
    description: "Your wealth plan comes alive with smart insights.",
  },
  {
    title: "Review",
    icon: RotateCcw,
    description: "We refine your strategy as your life evolves.",
  },
];

export default function Journey() {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0 -z-10">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/journey.mp4" type="video/mp4" />
        </video>

        {/* If you prefer an image: */}
        {/* <img src="/images/finance-bg.jpg" className="w-full h-full object-cover" /> */}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      </div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-white text-4xl sm:text-5xl font-bold text-center mb-20"
      >
        The Celerey Journey
      </motion.h2>

      {/* Steps */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-xl text-center"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20 border border-white/20 mx-auto mb-4">
                <Icon className="h-7 w-7 text-blue-300" />
              </div>

              <h3 className="text-white text-lg font-semibold mb-2">
                {step.title}
              </h3>

              <p className="text-white/75 text-sm">{step.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
