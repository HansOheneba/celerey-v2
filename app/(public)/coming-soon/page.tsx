"use client";

import * as React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Instagram, Linkedin } from "lucide-react";

type SocialLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

export default function ComingSoonPage() {
  const [email, setEmail] = React.useState<string>("");
  const [submitted, setSubmitted] = React.useState<boolean>(false);

  const socials: SocialLink[] = [
    {
      href: "https://www.linkedin.com/company/celerey",
      label: "LinkedIn",
      icon: <Linkedin className="h-4 w-4" />,
    },
  
    {
      href: "https://www.instagram.com/celerey.co/",
      label: "Instagram",
      icon: <Instagram className="h-4 w-4" />,
    },
  ];

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // TODO: Replace with your real endpoint (Mailchimp, ConvertKit, DB, etc.)
    if (!email.trim()) return;

    setSubmitted(true);
    setEmail("");
  }

  return (
    <main className="flex min-h-[calc(100vh-160px)] items-center bg-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_520px] lg:items-center">
          {/* Left: copy + form */}
          <section className="max-w-2xl">
           

            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
              Coming Soon
            </h1>

            <p className="mt-5 text-base leading-7 text-neutral-700 sm:text-lg">
              We are redesigning the Celerey dashboard to make it clearer,
              faster, and more useful. If you want a heads-up when it is ready,
              drop your email below.
            </p>

            <form onSubmit={onSubmit} className="mt-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  type="email"
                  className="h-11 sm:w-[340px]"
                  aria-label="Email address"
                />
                <Button type="submit" className="h-11 px-6">
                  Notify me
                </Button>
              </div>

              <p className="mt-3 text-sm text-neutral-500">
                We only use this to send the launch update.
              </p>

              {submitted ? (
                <p className="mt-4 text-sm font-medium text-emerald-700">
                  Thanks. You are on the list.
                </p>
              ) : null}
            </form>

            <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-neutral-600">
              <span className="font-medium text-neutral-800">
                Want to talk?
              </span>
              <Link
                href="/contact"
                className="underline underline-offset-4 hover:text-neutral-900"
              >
                Contact us
              </Link>
              <span className="text-neutral-300">•</span>
              <Link
                href="/pricing"
                className="underline underline-offset-4 hover:text-neutral-900"
              >
                View pricing
              </Link>
            </div>
          </section>

          <aside className="relative overflow-hidden rounded-[28px] border border-black/5 shadow-[0_28px_90px_rgba(0,0,0,0.14)]">
            {/* Deep navy-purple gradient */}
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#070A1E_0%,#141046_42%,#2A1B6D_74%,#3A2BAA_100%)]" />

            {/* Subtle glows */}
            <div className="pointer-events-none absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.12),transparent_55%)]" />
            <div className="pointer-events-none absolute inset-0 opacity-75 bg-[radial-gradient(circle_at_75%_35%,rgba(99,102,241,0.18),transparent_58%)]" />
            <div className="pointer-events-none absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_55%_90%,rgba(168,85,247,0.16),transparent_55%)]" />

            {/* Minimal content */}
            <div className="relative flex min-h-[420px] flex-col items-center justify-center px-10 py-14 text-center text-white sm:min-h-[520px]">
              {/* Thin top “status” line */}
              <p className="text-xs uppercase tracking-[0.28em] text-white/65">
                Dashboard redesign in progress
              </p>

              {/* Headline */}
              <h2 className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">
                We are building a cleaner dashboard experience
              </h2>

              {/* Supporting copy */}
              <p className="mt-4 max-w-md text-sm leading-6 text-white/75 sm:text-base sm:leading-7">
                A calmer layout, smoother navigation, and better context,
                designed to help you make confident decisions.
              </p>

              {/* Minimal divider */}
              <div className="mt-10 h-px w-24 bg-white/20" />

              {/* Socials */}
              <p className="mt-10 text-sm font-medium text-white/85">
                Connect with us
              </p>
              <div className="mt-4 flex items-center justify-center gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/18 bg-white/10 text-white/90 backdrop-blur-md transition hover:bg-white/14 hover:border-white/25"
                    aria-label={s.label}
                    title={s.label}
                  >
                    <span className="transition-transform group-hover:scale-[1.05]">
                      {s.icon}
                    </span>
                  </a>
                ))}
              </div>

              {/* Subtle bottom fade */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(to_top,rgba(0,0,0,0.20),transparent)]" />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
