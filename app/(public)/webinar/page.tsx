"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";


const webinarData = {
  title: "Smart Money Moves Through Changing Times",
  subtitle: "Navigating Your Financial Goals in a Rapidly Changing World",
  description:
    "Join us for a live conversation on how to stay financially grounded in times of rapid change. Hear from top leaders across finance and healthcare as they share practical steps, personal stories, and tools to help you build wealth with confidence.",
  date: "Thursday, 16th October 2025 at 17:00 hrs GMT",
  speakers: [
    {
      name: "Jude Addo",
      title: "CEO, JA Group",
      image:
        "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80&w=600",
    },
    {
      name: "Francis Gill",
      title: "CEO, Humboldt Financial",
      image:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=600",
    },
  ],
  expectations: [
    "Insights on managing wealth in uncertain times",
    "Personalized financial insights tailored to your goals",
    "Real examples of perseverance from industry leaders",
    "Live Q&A session",
  ],
  attendees: [
    "Professionals seeking to raise their leadership game",
    "Entrepreneurs and business owners",
    "Anyone seeking to elevate their financial future",
  ],
};

export default function WebinarPage() {
  const [email, setEmail] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thanks for registering, ${email}!`);
    setEmail("");
  };

//   const addToCalendar = () => {
//     const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
//       webinarData.title
//     )}&dates=20251016T170000Z/20251016T180000Z&details=${encodeURIComponent(
//       webinarData.description
//     )}&location=Online`;
//     window.open(calendarUrl, "_blank");
//   };

  return (
    <section className="bg-gradient-to-b from-white to-slate-50 text-[#1B1856] pb-32">
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
                src={speaker.image}
                alt={speaker.name}
                width={300}
                height={300}
                className="rounded-2xl object-cover h-64 w-64 mb-4"
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
          <p className="text-xl font-medium">{webinarData.date}</p>
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
            />
            <button
              type="submit"
              className="bg-[#D4AF37] hover:bg-[#C29E2C] text-[#1B1856] px-8 py-3.5 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              Sign Up
            </button>
          </form>

          {/* <button
            onClick={addToCalendar}
            className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-[#D4AF37] hover:text-white transition-all"
          >
            <span className="text-lg"></span> Add to Calendar
          </button> */}

          <p className="text-gray-400 text-xs mt-4">
            You’ll receive a confirmation email with your access link.
          </p>
        </div>
      </div>
    </section>
  );
}
