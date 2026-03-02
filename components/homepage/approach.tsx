"use client";

import { motion } from "framer-motion";
import dashImage from "@/public/dash.jpg";

type Feature = {
  title: string;
  description: string;
};

type ApproachSectionProps = {
  eyebrow?: string;
  titleTop?: string;
  description?: string;
  features?: Feature[];
  className?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageCaption?: string;
};

const defaultFeatures: Feature[] = [
  {
    title: "Private-wealth level guidance",
    description:
      "Get access to certified advisors and structured thinking that is usually reserved for high-net-worth individuals.",
  },
  {
    title: "A complete view, in one place",
    description:
      "Bring income, spending, goals, and obligations into a single picture so decisions feel simple and grounded.",
  },
  {
    title: "Tech that keeps it practical",
    description:
      "Use smart tools that help you stay on track, spot blind spots early, and adjust as life changes.",
  },
];

export default function ApproachSection({
  eyebrow = "THE CELEREY APPROACH",
  titleTop = "The kind of guidance\nthe top 1% expect.",
  description = "Celerey brings private-wealth style advisory to everyone, backed by technology that makes the plan clear, trackable, and easy to follow.",
  features = defaultFeatures,
  className = "",
  imageSrc,
  imageAlt = "Approach preview",
  imageCaption = "Advisors + tools, working together to keep your plan clear.",
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
        <div className="grid items-start lg:items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <p className="text-[11px] sm:text-xs tracking-[0.22em] text-[#b07d3d]">
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

            {/* Softer “principles” list */}
            <div className="mt-10 space-y-6">
              {features.map((f, idx) => (
                <div key={f.title} className="flex gap-5">
                  <div className="pt-1">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-white text-xs font-semibold">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                  </div>

                  <div>
                    <p className="text-base font-semibold text-neutral-900">
                      {f.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-700 sm:text-base">
                      {f.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-10 max-w-xl text-sm text-neutral-600">
              This is not generic content. It is guidance, supported by a system
              that helps you apply it.
            </p>
          </motion.div>

          {/* Right: image frame */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-xl">
              <div className="relative overflow-hidden rounded-[28px] border border-black/10 bg-neutral-50 shadow-[0_30px_90px_rgba(0,0,0,0.10)]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(0,0,0,0.06),transparent_60%)]" />

                <div className="relative p-3 sm:p-4">
                  <div className="overflow-hidden rounded-[22px] bg-white">
                    <img
                      src={imageSrc ?? dashImage.src}
                      alt={imageAlt}
                      className="h-auto w-full object-cover"
                    />
                  </div>

                  <p className="mt-4 px-1 text-sm text-neutral-600">
                    {imageCaption}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs text-neutral-500">
                Built for clarity and consistency, not complexity.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
