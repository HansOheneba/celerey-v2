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
  const [mounted, setMounted] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    setMounted(true);

    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateHeader = () => {
      const currentScrollY = window.scrollY;
      setVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setIsScrolled(currentScrollY > 50);
      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateHeader(); // initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Advisors", href: "/advisors" },
    { name: "Subscribe", href: "/subscribe" },
    { name: "Insights", href: "/insights" },
    { name: "Execution Partners", href: "/partners" },
    { name: "Contact", href: "/contact" },
  ];

  const handleScrollToWealthHealth = () => {
    const el = document.getElementById("wealth-scan");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
  };

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 
        transition-all duration-500 ease-in-out
        ${visible ? "translate-y-0" : "-translate-y-full"}
        ${
          isScrolled
            ? "bg-black/40 backdrop-blur-sm py-2"
            : "bg-black/40 backdrop-blur-sm py-6"
        }
      `}
      style={{ willChange: "transform" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center transition-opacity duration-300 hover:opacity-80"
        >
          <Image
            src="/logos/logoWhite.png"
            alt="Celerey Logo"
            width={110}
            height={30}
            priority
            className="w-20 md:w-[110px] h-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-white/90 hover:text-white transition-all duration-300 relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button onClick={handleScrollToWealthHealth}
          className="cursor-pointer">
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
                className="text-white hover:bg-white/10 rounded-full p-2 transition-all duration-300 hover:scale-110"
              >
                <Menu className="h-7 w-7" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="top"
              className="
                bg-white text-gray-800 
                fixed inset-0 
                data-[state=open]:animate-in 
                data-[state=open]:slide-in-from-top 
                data-[state=closed]:animate-out 
                data-[state=closed]:slide-out-to-top 
                duration-500
                p-8
                border-0
                h-screen
              "
            >
              <div className="flex justify-between items-center mb-12">
                <Image
                  src="/logos/logoDark.png"
                  alt="Celerey Logo"
                  width={110}
                  height={30}
                />
                <SheetClose asChild>
                  <button className="p-2 rounded-full hover:bg-gray-200 transition-all duration-300">
                    <X className="h-6 w-6 text-gray-700" />
                  </button>
                </SheetClose>
              </div>

              <SheetTitle className="sr-only">Navigation</SheetTitle>

              {/* Mobile nav links */}
              <nav className="flex flex-col space-y-6 text-lg font-medium">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-gray-800 hover:text-blue-600 transition-all duration-300 py-2 border-b border-gray-100"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Mobile CTA */}
              <div className="pt-10">
                <Button onClick={handleScrollToWealthHealth} className="w-full">
                  Start Your Free Financial Health Scan
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
