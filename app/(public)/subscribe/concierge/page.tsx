"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Info, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { ConciergeForm } from "./conciergeForm";

type PricingType = "fixed" | "range" | "dynamic";

interface ServiceOption {
  id: string;
  name: string;
  description: string;
  pricingType: PricingType;

  // fixed
  price?: number;

  // range
  min?: number;
  max?: number;

  // dynamic
  priceNote?: string; // "Priced on complexity"
  estimateDefault?: number; // optional estimate for display (can omit)
}

const SERVICES: ServiceOption[] = [
  {
    id: "financial-plan",
    name: "Personal Financial Blueprint",
    description:
      "Holistic review of income, expenses, assets, and long-term goals.",
    pricingType: "fixed",
    price: 200,
  },
  {
    id: "cashflow",
    name: "Cash Flow & Budget Optimization",
    description: "Improve monthly surplus and eliminate financial leakage.",
    pricingType: "fixed",
    price: 150,
  },
  {
    id: "debt",
    name: "Debt Restructuring & Payoff Strategy",
    description: "Optimized approach to reducing high-interest or complex debt.",
    pricingType: "fixed",
    price: 150,
  },
  {
    id: "retirement",
    name: "Retirement & Long-Term Planning",
    description: "Define targets and strategy for financial independence.",
    pricingType: "range",
    min: 200,
    max: 350,
  },

  {
    id: "asset-allocation",
    name: "Asset Allocation Strategy",
    description:
      "Custom allocation across stocks, real estate, private assets, and cash.",
    pricingType: "range",
    min: 200,
    max: 400,
  },
  {
    id: "real-estate",
    name: "Real Estate Investment Advisory",
    description: "Buy, hold, or exit strategy for property investments.",
    pricingType: "dynamic",
    priceNote: "Priced on complexity",
    // optional: give a default estimate if you want
    estimateDefault: 300,
  },
  {
    id: "alternatives",
    name: "Alternative Investments Review",
    description: "Private equity, commodities, crypto, or non-traditional assets.",
    pricingType: "range",
    min: 200,
    max: 450,
  },
  {
    id: "risk",
    name: "Risk & Downside Protection Review",
    description: "Stress-test portfolio against economic and market shocks.",
    pricingType: "fixed",
    price: 200,
  },

  {
    id: "income-growth",
    name: "Income Expansion Strategy",
    description: "Identify and structure new income streams.",
    pricingType: "fixed",
    price: 200,
  },
  {
    id: "equity-comp",
    name: "Equity & Compensation Advisory",
    description:
      "Stock options, RSUs, profit sharing, or executive compensation review.",
    pricingType: "dynamic",
    priceNote: "Varies by plan + jurisdiction",
  },
  {
    id: "career",
    name: "Career & Earnings Strategy",
    description: "Negotiation, role progression, and long-term earning optimization.",
    pricingType: "fixed",
    price: 150,
  },

  {
    id: "insurance",
    name: "Insurance & Protection Planning",
    description: "Ensure adequate coverage across life, health, and assets.",
    pricingType: "fixed",
    price: 150,
  },
  {
    id: "estate",
    name: "Estate & Legacy Planning (Non-Legal)",
    description: "Wealth transfer strategy and family planning overview.",
    pricingType: "dynamic",
    priceNote: "Priced on complexity",
  },
  {
    id: "structures",
    name: "Wealth Structuring & Entity Review",
    description: "Assess holding companies, trusts, or cross-border structures.",
    pricingType: "dynamic",
    priceNote: "Priced on complexity",
  },
];

function formatPriceLabel(s: ServiceOption) {
  if (s.pricingType === "fixed") return `+$${s.price}`;
  if (s.pricingType === "range") return `Typical $${s.min}–$${s.max}`;
  return s.priceNote ?? "Priced on complexity";
}

function estimateAddOn(s: ServiceOption) {
  if (s.pricingType === "fixed") return s.price ?? 0;
  if (s.pricingType === "range") {
    const min = s.min ?? 0;
    const max = s.max ?? 0;
    return Math.round((min + max) / 2);
  }
  // dynamic: either use a default estimate or exclude from estimate
  return s.estimateDefault ?? 0;
}

export default function ConciergePricingPage() {
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [formOpen, setFormOpen] = useState(false);

  // Pre-select service from URL query param
  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (serviceParam) {
      const validService = SERVICES.find((s) => s.id === serviceParam);
      if (validService) {
        setSelected([serviceParam]);
      }
    }
  }, [searchParams]);

  const toggleService = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const selectedServices = useMemo(
    () => SERVICES.filter((s) => selected.includes(s.id)),
    [selected]
  );

  const dynamicSelected = selectedServices.filter((s) => s.pricingType === "dynamic");

  const payload = useMemo(
    () => ({
      selectedServices: selectedServices.map((s) => ({
        id: s.id,
        name: s.name,
        pricingType: s.pricingType,
        display: formatPriceLabel(s),
      })),
      notes: notes.trim(),
    }),
    [selectedServices, notes]
  );

  const handleContinue = () => {
    setFormOpen(true);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-slate-50 px-6 py-24 text-[#1B1856] my-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Concierge Advisory
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Build a bespoke advisory engagement. Select the services you need,
            add context, and receive transparent scope-based pricing.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Services */}
          <div className="md:col-span-2 space-y-6">
      

            {/* Services list */}
            {SERVICES.map((service) => {
              const active = selected.includes(service.id);

              return (
                <button
                  type="button"
                  key={service.id}
                  onClick={() => toggleService(service.id)}
                  className={`w-full text-left rounded-2xl border p-6 transition-all ${
                    active
                      ? "border-blue-600 bg-blue-50/40"
                      : "border-gray-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        {service.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {service.description}
                      </p>
                    </div>

                    {active ? (
                      <Check className="w-5 h-5 text-blue-600 mt-1" />
                    ) : null}
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      {formatPriceLabel(service)}
                    </p>

                    {service.pricingType !== "dynamic" ? (
                      <p className="text-xs text-gray-400">
                        Est. +${estimateAddOn(service)}
                      </p>
                    ) : (
                      <p className="text-xs text-gray-400">
                        Final quote after review
                      </p>
                    )}
                  </div>
                </button>
              );
            })}

            {/* Notes */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-gray-500">
                  <Info className="h-5 w-5" />
                </div>
                <div className="w-full">
                  <h3 className="text-lg font-semibold mb-1">
                    Anything else? (optional)
                  </h3>
                  <p className="text-sm text-gray-600">
                    Need something not listed above? Let us know what services or topics you'd like to discuss.
                  </p>

                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="E.g., tax optimization, philanthropy strategy, or anything else..."
                    className="mt-4 min-h-[110px] resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm h-fit sticky top-24">
            <h3 className="text-xl font-semibold mb-6">Your Selection</h3>

            <div className="space-y-3 mb-6 text-sm">
              {selectedServices.length === 0 ? (
                <p className="text-sm text-gray-500">
                  Select services to build your engagement.
                </p>
              ) : (
                selectedServices.map((s) => (
                  <div key={s.id} className="flex justify-between text-gray-700">
                    <span className="pr-4">{s.name}</span>
                    <span className="text-gray-500 text-xs">{formatPriceLabel(s)}</span>
                  </div>
                )))
              }
            </div>

            {dynamicSelected.length > 0 ? (
              <p className="mb-6 text-xs text-gray-500">
                Some selections are <strong>priced on complexity</strong>. Your
                final quote will be confirmed after we review your details.
              </p>
            ) : (
              <p className="mb-6 text-xs text-gray-500">
                Final pricing will be confirmed after we review your details.
              </p>
            )}

            <Button
              onClick={handleContinue}
              disabled={selectedServices.length === 0}
              className={`w-full flex items-center gap-2 ${
                selectedServices.length === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#1B1856] hover:bg-[#1B1856]/90 text-white"
              }`}
            >
              Continue <Send className="h-4 w-4" />
            </Button>

            <p className="mt-4 text-[11px] text-gray-500">
              By continuing, you're requesting a scoped quote and scheduling
              options. No obligation.
            </p>
          </div>
        </div>
      </div>

      <ConciergeForm
        open={formOpen}
        onOpenChange={setFormOpen}
        selectedServices={selectedServices}
        notes={notes}
      />
    </section>
  );
}
