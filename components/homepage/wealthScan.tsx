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
  rawValue: number;
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
    question: "How steady is your monthly income?",
    options: [
      "Very steady. I can plan ahead with confidence",
      "Mostly steady. It changes sometimes but I manage",
      "It varies quite a bit from month to month",
      "It feels unpredictable and hard to rely on",
    ],
    why: "This helps us understand how stable your cash flow feels.",
    insight: "Income stability and planning flexibility.",
    pillar: "Income Stability",
    weight: 0.15,
  },
  {
    question:
      "How much of your income do you usually save or invest each month?",
    options: [
      "More than 25%",
      "Around 10 to 25%",
      "Less than 10%",
      "I usually spend most or all of it",
    ],
    why: "This gives a sense of how comfortably you balance today with the future.",
    insight: "Savings consistency and long term discipline.",
    pillar: "Spending & Saving",
    weight: 0.2,
  },
  {
    question:
      "If your main income stopped today, how long could you cover your expenses?",
    options: [
      "More than 6 months",
      "Around 3 to 6 months",
      "About 1 to 3 months",
      "Less than a month",
    ],
    why: "This shows how prepared you are for unexpected changes.",
    insight: "Emergency fund strength and resilience level.",
    pillar: "Resilience",
    weight: 0.2,
  },
  {
    question: "How would you describe your current debt situation?",
    options: [
      "I do not have any debt",
      "My debt feels manageable",
      "It is manageable but sometimes tight",
      "It feels stressful or difficult to handle",
    ],
    why: "This helps measure how comfortable your current obligations feel.",
    insight: "Debt comfort level and financial pressure.",
    pillar: "Debt & Credit Health",
    weight: 0.15,
  },
  {
    question:
      "How confident do you feel about your progress toward future goals?",
    options: [
      "Very confident. I have a clear plan in place",
      "Somewhat confident but unsure if it is enough",
      "Not very confident. I need more direction",
      "I have not really started planning yet",
    ],
    why: "This reflects how prepared you feel for long term goals.",
    insight: "Goal clarity and investment readiness.",
    pillar: "Growth Readiness",
    weight: 0.15,
  },
  {
    question: "Which best describes how you generally manage your finances?",
    options: [
      "I follow a structured plan",
      "I have ideas but nothing written down",
      "I handle things as they come up",
      "I tend to avoid thinking about it",
    ],
    why: "This shows your overall financial approach and habits.",
    insight: "Planning style and financial maturity.",
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
  const [started, setStarted] = useState(false);

  const router = useRouter();

  const progress = ((step + 1) / questions.length) * 100;
  const current = questions[step];

  // Match footer base color
  const FOOTER_BLUE = "#1a1856";

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
      const answerValue = 4 - optionIndex;
      const weightedScore = answerValue * question.weight;
      totalScore += weightedScore;
    });

    return Math.min(Math.floor(totalScore * 25), 100);
  };

  const getPillarScores = (): PillarScores => {
    const pillarScores: PillarScores = {};

    answers.forEach((answer, index) => {
      const question = questions[index];
      const optionIndex = question.options.indexOf(answer);
      const answerValue = 4 - optionIndex;

      const maxPossibleScore = 4 * question.weight * 25;
      const actualScore = answerValue * question.weight * 25;
      const pillarPercentage = (actualScore / maxPossibleScore) * 100;

      pillarScores[question.pillar] = {
        score: Math.round(pillarPercentage),
        answer,
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

    Object.entries(pillarScores).forEach(([pillar, data]) => {
      if (data.score < lowScoreThreshold) {
        switch (pillar) {
          case "Income Stability":
            recommendations.push(
              "Build a larger emergency fund to handle income variability",
            );
            break;
          case "Spending & Saving":
            recommendations.push(
              "Gradually increase your savings rate by 1–2% each month",
            );
            break;
          case "Resilience":
            recommendations.push(
              "Build an emergency fund covering 3–6 months of essential expenses",
            );
            break;
          case "Debt & Credit Health":
            recommendations.push(
              "Develop a debt management strategy to reduce financial stress",
            );
            break;
          case "Growth Readiness":
            recommendations.push(
              "Create a clear investment plan aligned with your long-term goals",
            );
            break;
          case "Planning & Direction":
            recommendations.push(
              "Establish a proactive financial planning routine",
            );
            break;
        }
      }
    });

    if (recommendations.length === 0) {
      return [
        "Maintain your current healthy financial habits",
        "Consider periodic reviews to optimize your strategy",
        "Explore advanced investment opportunities",
      ];
    }

    return recommendations.slice(0, 3);
  };

  const getTopAndBottomPillars = (
    pillarScores: PillarScores,
  ): TopBottomPillars => {
    const sorted = Object.entries(pillarScores).sort(
      ([, a], [, b]) => b.score - a.score,
    );
    return {
      top: sorted.slice(0, 2).map(([pillar]) => pillar),
      bottom: sorted.slice(-2).map(([pillar]) => pillar),
    };
  };

  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const saveLeadToDatabase = async (leadEmail: string): Promise<boolean> => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/leads/`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: leadEmail, source: "wealth_scan" }),
      });

      if (!response.ok) return false;
      await response.json();
      return true;
    } catch {
      return false;
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !validateEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      await saveLeadToDatabase(email);

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
    if (step < questions.length - 1) setStep(step + 1);
    else setShowEmailForm(true);
  };

  const handlePrev = () => setStep((s) => Math.max(0, s - 1));

  if (questions.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        <p>Add questions to begin the wealth scan.</p>
      </div>
    );
  }

  return (
    <section
      id="wealth-scan"
      className="relative flex flex-col items-center justify-center overflow-hidden px-6 py-24"
      style={{ backgroundColor: FOOTER_BLUE }}
    >
      {/* Background wash: same “family” as footer */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,0.10),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_30%,rgba(99,102,241,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_90%,rgba(168,85,247,0.14),transparent_55%)]" />
      </div>

      <div className="relative w-full max-w-5xl">
        <h2 className="text-2xl sm:text-4xl font-semibold text-center mb-2 text-white">
          Not Sure Where to Start With Your Finances?
        </h2>

        <p className="mx-auto my-5 max-w-2xl text-center text-sm text-white/70">
          A short check-in that helps you decide what to focus on next.
        </p>

        {/* Email Form Overlay */}
        <AnimatePresence>
          {showEmailForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              {/* backdrop */}
              <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />

              <motion.div
                initial={{ scale: 0.96, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.98, opacity: 0, y: 10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_30px_90px_rgba(0,0,0,0.30)]"
              >
                {/* subtle header tint to keep it “on brand” */}
                <div
                  style={{ backgroundColor: FOOTER_BLUE }}
                  className="px-8 py-5"
                >
                  <h3 className="text-lg font-semibold text-white">
                    Save your results
                  </h3>
                  <p className="mt-1 text-sm text-white/75">
                    Enter your email and we will send you your results.
                  </p>
                </div>

                <div className="p-8">
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 rounded-full"
                      required
                    />

                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowEmailForm(false)}
                        className="flex-1"
                        disabled={isSubmitting}
                      >
                        Not now
                      </Button>

                      <Button
                        type="submit"
                        className="flex-1"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Saving..." : "Send my results"}
                      </Button>
                    </div>

                    <p className="text-xs text-gray-500 text-center">
                      No spam. We use your email to send your results and the
                      occasional helpful note.
                    </p>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {!started ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="mx-auto mt-12 w-full max-w-4xl"
          >
            <div className="rounded-[28px] bg-white px-8 py-10 shadow-[0_30px_90px_rgba(0,0,0,0.25)] sm:px-12 sm:py-12">
              <h3 className="text-center text-2xl font-semibold text-slate-900 sm:text-3xl">
                Get clarity in a few minutes.
              </h3>

              <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-slate-600 sm:text-base">
                If you are not sure what to focus on, answer a few questions and
                you will see what is working, what needs attention, and what to
                improve next.
              </p>

              <p className="mt-7 text-center text-xs text-slate-500">
                6 questions • about 3 minutes • results at the end
              </p>

              <div className="mt-8 flex justify-center">
                <Button
                  onClick={() => setStarted(true)}
                  className="h-12 rounded-full px-8"
                >
                  Start the check-in
                </Button>
              </div>

              <p className="mt-4 text-center text-xs text-slate-500">
                You will only be asked for your email at the end to save your
                results.
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="w-full mx-auto max-w-2xl bg-white border border-gray-100 rounded-3xl shadow-sm p-8">
            <Progress
              value={progress}
              className="w-full mb-8 h-2 bg-gray-200 [&>div]:bg-blue-900"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="text-center px-2"
              >
                <div className="min-h-[72px] flex items-center justify-center px-2">
                  <h3 className="md:text-lg text-base font-semibold text-blue-950 text-center">
                    {current.question}
                  </h3>
                </div>

                <div className="flex flex-col gap-3 mb-6 w-full">
                  {current.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSelect(opt)}
                      className={`w-full p-4 border rounded-xl text-sm transition-all duration-150 ${
                        answers[step] === opt
                          ? "border-blue-900 bg-blue-950 text-white shadow-sm"
                          : "border-gray-300 hover:border-blue-800 hover:bg-blue-50"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-5 pb-2">
              <Button
                onClick={handlePrev}
                disabled={step === 0}
                variant="outline"
              >
                Previous
              </Button>

              <Button onClick={handleNext} disabled={!answers[step]}>
                {step === questions.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
