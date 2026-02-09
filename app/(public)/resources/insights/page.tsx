"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { researchPapers } from "@/lib/research";
import { ArrowLeft, Download, Calendar, FileType } from "lucide-react";

export default function ResearchPage() {
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
            Insights
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl text-base md:text-lg leading-relaxed">
            In-depth analysis, market outlooks, and strategic frameworks. Download our
            papers to deepen your understanding.
          </p>
        </motion.div>

        {/* Grid (same vibe as resources cards) */}
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
            {researchPapers.map((paper, index) => (
              <motion.article
                key={paper.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                className="group"
              >
                {/* Image */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                  <Image
                    src={paper.coverImage}
                    alt={paper.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 520px"
                    priority={index < 2}
                  />

                  {/* subtle top-left pill */}
                  <div className="absolute top-4 left-4">
                    <span className="text-xs font-medium text-gray-900 bg-white/90 border border-white/60 backdrop-blur rounded-full px-3 py-1">
                      {paper.category ?? "Insight"}
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div className="mt-6">
                  <h2 className="text-xl md:text-2xl font-medium text-gray-900 line-clamp-2">
                    {paper.title}
                  </h2>

                  <p className="mt-2 text-gray-600 leading-relaxed line-clamp-3 max-w-xl">
                    {paper.description}
                  </p>

                  {/* Meta */}
                  <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
                    <span className="inline-flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(paper.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                      })}
                    </span>

                    {paper.pageCount ? (
                      <span className="inline-flex items-center gap-2">
                        <FileType className="w-4 h-4" />
                        {paper.pageCount} pages
                      </span>
                    ) : null}
                  </div>

                  {/* Action */}
                  <div className="mt-5">
                    <a
                      href={paper.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-gray-900/70 hover:text-gray-900 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Read Article <span aria-hidden>→</span>
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-14 text-center text-sm text-gray-500"
        >
          <p>
            All papers are available for download. For institutional inquiries, please{" "}
            <Link href="/contact" className="text-gray-900 hover:underline">
              contact us
            </Link>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}