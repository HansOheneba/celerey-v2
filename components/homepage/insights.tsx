"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Play } from "lucide-react";

// Define types for both kinds of content
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

// Union type for the shared component rendering
type ContentItem = InsightItem | PodcastItem;

const insights: InsightItem[] = [
  {
    title: "The Future of Wealth Management",
    description:
      "How AI and human expertise are reshaping financial advisory services.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80", // futuristic finance / AI theme
    action: "Read Article",
  },
  {
    title: "Investment Strategy Template",
    description:
      "A comprehensive guide to building your personalized investment portfolio.",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80", // investment graphs
    action: "Download",
  },
  {
    title: "Career & Wealth Podcast",
    description:
      "Weekly insights on building wealth through strategic career decisions.",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80", // podcast mic studio
    action: "Listen",
  },
];

const podcasts: PodcastItem[] = [
  {
    title: "AI in Investing — Smarter Portfolios",
    description:
      "Exploring how machine learning is transforming investment management.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80", // Futuristic AI & finance vibe
    duration: "28 min",
  },
  {
    title: "The Psychology of Money",
    description: "How mindset and behavior drive long-term financial success.",
    image:
      "https://images.unsplash.com/photo-1604594849809-dfedbc827105?auto=format&fit=crop&w=800&q=80", // mind / finance blend
    duration: "35 min",
  },
  {
    title: "Global Markets Deep Dive",
    description: "Trends shaping global wealth creation in emerging economies.",
    image:
      "https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?auto=format&fit=crop&w=800&q=80", // global markets theme
    duration: "42 min",
  },
];


export default function InsightsSection() {
  const [activeTab, setActiveTab] = useState<"insights" | "podcasts">(
    "insights"
  );

  const content: ContentItem[] = activeTab === "insights" ? insights : podcasts;

  return (
    <section className="relative py-24 text-white overflow-hidden  bg-[#00008B]">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto text-center px-6">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-semibold mb-6"
        >
          Insights <span className="text-[#6E8894]">& Resources</span>
        </motion.h2>

        {/* Tabs */}
        <div className="flex justify-center gap-6 mb-12">
          {["insights", "podcasts"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "insights" | "podcasts")}
              className={`relative text-lg font-medium pb-2 transition-all ${
                activeTab === tab
                  ? "text-blue-400"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {tab === "insights" ? "Insights" : "Podcasts"}
              {activeTab === tab && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
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
                className="group bg-gradient-to-b from-gray-900/60 to-gray-950 border border-gray-800 rounded-2xl overflow-hidden hover:shadow-blue-500/20 transition-all hover:-translate-y-1"
              >
                <div className="relative w-full h-56 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {"duration" in item && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition">
                      <div className="w-14 h-14 bg-blue-500/80 rounded-full flex items-center justify-center">
                        <Play className="text-white w-6 h-6" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6 text-left">
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400 mb-6 text-sm">
                    {item.description}
                  </p>

                  {"action" in item ? (
                    <Button
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:text-blue-400 hover:border-blue-400 rounded-full"
                    >
                      {item.action}
                    </Button>
                  ) : (
                    <div className="text-gray-500 text-sm">{item.duration}</div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
