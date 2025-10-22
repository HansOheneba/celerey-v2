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
    // Simple scoring example
    const score = Math.floor(Math.random() * 41) + 60; // random 60–100
    return score;
  };

  return (
    <section className="relative  text-white flex flex-col justify-center items-center px-6 py-12">
      <h2 className="text-3xl font-bold mb-2">Discover Your Wealth Health</h2>
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.6 }}
        className="h-[2px] w-full max-w-md bg-gradient-to-r from-transparent via-blue-500/40 to-transparent origin-left mb-10"
      />

      {!showResults ? (
        <>
          <Progress value={progress} className="w-full max-w-xl mb-8" />

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="max-w-xl text-center"
            >
              <p className="text-gray-400 mb-8 text-xl">
                {questions[step].question}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                {questions[step].options.map((opt) => (
                  <Button
                    key={opt}
                    variant="outline"
                    onClick={() => handleAnswer(opt)}
                    className="py-6 text-lg border-white/20 hover:bg-blue-600/20 hover:text-blue-400 w-full"
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
          className="text-center max-w-md"
        >
          <h2 className="text-2xl font-bold mb-4">Your Wealth Health Score</h2>
          <p className="text-6xl font-extrabold text-blue-400 mb-6">
            {calculateScore()}
          </p>
          <p className="text-gray-400 mb-8">
            Based on your responses, we’ve analyzed your current wealth posture.
            You can improve your score by reviewing your investments and
            optimizing your risk balance.
          </p>
          <Button
            variant="default"
            className="bg-blue-600 hover:bg-blue-700"
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
