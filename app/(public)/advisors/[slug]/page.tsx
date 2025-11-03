"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { advisors } from "@/lib/advisors";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface AdvisorPageProps {
  params: Promise<{ slug: string }>; // params is now a Promise
}

export default function AdvisorDetailsPage({ params }: AdvisorPageProps) {
  // unwrap params
  const { slug } = use(params);

  const advisor = advisors.find((a) => a.slug === slug);
  const router = useRouter();

  if (!advisor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <p className="text-gray-600 text-lg mb-4">
          Advisor not found or unavailable.
        </p>
        <Button
          onClick={() => router.push("/advisors")}
          className="bg-[#1B1856] text-white rounded-full"
        >
          Back to Advisors
        </Button>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-20 px-6 mt-10">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative h-80 w-full rounded-2xl overflow-hidden shadow-md"
        >
          <Image
            src={advisor.image}
            alt={advisor.name}
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-semibold text-[#1B1856] mb-2">
            {advisor.name}
          </h1>
          <p className="text-blue-700 font-medium mb-4">{advisor.title}</p>
          <p className="text-gray-700 leading-relaxed mb-6">{advisor.bio}</p>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#1B1856] mb-2">
              Areas of Expertise
            </h3>
            <ul className="flex flex-wrap gap-2">
              {advisor.expertise.map((skill) => (
                <li
                  key={skill}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <Button className="bg-[#1B1856] hover:bg-[#1B1856]/80 text-white rounded-full">
            Book Session
          </Button>
        </motion.div>
      </div>

      {/* Experience Section */}
      <div className="max-w-5xl mx-auto mt-16 text-center border-t border-gray-200 pt-10">
        <p className="text-gray-600 text-lg">{advisor.experience}</p>
        <div className="mt-8">
          <Link href="/advisors">
            <Button
              className="border border-[#1B1856] text-[#1B1856] hover:bg-[#1B1856] bg-transparent hover:text-white rounded-full"
            >
              Back to All Advisors
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
