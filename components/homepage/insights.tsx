"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

type InsightItem = {
  title: string;
  description: string;
  image: string;
  action: string;
};

type PodcastItem = {
  title: string;
  description: string;
  image: string;
  duration: string;
};

type ContentItem = InsightItem | PodcastItem;

const insights: InsightItem[] = [
  {
    title: "The Future of Wealth Management",
    description:
      "How AI and human expertise are reshaping financial advisory services.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    action: "Read Article",
  },
  {
    title: "Investment Strategy Template",
    description:
      "A comprehensive guide to building your personalized investment portfolio.",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    action: "Download",
  },
  {
    title: "Career & Wealth Podcast",
    description:
      "Weekly insights on building wealth through strategic career decisions.",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    action: "Listen",
  },
];

const podcasts: PodcastItem[] = [
  {
    title: "AI in Investing — Smarter Portfolios",
    description:
      "Exploring how machine learning is transforming investment management.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    duration: "28 min",
  },
  {
    title: "The Psychology of Money",
    description: "How mindset and behavior drive long-term financial success.",
    image:
      "https://images.unsplash.com/photo-1604594849809-dfedbc827105?auto=format&fit=crop&w=800&q=80",
    duration: "35 min",
  },
  {
    title: "Global Markets Deep Dive",
    description: "Trends shaping global wealth creation in emerging economies.",
    image:
      "https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?auto=format&fit=crop&w=800&q=80",
    duration: "42 min",
  },
];

export default function InsightsSection() {
  const [activeTab, setActiveTab] = useState<"insights" | "podcasts">(
    "insights"
  );

  const content: ContentItem[] = activeTab === "insights" ? insights : podcasts;

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
          Explore actionable insights, expert commentary, and elegant tools to
          guide your financial decisions with clarity and confidence.
        </motion.p>

        {/* Tabs */}
        <div className="flex justify-center gap-6 mb-12">
          {["insights", "podcasts"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "insights" | "podcasts")}
              className={`relative text-lg font-medium pb-2 transition-all ${
                activeTab === tab
                  ? "text-[#1B1856]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab === "insights" ? "Insights" : "Podcasts"}
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
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
                className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl"
              >
                <div className="relative w-full h-56 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {"duration" in item && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition">
                      <div className="w-14 h-14 bg-yellow-500/70 rounded-full flex items-center justify-center">
                        <Play className="text-white w-6 h-6" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6 text-left">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-sm">
                    {item.description}
                  </p>

                  {"action" in item ? (
                    <Button variant="outline" className="h-11 rounded-full bg-neutral-900 px-6 hover:bg-neutral-800">{item.action}</Button>
                  ) : (
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
          <Link href="/insights">
            <Button className="h-11 rounded-full px-6 text-white ">View More Insights</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
