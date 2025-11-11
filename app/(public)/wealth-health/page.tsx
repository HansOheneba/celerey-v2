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
  Star,
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

  const getScoreColor = (score: number): string => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-blue-600";
    if (score >= 40) return "text-yellow-600";
    return "text-orange-600";
  };

  // Fixed color functions for the chart
  const getPillarColor = (score: number): string => {
    if (score >= 75) return "#080727"; // Dark blue for strong
    if (score >= 50) return "#19647E"; // Medium blue for developing
    return "#B3001B"; // Red for needs attention
  };

  const getPillarColorClass = (score: number): string => {
    if (score >= 75) return "text-[#080727]";
    if (score >= 50) return "text-[#19647E]";
    return "text-[#B3001B]";
  };

  const getPillarBgColorClass = (score: number): string => {
    if (score >= 75) return "bg-[#080727]";
    if (score >= 50) return "bg-[#19647E]";
    return "bg-[#B3001B]";
  };

  // Prepare chart data with colors
  const chartData = Object.entries(results.pillarScores).map(
    ([pillar, data]) => ({
      name: pillar,
      score: data.score,
      color: getPillarColor(data.score),
    })
  );

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
          <p className="text-6xl font-bold text-[#1B1856] mb-4">
            {results.score}%
          </p>
          <p className="text-gray-700 mb-4">{narrative.summary}</p>
          <p className="text-gray-600 italic">{narrative.insight}</p>
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
                <span className="w-3 h-3 rounded-full bg-[#080727]"></span>{" "}
                Strong (75-100%)
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#19647E]"></span>{" "}
                Developing (50-74%)
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#B3001B]"></span>{" "}
                Needs Attention (0-49%)
              </div>
            </div>
          </motion.div>

          <div className="space-y-6">
            {Object.entries(results.pillarScores).map(([pillar, data], i) => {
              // Personalized adaptive feedback per pillar — aligned with Data → Insight Logic
              const feedback = (() => {
                switch (pillar) {
                  case "Income Stability":
                    if (data.score >= 75)
                      return "You have a reliable base for planning — steady income allows you to forecast and invest with confidence.";
                    if (data.score >= 50)
                      return "Your income is somewhat variable. Strengthen your budgeting and create a fallback buffer to smooth cash flow.";
                    return "Income is inconsistent — focus on stabilizing inflows or building a 2–3-month cushion to absorb fluctuations.";

                  case "Spending & Saving":
                    if (data.score >= 75)
                      return "You're maintaining a healthy surplus each month — great job balancing spending and saving!";
                    if (data.score >= 50)
                      return "You're close to balance but living near your edge. Automate a small increase in savings to grow your margin.";
                    return "Spending is outpacing savings — use a simple budget and set up automatic transfers to regain control.";

                  case "Resilience":
                    if (data.score >= 75)
                      return "Strong resilience — you have 6 + months of cover, giving you security and flexibility during shocks.";
                    if (data.score >= 50)
                      return "Moderate resilience — a few more months of reserves will strengthen your safety net.";
                    return "Your current savings leave you vulnerable to shocks. Set an emergency fund goal covering 3–6 months of essentials.";

                  case "Debt & Credit Health":
                    if (data.score >= 75)
                      return "Debt is under control — keep monitoring interest rates and maintaining timely payments.";
                    if (data.score >= 50)
                      return "You're managing debt, though some pressure exists. A repayment plan can help reduce stress.";
                    return "Debt may be weighing heavily. Consider a structured repayment or consolidation review to regain freedom.";

                  case "Growth Readiness":
                    if (data.score >= 75)
                      return "You're investing with purpose — continue reviewing and diversifying to stay aligned with goals.";
                    if (data.score >= 50)
                      return "You've begun planning for the future. Explore diversified portfolios to accelerate progress.";
                    return "You're not investing yet — start small with consistent contributions to build long-term momentum.";

                  case "Planning & Direction":
                    if (data.score >= 75)
                      return "You have a clear written plan — revisit it annually to stay in sync with your evolving goals.";
                    if (data.score >= 50)
                      return "You're somewhat organized but reactive at times. A written plan will bring clarity and confidence.";
                    return "You're mostly responding to events — scheduling a clarity session or mapping short-term goals will help you take control.";

                  default:
                    return "";
                }
              })();

              return (
                <motion.div
                  key={pillar}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="p-5 bg-gray-50 rounded-xl border border-gray-100"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      <div
                        className={`w-5 h-5 rounded-full ${getPillarBgColorClass(
                          data.score
                        )}`}
                      ></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold text-[#1B1856]">
                          {pillar}
                        </h3>
                        <span
                          className={`text-sm font-bold ${getPillarColorClass(
                            data.score
                          )}`}
                        >
                          {data.score}%
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed mb-1">
                        <span className="font-medium text-[#1B1856]/80">
                          Your response:
                        </span>{" "}
                        {data.answer}
                      </p>
                      <p className="text-gray-500 text-sm italic">{feedback}</p>
                    </div>
                  </div>
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
                      title
                    )}&details=${encodeURIComponent(
                      description
                    )}&dates=${formatDate(start)}/${formatDate(end)}`;

                    window.open(googleUrl, "_blank");
                  }}
                  className="bg-[#1B1856] hover:bg-[#1B1856]/80 text-white rounded-full px-6 py-2 text-sm font-semibold"
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
                        title
                      )}&body=${encodeURIComponent(
                        description
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

        {/* Action Buttons */}
        <div className="text-center space-y-4 flex flex-col ">
          <Button
            onClick={() => router.push("/#wealth-scan")}
            className="bg-[#1B1856] hover:bg-[#1B1856]/90 text-white rounded-full px-8 py-3 text-lg font-semibold"
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
