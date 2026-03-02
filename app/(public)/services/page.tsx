"use client";

import AlaCarteServices from "@/components/homepage/concierge";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Services() {
  return (
    <main className="bg-[#fbfaf8]">
      {/* Preface Section */}
      <section className="px-6 pt-20 pb-16 sm:pt-24">
        <div className="mx-auto max-w-5xl flex flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-[11px] tracking-[0.26em] text-[#b07d3d]"
          >
            PRIVATE ADVISORY
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
            className="mt-10 font-serif font-thin text-4xl leading-[1.3] text-neutral-900 sm:text-5xl sm:leading-[1.3]"
          >
            True wealth is not built in moments of urgency,
            <br className="hidden sm:block" />
            but in moments of clarity.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0.85 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 h-px w-24 bg-neutral-900/10 origin-center"
          />
        </div>
      </section>

      {/* Image Section */}
      <section className="px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="mx-auto max-w-5xl overflow-hidden rounded-[28px] border border-black/10"
        >
          <motion.div
            initial={{ scale: 1.02 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.25 }}
            className="relative"
          >
            <div className="relative aspect-[21/9] w-full">
              <Image
                src="/concierge.png"
                alt="Private financial advisory setting"
                fill
                priority
                className="object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Services List (already animated internally) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <AlaCarteServices />
      </motion.div>

      {/* Membership Cross-Link */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="max-w-6xl mx-auto px-6"
      >
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.25 }}
          className="mt-8 rounded-[22px] border border-black/10 bg-white/70 px-6 py-5 shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
        >
          <p className="text-sm leading-7 text-neutral-700">
            If you are looking for longer-term structure, accountability, and
            ongoing guidance, Celerey Membership may be the better fit.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href="/pricing"
              className="inline-flex items-center justify-center rounded-full bg-transparent px-5 py-2 text-sm font-semibold text-neutral-900 ring-1 ring-black/20 hover:bg-black/[0.04]"
            >
              View membership
            </a>

            <p className="text-xs text-neutral-500">
              Ongoing support, reviews, and year-round visibility.
            </p>
          </div>
        </motion.div>
      </motion.div>

      <div className="h-16" />
    </main>
  );
}
