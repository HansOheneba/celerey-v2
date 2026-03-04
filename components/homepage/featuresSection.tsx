"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BadgeCheck, ShieldCheck, ScrollText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_78%,rgba(176,125,61,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.00),rgba(0,0,0,0.16))]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Head + CTA row */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-[11px] tracking-[0.26em] text-[#b07d3d]/90"
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
          </div>

          {/* Pricing CTA (this is what typically “feels missing”) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_18px_55px_rgba(0,0,0,0.30)]"
          >
            <p className="text-sm text-white/80">
              Want to understand what is included and how to get bespoke services as per your needs?
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Link href="/pricing">
                <Button className="h-11 rounded-full bg-white px-6 text-[#050816] hover:bg-white/90">
                  View pricing <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Link
                href="/services"
                className="text-sm font-medium text-white/80 hover:text-white underline-offset-4 hover:underline"
              >
                Explore concierge services
              </Link>
            </div>

         
          </motion.div>
        </div>

        <div className="mt-10 h-px w-full bg-white/10" />

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
                    <Icon className="h-5 w-5 text-[#b07d3d]" />
                  </div>
                </div>

                <div className="mt-5 h-px w-10 bg-[#b07d3d]/40" />

                <p className="mt-5 text-sm leading-relaxed text-white/62">
                  {c.desc}
                </p>
              </motion.article>
            );
          })}
        </div>

        {/* Bottom note */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-3xl text-sm leading-relaxed text-white/55">
            Advisor conversations scheduled based on scope and fit. 
          </p>

          <Link
            href="/pricing"
            className="text-sm font-medium text-white/80 hover:text-white underline-offset-4 hover:underline"
          >
            See pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
