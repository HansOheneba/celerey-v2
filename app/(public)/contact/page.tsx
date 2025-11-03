"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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

          {/* <div className="mt-10 border-t border-gray-200 pt-6 text-sm text-gray-600">
            <p className="mb-2">
              📍 Office: <span className="text-[#1B1856]">Accra, Ghana</span>
            </p>
            <p className="mb-2">
              ✉️ Email:{" "}
              <a
                href="mailto:support@celerey.com"
                className="text-[#1B1856] font-medium hover:underline"
              >
                support@celerey.com
              </a>
            </p>
            <p>
              📞 Phone:{" "}
              <a
                href="tel:+233000000000"
                className="text-[#1B1856] font-medium hover:underline"
              >
                +233 (0) 00 000 0000
              </a>
            </p>
          </div> */}
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
        <Button className="bg-[#D4AF37] hover:bg-[#C29E2C] text-[#1B1856] rounded-full px-8 py-3 font-light text-lg">
          Schedule a Discovery Call
        </Button>
      </motion.div>
    </section>
  );
}
