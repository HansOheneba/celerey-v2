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
import { Menu, X, ChevronDown } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { BeginJourneyModal } from "@/components/homepage/beginModal";

type NavItem =
  | { name: string; href: string; type?: "link" }
  | {
      name: string;
      href: string;
      type: "dropdown";
      children: { name: string; href: string }[];
    };

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  // ✅ ALL hooks must be declared before any early return
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const [modalOpen, setModalOpen] = React.useState(false);

  // Resources dropdown state
  const [resourcesOpen, setResourcesOpen] = React.useState(false);
  const closeTimerRef = React.useRef<number | null>(null);

  const resourcesChildren = React.useMemo(
    () => [
      { name: "Insights", href: "/resources/insights" },
      { name: "Stories", href: "/resources/stories" },
      { name: "Podcasts", href: "/resources/podcasts" },
    ],
    []
  );

  const navigation: NavItem[] = React.useMemo(
    () => [
      { name: "Philosophy", href: "#challenge", type: "link" },
      { name: "Pricing", href: "#entry-pricing", type: "link" },
      { name: "Services", href: "#ala-carte", type: "link" },
      { name: "Advisors", href: "/advisors", type: "link" },
      {
        name: "Resources",
        href: "/resources",
        type: "dropdown",
        children: resourcesChildren,
      },
      { name: "Health Scan", href: "#wealth-scan", type: "link" },
    ],
    [resourcesChildren]
  );

  const openResources = React.useCallback(() => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    setResourcesOpen(true);
  }, []);

  const closeResources = React.useCallback(() => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => setResourcesOpen(false), 120);
  }, []);

  // Close dropdown on route change (cleanup)
  React.useEffect(() => {
    setResourcesOpen(false);
  }, [pathname]);

  // Mount + scroll behavior
  React.useEffect(() => {
    setMounted(true);

    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateHeader = () => {
      const currentScrollY = window.scrollY;
      const nextVisible = currentScrollY < lastScrollY || currentScrollY < 100;

      setVisible(nextVisible);
      setIsScrolled(currentScrollY > 50);

      // ✅ if header hides, close dropdown
      if (!nextVisible) setResourcesOpen(false);

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
    updateHeader();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Handle pending hash after routing to "/"
  const scrollToId = (id: string) => {
    let tries = 0;
    const maxTries = 30; // ~30 * 50ms = 1.5s

    const tick = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      tries += 1;
      if (tries < maxTries) window.setTimeout(tick, 50);
    };

    tick();
  };

  React.useEffect(() => {
    if (pathname !== "/") return;

    const stored = window.sessionStorage.getItem("scrollToId");
    if (!stored) return;

    window.sessionStorage.removeItem("scrollToId");
    scrollToId(stored);
  }, [pathname]);

  // helper to scroll or navigate to an id
  const navigateToHash = (rawHref: string, closeSheet?: boolean) => {
    const href = rawHref.startsWith("#") ? rawHref : `#${rawHref}`;
    const id = href.replace(/^#/, "");
    const isHome = pathname === "/";

    if (isHome) {
      scrollToId(id);
    } else {
      window.sessionStorage.setItem("scrollToId", id);
      router.push(`/#${id}`);
    }

    if (closeSheet) setOpen(false);
  };

  const handleScrollToPricing = () => navigateToHash("#entry-pricing");

  // ✅ early return AFTER all hooks
  if (!mounted) return null;

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-500 ease-in-out
        ${visible ? "translate-y-0 pointer-events-auto" : "-translate-y-full pointer-events-none"}
        ${isScrolled ? "bg-black/40 backdrop-blur-sm py-2" : "bg-black/40 backdrop-blur-sm py-6"}
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
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => {
            const linkClass =
              "text-sm font-normal text-white/90 hover:text-white transition-all duration-300 relative";

            // Dropdown (Resources)
            if (item.type === "dropdown") {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <div key={item.name} className="relative">
                  <Link
                    href={item.href}
                    onMouseEnter={openResources}
                    onMouseLeave={closeResources}
                    className={`${linkClass} inline-flex items-center gap-1`}
                    aria-haspopup="menu"
                    aria-expanded={resourcesOpen}
                  >
                    {item.name}
                    <ChevronDown
                      className={[
                        "h-4 w-4 opacity-80 transition-transform duration-200",
                        resourcesOpen ? "rotate-180" : "",
                      ].join(" ")}
                    />
                    {/* underline */}
                    <span
                      className={[
                        "absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300",
                        isActive ? "w-full" : "w-0 hover:w-full",
                      ].join(" ")}
                    />
                  </Link>

                  <div
                    onMouseEnter={openResources}
                    onMouseLeave={closeResources}
                    className={[
                      "absolute left-0 top-full mt-3 min-w-[220px]",
                      "rounded-xl border border-white/10 bg-black/80 backdrop-blur-md shadow-xl p-2",
                      "transition-all duration-200",
                      resourcesOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-2 pointer-events-none",
                    ].join(" ")}
                  >
                    {item.children.map((child) => {
                      const childActive = pathname === child.href;
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={[
                            "block rounded-lg px-3 py-2 text-sm transition-colors",
                            childActive
                              ? "bg-white/10 text-white"
                              : "text-white/90 hover:bg-white/10 hover:text-white",
                          ].join(" ")}
                          onClick={() => setResourcesOpen(false)}
                        >
                          {child.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            }

            const isAnchor = item.href.startsWith("#");

            if (isAnchor) {
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToHash(item.href);
                  }}
                  className={linkClass}
                >
                  {item.name}
                </a>
              );
            }

            return (
              <Link key={item.name} href={item.href} className={linkClass}>
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            onClick={handleScrollToPricing}
            className="h-10 px-4 text-sm cursor-pointer"
          >
            Start with $100
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

              <nav className="flex flex-col space-y-2 text-lg font-medium">
                {navigation.map((item) => {
                  const isAnchor = item.href.startsWith("#");

                  if (item.type === "dropdown") {
                    return (
                      <div key={item.name} className="pt-2">
                        <button
                          type="button"
                          onClick={() => router.push(item.href)}
                          className="w-full text-left text-gray-800 hover:text-blue-600 transition-all duration-300 py-2 border-b border-gray-100"
                        >
                          {item.name}
                        </button>

                        <div className="mt-2 ml-4 flex flex-col">
                          {item.children.map((child) => (
                            <button
                              key={child.href}
                              type="button"
                              onClick={() => {
                                setOpen(false);
                                router.push(child.href);
                              }}
                              className="text-left text-base text-gray-600 hover:text-blue-600 transition-all duration-300 py-2 border-b border-gray-50"
                            >
                              {child.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        if (isAnchor) {
                          navigateToHash(item.href, true);
                        } else {
                          setOpen(false);
                          router.push(item.href);
                        }
                      }}
                      className="text-gray-800 hover:text-blue-600 transition-all duration-300 py-2 border-b border-gray-100"
                    >
                      {item.name}
                    </a>
                  );
                })}
              </nav>

              <div className="pt-6 space-y-3">
                <Button onClick={handleScrollToPricing} className="w-full">
                  Start — $100
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <BeginJourneyModal open={modalOpen} onOpenChange={setModalOpen} />
    </header>
  );
}