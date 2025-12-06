"use client";

import {
  TrendingUp,
  ClipboardList,
  Search,
  BarChart3,
  RotateCcw,
} from "lucide-react";

interface RoadmapStep {
  title: string;
  icon: any;
  description: string;
}

export default function CircleDivider() {
  return (
    <div className="w-full relative flex items-center my-3">
      <span className="h-2 w-2 rounded-full bg-amber-600 z-10" />
      <span className="-mx-[6px] flex-1 h-[1px] bg-amber-600" />
      <span className="h-2 w-2 -mr-[30px] rounded-full bg-amber-600 z-10" />
    </div>
  );
}

const steps: RoadmapStep[] = [
  {
    title: "Discover",
    icon: Search,
    description: "Understand your goals and financial priorities.",
  },
  {
    title: "Assess",
    icon: BarChart3,
    description: "We analyze your assets, income, and risk profile.",
  },
  {
    title: "Plan",
    icon: ClipboardList,
    description: "A personalized strategy designed for sustainable growth.",
  },
  {
    title: "Grow",
    icon: TrendingUp,
    description: "Your wealth plan comes alive with smart insights.",
  },
  {
    title: "Review",
    icon: RotateCcw,
    description: "We refine your strategy as your life evolves.",
  },
];

export function Journey() {
  return (
    <section className="w-full relative bg-slate-950 px-4 py-16  overflow-x-auto">
      {/* Image background */}
      <div
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        style={{
          backgroundImage: "url('/journey.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/70 z-5 backdrop-blur-md" />

      {/* Content wrapper */}
      <div className="relative mx-auto max-w-6xl flex flex-col justify-center w-fit z-10 bg-gray-500/20 rounded-4xl p-10">
        {/* Section Title */}
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12">
          The Celerey Journey
        </h2>

        {/* Desktop Staircase Waterfall */}
        <div className="hidden md:block w-[700px] lg:w-[900px] xl:w-[1100px] 2xl:w-[1300px] mb-12 pl-20">
          <div className="relative" style={{ minHeight: "400px" }}>
            {/* Step nodes and content */}
            <div className="relative">
              {/* Header row */}
              <div className="absolute top-0 left-0 w-full">
                {steps.map((step, index) => {
                  const leftPositions = ["0%", "15%", "30%", "45%", "60%"];
                  return (
                    <div
                      key={index}
                      className=" absolute"
                      style={{ left: leftPositions[index] }}
                    >
                      <div className="text-xs font-medium text-slate-200 mb-2">
                        Step {index + 1}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Step boxes */}
              {steps.map((step, index) => {
                const leftPositions = ["0%", "15%", "30%", "45%", "60%"];
                return (
                  <div
                    key={index}
                    style={{
                      position: "absolute",
                      top: `${60 + index * 60}px`,
                      left: leftPositions[index],
                      width: "140px",
                    }}
                  >
                    <div className="relative space-y-2">
                      <div className="flex flex-col items-baseline gap-2">
                        <span className="text-xs font-semibold text-amber-500">
                          {step.title}
                        </span>
                        <CircleDivider />
                      </div>
                      <ul className="space-y-1">
                        <li className="flex gap-2 text-xs text-slate-100 leading-relaxed">
                          <span className="text-amber-600 flex-shrink-0">
                            •
                          </span>
                          <span>{step.description}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="md:hidden space-y-8">
          {steps.map((item, index) => (
            <div key={index} className="relative pl-8">
              <div className="absolute left-1 top-6 bottom-0 w-0.5 bg-gradient-to-b from-amber-600 to-amber-600/30" />
              <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-amber-600 shadow-lg shadow-amber-600/50" />

              <div>
                <div className="text-xs font-medium text-slate-500 mb-2">
                  Step {index + 1}
                </div>
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-semibold text-amber-500">
                      {item.title}
                    </span>
                  </div>
                  <ul className="space-y-1">
                    <li className="flex gap-2 text-xs text-slate-400 leading-relaxed">
                      <span className="text-amber-600">•</span>
                      <span>{item.description}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
