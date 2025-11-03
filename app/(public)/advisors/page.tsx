"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { advisors } from "@/lib/advisors"; // ✅ import shared advisor data

export default function AdvisorsPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-24 px-6 mt-10">
      <div className="max-w-6xl mx-auto text-center">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-semibold text-[#1B1856] mb-4"
        >
          Meet Our Global Advisory Team
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-600 max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          Celerey brings together experts from across wealth management,
          property, and leadership — providing you with the insight and strategy
          to achieve your financial goals with confidence.
        </motion.p>

        {/* Grid of Advisors */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {advisors.map((advisor, i) => (
            <motion.div
              key={advisor.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-64 w-full">
                <Image
                  src={advisor.image}
                  alt={advisor.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Info */}
              <div className="p-6 text-left">
                <h3 className="text-xl font-semibold text-[#1B1856] mb-1">
                  {advisor.name}
                </h3>
                <p className="text-blue-700 text-sm mb-2">{advisor.title}</p>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {advisor.experience}
                </p>

                <Link href={`/advisors/${advisor.slug}`}>
                  <Button className="bg-[#1B1856] hover:bg-[#1B1856]/80 text-white rounded-full text-sm px-5">
                    View Details
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
