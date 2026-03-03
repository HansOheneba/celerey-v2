"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

type Testimonial = {
  quote: string;
  country: string;
  context?: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "The guidance gave me structure without making things feel complicated. I left with clear next steps.",
    country: "United Kingdom",
    context: "Private client",
  },
  {
    quote:
      "The process was discreet and highly organised. It felt like private advisory thinking, explained simply.",
    country: "Ghana",
    context: "Professional",
  },
  {
    quote:
      "I finally understand what matters, what to ignore, and how to stay consistent. That alone was worth it.",
    country: "United States",
    context: "Founder",
  },
  {
    quote:
      "Everything was calm, direct, and practical. It helped me make a decision I had been delaying for months.",
    country: "United Arab Emirates",
    context: "Executive",
  },
  {
    quote:
      "It was the first time financial advice felt structured, not generic. The clarity carried into my planning.",
    country: "Canada",
    context: "Private client",
  },
  {
    quote:
      "The recommendations were calm and actionable. It felt premium but still approachable.",
    country: "South Africa",
    context: "Client",
  },
];

function clamp(n: number, min: number, max: number): number {
  return Math.min(Math.max(n, min), max);
}

export default function TestimonialsControlled() {
  const [page, setPage] = React.useState(0);
  const [perPage, setPerPage] = React.useState(2);

  // Responsive: 1 card on mobile, 2 on md+
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setPerPage(mq.matches ? 2 : 1);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const totalPages = Math.max(1, Math.ceil(testimonials.length / perPage));

  // Keep page valid when perPage changes
  React.useEffect(() => {
    setPage((p) => clamp(p, 0, totalPages - 1));
  }, [totalPages]);

  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  const start = page * perPage;
  const visible = testimonials.slice(start, start + perPage);

  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        {/* Header row */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="mt-4 font-serif text-3xl leading-[1.08] text-neutral-900 sm:text-4xl">
              Discreet outcomes,
              <span className="text-neutral-500"> served globally.</span>
            </h2>
            <p className="mt-4 text-sm leading-7 text-neutral-600">
              Testimonials are anonymised. We only reference the country a
              client is served.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              className="h-10 w-10 rounded-full p-0"
              onClick={() => setPage((p) => clamp(p - 1, 0, totalPages - 1))}
              disabled={!canPrev}
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-10 w-10 rounded-full p-0"
              onClick={() => setPage((p) => clamp(p + 1, 0, totalPages - 1))}
              disabled={!canNext}
              aria-label="Next testimonials"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>

            <p className="ml-2 text-xs text-neutral-500">
              {page + 1}/{totalPages}
            </p>
          </div>
        </div>

        {/* Track viewport: CLIPPED, never exceeds width */}
        <div className="mt-10 overflow-hidden">
          {/* Track */}
          <motion.div
            key={page} // so it animates on change
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            {visible.map((t, i) => (
              <article
                key={`${t.country}-${start + i}`}
                className={[
                  "rounded-2xl bg-white",
                  "border border-black/10",
                  "shadow-[0_18px_55px_rgba(0,0,0,0.06)]",
                  "p-6",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1a1856]/5 ring-1 ring-[#1a1856]/10">
                      <Quote className="h-4 w-4 text-[#1a1856]" />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-neutral-900">
                        {t.context ?? "Client"}
                      </p>
                      <p className="text-xs text-neutral-500">{t.country}</p>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1a1856]/45" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1a1856]/30" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1a1856]/20" />
                  </div>
                </div>

                <p className="mt-5 text-sm leading-7 text-neutral-700">
                  “{t.quote}”
                </p>
              </article>
            ))}
          </motion.div>
        </div>

        {/* Dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setPage(idx)}
              className={[
                "h-2 w-2 rounded-full transition",
                idx === page ? "bg-[#1a1856]" : "bg-black/10 hover:bg-black/20",
              ].join(" ")}
              aria-label={`Go to page ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
