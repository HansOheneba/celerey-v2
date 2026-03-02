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
  title = "There is plenty of advice.\nNot enough direction.",
  subtitle = "Money gets loud fast. Opinions, rules, products, and noise. What you really need is a clear path you can trust.",
  body = "Celerey helps you understand where you are, what matters next, and how to move forward with confidence. Simple guidance that connects today’s choices to tomorrow’s outcomes.",
  emphasis = "Clarity first. Strategy second. Momentum always.",
  className = "",
}: ChallengeSectionProps) {
  return (
    <section
      className={[
        "relative w-full min-h-screen bg-[#f4f3f2] text-neutral-900",
        className,
      ].join(" ")}
    >
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* LEFT — Full Bleed Video */}
        <div className="relative h-[60vh] lg:h-auto">
          <video
            src="/videos/nav.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* subtle dark gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
        </div>

        {/* RIGHT — Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center justify-center px-8 py-16 sm:px-16 lg:px-24"
        >
          <div className="max-w-xl">
            <p className="text-[11px] tracking-[0.22em] text-[#b07d3d]">
              {eyebrow}
            </p>

            <h2 className="mt-6 font-serif text-4xl leading-[1.08] sm:text-5xl md:text-6xl">
              {title.split("\n").map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h2>

            <div className="mt-8 space-y-6 text-base leading-relaxed text-neutral-700 sm:text-lg">
              <p>{subtitle}</p>
              <p>{body}</p>
            </div>

            <p className="mt-8 text-base font-semibold text-neutral-900 sm:text-lg">
              {emphasis}
            </p>

            <p className="mt-3 text-sm text-neutral-600">
              You do not need to guess. You need a compass.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
