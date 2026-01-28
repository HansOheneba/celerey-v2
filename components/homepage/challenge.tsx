"use client";

import { motion } from "framer-motion";

type ChallengeSectionProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  body?: string;
  emphasis?: string;
  className?: string;
};

export default function ChallengeSection({
  eyebrow = "THE CHALLENGE",
  title = "Most people don't need more\nfinancial products.",
  subtitle = "They need structure. Perspective. A clear plan that connects today's decisions to tomorrow's outcomes.",
  body = "The financial industry offers complexity when it should offer clarity. It pushes products when it should provide guidance. It optimizes for transactions when it should optimize for trust.",
  emphasis = "We built Celerey to be different.",
  className = "",
}: ChallengeSectionProps) {
  return (
    <section
      className={[
        "w-full bg-[#f4f3f2] text-neutral-900",
        "py-16 sm:py-24",
        className,
      ].join(" ")}
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Eyebrow */}
          <p className="text-[11px] sm:text-xs tracking-[0.22em] text-neutral-600/80">
            {eyebrow}
          </p>

          {/* Title */}
          <h2 className="mt-6 font-serif text-4xl leading-[1.08] sm:text-5xl md:text-6xl">
            {title.split("\n").map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>

          {/* Paragraphs */}
          <div className="mt-8 space-y-6 text-base leading-relaxed text-neutral-700 sm:text-lg">
            <p>{subtitle}</p>
            <p>{body}</p>
          </div>

          {/* Emphasis */}
          <p className="mt-8 text-base font-semibold text-neutral-900 sm:text-lg">
            {emphasis}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
