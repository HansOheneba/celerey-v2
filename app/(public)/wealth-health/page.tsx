"use client";

import { useEffect, useMemo, useState } from "react";
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
  email: string;
  submittedAt: string;
}

// Accent + supporting tones (warm-led)
const ACCENT = "#b07d3d";
const INK = "#1B1856";

// Moved outside component so it's never part of the hook call order
const getPillarColor = (score: number): string => {
  if (score >= 75) return INK; // strong
  if (score >= 50) return "#8F86B8"; // softer mid tone
  return "#D46A55"; // warm warning
};

export default function WealthHealthPage() {
  const [results, setResults] = useState<WealthHealthResults | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedResults = sessionStorage.getItem("wealthHealthResults");
    if (storedResults) {
      try {
        const parsedResults = JSON.parse(storedResults);
        if (parsedResults.email) setResults(parsedResults);
        else router.push("/#wealth-scan");
      } catch {
        router.push("/#wealth-scan");
      }
    } else {
      router.push("/#wealth-scan");
    }
    setIsLoading(false);
  }, [router]);

  // Must be before any early returns
  const chartData = useMemo(
    () =>
      Object.entries(results?.pillarScores ?? {}).map(([pillar, data]) => ({
        name: pillar,
        score: data.score,
        color: getPillarColor(data.score),
      })),
    [results?.pillarScores],
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F4EF]">
        <p className="text-lg text-neutral-700">Loading your results...</p>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F4EF]">
        <div className="text-center">
          <p className="text-lg text-neutral-700 mb-4">No results found</p>
          <Button
            onClick={() => router.push("/#wealth-scan")}
            className="text-white"
            style={{ backgroundColor: INK }}
          >
            Take the Assessment
          </Button>
        </div>
      </div>
    );
  }

  const getCategoryNarrative = (category: string) => {
    switch (category) {
      case "Strategic Planner":
        return {
          headline: "You are operating with structure.",
          summary:
            "Your answers suggest strong habits and clear direction across most areas. This is a solid base to build from.",
          valueLine:
            "Your biggest edge is consistency. Keeping things simple and repeatable is what makes progress feel calm.",
        };
      case "Structured Achiever":
        return {
          headline: "You are doing a lot right.",
          summary:
            "Your answers suggest consistency and control, with a few areas that may need sharper structure to feel effortless.",
          valueLine:
            "Small gaps can create mental noise. A clearer system can make decisions feel lighter.",
        };
      case "Building Confidence":
        return {
          headline: "You are building momentum.",
          summary:
            "Your answers suggest progress, but also gaps that can make money feel unpredictable at times.",
          valueLine:
            "The goal is not perfection. It is clarity, so your next move is obvious.",
        };
      case "Foundation Builder":
        return {
          headline: "You are at the starting line.",
          summary:
            "Your answers suggest that a few core areas may feel unstable right now, which can make everything else feel harder.",
          valueLine:
            "When the basics feel shaky, it is hard to think long-term. Structure is what makes growth possible.",
        };
      default:
        return {
          headline: "Your results show a clear direction.",
          summary:
            "You have a mix of strengths and gaps that can be improved with the right structure.",
          valueLine:
            "Clarity comes from seeing what matters, then focusing on it in the right order.",
        };
    }
  };

  const narrative = getCategoryNarrative(results.category.label);

  const getBadgeClass = (score: number) => {
    if (score >= 75)
      return "bg-emerald-50 text-emerald-700 border border-emerald-200";
    if (score >= 50)
      return "bg-amber-50 text-amber-900 border border-amber-200";
    return "bg-rose-50 text-rose-700 border border-rose-200";
  };

  const getBadgeLabel = (score: number) => {
    if (score >= 75) return "Strong";
    if (score >= 50) return "Developing";
    return "Needs support";
  };

  const getMeaning = (pillar: string, score: number) => {
    const lead = "What this suggests:";
    switch (pillar) {
      case "Income Stability":
        if (score >= 75)
          return `${lead} your income feels steady, which supports planning and consistency.`;
        if (score >= 50)
          return `${lead} income is mostly steady, but variations may make long-term planning harder.`;
        return `${lead} income may be unpredictable, which can make progress feel slower even with effort.`;
      case "Spending & Saving":
        if (score >= 75)
          return `${lead} you are creating space between income and expenses, which supports stability.`;
        if (score >= 50)
          return `${lead} you have some balance, but it may not feel consistent month to month.`;
        return `${lead} expenses may be taking most of your income, reducing flexibility.`;
      case "Resilience":
        if (score >= 75)
          return `${lead} you may be buffered against unexpected events.`;
        if (score >= 50)
          return `${lead} you may have some buffer, but surprises can still disrupt plans.`;
        return `${lead} unexpected events may hit hard without a strong cushion.`;
      case "Debt & Credit Health":
        if (score >= 75)
          return `${lead} debt feels controlled and does not limit flexibility much.`;
        if (score >= 50)
          return `${lead} debt is manageable, but may require attention to avoid pressure.`;
        return `${lead} debt may be weighing down progress and limiting options.`;
      case "Growth Readiness":
        if (score >= 75)
          return `${lead} you are positioned to focus on longer-term growth.`;
        if (score >= 50)
          return `${lead} you are preparing for growth, but the path may not feel fully clear yet.`;
        return `${lead} growth may not feel possible yet because foundational areas need support first.`;
      case "Planning & Direction":
        if (score >= 75)
          return `${lead} you have direction, which makes decisions easier and more consistent.`;
        if (score >= 50)
          return `${lead} you have some structure, but may still be reacting to situations.`;
        return `${lead} direction may be unclear, which can make progress feel inconsistent.`;
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-[#ffffff]">
      <div className="mx-auto w-full max-w-6xl space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-[11px] tracking-[0.22em] text-neutral-600">
            YOUR RESULTS
          </p>

          <h1 className="mt-4 text-4xl sm:text-5xl font-semibold text-neutral-900">
            Your Financial Health Review
          </h1>

          <p className="mt-4 text-neutral-700 text-base sm:text-lg max-w-2xl mx-auto">
            Thank you for taking the time. This snapshot reflects your answers
            and highlights where things look stable and where support may be
            useful.
          </p>

          <p className="mt-3 text-xs text-neutral-600">
            Educational overview only. No financial advice is being provided.
          </p>
        </motion.div>

        {/* Hero summary (warmer + calmer CTAs) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-[28px] bg-white border border-black/5 shadow-[0_25px_70px_rgba(0,0,0,0.08)] p-8 sm:p-10"
        >
          <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-center">
            {/* Left */}
            <div>
              <p className="text-[11px] tracking-[0.22em] text-neutral-600">
                RESULT SUMMARY
              </p>

              <h2 className="mt-3 text-2xl sm:text-3xl font-semibold text-neutral-900">
                {results.category.label}
              </h2>

              <div className="mt-5 rounded-2xl border border-black/5 bg-[#FBF7F1] p-5">
                <p className="text-base text-neutral-900">
                  <span className="font-semibold">{narrative.headline}</span>{" "}
                  <span className="text-neutral-700">{narrative.summary}</span>
                </p>

                <p className="mt-3 text-sm text-neutral-700">
                  {narrative.valueLine}
                </p>
              </div>

              {/* Value-forward, not sales */}
              <div className="mt-6 space-y-3">
                <p className="text-sm text-neutral-700">
                  This report is designed to do three things for you:
                </p>

                <ul className="space-y-2 text-sm text-neutral-800">
                  <li className="flex gap-3">
                    <span
                      className="mt-[7px] h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: ACCENT }}
                    />
                    <span>
                      <span className="font-semibold">Reflect reality:</span>{" "}
                      how stable or unstable things feel based on your answers.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span
                      className="mt-[7px] h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: ACCENT }}
                    />
                    <span>
                      <span className="font-semibold">Reveal friction:</span>{" "}
                      the areas most likely to create stress, uncertainty, or
                      stop-start progress.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span
                      className="mt-[7px] h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: ACCENT }}
                    />
                    <span>
                      <span className="font-semibold">Give direction:</span>{" "}
                      which pillars are worth paying attention to first, before
                      anything else.
                    </span>
                  </li>
                </ul>

                <p className="text-xs text-neutral-600">
                  This is an educational snapshot based on your inputs. It does
                  not provide financial advice.
                </p>
              </div>
            </div>

            {/* Right: Score panel (no CTA) */}
            <div className="rounded-2xl border border-black/5 bg-[#FAF6EF] p-6 text-center">
              <p className="text-sm text-neutral-700">Overall score</p>

              <div className="mt-2 flex items-end justify-center gap-2">
                <p className="text-6xl font-semibold text-neutral-900">
                  {results.score}
                </p>
                <span className="text-xl text-neutral-500 font-semibold">
                  /100
                </span>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-neutral-700">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: ACCENT }}
                />
                <span>Built from 6 core areas</span>
              </div>

              <div className="mt-6 rounded-xl bg-white border border-black/5 p-4 text-left">
                <p className="text-sm font-semibold text-neutral-900">
                  How to interpret this number
                </p>
                <p className="mt-2 text-sm text-neutral-700 leading-relaxed">
                  Higher scores usually indicate more stability and clearer
                  direction. Lower scores usually indicate gaps in structure
                  that can make progress feel harder, even with effort.
                </p>
              </div>

              <p className="mt-4 text-xs text-neutral-600">
                You are not being judged. This is a starting point.
              </p>

              <p className="mt-2 text-[11px] text-neutral-500">
                Saved for this session only.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Chart + highlights */}
        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="rounded-[24px] bg-white border border-black/5 shadow-[0_18px_50px_rgba(0,0,0,0.06)] p-6 sm:p-8"
          >
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <h3 className="text-xl font-semibold text-neutral-900">
                  Your six-area snapshot
                </h3>
                <p className="mt-2 text-sm text-neutral-700">
                  Higher scores often feel calmer and more predictable. Lower
                  scores often show up as friction, stress, or inconsistency.
                </p>
              </div>

              <div className="text-xs text-neutral-600">
                Color key <span className="mx-1">•</span>{" "}
                <span className="inline-flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: INK }}
                  />
                  Strong
                </span>
                <span className="mx-2" />
                <span className="inline-flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8F86B8]" />
                  Developing
                </span>
                <span className="mx-2" />
                <span className="inline-flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D46A55]" />
                  Needs support
                </span>
              </div>
            </div>

            <div className="mt-6">
              <ResponsiveContainer width="100%" height={320}>
                <BarChart
                  data={chartData}
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E8E2D8" />
                  <XAxis
                    type="number"
                    domain={[0, 100]}
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={160}
                    tick={{ fill: "#111827", fontWeight: 500, fontSize: 13 }}
                  />
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, "Score"]}
                    cursor={{ fill: "rgba(176,125,61,0.08)" }}
                  />
                  <Bar dataKey="score" radius={[8, 8, 8, 8]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Insight panel instead of CTA */}
            <div className="mt-8 rounded-2xl border border-black/5 bg-[#FBF7F1] p-5">
              <p className="text-sm text-neutral-800 leading-relaxed">
                Patterns matter more than individual scores. If two or more
                areas sit in the lower range, they often influence each other.
                For example, income instability can affect saving consistency,
                which then affects resilience. Stability usually builds in
                layers.
              </p>
            </div>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="rounded-[24px] bg-white border border-black/5 shadow-[0_18px_50px_rgba(0,0,0,0.06)] p-6">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 style={{ color: ACCENT }} />
                <h4 className="font-semibold text-neutral-900">
                  What looks steady
                </h4>
              </div>
              <ul className="text-sm text-neutral-700 space-y-2">
                {results.topPillars.map((pillar) => (
                  <li key={pillar}>• {pillar}</li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-neutral-600">
                These areas are likely supporting your confidence and
                decision-making.
              </p>
            </div>

            <div className="rounded-[24px] bg-white border border-black/5 shadow-[0_18px_50px_rgba(0,0,0,0.06)] p-6">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="text-amber-600" />
                <h4 className="font-semibold text-neutral-900">
                  What may be creating friction
                </h4>
              </div>
              <ul className="text-sm text-neutral-700 space-y-2">
                {results.bottomPillars.map((pillar) => (
                  <li key={pillar}>• {pillar}</li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-neutral-600">
                These are signals, not labels. Many people experience this phase
                before building stronger financial structure.
              </p>
            </div>

            {/* Calm reflection box instead of CTA */}
            <div
              className="rounded-[24px] border border-black/5 bg-white p-6"
      
            >
              <p className="text-sm text-neutral-800 leading-relaxed">
                Financial clarity tends to improve when unstable areas become
                predictable. The goal is not perfection. It is consistency.
              </p>
            </div>
          </motion.div>
        </div>
        {/* Pillar cards */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="rounded-[28px] bg-white border border-black/5 shadow-[0_18px_50px_rgba(0,0,0,0.06)] p-8 sm:p-10"
        >
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h3 className="text-2xl font-semibold text-neutral-900">
                What each area suggests
              </h3>
              <p className="mt-2 text-sm text-neutral-700 max-w-2xl">
                These are interpretations of your answers, not personalised
                financial advice. They highlight where structure, support, or
                better visibility may help.
              </p>
            </div>

            {/* Keep this subtle */}
            <button
              type="button"
              onClick={() => router.push("/pricing")}
              className="text-sm font-semibold hover:opacity-80 transition"
              style={{ color: ACCENT }}
            >
              See support options{" "}
              <ArrowRight className="inline-block ml-1 h-4 w-4" />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(results.pillarScores).map(([pillar, data], i) => {
              const score = data.score;
              const meaning = getMeaning(pillar, score);

              return (
                <motion.div
                  key={pillar}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
                  className="rounded-2xl border border-black/5 bg-[#FBF7F1] p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-neutral-900">
                        {pillar}
                      </h4>
                      <p className="mt-2 text-sm text-neutral-700">
                        Score:{" "}
                        <span className="font-semibold text-neutral-900">
                          {score}%
                        </span>
                      </p>
                    </div>

                    <span
                      className={`shrink-0 text-xs px-2.5 py-1 rounded-md font-semibold ${getBadgeClass(score)}`}
                    >
                      {getBadgeLabel(score)}
                    </span>
                  </div>

                  <p className="mt-4 text-sm text-neutral-800 leading-relaxed">
                    {meaning}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Closing (warm, calm, appreciative) */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="rounded-[28px] bg-white border border-black/5 shadow-[0_18px_50px_rgba(0,0,0,0.06)] p-8 sm:p-10 text-center"
        >
          <TrendingUp className="mx-auto mb-4" style={{ color: ACCENT }} />
          <h3 className="text-2xl font-semibold text-neutral-900">
            You have clarity now. That is the hard part.
          </h3>
          <p className="mt-3 text-neutral-700 max-w-2xl mx-auto">
            If parts of your snapshot feel unstable or unclear, it usually means
            the missing piece is structure and consistent support. If you want
            to explore what that looks like, we have just the thing for you.
          </p>

          <div className="mt-7 flex justify-center gap-3 flex-wrap">
            <Button
              onClick={() => router.push("/pricing")}
              className="px-8 py-3 font-semibold"
              style={{ backgroundColor: ACCENT, color: "white" }}
            >
              View pricing <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              onClick={() => router.push("/#wealth-scan")}
              className="px-8 py-3"
            >
              Retake
            </Button>
          </div>

          <p className="mt-4 text-xs text-neutral-600">
            Educational report only. No financial advice is being provided.
          </p>
        </motion.div>
      </div>

      <BeginJourneyModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
}
