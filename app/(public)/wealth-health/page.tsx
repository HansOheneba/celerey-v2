"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
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
  Lightbulb,
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
    })
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

    const buildAdvisorCTA = (r: WealthHealthResults) => {
      const lowPillars = r.bottomPillars?.slice(0, 2) || [];
      const focus = lowPillars.length
        ? `Focused on: ${lowPillars.join(" & ")}`
        : "Focused on your next best step";

      // “Reason” copy based on category + score
      let headline = "Book a 1:1 Wealth Session";
      let sub = "Get a practical plan tailored to your situation.";

      if (r.score >= 75) {
        headline = "Optimize with an Advisor";
        sub =
          "You’re doing well—an advisor can help you tighten strategy, tax efficiency, and long-term planning.";
      } else if (r.score >= 50) {
        headline = "Turn Momentum into a Clear Plan";
        sub =
          "You’ve got a solid base—an advisor can help you improve consistency and make smarter next moves.";
      } else {
        headline = "Build Your Foundation with Support";
        sub =
          "You don’t need perfection—just structure. An advisor can help you create a simple plan you can actually follow.";
      }

      return { headline, sub, focus };
    };

    const advisorCTA = buildAdvisorCTA(results);



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
            A personalized look into your financial wellbeing — where you shine,
            and where you can build more confidence.
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

          <p className="text-gray-700 mb-4">{narrative.summary}</p>
          {/* <p className="text-gray-600 italic">{narrative.insight}</p> */}
          {/* Debug info - remove in production */}
          <div className="mt-4 text-xs text-gray-400">
            Weighted Average: {calculateWeightedAverage().toFixed(1)} | Total
            Score: {results.score}
          </div>
        </motion.div>

        {/* Pillar Insights with Personalized Feedback */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-md p-8 border border-gray-100"
        >
          {/* Pillar Performance Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-10 bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h2 className="text-2xl font-semibold text-[#1B1856] mb-6 text-center">
              How You&apos;re Doing Across Key Financial Areas
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
                      return "You’re actively building wealth and positioned for long-term financial growth.";
                    if (score >= 50)
                      return "You’re preparing for growth, but there's room to strengthen your investment strategy.";
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

              // --- Insight: tell them something they DON'T know ---
              const insight = (() => {
                switch (pillar) {
                  case "Income Stability":
                    return "Stable income not only helps budgeting—it actually improves your borrowing power and lowers the interest rates you may qualify for.";
                  case "Spending & Saving":
                    return "Most people underestimate lifestyle creep. Increasing income doesn’t always improve savings unless spending is intentionally controlled.";
                  case "Resilience":
                    return "Even small unexpected expenses are the biggest cause of long-term financial derailment, not big emergencies.";
                  case "Debt & Credit Health":
                    return "Reducing just one high-interest debt can increase your net worth faster than most beginner investments can.";
                  case "Growth Readiness":
                    return "Time in the market matters more than the amount you start with—consistency beats timing every time.";
                  case "Planning & Direction":
                    return "People with written financial plans accumulate 2–3× more wealth than those without one, even at similar income levels.";
                  default:
                    return "";
                }
              })();

              // --- Action step ---
              const action = (() => {
                switch (pillar) {
                  case "Income Stability":
                    return "Consider diversifying income streams or stabilizing irregular earnings with a buffer fund.";
                  case "Spending & Saving":
                    return "Increase automated savings by even 5–10%—small consistent boosts compound massively over time.";
                  case "Resilience":
                    return "Start building a 3–6-month emergency fund to reduce vulnerability to financial shocks.";
                  case "Debt & Credit Health":
                    return "Target the highest-interest debt first using a snowball or avalanche method.";
                  case "Growth Readiness":
                    return "Start or expand a simple diversified investment plan—consistency beats complexity.";
                  case "Planning & Direction":
                    return "Document short and long-term goals and review them every quarter to stay aligned.";
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
                    <div className="flex flex-col gap-1">
                      <h3 className="font-semibold text-[#1B1856] leading-snug break-words">
                        {pillar}
                      </h3>

                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-xs px-2 py-1 rounded-md font-semibold whitespace-nowrap ${getBadgeClass(
                            score,
                          )}`}
                        >
                          {getBadgeLabel(score)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed mb-2">
                    <span className="font-medium text-[#1B1856]/80">
                      What this means:
                    </span>{" "}
                    {meaning}
                  </p>

                  <p className="text-gray-600 text-sm leading-relaxed mb-2 italic">
                    <span className="font-medium not-italic text-[#1B1856]/80">
                      Insight:
                    </span>{" "}
                    {insight}
                  </p>

                  <p className="text-gray-700 text-sm leading-relaxed">
                    <span className="font-medium text-[#1B1856]/80">
                      Next step:
                    </span>{" "}
                    {action}
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
                  Areas to Strengthen
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-2xl shadow-md p-8 border border-gray-100"
        >
          <h2 className="text-2xl font-semibold text-[#1B1856] mb-6">
            Your Personalized Action Plan
          </h2>

          <div className="space-y-5">
            {results.recommendations.map((rec, i) => (
              <div
                key={i}
                className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                <Lightbulb className="text-[#1B1856] mt-1 flex-shrink-0" />
                <p className="text-gray-700">{rec}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between bg-blue-50 rounded-xl p-5">
            <div>
              <h3 className="font-semibold text-[#1B1856] mb-1">
                Next Step Forward
              </h3>
              <p className="text-gray-700">
                {narrative.insight ||
                  "Keep tracking your progress and revisiting your goals each quarter."}
              </p>
            </div>
            <ArrowRight className="text-[#1B1856]" />
          </div>
        </motion.div>

        {/* Advisor CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="bg-[#1B1856] text-white rounded-2xl shadow-md p-8 border border-[#1B1856]/20"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold mb-2">
                {advisorCTA.headline}
              </h2>
              <p className="text-white/90 mb-3">{advisorCTA.sub}</p>

              <div className="inline-flex items-center gap-2 text-sm bg-white/10 border border-white/20 rounded-full px-3 py-1">
                <CheckCircle2 className="w-4 h-4" />
                <span className="font-medium">{advisorCTA.focus}</span>
              </div>

              <p className="text-sm text-white/80 mt-4">
                We’ll review your results, identify the fastest win, and leave
                you with a clear 30–90 day plan.
              </p>
            </div>

            <div className="flex flex-col gap-3 w-full md:w-auto">
              <Button
                onClick={() => {
                  // Send context to booking page so it feels personalized there too
                  const qs = new URLSearchParams({
                    score: String(results.score),
                    category: results.category.label,
                    focus: (results.bottomPillars || []).join(", "),
                    email: results.email || "",
                  });

                  // router.push(`/book-advisor?${qs.toString()}`);
                  router.push(`/wealth-health/#`);
                }}
                className="bg-white text-[#1B1856] hover:bg-white/90 font-semibold px-6 py-3"
              >
                Book an Advisor Session <ArrowRight className="ml-2 w-4 h-4" />
              </Button>

              <button
                onClick={() => {
                  const qs = new URLSearchParams({
                    score: String(results.score),
                    category: results.category.label,
                    focus: (results.bottomPillars || []).join(", "),
                    email: results.email || "",
                  });

                  // router.push(`/book-advisor?${qs.toString()}#what-to-expect`);
                  router.push(`/wealth-health/#`);
                }}
                className="text-sm underline text-white/90 hover:text-white transition-colors"
              >
                See what to expect
              </button>
            </div>
          </div>
        </motion.div>

        {/* Presentation Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-10 text-center"
        >
          <h3 className="text-lg font-semibold text-[#1B1856] mb-4">
            How to Read Your Financial MOT
          </h3>
          <div className="text-sm text-gray-700 space-y-4 max-w-2xl mx-auto">
            <p>
              <strong className="text-[#1B1856]">Main Score Dial:</strong> Your
              total financial health score ranges from <strong>0–100</strong>.
              Higher scores reflect stronger overall structure and financial
              confidence.
            </p>
            <p>
              <strong className="text-[#1B1856]">6-Pillar Chart:</strong> Each
              pillar represents a key part of your financial wellbeing — from
              income stability to planning. They are color-coded:
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm mt-2">
              <span className="flex items-center space-x-2">
                <span className="w-4 h-4 rounded-full bg-[#080727]"></span>
                <span>Strong</span>
              </span>
              <span className="flex items-center space-x-2">
                <span className="w-4 h-4 rounded-full bg-[#19647E]"></span>
                <span>Developing</span>
              </span>
              <span className="flex items-center space-x-2">
                <span className="w-4 h-4 rounded-full bg-[#B3001B]"></span>
                <span>Needs Attention</span>
              </span>
            </div>

            <div className="pt-4 border-t border-gray-200 text-center">
              <p className="text-gray-600 italic mb-3">
                Retake your MOT after <strong>90 days</strong> to see your
                progress and track how your financial confidence improves.
              </p>

              {/* 📅 Add to Calendar Button */}
              <div className="flex flex-col items-center space-y-3">
                <Button
                  onClick={() => {
                    const title =
                      "Review Financial Health Progress with Celerey";
                    const description =
                      "Revisit your Wealth Health scan and track your 90-day financial progress: https://celereyv2.vercel.app/#wealth-scan";
                    const start = new Date();
                    start.setDate(start.getDate() + 90);
                    const end = new Date(start);
                    end.setHours(end.getHours() + 1);

                    const formatDate = (d: Date) =>
                      d.toISOString().replace(/[-:]|\.\d{3}/g, "");

                    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                      title,
                    )}&details=${encodeURIComponent(
                      description,
                    )}&dates=${formatDate(start)}/${formatDate(end)}`;

                    window.open(googleUrl, "_blank");
                  }}
                  className="bg-[#1B1856] hover:bg-[#1B1856]/80 text-white px-6 py-2 text-sm font-semibold"
                >
                  Add to Google Calendar
                </Button>

                {/* Outlook & Apple Calendar Links */}
                <div className="flex flex-wrap justify-center gap-2 text-sm text-[#1B1856]">
                  <button
                    onClick={() => {
                      const title =
                        "Review Financial Health Progress with Celerey";
                      const description =
                        "Revisit your Wealth Health scan and track your 90-day financial progress: https://celereyv2.vercel.app/#wealth-scan";
                      const start = new Date();
                      start.setDate(start.getDate() + 90);
                      const end = new Date(start);
                      end.setHours(end.getHours() + 1);

                      //   const formatDate = (d: Date) =>
                      //     d.toISOString().replace(/[-:]|\.\d{3}/g, "");

                      const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(
                        title,
                      )}&body=${encodeURIComponent(
                        description,
                      )}&startdt=${start.toISOString()}&enddt=${end.toISOString()}`;

                      window.open(outlookUrl, "_blank");
                    }}
                    className="underline hover:text-[#1B1856]/70 transition-colors"
                  >
                    Outlook Calendar
                  </button>

                  <span className="text-gray-400">•</span>

                  <button
                    onClick={() => {
                      const title =
                        "Review Financial Health Progress with Celerey";
                      const description =
                        "Revisit your Wealth Health scan and track your 90-day financial progress: https://celereyv2.vercel.app/#wealth-scan";
                      const start = new Date();
                      start.setDate(start.getDate() + 90);
                      const end = new Date(start);
                      end.setHours(end.getHours() + 1);

                      const formatICSDate = (date: Date) =>
                        date.toISOString().replace(/[-:]|\.\d{3}/g, "");

                      const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
URL:https://celereyv2.vercel.app/#wealth-scan
DTSTART:${formatICSDate(start)}
DTEND:${formatICSDate(end)}
SUMMARY:${title}
DESCRIPTION:${description}
END:VEVENT
END:VCALENDAR`;

                      const blob = new Blob([icsContent], {
                        type: "text/calendar",
                      });
                      const link = document.createElement("a");
                      link.href = URL.createObjectURL(blob);
                      link.download = "celerey-reminder.ics";
                      link.click();
                    }}
                    className="underline hover:text-[#1B1856]/70 transition-colors"
                  >
                    Apple / Download ICS
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recommendations */}

        {/* Action Buttons */}
        <div className="text-center space-y-4 flex flex-col ">
          <Button
            onClick={() => router.push("/#wealth-scan")}
            className="bg-[#1B1856] hover:bg-[#1B1856]/90 text-white px-8 py-3 text-lg font-semibold w-fit mx-auto"
          >
            Retake Assessment
          </Button>
          {/* <Button
            onClick={() => window.print()}
            className="border-[#1B1856] text-[#1B1856] hover:bg-[#bab7e9] border hover:text-white bg-transparent rounded-full px-8 py-3 text-lg font-semibold"
          >
            Download Report
          </Button> */}
        </div>

        {/* Closing Message */}
        <div className="text-center mt-12 text-gray-600">
          <TrendingUp className="mx-auto mb-3 text-[#1B1856]" />
          <p>
            Remember — financial wellness isn&apos;t about perfection, it&apos;s
            about direction. Small consistent choices compound into stability
            and freedom.
          </p>
        </div>
      </div>
    </div>
  );
}
