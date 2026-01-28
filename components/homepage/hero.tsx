"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const videoList = [
  "/videos/vid9.mp4",
  "/videos/family.mp4",
  "/videos/vid7.mp4",
  "/videos/vid8.mp4",
  "/videos/vid2.mp4",
  "/videos/vid4.mp4",
  "/videos/vid5.mp4",
];

const STATS = [
  { value: "500+", label: "FAMILIES GUIDED" },
  { value: "12+", label: "COUNTRIES SERVED" },
  { value: "CFP®", label: "CERTIFIED ADVISORS" },
];

function useCountUp(target: number, isVisible: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let current = 0;
    let elapsed = 0;
    const duration = 1800; // ms - increased for slower animation
    const interval = setInterval(() => {
      elapsed += 30;
      // Ease-out quint: 1 - (1-t)^5 (very strong deceleration)
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 5);
      current = target * easeProgress;

      if (elapsed >= duration) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isVisible, target]);

  return count;
}

export default function Hero() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const handleScrollToWealthHealth = () => {
    const el = document.getElementById("wealth-scan");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
      if (!video) return;
      video.muted = true;
      video.playsInline = true;
      video.autoplay = true;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          setTimeout(() => video.play().catch(() => {}), 500);
        });
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-[95vh] w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        {videoList.map((video, index) => (
          <video
            key={index}
            ref={(el) => {
              if (el) videoRefs.current[index] = el;
            }}
            src={video}
            muted
            playsInline
            loop
            preload="auto"
            className={[
              "absolute inset-0 h-full w-full object-cover",
              "transition-opacity duration-[2000ms]",
              index === currentVideo ? "opacity-100" : "opacity-0",
            ].join(" ")}
          />
        ))}
      </div>

      <div className="" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/40" />
      <div className="" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[95vh] max-w-6xl flex-col items-center justify-between px-6 pt-20 pb-16 text-center">
        <div></div>
        <motion.div
          className="w-full max-w-4xl"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* eyebrow */}
          {/* <p className="text-[11px] sm:text-xs tracking-[0.22em] text-white">
            MODERN WEALTH ADVISORY
          </p> */}

          {/* headline */}
          <h1 className="mt-6 font-serif text-5xl leading-[1.05] text-white sm:text-6xl md:text-7xl">
            Wealth built with{" "}
            <span className="italic">intention</span>
          </h1>

          {/* subtext */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white sm:text-lg">
            Celerey is combining intelligent technology with globally certified
            advisors to bring structure, clarity, and long-term direction to your
            financial life.
          </p>

          {/* buttons */}
          <div className="mx-auto mt-10 flex w-full max-w-xl flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              onClick={handleScrollToWealthHealth}
              className="w-full rounded-full px-7 py-6 text-sm font-medium text-white sm:w-auto"
            >
              <Link href="/#wealth-scan">Start with $100</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="w-full rounded-full border-neutral-900/15 bg-white/40 px-7 py-6 text-sm font-medium text-white hover:bg-white/60 sm:w-auto"
            >
              <Link href="/#wealth-scan">Free Financial Health Scan</Link>
            </Button>
          </div>
        </motion.div>

        {/* divider + stats */}
        <div ref={statsRef} className="mt-14 w-full max-w-5xl">
          <div className="mx-auto h-px w-full bg-white/20" />

          <div className="mx-auto mt-10 grid w-full grid-cols-1 gap-8 sm:grid-cols-3">
            {STATS.map((s) => {
              const numericValue = parseInt(s.value);
              const isNumeric = !isNaN(numericValue);
              const count = useCountUp(isNumeric ? numericValue : 0, statsVisible);

              return (
                <motion.div
                  key={s.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={statsVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <div className="font-serif text-3xl text-white sm:text-4xl">
                    {isNumeric ? count : s.value}
                  </div>
                  <div className="mt-1 text-[11px] tracking-[0.16em] text-white/80">
                    {s.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
