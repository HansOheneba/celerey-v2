"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const videoList = [
  "/videos/family.mp4",
  "/videos/vid2.mp4",
  "/videos/vid3.mp4",
  "/videos/vid4.mp4",
  "/videos/vid5.mp4",
  "/videos/vid6.mp4",
];

export default function Hero() {
  const [currentVideo, setCurrentVideo] = useState(0);

  // Cycle through videos every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videoList.length);
    }, 5000); // 10 seconds per video
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center text-center min-h-[95vh] text-white px-6 md:pt-32 pb-20 overflow-hidden">
      {/* Video Background with fade transition */}
      <div className="absolute inset-0 w-full h-full">
        {videoList.map((video, index) => (
          <video
            key={index}
            src={video}
            autoPlay
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ${
              index === currentVideo ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />

      {/* Main content */}
      <motion.div
        className="relative max-w-3xl mx-auto z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
          Your goals. Our guidance.
          <span className="text-blue-500"> Real results.</span>
        </h1>

        <p className="text-md sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          We blend intelligent tools with human expertise to make managing your
          finances simple — so life feels lighter and your goals feel closer.
        </p>

        {/* CTA Buttons */}
        <div className="w-full max-w-md mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <Button
              asChild
              className="flex-1 w-full p-5 bg-blue-600 hover:bg-blue-700 rounded-2xl"
            >
              <Link
                href="/free-scan"
                className="w-full block text-center text-white font-medium py-2 text-sm sm:text-base"
              >
                Start Your Free Financial Health Scan
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="flex-1 w-full p-5 border-white/30 rounded-2xl"
            >
              <Link
                href="/advisors"
                className="w-full block text-center text-white hover:bg-white/10 font-medium py-2 text-sm sm:text-base"
              >
                Book a Session with an Advisor
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
