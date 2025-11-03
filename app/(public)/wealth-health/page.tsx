"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface WealthHealthResults {
  score: number;
  answers: string[];
  recommendations: string[];
}

export default function WealthHealthPage() {
  const [results, setResults] = useState<WealthHealthResults | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedResults = sessionStorage.getItem("wealthHealthResults");
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    } else {
      // Redirect back if no results found
      router.push("/");
    }
  }, [router]);

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading your results...</p>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    if (score >= 60) return "text-orange-600";
    return "text-red-600";
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return "Excellent! You're financially resilient";
    if (score >= 80) return "Great! You're on the right track";
    if (score >= 70) return "Good! There's room for improvement";
    if (score >= 60) return "Fair! Time to build better habits";
    return "Needs attention! Let's improve your financial health";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 mt-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Wealth Health Assessment
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Based on your responses, here&apos;s your financial health analysis and
            personalized recommendations
          </p>
        </motion.div>

        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8 text-center"
        >
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Your Wealth Health Score
            </p>
          </div>

          <div className="mb-4">
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
              className={`text-8xl font-bold ${getScoreColor(
                results.score
              )} mb-4`}
            >
              {results.score}
            </motion.p>
          </div>

          <p className="text-xl font-semibold text-gray-800 mb-2">
            {getScoreMessage(results.score)}
          </p>
          <p className="text-gray-600 max-w-md mx-auto">
            This score reflects your current financial resilience, planning
            effectiveness, and growth potential.
          </p>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Personalized Recommendations
          </h2>

          <div className="space-y-4">
            {results.recommendations.map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {index + 1}
                  </span>
                </div>
                <p className="text-gray-700 text-lg">{rec}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center space-y-4"
        >
          <Button
            onClick={() => router.push("/")}
            className="bg-[#1B1856] hover:bg-[#1B1856]/80 text-white rounded-full px-8 py-3 text-lg font-semibold"
          >
            Retake Assessment
          </Button>

          <div>
            <Button
              variant="outline"
              onClick={() => window.print()}
              className="border-[#1B1856] text-[#1B1856] hover:bg-[#1B1856] hover:text-white rounded-full px-8 py-3 text-lg font-semibold"
            >
              Print Results
            </Button>
          </div>
        </motion.div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-4">
            Ready to take the next step in your financial journey?
          </p>
          <Button
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-full px-8 py-3"
          >
            Schedule a Free Consultation
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
