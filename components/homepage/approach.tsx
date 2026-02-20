"use client";

import { motion } from "framer-motion";
import { Check, BarChart3 } from "lucide-react";
import dashImage from "@/public/dash.jpg";

type Feature = {
  title: string;
  description: string;
};

type ApproachSectionProps = {
  eyebrow?: string;
  titleTop?: string;
  titleItalic?: string;
  description?: string;
  features?: Feature[];
  className?: string;
  /** Optional: swap the right-side card content for an image */
  imageSrc?: string;
  imageAlt?: string;
};

const defaultFeatures: Feature[] = [
  {
    title: "Holistic Understanding",
    description:
      "See your income, assets, liabilities, and goals in one clear view",
  },
  {
    title: "Expert Partnership",
    description:
      "Work with globally certified advisors who understand your world",
  },
  {
    title: "Evolving Support",
    description: "As your life changes, Celerey adapts with you",
  },
];

export default function ApproachSection({
  eyebrow = "THE CELEREY APPROACH",
  titleTop = "Your complete financial\npicture. \nFinally clear.",
  description = "We help you understand where you stand, define goals that matter, and build wealth over time with expert guidance at every step.",
  features = defaultFeatures,
  className = "",
  imageSrc,
  imageAlt = "Approach preview",
}: ApproachSectionProps) {
  return (
    <section
      className={[
        "w-full bg-white text-neutral-900",
        "py-20 sm:py-28",
        className,
      ].join(" ")}
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10 lg:px-16">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.1fr]">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="text-[11px] sm:text-xs tracking-[0.22em] text-neutral-600/80">
              {eyebrow}
            </p>

            <h2 className="mt-6 font-serif text-4xl leading-[1.08] sm:text-5xl md:text-6xl">
              {titleTop.split("\n").map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h2>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-700 sm:text-lg">
              {description}
            </p>

            <ul className="mt-10 space-y-6">
              {features.map((f) => (
                <li key={f.title} className="flex items-start gap-4">
                  <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200/70 text-neutral-900">
                    <Check className="h-5 w-5" />
                  </span>

                  <div>
                    <p className="text-sm font-semibold text-neutral-900 sm:text-base">
                      {f.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-700">
                      {f.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right Card */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-xl rounded-[28px] bg-white/70 p-1 shadow-[0_10px_30px_rgba(0,0,0,0.06)] ring-1 ring-black/5">
              <div className="flex items-center justify-center rounded-[22px] bg-neutral-200/60 overflow-hidden">
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="w-full h-auto rounded-[22px] object-contain"
                  />
                ) : (
                  <img
                    src={dashImage.src}
                    alt={imageAlt}
                    className="w-full h-auto rounded-[22px] object-contain"
                  />
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
