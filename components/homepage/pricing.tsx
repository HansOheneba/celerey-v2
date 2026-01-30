"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BeginJourneyModal } from "./beginModal";

type EntryPointPricingProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  label?: string;
  price?: string; // "100"
  currency?: string; // "USD"
  badge?: string; // "One-time"
  bullets?: string[];
  cta?: string;
  ctaHref?: string;
  footnote?: string;
  id?: string;
};

const defaultBullets = [
  "Structured 60-minute session with a certified advisor",
  "Complete review of income, assets, and liabilities",
  "Goal mapping and priority alignment",
  "High-level wealth strategy and clear next steps",
];

export default function EntryPointPricing({
  eyebrow = "BEGIN HERE",
  title = "One clear starting point",
  subtitle =
    "Every Celerey relationship begins with a single, structured advisory session. No complexity. No commitment beyond this first step.",
  label = "ADVISORY ACCESS",
  price = "100",
  currency = "USD",
  badge = "One-time",
  bullets = defaultBullets,
  cta = "Schedule Your Session",
  ctaHref = "/book",
  footnote = "Professional. Confidential. No sales pressure.",
  id = "entry-pricing",
}: EntryPointPricingProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section id={id} className="w-full bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 text-center">
          {/* Heading */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[11px] sm:text-xs tracking-[0.22em] text-neutral-600/80"
          >
            {eyebrow}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mt-6 font-serif text-4xl leading-[1.08] text-neutral-900 sm:text-5xl md:text-6xl"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: 0.12, duration: 0.6 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-700 sm:text-lg"
          >
            {subtitle}
          </motion.p>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: 0.08, duration: 0.7, ease: "easeOut" }}
            className="mx-auto mt-12 max-w-3xl"
          >
            <div className="relative overflow-hidden rounded-[28px] bg-[#1B1856] text-white shadow-[0_20px_60px_rgba(0,0,0,0.18)] ring-1 ring-white/10">
              {/* subtle glow */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.14),transparent_55%)]" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.08),transparent_55%)]" />

              {/* Top area */}
              <div className="relative flex items-start justify-between gap-6 px-8 pt-8 sm:px-10">
                <div className="text-left">
                  <p className="text-xs tracking-[0.18em] text-white/70">
                    {label}
                  </p>

                  <div className="mt-3 flex items-end gap-3">
                    <span className="font-serif text-5xl leading-none sm:text-6xl">
                      ${price}
                    </span>
                    <span className="pb-1 text-sm text-white/60">{currency}</span>
                  </div>
                </div>

                <div className="pt-1">
                  <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80 ring-1 ring-white/10">
                    {badge}
                  </span>
                </div>
              </div>

              {/* divider */}
              <div className="mt-8 h-px w-full bg-white/10" />

              {/* Bullets */}
              <div className="relative px-8 py-8 sm:px-10">
                <ul className="space-y-4 text-left">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10">
                        <Check className="h-4 w-4 text-white/85" />
                      </span>
                      <p className="text-sm leading-relaxed text-white/85 sm:text-base">
                        {b}
                      </p>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-10">
                  <Button
                    onClick={() => setModalOpen(true)}
                    className="h-12 w-full rounded-full bg-white text-sm font-semibold text-neutral-900 hover:bg-white/90"
                  >
                    {cta}
                  </Button>

                  <p className="mt-4 text-center text-xs text-white/50">
                    {footnote}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <BeginJourneyModal
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
}
