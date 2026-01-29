"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Community() {
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleScrollToWealthHealth = () => {
    const el = document.getElementById("entry-pricing");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subscribePromise = async () => {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/leads/`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "newsletter" }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to subscribe.");
      }

      return { email };
    };

    toast.promise(subscribePromise(), {
      loading: "Joining the Celerey community...",
      success: (data) => {
        setEmail("");
        return `Welcome! Updates will be sent to ${data.email}`;
      },
      error: (err) =>
        err instanceof Error ? err.message : "Failed to subscribe. Try again.",
      finally: () => setIsSubmitting(false),
    });
  };

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-20">
      {/* subtle page texture */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0.04),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-[11px] sm:text-xs tracking-[0.22em] text-neutral-600/80"
        >
          JOIN THE COMMUNITY
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-6 font-serif text-4xl leading-[1.06] text-neutral-900 sm:text-5xl md:text-6xl"
        >
          <span className="block">Build wealth with</span>
          <span className="block italic">confidence and intention</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ delay: 0.12, duration: 0.6 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-700 sm:text-lg"
        >
          You&apos;ve worked hard for what you have. Now it&apos;s time to ensure
          it works hard for you — with a community that shares the journey.
        </motion.p>

        {/* CTA row (email + button) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.12, duration: 0.6 }}
          className="mx-auto mt-10 max-w-2xl"
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-stretch justify-center gap-3 sm:flex-row"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
              className={[
                "h-12 flex-1 rounded-full bg-white px-5 text-sm text-neutral-900",
                "ring-1 ring-black/10 outline-none",
                "placeholder:text-neutral-500",
                "focus:ring-2 focus:ring-blue-600/40",
                "disabled:opacity-60",
              ].join(" ")}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 rounded-full px-7 text-white"
            >
              {isSubmitting ? "Joining..." : "Join Community"}
            </Button>
          </form>

          <p className="mt-4 text-xs text-neutral-500">
            No spam. Just insights, briefings, and updates. Unsubscribe anytime.
          </p>
        </motion.div>

        {/* Secondary CTA (optional) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ delay: 0.18, duration: 0.6 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button
          onClick={handleScrollToWealthHealth}
            asChild
            className="h-11 rounded-full "
          >
            <Link href="/#entry-pricing">Begin with $100</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="h-11 rounded-full border-black/10 bg-white/60 px-6 text-neutral-900 hover:bg-white"
          >
            <Link href="/advisors">Speak to an Advisor</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
