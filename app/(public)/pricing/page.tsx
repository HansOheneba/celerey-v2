"use client";

import EntryPointPricing from "@/components/homepage/pricing";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

export default function PricingPage() {
  return (
    <main className="bg-[#fbfaf8]">
      {/* Preface */}
      <section className="px-4 pt-14 sm:pt-20">
        <div className="mx-auto max-w-5xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="text-[11px] tracking-[0.22em] text-[#b07d3d]"
          >
            CELEREY MEMBERSHIP
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.05 }}
            className="mx-auto mt-5 max-w-3xl font-serif text-3xl leading-[1.25] text-neutral-900 sm:text-4xl sm:leading-[1.25] font-thin"
          >
            At Celerey, we believe wealth is not just about money, it is about
            clarity, control, and confidence at every stage of your journey.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0.9 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.12 }}
            className="mx-auto mt-7 h-px w-24 bg-neutral-900/10 origin-center"
          />

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.16 }}
            className="mx-auto mt-10 overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_18px_55px_rgba(0,0,0,0.08)]"
          >
            <motion.div
              initial={{ scale: 1.02 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.0, ease: "easeOut", delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
                <Image
                  src="/pricingHero.jpg"
                  alt="Celerey private advisory setting"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing component (already animated inside) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mt-6"
      >
        <EntryPointPricing />
      </motion.div>

      {/* Bespoke Services Cross-Link */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="mx-auto mt-10 max-w-3xl px-4"
      >
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="rounded-[24px] border border-black/10 bg-white px-8 py-8 shadow-[0_18px_55px_rgba(0,0,0,0.06)] text-left"
        >
          <p className="text-[11px] tracking-[0.22em] text-[#b07d3d]">
            BESPOKE ENGAGEMENTS
          </p>

          <h3 className="mt-4 font-serif text-2xl text-neutral-900">
            Prefer something more tailored?
          </h3>

          <p className="mt-4 text-sm leading-7 text-neutral-600">
            While our membership provides structured, ongoing guidance, some
            clients prefer focused, custom engagements built around a specific
            need. These private services are delivered with the same global
            standards, but without long-term commitment.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href="/services"
              className="inline-flex items-center justify-center rounded-full bg-[#1a1856] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1a1856]/90 transition"
            >
              Explore concierge services
            </a>

            <p className="text-xs text-neutral-500">
              Discrete. Fixed-fee. Clearly scoped.
            </p>
          </div>
        </motion.div>
      </motion.div>

      <div className="h-12 sm:h-16" />
    </main>
  );
}
