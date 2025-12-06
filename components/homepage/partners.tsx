"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const partners = [
  {
    title: "Investments",
    img: "https://images.unsplash.com/photo-1633158829875-e5316a358c6f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "Partners helping you grow your wealth wisely.",
  },
  {
    title: "Insurance",
    img: "https://images.unsplash.com/photo-1509043759401-136742328bb3?auto=format&fit=crop&w=1200&q=80",
    desc: "Protection solutions provided by trusted insurers.",
  },
  {
    title: "Technology",
    img: "/partners/tech.jpg",
    desc: "Innovative tech partners enabling smarter finance.",
  },
  {
    title: "Advisory",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    desc: "Expert advisors supporting your financial decisions.",
  },
];

export default function BuildWithBest() {
  return (
    <section className="bg-[#0B0B14] py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white">
            Our Trusted Partners
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mt-3">
            We work with top institutions that specialize in these areas to
            support your financial journey.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
          {/* Large Center Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative lg:row-span-2 rounded-3xl overflow-hidden group"
          >
            <div className="relative h-full w-full min-h-[400px]">
              <Image
                src="/partners/global.jpg"
                alt="Global Partners Network"
                fill
                className="object-cover transition duration-700"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

            <div className="absolute bottom-6 left-6">
              <h3 className="text-2xl font-semibold text-white mb-1">
                Global Network
              </h3>
              <p className="text-gray-300 text-sm">
                Connecting with world-class institutions across finance,
                insurance, and technology.
              </p>
            </div>
          </motion.div>

          {/* Small Cards */}
          {partners.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden group"
            >
              <div className="relative h-56 w-full">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-700"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute bottom-4 left-4">
                <h3 className="text-white font-semibold text-lg">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mt-14 flex justify-center">
        <Link href={"/partners"}>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="px-8 py-3 rounded-full bg-blue-950 text-white text-sm font-medium hover:bg-blue-950/40 transition-all shadow-sm cursor-pointer"
          >
            Explore All Partners
          </motion.button>
        </Link>
      </div>
    </section>
  );
}
