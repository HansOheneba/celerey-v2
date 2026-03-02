"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin } from "lucide-react";
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
        { href: "/tools", label: "Explore All Tools" },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "/about", label: "Who we are" },
        { href: "/advisors", label: "Our Advisors" },
        { href: "/insights", label: "Resources" },
      ],
    },
    {
      title: "Support",
      links: [
        { href: "/contact", label: "Help & Support" },
        { href: "/faqs", label: "FAQs" },
        { href: "/privacy", label: "Privacy Policy" },
        { href: "/terms", label: "Terms of Service" },
      ],
    },
  ];

  return (
    <div className="w-full bg-white flex">
      <footer className="relative overflow-hidden bg-[#1a1856] py-20 text-white m-5 rounded-2xl mx-auto w-full max-w-[98vw] px-6 md:px-10 lg:px-16">
        {/* Deep background wash (page color behind the bubble) */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_15%,rgba(255,255,255,0.08),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(59,130,246,0.14),transparent_60%)]" />

        <div className="relative mx-auto max-w-7xl px-6">
          {/* Floating bubble container */}
          <div className="relative overflow-hidden">
            {/* inner soft sheen */}

            <div className="relative px-8 py-14 sm:px-12">
              {/* Top CTA row (matches reference) */}
              <div className="text-center">
                <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Let’s get started on something great
                </h3>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
                  Get clarity on your finances and take your next step with
                  confidence.
                </p>

                <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link
                    href="/contact"
                    className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-transparent px-6 text-sm font-medium text-white/90 transition hover:border-white/25 hover:bg-white/5"
                  >
                    Chat to us
                  </Link>
                  <Link
                    href="/compass"
                    className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-[#050816] transition hover:bg-white/90"
                  >
                    Get started
                  </Link>
                </div>
              </div>

              {/* Divider */}
              <div className="mt-12 h-px w-full bg-white/10" />

              {/* Links grid */}
              <div className="mt-10 hidden gap-10 md:grid md:grid-cols-5">
                {/* Brand column */}
                <div className="md:col-span-1">
                  <Link href="/" className="inline-flex items-center gap-3">
                    <Image
                      src="/logos/logoWhite.png"
                      alt="Celerey Logo"
                      width={140}
                      height={44}
                      priority
                    />
                  </Link>

                  <p className="mt-4 text-sm leading-relaxed text-white/65">
                    Democratizing financial guidance through simple tools and
                    expert advice.
                  </p>

                  <div className="mt-6 flex items-center gap-3">
                    <Link
                      href="https://www.linkedin.com/company/celerey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/80 transition hover:border-white/20 hover:bg-white/10"
                      aria-label="Celerey on LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </Link>

                    <Link
                      href="https://wa.me/12272296921"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center justify-center rounded-full border border-white/12 bg-white/5 px-4 text-sm font-medium text-white/85 transition hover:border-white/20 hover:bg-white/10"
                    >
                      WhatsApp
                    </Link>
                  </div>
                </div>

                {/* Section columns */}
                {sections.map((sec) => (
                  <div key={sec.title}>
                    <h4 className="text-sm font-semibold text-white">
                      {sec.title}
                    </h4>
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

                {/* Legal column (to mimic reference having a separate column) */}
                <div>
                  <h4 className="text-sm font-semibold text-white">Legal</h4>
                  <ul className="mt-4 space-y-2 text-sm text-white/70">
                    <li>
                      <Link
                        href="/terms"
                        className="transition hover:text-white"
                      >
                        Terms
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/privacy"
                        className="transition hover:text-white"
                      >
                        Privacy
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Mobile accordion */}
              <div className="mt-10 md:hidden">
                <div className="flex items-center justify-between">
                  <Image
                    src="/logos/logoWhite.png"
                    alt="Celerey Logo"
                    width={120}
                    height={38}
                  />

                  <div className="flex items-center gap-3">
                    <Link
                      href="https://www.linkedin.com/company/celerey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/80"
                      aria-label="Celerey on LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </Link>
                    <Link
                      href="https://wa.me/12272296921"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center justify-center rounded-full border border-white/12 bg-white/5 px-4 text-sm font-medium text-white/85"
                    >
                      WhatsApp
                    </Link>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-white/65">
                  Turning income into strategy through guidance and simple
                  tools.
                </p>

                <Accordion type="single" collapsible className="mt-8">
                  {sections.map((sec, index) => (
                    <AccordionItem key={sec.title} value={`sec-${index}`}>
                      <AccordionTrigger className="text-white/90">
                        {sec.title}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 pb-2 text-sm text-white/70">
                          {sec.links.map((l) => (
                            <li key={l.href}>
                              <Link
                                href={l.href}
                                className="block py-1 transition hover:text-white"
                              >
                                {l.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}

                  <AccordionItem value="legal">
                    <AccordionTrigger className="text-white/90">
                      Legal
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 pb-2 text-sm text-white/70">
                        <li>
                          <Link
                            href="/terms"
                            className="block py-1 transition hover:text-white"
                          >
                            Terms
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/privacy"
                            className="block py-1 transition hover:text-white"
                          >
                            Privacy
                          </Link>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Bottom row */}
              <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/60 sm:flex-row">
                <p>© {currentYear} Celerey. All rights reserved.</p>
                <div className="flex items-center gap-4">
                  <Link href="/terms" className="transition hover:text-white">
                    Terms
                  </Link>
                  <span className="text-white/30">•</span>
                  <Link href="/privacy" className="transition hover:text-white">
                    Privacy
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* extra breathing room below bubble */}
          <div className="h-10" />
        </div>
      </footer>
    </div>
  );
}
