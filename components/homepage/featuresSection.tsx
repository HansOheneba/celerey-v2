"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const items = [
  {
    title: "Expert Advisors",
    img: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=900&q=70",
  },
  {
    title: "Smart Portfolio Tools",
    img: "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=900&q=70",
  },
  {
    title: "Secure Planning",
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=70",
  },
  {
    title: "Wealth Insights",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=70",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-[#fdfbf7]">
      {/* Main Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center text-3xl sm:text-4xl font-bold text-gray-900 mb-14"
      >
        What Makes Celerey Different
      </motion.h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
        {/* Left — 2 small cards */}
        <div className="flex flex-col space-y-10">
          {items.slice(0, 2).map((item, i) => (
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
              <h2 className="mt-3 text-lg font-medium text-gray-900">
                {item.title}
              </h2>
            </motion.div>
          ))}
        </div>

        {/* Center — Large image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className=""
        >
          <div className="overflow-hidden rounded-3xl shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1000&q=70"
              alt="Main Feature"
              width={700}
              height={800}
              className="rounded-3xl object-cover h-[500px] w-full transition-all duration-700"
            />
          </div>
          <h1 className="mt-4 text-xl font-semibold text-gray-900 text-center">
            Your Financial Hub
          </h1>
        </motion.div>

        {/* Right — 2 small cards */}
        <div className="flex flex-col space-y-10">
          {items.slice(2, 4).map((item, i) => (
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
              <h2 className="mt-3 text-lg font-medium text-gray-900">
                {item.title}
              </h2>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
