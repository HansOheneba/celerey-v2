"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowUpRight,
  Briefcase,
  Building2,
  Home,
  LineChart,
  PiggyBank,
  Sun,
  Users,
} from "lucide-react";

type ServiceCard = {
  title: string;
  description: string;
  priceNote: string; // e.g. "From $250" | "Priced on complexity"
  icon: React.ComponentType<{ className?: string }>;
  href?: string; // defaults to /subscribe/concierge
};

type AlaCarteServicesProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  services?: ServiceCard[];
  ctaHref?: string; // where cards go
  id?: string;
  className?: string;
};

const DEFAULT_SERVICES: ServiceCard[] = [
  {
    title: "Investment Strategy",
    description:
      "Personalized portfolio design aligned with your risk tolerance, timeline, and values.",
    priceNote: "From $250",
    icon: LineChart,
  },
  {
    title: "Portfolio Management",
    description:
      "Ongoing oversight, rebalancing, and optimization of your investment portfolio.",
    priceNote: "Priced on complexity",
    icon: PiggyBank,
  },
  {
    title: "Retirement Planning",
    description:
      "Long-term projections, drawdown strategies, and lifestyle planning for your future.",
    priceNote: "From $400",
    icon: Sun,
  },
  {
    title: "Property Planning",
    description:
      "Guidance on major asset purchases, real estate strategy, and property optimization.",
    priceNote: "From $300",
    icon: Home,
  },
  {
    title: "Business Advisory",
    description:
      "Cash flow optimization, business structure planning, and entrepreneur-focused guidance.",
    priceNote: "Priced on complexity",
    icon: Building2,
  },
  {
    title: "Legacy Planning",
    description:
      "Family wealth structuring, succession planning, and multi-generational strategy.",
    priceNote: "From $500",
    icon: Users,
  },
];

export default function AlaCarteServices({
  eyebrow = "BEYOND THE FIRST STEP",
  title = "Services when you need them",
  subtitle =
    "Celerey uses a layered, modular approach. You only pay for what you need, when you need it. No bundles. No subscriptions you don't want.",
  services = DEFAULT_SERVICES,
  ctaHref = "/subscribe/concierge",
  id = "services",
  className = "",
}: AlaCarteServicesProps) {
  return (
    <section id={id} className={`w-full bg-[#f4f3f2] py-16 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="text-center">
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
        </div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, idx) => {
            const Icon = s.icon;

            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: idx * 0.05 }}
              >
                <Link
                  href={s.href ?? ctaHref}
                  className={[
                    "group block h-full rounded-2xl bg-white/60 p-8",
                    "shadow-[0_10px_30px_rgba(0,0,0,0.05)] ring-1 ring-black/5",
                    "transition hover:bg-white/80 hover:shadow-[0_18px_50px_rgba(0,0,0,0.07)]",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100/80 ring-1 ring-black/5">
                      <Icon className="h-6 w-6 text-neutral-700" />
                    </div>

                    <span className="mt-1 inline-flex items-center gap-1 text-xs text-neutral-400 opacity-0 transition group-hover:opacity-100">
                      Explore <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>

                  <h3 className="mt-6 text-base font-semibold text-neutral-900 sm:text-lg">
                    {s.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                    {s.description}
                  </p>

                  <p className="mt-6 text-sm text-neutral-500">{s.priceNote}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* How pricing works */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="mt-16 rounded-2xl bg-white/60 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] ring-1 ring-black/5 sm:p-10"
        >
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <h4 className="font-serif text-2xl text-neutral-900 sm:text-3xl">
                How pricing works
              </h4>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-neutral-700 sm:text-base">
                We believe in complete transparency. There are no hidden fees, no
                bundled packages, and no pressure to buy services you don&apos;t
                need.
              </p>
            </div>

            <ol className="space-y-4">
              {[
                "Select the service that matches your current need",
                "Complete a short guided questionnaire",
                "Receive clear pricing based on your specific situation",
                "Decide when you're ready — no obligation",
              ].map((item, i) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-xs font-semibold text-neutral-700 ring-1 ring-black/5">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-neutral-700 sm:text-base">
                    {item}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
