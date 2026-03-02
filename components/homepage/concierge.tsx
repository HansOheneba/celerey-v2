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
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  services?: ServiceCard[];
  id?: string;
  className?: string;
  currencyLabel?: string;
  flatPrice?: string;
  disclaimer?: string;

  // optional hook if you want to send to API from parent instead
  onSubmitInquiry?: (payload: {
    service: ConciergeService;
    fullName: string;
    email: string;
    phone: string;
    message: string;
  }) => Promise<void> | void;
};

const DEFAULT_SERVICES: ServiceCard[] = [
  {
    title: "Tax planning",
    description:
      "Help with taxes, filing readiness, and planning ahead to reduce avoidable surprises.",
    serviceId: "tax",
  },
  {
    title: "Debt management",
    description:
      "A clear payoff plan that balances progress with your monthly obligations.",
    serviceId: "debt",
  },
  {
    title: "Budget and spending plan",
    description:
      "A simple monthly plan so your money covers essentials, goals, and lifestyle.",
    serviceId: "budget",
  },
  {
    title: "Savings and emergency fund",
    description:
      "Build a safety buffer and a savings routine you can maintain long-term.",
    serviceId: "savings",
  },
  {
    title: "Investing setup",
    description:
      "Understand your options and set up a sensible approach based on your timeline and risk level.",
    serviceId: "investing",
  },
  {
    title: "Retirement planning",
    description:
      "Plan for later life with clear projections and practical next steps.",
    serviceId: "retirement",
  },
  {
    title: "Property decision support",
    description:
      "Make confident property decisions with clear numbers, trade-offs, and a plan.",
    serviceId: "property",
  },
  {
    title: "Income and business support",
    description:
      "Improve cash flow and structure if you earn through a business or side income.",
    serviceId: "income",
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function AlaCarteServices({
  // eyebrow = "SERVICES",
  title = "Support, where you need it",
  subtitle = "Each service is a focused engagement with one clear fee.",
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

  function openInquiry(s: ServiceCard) {
    const picked: ConciergeService = {
      id: s.serviceId,
      title: s.title,
      subtitle: s.description,
    };
    setSelected(picked);
    setDialogOpen(true);
  }

  return (
    <section
      id={id}
      className={cn("w-full bg-[#fbfaf8] py-16 sm:py-24", className)}
    >
      <div className="mx-auto max-w-6xl px-6">
      {/* Header */}
      <div className="max-w-3xl">
        <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mt-5 font-serif text-4xl leading-[1.08] text-neutral-900 sm:text-5xl"
        >
        {title}
        </motion.h2>

        <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ delay: 0.12, duration: 0.6 }}
        className="mt-5 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base"
        >
        {subtitle}
        </motion.p>

        <div className="mt-7 flex flex-wrap items-end gap-x-4 gap-y-2">
        <span className="text-neutral-300">|</span>
        <p className="text-sm text-neutral-600">{disclaimer}</p>
        </div>

        <div className="mt-8 h-px w-24 bg-neutral-900/10" />
      </div>

      {/* List */}
      <div className="mt-12 overflow-hidden rounded-[24px] border border-black/10 bg-white">
        <div className="divide-y divide-black/10">
        {services.map((s: ServiceCard, idx: number) => {
          return (
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
            <div
            className={cn(
              "group px-6 py-7 sm:px-8",
              "transition hover:bg-black/[0.02]",
            )}
            >
            <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
              <div className="min-w-0">
              <h3 className="font-serif text-xl text-neutral-900">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-neutral-600">
                {s.description}
              </p>
              </div>

              <div className="flex items-start justify-end">
              <p className="text-sm text-neutral-700">
                {currencyLabel} {flatPrice}
              </p>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              <p className="text-xs text-neutral-500">
              Select to share your details and request this service.
              </p>

              <Button
              type="button"
              variant="ghost"
              className="rounded-full px-4"
              onClick={() => openInquiry(s)}
              >
              Continue
              </Button>
            </div>
            </div>
          </motion.div>
          );
        })}
        </div>
      </div>

      {/* How it works */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mt-12 grid gap-8 rounded-[24px] border border-black/10 bg-white p-8 sm:p-10 lg:grid-cols-2"
      >
        <div>
        <h4 className="font-serif text-2xl text-neutral-900">
          How it works
        </h4>
        <p className="mt-4 max-w-lg text-sm leading-7 text-neutral-600">
          You select one service, share your details, and we confirm scope
          before anything begins.
        </p>
        </div>

        <ol className="space-y-4">
        {[
          "Choose the service that fits your situation",
          "Submit your details and notes",
          "Receive scope confirmation",
          "Proceed when you are ready",
        ].map((item: string, i: number) => (
          <li key={item} className="flex items-start gap-4">
          <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black/[0.03] text-xs font-semibold text-neutral-700 ring-1 ring-black/10">
            {i + 1}
          </span>
          <p className="text-sm leading-7 text-neutral-600">{item}</p>
          </li>
        ))}
        </ol>
      </motion.div>
      </div>

      {/* Dialog */}
      <ServiceInquiryDialog
      open={dialogOpen}
      onOpenChange={setDialogOpen}
      service={selected}
      onSubmit={(payload) => {
        // If parent provided handler, call it. Else just log for now.
        if (onSubmitInquiry) {
        return onSubmitInquiry(payload);
        }
        console.log("Service inquiry submitted:", payload);
      }}
      />
    </section>
  );
}
