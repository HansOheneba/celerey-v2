"use client";

import { motion } from "framer-motion";
import { BarChart3, Bell, MessageSquareText } from "lucide-react";

type FeatureCard = {
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
};

const cards: FeatureCard[] = [
  {
    title: "Personal Dashboard",
    desc: "Track your net worth, goals, and progress in one elegant view.",
    icon: BarChart3,
  },
  {
    title: "Proactive Insights",
    desc: "Receive timely nudges and opportunities based on your situation.",
    icon: Bell,
  },
  {
    title: "Advisor Access",
    desc: "Access to an advisor. Get answers when you need them.",
    icon: MessageSquareText,
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative overflow-hidden bg-[#1B1856] py-20 sm:py-28">
      {/* subtle ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_35%,rgba(255,255,255,0.05),transparent_55%)]" />

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-[11px] sm:text-xs tracking-[0.22em] text-white/50"
        >
          THE LONG VIEW
        </motion.p>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-6 font-serif text-4xl leading-[1.08] text-white sm:text-5xl md:text-6xl"
        >
          <span className="block">As your life evolves,</span>
          <span className="block text-white/55">so does Celerey</span>
        </motion.h2>

        {/* Copy */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.12, duration: 0.6 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg"
        >
          Wealth building is not a single moment; it&apos;s a lifelong journey.
          Your Celerey dashboard grows with you, tracking your progress,
          surfacing insights, and keeping your advisor connected to your evolving
          story.
        </motion.p>

        {/* Cards */}
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((c, i) => {
            const Icon = c.icon;

            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.06 }}
                className={[
                  "rounded-2xl bg-white/5 p-7 text-left",
                  "ring-1 ring-white/10",
                  "shadow-[0_20px_60px_rgba(0,0,0,0.35)]",
                ].join(" ")}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/8 ring-1 ring-white/10">
                  <Icon className="h-6 w-6 text-white/75" />
                </div>

                <h3 className="mt-6 text-base font-semibold text-white sm:text-lg">
                  {c.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {c.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
