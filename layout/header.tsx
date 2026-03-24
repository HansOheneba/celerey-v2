"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, X, ChevronDown } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { usePathname, useRouter } from "next/navigation";
import { BeginJourneyModal } from "@/components/homepage/beginModal";

type MegaKey = "services" | "company" | "resources";

type MegaLink = {
  name: string;
  href: string;
  description?: string;
};

type MegaSection = {
  heading: string;
  links: MegaLink[];
};

type MegaMenu = {
  key: MegaKey;
  label: string;
  href?: string;
  sections: MegaSection[];
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function isActivePath(pathname: string, href: string): boolean {
  if (pathname === "/") return false;
  const [pathOnly] = href.split("#");
  if (pathOnly === "/") return pathname === "/";
  return pathname === pathOnly || pathname.startsWith(`${pathOnly}/`);
}

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const [isHoveringNav, setIsHoveringNav] = React.useState(false);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [megaOpen, setMegaOpen] = React.useState<MegaKey | null>(null);
  const closeTimerRef = React.useRef<number | null>(null);

  React.useEffect(() => setMounted(true), []);

  // Scroll behavior
  React.useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateHeader = () => {
      const currentScrollY = window.scrollY;
      const nextVisible = currentScrollY < lastScrollY || currentScrollY < 100;

      setVisible(nextVisible);
      setIsScrolled(currentScrollY > 50);

      if (!nextVisible) setMegaOpen(null);

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

  React.useEffect(() => {
    setMegaOpen(null);
  }, [pathname]);

  React.useEffect(() => {
    return () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  const openMega = (key: MegaKey) => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    setMegaOpen(key);
    setIsHoveringNav(true);
  };

  const closeMegaSoon = () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      setMegaOpen(null);
      setIsHoveringNav(false);
    }, 140);
  };

  const megaMenus: MegaMenu[] = React.useMemo(
    () => [
      {
        key: "company",
        label: "Company",
        sections: [
          {
            heading: "About Celerey",
            links: [
              {
                name: "Who we are",
                href: "/about",
                description: "Principles, standards, and how we work",
              },
              {
                name: "Contact",
                href: "/contact",
                description: "Speak with the team",
              },
            ],
          },
          {
            heading: "People",
            links: [
              {
                name: "Our advisors",
                href: "/advisors",
                description: "Globally experienced, multi-discipline network",
              },
              {
                name: "FAQs",
                href: "/faqs",
                description: "How engagements and membership work",
              },
            ],
          },
        ],
      },
      {
        key: "services",
        label: "Engage",
        sections: [
          {
            heading: "Start here",
            links: [
              {
                name: "Financial Health Check",
                href: "/#wealth-scan",
                description:
                  "A fast scan that points you to the right next step",
              },
              {
                name: "Pricing",
                href: "/pricing",
                description: "Choose a coaching session or membership",
              },
              {
                name: "Free consultation",
                href: "/contact",
                description: "Talk through what you need before you commit",
              },
            ],
          },
          {
            heading: "Ways to work together",
            links: [
              {
                name: "Membership",
                href: "/pricing#entry-pricing",
                description: "Ongoing structure, reviews, and accountability",
              },
              {
                name: "Concierge services",
                href: "/services",
                description:
                  "Fixed-fee work for a specific decision or project",
              },
            ],
          },
        ],
      },
      {
        key: "resources",
        label: "Resources",
        href: "/resources",
        sections: [
          {
            heading: "Read and listen",
            links: [
              {
                name: "Insights",
                href: "/resources/insights",
                description: "Market outlooks, frameworks, and deep dives",
              },
              {
                name: "Stories",
                href: "/resources/stories",
                description: "Practical guidance, explained simply",
              },
              {
                name: "Podcasts",
                href: "/resources/podcasts",
                description: "Conversations on discipline and decision-making",
              },
            ],
          },
          {
            heading: "Tools",
            links: [
              {
                name: "Tools overview",
                href: "/tools",
                description: "Simple tools that build better habits",
              },
              {
                name: "Budget planner",
                href: "/tools/budget-planner",
                description: "A clear starting point for control",
              },
            ],
          },
        ],
      },
    ],
    [],
  );

  if (!mounted) return null;

  const isOnHome = pathname === "/";
  const isActiveHeader = !isOnHome || isScrolled || isHoveringNav;

  const headerBg = isActiveHeader
    ? "bg-white/95 backdrop-blur-xl py-3 shadow-sm"
    : "bg-transparent py-3";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
        isActiveHeader ? "text-black" : "text-white",
        visible
          ? "pointer-events-auto"
          : "-translate-y-full pointer-events-none",
        headerBg,
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={
              isActiveHeader ? "/logos/logoDark.png" : "/logos/logoWhite.png"
            }
            alt="Celerey Logo"
            width={90}
            height={20}
            priority
            className="h-auto w-20 md:w-[90px]"
          />
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-7 md:flex"
          onMouseLeave={closeMegaSoon}
        >
          {megaMenus.map((m) => {
            const isOpen = megaOpen === m.key;

            return (
              <div key={m.key} className="relative">
                <button
                  onMouseEnter={() => openMega(m.key as MegaKey)}
                  className={cn(
                    "group inline-flex items-center gap-1 text-sm transition",
                    isActiveHeader
                      ? "text-black/80 hover:text-black"
                      : "text-white/90 hover:text-white",
                  )}
                >
                  {m.label}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>

                {/* Mega menu */}
                <div
                  onMouseEnter={() => openMega(m.key as MegaKey)}
                  className={cn(
                    "absolute left-1/2 top-full mt-4 -translate-x-1/2 w-[700px]",
                    "rounded-[20px] bg-white text-black",
                    "transition-all duration-200",
                    isOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2 pointer-events-none",
                  )}
                >
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 p-6">
                    {m.sections.map((sec) => (
                      <div key={sec.heading}>
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                          {sec.heading}
                        </p>
                        <div className="space-y-1">
                          {sec.links.map((l) => (
                            <Link
                              key={l.href}
                              href={l.href}
                              className={cn(
                                "group flex flex-col rounded-xl px-3 py-2.5 transition-colors hover:bg-gray-50",
                                isActivePath(pathname, l.href) && "bg-gray-50",
                              )}
                            >
                              <span className="text-sm font-medium text-gray-900 group-hover:text-black">
                                {l.name}
                              </span>
                              {l.description && (
                                <span className="mt-0.5 text-xs leading-snug text-gray-400">
                                  {l.description}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          <button
            onClick={() => router.push("/#wealth-scan")}
            className={cn(
              "text-sm",
              isActiveHeader
                ? "text-black/80 hover:text-black"
                : "text-white/90 hover:text-white",
            )}
          >
            Health Scan
          </button>
        </nav>

        {/* CTA */}
        <div className="hidden md:flex">
          <Button
            onClick={() => router.push("/pricing")}
            className={cn(
              isActiveHeader ? "" : "bg-white/10 text-white hover:bg-white/20",
            )}
          >
            Start for Free
          </Button>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(isActiveHeader ? "text-black" : "text-white")}
              >
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent side="top" className="h-screen bg-white p-6">
              <div className="flex justify-between mb-6">
                <Image
                  src="/logos/logoDark.png"
                  alt="Logo"
                  width={100}
                  height={30}
                />
                <SheetClose>
                  <X />
                </SheetClose>
              </div>

              <Button
                onClick={() => router.push("/pricing")}
                className="w-full"
              >
                Start for Free
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <BeginJourneyModal open={modalOpen} onOpenChange={setModalOpen} />
    </header>
  );
}
