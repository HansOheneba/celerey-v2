"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { insights } from "@/lib/insights";
import { ArrowLeft } from "lucide-react";

export default function StoriesPage() {
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
            Stories
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl text-base md:text-lg leading-relaxed">
            Practical writing on wealth, behavior, investing, and long-term planning.
          </p>
        </motion.div>

        {/* Grid (same minimalist vibe) */}
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
            {insights.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06, duration: 0.45 }}
                className="group"
              >
                <Link href={`/resources/stories/${post.slug}`} className="block">
                  {/* Image */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 520px"
                      priority={index < 2}
                    />

                    {/* Subtle depth overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-70" />
                  </div>

                  {/* Text */}
                  <div className="mt-6">
                    <div className="text-sm text-gray-500">
                      {new Date(post.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>

                    <h2 className="mt-2 text-xl md:text-2xl font-medium text-gray-900 line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="mt-2 text-gray-600 leading-relaxed line-clamp-3 max-w-xl">
                      {post.excerpt}
                    </p>

                    {/* Tags (minimal) */}
                    {post.tags?.length ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={`${post.id}-tag-${i}`}
                            className="text-xs text-gray-600 bg-gray-100 rounded-full px-3 py-1"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    {/* subtle affordance */}
                    <div className="mt-5 text-gray-900/70 text-sm font-medium inline-flex items-center gap-2 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                      Read story <span aria-hidden>→</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}