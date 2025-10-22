"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Header() {
  const [open, setOpen] = React.useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Advisors", href: "/advisors" },
    { name: "Plans", href: "/plans" },
    { name: "Insights", href: "/insights" },
    { name: "Execution", href: "/execution" },
    { name: "Partners", href: "/partners" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-sm bg-transparent">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logos/logoWhite.png"
            alt="Celerey Logo"
            width={110}
            height={10}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* CTA Button (Desktop) */}
        <div className="hidden md:block">
          <Button
            asChild
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 rounded-2xl"
          >
            <Link href="/free-scan">Start Your Free Wealth Scan</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white/95 backdrop-blur-lg">
              {/* Add SheetTitle for accessibility - visually hidden but available to screen readers */}
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

              <div className="flex flex-col space-y-6 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-gray-800 font-medium text-lg hover:text-blue-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                <Button
                  asChild
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full mt-4"
                >
                  <Link href="/free-scan" onClick={() => setOpen(false)}>
                    Start Free Scan
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
