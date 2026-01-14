"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface ServiceOption {
  id: string;
  name: string;
  description: string;
  price: number; // per session or flat add-on
}

const BASE_PRICE = 600;

const SERVICES: ServiceOption[] = [
  {
    id: "financial-plan",
    name: "Personal Financial Blueprint",
    description:
      "Holistic review of income, expenses, assets, and long-term goals",
    price: 200,
  },
  {
    id: "cashflow",
    name: "Cash Flow & Budget Optimization",
    description: "Improve monthly surplus and eliminate financial leakage",
    price: 150,
  },
  {
    id: "debt",
    name: "Debt Restructuring & Payoff Strategy",
    description: "Optimized approach to reducing high-interest or complex debt",
    price: 150,
  },
  {
    id: "retirement",
    name: "Retirement & Long-Term Planning",
    description: "Define targets and strategy for financial independence",
    price: 250,
  },

  {
    id: "asset-allocation",
    name: "Asset Allocation Strategy",
    description:
      "Custom allocation across stocks, real estate, private assets, and cash",
    price: 250,
  },
  {
    id: "real-estate",
    name: "Real Estate Investment Advisory",
    description: "Buy, hold, or exit strategy for property investments",
    price: 300,
  },
  {
    id: "alternatives",
    name: "Alternative Investments Review",
    description:
      "Private equity, commodities, crypto, or non-traditional assets",
    price: 250,
  },
  {
    id: "risk",
    name: "Risk & Downside Protection Review",
    description: "Stress-test portfolio against economic and market shocks",
    price: 200,
  },

  {
    id: "income-growth",
    name: "Income Expansion Strategy",
    description: "Identify and structure new income streams",
    price: 200,
  },
  {
    id: "equity-comp",
    name: "Equity & Compensation Advisory",
    description:
      "Stock options, RSUs, profit sharing, or executive compensation review",
    price: 250,
  },
  {
    id: "career",
    name: "Career & Earnings Strategy",
    description:
      "Negotiation, role progression, and long-term earning optimization",
    price: 150,
  },

  {
    id: "insurance",
    name: "Insurance & Protection Planning",
    description: "Ensure adequate coverage across life, health, and assets",
    price: 150,
  },
  {
    id: "estate",
    name: "Estate & Legacy Planning (Non-Legal)",
    description: "Wealth transfer strategy and family planning overview",
    price: 300,
  },
  {
    id: "structures",
    name: "Wealth Structuring & Entity Review",
    description: "Assess trusts, holding companies, or offshore structures",
    price: 300,
  },
];

export default function ConciergePricingPage() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleService = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const selectedServices = SERVICES.filter((s) => selected.includes(s.id));

  const total =
    BASE_PRICE + selectedServices.reduce((sum, s) => sum + s.price, 0);

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-slate-50 px-6 py-24 text-[#1B1856] my-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Concierge Advisory
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Build a bespoke advisory engagement. Select the services you need
            and receive transparent, scope-based pricing.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Services */}
          <div className="md:col-span-2 space-y-6">
            {SERVICES.map((service) => {
              const active = selected.includes(service.id);
              return (
                <div
                  key={service.id}
                  onClick={() => toggleService(service.id)}
                  className={`cursor-pointer rounded-2xl border p-6 transition-all ${
                    active
                      ? "border-[#D4AF37] bg-amber-50/40"
                      : "border-gray-200 bg-white"
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
                    {active && (
                      <Check className="w-5 h-5 text-[#D4AF37] mt-1" />
                    )}
                  </div>

                  {service.price > 0 && (
                    <p className="mt-3 text-sm text-gray-500">
                      +${service.price}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm h-fit sticky top-24">
            <h3 className="text-xl font-semibold mb-6">Your Estimate</h3>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span>Base Concierge Session</span>
                <span>${BASE_PRICE}</span>
              </div>

              {selectedServices.map((s) => (
                <div
                  key={s.id}
                  className="flex justify-between text-sm text-gray-600"
                >
                  <span>{s.name}</span>
                  <span>+${s.price}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 flex justify-between font-semibold">
              <span>Total Estimated Cost</span>
              <span>${total}</span>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              Final pricing may vary based on complexity and scope. This
              estimate is not a binding quote.
            </p>

            <Button className="w-full mt-6 bg-[#1B1856] hover:bg-[#1B1856]/90 text-white">
              Continue & Request Session
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
