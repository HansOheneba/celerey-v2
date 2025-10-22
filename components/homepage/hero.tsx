"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center min-h-[90vh]  text-white px-6 md:pt-32 pb-20 overflow-hidden">
      {/* Decorative gradient or backdrop */}
      <div className="absolute inset-0  pointer-events-none" />

      {/* Main content */}
      <motion.div
        className="relative max-w-3xl mx-auto z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
          We help you turn <span className="text-blue-500">income</span> into
          strategy.
        </h1>

        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          Your wealth, guided by expertise and technology.
          <br />
          Precision meets human insight in every decision.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-6 rounded-2xl text-base"
          >
            <Link href="/free-scan">Start Your Free Wealth Scan</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-white/40 text-white hover:bg-white/10 font-semibold px-8 py-6 rounded-2xl text-base"
          >
            <Link href="/advisors">Book a Session with an Advisor</Link>
          </Button>
        </div>
      </motion.div>

      <div className="absolute -z-0 w-[400px] h-[400px] bg-blue-600/20 blur-3xl rounded-full top-1/3 left-1/2 -translate-x-1/2" />
    </section>
  );
}
