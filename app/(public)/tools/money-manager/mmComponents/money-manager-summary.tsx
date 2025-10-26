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
      .map((item) => {
        const amount = convertToFrequency(
          item.amount,
          item.frequency,
          frequency
        );
        return {
          name: item.label,
          value: amount,
          color: getChartColor(moneyOutCategory.color),
        };
      })
      .filter((item) => item.value > 0) || [];

  const cashFlowData = [
    { name: "Money In", amount: totalMoneyIn, fill: "#10b981" },
    { name: "Money Out", amount: totalMoneyOut, fill: "#ef4444" },
  ];

  const getNetFlowMessage = () => {
    if (netFlow > 0) {
      return {
        title: "Positive Cash Flow",
        message: `You're saving $${netFlow.toFixed(2)} ${getFrequencyText(
          frequency
        )}. Great job!`,
        color: "text-emerald-300",
        bgColor: "bg-emerald-900/30",
        borderColor: "border-emerald-500/30",
      };
    } else if (netFlow < 0) {
      return {
        title: "Negative Cash Flow",
        message: `You're spending $${Math.abs(netFlow).toFixed(
          2
        )} more than you earn ${getFrequencyText(frequency)}.`,
        color: "text-rose-300",
        bgColor: "bg-rose-900/30",
        borderColor: "border-rose-500/30",
      };
    } else {
      return {
        title: "Balanced",
        message: `Your money in and out are equal ${getFrequencyText(
          frequency
        )}.`,
        color: "text-blue-300",
        bgColor: "bg-blue-900/30",
        borderColor: "border-blue-500/30",
      };
    }
  };

  const netFlowMessage = getNetFlowMessage();
  const hasData = totalMoneyIn > 0 || totalMoneyOut > 0;

  if (!hasData) {
    return (
      <Card className="p-8 bg-slate-900/70 border border-slate-700 rounded-2xl text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">💰</span>
          </div>
          <h3 className="text-xl font-semibold text-slate-100 mb-2">
            Track Your Money Flow
          </h3>
          <p className="text-slate-400">
            Start by entering your income and expenses to see your cash flow
            summary.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6 text-slate-200">
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cash Flow Bar Chart */}
        <Card className="p-6 bg-slate-900/70 border border-slate-700 rounded-2xl">
          <h3 className="text-lg font-medium text-slate-100 mb-4">Cash Flow</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #334155",
                }}
                formatter={(value) => [
                  `$${Number(value).toFixed(2)}`,
                  "Amount",
                ]}
              />
              <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                {cashFlowData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
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
                  label={(props: PieLabelRenderProps) => {
                    // The data is available in the payload property
                    const data = props.payload as ExpenseDataItem;
                    return `${data.name}: $${data.value.toFixed(0)}`;
                  }}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
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
        <Card className="p-4 bg-slate-900/70 border border-slate-700 rounded-xl">
          <h4 className="text-sm font-semibold text-emerald-400 mb-1">
            Total Income
          </h4>
          <div className="text-2xl font-bold text-emerald-300">
            ${totalMoneyIn.toFixed(2)}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            per {frequency.toLowerCase()}
          </p>
        </Card>

        <Card className="p-4 bg-slate-900/70 border border-slate-700 rounded-xl">
          <h4 className="text-sm font-semibold text-rose-400 mb-1">
            Total Expenses
          </h4>
          <div className="text-2xl font-bold text-rose-300">
            ${totalMoneyOut.toFixed(2)}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            per {frequency.toLowerCase()}
          </p>
        </Card>

        <Card className="p-4 bg-slate-900/70 border border-slate-700 rounded-xl">
          <h4 className="text-sm font-semibold text-blue-400 mb-1">
            Savings Rate
          </h4>
          <div className="text-2xl font-bold text-blue-300">
            {totalMoneyIn > 0
              ? `${((netFlow / totalMoneyIn) * 100).toFixed(1)}%`
              : "0%"}
          </div>
          <p className="text-xs text-slate-400 mt-1">of your income</p>
        </Card>
      </div>
      {/* Net Flow Summary */}
      <Card
        className={`p-6 ${netFlowMessage.bgColor} border ${netFlowMessage.borderColor} rounded-2xl`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3
              className={`text-xl font-semibold ${netFlowMessage.color} mb-2`}
            >
              {netFlowMessage.title}
            </h3>
            <p className="text-slate-300">{netFlowMessage.message}</p>
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

// Helper functions
function convertToFrequency(
  amount: number,
  fromFreq: "Weekly" | "Fortnightly" | "Monthly" | "Annually",
  toFreq: "Weekly" | "Fortnightly" | "Monthly" | "Annually"
): number {
  let annualAmount = amount;
  switch (fromFreq) {
    case "Weekly":
      annualAmount = amount * 52;
      break;
    case "Fortnightly":
      annualAmount = amount * 26;
      break;
    case "Monthly":
      annualAmount = amount * 12;
      break;
    case "Annually":
      annualAmount = amount;
      break;
  }
  switch (toFreq) {
    case "Weekly":
      return annualAmount / 52;
    case "Fortnightly":
      return annualAmount / 26;
    case "Monthly":
      return annualAmount / 12;
    case "Annually":
      return annualAmount;
    default:
      return annualAmount;
  }
}

function getChartColor(tailwindColor: string): string {
  const colorMap: Record<string, string> = {
    "bg-emerald-500": "#10b981",
    "bg-rose-500": "#ef4444",
  };
  return colorMap[tailwindColor] || "#94a3b8";
}

function getFrequencyText(freq: string): string {
  switch (freq) {
    case "Weekly":
      return "this week";
    case "Fortnightly":
      return "this fortnight";
    case "Monthly":
      return "this month";
    case "Annually":
      return "this year";
    default:
      return "this period";
  }
}
