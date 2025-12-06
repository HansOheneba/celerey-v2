"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Community() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subscribePromise = async () => {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/leads/`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "newsletter" }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to subscribe.");
      }

      return { email };
    };

    toast.promise(subscribePromise(), {
      loading: "Joining the Celerey community...",
      success: (data) => {
        setEmail("");
        return `Welcome! Updates will be sent to ${data.email}`;
      },
      error: (err) =>
        err instanceof Error ? err.message : "Failed to subscribe. Try again.",
      finally: () => setIsSubmitting(false),
    });
  };

  return (
    <section className="relative overflow-hidden py-32 text-gray-900 bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-900">
            Join <span className="text-blue-800">The Celerey Insider</span>{" "}
            Community
          </h2>
          <p className="text-gray-700 mb-8">
            Connect with like-minded individuals on their wealth-building
            journey.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
              className="flex-1 h-10 px-4 rounded-md border border-blue-200 bg-white text-gray-700 focus:border-blue-500 outline-none shadow-sm"
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Joining..." : "Join Community"}
            </Button>
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
          <div className="p-8 bg-white border border-blue-100 rounded-3xl shadow-sm">
            <h3 className="text-2xl font-semibold mb-3 text-gray-900">
              Need immediate help?
            </h3>
            <p className="text-gray-700 mb-6">
              Chat with our{" "}
              <span className="text-blue-800 font-medium">AI assistant</span> or
              connect directly with our Client Success team.
            </p>

            <Link href="https://wa.me/12272296921" target="_blank">
              <Button
                className="bg-green-600 hover:bg-green-500 text-white flex items-center gap-2"
                onClick={() => toast.info("Opening WhatsApp to connect...")}
              >
                <Phone className="w-5 h-5" />
                WhatsApp
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
