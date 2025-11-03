"use client";

import { useEffect, useRef, useState } from "react";
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
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  // Cycle through videos every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videoList.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Force Safari autoplay
  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = true;
        video.playsInline = true;
        video.autoplay = true;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Safari may block autoplay — try again silently
            setTimeout(() => video.play().catch(() => {}), 500);
          });
        }
      }
    });
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center text-center min-h-[95vh] text-white px-6 md:pt-32 pb-20 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        {videoList.map((video, index) => (
          <video
            key={index}
            ref={(el) => {
              videoRefs.current[index] = el!;
            }}
            src={video}
            muted
            playsInline
            loop
            preload="auto"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ${
              index === currentVideo ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />

      {/* Text and Buttons */}
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
