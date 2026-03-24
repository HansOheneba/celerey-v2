"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  ServiceInquiryDialog,
  type ConciergeService,
} from "@/components/services/serviceForm";

type ServiceCard = {
  number: string;
  title: string;
  description: string;
  bullets: string[];
  deliverable: string;
  advisor: string;
  serviceId: string;
};

const SERVICES: ServiceCard[] = [
  {
    number: "01",
    title: "Wealth & Portfolio Review",
    description:
      "For clients with existing investments seeking an independent, expert second opinion. A structured session reviewing your current holdings, assessing suitability against your goals and risk profile, and identifying any gaps or concentrations.",
    bullets: [
      "Portfolio diagnostic",
      "Suitability assessment",
      "Concentration & risk analysis",
      "Reallocation recommendations",
    ],
    deliverable: "Written Advisory Opinion & Recommended Allocation",
    advisor: "Accredited Wealth Planner",
    serviceId: "wealth-review",
  },
  {
    number: "02",
    title: "Tax Optimisation",
    description:
      "For individuals and business owners seeking to structure their affairs more efficiently. A dedicated advisory session reviewing your current tax position and identifying planning opportunities.",
    bullets: [
      "Current tax position review",
      "Opportunity identification",
      "Pre-event structuring advice",
      "Cross-border considerations",
    ],
    deliverable: "Tax Plan & Written Advisory Opinion",
    advisor: "Accredited Tax Advisor",
    serviceId: "tax",
  },
  {
    number: "03",
    title: "Legacy & Estate Planning",
    description:
      "For individuals and families thinking seriously about generational wealth and governance. Focused on the structures that protect and transfer wealth across generations.",
    bullets: [
      "Trust & family structure review",
      "Succession planning",
      "Intergenerational transfer strategy",
      "Governance framework overview",
    ],
    deliverable: "Legacy Strategy Report & Structural Recommendations",
    advisor: "Accredited Wealth Manager",
    serviceId: "estate",
  },
  {
    number: "04",
    title: "International Property Advisory",
    description:
      "For clients acquiring, financing, or structuring real estate across jurisdictions. Covers acquisition structure, financing strategies, and jurisdiction-specific risks.",
    bullets: [
      "Acquisition structure analysis",
      "Offshore financing review",
      "Yield & valuation assessment",
      "Jurisdiction risk overview",
    ],
    deliverable: "Property Advisory Report & Structuring Guidance",
    advisor: "Accredited Property Consultant",
    serviceId: "property",
  },
  {
    number: "05",
    title: "Business Financing & Capital Strategy",
    description:
      "For founders and SME owners navigating debt, growth capital, or balance sheet restructuring. Focused on the capital decisions that determine whether a business scales or stalls.",
    bullets: [
      "Capital needs assessment",
      "Debt optimisation review",
      "Equity vs debt analysis",
      "Lender / investor positioning",
    ],
    deliverable: "Capital Strategy Memorandum",
    advisor: "Senior Financial Advisor",
    serviceId: "capital",
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function AlaCarteServices() {
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
    <section className="w-full bg-[#fbfaf8] py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="max-w-3xl">
          <h2 className="font-serif text-5xl text-neutral-900 leading-[1.05]">
            Specialist Engagements
          </h2>

          <p className="mt-4 text-sm tracking-wide text-neutral-500">
            One-Off Advisory
          </p>

          <p className="mt-6 text-neutral-600 leading-7">
            Focused advisory engagements for specific financial decisions,
            delivered by accredited specialists.
          </p>

          <div className="mt-8 h-px w-24 bg-neutral-900/10" />
        </div>

        {/* Services */}
        <div className="mt-14 space-y-10">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.serviceId}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
              className="rounded-[26px] border border-black/10 bg-white p-8 sm:p-10"
            >
              <div className="grid gap-10 lg:grid-cols-[1fr_260px]">
                {/* Left content */}
                <div>
                  <div className="flex items-center gap-4">
                    <span className="font-serif text-2xl text-[#b07d3d]">
                      {service.number}
                    </span>

                    <h3 className="font-serif text-2xl text-neutral-900">
                      {service.title}
                    </h3>
                  </div>

                  <p className="mt-4 text-neutral-600 leading-7">
                    {service.description}
                  </p>

                  {/* Scope bullets */}
                  <ul className="mt-6 grid gap-2 sm:grid-cols-2 text-sm text-neutral-700">
                    {service.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="text-[#b07d3d]">•</span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* Deliverable */}
                  <div className="mt-6 border-t border-black/10 pt-5">
                    <p className="text-xs uppercase tracking-wide text-neutral-500">
                      Deliverable
                    </p>

                    <p className="mt-1 text-neutral-900 font-medium">
                      {service.deliverable}
                    </p>
                  </div>
                </div>

                {/* Right panel */}
                <div className="flex flex-col justify-between border-t pt-6 lg:border-t-0 lg:border-l lg:pl-8">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-neutral-500">
                      Advisor
                    </p>

                    <p className="mt-1 font-medium text-neutral-900">
                      {service.advisor}
                    </p>
                  </div>

                  <Button
                    variant="ghost"
                    className="mt-8 rounded-full border border-neutral-200 hover:bg-neutral-50"
                    onClick={() => openInquiry(service)}
                  >
                    Request Engagement
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ServiceInquiryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        service={selected}
        onSubmit={(payload) => {
          console.log("Service inquiry submitted:", payload);
        }}
      />
    </section>
  );
}
