"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B0B0B] text-white/80 py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        {/* Brand & summary */}
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
            Empowering you to turn income into strategy through expert guidance
            and smart tools.
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

        {/* Celerey Ecosystem */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">
            Celerey Ecosystem
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/wealth"
                className="hover:text-blue-400 transition-colors"
              >
                Wealth Management
              </Link>
            </li>
            <li>
              <Link
                href="/career"
                className="hover:text-blue-400 transition-colors"
              >
                Career Navigation
              </Link>
            </li>
            <li>
              <Link
                href="/tools"
                className="hover:text-blue-400 transition-colors"
              >
                Investment Tools
              </Link>
            </li>
            <li>
              <Link
                href="/advisors"
                className="hover:text-blue-400 transition-colors"
              >
                Advisory Services
              </Link>
            </li>
          </ul>
        </div>

        {/* Tools */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Tools</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/tools/budget-planner"
                className="hover:text-blue-400 transition-colors"
              >
                Budget Planner
              </Link>
            </li>
            <li>
              <Link
                href="/tools/money-manager"
                className="hover:text-blue-400 transition-colors"
              >
                Simple Money Manager
              </Link>
            </li>
            <li>
              <Link
                href="/tools/savings-calculator"
                className="hover:text-blue-400 transition-colors"
              >
                Savings Goals Calculator
              </Link>
            </li>
            <li>
              <Link
                href="/tools"
                className="hover:text-blue-400 transition-colors"
              >
                Explore All Tools
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/about"
                className="hover:text-blue-400 transition-colors"
              >
                Who we are
              </Link>
            </li>
            <li>
              <Link
                href="/careers"
                className="hover:text-blue-400 transition-colors"
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                href="/insights"
                className="hover:text-blue-400 transition-colors"
              >
                Resources
              </Link>
            </li>
    
          </ul>
        </div>
      </div>

      {/* The Compass CTA */}
      <div className="mt-16 text-center bg-white/5 py-8 rounded-2xl mx-6">
        <h4 className="text-xl font-semibold text-white mb-2">
          Explore <span className="text-blue-400">THE COMPASS</span> — Our
          Career Navigation Program
        </h4>
        <Link
          href="/compass"
          className="inline-block mt-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
        >
          Learn More →
        </Link>
      </div>

      {/* Footer bottom */}
      <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-white/60 space-y-2">
        <p>© {currentYear} Celerey. All rights reserved.</p>
        <div className="space-x-4">
          <Link href="/terms" className="hover:text-blue-400 transition-colors">
            Terms of Service
          </Link>
          <span className="text-white/40">|</span>
          <Link
            href="/privacy"
            className="hover:text-blue-400 transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
