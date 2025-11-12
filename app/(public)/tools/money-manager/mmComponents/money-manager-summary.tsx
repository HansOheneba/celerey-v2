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
      <Card className="p-10 bg-white border border-gray-200 rounded-2xl text-center shadow-sm">
        <div className="max-w-md mx-auto space-y-3">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-3xl text-gray-500">₵</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800">
            Start Tracking Your Cash Flow
          </h3>
          <p className="text-gray-500 leading-relaxed">
            Enter your money in and money out to discover how your money moves{" "}
            {frequency.toLowerCase()}. Celerey will visualize your balance and
            offer personalized insights.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-8 text-gray-800">
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cash Flow Chart */}
        <Card className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Cash Flow Overview
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  color: "#111827",
                }}
                formatter={(value) => [
                  `₵${Number(value).toFixed(2)}`,
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
          <Card className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
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
                    return `${data.name}: ₵${data.value.toFixed(0)}`;
                  }}
                >
                  {expenseData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    color: "#111827",
                  }}
                  formatter={(value) => [
                    `₵${Number(value).toFixed(2)}`,
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
          value={`₵${totalMoneyIn.toFixed(2)}`}
          subtitle={`per ${frequency.toLowerCase()}`}
          color="emerald"
        />
        <StatCard
          title="Total Expenses"
          value={`₵${totalMoneyOut.toFixed(2)}`}
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
        className={`p-6 ${netFlowMessage.bgColor} border ${netFlowMessage.borderColor} rounded-2xl shadow-sm`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3
              className={`text-xl font-semibold ${netFlowMessage.color} mb-2`}
            >
              {netFlowMessage.title}
            </h3>
            <p className="text-gray-600">{netFlowMessage.message}</p>
            <p className="text-gray-500 text-sm mt-2">
              Celerey can help you make sense of your numbers —{" "}
              <span className="text-sky-600 hover:underline cursor-pointer">
                find out how
              </span>
              .
            </p>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${netFlowMessage.color}`}>
              {netFlow >= 0 ? "+" : "-"}₵{Math.abs(netFlow).toFixed(2)}
            </div>
            <div className="text-sm text-gray-500">Net Flow</div>
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
    emerald: { text: "text-emerald-600", value: "text-emerald-500" },
    rose: { text: "text-rose-600", value: "text-rose-500" },
    blue: { text: "text-blue-600", value: "text-blue-500" },
  };
  return (
    <Card className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
      <h4 className={`text-sm font-semibold ${colorMap[color].text} mb-1`}>
        {title}
      </h4>
      <div className={`text-2xl font-bold ${colorMap[color].value}`}>
        {value}
      </div>
      <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
    </Card>
  );
}

// ---- HELPERS ----
function getNetFlowMessage(netFlow: number, frequency: string) {
  const period = getFrequencyText(frequency);
  if (netFlow > 0) {
    return {
      title: "Positive Cash Flow",
      message: `You’re saving about ₵${netFlow.toFixed(
        2
      )} ${period}. Keep it up — small gains compound fast.`,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
    };
  } else if (netFlow < 0) {
    return {
      title: "Negative Cash Flow",
      message: `You’re spending ₵${Math.abs(netFlow).toFixed(
        2
      )} more than you earn ${period}. Let’s rebalance your budget.`,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-200",
    };
  }
  return {
    title: "Balanced",
    message: `Your spending and income match perfectly ${period}. Let’s explore
      smarter savings opportunities.`,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
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
  return colorMap[tailwindColor] || "#6b7280";
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
