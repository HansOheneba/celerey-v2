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
    description:
      "We start by understanding you — your goals, your priorities, and your current financial standing.",
  },
  {
    title: "Assess",
    icon: BarChart3,
    description:
      "Our tools evaluate your assets, income, and risk tolerance to uncover your true financial potential.",
  },
  {
    title: "Plan",
    icon: ClipboardList,
    description:
      "Together, we craft a personalized strategy designed to grow your wealth efficiently and sustainably.",
  },
  {
    title: "Grow",
    icon: TrendingUp,
    description:
      "With smart technology and expert insight, your plan comes to life — tracking progress every step of the way.",
  },
  {
    title: "Review",
    icon: RotateCcw,
    description:
      "We regularly revisit your strategy to ensure it adapts to life’s changes and new opportunities.",
  },
];

export default function Journey() {
  return (
    <section className=" text-white py-24 relative overflow-hidden bg-[#1B1856]">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-bold text-center mb-16"
      >
        The Celerey Journey
      </motion.h2>

      <div className="max-w-6xl mx-auto px-6">
        <div className="relative flex flex-col md:flex-row md:items-start md:justify-between gap-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                // whileHover={{ scale: 1.05, y: -5 }}
                className="flex flex-col items-center text-center relative"
              >
                {/* Icon */}
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/10 border border-white/10 shadow-md mb-4">
                  <Icon className="h-7 w-7 text-blue-400" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>

                {/* Description */}
                <p className="text-sm text-white/70 max-w-xs">
                  {step.description}
                </p>

                {/* Connector Line (Desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 right-[-50%] w-full h-[2px] bg-gradient-to-r from-blue-500/30 to-transparent"></div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Background Glow */}
      {/* <div className="absolute inset-0 bg-gradient-to- from-transparent via-blue-500/5 to-transparent pointer-events-none"></div> */}
    </section>
  );
}
