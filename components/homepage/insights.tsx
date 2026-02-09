"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FileText, ArrowDownToLine, Play, ArrowRight } from "lucide-react";

type StoryItem = {
  kind: "story";
  title: string;
  description: string;
  image: string;
  actionLabel: string;
  href: string;
  date?: string; // optional (if you want the subtle date line like Stories page)
  tags?: string[];
};

type InsightsItem = {
  kind: "insights";
  title: string;
  description: string;
  image: string;
  pdfHref: string;
  meta?: string; // e.g. "PDF • 12 pages" or "2026 Report"
  date?: string;
  tags?: string[];
};

type PodcastItem = {
  kind: "podcast";
  title: string;
  description: string;
  image: string;
  duration: string;
  href?: string;
  date?: string;
  tags?: string[];
};

type TabKey = "story" | "insights" | "podcasts";
type ContentItem = StoryItem | InsightsItem | PodcastItem;

const storyPosts: StoryItem[] = [
  {
    kind: "story",
    title: "The Future of Wealth Management",
    description:
      "How AI and human expertise are reshaping financial advisory services.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    actionLabel: "Read Article",
    href: "/resources/blog/future-of-wealth-management",
    date: "2026-01-10",
    tags: ["Advisory", "AI", "Strategy"],
  },
  {
    kind: "story",
    title: "Investment Strategy Template",
    description:
      "A practical guide to building a personalized investment framework.",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    actionLabel: "Read Article",
    href: "/resources/blog/smart-investing-in-2025",
    date: "2026-01-18",
    tags: ["Investing", "Template"],
  },
  // {
  //   kind: "story",
  //   title: "Career Decisions That Compound",
  //   description:
  //     "How intentional career moves can drive long-term wealth outcomes.",
  //   image:
  //     "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
  //   actionLabel: "Read Article",
  //   href: "/resources/blog/behavioral-finance-wealth-mindset",
  //   date: "2026-01-27",
  //   tags: ["Behavior", "Long-term"],
  // },
];

const insightses: InsightsItem[] = [
  {
    kind: "insights",
    title: "2026 Market Outlook",
    description:
      "A forward-looking analysis of the global investment landscape as economies move from extreme volatility toward gradual normalization. The report explores easing inflation, cautious interest-rate cuts, regional growth differences, the rising impact of artificial intelligence, and practical portfolio strategies focused on quality, income, and diversification.",
    image:
      "https://images.squarespace-cdn.com/content/v1/65ba13d52ed18742d3b5c312/16e66a77-434f-4338-98b4-8f1119d107a9/MO2026.png?format=2500w",
    pdfHref: "https://www.celerey.co/s/2026-Market-Outlook-Celerey.pdf",
    date: "2026-02-01",
    tags: ["Outlook", "Ghana", "Macro"],
  },
  {
    kind: "insights",
    title: "Q4 Economic Update 2025",
    description:
      "A concise overview of key economic developments in the final quarter of 2025, covering inflation trends, interest-rate expectations, global growth patterns, and the implications for investors heading into 2026. The update highlights shifting policy signals, regional market dynamics, and practical considerations for portfolio positioning.",
    image:
      "https://images.squarespace-cdn.com/content/v1/65ba13d52ed18742d3b5c312/a27958d7-f330-426f-ba9e-028e4d32e4ff/Q4.png?format=2500w",
    pdfHref: "https://www.celerey.co/s/Q4-Economic-Update-2025-Celerey.pdf",
    date: "2026-01-22",
    tags: ["Risk", "Framework"],
  },
  // {
  //   kind: "insights",
  //   title: "Investor Psychology — What Actually Moves Decisions",
  //   description:
  //     "Patterns that quietly shape outcomes: fear, greed, recency bias, and discipline.",
  //   image:
  //     "https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&w=1200&q=80",
  //   pdfHref: "/pdfs/investor-psychology.pdf",
  //   meta: "PDF • Research Note",
  //   date: "2026-01-14",
  //   tags: ["Behavior", "Discipline"],
  // },
];

const podcasts: PodcastItem[] = [
  {
    kind: "podcast",
    title: "AI in Investing — Smarter Portfolios",
    description:
      "Exploring how machine learning is transforming investment management.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    duration: "28 min",
    date: "2026-01-08",
    tags: ["AI", "Investing"],
  },
  {
    kind: "podcast",
    title: "The Psychology of Money",
    description: "How mindset and behavior drive long-term financial success.",
    image:
      "https://images.unsplash.com/photo-1604594849809-dfedbc827105?auto=format&fit=crop&w=1200&q=80",
    duration: "35 min",
    date: "2026-01-05",
    tags: ["Behavior", "Mindset"],
  },
  // {
  //   kind: "podcast",
  //   title: "Global Markets Deep Dive",
  //   description: "Trends shaping global wealth creation in emerging economies.",
  //   image:
  //     "https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?auto=format&fit=crop&w=1200&q=80",
  //   duration: "42 min",
  //   date: "2025-12-20",
  //   tags: ["Markets", "Global"],
  // },
];

export default function InsightsSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("story");

  const content: ContentItem[] =
    activeTab === "story"
      ? storyPosts
      : activeTab === "insights"
      ? insightses
      : podcasts;

  const tabLabel = (tab: TabKey) => {
    if (tab === "story") return "Stories";
    if (tab === "insights") return "Insights";
    return "Podcasts";
  };

  const dateLine = (d?: string) => {
    if (!d) return null;
    const parsed = new Date(d);
    if (Number.isNaN(parsed.getTime())) return null;
    return parsed.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
        {/* Header (minimal, same vibe) */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight">
            Insights & Resources
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl text-base md:text-lg leading-relaxed">
            Practical writing, research notes, and audio conversations designed
            to guide decisions with clarity and confidence.
          </p>

          {/* Tabs (minimal underline) */}
          <div className="mt-10 flex flex-wrap gap-8">
            {(["story", "insights", "podcasts"] as TabKey[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative text-base md:text-lg font-medium pb-2 transition-colors ${
                  activeTab === tab
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {tabLabel(tab)}
                {activeTab === tab && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-900/70 rounded-full"
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid (same minimalist vibe: 2 columns on md, airy spacing) */}
        <div className="mx-auto max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16"
            >
              {content.map((item, index) => {
                const href =
                  item.kind === "story"
                    ? item.href
                    : item.kind === "insights"
                    ? item.pdfHref
                    : item.href;

                // Wrap whole card in a link (like StoriesPage)
                const Wrapper =
                  href && item.kind !== "podcast"
                    ? ({ children }: { children: React.ReactNode }) => (
                        <Link
                          href={href}
                          className="block"
                          target={item.kind === "insights" ? "_blank" : undefined}
                          rel={item.kind === "insights" ? "noreferrer" : undefined}
                        >
                          {children}
                        </Link>
                      )
                    : ({ children }: { children: React.ReactNode }) => (
                        <div>{children}</div>
                      );

                return (
                  <motion.article
                    key={`${item.kind}-${item.title}-${index}`}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06, duration: 0.45 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <Wrapper>
                      {/* Image (same aspect and overlay) */}
                      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          sizes="(max-width: 768px) 100vw, 520px"
                          priority={index < 2}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-70" />

                        {/* Small top-left badge for insights */}
                        {item.kind === "insights" && (
                          <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/85 backdrop-blur px-3 py-1 text-xs font-medium text-gray-800 border border-gray-200">
                            <FileText className="w-4 h-4" />
                            {item.meta ?? "PDF"}
                          </div>
                        )}

                        {/* Podcast play affordance (minimal) */}
                        {item.kind === "podcast" && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full bg-white/85 backdrop-blur px-4 py-2 border border-gray-200 inline-flex items-center gap-2">
                              <Play className="w-4 h-4 text-gray-900" />
                              <span className="text-sm font-medium text-gray-900">
                                Play
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Text (minimal, same rhythm) */}
                      <div className="mt-6">
                        {/* date / meta line */}
                        <div className="text-sm text-gray-500 flex items-center gap-3">
                          {dateLine(item.date) ? <span>{dateLine(item.date)}</span> : null}
                          {item.kind === "podcast" ? (
                            <span className="text-gray-500">{item.duration}</span>
                          ) : null}
                        </div>

                        <h3 className="mt-2 text-xl md:text-2xl font-medium text-gray-900 line-clamp-2">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-gray-600 leading-relaxed line-clamp-3 max-w-xl">
                          {item.description}
                        </p>

                        {/* tags (optional, same style as StoriesPage) */}
                        {"tags" in item && item.tags?.length ? (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {item.tags.slice(0, 3).map((tag, i) => (
                              <span
                                key={`${item.kind}-${item.title}-tag-${i}`}
                                className="text-xs text-gray-600 bg-gray-100 rounded-full px-3 py-1"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        ) : null}

                        {/* subtle affordance */}
                        {item.kind === "story" && (
                          <div className="mt-5 text-gray-900/70 text-sm font-medium inline-flex items-center gap-2 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                            Read story <span aria-hidden>→</span>
                          </div>
                        )}

                        {item.kind === "insights" && (
                          <div className="mt-5 text-gray-900/70 text-sm font-medium inline-flex items-center gap-2 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                            Download PDF{" "}
                            <ArrowDownToLine className="w-4 h-4" />
                          </div>
                        )}

                        {item.kind === "podcast" && (
                          <div className="mt-5 text-gray-900/70 text-sm font-medium inline-flex items-center gap-2 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                            Explore episode <span aria-hidden>→</span>
                          </div>
                        )}
                      </div>
                    </Wrapper>

                    {/* Optional: keep a real download button for insights (accessibility + explicit action)
                        If you want PURE minimal, delete this block. */}
                    {item.kind === "insights" ? (
                      <div className="mt-4">
                        <a
                          href={item.pdfHref}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-gray-900/80 hover:text-gray-900 transition-colors"
                        >
                          Read
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    ) : null}
                  </motion.article>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* View More (minimal) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.45 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
          >
            View more <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}