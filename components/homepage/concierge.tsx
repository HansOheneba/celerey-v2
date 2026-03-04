"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  ServiceInquiryDialog,
  type ConciergeService,
} from "@/components/services/serviceForm";

type ServiceCard = {
  title: string;
  description: string;
  serviceId: string;
};

type AlaCarteServicesProps = {
  title?: string;
  subtitle?: string;
  services?: ServiceCard[];
  id?: string;
  className?: string;
  currencyLabel?: string;
  flatPrice?: string;
  disclaimer?: string;
  onSubmitInquiry?: (payload: {
    service: ConciergeService;
    fullName: string;
    email: string;
    phone: string;
    preferredContact: "WhatsApp" | "Email" | "Phone call";
    timeframe: "ASAP" | "This week" | "This month" | "Flexible";
    country: string;
    goal: string;
    context: string;
    custom?: { topic: string };
  }) => Promise<void> | void;
};

const DEFAULT_SERVICES: ServiceCard[] = [
  {
    title: "Tax planning",
    description:
      "Structure your finances so you only pay what you legally owe, helping you keep more of what you earn.",
    serviceId: "tax",
  },
  {
    title: "Debt management",
    description:
      "Reduce costly interest and create a payoff strategy that frees up more of your income over time.",
    serviceId: "debt",
  },
  {
    title: "Budget and spending plan",
    description:
      "Direct your income intentionally so more of it goes toward growth, goals, and long-term wealth.",
    serviceId: "budget",
  },
  {
    title: "Savings and emergency fund",
    description:
      "Build financial resilience while creating a consistent surplus you can deploy toward opportunities.",
    serviceId: "savings",
  },
  {
    title: "Investing setup",
    description:
      "Set up a clear investing approach designed to grow your capital over time based on your goals and risk level.",
    serviceId: "investing",
  },
  {
    title: "Property decision support",
    description:
      "Evaluate property opportunities with clear numbers so your decisions support long-term financial growth.",
    serviceId: "property",
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function AlaCarteServices({
  title = "Support, where you need it",
  subtitle = "Six focused offerings. One clear fee. Matched by fit and scope.",
  services = DEFAULT_SERVICES,
  id = "services",
  className = "",
  currencyLabel = "USD",
  flatPrice = "600",
  disclaimer = "Fee may increase if additional scope is required. Any change is confirmed in writing before work begins.",
  onSubmitInquiry,
}: AlaCarteServicesProps) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<ConciergeService | null>(null);

  const featured = React.useMemo(() => services.slice(0, 6), [services]);

  function openInquiry(s: ServiceCard) {
    const picked: ConciergeService = {
      id: s.serviceId,
      title: s.title,
      subtitle: s.description,
    };
    setSelected(picked);
    setDialogOpen(true);
  }

  function openCustomInquiry() {
    const picked: ConciergeService = {
      id: "custom",
      title: "Custom request",
      subtitle:
        "Tell us what you want solved. We will confirm whether we can support it and propose scope.",
    };
    setSelected(picked);
    setDialogOpen(true);
  }

  return (
    <section
      id={id}
      className={cn("w-full bg-[#fbfaf8] py-14 sm:py-20", className)}
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="font-serif text-4xl leading-[1.08] text-neutral-900 sm:text-5xl"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: 0.12, duration: 0.6 }}
            className="mt-4 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base"
          >
            {subtitle}
          </motion.p>

          <div className="mt-6 flex flex-wrap items-start gap-x-4 gap-y-2">
            <span className="text-[#b07d3d]">•</span>
            <p className="text-sm text-neutral-600">{disclaimer}</p>
          </div>

          <div className="mt-8 h-px w-24 bg-neutral-900/10" />
        </div>

        {/* Compact list (6) */}
        <div className="mt-10 overflow-hidden rounded-[22px] border border-black/10 bg-white">
          <div className="divide-y divide-black/10">
            {featured.map((s: ServiceCard, idx: number) => (
              <motion.div
                key={s.serviceId}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.45,
                  ease: "easeOut",
                  delay: idx * 0.03,
                }}
              >
                <div className="group px-6 py-5 sm:px-8 sm:py-6 transition hover:bg-black/[0.02]">
                  <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
                    <div className="min-w-0">
                      <h3 className="font-serif text-lg text-neutral-900 sm:text-xl">
                        {s.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-neutral-600">
                        {s.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-3 sm:justify-end">
                      <p className="text-sm text-neutral-700">
                        {currencyLabel} {flatPrice}
                      </p>

                      <Button
                        type="button"
                        variant="ghost"
                        className="h-9 rounded-full px-4 text-[#1a1856] hover:bg-[#1a1856]/5"
                        onClick={() => openInquiry(s)}
                      >
                        Request
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Custom request row */}
            <div className="px-6 py-5 sm:px-8 sm:py-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-serif text-lg text-neutral-900">
                    Need something else?
                  </p>
                  <p className="mt-1 text-sm leading-6 text-neutral-600">
                    Share the outcome you want. We will confirm fit and scope.
                  </p>
                </div>

                <Button
                  type="button"
                  className="h-10 rounded-full bg-[#1a1856] px-5 text-white hover:bg-[#1a1856]/90"
                  onClick={openCustomInquiry}
                >
                  Make a custom request
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Short “how it works” (compact) */}
        <div className="mt-10 grid gap-4 rounded-[22px] border border-black/10 bg-white p-6 sm:p-8 lg:grid-cols-3">
          {[
            {
              n: "1",
              t: "Choose an offering",
              d: "Pick a service or request custom support.",
            },
            {
              n: "2",
              t: "Share context",
              d: "Tell us what you want solved and your timeline.",
            },
            {
              n: "3",
              t: "Confirm scope",
              d: "We confirm fit, scope, and next steps before work begins.",
            },
          ].map((x) => (
            <div key={x.n} className="flex gap-4">
              <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#b07d3d]/10 text-xs font-semibold text-[#b07d3d] ring-1 ring-[#b07d3d]/25">
                {x.n}
              </span>
              <div>
                <p className="text-sm font-medium text-neutral-900">{x.t}</p>
                <p className="mt-1 text-sm leading-6 text-neutral-600">{x.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ServiceInquiryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        service={selected}
        onSubmit={(payload) => {
          if (onSubmitInquiry) return onSubmitInquiry(payload);
          console.log("Service inquiry submitted:", payload);
        }}
      />
    </section>
  );
}
