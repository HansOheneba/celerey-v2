"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const advisors = [
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
      "Banking executive with 25+ years of experience in investment banking, capital markets, and high-net-worth advisory.",
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
    name: "Chris Curtis",
    title: "Financial Adviser & Wealth Strategy Expert",
    experience:
      "Delivers tailored solutions in tax planning, wealth preservation, and retirement for professionals and business owners.",
    image: "/advisors/chris.jpg",
  },
  {
    name: "William Takyi",
    title: "Financial Strategist & Wealth Management Advisor",
    experience:
      "Expert in wealth management and tax-efficient portfolio optimization, helping clients achieve financial success at Celerey.",
    image: "/advisors/william.jpg",
  },
  {
    name: "Beau PK Sackey",
    title: "Global Business Strategist & Transformation Leader",
    experience:
      "18+ years of leadership experience in strategic growth, transformation, and operational excellence worldwide.",
    image: "/advisors/beau.jpg",
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
      "Corporate lawyer known for legal expertise, leadership, and advocacy for mental health in professional environments.",
    image: "/advisors/ladyann.jpg",
  },
];

export default function Advisors() {
  return (
    <section className="relative py-24 text-white overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-gray-50 to-white" />

      <div className="relative z-10 max-w-6xl mx-auto text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-semibold mb-6 text-black"
        >
          Where Human Expertise Meets{" "}
          <span className="text-blue-600">Machine Precision</span>
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

        {/* Advisors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {advisors.map((advisor, index) => (
            <motion.div
              key={advisor.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              //   whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative group bg-gradient-to-b from-gray-900/70 to-gray-950 border border-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-blue-500/20 transition-all"
            >
              {/* Advisor Image */}
              <div className="relative w-full h-72">
                <Image
                  src={advisor.image}
                  alt={advisor.name}
                  fill
                  className="object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>

              {/* Advisor Info */}
              <div className="p-6 text-left">
                <h3 className="text-xl font-semibold mb-1">{advisor.name}</h3>
                <p className="text-blue-400 text-sm mb-2">{advisor.title}</p>
                <p className="text-gray-400 text-sm mb-6">
                  {advisor.experience}
                </p>

                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:text-blue-400 hover:border-blue-400 rounded-full"
                >
                  Book Session
                </Button>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/40 via-cyan-400/30 to-blue-700/30 blur-3xl rounded-2xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
