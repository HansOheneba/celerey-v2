"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-[6rem] md:text-[8rem] font-extrabold tracking-tight bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent drop-shadow-lg">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mt-2">
          Page Not Found
        </h2>
        <p className="text-gray-400 mt-3 max-w-md mx-auto">
          Oops! The page you&apos;re looking for doesn&apos;t exist or may have been
          moved.
        </p>

        <motion.div
          // whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white text-black px-5 py-3 rounded-full font-medium transition hover:bg-gray-200"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Home
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="absolute inset-0 flex justify-center items-center pointer-events-none"
      >
        <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 blur-[120px]" />
      </motion.div>
    </div>
  );
}
