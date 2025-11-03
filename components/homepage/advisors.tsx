"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, } from "lucide-react";
import Link from "next/link";

const advisors = [
  {
    name: "Jude Addo",
    title: "International Wealth Strategy Expert",
    experience:
      "CEO and Co-Founder of Celerey with over a decade of experience in wealth management and investment across 20+ countries.",
    image: "/advisors/jude.jpg",
  },
  {
    name: "Anna Agyekum",
    title: "International Property Consultant",
    experience:
      "Specializes in bespoke real estate solutions for private clients in the UK, Ghana, and across Africa’s emerging markets.",
    image: "/advisors/anna.jpg",
  },
  {
    name: "Christian Hamberger",
    title: "Wealth Management Strategist",
    experience:
      "25+ years of experience in investment banking, capital markets, and high-net-worth advisory.",
    image: "/advisors/christian.jpg",
  },
  {
    name: "Francis Gill",
    title: "Financial Adviser & Wealth Strategy Expert",
    experience:
      "CEO of Humboldt Financial, specializing in tax planning, wealth preservation, and retirement strategies.",
    image: "/advisors/francis.jpg",
  },
  {
    name: "Jerran Whyte",
    title: "Wealth Management Expert & Financial Strategist",
    experience:
      "Specializes in investment planning, tax strategies, and estate planning for individuals and businesses worldwide.",
    image: "/advisors/jerran.jpg",
  },
  {
    name: "Liz Jones",
    title: "Executive Coach & Leadership Advisor",
    experience:
      "Helps leaders build high-impact teams, align people with purpose, and lead with clarity across Africa and beyond.",
    image: "/advisors/liz.jpg",
  },
  {
    name: "Lady-Ann Essuman",
    title: "Corporate Lawyer & Legal Strategist",
    experience:
      "Founder and Managing Attorney of VINT & Aletheia; serves on national boards including the Office of the Registrar of Companies and the Council on Foreign Relations, Ghana.",
    image: "/advisors/ladyann.jpg",
  },
];

export default function Advisors() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-scroll every 6s when not paused
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % advisors.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [paused]);

  const next = () => setIndex((prev) => (prev + 1) % advisors.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + advisors.length) % advisors.length);

  return (
    <section
      className="relative py-24 bg-gradient-to-b from-white to-gray-50 text-black overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-6xl mx-auto text-center px-6 relative z-10">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-semibold mb-6"
        >
          Where Human Expertise Meets{" "}
          <span className="text-blue-700">Machine Precision</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-gray-600 max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          Our advisory team blends decades of market insight with data-driven
          intelligence to help you make confident, future-focused wealth
          decisions.
        </motion.p>

        {/* Carousel */}
        <div className="relative overflow-hidden flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-gray-200 rounded-2xl shadow-md w-full sm:w-[450px] overflow-hidden"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={advisors[index].image}
                  alt={advisors[index].name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 text-left">
                <h3 className="text-xl font-semibold mb-1 text-[#1B1856]">
                  {advisors[index].name}
                </h3>
                <p className="text-blue-700 text-sm mb-2">
                  {advisors[index].title}
                </p>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {advisors[index].experience}
                </p>
                <Button className="bg-[#1B1856] hover:bg-[#1B1856]/80 text-white rounded-full text-sm">
                  Book Session
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Button
              size="icon"
              variant="outline"
              className="rounded-full bg-white/80 hover:bg-blue-50 border border-gray-300 shadow-sm"
              onClick={prev}
            >
              <ArrowLeft className="h-5 w-5 text-[#1B1856]" />
            </Button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Button
              size="icon"
              variant="outline"
              className="rounded-full bg-white/80 hover:bg-blue-50 border border-gray-300 shadow-sm"
              onClick={next}
            >
              <ArrowRight className="h-5 w-5 text-[#1B1856]" />
            </Button>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {advisors.map((_, i) => (
            <div
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                i === index ? "bg-[#1B1856] scale-110" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* View All Advisors CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Link href="/advisors">
            <Button className="bg-[#1B1856] hover:bg-[#1B1856]/80 text-white rounded-full px-8 py-3 text-base font-light shadow-md hover:shadow-lg transition-all">
              Meet the Full Advisory Team
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
