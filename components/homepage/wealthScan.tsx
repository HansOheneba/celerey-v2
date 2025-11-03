"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

const questions = [
  {
    question: "How predictable is your monthly income?",
    options: [
      "Very stable – I can plan ahead confidently",
      "Somewhat stable – it varies but manageable",
      "Irregular – my income changes month to month",
      "Unstable – I can't plan reliably",
    ],
    why: "A stable income enables forward planning; variability increases the need for stronger liquidity.",
    insight: "Insight Generated: Cash-flow stability and planning capacity.",
  },
  {
    question:
      "Roughly what portion of your income do you manage to save or invest each month?",
    options: [
      "None – I use most of what I earn",
      "Less than 10%",
      "Between 10–25%",
      "Over 25%",
    ],
    why: "This reveals whether short-term lifestyle is crowding out long-term goals.",
    insight: "Insight Generated: Savings rate and discipline score.",
  },
  {
    question:
      "If your main income stopped today, how long could you comfortably maintain your current lifestyle?",
    options: [
      "Less than a month",
      "1–3 months",
      "3–6 months",
      "More than 6 months",
    ],
    why: "This measures how prepared you are for shocks — the foundation of financial wellbeing.",
    insight: "Insight Generated: Liquidity and emergency-fund strength.",
  },
  {
    question: "How would you describe your current debt or credit position?",
    options: [
      "I have no debt",
      "I manage my debts easily",
      "I manage but it sometimes feels tight",
      "It's difficult or stressful to manage",
    ],
    why: "Debt affects freedom and long-term growth potential.",
    insight:
      "Insight Generated: Debt-to-income comfort ratio and stress level.",
  },
  {
    question:
      "How confident are you that you're saving or investing enough for future goals (retirement, business, home, etc.)?",
    options: [
      "Very confident – I have a clear plan",
      "Fairly confident – I'm doing something but unsure if it's enough",
      "Not very confident – I've started but need direction",
      "Not confident – I haven't started planning yet",
    ],
    why: "Determines whether users are on track for future milestones.",
    insight:
      "Insight Generated: Investment readiness and goal-progress indicator.",
  },
  {
    question:
      "Which best describes how you currently approach your finances overall?",
    options: [
      "I have a structured plan I follow",
      "I have ideas but no written plan",
      "I'm reactive – I deal with things as they come",
      "I avoid thinking about it until I have to",
    ],
    why: "Captures strategic maturity — whether someone is proactive or reactive about money.",
    insight: "Insight Generated: Planning maturity and confidence index.",
  },
];
export default function WealthScan() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const router = useRouter();

  const progress = ((step + 1) / questions.length) * 100;
  const current = questions[step];

  const handleSelect = (opt: string) => {
    const updated = [...answers];
    updated[step] = opt;
    setAnswers(updated);
  };

  const handleNext = () => {
    if (step < questions.length - 1) setStep(step + 1);
    else {
      const score = calculateScore();
      const data = {
        score,
        answers,
        recommendations: generateRecommendations(answers),
      };
      sessionStorage.setItem("wealthHealthResults", JSON.stringify(data));
      router.push("/wealth-health");
    }
  };

  const handlePrev = () => setStep((s) => Math.max(0, s - 1));

  const calculateScore = () => {
    let score = 60;
    answers.forEach((answer, index) => {
      const optionIndex = questions[index].options.indexOf(answer);
      const points = [0, 10, 20, 30][optionIndex] || 0;
      score += points / questions.length;
    });
    return Math.min(Math.floor(score), 100);
  };

  const generateRecommendations = (answers: string[]) => {
    const recs: string[] = [];
    if (answers[0]?.includes("Irregular") || answers[0]?.includes("Unstable"))
      recs.push("Build a larger emergency fund to handle income variability.");
    if (answers[1]?.includes("None") || answers[1]?.includes("Less than 10%"))
      recs.push("Gradually increase your savings rate by 1–2% each month.");
    if (
      answers[2]?.includes("Less than a month") ||
      answers[2]?.includes("1–3 months")
    )
      recs.push("Build an emergency fund covering 3–6 months of expenses.");
    if (answers[3]?.includes("difficult") || answers[3]?.includes("tight"))
      recs.push("Develop a debt management strategy to reduce stress.");
    if (
      answers[4]?.includes("Not confident") ||
      answers[4]?.includes("Not very confident")
    )
      recs.push("Create a clear investment plan for your long-term goals.");
    if (answers[5]?.includes("reactive") || answers[5]?.includes("avoid"))
      recs.push("Adopt a proactive routine for financial planning.");
    return recs.length
      ? recs
      : [
          "Maintain your strong financial habits.",
          "Review and optimize your strategy periodically.",
          "Explore advanced investment opportunities.",
        ];
  };

  if (questions.length === 0)
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        <p>Add questions to begin the wealth scan.</p>
      </div>
    );

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50 text-gray-900 px-6 py-16">
      <h2 className="text-2xl sm:text-4xl font-semibold text-center mb-2 text-blue-950">
        Discover Your Financial Health
      </h2>

      <p className="text-gray-600 text-center mb-8 text-md sm:text-base">
        Take a quick self-assessment to understand your financial strengths and
        opportunities for growth.
      </p>
      <div className="w-full max-w-2xl bg-white border border-gray-100 rounded-3xl shadow-sm p-8">
        {/* Header */}
        <p className="text-gray-600 text-center mb-8 text-sm sm:text-base">
          This questionaire will take about 3 minutes, after you are done you can view your results and recommendations.
        </p>
        {/* Progress */}
        <Progress
          value={progress}
          className="w-full mb-8 h-2 bg-gray-200 [&>div]:bg-blue-900"
        />

        {/* Question container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="text-center"
          >
            <h3 className="text-lg font-medium mb-6 text-blue-950">
              {current.question}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {current.options.map((opt: string) => (
                <button
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  className={`p-4 border rounded-2xl text-sm transition-all duration-150
                    ${
                      answers[step] === opt
                        ? "border-blue-900 bg-blue-950 text-white shadow-sm"
                        : "border-gray-300 hover:border-blue-800 hover:bg-blue-50"
                    }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 mt-10 text-left text-sm text-gray-600">
              <p>
                <span className="font-medium text-blue-950">Why we ask:</span>{" "}
                {current.why}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-10">
          <Button
            onClick={handlePrev}
            disabled={step === 0}
            className="rounded-[12px] border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={!answers[step]}
            className="rounded-[12px] bg-blue-950 hover:bg-blue-950/80 text-white"
          >
            {step === questions.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    </section>
  );
}