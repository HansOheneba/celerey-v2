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
  SheetClose,
} from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

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
    <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-transparent">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logos/logoWhite.png"
            alt="Celerey Logo"
            width={120}
            height={30}
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
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 rounded-full transition-all"
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
                className="text-white hover:bg-white/10 rounded-full p-2"
              >
                <Menu className="h-7 w-7" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-white/95 backdrop-blur-md p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-8">
                  <Image
                    src="/logos/logoDark.png"
                    alt="Celerey Logo"
                    width={110}
                    height={30}
                  />
                  <SheetClose asChild>
                    <button className="p-2 rounded-full hover:bg-gray-200">
                      <X className="h-6 w-6 text-gray-700" />
                    </button>
                  </SheetClose>
                </div>

                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

                <nav className="flex flex-col space-y-4">
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
                </nav>
              </div>

              <div className="pt-8">
                <Button
                  asChild
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full py-3 rounded-full"
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
