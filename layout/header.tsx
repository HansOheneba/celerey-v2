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
    { name: "Plans", href: "#" },
    { name: "Insights", href: "#" },
    { name: "Execution", href: "#" },
    { name: "Partners", href: "#" },
    { name: "Contact", href: "#" },
  ];

  const handleScrollToWealthHealth = () => {
    const el = document.getElementById("wealth-scan");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logos/logoWhite.png"
            alt="Celerey Logo"
            width={110}
            height={20}
            priority
            className="w-20 h-auto md:w-[110px]"
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
            onClick={handleScrollToWealthHealth}
            className="bg-blue-900 hover:bg-blue-800 text-white font-semibold px-5 py-2 rounded-full text-sm"
          >
            Start Your Free Financial Health Scan
          </Button>
        </div>

        {/* Mobile Menu */}
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

            {/* Fullscreen Mobile Menu */}
            <SheetContent
              side="top"
              className={`
                fixed inset-0 
                bg-white text-gray-800 
                backdrop-blur-2xl 
                transition-all duration-300 ease-in-out
                data-[state=open]:translate-y-0 
                data-[state=closed]:-translate-y-full
                flex flex-col justify-between p-8
              `}
            >
              <div>
                {/* Header */}
                <div className="flex justify-between items-center mb-12">
                  <Image
                    src="/logos/logoDark.png"
                    alt="Celerey Logo"
                    width={110}
                    height={30}
                    priority
                  />
                  <SheetClose asChild>
                    <button className="p-2 rounded-full hover:bg-gray-200 transition">
                      <X className="h-6 w-6 text-gray-700" />
                    </button>
                  </SheetClose>
                </div>

                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

                {/* Navigation Links */}
                <nav className="flex flex-col space-y-6 text-lg font-medium">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* CTA Button */}
              <div className="pt-8">
                <Button
                  onClick={handleScrollToWealthHealth}
                  asChild
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full py-3 rounded-full text-base"
                >
                  <Link href="#" onClick={() => setOpen(false)}>
                    Start Your Free Financial Health Scan
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
