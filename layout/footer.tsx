"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

type FooterLink = { href: string; label: string };

type FooterSection = {
  title: string;
  links: FooterLink[];
};

type FaqItem = {
  q: string;
  a: string;
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const sections: FooterSection[] = [
    {
      title: "Tools",
      links: [
        { href: "/tools/budget-planner", label: "Budget Planner" },
        { href: "/tools/money-manager", label: "Simple Money Manager" },
        {
          href: "/tools/savings-calculator",
          label: "Savings Goals Calculator",
        },
        { href: "/tools", label: "Explore all tools" },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "/about", label: "Who we are" },
        { href: "/advisors", label: "Our advisors" },
        { href: "/resources", label: "Resources" },
      ],
    },
    {
      title: "Support",
      links: [
        { href: "/contact", label: "Help & support" },
        { href: "/faqs", label: "FAQs" },
        { href: "/privacy", label: "Privacy policy" },
        { href: "/terms", label: "Terms of service" },
      ],
    },
  ];

  const faqs: FaqItem[] = [
    {
      q: "What is Celerey?",
      a: "Celerey is building a simpler way to access structured financial guidance, combining practical tools with support designed to improve decision-making.",
    },
    {
      q: "Is Celerey advice personalised?",
      a: "Celerey can provide guidance and structured frameworks. When personalised support is requested, we route you to the right workflow and advisor-led options.",
    },
    {
      q: "How do bookings work?",
      a: "You request a session, we confirm availability, and you receive the next steps by email. Session formats depend on the type of support you select.",
    },
    {
      q: "Where is Celerey available?",
      a: "Celerey is expanding. Availability can vary by service and jurisdiction. If something is not available yet, we will still offer tools and updates.",
    },
  ];

  return (
    <footer className="w-full bg-transparent">
      <div className="mx-auto w-full px-4">
        <div className="relative overflow-hidden rounded-2xl bg-[#1a1856] text-white shadow-[0_30px_110px_rgba(0,0,0,0.22)]">
          {/* Subtle wash */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,0.10),transparent_58%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_30%,rgba(99,102,241,0.18),transparent_55%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_55%_90%,rgba(168,85,247,0.14),transparent_55%)]" />

          {/* INNER: reduce empty space by making content occupy the width */}
          <div className="relative mx-auto w-full max-w-8xl px-6 py-14 sm:px-10 sm:py-16 lg:px-14">
            {/* Top row: CTA + quick actions (more like the reference layout) */}
           

            {/* Middle: Brand + Links + FAQ (fills space better) */}
            <div className="mt-12 grid gap-12 lg:grid-cols-[1.05fr_1fr_1.05fr] lg:items-start">
              {/* Brand */}
              <div className="max-w-sm">
                <Link href="/" className="inline-flex items-center gap-3">
                  <Image
                    src="/logos/logoWhite.png"
                    alt="Celerey Logo"
                    width={140}
                    height={44}
                    priority
                  />
                </Link>
                <p className="mt-4 text-sm leading-7 text-white/70 sm:text-base">
                  Democratizing financial guidance through simple tools and
                  expert advice. Start with a quick scan, explore tools, or talk
                  to our team when you need clarity.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href="/contact"
                    className="inline-flex h-11 items-center justify-center rounded-full border border-white/18 bg-transparent px-6 text-sm font-medium text-white/90 transition hover:border-white/28 hover:bg-white/5"
                  >
                    Chat with us
                  </Link>
                  <Link
                    href="/#wealth-scan"
                    className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-[#050816] transition hover:bg-white/90"
                  >
                    Take Free Financial Scan
                  </Link>
                </div>
              </div>

              {/* Links */}
              <div className="grid gap-10 sm:grid-cols-2">
                {sections.map((sec) => (
                  <div key={sec.title}>
                    <p className="text-[11px] tracking-[0.26em] text-white/70">
                      {sec.title.toUpperCase()}
                    </p>

                    <ul className="mt-4 space-y-2 text-sm text-white/70">
                      {sec.links.map((l) => (
                        <li key={l.href}>
                          <Link
                            href={l.href}
                            className="transition hover:text-white"
                          >
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <div>
                  <p className="text-[11px] tracking-[0.26em] text-white/70">
                    CONTACT
                  </p>

                  <div className="mt-4 space-y-2 text-sm text-white/75">
                    <p className="text-white/85">Celerey</p>
                    <p>
                      <Link
                        href="/contact"
                        className="underline underline-offset-4 hover:text-white"
                      >
                        Contact page
                      </Link>
                    </p>
                    <p>
                      <a
                        href="mailto:hello@celerey.co"
                        className="underline underline-offset-4 hover:text-white"
                      >
                        hello@celerey.co
                      </a>
                    </p>
                  </div>

                  <div className="mt-5 flex items-center gap-3">
                    <Link
                      href="https://www.linkedin.com/company/celerey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-white/6 text-white/85 transition hover:border-white/22 hover:bg-white/10"
                      aria-label="Celerey on LinkedIn"
                      title="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </Link>
                    <Link
                      href="https://www.instagram.com/celerey.co/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-white/6 text-white/85 transition hover:border-white/22 hover:bg-white/10"
                      aria-label="Celerey on Instagram"
                      title="Instagram"
                    >
                      <Instagram className="h-5 w-5" />
                    </Link>

                    <Link
                      href="https://wa.me/12272296921"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center justify-center rounded-full border border-white/14 bg-white/6 px-4 text-sm font-medium text-white/85 transition hover:border-white/22 hover:bg-white/10"
                      aria-label="Celerey on WhatsApp"
                      title="WhatsApp"
                    >
                      WhatsApp
                    </Link>
                  </div>
                </div>
              </div>

              {/* FAQ accordions (desktop) */}
              <div className="hidden lg:block">
                <p className="text-[11px] tracking-[0.26em] text-white/70">
                  QUICK FAQs
                </p>

                <Accordion type="single" collapsible className="mt-4">
                  {faqs.map((f, idx) => (
                    <AccordionItem key={f.q} value={`faq-${idx}`}>
                      <AccordionTrigger className="text-left text-white/90 hover:text-white">
                        {f.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm leading-7 text-white/70">
                        {f.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            {/* Mobile FAQ (keeps footer rich without feeling empty) */}
            <div className="mt-12 lg:hidden">
              <p className="text-[11px] tracking-[0.26em] text-white/70">
                QUICK FAQs
              </p>

              <Accordion type="single" collapsible className="mt-4">
                {faqs.map((f, idx) => (
                  <AccordionItem key={f.q} value={`faq-m-${idx}`}>
                    <AccordionTrigger className="text-left text-white/90 hover:text-white">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-7 text-white/70">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Bottom bar */}
            <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/60 sm:flex-row sm:items-center">
              <p>© {currentYear} Celerey. All rights reserved.</p>

              <div className="flex flex-wrap items-center gap-4">
                <Link href="/terms" className="transition hover:text-white">
                  Terms
                </Link>
                <span className="text-white/30">•</span>
                <Link href="/privacy" className="transition hover:text-white">
                  Privacy
                </Link>
                <span className="text-white/30">•</span>
                <Link href="/faqs" className="transition hover:text-white">
                  FAQs
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* tiny breathing room below footer block */}
        <div className="h-2" />
      </div>
    </footer>
  );
}
