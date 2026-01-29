"use client";

import { motion } from "framer-motion";

type DeclutterVisualProps = {
  className?: string;
};

export default function DeclutterVisual({ className = "" }: DeclutterVisualProps) {
  const clutter = [
    { top: 26, left: 36, rot: -10, delay: 0.0 },
    { top: 56, left: 70, rot: 8, delay: 0.05 },
    { top: 86, left: 42, rot: -4, delay: 0.1 },
    { top: 40, left: 92, rot: 14, delay: 0.15 },
    { top: 106, left: 78, rot: -14, delay: 0.2 },
  ];

  return (
    <div className={["relative w-full max-w-[520px]", className].join(" ")}>
      <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white/40 p-6 shadow-[0_22px_60px_rgba(0,0,0,0.08)]">
        {/* soft wash */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.06),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(0,0,0,0.04),transparent_60%)]" />

        {/* clutter cards */}
        <div className="relative h-[320px]">
          {clutter.map((c, idx) => (
            <motion.div
              key={idx}
              className="absolute h-16 w-52 rounded-2xl border border-black/10 bg-white/70 backdrop-blur-sm"
              style={{ top: c.top, left: c.left, rotate: c.rot }}
              initial={{ opacity: 0, scale: 0.96, filter: "blur(0px)" }}
              animate={{
                opacity: [0, 1, 1, 0],
                x: [0, 0, 0, idx % 2 === 0 ? -120 : 140],
                y: [0, 0, 0, idx % 2 === 0 ? 60 : -40],
                scale: [0.96, 1, 1, 0.96],
                filter: ["blur(0px)", "blur(0px)", "blur(0px)", "blur(6px)"],
              }}
              transition={{
                duration: 3.8,
                delay: 0.2 + c.delay,
                times: [0, 0.18, 0.62, 1],
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 0.8,
              }}
            >
              <div className="flex h-full items-center gap-3 px-4">
                <div className="h-9 w-9 rounded-xl bg-black/10" />
                <div className="flex-1">
                  <div className="h-2 w-24 rounded bg-black/15" />
                  <div className="mt-2 h-2 w-16 rounded bg-black/10" />
                </div>
                <div className="h-7 w-10 rounded-full bg-black/10" />
              </div>
            </motion.div>
          ))}

          {/* the “clear plan” card */}
          <motion.div
            className="absolute left-1/2 top-1/2 w-[86%] max-w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-black/10 bg-white shadow-[0_28px_80px_rgba(0,0,0,0.12)]"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <div className="px-6 py-6">
              <div className="text-[10px] tracking-[0.24em] text-neutral-500">
                CLARITY
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div>
                  <div className="font-serif text-2xl text-neutral-900">
                    One clear plan
                  </div>
                  <div className="mt-1 text-sm text-neutral-600">
                    Structure • Perspective • Next steps
                  </div>
                </div>
                <div className="h-11 w-11 rounded-2xl bg-neutral-900/10" />
              </div>

              {/* “path” line */}
              <div className="mt-6 rounded-2xl bg-black/[0.03] p-4">
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <span>Today</span>
                  <span>Tomorrow</span>
                </div>

                <div className="relative mt-3 h-8">
                  <div className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-black/10" />
                  <motion.div
                    className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-neutral-900/40"
                    initial={{ width: "0%" }}
                    animate={{ width: ["0%", "100%"] }}
                    transition={{ duration: 2.1, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.2 }}
                  />
                  {[12, 50, 82].map((x, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white ring-2 ring-black/20"
                      style={{ left: `${x}%` }}
                      initial={{ scale: 0.9, opacity: 0.7 }}
                      animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 1.6, delay: i * 0.25, repeat: Infinity, ease: "easeInOut" }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-neutral-500">
        Less noise. More clarity.
      </p>
    </div>
  );
}
