// app/advisors/page.tsx

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ArrowRight } from "lucide-react";

import { ADVISORS, type Advisor } from "@/lib/advisor-data";

function AdvisorCardImage({ src, alt }: { src?: string; alt: string }) {
  const fallback = "/placeholder-avatar.png";
  const [imgSrc, setImgSrc] = useState(src || fallback);

  useEffect(() => {
    setImgSrc(src || fallback);
  }, [src]);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className="object-cover"
      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
      onError={() => setImgSrc(fallback)}
    />
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen bg-[#fbfaf8]">
      <div className="mx-auto w-full max-w-[90rem] px-6 py-20 sm:py-24">
        {children}
      </div>
    </section>
  );
}

function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <PageShell>
      <div className="flex items-center justify-center py-24 text-center">
        <div className="max-w-xl">
          <p className="font-serif text-2xl text-neutral-900">{title}</p>
          <p className="mt-3 text-sm leading-7 text-neutral-600">{message}</p>
        </div>
      </div>
    </PageShell>
  );
}

function Pill({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-black/[0.04] px-3 py-1 text-xs text-neutral-600">
      {children}
    </span>
  );
}

export default function AdvisorsPage() {
  const advisors: Advisor[] = ADVISORS;

  const orderedAdvisors = useMemo(() => {
    return advisors.slice().sort((a, b) => {
      const aIsJude =
        a.slug === "jude-addo" || a.name.toLowerCase() === "jude addo";
      const bIsJude =
        b.slug === "jude-addo" || b.name.toLowerCase() === "jude addo";

      if (aIsJude === bIsJude) return 0;
      return aIsJude ? -1 : 1;
    });
  }, [advisors]);

  if (orderedAdvisors.length === 0) {
    return (
      <EmptyState
        title="No advisors available at the moment."
        message="Please check back soon."
      />
    );
  }

  return (
    <PageShell>
      {/* Back link */}
      <div className="mb-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Link>
      </div>

      {/* Header */}
      <div className="max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="text-[11px] tracking-[0.22em] text-[#b07d3d]"
        >
          OUR ADVISORY COUNCIL
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-5 font-serif text-4xl leading-[1.05] text-neutral-900 sm:text-5xl"
        >
          Global expertise, made accessible
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-5 text-sm leading-7 text-neutral-600"
        >
          Celerey is built to democratize access to high-quality financial
          advisory. The kind of guidance that is typically reserved for private
          banking and the most connected circles is being made available through
          a simpler, more transparent experience.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.22, duration: 0.6 }}
          className="mt-4 text-sm leading-7 text-neutral-600"
        >
          Our advisory council brings globally certified experience across
          private banking, capital markets, institutional finance, corporate
          law, executive leadership, and international property. Their role is
          to help shape our standards, strengthen our frameworks, and keep our
          advice grounded in real-world discipline.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 text-sm leading-7 text-neutral-900"
        >
          <span className="font-medium">
            You are getting global-grade guidance without needing an elite
            network.
          </span>{" "}
          That is the point.
        </motion.p>

        <div className="mt-8 h-px w-24 bg-neutral-900/10" />
      </div>

      {/* Advisors grid */}
      <div className="mt-16 grid gap-y-16 gap-x-12 md:grid-cols-2 lg:grid-cols-3">
        {orderedAdvisors.map((advisor, i) => {
          const tags = (advisor.expertise ?? []).slice(0, 3);

          return (
            <motion.article
              key={advisor.slug}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: i * 0.05 }}
              className="group"
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-[22px]">
                <div className="relative h-[240px] w-full sm:h-[260px]">
                  <AdvisorCardImage src={advisor.image} alt={advisor.name} />
                </div>
              </div>

              {/* Text */}
              <div className="mt-6">
                <h2 className="font-serif text-2xl leading-snug text-neutral-900">
                  {advisor.name}
                </h2>

                <p className="mt-3 text-sm text-neutral-700">{advisor.title}</p>

                <p className="mt-4 text-sm leading-7 text-neutral-600 line-clamp-3">
                  {advisor.experience}
                </p>

                {tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {tags.map((t) => (
                      <Pill key={t}>{t}</Pill>
                    ))}
                  </div>
                )}

                <div className="mt-8">
                  <Link
                    href={`/advisors/${advisor.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-neutral-800 hover:text-neutral-600"
                  >
                    View profile <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      <p className="mx-auto mt-20 max-w-3xl text-center text-xs text-neutral-500">
        For private and institutional enquiries, please contact us.
      </p>
    </PageShell>
  );
}
