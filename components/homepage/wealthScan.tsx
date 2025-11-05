"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

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
  rawValue: number; // 1-4 scale
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
  email: string;
  submittedAt: string;
}

const questions: Question[] = [
  {
    question: "How predictable is your monthly income?",
    options: [
      "Very stable – I can plan ahead confidently", // 4
      "Somewhat stable – it varies but manageable", // 3
      "Irregular – my income changes month to month", // 2
      "Unstable – I can't plan reliably", // 1
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
      "Over 25%", // 4
      "Between 10–25%", // 3
      "Less than 10%", // 2
      "None – I use most of what I earn", // 1
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
      "More than 6 months", // 4
      "3–6 months", // 3
      "1–3 months", // 2
      "Less than a month", // 1
    ],
    why: "This measures how prepared you are for shocks — the foundation of financial wellbeing.",
    insight: "Insight Generated: Liquidity and emergency-fund strength.",
    pillar: "Resilience",
    weight: 0.2,
  },
  {
    question: "How would you describe your current debt or credit position?",
    options: [
      "I have no debt", // 4
      "I manage my debts easily", // 3
      "I manage but it sometimes feels tight", // 2
      "It's difficult or stressful to manage", // 1
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
      "Very confident – I have a clear plan", // 4
      "Fairly confident – I'm doing something but unsure if it's enough", // 3
      "Not very confident – I've started but need direction", // 2
      "Not confident – I haven't started planning yet", // 1
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
      "I have a structured plan I follow", // 4
      "I have ideas but no written plan", // 3
      "I'm reactive – I deal with things as they come", // 2
      "I avoid thinking about it until I have to", // 1
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
  const [email, setEmail] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      const answerValue = 4 - optionIndex; // 4 for first option, 1 for last option
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
      const answerValue = 4 - optionIndex; // 4 for best, 1 for worst

      // Calculate pillar score as percentage (0-100)
      const maxPossibleScore = 4 * question.weight * 25; // Maximum possible for this pillar
      const actualScore = answerValue * question.weight * 25; // Actual score for this pillar
      const pillarPercentage = (actualScore / maxPossibleScore) * 100;

      pillarScores[question.pillar] = {
        score: Math.round(pillarPercentage),
        answer: answer,
        rawValue: answerValue,
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

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !validateEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // Calculate results
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
        email,
        submittedAt: new Date().toISOString(),
      };

      // Optional: Send email to your backend
      await fetch("/api/save-results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Store in session storage and redirect
      sessionStorage.setItem("wealthHealthResults", JSON.stringify(data));
      router.push("/wealth-health");
    } catch (error) {
      console.error("Error saving results:", error);
      // Fallback: still store locally even if API call fails
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
        email,
        submittedAt: new Date().toISOString(),
      };

      sessionStorage.setItem("wealthHealthResults", JSON.stringify(data));
      router.push("/wealth-health");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Show email form instead of immediately redirecting
      setShowEmailForm(true);
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
    <section
      id="wealth-scan"
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50 text-gray-900 px-6 py-16"
    >
      <h2 className="text-2xl sm:text-4xl font-semibold text-center mb-2 text-blue-950">
        Discover Your Financial Health
      </h2>

      <p className="text-gray-600 text-center mb-8 text-md sm:text-base">
        Take a quick self-assessment to understand your financial strengths and
        opportunities for growth.
      </p>

      {/* Email Form Overlay */}
      <AnimatePresence>
        {showEmailForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full p-8"
            >
              <h3 className="text-2xl font-semibold text-[#1B1856] mb-4 text-center">
                Almost There!
              </h3>
              <p className="text-gray-600 mb-6 text-center">
                Enter your email to receive your personalized financial health
                report and track your progress over time.
              </p>

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={() => setShowEmailForm(false)}
                    className="flex-1 rounded-xl border-gray-300 text-gray-700 hover:bg-gray-100"
                    disabled={isSubmitting}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 rounded-xl bg-blue-950 hover:bg-blue-950/80 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "See My Results"}
                  </Button>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  We respect your privacy. Your email will only be used to send
                  your results and occasional financial insights.
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-2xl bg-white border border-gray-100 rounded-3xl shadow-sm p-8">
        {/* Header */}
        <p className="text-gray-600 text-center mb-8 text-sm sm:text-base">
          This quick 3-minute checkup gives you a picture of your
          financial wellbeing.
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
