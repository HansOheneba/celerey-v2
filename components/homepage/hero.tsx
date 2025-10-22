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
        <div className="w-full max-w-md mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Primary */}
            <Button
              asChild
              className="flex-1 w-full p-0 bg-blue-600 hover:bg-blue-700 rounded-2xl"
            >
              <Link
                href="/free-scan"
                className="w-full block text-center text-white font-medium py-2 text-sm sm:text-base"
              >
                Start Your Free Wealth Scan
              </Link>
            </Button>

            {/* Secondary */}
            <Button
              asChild
              variant="outline"
              className="flex-1 w-full p-0 border-white/30 rounded-2xl"
            >
              <Link
                href="/advisors"
                className="w-full block text-center text-white hover:bg-white/10 font-medium py-2  text-sm sm:text-base"
              >
                Book a Session with an Advisor
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="absolute -z-0 w-[400px] h-[400px] bg-blue-600/20 blur-3xl rounded-full top-1/3 left-1/2 -translate-x-1/2" />
    </section>
  );
}
