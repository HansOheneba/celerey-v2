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

type MegaCard = {
  title: string;
  href: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
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
  // cards?: MegaCard[];
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function isActivePath(pathname: string, href: string): boolean {
  // Do not highlight any nav items when on the homepage
  if (pathname === "/") return false;

  // treat hash links as active when the base path matches
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

  const [modalOpen, setModalOpen] = React.useState(false);

  const [megaOpen, setMegaOpen] = React.useState<MegaKey | null>(null);
  const closeTimerRef = React.useRef<number | null>(null);

  React.useEffect(() => setMounted(true), []);

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

  const openMega = React.useCallback((key: MegaKey) => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    setMegaOpen(key);
  }, []);

  const closeMegaSoon = React.useCallback(() => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => setMegaOpen(null), 140);
  }, []);

  const scrollToId = (id: string) => {
    let tries = 0;
    const maxTries = 30;

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

  const navigateToHash = (rawHref: string, closeSheet?: boolean) => {
    const id = rawHref.replace(/^#/, "");

    if (pathname === "/") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      router.push(`/#${id}`);
    }

    if (closeSheet) setOpen(false);
  };

  const handleScrollToPricing = () => navigateToHash("#entry-pricing");

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

  const mobileGroups = React.useMemo(
    () => [
      {
        heading: "Engage",
        items: [
          { name: "Pricing", href: "/pricing" },
          { name: "Services", href: "/services" },
          { name: "Free consultation", href: "/contact" },
        ],
      },
      {
        heading: "Company",
        items: [
          { name: "Who we are", href: "/about" },
          { name: "Our advisors", href: "/advisors" },
          { name: "FAQs", href: "/faqs" },
        ],
      },
      {
        heading: "Resources",
        items: [
          { name: "Insights", href: "/resources/insights" },
          { name: "Stories", href: "/resources/stories" },
          { name: "Podcasts", href: "/resources/podcasts" },
          { name: "Tools", href: "/tools" },
        ],
      },
    ],
    [],
  );

  function getPanelCols(m: MegaMenu): 1 | 2 | 3 {
    const base = Math.min(3, Math.max(1, m.sections.length));
    return base as 1 | 2 | 3;
  }

  function getPanelWidthClass(cols: 1 | 2 | 3): string {
    if (cols === 1) return "w-[420px]";
    if (cols === 2) return "w-[640px]";
    return "w-[860px]";
  }

  function getColsClass(cols: 1 | 2 | 3): string {
    if (cols === 1) return "md:grid-cols-1";
    if (cols === 2) return "md:grid-cols-2";
    return "md:grid-cols-3";
  }

  if (!mounted) return null;

  const headerBg = isScrolled ? "bg-black/50 py-2" : "bg-black/50 py-6";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
        // important: when visible, avoid transform so backdrop blur can render correctly
        visible
          ? "pointer-events-auto"
          : "-translate-y-full pointer-events-none",
        headerBg,
      )}
      style={{ willChange: "transform" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
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
            className="h-auto w-20 md:w-[110px]"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {megaMenus.map((m) => {
            const isActive =
              (m.href && isActivePath(pathname, m.href)) ||
              m.sections.some((s) =>
                s.links.some((l) => isActivePath(pathname, l.href)),
              );

            const isOpen = megaOpen === m.key;

            const cols = getPanelCols(m);
            const panelWidth = getPanelWidthClass(cols);
            const colsClass = getColsClass(cols);

            return (
              <div key={m.key} className="relative">
                <button
                  type="button"
                  onMouseEnter={() => openMega(m.key)}
                  onMouseLeave={closeMegaSoon}
                  onFocus={() => openMega(m.key)}
                  onClick={() =>
                    setMegaOpen((prev) => (prev === m.key ? null : m.key))
                  }
                  className={cn(
                    "group relative inline-flex items-center gap-1 text-sm font-normal text-white/90 transition-colors hover:text-white",
                  )}
                  aria-haspopup="menu"
                  aria-expanded={isOpen}
                >
                  {m.label}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 opacity-80 transition-transform duration-200",
                      isOpen ? "rotate-180" : "",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300",
                      isActive ? "w-full" : "w-0 group-hover:w-full",
                    )}
                  />
                </button>

                {/* Mega panel */}
                <div
                  onMouseEnter={() => openMega(m.key)}
                  onMouseLeave={closeMegaSoon}
                  className={cn(
                    "absolute left-1/2 top-full mt-4 -translate-x-1/2",
                    panelWidth,
                    "rounded-[22px] border border-white/10",
                    "bg-black/70 ",
                    "backdrop-blur-2xl",
                    "shadow-[0_28px_80px_rgba(0,0,0,0.45)]",
                    "transition-all duration-200",
                    isOpen
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 translate-y-2 pointer-events-none",
                  )}
                  role="menu"
                >
                  <div className={cn("grid gap-10 p-8", colsClass)}>
                    {m.sections.map((sec) => (
                      <div key={sec.heading}>
                        <p className="text-[11px] tracking-[0.24em] text-white/50">
                          {sec.heading.toUpperCase()}
                        </p>

                        <div className="mt-5 space-y-2">
                          {sec.links.map((l) => {
                            const active = isActivePath(pathname, l.href);

                            return (
                              <Link
                                key={l.href}
                                href={l.href}
                                onClick={() => setMegaOpen(null)}
                                className={cn(
                                  "group relative block rounded-xl px-3 py-3 transition",
                                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
                                  active
                                    ? "bg-white/10 text-white"
                                    : "text-white/80 hover:bg-white/10 hover:text-white",
                                )}
                              >
                                <div className="text-sm font-semibold tracking-tight">
                                  {l.name}
                                </div>

                                {l.description && (
                                  <div
                                    className={cn(
                                      "mt-1 text-xs leading-5 transition-colors",
                                      active
                                        ? "text-white/70"
                                        : "text-white/50 group-hover:text-white/70",
                                    )}
                                  >
                                    {l.description}
                                  </div>
                                )}

                                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40 opacity-0 transition-opacity group-hover:opacity-100">
                                  <FontAwesomeIcon icon={faArrowRight} />
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          <button
            type="button"
            onClick={() => navigateToHash("#wealth-scan")}
            className="text-sm font-normal text-white/90 transition-colors hover:text-white"
          >
            Health Scan
          </button>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Button
            onClick={handleScrollToPricing}
            className="h-10 px-4 text-sm cursor-pointer"
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
                className="rounded-full p-2 text-white transition-all duration-300 hover:bg-white/10"
              >
                <Menu className="h-7 w-7" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="top"
              className="
                fixed inset-0 h-screen border-0 bg-white p-8 text-gray-800
                data-[state=open]:animate-in data-[state=open]:slide-in-from-top
                data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top
                duration-500
              "
            >
              <div className="mb-10 flex items-center justify-between">
                <Image
                  src="/logos/logoDark.png"
                  alt="Celerey Logo"
                  width={110}
                  height={30}
                />

                <SheetClose asChild>
                  <button className="rounded-full p-2 transition hover:bg-gray-200">
                    <X className="h-6 w-6 text-gray-700" />
                  </button>
                </SheetClose>
              </div>

              <SheetTitle className="sr-only">Navigation</SheetTitle>

              <div className="space-y-8">
                {mobileGroups.map((g) => (
                  <div key={g.heading}>
                    <p className="text-[11px] tracking-[0.22em] text-neutral-500">
                      {g.heading.toUpperCase()}
                    </p>
                    <div className="mt-3 space-y-1">
                      {g.items.map((it) => (
                        <button
                          key={it.href}
                          type="button"
                          onClick={() => {
                            setOpen(false);
                            router.push(it.href);
                          }}
                          className="w-full border-b border-neutral-100 py-3 text-left text-base text-neutral-900 hover:text-neutral-700"
                        >
                          {it.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => navigateToHash("#wealth-scan", true)}
                    className="w-full border-b border-neutral-100 py-3 text-left text-base text-neutral-900 hover:text-neutral-700"
                  >
                    Health Scan
                  </button>
                </div>

                <div className="pt-4 space-y-3">
                  <Button onClick={handleScrollToPricing} className="w-full">
                    Start for Free
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <BeginJourneyModal open={modalOpen} onOpenChange={setModalOpen} />
    </header>
  );
}
