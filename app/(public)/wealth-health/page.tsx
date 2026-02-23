"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { BeginJourneyModal } from "@/components/homepage/beginModal";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

interface PillarScore {
  score: number;
  answer: string;
  rawValue: number;
}

interface PillarScores {
  [key: string]: PillarScore;
}

interface ScoreCategory {
  label: string;
  tone: string;
  persona: string;
}

interface WealthHealthResults {
  score: number;
  category: ScoreCategory;
  answers: string[];
  pillarScores: PillarScores;
  recommendations: string[];
  topPillars: string[];
  bottomPillars: string[];
  email: string; // ✅ ADD THIS
  submittedAt: string; // ✅ ADD THIS
}

export default function WealthHealthPage() {
  const [results, setResults] = useState<WealthHealthResults | null>(null);
  const [isLoading, setIsLoading] = useState(true); // ✅ ADD LOADING STATE
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedResults = sessionStorage.getItem("wealthHealthResults");
    if (storedResults) {
      try {
        const parsedResults = JSON.parse(storedResults);
        // ✅ CHECK IF EMAIL EXISTS IN RESULTS
        if (parsedResults.email) {
          setResults(parsedResults);
        } else {
          // ✅ REDIRECT BACK TO SCAN IF NO EMAIL FOUND
          router.push("/#wealth-scan");
        }
      } catch (error) {
        // ✅ REDIRECT IF JSON PARSING FAILS
        router.push("/#wealth-scan");
      }
    } else {
      // ✅ REDIRECT IF NO RESULTS FOUND
      router.push("/#wealth-scan");
    }
    setIsLoading(false); // ✅ SET LOADING TO FALSE AFTER CHECK
  }, [router]);

  // ✅ SHOW LOADING STATE
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading your results...</p>
      </div>
    );
  }

  // ✅ SHOW ERROR STATE IF NO RESULTS (after loading)
  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">No results found</p>
          <Button
            onClick={() => router.push("/#wealth-scan")}
            className="bg-[#1B1856] hover:bg-[#1B1856]/80 text-white"
          >
            Take the Assessment
          </Button>
        </div>
      </div>
    );
  }

  // Dynamic feedback for each category
  const getCategoryNarrative = (category: string) => {
    switch (category) {
      case "Strategic Planner":
        return {
          summary:
            "You've built an intelligent financial framework — disciplined, strategic, and focused on long-term growth.",
          insight:
            "Your structure gives you stability, but remember to balance optimization with flexibility. Review your portfolio yearly and consider professional advisory for tax and legacy strategies.",
        };
      case "Structured Achiever":
        return {
          summary:
            "You're organized, consistent, and making confident money moves. You know where your money goes — and it shows.",
          insight:
            "Now it's time to fine-tune: small changes like optimizing investments and reducing redundant expenses can compound your success.",
        };
      case "Building Confidence":
        return {
          summary:
            "You're developing positive habits and taking real steps toward financial control.",
          insight:
            "Focus on building consistency — automating savings and setting boundaries on spending will strengthen your foundation.",
        };
      case "Foundation Builder":
        return {
          summary:
            "You're at the early stage of building your financial story — and that's powerful.",
          insight:
            "Focus on structure over perfection: start simple with a weekly spending plan and save small amounts regularly.",
        };
      default:
        return {
          summary:
            "You're on a promising path — your results reveal clear areas of progress and growth.",
          insight:
            "Consistency and clarity will take your financial journey from reactive to proactive.",
        };
    }
  };

  const narrative = getCategoryNarrative(results.category.label);

  // Calculate weighted average for debugging/verification
  const calculateWeightedAverage = () => {
    let weightedSum = 0;
    Object.entries(results.pillarScores).forEach(([pillar, data]) => {
      // Convert pillar score back to weighted contribution
      const weight = getPillarWeight(pillar);
      const maxPillarScore = 4 * weight * 25; // Maximum possible for this pillar
      const actualContribution = (data.score / 100) * maxPillarScore;
      weightedSum += actualContribution;
    });
    return weightedSum;
  };

  const getPillarWeight = (pillar: string): number => {
    const weights: { [key: string]: number } = {
      "Income Stability": 0.15,
      "Spending & Saving": 0.2,
      Resilience: 0.2,
      "Debt & Credit Health": 0.15,
      "Growth Readiness": 0.15,
      "Planning & Direction": 0.15,
    };
    return weights[pillar] || 0.15;
  };

  // const getScoreColor = (score: number): string => {
  //   if (score >= 80) return "text-green-600";
  //   if (score >= 60) return "text-blue-600";
  //   if (score >= 40) return "text-yellow-600";
  //   return "text-orange-600";
  // };

  // Fixed color functions for the chart
  const getPillarColor = (score: number): string => {
    if (score >= 75) return "#1B1856"; // Dark blue for strong
    if (score >= 50) return "#7F7CAF"; // Medium blue for developing
    return "#DD614A"; // Red for needs attention
  };

  // const getPillarColorClass = (score: number): string => {
  //   if (score >= 75) return "text-[#080727]";
  //   if (score >= 50) return "text-[#19647E]";
  //   return "text-[#B3001B]";
  // };

  // const getPillarBgColorClass = (score: number): string => {
  //   if (score >= 75) return "bg-[#080727]";
  //   if (score >= 50) return "bg-[#19647E]";
  //   return "bg-[#B3001B]";
  // };

  // Prepare chart data with colors
  const chartData = Object.entries(results.pillarScores).map(
    ([pillar, data]) => ({
      name: pillar,
      score: data.score,
      color: getPillarColor(data.score),
    }),
  );

  const getBadgeClass = (score: number) => {
    if (score >= 75)
      return "bg-green-100 text-green-700 border border-green-200";
    if (score >= 50)
      return "bg-yellow-100 text-yellow-700 border border-yellow-200";
    return "bg-red-100 text-red-700 border border-red-200";
  };

  const getBadgeLabel = (score: number) => {
    if (score >= 75) return "Well-Anchored";
    if (score >= 50) return "Developing Strength";
    return "Needs Reinforcement";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16 px-4 mt-16">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-[#1B1856] mb-4">
            Your Financial Health Review
          </h1>
          <p className="text-gray-600 text-lg">
            You have taken the first step. Now you can start free access and
            turn these insights into action.
          </p>
        </motion.div>

        {/* Overview Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-md p-8 text-center border border-gray-100"
        >
          <h2 className="text-2xl font-semibold text-[#1B1856] mb-3">
            {results.category.label}
          </h2>
          <div className="flex items-baseline justify-center space-x-1 mb-4">
            <p className="text-6xl font-bold text-[#1B1856]">{results.score}</p>
            <span className="text-3xl text-[#1B1856]/70 font-semibold">
              /100
            </span>
          </div>

          <p className="text-gray-700 mb-6 text-lg">{narrative.summary}</p>

          <div className="inline-flex flex-col gap-3 items-center">
            <p className="text-sm text-gray-600">
              This snapshot shows where you stand today. Start your free trial
              to unlock the dashboard and tools.
            </p>
            <Button
              onClick={() => router.push("/start")}
              className="bg-[#1B1856] hover:bg-[#1B1856]/90 text-white px-6 py-2 font-semibold"
            >
              Start for free
            </Button>
          </div>

          <div className="mt-4 text-xs text-gray-400">
            Score is calculated from 6 financial pillars
          </div>
        </motion.div>

        {/* Pillar Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-md p-8 border border-gray-100"
        >
          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-10 bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h2 className="text-2xl font-semibold text-[#1B1856] mb-6 text-center">
              How you are doing across key financial areas
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={150}
                  tick={{ fill: "#1B1856", fontWeight: 500, fontSize: 13 }}
                />
                <Tooltip
                  formatter={(value: number) => [`${value}%`, "Score"]}
                  cursor={{ fill: "rgba(0,0,0,0.05)" }}
                />
                <Bar dataKey="score" radius={[8, 8, 8, 8]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <div className="flex justify-center gap-6 text-sm mt-6 text-gray-600">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#1B1856]"></span>{" "}
                Strong (75-100%)
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#7F7CAF]"></span>{" "}
                Developing (50-74%)
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#DD614A]"></span>{" "}
                Needs Attention (0-49%)
              </div>
            </div>
          </motion.div>

          {/* Pillar cards - with explanations, no financial advice */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(results.pillarScores).map(([pillar, data], i) => {
              const { score } = data;

              // --- Meaning / Interpretation based on score ---
              const meaning = (() => {
                switch (pillar) {
                  case "Income Stability":
                    if (score >= 75)
                      return "Your income is predictable and dependable, giving you a strong base for long-term planning.";
                    if (score >= 50)
                      return "Your income is somewhat steady, but there are variations that could affect long-term commitments.";
                    return "Your income fluctuates often, making it harder to plan or commit to long-term financial decisions.";
                  case "Spending & Saving":
                    if (score >= 75)
                      return "You consistently keep expenses below income, showing strong financial discipline.";
                    if (score >= 50)
                      return "You balance spending and saving, though your margin for growth is limited.";
                    return "Your spending habits reduce your capacity to save and build financial momentum.";
                  case "Resilience":
                    if (score >= 75)
                      return "You have solid financial protection and can comfortably handle unexpected events.";
                    if (score >= 50)
                      return "You have some buffer, but unexpected shocks could still affect your plans.";
                    return "You are financially exposed to emergencies or income interruptions.";
                  case "Debt & Credit Health":
                    if (score >= 75)
                      return "Your debt levels are controlled and manageable, with minimal financial stress.";
                    if (score >= 50)
                      return "Your debt is manageable, but requires active oversight to avoid pressure.";
                    return "Debt may be limiting your flexibility and reducing your ability to save or invest.";
                  case "Growth Readiness":
                    if (score >= 75)
                      return "You're actively building wealth and positioned for long-term financial growth.";
                    if (score >= 50)
                      return "You're preparing for growth, but there's room to strengthen your investment strategy.";
                    return "You're currently missing out on long-term wealth-building opportunities.";
                  case "Planning & Direction":
                    if (score >= 75)
                      return "You have clear goals and structured plans guiding your decisions.";
                    if (score >= 50)
                      return "You have some structure, but you're likely reacting to situations rather than anticipating them.";
                    return "Your financial approach may lack direction, making progress less predictable.";
                  default:
                    return "";
                }
              })();

              return (
                <motion.div
                  key={pillar}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="p-5 bg-gray-50 rounded-xl border border-gray-100 h-full"
                >
                  <div className="mb-3">
                    <h3 className="font-semibold text-[#1B1856] mb-2">
                      {pillar}
                    </h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-md font-semibold inline-block ${getBadgeClass(
                        score,
                      )}`}
                    >
                      {getBadgeLabel(score)}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">
                    Score: <span className="font-semibold">{score}%</span>
                  </p>

                  <p className="text-sm text-gray-700 leading-relaxed">
                    <span className="font-medium text-[#1B1856]/80">
                      What this means:
                    </span>{" "}
                    {meaning}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Highlights */}
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <div className="flex items-center space-x-2 mb-3">
                <CheckCircle2 className="text-[#1B1856]" />
                <h3 className="font-semibold text-[#1B1856]">Your Strengths</h3>
              </div>
              <ul className="text-sm text-[#1B1856]/80 space-y-2">
                {results.topPillars.map((pillar) => (
                  <li key={pillar}>• {pillar}</li>
                ))}
              </ul>
            </div>
            <div className="bg-yellow-50 rounded-xl p-5 border border-yellow-100">
              <div className="flex items-center space-x-2 mb-3">
                <AlertTriangle className="text-yellow-700" />
                <h3 className="font-semibold text-yellow-800">
                  Areas of Focus
                </h3>
              </div>
              <ul className="text-sm text-yellow-700 space-y-2">
                {results.bottomPillars.map((pillar) => (
                  <li key={pillar}>• {pillar}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Main CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="bg-[#1B1856] text-white rounded-2xl shadow-md p-8 border border-[#1B1856]/20"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold mb-3">
                Unlock your dashboard for free
              </h2>
              <p className="text-white/90 mb-4">
                Your score is the starting point. Start a free trial to access
                your dashboard, track your progress, and use intelligent tools
                to improve your financial structure.
              </p>

              <ul className="space-y-2 text-sm text-white/85">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60"></span>
                  See your full dashboard breakdown
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60"></span>
                  Track your pillars over time
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60"></span>
                  Get tailored next steps and tools
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-3 w-full md:w-auto">
              <div className="bg-white/10 border border-white/20 rounded-xl p-4 text-center">
                <p className="text-sm text-white/80 mb-1">Start with</p>
                <p className="text-3xl font-bold">Free</p>
                <p className="text-xs text-white/70 mt-1">
                  7 day dashboard trial
                </p>
              </div>

              <Button
                onClick={() => router.push("/start")}
                className="bg-white text-[#1B1856] hover:bg-white/90 font-semibold px-6 py-3"
              >
                Start for free <ArrowRight className="ml-2 w-4 h-4" />
              </Button>

              <p className="text-xs text-white/70 text-center">
                No card required to begin, if you choose that option.
              </p>
            </div>
          </div>
        </motion.div>

        {/* How to Use This Report */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-blue-50 border border-blue-100 rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-[#1B1856] mb-4">
            How to read your Financial MOT
          </h3>
          <div className="text-sm text-gray-700 space-y-3 max-w-2xl">
            <p>
              <strong className="text-[#1B1856]">Your Main Score:</strong> A
              single metric (0 to 100) reflecting your overall financial
              structure and stability.
            </p>
            <p>
              <strong className="text-[#1B1856]">6 Financial Pillars:</strong> A
              breakdown of where you are strongest and where you can improve,
              color coded for quick understanding.
            </p>
            <p className="italic text-gray-600">
              Tip: Retake this assessment in 90 days to track progress.
            </p>
          </div>
        </motion.div>

        {/* Secondary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-8 text-center"
        >
          <h3 className="text-xl font-semibold text-[#1B1856] mb-2">
            Ready to continue?
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Start free access to your dashboard and turn this report into a
            clear plan you can follow.
          </p>

          <Button
            onClick={() => router.push("/start")}
            className="bg-[#1B1856] hover:bg-[#1B1856]/90 text-white px-8 py-3 font-semibold"
          >
            Start for free
          </Button>
        </motion.div>

        {/* Closing Message */}
        <div className="text-center mt-12 text-gray-600">
          <TrendingUp className="mx-auto mb-3 text-[#1B1856]" />
          <p>
            This assessment shows where you stand. Now you can start building
            where you are going.
          </p>
        </div>
      </div>

      {/* Modal */}
      <BeginJourneyModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
}
