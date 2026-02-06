"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, X, Calendar, Clock } from "lucide-react";

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

export default function PodcastsPage() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPodcast, setSelectedPodcast] = useState<Podcast | null>(null);

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(`${apiBase}/podcasts/`);

        if (!res.ok) {
          throw new Error(`Failed to fetch podcasts: ${res.status}`);
        }

        const data = await res.json();
        setPodcasts(data);
      } catch (err) {
        console.error("Error fetching podcasts:", err);
        setError("Failed to load podcasts. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPodcasts();
  }, [apiBase]);

  return (
    <section className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
        {/* Back */}
        <Link
          href="/resources"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Resources
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-10 mb-12 md:mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight">
            Podcasts
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl text-base md:text-lg leading-relaxed">
            Expert discussions on markets, behavioral finance, and wealth strategies.
            Listen and learn from experienced practitioners.
          </p>
        </motion.div>

        {/* Loading */}
        {isLoading && (
          <div className="text-center py-20">
            <div className="inline-block w-10 h-10 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
            <p className="text-gray-600 mt-4">Loading podcasts...</p>
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div className="text-center py-20">
            <p className="text-red-600 mb-4">{error}</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !error && podcasts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600">No podcasts available at the moment.</p>
          </div>
        )}

        {/* Grid (airy, like your resources page vibe) */}
        {!isLoading && !error && podcasts.length > 0 && (
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
              {podcasts.map((podcast, index) => (
                <motion.article
                  key={podcast.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.45 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedPodcast(podcast)}
                >
                  {/* Image */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                    <Image
                      src={podcast.image}
                      alt={podcast.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 520px"
                      priority={index < 2}
                    />

                    {/* Play overlay (subtle, only on hover) */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="h-14 w-14 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm">
                        <Play className="w-6 h-6 text-gray-900 ml-0.5" />
                      </div>
                    </div>

                    {/* Top-right pill */}
                    <div className="absolute top-4 right-4">
                      <span className="text-xs font-medium text-gray-900 bg-white/90 border border-white/60 backdrop-blur rounded-full px-3 py-1">
                        Episode
                      </span>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="mt-6">
                    <h2 className="text-xl md:text-2xl font-medium text-gray-900 line-clamp-2">
                      {podcast.title}
                    </h2>

                    <p className="mt-2 text-gray-600 leading-relaxed line-clamp-3 max-w-xl">
                      {podcast.description}
                    </p>

                    {/* Meta */}
                    <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
                      <span className="inline-flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(podcast.date).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {podcast.duration}
                      </span>
                    </div>

                    {/* Host */}
                    <p className="mt-3 text-sm text-gray-500">
                      Hosted by <span className="text-gray-700">{podcast.host}</span>
                    </p>

                    {/* Tags (minimal) */}
                    {podcast.tags?.length ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {podcast.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={`${podcast.id}-tag-${i}`}
                            className="text-xs text-gray-600 bg-gray-100 rounded-full px-3 py-1"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    {/* subtle affordance */}
                    <div className="mt-5 text-gray-900/70 text-sm font-medium inline-flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Play <span aria-hidden>→</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Player Modal (clean + minimal) */}
      <AnimatePresence>
        {selectedPodcast && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPodcast(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header image */}
              <div className="relative h-52 md:h-64">
                <Image
                  src={selectedPodcast.image}
                  alt={selectedPodcast.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent" />

                <button
                  onClick={() => setSelectedPodcast(null)}
                  className="absolute top-4 right-4 h-10 w-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-gray-800" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                  {selectedPodcast.title}
                </h2>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
                  <span>
                    Hosted by{" "}
                    <span className="text-gray-800">{selectedPodcast.host}</span>
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-800">{selectedPodcast.duration}</span>
                </div>

                <p className="mt-4 text-gray-600 leading-relaxed">
                  {selectedPodcast.description}
                </p>

                {/* Embed */}
                {selectedPodcast.spotify_embed_url ? (
                  <div className="mt-6">
                    <iframe
                      src={selectedPodcast.spotify_embed_url}
                      width="100%"
                      height="232"
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      className="rounded-xl"
                    />
                  </div>
                ) : null}

                {/* Button */}
                <div className="mt-6">
                  <a
                    href={selectedPodcast.spotify_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-white">
                      <Play className="w-4 h-4 mr-2" />
                      Listen on Spotify
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}