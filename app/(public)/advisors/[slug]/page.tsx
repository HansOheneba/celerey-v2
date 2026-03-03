"use client";

import { useEffect, useMemo, useState, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Advisor {
  id: number;
  slug: string;
  name: string;
  title: string;
  bio: string;
  experience: string;
  expertise: string[];
  image?: string;
  created_at?: string;
  updated_at?: string;
}

interface AdvisorPageProps {
  params: Promise<{ slug: string }>;
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function SoftSpinner({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-24">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border border-black/10" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-black/40 animate-spin" />
      </div>
      <p className="text-sm text-neutral-600">{label}</p>
    </div>
  );
}

function AdvisorImage({ src, alt }: { src?: string; alt: string }) {
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
      sizes="(min-width: 1024px) 900px, 100vw"
      onError={() => setImgSrc(fallback)}
      priority
    />
  );
}

function DetailSkeleton() {
  return (
    <section className="min-h-screen bg-[#fbfaf8]">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="space-y-10">
            <div className="h-4 w-24 animate-pulse rounded bg-black/[0.06]" />
            <div className="h-10 w-3/4 animate-pulse rounded bg-black/[0.06]" />
            <div className="h-4 w-1/3 animate-pulse rounded bg-black/[0.06]" />

            <div className="overflow-hidden rounded-[24px] border border-black/10 bg-white shadow-[0_18px_55px_rgba(0,0,0,0.08)]">
              <div className="relative h-80 w-full">
                <div className="absolute inset-0 animate-pulse bg-black/[0.06]" />
              </div>
              <div className="p-6">
                <div className="h-4 w-48 animate-pulse rounded bg-black/[0.06]" />
              </div>
            </div>

            <div className="rounded-[24px] border border-black/10 bg-white p-8 shadow-[0_18px_55px_rgba(0,0,0,0.06)]">
              <div className="h-4 w-28 animate-pulse rounded bg-black/[0.06]" />
              <div className="mt-4 space-y-3">
                <div className="h-4 w-full animate-pulse rounded bg-black/[0.06]" />
                <div className="h-4 w-11/12 animate-pulse rounded bg-black/[0.06]" />
                <div className="h-4 w-10/12 animate-pulse rounded bg-black/[0.06]" />
              </div>

              <div className="mt-10">
                <SoftSpinner label="Preparing your advisor profile" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AdvisorDetailsPage({ params }: AdvisorPageProps) {
  const [advisor, setAdvisor] = useState<Advisor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  const slug = use(params).slug;

  const pageTitle = useMemo(
    () => advisor?.name ?? "Advisor Profile",
    [advisor],
  );

  useEffect(() => {
    const fetchAdvisor = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch(`${apiBase}/advisors/${slug}`);

        if (!res.ok) {
          if (res.status === 404) {
            setError("Advisor not found.");
            return;
          }
          throw new Error(`Failed to fetch advisor: ${res.status}`);
        }

        const data = (await res.json()) as Advisor;
        setAdvisor(data);
      } catch (err) {
        console.error("Error fetching advisor:", err);
        setError("We could not load this advisor. Please try again shortly.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdvisor();
  }, [slug, apiBase]);

  if (isLoading) return <DetailSkeleton />;

  if (error || !advisor) {
    return (
      <section className="min-h-screen bg-[#fbfaf8]">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24 text-center">
          <p className="text-[11px] tracking-[0.22em] text-[#b07d3d]">
            ADVISOR PROFILE
          </p>
          <h1 className="mt-5 font-serif text-3xl text-neutral-900">
            {error || "Advisor unavailable."}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-neutral-600">
            Please return to the advisory list and select another profile.
          </p>

          <div className="mx-auto mt-10 max-w-xs">
            <Button
              onClick={() => router.push("/advisors")}
              className="h-11 w-full rounded-full bg-transparent text-neutral-900 ring-1 ring-black/20 hover:bg-black/[0.04]"
            >
              Back to Advisors
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#fbfaf8]">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl">
          {/* Top */}
          <div className="mb-10">
            <p className="text-[11px] tracking-[0.22em] text-[#b07d3d]">
              ADVISOR PROFILE
            </p>

            <h1 className="mt-4 font-serif text-4xl leading-[1.1] text-neutral-900 sm:text-5xl">
              {pageTitle}
            </h1>

            <p className="mt-3 text-sm text-neutral-700">{advisor.title}</p>

            <div className="mt-7 h-px w-full bg-black/10" />
          </div>

          {/* Top section: Image + Sidebar */}
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            {/* Left column */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="overflow-hidden rounded-[24px] border border-black/10 bg-white shadow-[0_18px_55px_rgba(0,0,0,0.08)]"
              >
                <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
                  <AdvisorImage src={advisor.image} alt={advisor.name} />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-black/0 opacity-80" />
                </div>

                <div className="flex items-center justify-between gap-4 p-6">
                  <p className="text-xs text-neutral-600">
                    Celerey Advisory Network
                  </p>
                  <Link
                    href="/advisors"
                    className="text-xs text-neutral-600 underline-offset-4 hover:underline"
                  >
                    Back to advisors
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right sidebar */}
            <motion.aside
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="lg:sticky lg:top-24"
            >
              <div className="rounded-[24px] border border-black/10 bg-white p-8 shadow-[0_18px_55px_rgba(0,0,0,0.06)]">
                <p className="text-sm font-semibold text-[#b07d3d]">
                  Areas of expertise
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {advisor.expertise.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-black/10 bg-black/[0.02] px-3 py-1 text-xs text-neutral-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-10">
                  <Button className="h-11 w-full rounded-full bg-[#1a1856] text-white hover:bg-[#1a1856]/90">
                    Book a Session
                  </Button>

                  <p className="mt-3 text-center text-xs text-neutral-500">
                    Availability is being confirmed after request.
                  </p>
                </div>

                <div className="mt-8 h-px w-full bg-black/10" />

                <div className="mt-8">
                  <Link href="/advisors">
                    <Button className="h-11 w-full rounded-full bg-transparent text-neutral-900 ring-1 ring-black/20 hover:bg-black/[0.04]">
                      Back to All Advisors
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.aside>
          </div>

          {/* Full-width Overview */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mt-14 rounded-[24px] border border-black/10 bg-white p-10 shadow-[0_18px_55px_rgba(0,0,0,0.06)]"
          >
            <p className="text-sm font-semibold text-[#b07d3d]">Overview</p>

            <div className="mt-6 max-w-3xl">
              <p className="text-[15px] leading-8 text-neutral-700">
                {advisor.bio}
              </p>
            </div>
          </motion.div>

          {/* Full-width Experience */}
          <div className="mt-10 rounded-[24px] border border-black/10 bg-white p-10 shadow-[0_18px_55px_rgba(0,0,0,0.06)]">
            <p className="text-sm font-semibold text-[#b07d3d]">Experience</p>

            <div className="mt-6 max-w-3xl">
              <p className="text-[15px] leading-8 text-neutral-700">
                {advisor.experience}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
