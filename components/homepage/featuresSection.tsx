"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { BadgeCheck, ShieldCheck, ScrollText } from "lucide-react";

type FeatureCard = {
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
};

const cards: FeatureCard[] = [
  {
    title: "Global advisory council",
    desc: "We are building with advisors who have operated inside regulated institutions and complex markets, bringing disciplined standards to everyday decisions.",
    icon: BadgeCheck,
  },
  {
    title: "Structured guidance, not hot takes",
    desc: "We are distilling frameworks that normally sit behind private banking into clear steps you can act on, at your pace.",
    icon: ScrollText,
  },
  {
    title: "Access is curated",
    desc: "Direct advisor time is limited and matched based on fit. We are using a triage process so conversations stay high-signal and worth the cost.",
    icon: ShieldCheck,
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative overflow-hidden bg-[#1a1856] py-20 sm:py-28">
      {/* restrained wash, same family as your footer */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_12%,rgba(255,255,255,0.07),transparent_56%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_34%,rgba(59,130,246,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.00),rgba(0,0,0,0.16))]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Head */}
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[11px] tracking-[0.26em] text-white/55"
          >
            ADVISORY, MADE ACCESSIBLE
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mt-6 font-serif text-4xl leading-[1.06] text-white sm:text-5xl"
          >
            Global standards,
            <span className="block text-white/70">
              delivered with structure.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.12, duration: 0.6 }}
            className="mt-6 text-base leading-relaxed text-white/68 sm:text-lg"
          >
            Celerey is opening the door to disciplined financial guidance that
            is usually reserved for a small circle. We are combining a calmer
            dashboard with a globally certified advisory network and a process
            that protects quality.
          </motion.p>

          <div className="mt-8 h-px w-24 bg-white/12" />
        </div>

        {/* Minimal cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((c, i) => {
            const Icon = c.icon;

            return (
              <motion.article
                key={c.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.55,
                  ease: "easeOut",
                  delay: i * 0.06,
                }}
                className="rounded-2xl bg-white/[0.03] p-7 ring-1 ring-white/10 shadow-[0_18px_55px_rgba(0,0,0,0.32)]"
              >
                <div className="flex items-start justify-between gap-6">
                  <h3 className="font-serif text-xl leading-snug text-white">
                    {c.title}
                  </h3>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] ring-1 ring-white/10">
                    <Icon className="h-5 w-5 text-white/75" />
                  </div>
                </div>

                <div className="mt-5 h-px w-10 bg-white/12" />

                <p className="mt-5 text-sm leading-relaxed text-white/62">
                  {c.desc}
                </p>
              </motion.article>
            );
          })}
        </div>

        {/* Bottom note (sets expectation about advisor access) */}
        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-white/55">
          Advisor conversations are being scheduled based on scope and fit. We
          are keeping time with senior advisors limited so standards stay high.
        </p>
      </div>
    </section>
  );
}
