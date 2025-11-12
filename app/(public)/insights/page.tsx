"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { insights, Insight } from "@/lib/insights";
import { Button } from "@/components/ui/button";
import { PlayCircle, X } from "lucide-react";

interface Podcast {
  id: number;
  slug: string;
  title: string;
  description: string;
  host: string;
  duration: string;
  date: string;
  image: string;
  spotify_link: string;
  spotify_embed_url: string;
  tags: string[];
}

export default function InsightsPage() {
  const [activeTab, setActiveTab] = useState<"insights" | "podcasts">(
    "insights"
  );
  const [selectedPodcast, setSelectedPodcast] = useState<Podcast | null>(null);
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [podcastError, setPodcastError] = useState<string | null>(null);

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;

  const data: (Insight | Podcast)[] =
    activeTab === "insights" ? insights : podcasts;

  // Fixed type guards
  const isInsight = (item: Insight | Podcast): item is Insight => {
    return "slug" in item && !("spotify_link" in item);
  };

  const isPodcast = (item: Insight | Podcast): item is Podcast => {
    return "spotify_link" in item && "duration" in item;
  };

  // Fetch podcasts from API
  useEffect(() => {
    if (activeTab === "podcasts") {
      const fetchPodcasts = async () => {
        try {
          setIsLoading(true);
          setPodcastError(null);
          const res = await fetch(`${apiBase}/podcasts/`);

          if (!res.ok) {
            throw new Error(`Failed to fetch podcasts: ${res.status}`);
          }

          const data = await res.json();
          setPodcasts(data);
        } catch (err) {
          console.error("Error fetching podcasts:", err);
          setPodcastError("Failed to load podcasts. Please try again later.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchPodcasts();
    }
  }, [activeTab, apiBase]);

  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white py-42 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-semibold text-[#1B1856] mb-4"
        >
          Insights & <span className="text-blue-600">Resources</span>
        </motion.h1>

        <p className="text-gray-600 max-w-3xl mx-auto mb-10">
          Stay informed with thought leadership, expert opinions, and practical
          guidance from the Celerey network. Explore our insights and podcasts
          to sharpen your financial perspective.
        </p>

        {/* Tabs */}
        <div className="flex justify-center gap-6 mb-16">
          {["insights", "podcasts"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "insights" | "podcasts")}
              className={`relative text-lg font-medium pb-2 transition-all ${
                activeTab === tab
                  ? "text-blue-600"
                  : "text-gray-400 hover:text-blue-400"
              }`}
            >
              {tab === "insights" ? "Insights" : "Podcasts"}
              {activeTab === tab && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === "podcasts" && isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-lg text-gray-600">Loading podcasts...</div>
              </div>
            ) : activeTab === "podcasts" && podcastError ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-lg text-red-600">{podcastError}</div>
              </div>
            ) : activeTab === "podcasts" && podcasts.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-lg text-gray-600">No podcasts found.</div>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {data.map((item, i) => {
                  const imageSrc = isInsight(item)
                    ? item.coverImage
                    : isPodcast(item)
                    ? item.image
                    : null;

                  return (
                    <motion.div
                      key={isInsight(item) ? item.id : `podcast-${item.id}`}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      viewport={{ once: true }}
                      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
                    >
                      {/* Image Section */}
                      <div className="relative w-full h-56 overflow-hidden flex-shrink-0">
                        {imageSrc ? (
                          <Image
                            src={imageSrc}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              if (isPodcast(item)) {
                                e.currentTarget.src =
                                  "/placeholder-podcast.png";
                              }
                            }}
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-400">
                            No image available
                          </div>
                        )}

                        {/* Podcast Play Overlay */}
                        {isPodcast(item) && (
                          <div
                            className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition cursor-pointer"
                            onClick={() => setSelectedPodcast(item)}
                          >
                            <PlayCircle className="text-white w-14 h-14 drop-shadow-lg" />
                          </div>
                        )}
                      </div>

                      {/* Text Section */}
                      <div className="p-6 flex flex-col flex-1 text-left">
                        {/* Text content grows, buttons stay pinned at bottom */}
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-[#1B1856] mb-2 line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-500 text-sm mb-4 line-clamp-3">
                            {isInsight(item) ? item.excerpt : item.description}
                          </p>

                          {/* Podcast meta */}
                          {isPodcast(item) && (
                            <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                              <span>{item.duration}</span>
                              <span>•</span>
                              <span>
                                {new Date(item.date).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Buttons stay fixed at bottom */}
                        <div className="mt-auto pt-4">
                          {isInsight(item) ? (
                            <Link
                              href={`/insights/${item.slug}`}
                              className="inline-block w-full"
                            >
                              <Button className="bg-[#1B1856] hover:bg-[#1B1856]/80 text-white rounded-full text-sm px-5 w-full">
                                Read More
                              </Button>
                            </Link>
                          ) : (
                            <div className="flex gap-2">
                              <Button
                                className="bg-[#1B1856] hover:bg-[#1B1856]/80 text-white rounded-full text-sm px-5 flex-1"
                                onClick={() => setSelectedPodcast(item)}
                              >
                                Listen Now
                              </Button>
                              <Button
                                asChild
                                variant="outline"
                                className="rounded-full text-sm px-4 flex-1"
                              >
                                <a
                                  href={item.spotify_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Spotify
                                </a>
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Podcast Modal */}
      <AnimatePresence>
        {selectedPodcast && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPodcast(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b">
                <h3 className="text-xl font-semibold text-[#1B1856]">
                  {selectedPodcast.title}
                </h3>
                <button
                  onClick={() => setSelectedPodcast(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <iframe
                  src={selectedPodcast.spotify_embed_url}
                  width="100%"
                  height="232"
                  frameBorder="0"
                  allow="encrypted-media"
                  className="rounded-lg"
                ></iframe>

                <div className="mt-6 text-left">
                  <p className="text-gray-600 mb-4">
                    {selectedPodcast.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Hosted by {selectedPodcast.host}</span>
                    <span>•</span>
                    <span>{selectedPodcast.duration}</span>
                    <span>•</span>
                    <span>
                      {new Date(selectedPodcast.date).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedPodcast.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-600"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
