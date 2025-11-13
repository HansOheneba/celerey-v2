"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Speaker {
  name: string;
  title: string;
  image: string;
}

interface WebinarData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  formatted_date: string;
  speakers: Speaker[];
  expectations: string[];
  attendees: string[];
}

export default function WebinarPage() {
  const [webinarData, setWebinarData] = useState<WebinarData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchWebinar = async () => {
      try {
        const res = await fetch(`${apiBase}/webinars/active`);

        if (!res.ok) {
          if (res.status === 404) {
            setError("No active webinar found");
            return;
          }
          throw new Error(`Failed to fetch webinar: ${res.status}`);
        }

        const data = await res.json();
        setWebinarData(data);
      } catch (err) {
        console.error("Error fetching webinar:", err);
        setError("Failed to load webinar. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWebinar();
  }, [apiBase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch(`${apiBase}/webinars/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to register");
      }

      setSubmitMessage(
        "Successfully registered! Check your email for confirmation."
      );
      setEmail("");
    } catch (err) {
      setSubmitMessage(
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <section className="bg-gradient-to-b from-white to-slate-50 text-[#1B1856] py-32">
        <div className="max-w-6xl mx-auto px-6 text-center pt-20">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-gray-600">Loading webinar...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !webinarData) {
    return (
      <section className="bg-gradient-to-b from-white to-slate-50 text-[#1B1856] py-32">
        <div className="max-w-6xl mx-auto px-6 text-center pt-20">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-red-600">
              {error || "Webinar not found"}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-b from-white to-slate-50 text-[#1B1856] py-32">
      <div className="max-w-6xl mx-auto px-6 text-center pt-20">
        <p className="uppercase tracking-wide text-sm text-[#6B5DCC] mb-2">
          Celerey Webinar Series
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold mb-3">
          {webinarData.title}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          {webinarData.subtitle}
        </p>
        <p className="text-gray-600 max-w-3xl mx-auto mb-10">
          {webinarData.description}
        </p>

        {/* Speakers */}
        <div className="grid md:grid-cols-2 gap-10 justify-center mb-12">
          {webinarData.speakers.map((speaker, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center bg-white rounded-2xl shadow-sm border p-6"
            >
              <Image
                src={speaker.image || "/placeholder-avatar.png"}
                alt={speaker.name}
                width={300}
                height={300}
                className="rounded-2xl object-cover h-64 w-64 mb-4"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder-avatar.png";
                }}
              />
              <h3 className="text-lg font-semibold">{speaker.name}</h3>
              <p className="text-gray-500">{speaker.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Date Section */}
        <div className="bg-[#1B1856] text-white py-5 px-6 rounded-2xl max-w-xl mx-auto mb-14">
          <p className="uppercase tracking-widest text-sm opacity-80 mb-1">
            Date & Time
          </p>
          <p className="text-xl font-medium">{webinarData.formatted_date}</p>
        </div>

        {/* Expectations */}
        <div className="grid md:grid-cols-2 gap-8 text-left max-w-5xl mx-auto mb-20">
          <div>
            <h4 className="text-xl font-semibold mb-3">What to expect:</h4>
            <ul className="space-y-2 text-gray-700">
              {webinarData.expectations.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#6B5DCC] mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-3">Who should attend:</h4>
            <ul className="space-y-2 text-gray-700">
              {webinarData.attendees.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#6B5DCC] mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-[#1B1856] text-white py-16 px-6 rounded-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Reserve your spot now
          </h2>
          <p className="text-gray-300 mb-10 max-w-2xl mx-auto">
            Add your email to receive your invitation link and event details.
            <span className="block text-[#D4AF37] font-medium mt-1">
              Slots are limited — secure yours today!
            </span>
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4 justify-center max-w-2xl mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-5 py-3.5 rounded-full text-[#1B1856] placeholder-gray-500 bg-white border border-transparent focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37] focus:outline-none transition-all"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#D4AF37] hover:bg-[#C29E2C] text-[#1B1856] px-8 py-3.5 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          {submitMessage && (
            <div
              className={`mt-4 text-sm ${
                submitMessage.includes("Successfully")
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {submitMessage}
            </div>
          )}

          <p className="text-gray-400 text-xs mt-4">
            You&apos;ll receive a confirmation email with your access link.
          </p>
        </div>
      </div>
    </section>
  );
}
