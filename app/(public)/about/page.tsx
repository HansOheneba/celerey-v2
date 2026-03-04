"use client";

import Image from "next/image";
import { motion } from "framer-motion";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fbfaf8]">
      {/* Subtle paper wash */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(26,24,86,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_28%,rgba(176,125,61,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.00),rgba(0,0,0,0.02))]" />
      </div>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center">
    

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.04 }}
            className="mt-8 font-serif font-thin text-4xl leading-[1.22] text-neutral-900 sm:text-5xl sm:leading-[1.22]"
          >
            Building the infrastructure that allows individuals everywhere to
            make better financial decisions and build enduring wealth.
          </motion.h1>

          <div className="mx-auto mt-10 h-px w-24 bg-neutral-900/10" />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.14 }}
            className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base"
          >
            Celerey is a private advisory experience designed for people who
            want their financial life to feel calm, intentional, and properly
            governed, without noise, pressure, or complexity.
          </motion.p>
        </div>

        {/* Hero image + short pull quote */}
        <div className="mx-auto mt-12 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className={cn(
              "relative overflow-hidden rounded-[28px] border border-black/10 bg-white",
              "shadow-[0_22px_70px_rgba(0,0,0,0.08)]",
            )}
          >
            <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
              {/* Replace with your own /public image when ready */}
              <Image
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="A calm, structured approach to wealth"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 960px, 100vw"
                priority={false}
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(26,24,86,0.55),rgba(0,0,0,0.05)_55%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(255,255,255,0.20),transparent_60%)]" />
            </div>

            <div className="grid gap-4 px-7 py-7 sm:grid-cols-[1.3fr_0.7fr] sm:items-end sm:px-10">
              <p className="text-sm leading-7 text-neutral-700">
                We are building a calmer standard of financial decision-making:
                less noise, more governance, and a clearer line from intent to
                execution.
              </p>

              <p className="sm:text-right text-xs leading-6 text-neutral-500">
                Discretion • Structure • Clarity
                <span className="mx-2 text-neutral-300">•</span>
                <span className="text-[#b07d3d]">Stewardship</span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Body */}
        <div className="mx-auto mt-14 grid max-w-5xl gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left narrative */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div className="rounded-[26px] border border-black/10 bg-white/70 p-9 sm:p-10 shadow-[0_18px_55px_rgba(0,0,0,0.06)]">
              <h2 className="font-serif text-2xl text-neutral-900">
                A quieter way to manage wealth
              </h2>

              <div className="mt-6 space-y-5">
                <p className="text-sm leading-7 text-neutral-700 sm:text-base">
                  Most financial decisions are not difficult because the options
                  are unclear. They are difficult because life is busy,
                  priorities compete, and good structure rarely exists at the
                  moment it is needed.
                </p>

                <p className="text-sm leading-7 text-neutral-700 sm:text-base">
                  Celerey exists to bring order. We help you define what
                  matters, capture the right information, and make decisions
                  with a level of discipline that protects both lifestyle and
                  long-term outcomes.
                </p>
              </div>

              <div className="mt-8 h-px w-full bg-black/10" />

              <p className="mt-8 text-sm leading-7 text-neutral-700 sm:text-base">
                We combine internationally informed advisory standards with a
                modern system for visibility and follow-through. The result is a
                service that feels private, composed, and genuinely useful.
              </p>

              {/* Small “what we do” bullets (adds rhythm without being tacky) */}
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Reduce noise and clarify trade-offs",
                  "Turn goals into governed plans",
                  "Protect downside before chasing upside",
                  "Create follow-through that actually sticks",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-black/10 bg-white/60 px-4 py-3"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#b07d3d]" />
                    <p className="text-sm leading-6 text-neutral-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right principles */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.03 }}
            className="lg:col-span-5"
          >
            <div className="rounded-[26px] border border-black/10 bg-white p-9 sm:p-10 shadow-[0_18px_55px_rgba(0,0,0,0.05)]">
              <p className="text-[11px] tracking-[0.22em] text-[#b07d3d]">
                OUR PRINCIPLES
              </p>

              <ul className="mt-8 space-y-7">
                {[
                  {
                    title: "Discretion",
                    desc: "Your financial life is handled with care, privacy, and restraint.",
                  },
                  {
                    title: "Structure",
                    desc: "We turn goals into plans, and plans into repeatable decisions.",
                  },
                  {
                    title: "Clarity",
                    desc: "We reduce noise and focus attention on what moves outcomes.",
                  },
                  {
                    title: "Stewardship",
                    desc: "We preserve and grow wealth through responsible decisions, not urgency.",
                  },
                ].map((p) => (
                  <li key={p.title}>
                    <div className="flex items-start gap-4">
                      <span className="mt-2 h-2 w-2 rounded-full bg-[#1a1856]/25 ring-2 ring-[#b07d3d]/35" />
                      <div>
                        <p className="font-serif text-lg text-neutral-900">
                          {p.title}
                        </p>
                        <p className="mt-2 text-sm leading-7 text-neutral-600">
                          {p.desc}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-9 h-px w-full bg-black/10" />

              <p className="mt-7 text-sm leading-7 text-neutral-600">
                We keep the experience calm and high-signal, so decisions feel
                considered and execution stays consistent.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Advisory + credibility */}
        <div className="mx-auto mt-12 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="rounded-[26px] border border-black/10 bg-white/70 p-9 sm:p-10 shadow-[0_18px_55px_rgba(0,0,0,0.06)]"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="font-serif text-2xl text-neutral-900">
                Internationally informed, locally grounded
              </h2>

              <p className="text-xs tracking-[0.22em] text-neutral-500">
                GOVERNANCE-FIRST ADVISORY
              </p>
            </div>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-neutral-700 sm:text-base">
              Our advisory team brings experience across wealth management,
              banking, investment strategy, tax planning, property, leadership,
              and governance. Celerey is built to support individuals, families,
              and founders who want a more deliberate standard of guidance.
            </p>

            <div className="mt-8 h-px w-full bg-black/10" />

            <p className="mt-8 max-w-3xl text-sm leading-7 text-neutral-700 sm:text-base">
              Whether you choose membership for long-term structure, or engage
              us privately for a specific decision, the work is always the same:
              to protect the downside, clarify the path, and ensure you remain
              in control.
            </p>
          </motion.div>
        </div>

        {/* Bottom note */}
        <div className="mx-auto mt-14 max-w-4xl text-center">
          <p className="font-serif font-thin text-2xl leading-[1.4] text-neutral-900 sm:text-3xl">
            Wealth should feel steady.
            <br className="hidden sm:block" />
            Your decisions should feel considered.
          </p>

          <div className="mx-auto mt-10 h-px w-24 bg-neutral-900/10" />
        </div>
      </section>
    </main>
  );
}
