"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

interface Question {
  question: string;
  options: string[];
  why: string;
  insight: string;
  pillar: string;
  weight: number;
}

interface PillarScore {
  score: number;
  answer: string;
}

interface PillarScores {
  [key: string]: PillarScore;
}

interface TopBottomPillars {
  top: string[];
  bottom: string[];
}

interface ScoreCategory {
  label: string;
  tone: string;
  persona: string;
}

interface WealthHealthData {
  score: number;
  category: ScoreCategory;
  answers: string[];
  pillarScores: PillarScores;
  recommendations: string[];
  topPillars: string[];
  bottomPillars: string[];
}

const questions: Question[] = [
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
    pillar: "Income Stability",
    weight: 0.15,
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
    pillar: "Spending & Saving",
    weight: 0.2,
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
    pillar: "Resilience",
    weight: 0.2,
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
    pillar: "Debt & Credit Health",
    weight: 0.15,
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
    pillar: "Growth Readiness",
    weight: 0.15,
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
    pillar: "Planning & Direction",
    weight: 0.15,
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

  const calculateScore = (): number => {
    let totalScore = 0;

    answers.forEach((answer, index) => {
      const question = questions[index];
      const optionIndex = question.options.indexOf(answer);
      const answerValue = optionIndex + 1; // 1-4 scale
      const weightedScore = answerValue * question.weight;
      totalScore += weightedScore;
    });

    return Math.min(Math.floor(totalScore * 25), 100); // Scale to 0-100
  };

  const getPillarScores = (): PillarScores => {
    const pillarScores: PillarScores = {};

    answers.forEach((answer, index) => {
      const question = questions[index];
      const optionIndex = question.options.indexOf(answer);
      const answerValue = (optionIndex + 1) * 25; // Convert to 25-100 scale
      pillarScores[question.pillar] = {
        score: answerValue,
        answer: answer,
      };
    });

    return pillarScores;
  };

  const getScoreCategory = (score: number): ScoreCategory => {
    if (score >= 80)
      return {
        label: "Strategic Planner",
        tone: "Empowering",
        persona: "Strategist",
      };
    if (score >= 60)
      return {
        label: "Structured Achiever",
        tone: "Balanced",
        persona: "Planner",
      };
    if (score >= 40)
      return {
        label: "Building Confidence",
        tone: "Encouraging",
        persona: "Builder",
      };
    return {
      label: "Foundation Builder",
      tone: "Supportive",
      persona: "Groundbreaker",
    };
  };

  const generateRecommendations = (pillarScores: PillarScores): string[] => {
    const recommendations: string[] = [];
    const lowScoreThreshold = 50;

    // Check each pillar and generate recommendations for low scores
    Object.entries(pillarScores).forEach(([pillar, data]) => {
      if (data.score < lowScoreThreshold) {
        switch (pillar) {
          case "Income Stability":
            recommendations.push(
              "Build a larger emergency fund to handle income variability"
            );
            break;
          case "Spending & Saving":
            recommendations.push(
              "Gradually increase your savings rate by 1–2% each month"
            );
            break;
          case "Resilience":
            recommendations.push(
              "Build an emergency fund covering 3–6 months of essential expenses"
            );
            break;
          case "Debt & Credit Health":
            recommendations.push(
              "Develop a debt management strategy to reduce financial stress"
            );
            break;
          case "Growth Readiness":
            recommendations.push(
              "Create a clear investment plan aligned with your long-term goals"
            );
            break;
          case "Planning & Direction":
            recommendations.push(
              "Establish a proactive financial planning routine"
            );
            break;
        }
      }
    });

    // If all scores are good, provide maintenance recommendations
    if (recommendations.length === 0) {
      return [
        "Maintain your current healthy financial habits",
        "Consider periodic reviews to optimize your strategy",
        "Explore advanced investment opportunities",
      ];
    }

    return recommendations.slice(0, 3); // Return top 3 recommendations
  };

  const getTopAndBottomPillars = (
    pillarScores: PillarScores
  ): TopBottomPillars => {
    const sortedPillars = Object.entries(pillarScores).sort(
      ([, a], [, b]) => b.score - a.score
    );

    return {
      top: sortedPillars.slice(0, 2).map(([pillar]) => pillar),
      bottom: sortedPillars.slice(-2).map(([pillar]) => pillar),
    };
  };

  const handleNext = () => {
    if (step < questions.length - 1) setStep(step + 1);
    else {
      const score = calculateScore();
      const pillarScores = getPillarScores();
      const category = getScoreCategory(score);
      const { top, bottom } = getTopAndBottomPillars(pillarScores);

      const data: WealthHealthData = {
        score,
        category,
        answers,
        pillarScores,
        recommendations: generateRecommendations(pillarScores),
        topPillars: top,
        bottomPillars: bottom,
      };

      sessionStorage.setItem("wealthHealthResults", JSON.stringify(data));
      router.push("/wealth-health");
    }
  };

  const handlePrev = () => setStep((s) => Math.max(0, s - 1));

  if (questions.length === 0)
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        <p>Add questions to begin the wealth scan.</p>
      </div>
    );

  return (
    <section id="wealth-scan" className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50 text-gray-900 px-6 py-16">
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
          This questionaire will take about 3 minutes, after you are done you
          can view your results and recommendations.
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
