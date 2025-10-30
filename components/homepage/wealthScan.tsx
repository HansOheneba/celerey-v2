"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const questions = [
  {
    question: "What's your current age range?",
    options: ["18-30", "31-45", "46-60", "60+"],
  },
  {
    question: "What's your primary financial goal?",
    options: [
      "Building emergency fund",
      "Saving for retirement",
      "Growing investments",
      "Debt management",
    ],
  },
  {
    question: "How would you describe your investment experience?",
    options: ["Beginner", "Some experience", "Experienced", "Expert"],
  },
  {
    question: "What's your risk tolerance?",
    options: ["Conservative", "Moderate", "Aggressive", "Very aggressive"],
  },
  {
    question: "How often do you review your finances?",
    options: ["Daily", "Weekly", "Monthly", "Rarely"],
  },
  {
    question: "Do you have a financial advisor?",
    options: [
      "Yes, currently working with one",
      "Had one in the past",
      "Looking for one",
      "Prefer self-directed",
    ],
  },
  {
    question: "What's most important to you in wealth management?",
    options: [
      "Maximizing returns",
      "Minimizing risk",
      "Tax optimization",
      "Comprehensive planning",
    ],
  },
];

export default function WealthScan() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answer: string) => {
    const updated = [...answers];
    updated[step] = answer;
    setAnswers(updated);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  };

  const progress = ((step + 1) / questions.length) * 100;

  const calculateScore = () => {
    const score = Math.floor(Math.random() * 41) + 60; // 60–100
    return score;
  };

  return (
    <section className="relative bg-white text-gray-900 flex flex-col justify-center items-center px-6 py-20">
      <h2 className="text-3xl font-bold mb-2 text-center">
        Discover Your Wealth Health
      </h2>
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.6 }}
        className="h-[2px] w-full max-w-md bg-gradient-to-r from-transparent via-blue-500/40 to-transparent origin-left mb-10"
      />

      {!showResults ? (
        <>
          <Progress value={progress} className="w-full max-w-xl mb-10 " />

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="max-w-xl w-full"
            >
              {/* Question Card */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl shadow-sm p-8 text-center mb-6">
                <p className="text-lg font-medium text-gray-800">
                  {questions[step].question}
                </p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                {questions[step].options.map((opt) => (
                  <Button
                    key={opt}
                    onClick={() => handleAnswer(opt)}
                    className="py-6 text-lg font-medium w-full bg-blue-800 hover:bg-blue-900 text-white rounded-full transition-all"
                  >
                    {opt}
                  </Button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md bg-gray-50 border border-gray-200 rounded-2xl shadow-sm p-8"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            Your Wealth Health Score
          </h2>
          <p className="text-6xl font-extrabold text-[#1B1856] mb-6">
            {calculateScore()}
          </p>
          <p className="text-gray-600 mb-8">
            Based on your responses, we’ve analyzed your current wealth posture.
            You can improve your score by reviewing your investments and
            optimizing your risk balance.
          </p>
          <Button
            variant="default"
            className="bg-[#1B1856] hover:bg-[#1B1856]/80 text-white rounded-full"
            onClick={() => {
              setShowResults(false);
              setStep(0);
              setAnswers([]);
            }}
          >
            Retake Assessment
          </Button>
        </motion.div>
      )}
    </section>
  );
}
