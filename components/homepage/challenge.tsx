"use client";

import { motion } from "framer-motion";
import LottiePlayer from "./lottieplayer";
import declutterAnimation from "@/lottie/declutter.json";

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
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* LEFT: text */}
          <motion.div
            className="order-2 lg:order-1 max-w-3xl"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="text-[11px] sm:text-xs tracking-[0.22em] text-neutral-600/80">
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
          </motion.div>

          {/* RIGHT: lottie */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
            className="mx-auto w-full max-w-[520px] lg:mx-0 flex items-center justify-center"
          >
            <div className="aspect-square w-56 sm:w-72 md:w-96 rounded-full border border-black/10 bg-white/60 p-4 sm:p-6 shadow-[0_30px_80px_rgba(0,0,0,0.08)] backdrop-blur-sm flex items-center justify-center">
              <div className="opacity-90 w-full h-full flex items-center justify-center">
                <LottiePlayer
                  animationData={declutterAnimation}
                  className="h-full w-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
