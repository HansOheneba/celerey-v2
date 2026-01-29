"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Clock3, Shield, Sparkles } from "lucide-react";

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
    why: "We ask this to understand how steady your cash flow feels, which helps shape guidance around planning and buffers.",
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
    why: "This helps gauge how comfortably you balance today’s needs with future plans.",
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
    why: "This gives a sense of how well you could handle unexpected changes without stress.",
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
    why: "This offers insight into how comfortably your current borrowing fits into your financial picture.",
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
    why: "This helps understand how confident you feel about the steps you're taking toward long-term goals.",
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
    why: "This helps us understand your general style when managing money, so the guidance feels more personalised.",
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
  const [started, setStarted] = useState(false);


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
const saveLeadToDatabase = async (email: string): Promise<boolean> => {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/leads/`;
    console.log("Attempting to save lead to:", apiUrl);

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        source: "wealth_scan",
      }),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server response error:", errorText);
      throw new Error(
        `Failed to save lead: ${response.status} ${response.statusText}`
      );
    }

    const result = await response.json();
    console.log("Lead saved successfully:", result);
    return true;
  } catch (error) {
    console.error("Error saving lead to database:", error);
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
      // First, save the lead to the database
      const leadSaved = await saveLeadToDatabase(email);

      if (!leadSaved) {
        console.warn(
          "Failed to save lead to database, but continuing with results..."
        );
      }

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

      // Optional: If you want to save the full results to another endpoint
      // You can add that here if you have a separate results API

      // Store in session storage and redirect
      sessionStorage.setItem("wealthHealthResults", JSON.stringify(data));
      router.push("/wealth-health");
    } catch (error) {
      console.error("Error processing results:", error);
      // Fallback: still store locally even if API calls fail
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
      className=" flex flex-col items-center justify-center bg-blue-950 px-6 py-24"
    >
      <h2 className="text-2xl sm:text-4xl font-semibold text-center mb-2 text-white">
        Discover Your Financial Health
      </h2>

            {/* Subcopy */}
        <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-neutral-200 sm:text-lg">
          Answer a few simple questions to see where you stand, identify your
          strengths, and uncover the next best step to build with confidence.
        </p>

        {/* quick badges */}
        <div className="mx-auto my-7 flex max-w-2xl flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm text-neutral-900 ring-1 ring-black/10">
            <Clock3 className="h-4 w-4 text-neutral-600" />
            3 minutes
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm text-neutral-900 ring-1 ring-black/10">
            <CheckCircle2 className="h-4 w-4 text-neutral-600" />
            6 questions
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm text-neutral-900 ring-1 ring-black/10">
            <Sparkles className="h-4 w-4 text-neutral-600" />
            Free, no account needed
          </span>
        </div>

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
                    variant={"outline"}
                    onClick={() => setShowEmailForm(false)}
                    className="flex-1 "
                    disabled={isSubmitting}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 "
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "See My Results"}
                  </Button>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  We respect your privacy. Your email will only be used to see
                  your results and occasional financial insights.
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

{!started ? (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="w-full max-w-4xl"
  >
    {/* outer frame */}
    <div className="relative overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
      {/* soft background wash */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(15,23,42,0.06),transparent_55%)]" />

      <div className="relative px-7 py-10 sm:px-12 sm:py-14">
      
        {/* Title */}
        {/* <h2 className="mt-6 text-center font-serif text-4xl leading-[1.05] text-neutral-900 sm:text-5xl">
          Discover your financial health
          <span className="block italic text-neutral-700">
            in under 3 minutes
          </span>
        </h2> */}

        {/* Subcopy */}


       
        {/* benefits row */}
        <div className="mx-auto mt-5 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              title: "Instant score",
              desc: "A simple 0–100 view of your current position.",
            },
            {
              title: "Pillar breakdown",
              desc: "See what’s strong and what needs attention.",
            },
            {
              title: "Next-step guidance",
              desc: "Clear recommendations you can act on.",
            },
          ].map((b) => (
            <div
              key={b.title}
              className="rounded-2xl bg-white/60 p-5 ring-1 ring-black/10"
            >
              <p className="text-sm font-semibold text-neutral-900">{b.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                {b.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            onClick={() => setStarted(true)}
            className="h-12 rounded-full px-7 text-white"
          >
            Begin Assessment
          </Button>
{/* 
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("wealth-scan");
              el?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="text-sm font-medium text-neutral-700 underline underline-offset-4 hover:text-neutral-900"
          >
            Learn what you’ll get
          </button> */}
        </div>

        <p className="mt-5 text-center text-xs text-neutral-500">
          You’ll be asked for your email only at the end to send your results.
        </p>
      </div>
    </div>
  </motion.div>
) : (
        <div className="w-full max-w-2xl bg-white border border-gray-100 rounded-3xl shadow-sm p-8">
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
              className="text-center px-2"
            >
              <div className="min-h-[72px] flex items-center justify-center px-2">
                <h3 className="text-base font-medium text-blue-950 text-center">
                  {current.question}
                </h3>
              </div>

              <div className="flex flex-col gap-3 mb-6 w-full">
                {current.options.map((opt: string) => (
                  <button
                    key={opt}
                    onClick={() => handleSelect(opt)}
                    className={`w-full p-4 border rounded-xl text-sm sm:text-base transition-all duration-150
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

              <div className="pt-3 mt-6 text-left text-xs text-gray-600 leading-snug">
                {/* <div className="min-h-[70px] flex items-start">
                  <p>
                    <span className="font-medium text-blue-950">
                      Why we ask:
                    </span>{" "}
                    {current.why}
                  </p>
                </div> */}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-5 pb-2">
            <Button
              onClick={handlePrev}
              disabled={step === 0}
              className=""
              variant={"outline"}
            >
              Previous
            </Button>

            <Button onClick={handleNext} disabled={!answers[step]} className="">
              {step === questions.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}