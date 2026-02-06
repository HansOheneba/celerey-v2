"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Play, FileText, ArrowDownToLine } from "lucide-react";

type BlogItem = {
  kind: "blog";
  title: string;
  description: string;
  image: string;
  actionLabel: string; // e.g. "Read Article"
  href: string; // blog detail route
};

type insightsItem = {
  kind: "insights";
  title: string;
  description: string;
  image: string;
  pdfHref: string; // later: your uploaded pdf URL
  meta?: string; // e.g. "PDF • 12 pages" or "2026 Report"
};

type PodcastItem = {
  kind: "podcast";
  title: string;
  description: string;
  image: string;
  duration: string;
  href?: string; // optional link to a podcast page
};

type TabKey = "blog" | "insights" | "podcasts";
type ContentItem = BlogItem | insightsItem | PodcastItem;

const blogPosts: BlogItem[] = [
  {
    kind: "blog",
    title: "The Future of Wealth Management",
    description:
      "How AI and human expertise are reshaping financial advisory services.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    actionLabel: "Read Article",
    href: "/resources/blog/future-of-wealth-management",
  },
  {
    kind: "blog",
    title: "Investment Strategy Template",
    description:
      "A practical guide to building a personalized investment framework.",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    actionLabel: "Read Article",
    href: "/resources/blog/smart-investing-in-2025",
  },
  {
    kind: "blog",
    title: "Career Decisions That Compound",
    description:
      "How intentional career moves can drive long-term wealth outcomes.",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    actionLabel: "Read Article",
    href: "/resources/blog/behavioral-finance-wealth-mindset",
  },
];

const insightses: insightsItem[] = [
  {
    kind: "insights",
    title: "2026 Wealth Outlook — Ghana & Emerging Markets",
    description:
      "A grounded view on macro signals, portfolio positioning, and investor behavior.",
    image:
      "https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=800&q=80",
    pdfHref: "/pdfs/2026-wealth-outlook.pdf",
    meta: "PDF • Outlook",
  },
  {
    kind: "insights",
    title: "Risk & Resilience Playbook",
    description:
      "A insights-backed approach to protecting downside while staying invested.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    pdfHref: "/pdfs/risk-resilience-playbook.pdf",
    meta: "PDF • Framework",
  },
  {
    kind: "insights",
    title: "Investor Psychology — What Actually Moves Decisions",
    description:
      "Patterns that quietly shape outcomes: fear, greed, recency bias, and discipline.",
    image:
      "https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&w=800&q=80",
    pdfHref: "/pdfs/investor-psychology.pdf",
    meta: "PDF • insights Note",
  },
];

const podcasts: PodcastItem[] = [
  {
    kind: "podcast",
    title: "AI in Investing — Smarter Portfolios",
    description:
      "Exploring how machine learning is transforming investment management.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    duration: "28 min",
  },
  {
    kind: "podcast",
    title: "The Psychology of Money",
    description: "How mindset and behavior drive long-term financial success.",
    image:
      "https://images.unsplash.com/photo-1604594849809-dfedbc827105?auto=format&fit=crop&w=800&q=80",
    duration: "35 min",
  },
  {
    kind: "podcast",
    title: "Global Markets Deep Dive",
    description: "Trends shaping global wealth creation in emerging economies.",
    image:
      "https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?auto=format&fit=crop&w=800&q=80",
    duration: "42 min",
  },
];

export default function InsightsSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("blog");

  const content: ContentItem[] =
    activeTab === "blog"
      ? blogPosts
      : activeTab === "insights"
      ? insightses
      : podcasts;

  const tabLabel = (tab: TabKey) => {
    if (tab === "blog") return "Blog";
    if (tab === "insights") return "Insights";
    return "Podcasts";
  };

  return (
    <section className="relative py-24 text-gray-900 overflow-hidden bg-gradient-to-b from-white to-blue-50">
      {/* Top subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.08),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto text-center px-6">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-semibold mb-6 text-gray-900"
        >
          Insights{" "}
          <span className="text-[#1B1856] font-medium">& Resources</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Explore blog posts, research notes, and podcasts designed to guide your
          financial decisions with clarity and confidence.
        </motion.p>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {(["blog", "insights", "podcasts"] as TabKey[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative text-lg font-medium pb-2 transition-all ${
                activeTab === tab
                  ? "text-[#1B1856]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tabLabel(tab)}
              {activeTab === tab && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1B1856] rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        {/* Content Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {content.map((item, i) => (
              <motion.div
                key={`${item.title}-${i}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
                className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl flex flex-col"
              >
                <div className="relative w-full h-56 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Podcast overlay */}
                  {item.kind === "podcast" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition">
                      <div className="w-14 h-14 bg-yellow-500/70 rounded-full flex items-center justify-center">
                        <Play className="text-white w-6 h-6" />
                      </div>
                    </div>
                  )}

                  {/* Insights badge */}
                  {item.kind === "insights" && (
                    <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/85 backdrop-blur px-3 py-1 text-xs font-medium text-gray-800 border border-gray-200">
                      <FileText className="w-4 h-4" />
                      {item.meta ?? "PDF"}
                    </div>
                  )}
                </div>

                <div className="p-6 text-left flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-sm flex-grow">{item.description}</p>

                  {/* Actions */}
                  {item.kind === "blog" && (
                    <Link href={item.href}>
                      <Button
                        variant="outline"
                      >
                        {item.actionLabel}
                      </Button>
                    </Link>
                  )}

                  {item.kind === "insights" && (
                    <a href={item.pdfHref} target="_blank" rel="noreferrer">
                      <Button
                        variant="outline"
                      >
                        <ArrowDownToLine className="w-4 h-4" />
                        Download PDF
                      </Button>
                    </a>
                  )}

                  {item.kind === "podcast" && (
                    <div className="text-gray-500 text-sm">{item.duration}</div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Link href="/resources">
            <Button className="h-11 rounded-full px-6 text-white">
              View More
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}