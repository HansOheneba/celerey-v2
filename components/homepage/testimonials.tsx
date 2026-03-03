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
  const total = testimonials.length;

  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        {/* Header */}
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl leading-[1.08] text-neutral-900 sm:text-4xl">
            Discreet outcomes,
            <span className="text-neutral-500"> served globally.</span>
          </h2>
          <p className="mt-4 text-sm leading-7 text-neutral-600">
            Testimonials are anonymised. We only reference the country a client
            is served.
          </p>
        </div>

        {/* Single (or small set) layout that never overflows */}
        <div className="mt-10">
          <motion.article
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className={[
              "max-w-3xl",
              "rounded-2xl bg-white",
              "border border-black/10",
              "shadow-[0_18px_55px_rgba(0,0,0,0.06)]",
              "p-6 sm:p-7",
            ].join(" ")}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1a1856]/5 ring-1 ring-[#1a1856]/10">
                  <Quote className="h-4 w-4 text-[#1a1856]" />
                </div>

                <div>
                  <p className="text-xs font-medium text-neutral-900">
                    {testimonials[0].context ?? "Client"}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {testimonials[0].country}
                  </p>
                </div>
              </div>

              {/* <p className="text-xs text-neutral-500">{total} testimonial</p> */}
            </div>

            <p className="mt-5 whitespace-pre-line text-sm leading-7 text-neutral-700">
              “{testimonials[0].quote}”
            </p>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
