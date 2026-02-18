"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BeginJourneyModal } from "./beginModal";

type BillingCadence = "annual" | "one-time";
type TierKey = "starter" | "dashboard";

type Tier = {
  key: TierKey;
  label: string;
  name: string;
  price: string; // "100", "300"
  currency: string; // "USD"
  cadence: BillingCadence;
  badge: string; // "One-time", "Annual"
  description: string;
  bullets: string[];
  ctaLabel: string;
  footnote?: string;
  emphasis?: boolean;
};

type EntryPointPricingProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  currency?: string;
  id?: string;
  tiers?: Tier[];
};

const starterBullets = [
  "One advisory session (up to 45 minutes)",
  "High-level review of your current position and goals",
  "Clear next steps and recommended priorities",
  "No dashboard access",
];

const dashboardBullets = [
  "Two advisor sessions",
  "Dashboard access for tracking and insights",
  "Financial snapshot setup (we collect and structure your inputs)",
  "Our technology learns your context and keeps you on track",
  "Priority alerts + next steps tailored to you",
];

function PriceBlock({
  price,
  currency,
  cadence,
}: {
  price: string;
  currency: string;
  cadence: BillingCadence;
}) {
  const cadenceText = cadence === "annual" ? "per year" : "one-time";
  return (
    <div className="mt-4 flex items-end gap-2">
      <span className="font-serif text-5xl leading-none">${price}</span>
      <div className="pb-1">
        <div className="text-sm text-white/70">{currency}</div>
        <div className="text-xs text-white/55">{cadenceText}</div>
      </div>
    </div>
  );
}

export default function EntryPointPricing({
  eyebrow = "PRICING",
  title = "Choose your starting point",
  subtitle = "Go advisory-only for a quick reset, or choose dashboard access for ongoing visibility, structured financial capture, and deeper guidance.",
  currency = "USD",
  id = "entry-pricing",
  tiers,
}: EntryPointPricingProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const defaultTiers: Tier[] = useMemo(
    () => [
      {
        key: "starter",
        label: "ADVISORY ONLY",
        name: "Starter",
        price: "100",
        currency,
        cadence: "one-time",
        badge: "One-time",
        description:
          "A single advisory session designed to give you clarity, direction, and a clean set of next steps; without dashboard access.",
        bullets: starterBullets,
        ctaLabel: "Book Advisory Session",
      },
      {
        key: "dashboard",
        label: "ADVISORY + DASHBOARD",
        name: "Core (Annual)",
        price: "300",
        currency,
        cadence: "annual",
        badge: "Annual",
        description:
          "For ongoing visibility; dashboard access, structured financial capture, our bot that understands your context, and two focused advisor sessions to help you act on insights.",
        bullets: dashboardBullets,
        ctaLabel: "Start Annual Plan",
       
        emphasis: true,
      },
    ],
    [currency],
  );

  const allTiers = tiers?.length ? tiers : defaultTiers;
  const starter = allTiers.find((t) => t.key === "starter")!;
  const dashboard = allTiers.find((t) => t.key === "dashboard")!;

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

          {/* Side-by-side pricing */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: 0.06, duration: 0.7, ease: "easeOut" }}
            className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2"
          >
            {[starter, dashboard].map((t) => (
              <div
                key={t.key}
                className={[
                  "relative flex h-full flex-col overflow-hidden rounded-[28px] bg-[#1B1856] text-white shadow-[0_18px_55px_rgba(0,0,0,0.16)] ring-1 ring-white/10",
                  t.emphasis ? "md:scale-[1.01]" : "",
                ].join(" ")}
              >
                {/* subtle glow */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.14),transparent_55%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.08),transparent_55%)]" />

                <div className="relative flex flex-1 flex-col px-8 pt-8 sm:px-10">
                  <div className="flex items-start justify-between gap-6">
                    <div className="text-left">
                      <p className="text-xs tracking-[0.18em] text-white/70">
                        {t.label}
                      </p>

                      <h3 className="mt-3 text-lg font-semibold text-white">
                        {t.name}
                      </h3>

                      <PriceBlock
                        price={t.price}
                        currency={t.currency}
                        cadence={t.cadence}
                      />

                      <p className="mt-4 text-sm text-white/70">
                        {t.description}
                      </p>
                    </div>

                    <div className="pt-1">
                      <Badge
                        variant="outline"
                        className="bg-white/10 text-white/80 ring-white/10"
                      >
                        {t.badge}
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-8 h-px w-full bg-white/10" />

                  <div className="flex flex-1 flex-col py-8">
                    <ul className="space-y-4 text-left">
                      {t.bullets.map((b) => (
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

                    <div className="mt-auto pt-10">
                      <Button
                        onClick={() => {
                          setModalOpen(true);
                        }}
                        className={[
                          "h-12 w-full rounded-full text-sm font-semibold",
                          t.emphasis
                            ? "bg-white text-neutral-900 hover:bg-white/90"
                            : "bg-white/10 text-white hover:bg-white/15 ring-1 ring-white/15",
                        ].join(" ")}
                      >
                        {t.ctaLabel}
                      </Button>

                      {t.footnote ? (
                        <p className="mt-4 text-center text-xs text-white/50">
                          {t.footnote}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-neutral-500">
            Starter is a one-time payment. Dashboard is billed annually.
          </p>
        </div>
      </section>

      <BeginJourneyModal
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
}
