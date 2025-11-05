"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-[#1B1856] py-42 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Left Side — Image / Visual */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative h-[450px] w-full rounded-2xl overflow-hidden shadow-md"
        >
          <Image
            src="/contact/wealth.jpg"
            alt="Celerey Support and Advisors"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#1B1856]/40 flex items-center justify-center text-center text-white p-8">
            <div>
              <h2 className="text-3xl font-semibold mb-2">
                We’re Here for You
              </h2>
              <p className="text-gray-200 max-w-sm mx-auto text-sm">
                Whether you’re just starting your wealth journey or looking to
                take it global, the Celerey team is ready to help you move
                forward with clarity and confidence.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Side — Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 rounded-2xl shadow-md border border-gray-100"
        >
          <h1 className="text-3xl font-semibold mb-4">
            Contact <span className="text-[#D4AF37]">Celerey</span>
          </h1>
          <p className="text-gray-600 mb-8">
            Let’s start a conversation. Fill out the form below and a member of
            our advisory or client experience team will be in touch within one
            business day.
          </p>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#1B1856] mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B1856]/40"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1B1856] mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B1856]/40"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1B1856] mb-1">
                Subject
              </label>
              <input
                type="text"
                placeholder="e.g. Wealth Planning Inquiry"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B1856]/40"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1B1856] mb-1">
                Message
              </label>
              <textarea
                placeholder="Tell us a bit about your goals or question..."
                rows={5}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B1856]/40"
              ></textarea>
            </div>

            <Button className="bg-[#1B1856] hover:bg-[#1B1856]/90 text-white rounded-full px-6 py-3 text-sm font-semibold">
              Send Message
            </Button>
          </form>
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto mt-28 text-center"
      >
        <h2 className="text-3xl font-semibold mb-4">
          Let’s Build Your Financial Future — Together
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Celerey isn’t just a platform — it’s a partnership. Reach out today to
          connect with our wealth advisors and start building a plan that’s as
          unique as your goals.
        </p>
        {/* <Button className="bg-[#D4AF37] hover:bg-[#C29E2C] text-[#1B1856] rounded-full px-8 py-3 font-light text-lg">
          Schedule a Discovery Call
        </Button> */}

        <div className="mt-6 flex justify-center">
          <Link
            href="https://wa.me/12272296921"
            target="_blank"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-full px-6 py-3 font-medium transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-5 h-5"
            >
              <path d="M20.52 3.48A11.89 11.89 0 0012.07 0 11.93 11.93 0 000 11.93a11.8 11.8 0 001.57 5.92L0 24l6.28-1.63a11.9 11.9 0 005.79 1.48h.01c6.61 0 11.93-5.32 11.93-11.93 0-3.18-1.24-6.16-3.49-8.42zm-8.45 18.09a9.9 9.9 0 01-5.06-1.39l-.36-.21-3.73.97.99-3.64-.24-.37a9.93 9.93 0 01-1.52-5.29 10.01 10.01 0 0110.02-10.02c2.68 0 5.2 1.05 7.1 2.95a10.03 10.03 0 012.93 7.1 10.02 10.02 0 01-10.13 10.9zm5.54-7.48c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.48-.88-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.52-.07-.15-.66-1.6-.9-2.2-.24-.57-.48-.5-.66-.5h-.56c-.2 0-.52.07-.8.38s-1.05 1.02-1.05 2.48 1.08 2.87 1.23 3.07c.15.2 2.12 3.24 5.13 4.54.72.31 1.28.5 1.72.63.72.23 1.37.2 1.88.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z" />
            </svg>
            Schedule a Discovery Call on WhatsApp
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
