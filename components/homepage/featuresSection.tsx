"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const pillars = [
  {
    title: "Advisor-Led Judgment",
    desc: "World-class financial advisors guide critical decisions, supported by technology that brings clarity and context.",
    img: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=900&q=70",
  },
  {
    title: "Structured Wealth Intelligence",
    desc: "See your entire financial life in a single, coherent structure designed to support long-term thinking, not just short-term tracking.",
    img: "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=900&q=70",
  },
  {
    title: "Deliberate Planning & Control",
    desc: "Make complex financial choices with confidence through disciplined frameworks that prioritise stability, transparency,advi and intent.",
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=70",
  },
  {
    title: "Decision-Ready Insight",
    desc: "Transform financial data into clear insight that supports better decisions, when it matters most.",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=70",
  },
];


export default function FeaturesSection() {
  return (
    <section className="py-24 bg-[#fdfbf7]">
      {/* Main Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Your Financial Growth Partner
        </h2>
        <p className="mt-4 text-gray-700 text-lg">
          Smart tools, expert guidance, and actionable insights to help you
          grow, protect, and track your wealth, all in one place.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
        {/* Left — 2 pillars */}
        <div className="flex flex-col space-y-10">
          {pillars.slice(0, 2).map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="cursor-pointer"
            >
              <div className="overflow-hidden rounded-xl shadow-sm">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="rounded-xl object-cover transition-all duration-500"
                />
              </div>
              <h3 className="mt-3 text-lg font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Center — Main Image + Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >
          <div className="overflow-hidden rounded-3xl shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1000&q=70"
              alt="Celerey Hub"
              width={700}
              height={800}
              className="rounded-3xl object-cover h-[500px] w-full transition-all duration-700"
            />
          </div>
          <h3 className="mt-6 text-xl font-bold text-gray-900">
            Grow, Protect, and Track Your Wealth
          </h3>
          <p className="mt-2 text-gray-600 max-w-xs">
            Celerey combines expert advisors, intuitive tools, and actionable
            insights, everything you need to take control of your financial
            journey.
          </p>
        </motion.div>

        {/* Right — 2 pillars */}
        <div className="flex flex-col space-y-10">
          {pillars.slice(2, 4).map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="cursor-pointer"
            >
              <div className="overflow-hidden rounded-xl shadow-sm">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="rounded-xl object-cover transition-all duration-500"
                />
              </div>
              <h3 className="mt-3 text-lg font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
