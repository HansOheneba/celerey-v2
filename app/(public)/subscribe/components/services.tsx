"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Service {
  id: number;
  name: string;
  price: number;
  description: string;
  duration?: string;
  payment_link: string;
}

export default function Services() {
 const services: Service[] = [
   {
     id: 1,
     name: "Financial Health Assessment",
     price: 95,
     description:
       "A comprehensive review of your income, expenses, savings, and liabilities to give you a clear picture of your current financial standing and priority areas.",
     payment_link: "https://your-payment-link.com/financial-health",
   },
   {
     id: 2,
     name: "Advisor Strategy Session",
     price: 125,
     duration: "60 minutes",
     description:
       "A deep one-on-one strategy session with a Celerey advisor to clarify goals, address challenges, and define a personalised financial action plan.",
     payment_link: "https://your-payment-link.com/advisor-session",
   },
   {
     id: 3,
     name: "Investment Portfolio Review",
     price: 175,
     description:
       "An in-depth analysis of your current investments, risk exposure, diversification, and alignment with your long-term objectives.",
     payment_link: "https://your-payment-link.com/investment-review",
   },
   {
     id: 4,
     name: "Wealth Growth Roadmap",
     price: 225,
     description:
       "A structured 90-day roadmap outlining clear steps to grow, protect, and optimise your wealth based on your goals and financial position.",
     payment_link: "https://your-payment-link.com/wealth-roadmap",
   },
   {
     id: 5,
     name: "Travel & Relocation Financial Planning",
     price: 160,
     description:
       "Personalised financial planning to prepare you for relocation or long-term travel, covering budgeting, savings targets, and financial sustainability.",
     payment_link: "https://your-payment-link.com/travel-planning",
   },
   {
     id: 6,
     name: "Passive Income Strategy Session",
     price: 195,
     duration: "60 minutes",
     description:
       "Strategic guidance on building sustainable passive income streams aligned with your risk tolerance, capital, and lifestyle goals.",
     payment_link: "https://your-payment-link.com/passive-income",
   },
 ];


  return (
    <section className="mt-28">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold mb-4">Services</h2>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Get expert help exactly where you need it. These one-off services are
          designed to give you clarity, direction, and confidence, no
          long-term commitment.
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-2">{service.name}</h3>

              {service.duration && (
                <p className="text-sm text-[#D4AF37] mb-3">
                  {service.duration}
                </p>
              )}

              <p className="text-3xl font-bold mb-4">${service.price}</p>

              <p className="text-gray-600 mb-6">{service.description}</p>
            </div>

            <Link
              href={service.payment_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full bg-[#1B1856] hover:bg-[#1B1856]/90 text-white font-semibold">
                Book Service
              </Button>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
