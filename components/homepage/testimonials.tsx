"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

type Testimonial = {
  quote: string;
  country: string;
  context?: string;
};

const testimonials: Testimonial[] = [
  {
    country: "United Kingdom",
    context: "Client",
    quote:
      "The human interaction really stood out. Speaking to knowledgeable people felt like a genuine desire to democratise investment knowledge to people who are not privy to this information.\n\nThe process felt as smooth as can be over the Christmas period.\n\nCelerey was an excellent opportunity to gain insight into how to take investing to the next steps. I really appreciated the steer and the modelling was the absolute pinnacle of what I was looking for. Thank you.",
  },
];

export default function TestimonialsControlled() {
  const t = testimonials[0];

  return (
    <section className="relative bg-white py-14 sm:py-16">
      {/* subtle brand wash (minimal, old-money) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(26,24,86,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,rgba(176,125,61,0.08),transparent_55%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6">
        {/* Header */}
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
       

          <h2 className="mt-4 font-serif text-3xl leading-[1.08] text-neutral-900 sm:text-4xl">
            Discreet outcomes,
            <span className="text-neutral-500"> served globally.</span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-neutral-600">
            Testimonials are anonymised. We only reference the country a client
            is served.
          </p>

          {/* refined divider */}
          <div className="mt-8 flex items-center gap-3">
            <div className="h-px w-14 bg-black/10" />
            <div className="h-px w-8 bg-[#b07d3d]/45" />
          </div>
        </div>

        {/* Single (or small set) layout that never overflows */}
        <div className="mt-10">
          <motion.article
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className={[
              "mx-auto max-w-3xl",
              "rounded-2xl bg-white",
              "border border-black/10",
              "shadow-[0_18px_55px_rgba(0,0,0,0.06)]",
              "p-6 sm:p-7",
              "relative overflow-hidden",
            ].join(" ")}
          >
            {/* subtle corner glow inside card */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(26,24,86,0.06),transparent_45%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(176,125,61,0.10),transparent_50%)]" />

            <div className="relative flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white ring-1 ring-black/10">
                  <Quote className="h-4 w-4 text-[#b07d3d]" />
                </div>

                <div>
                  <p className="text-xs font-medium text-neutral-900">
                    {t.context ?? "Client"}
                  </p>
                  <p className="text-xs text-neutral-500">{t.country}</p>
                </div>
              </div>

              {/* tasteful micro-mark */}
              <div className="hidden sm:flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1a1856]/25" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#b07d3d]/35" />
                <span className="h-1.5 w-1.5 rounded-full bg-black/10" />
              </div>
            </div>

            <p className="relative mt-5 whitespace-pre-line text-sm leading-7 text-neutral-700">
              “{t.quote}”
            </p>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
