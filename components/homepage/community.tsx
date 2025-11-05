"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {  Phone } from "lucide-react";
import Link from "next/link";

export default function Community() {
  const [email, setEmail] = useState("");

  return (
    <section className="relative overflow-hidden py-32 text-white">
      {/* Soft bottom glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(0,102,255,0.15),transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-black">
            Join <span className="text-blue-500">Celerey Insider</span>{" "}
            Community
          </h2>
          <p className="text-gray-400 mb-8">
            Connect with like-minded individuals on their wealth-building
            journey.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert(`Subscribed with ${email}`);
              setEmail("");
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-full bg-gray-100 border border-gray-700 text-gray-500 focus:border-blue-500 outline-none"
              />
              <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-lg opacity-0 hover:opacity-30 transition-opacity pointer-events-none" />
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-500 transition-colors"
            >
              Join Community
            </motion.button>
          </form>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="md:pl-8"
        >
          <div className="p-8 bg-[#111] border border-gray-800 rounded-3xl backdrop-blur-sm">
            <h3 className="text-2xl font-semibold mb-3">
              Need immediate help?
            </h3>
            <p className="text-gray-400 mb-6">
              Chat with our{" "}
              <span className="text-blue-400 font-medium">AI assistant</span>{" "}
              located at the
              <span className="text-blue-400"> bottom-right corner</span> of
              your screen, or connect directly our Client Success team.
            </p>

            <Link href={"https://wa.me/12272296921"} target="_blank">
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 hover:bg-green-500 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  WhatsApp
                </motion.button>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
