"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
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

  description: string;
  bullets: string[];

  ctaLabel: string;
  paymentUrl: string;
  footnote?: string;

  emphasis?: boolean;
  highlight?: string;
};

type EntryPointPricingProps = {
  currency?: string;
  id?: string;
  tiers?: Tier[];
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const foundationBullets = [
  "1:1 financial coaching call (up to 45 minutes)",
  "Fast clarity on what to focus on right now (income, spending, debt, savings)",
  "A simple, realistic action plan you can follow",
  "Personalised recommendations aligned to your goals and lifestyle",
  "Written recap with your key decisions and next steps after the session",
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

function PriceLine({
  price,
  cadence,

  isCore,
}: {
  price: string;
  cadence: BillingCadence;

  isCore: boolean;
}) {
  const cadenceText =
    cadence === "annual" ? "Billed annually" : "One-time access";

  return (
    <div className="mt-3">
      <div className="flex items-baseline gap-2">
        <span
          className={cn(
            "font-serif text-5xl leading-none",
            isCore ? "text-white" : "text-neutral-900",
          )}
        >
          ${price}
        </span>
      </div>

      <p
        className={cn(
          "mt-2 text-sm",
          isCore ? "text-white/70" : "text-neutral-600",
        )}
      >
        {cadenceText}
     
  
      </p>
    </div>
  );
}

function FeatureList({
  bullets,
  isCore,
}: {
  bullets: string[];
  isCore: boolean;
}) {
  return (
    <ul className="mt-5 space-y-3">
      {bullets.map((b) => (
        <li key={b} className="flex items-start gap-3">
          <span
            className={cn(
              "mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full ring-1",
              isCore
                ? "bg-white/10 ring-white/15"
                : "bg-black/[0.03] ring-black/10",
            )}
          >
            <Check
              className={cn(
                "h-4 w-4",
                isCore ? "text-white/85" : "text-neutral-900",
              )}
            />
          </span>

          <p
            className={cn(
              "text-sm leading-7",
              isCore ? "text-white/85" : "text-neutral-700",
            )}
          >
            {b}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default function EntryPointPricing({
  currency = "USD",
  id = "entry-pricing",
  tiers,
}: EntryPointPricingProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPaymentUrl, setSelectedPaymentUrl] = useState("");

  const defaultTiers: Tier[] = useMemo(
    () => [
      {
        key: "foundation",
        label: "Essentials",
        name: "Financial Coaching Session",
        price: "99.99",
        currency,
        cadence: "one-time",
        description:
          "Young professionals and first-time planners who want accountability, financial discipline, and small but consistent steps toward stability.",
        highlight: "Stay on track with light, flexible access.",
        bullets: foundationBullets,
        ctaLabel: "Book a Coaching Session",
        paymentUrl: "https://buy.stripe.com/test_fZu9AT3b42k9fcT2s99Ve01",
        footnote: "One session. Dashboard access is not included.",
      },
      {
        key: "dashboard",
        label: "Core",
        name: "Core (Annual)",
        price: "299.99",
        currency,
        cadence: "annual",
        description:
          "Families and professionals who want structured support, accountability, and a personalised plan to grow and protect their wealth.",
        highlight: "Your financial plan, structured and supported.",
        bullets: dashboardBullets,
        ctaLabel: "Begin with a Free Trial",
        paymentUrl: "https://buy.stripe.com/test_7sYdR94f86ApggXgiZ9Ve02",
        emphasis: true,
        footnote: "7-day free trial. Then billed annually. Cancel anytime.",
      },
    ],
    [currency],
  );

  const allTiers = tiers ?? defaultTiers;

  return (
    <>
      <section id={id} className="py-10 sm:py-24">
        <div className="flex flex-col items-center text-center pb-10">
          <h2 className="mt-10 font-serif font-thin text-2xl text-neutral-900 sm:text-4xl">
            Subscription Plans
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-neutral-600">
            Choose a single coaching session for immediate clarity, or choose
            Core for ongoing visibility and structured guidance across the year.
          </p>
        </div>

        <div className="px-4">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2"
          >
            {allTiers.map((t) => {
              const isCore = t.key === "dashboard";

              return (
                <article
                  key={t.key}
                  className={cn(
                    "relative overflow-hidden rounded-[26px] border p-10 sm:p-12",
                    // IMPORTANT: make card a column so footer can stick to bottom
                    "flex flex-col",
                    isCore
                      ? "bg-[#1a1856] border-white/15"
                      : "bg-white border-black/10",
                    isCore
                      ? "shadow-[0_28px_80px_rgba(0,0,0,0.22)]"
                      : "shadow-[0_18px_55px_rgba(0,0,0,0.08)]",
                  )}
                >
                  {/* subtle top glow */}
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0",
                      isCore
                        ? "bg-[radial-gradient(circle_at_30%_15%,rgba(255,255,255,0.14),transparent_55%)]"
                        : "bg-[radial-gradient(circle_at_30%_15%,rgba(176,125,61,0.10),transparent_60%)]",
                    )}
                  />

                  {/* Body */}
                  <div className="relative flex flex-1 flex-col">
                    {/* Top content */}
                    <div className="text-left">
                      <h3
                        className={cn(
                          "font-serif text-3xl",
                          isCore ? "text-white" : "text-neutral-900",
                        )}
                      >
                        {t.label}
                      </h3>

                      <PriceLine
                        price={t.price}
                        cadence={t.cadence}
                        isCore={isCore}
                      />

                      <div
                        className={cn(
                          "mt-6 h-px w-full",
                          isCore ? "bg-white/15" : "bg-black/10",
                        )}
                      />

                      {/* Ideal for */}
                      <section className="mt-8">
                        <p className="text-sm font-semibold text-[#b07d3d]">
                          Ideal for:
                        </p>

                        <p
                          className={cn(
                            "mt-3 text-sm leading-7",
                            isCore ? "text-white/80" : "text-neutral-700",
                          )}
                        >
                          {t.description}
                        </p>

                        <div
                          className={cn(
                            "mt-8 h-px w-full",
                            isCore ? "bg-white/15" : "bg-black/10",
                          )}
                        />
                      </section>

                      {/* Features */}
                      <section className="mt-8">
                        <p className="text-sm font-semibold text-[#b07d3d]">
                          Features
                        </p>

                        {t.highlight ? (
                          <p
                            className={cn(
                              "mt-3 text-sm italic leading-7",
                              isCore ? "text-white/75" : "text-neutral-700",
                            )}
                          >
                            {t.highlight}
                          </p>
                        ) : null}

                        <FeatureList bullets={t.bullets} isCore={isCore} />
                      </section>
                    </div>

                    {/* Footer pinned to bottom */}
                    <div className="mt-auto pt-10">
                      <Button
                        onClick={() => {
                          setSelectedPaymentUrl(t.paymentUrl);
                          setModalOpen(true);
                        }}
                        className={cn(
                          "h-12 w-full rounded-full text-sm font-semibold transition",
                          isCore
                            ? "bg-white text-neutral-900 hover:bg-white/90"
                            : "bg-transparent text-neutral-900 ring-1 ring-black/20 hover:bg-black/[0.04]",
                        )}
                      >
                        {t.ctaLabel}
                      </Button>

                      {t.footnote ? (
                        <p
                          className={cn(
                            "mt-4 text-center text-xs",
                            isCore ? "text-white/55" : "text-neutral-500",
                          )}
                        >
                          {t.footnote}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </motion.div>

          <p className="mx-auto mt-10 max-w-3xl text-center text-xs text-neutral-500">
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
