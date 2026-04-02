"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calculator, PiggyBank, Wallet } from "lucide-react";
import Link from "next/link";

const TOOLS = [
  {
    id: 1,
    name: "Budget Planner",
    description:
      "Build a clear picture of your monthly income and expenses. Set spending limits, track categories, and take control of where your money goes.",
    icon: Wallet,
    href: "/tools/budget-planner",
    badge: null,
  },
  {
    id: 2,
    name: "Savings Calculator",
    description:
      "Project how your savings grow over time. Factor in contributions, interest rates, and timelines to map out the path to your financial goals.",
    icon: PiggyBank,
    href: "/tools/savings-calculator",
    badge: null,
  },
  {
    id: 3,
    name: "Money Manager",
    description:
      "Get a holistic view of your finances. Track income, outgoings, and net worth in one place to make smarter, faster decisions.",
    icon: Calculator,
    href: "/tools/money-manager",
    badge: null,
  },
];

export default function ToolsPage() {
  return (
    <section className="relative min-h-screen py-32 px-6 bg-gradient-to-b from-white to-slate-50 text-[#1B1856]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-sm uppercase tracking-widest text-[#D4AF37] font-semibold mb-3">
            Financial Tools
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Tools Built for{" "}
            <span className="text-[#D4AF37]">Your Financial Journey</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Practical, easy-to-use calculators and planners to help you budget
            smarter, save faster, and manage your money with confidence.
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TOOLS.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative rounded-3xl border border-gray-200 bg-white p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300"
              >
                {tool.badge && (
                  <div className="absolute -top-4 right-6">
                    <span className="inline-block rounded-full bg-[#D4AF37] px-4 py-1 text-xs font-semibold text-white shadow-sm">
                      {tool.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-[#1B1856]/5 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-[#1B1856]" />
                  </div>

                  <h3 className="text-xl font-semibold mb-3">{tool.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-8">
                    {tool.description}
                  </p>
                </div>

                <Link href={tool.href}>
                  <Button className="w-full border border-[#1B1856] bg-transparent text-[#1B1856] hover:bg-[#1B1856] hover:text-white transition-all text-sm font-semibold rounded-full">
                    Open Tool
                  </Button>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-24 max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-semibold mb-4">
            Want Personalised Guidance?
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            These tools are a great starting point. For a tailored financial
            strategy built around your goals, explore our{" "}
            <span className="font-medium text-[#D4AF37]">advisory plans</span>.
          </p>
          <Link href="/subscribe">
            <Button className="bg-[#1B1856] hover:bg-[#1B1856]/90 text-white rounded-full px-8 py-3 font-light">
              View Plans
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
