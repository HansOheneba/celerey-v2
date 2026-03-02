"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-white text-black overflow-hidden -mt-24">
      {/* Subtle brand glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-40 h-[520px] w-[520px] rounded-full bg-purple-500/20 blur-[120px]" />
        <div className="absolute bottom-[120px] right-[-180px] h-[560px] w-[560px] rounded-full bg-[#1B1856]/25 blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-20 md:py-24 min-h-screen flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl "
        >
          {/* Small label */}
          <p className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-black/80">
            Error 404
          </p>

          <h1 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight text-black">
            This page doesn’t exist.
          </h1>

          <p className="mt-4 text-black/70 text-base md:text-lg leading-relaxed">
            The link may be broken, or the page may have been moved. Try going
            back home.
          </p>

          <motion.div whileTap={{ scale: 0.98 }} className="mt-8 flex ">
            <Link
              href="/"
              className="
                inline-flex items-center gap-2
                rounded-full
                bg-white text-[#070A14]
                px-5 py-3
                text-sm font-medium
                transition
                hover:bg-white/90
              "
            >
              <ArrowLeft className="h-4 w-4" />
              Go home
            </Link>
          </motion.div>

          {/* Secondary link */}
          <div className="mt-4 flex ">
            <Link
              href="/resources"
              className="text-sm text-black/60 hover:text-black transition-colors"
            >
              Browse resources →
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}