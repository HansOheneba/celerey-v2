"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const SERVICES = [
  "Tax planning",
  "Debt management",
  "Budget and spending plan",
  "Savings and emergency fund",
  "Investing setup",
  "Property decision support",
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type ConciergeCTAProps = {
  imageSrc?: string;
  imageAlt?: string;
};

export default function ConciergeCTAFullBleed({
  imageSrc = "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  imageAlt = "Concierge advisory",
}: ConciergeCTAProps) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#fbfaf8]">
      {/* soft paper + purple wash (subtle, not “badgey”) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(26,24,86,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(26,24,86,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.00),rgba(0,0,0,0.02))]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-6 py-16">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* LEFT */}
          <div className="max-w-xl">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="font-serif text-4xl leading-[1.05] text-neutral-900 sm:text-5xl"
            >
              If you could fix one money problem right now,
              <span className="block text-neutral-500">What would it be?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08, duration: 0.55 }}
              className="mt-6 text-sm leading-7 text-neutral-600 sm:text-base"
            >
              Choose one area. We match you to the advisor best suited for that
              problem, and you leave with a clear, structured plan.
            </motion.p>

            {/* minimal divider */}
            <div className="mt-10 h-px w-24 bg-black/10" />

            {/* quiet list */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12, duration: 0.55 }}
              className="mt-8"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {SERVICES.map((s) => (
                  <div
                    key={s}
                    className="flex items-center justify-between gap-4 border-b border-black/10 py-2"
                  >
                    <Link
                      href={`/services`}
                      className="text-sm text-neutral-700 hover:text-neutral-900 flex justify-between w-full hover:underline underline-offset-4"
                    >
                      {s}

                      <span className="text-xs text-neutral-400">→</span>
                    </Link>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link href="/services">
                  <Button className="h-11 rounded-full bg-[#1a1856] px-6 text-white hover:bg-[#1a1856]/90">
                    Explore concierge services
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <p className="text-xs text-neutral-500">
                  Focused, paid engagements with defined scope
                </p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: artsy image block */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className={cn(
              "relative mx-auto w-full max-w-[560px]",
              "rounded-[32px] border border-black/10 bg-white",
              "shadow-[0_30px_90px_rgba(0,0,0,0.10)]",
              "overflow-hidden",
            )}
          >
            <div className="relative aspect-[4/5] w-full">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 560px, 100vw"
                priority={false}
              />
              {/* minimal film wash */}
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(26,24,86,0.25),rgba(0,0,0,0.0)_55%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_60%)]" />
            </div>

            {/* tiny caption (optional but tasteful) */}
            <div className="flex items-center justify-between gap-4 px-6 py-5">
              <p className="text-xs text-neutral-500">
                Concierge advisory, designed for one clear outcome.
              </p>
              <Link
                href="/services"
                className="text-xs text-neutral-600 hover:text-neutral-900 underline-offset-4 hover:underline"
              >
                View services
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
