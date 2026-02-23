"use client";

import { motion } from "framer-motion";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BeginJourneyModal } from "./beginModal";

type BillingCadence = "annual" | "one-time";
type TierKey = "foundation" | "dashboard";

type Tier = {
  key: TierKey;
  label: string;
  name: string;
  price: string;
  currency: string;
  cadence: BillingCadence;
  badge: string;
  description: string;
  bullets: string[];
  ctaLabel: string;
  paymentUrl: string;
  footnote?: string;
  emphasis?: boolean;
  highlight?: string;
};

type EntryPointPricingProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  currency?: string;
  id?: string;
  tiers?: Tier[];
};

const foundationBullets = [
  "One private advisory session (up to 45 minutes)",
  "High level review of your current position and goals",
  "Clear next steps with a prioritized plan",
  "Follow up summary shared after the call",
  "No dashboard access",
];

const dashboardBullets = [
  "Two advisory sessions per year with a certified Celerey Advisor",
  "Quarterly progress reviews with tailored insights",
  "Monthly accountability check-ins to keep you on track",
  "Annual portfolio and financial health review",
  "Priority email and WhatsApp support",
  "Continuous portfolio intelligence highlighting risks and opportunities",
  "Member webinars, masterclasses, and partner benefits",
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

function BulletList({
  bullets,
  expanded,
  onToggle,
  previewCount = 5,
  showToggle,
}: {
  bullets: string[];
  expanded: boolean;
  onToggle: () => void;
  previewCount?: number;
  showToggle: boolean;
}) {
  const items = expanded ? bullets : bullets.slice(0, previewCount);

  return (
    <div>
      <ul className="space-y-4 text-left">
        {items.map((b) => (
          <li key={b} className="flex items-start gap-3">
            <span
              className={[
                "shrink-0 mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full",
                "bg-white/10 ring-1 ring-white/10",
              ].join(" ")}
            >
              <Check className="h-4 w-4 text-white/85" />
            </span>

            <p className="min-w-0 text-sm leading-6 text-white/85 sm:text-base sm:leading-7">
              {b}
            </p>
          </li>
        ))}
      </ul>

      {showToggle && bullets.length > previewCount ? (
        <button
          type="button"
          onClick={onToggle}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white/85 ring-1 ring-white/15 hover:bg-white/15"
        >
          {expanded ? "Hide full list" : "View all benefits"}
          {expanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
      ) : null}
    </div>
  );
}

export default function EntryPointPricing({
  eyebrow = "PRICING",
  title = "Choose your starting point",
  subtitle = "Start with a focused advisory session, or choose dashboard access for ongoing visibility, structured financial capture, and deeper guidance.",
  currency = "USD",
  id = "entry-pricing",
  tiers,
}: EntryPointPricingProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPaymentUrl, setSelectedPaymentUrl] = useState("");
  const [expanded, setExpanded] = useState<Record<TierKey, boolean>>({
    foundation: true,
    dashboard: true,
  });

  const defaultTiers: Tier[] = useMemo(
    () => [
      {
        key: "foundation",
        label: "ADVISORY SESSION",
        name: "Foundation Session",
        price: "100",
        currency,
        cadence: "one-time",
        badge: "One-time",
        description:
          "Get clarity, a plan, and priorities you can act on immediately.",
        bullets: foundationBullets,
        ctaLabel: "Book Foundation Session",
        paymentUrl: "https://buy.stripe.com/test_fZu9AT3b42k9fcT2s99Ve01", // $100 actual link
        footnote: "One session. No dashboard access.",
      },
      {
        key: "dashboard",
        label: "ADVISORY + DASHBOARD",
        name: "Core (Annual)",
        price: "299.99",
        currency,
        cadence: "annual",
        badge: "7-day free trial",
        highlight: "Best for ongoing progress and visibility",
        description:
          "Start free for 7 days. Year-round guidance, tracking, and continuous insights.",
        bullets: dashboardBullets,
        ctaLabel: "Start for Free",
        paymentUrl: "https://buy.stripe.com/test_7sYdR94f86ApggXgiZ9Ve02", // $300 actual link
        emphasis: true,
        footnote: "7-day free trial. Then billed annually. Cancel anytime.",
      },
    ],
    [currency],
  );
  const allTiers = tiers ?? defaultTiers;

  return (
    <>
      <section id={id} className="py-24">
        <div className="px-4 text-center">
          <p className="text-xs tracking-[0.18em] text-neutral-500">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-4xl text-neutral-900">{title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-500">
            {subtitle}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2"
          >
            {allTiers.map((t) => {
              const isCore = t.key === "dashboard";
              const isExpanded = expanded[t.key];

              return (
                <div
                  key={t.key}
                  className={[
                    "relative flex h-full flex-col overflow-hidden rounded-[28px] text-white shadow-[0_18px_55px_rgba(0,0,0,0.16)] ring-1 ring-white/10",
                    isCore ? "bg-[#1B1856]" : "bg-[#141246]",
                    t.emphasis ? "md:scale-[1.01]" : "",
                  ].join(" ")}
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.14),transparent_55%)]" />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.08),transparent_55%)]" />

                  {isCore ? (
                    <div className="absolute right-6 top-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/85 ring-1 ring-white/15">
                      7-day free trial
                    </div>
                  ) : null}

                  <div className="relative flex flex-1 flex-col px-8 pt-8 sm:px-10">
                    <div className="text-left">
                      <p className="text-xs tracking-[0.18em] text-white/70">
                        {t.label}
                      </p>

                      <div className="mt-3 flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {t.name}
                          </h3>
                          {t.highlight ? (
                            <p className="mt-1 text-sm text-white/70">
                              {t.highlight}
                            </p>
                          ) : null}
                        </div>

                        {!isCore ? (
                          <Badge
                            variant="outline"
                            className="bg-white/10 text-white/80 ring-white/10"
                          >
                            {t.badge}
                          </Badge>
                        ) : null}
                      </div>

                      <PriceBlock
                        price={t.price}
                        currency={t.currency}
                        cadence={t.cadence}
                      />

                      <p className="mt-4 text-sm text-white/70">
                        {t.description}
                      </p>

                      {!isCore ? (
                        <div className="mt-6 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                          <p className="text-xs font-semibold tracking-[0.16em] text-white/70">
                            BEST FOR
                          </p>
                          <ul className="mt-3 space-y-2 text-sm text-white/85">
                            <li className="flex items-start gap-2">
                              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-white/60" />
                              Clarifying your goals and priorities
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-white/60" />
                              Getting a practical plan you can act on
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-white/60" />
                              Deciding if ongoing support is right for you
                            </li>
                          </ul>
                        </div>
                      ) : null}
                    </div>

                    <div className="mt-8 h-px w-full bg-white/10" />

                    <div className="flex flex-1 flex-col py-8">
                      <BulletList
                        bullets={t.bullets}
                        expanded={isExpanded}
                        onToggle={() =>
                          setExpanded((prev) => ({
                            ...prev,
                            [t.key]: !prev[t.key],
                          }))
                        }
                        previewCount={99}
                        showToggle={false}
                      />

                      <div className="mt-auto pt-10">
                        <Button
                          onClick={() => {
                            setSelectedPaymentUrl(t.paymentUrl);
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
              );
            })}
          </motion.div>

          <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-neutral-500">
            Foundation is a one-time payment. Core includes a 7-day free trial,
            then billed annually.
          </p>
        </div>
      </section>

      <BeginJourneyModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        paymentUrl={selectedPaymentUrl}
      />
    </>
  );
}
