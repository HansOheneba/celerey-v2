"use client";

import { Card } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieLabelRenderProps,
} from "recharts";

interface MoneyItem {
  id: string;
  label: string;
  amount: number;
  frequency: "Weekly" | "Fortnightly" | "Monthly" | "Annually";
}

interface MoneyCategory {
  id: string;
  name: string;
  color: string;
  type: "in" | "out";
  items: MoneyItem[];
}

interface MoneyManagerSummaryProps {
  categories: MoneyCategory[];
  frequency: "Weekly" | "Fortnightly" | "Monthly" | "Annually";
  totalMoneyIn: number;
  totalMoneyOut: number;
  netFlow: number;
}

interface ExpenseDataItem {
  name: string;
  value: number;
  color: string;
}

export default function MoneyManagerSummary({
  categories,
  frequency,
  totalMoneyIn,
  totalMoneyOut,
  netFlow,
}: MoneyManagerSummaryProps) {
  const moneyOutCategory = categories.find((cat) => cat.type === "out");

  const expenseData =
    moneyOutCategory?.items
      .map((item) => ({
        name: item.label,
        value: convertToFrequency(item.amount, item.frequency, frequency),
        color: getChartColor(moneyOutCategory.color),
      }))
      .filter((item) => item.value > 0) || [];

  const cashFlowData = [
    { name: "Money In", amount: totalMoneyIn, fill: "#10b981" },
    { name: "Money Out", amount: totalMoneyOut, fill: "#ef4444" },
  ];

  const hasData = totalMoneyIn > 0 || totalMoneyOut > 0;
  const netFlowMessage = getNetFlowMessage(netFlow, frequency);

  // ---- EMPTY STATE ----
  if (!hasData) {
    return (
      <Card className="p-10 bg-slate-900/70 border border-slate-700 rounded-2xl text-center">
        <div className="max-w-md mx-auto space-y-3">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto">
            <span className="text-3xl text-slate-400">₵</span>
          </div>
          <h3 className="text-xl font-semibold text-slate-100">
            Start Tracking Your Cash Flow
          </h3>
          <p className="text-slate-400 leading-relaxed">
            Enter your income and expenses to discover how your money moves each
            {` ${frequency.toLowerCase()}`}. Celerey will visualize your balance
            and offer personalized insights — find out how.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-8 text-slate-200">
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cash Flow Chart */}
        <Card className="p-6 bg-slate-900/70 border border-slate-700 rounded-2xl">
          <h3 className="text-lg font-medium text-slate-100 mb-4">
            Cash Flow Overview
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #334155",
                  color: "#fff",
                }}
                formatter={(value) => [
                  `$${Number(value).toFixed(2)}`,
                  "Amount",
                ]}
              />
              <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                {cashFlowData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Expense Breakdown */}
        {expenseData.length > 0 && (
          <Card className="p-6 bg-slate-900/70 border border-slate-700 rounded-2xl">
            <h3 className="text-lg font-medium text-slate-100 mb-4">
              Spending Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  dataKey="value"
                  label={(props: PieLabelRenderProps) => {
                    const data = props.payload as ExpenseDataItem;
                    return `${data.name}: $${data.value.toFixed(0)}`;
                  }}
                >
                  {expenseData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    color: "#fff",
                  }}
                  formatter={(value) => [
                    `$${Number(value).toFixed(2)}`,
                    "Amount",
                  ]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Income"
          value={`$${totalMoneyIn.toFixed(2)}`}
          subtitle={`per ${frequency.toLowerCase()}`}
          color="emerald"
        />
        <StatCard
          title="Total Expenses"
          value={`$${totalMoneyOut.toFixed(2)}`}
          subtitle={`per ${frequency.toLowerCase()}`}
          color="rose"
        />
        <StatCard
          title="Savings Rate"
          value={
            totalMoneyIn > 0
              ? `${((netFlow / totalMoneyIn) * 100).toFixed(1)}%`
              : "0%"
          }
          subtitle="of your income"
          color="blue"
        />
      </div>

      {/* Net Flow Insight */}
      <Card
        className={`p-6 ${netFlowMessage.bgColor} border ${netFlowMessage.borderColor} rounded-2xl`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3
              className={`text-xl font-semibold ${netFlowMessage.color} mb-2`}
            >
              {netFlowMessage.title}
            </h3>
            <p className="text-slate-300">{netFlowMessage.message}</p>
            <p className="text-slate-400 text-sm mt-2">
              Celerey can help you make sense of your numbers —{" "}
              <span className="text-sky-400 hover:underline cursor-pointer">
                find out how
              </span>
              .
            </p>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${netFlowMessage.color}`}>
              {netFlow >= 0 ? "+" : "-"}${Math.abs(netFlow).toFixed(2)}
            </div>
            <div className="text-sm text-slate-400">Net Flow</div>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ---- COMPONENTS ----
function StatCard({
  title,
  value,
  subtitle,
  color,
}: {
  title: string;
  value: string;
  subtitle: string;
  color: "emerald" | "rose" | "blue";
}) {
  const colorMap = {
    emerald: { text: "text-emerald-400", value: "text-emerald-300" },
    rose: { text: "text-rose-400", value: "text-rose-300" },
    blue: { text: "text-blue-400", value: "text-blue-300" },
  };
  return (
    <Card className="p-4 bg-slate-900/70 border border-slate-700 rounded-xl">
      <h4 className={`text-sm font-semibold ${colorMap[color].text} mb-1`}>
        {title}
      </h4>
      <div className={`text-2xl font-bold ${colorMap[color].value}`}>
        {value}
      </div>
      <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
    </Card>
  );
}

// ---- HELPERS ----
function getNetFlowMessage(netFlow: number, frequency: string) {
  const period = getFrequencyText(frequency);
  if (netFlow > 0) {
    return {
      title: "Positive Cash Flow",
      message: `You’re saving about $${netFlow.toFixed(
        2
      )} ${period}. Keep it up — small gains compound fast.`,
      color: "text-emerald-300",
      bgColor: "bg-emerald-900/30",
      borderColor: "border-emerald-500/30",
    };
  } else if (netFlow < 0) {
    return {
      title: "Negative Cash Flow",
      message: `You’re spending $${Math.abs(netFlow).toFixed(
        2
      )} more than you earn ${period}. Let’s rebalance your budget.`,
      color: "text-rose-300",
      bgColor: "bg-rose-900/30",
      borderColor: "border-rose-500/30",
    };
  }
  return {
    title: "Balanced",
    message: `Your spending and income match perfectly ${period}. Let’s explore
      smarter savings opportunities.`,
    color: "text-blue-300",
    bgColor: "bg-blue-900/30",
    borderColor: "border-blue-500/30",
  };
}

function convertToFrequency(
  amount: number,
  fromFreq: "Weekly" | "Fortnightly" | "Monthly" | "Annually",
  toFreq: "Weekly" | "Fortnightly" | "Monthly" | "Annually"
): number {
  const multipliers = { Weekly: 52, Fortnightly: 26, Monthly: 12, Annually: 1 };
  const annualAmount = amount * multipliers[fromFreq];
  return annualAmount / multipliers[toFreq];
}

function getChartColor(tailwindColor: string): string {
  const colorMap: Record<string, string> = {
    "bg-emerald-500": "#10b981",
    "bg-rose-500": "#ef4444",
  };
  return colorMap[tailwindColor] || "#94a3b8";
}

function getFrequencyText(freq: string): string {
  const map: Record<string, string> = {
    Weekly: "this week",
    Fortnightly: "this fortnight",
    Monthly: "this month",
    Annually: "this year",
  };
  return map[freq] || "this period";
}
