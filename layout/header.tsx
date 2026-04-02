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

type MegaKey = "services" | "company" | "resources" | "tools";

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
        ],
      },
      {
        key: "tools",
        label: "Tools",
        href: "/tools",
        sections: [
          {
            heading: "Financial Tools",
            links: [
              {
                name: "Tools Overview",
                href: "/tools",
                description: "See all available tools in one place",
              },
              {
                name: "Budget Planner",
                href: "/tools/budget-planner",
                description: "Track spending and set category limits",
              },
              {
                name: "Savings Calculator",
                href: "/tools/savings-calculator",
                description: "Project how your savings grow over time",
              },
              {
                name: "Money Manager",
                href: "/tools/money-manager",
                description:
                  "Holistic view of income, outgoings, and net worth",
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
                    "absolute left-1/2 top-full mt-4 -translate-x-1/2",
                    m.sections.length === 1 ? "w-[520px]" : "w-[700px]",
                    "rounded-[20px] bg-white text-black shadow-xl",
                    "transition-all duration-200",
                    isOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2 pointer-events-none",
                  )}
                >
                  <div
                    className={cn(
                      "grid gap-x-8 gap-y-2 p-6",
                      m.sections.length === 1 ? "grid-cols-1" : "grid-cols-2",
                    )}
                  >
                    {m.sections.map((sec) => (
                      <div key={sec.heading}>
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                          {sec.heading}
                        </p>
                        <div
                          className={cn(
                            m.sections.length === 1
                              ? "grid grid-cols-2 gap-x-2"
                              : "space-y-1",
                          )}
                        >
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

            <SheetContent
              side="left"
              className="w-full max-w-sm bg-white p-0 overflow-y-auto"
            >
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <Image
                  src="/logos/logoDark.png"
                  alt="Logo"
                  width={90}
                  height={24}
                />
                <SheetClose className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <X className="w-5 h-5 text-gray-600" />
                </SheetClose>
              </div>

              {/* Nav links */}
              <nav className="px-4 py-4 space-y-1">
                {megaMenus.map((m) => (
                  <MobileNavSection
                    key={m.key}
                    menu={m}
                    onClose={() => setOpen(false)}
                  />
                ))}

                {/* Health Scan standalone link */}
                <SheetClose asChild>
                  <button
                    onClick={() => {
                      router.push("/#wealth-scan");
                      setOpen(false);
                    }}
                    className="w-full flex items-center px-3 py-3 rounded-xl text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
                  >
                    Health Scan
                  </button>
                </SheetClose>
              </nav>

              {/* CTA */}
              <div className="px-6 pb-8 pt-4 border-t border-gray-100 mt-2">
                <SheetClose asChild>
                  <Button
                    onClick={() => router.push("/pricing")}
                    className="w-full bg-[#1B1856] hover:bg-[#1B1856]/90 text-white"
                  >
                    Start for Free
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <BeginJourneyModal open={modalOpen} onOpenChange={setModalOpen} />
    </header>
  );
}

// ---- Mobile nav accordion section ----
function MobileNavSection({
  menu,
  onClose,
}: {
  menu: {
    key: string;
    label: string;
    href?: string;
    sections: {
      heading: string;
      links: { name: string; href: string; description?: string }[];
    }[];
  };
  onClose: () => void;
}) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div>
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
      >
        {menu.label}
        <ChevronDown
          className={cn(
            "h-4 w-4 text-gray-500 transition-transform duration-200",
            expanded && "rotate-180",
          )}
        />
      </button>

      {expanded && (
        <div className="ml-3 mt-1 mb-2 space-y-4">
          {menu.sections.map((sec) => (
            <div key={sec.heading}>
              <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                {sec.heading}
              </p>
              <div className="space-y-0.5">
                {sec.links.map((l) => (
                  <SheetClose key={l.href} asChild>
                    <Link
                      href={l.href}
                      onClick={onClose}
                      className="flex flex-col px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-sm font-medium text-gray-900">
                        {l.name}
                      </span>
                      {l.description && (
                        <span className="text-xs text-gray-400 leading-snug mt-0.5">
                          {l.description}
                        </span>
                      )}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
