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

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "Celerey Ecosystem",
      links: [
        { href: "/wealth", label: "Wealth Management" },
        { href: "/career", label: "Career Navigation" },
        { href: "/tools", label: "Investment Tools" },
        { href: "/advisors", label: "Advisory Services" },
      ],
    },
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
        { href: "/careers", label: "Careers" },
        { href: "/insights", label: "Resources" },
      ],
    },
  ];

  return (
    <footer className="bg-[#0B0B0B] text-white/80 py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logos/logoWhite.png"
                alt="Celerey Logo"
                width={150}
                height={45}
                priority
              />
            </Link>
            <p className="text-sm text-white/70 max-w-sm">
              Empowering you to turn income into strategy through expert
              guidance and smart tools.
            </p>

            <div className="mt-6 flex space-x-4">
              <Link
                href="https://www.linkedin.com/company/celerey"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Desktop Columns */}
          {sections.map((sec) => (
            <div key={sec.title}>
              <h3 className="text-white font-semibold text-lg mb-4">
                {sec.title}
              </h3>
              <ul className="space-y-2 text-sm">
                {sec.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="hover:text-blue-400 transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile Accordion */}
        <div className="md:hidden mb-16">
          <Accordion type="single" collapsible>
            {/* Brand Section */}
            <AccordionItem value="brand">
              <AccordionTrigger className="text-white font-medium">
                Celerey
              </AccordionTrigger>
              <AccordionContent>
                <div className="py-4 space-y-4">
                  <Image
                    src="/logos/logoWhite.png"
                    alt="Celerey Logo"
                    width={120}
                    height={40}
                  />
                  <p className="text-sm text-white/70">
                    Empowering you through expert guidance and smart tools.
                  </p>
                  <div className="flex space-x-4 pt-2">
                    <Link
                      href="https://www.linkedin.com/company/celerey"
                      target="_blank"
                      className="hover:text-blue-500"
                    >
                      <Linkedin className="h-6 w-6" />
                    </Link>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Sections */}
            {sections.map((sec, index) => (
              <AccordionItem key={index} value={`sec-${index}`}>
                <AccordionTrigger className="text-white font-medium flex justify-between items-center">
                  {sec.title}
                  <svg
                    className="h-5 w-5 transition-transform duration-300 accordion-chevron"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                  </svg>
                </AccordionTrigger>

                <AccordionContent>
                  <ul className="space-y-2 text-sm py-2">
                    {sec.links.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          className="hover:text-blue-400 transition-colors block"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* New Minimal CTA - Squarespace Style */}
        <div className="mt-10 bg-white/5 border border-white/10 rounded-3xl p-8 text-center backdrop-blur-sm">
          <h4 className="text-2xl font-semibold text-white mb-3">
            Discover{" "}
            <span className="text-white/90 underline decoration-white/20">
              The Compass
            </span>
          </h4>
          <p className="text-white/60 text-sm max-w-lg mx-auto mb-4">
            Your personalized roadmap for navigating career growth with clarity.
          </p>
          <Link
            href="/compass"
            className="inline-block px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white/90 text-sm font-medium"
          >
            Learn More
          </Link>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-white/60 space-y-2">
          <p>© {currentYear} Celerey. All rights reserved.</p>
          <div className="space-x-4">
            <Link href="/terms" className="hover:text-blue-400">
              Terms of Service
            </Link>
            <span className="text-white/40">|</span>
            <Link href="/privacy" className="hover:text-blue-400">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
