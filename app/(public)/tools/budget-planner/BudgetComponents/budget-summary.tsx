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

interface BudgetItem {
  id: string;
  label: string;
  amount: number;
  frequency: "Weekly" | "Fortnightly" | "Monthly" | "Annually";
}

interface Category {
  id: string;
  name: string;
  color: string;
  items: BudgetItem[];
}

interface BudgetSummaryProps {
  categories: Category[];
  frequency: "Weekly" | "Fortnightly" | "Monthly" | "Annually";
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

interface PieChartData {
  name: string;
  value: number;
  color: string;
  percentage: number;
}

export default function BudgetSummary({
  categories,
  frequency,
  totalIncome,
  totalExpenses,
  balance,
}: BudgetSummaryProps) {
  const expenseCategories = categories.filter((cat) => cat.id !== "income");

  // Check if user has entered any data
  const hasIncome = totalIncome > 0;
  const hasExpenses = expenseCategories.some((category) =>
    category.items.some((item) => item.amount > 0)
  );
  const hasData = hasIncome || hasExpenses;

  const pieChartData = expenseCategories
    .map((cat) => {
      const total = cat.items.reduce((sum, item) => {
        const converted = convertToFrequency(
          item.amount,
          item.frequency,
          frequency
        );
        return sum + converted;
      }, 0);

      return {
        name: cat.name,
        value: total,
        color: getChartColor(cat.color),
        percentage: totalIncome > 0 ? (total / totalIncome) * 100 : 0,
      };
    })
    .filter((item) => item.value > 0);

  const barChartData = [
    { name: "Income", amount: totalIncome, fill: "#6EE7B7" },
    {
      name: "Expenses",
      amount: totalExpenses,
      fill: totalExpenses > totalIncome ? "#F87171" : "#4ADE80",
    },
    {
      name: "Balance",
      amount: Math.abs(balance),
      fill: balance >= 0 ? "#22C55E" : "#F43F5E",
    },
  ];

  const prettyFrequency = (f: string) => {
    switch (f) {
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
  };

  const getFinancialStatus = () => {
    if (totalIncome === 0)
      return {
        message:
          "Once you enter your income, Celerey will show your full picture.",
        type: "info",
      };

    const savingsRate = (balance / totalIncome) * 100;

    if (balance < 0) {
      return {
        message: `You're spending about ${Math.abs(savingsRate).toFixed(
          1
        )}% more than you earn — Celerey can help you rebalance your finances.`,
        type: "danger",
      };
    } else if (savingsRate >= 20) {
      return {
        message: `Impressive — you're saving ${savingsRate.toFixed(
          1
        )}% of your income. Let's explore ways Celerey can help grow those savings.`,
        type: "success",
      };
    } else if (savingsRate >= 10) {
      return {
        message: `Good discipline — ${savingsRate.toFixed(
          1
        )}% of your income is being saved. Let's look at how Celerey can stretch that further.`,
        type: "success",
      };
    } else if (savingsRate > 0) {
      return {
        message: `You're keeping a small surplus. Every bit helps — Celerey can help you plan for consistency.`,
        type: "info",
      };
    } else {
      return {
        message:
          "You're breaking even. Let's explore smarter expense categories together.",
        type: "warning",
      };
    }
  };

  const getBalanceMessage = () => {
    if (balance > 0) {
      return {
        title: "Surplus",
        description: `You have $${balance.toFixed(2)} left ${prettyFrequency(
          frequency
        )}.`,
        color: "text-emerald-300",
        bgColor: "bg-slate-900/60",
        borderColor: "border-emerald-500/30",
      };
    } else if (balance < 0) {
      return {
        title: "Deficit",
        description: `You're overspending by $${Math.abs(balance).toFixed(
          2
        )} ${prettyFrequency(frequency)}.`,
        color: "text-rose-300",
        bgColor: "bg-slate-900/60",
        borderColor: "border-rose-500/30",
      };
    } else {
      return {
        title: "Balanced",
        description: `Your income and expenses are evenly matched ${prettyFrequency(
          frequency
        )}.`,
        color: "text-blue-300",
        bgColor: "bg-slate-900/60",
        borderColor: "border-blue-500/30",
      };
    }
  };

  const financialStatus = getFinancialStatus();
  const balanceMessage = getBalanceMessage();

  if (!hasData) {
    return (
      <div className="space-y-8 text-slate-200">
        <Card className="p-8 bg-slate-900/70 border border-slate-700 rounded-2xl backdrop-blur text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-100 mb-2">
              Your Financial Summary Awaits
            </h3>
            <p className="text-slate-400 mb-6">
              Start by entering your income and expenses to see detailed
              insights, charts, and personalized recommendations for your
              budget.
            </p>
            <div className="text-sm text-slate-500">
              <strong>Tip:</strong> Begin with your income category to get
              started
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-slate-200">
      {/* Charts - Only show if there's income */}
      {hasIncome && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Income vs Expenses */}
          <Card className="p-6 bg-slate-900/70 border border-slate-700 rounded-2xl backdrop-blur">
            <h3 className="text-lg font-medium text-slate-100 mb-4">
              Income vs Expenses
            </h3>
            {totalIncome > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={barChartData}>
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
                  <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                    {barChartData.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-48 flex items-center justify-center text-slate-500">
                Enter your income to visualize your cash flow.
              </div>
            )}
          </Card>

          {/* Expense Breakdown - Only show if there are expenses */}
          {hasExpenses && (
            <Card className="p-6 bg-slate-900/70 border border-slate-700 rounded-2xl backdrop-blur">
              <h3 className="text-lg font-medium text-slate-100 mb-4">
                Expense Breakdown
              </h3>
              {pieChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(props: PieLabelRenderProps) => {
                        const dataPoint = props.payload as PieChartData;
                        return `${
                          dataPoint.name
                        }: ${dataPoint.percentage.toFixed(1)}%`;
                      }}
                      outerRadius={85}
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "1px solid #334155",
                      }}
                      formatter={(value: number, name: string) => [
                        `$${value.toFixed(2)} (${(
                          (value / totalIncome) *
                          100
                        ).toFixed(1)}%)`,
                        name,
                      ]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-48 flex items-center justify-center text-slate-500">
                  Add your expenses to see how they&apos;re distributed.
                </div>
              )}
            </Card>
          )}
        </div>
      )}

      {/* Category Insights - Only show if there are expenses */}
      {hasExpenses && (
        <Card className="p-6 bg-slate-900/70 border border-slate-700 rounded-2xl backdrop-blur">
          <h3 className="text-lg font-medium text-slate-100 mb-4">
            Category Insights
          </h3>
          <div className="space-y-3">
            {expenseCategories.map((category) => {
              const categoryTotal = category.items.reduce((sum, item) => {
                const converted = convertToFrequency(
                  item.amount,
                  item.frequency,
                  frequency
                );
                return sum + converted;
              }, 0);

              const percentage =
                totalIncome > 0 ? (categoryTotal / totalIncome) * 100 : 0;

              // Only show categories with actual expenses
              if (categoryTotal === 0) return null;

              return (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-3 bg-slate-800/70 rounded-lg hover:bg-slate-700/50 transition"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getChartColor(category.color) }}
                    />
                    <span className="font-medium text-slate-200">
                      {category.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-100">
                      ${categoryTotal.toFixed(2)}
                    </div>
                    <div className="text-xs text-slate-400">
                      {percentage.toFixed(1)}% of income
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Financial Overview - Only show if there's income */}
      {hasIncome && (
        <Card
          className={`p-6 ${balanceMessage.bgColor} border ${balanceMessage.borderColor} rounded-2xl backdrop-blur-md`}
        >
          <div className="flex items-start justify-between">
            <div>
              <h3
                className={`text-xl font-semibold ${balanceMessage.color} mb-1`}
              >
                {balanceMessage.title}
              </h3>
              <p className="text-slate-300">{balanceMessage.description}</p>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                {financialStatus.message}
              </p>
            </div>
            <div className="text-right">
              <div className={`text-3xl font-bold ${balanceMessage.color}`}>
                ${Math.abs(balance).toFixed(2)}
              </div>
              <div className="text-sm text-slate-400">
                {prettyFrequency(frequency)}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Show encouragement message if only income is entered */}
      {hasIncome && !hasExpenses && (
        <Card className="p-6 bg-slate-900/70 border border-slate-700 rounded-2xl backdrop-blur">
          <div className="text-center">
            <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">💡</span>
            </div>
            <h3 className="text-lg font-medium text-slate-100 mb-2">
              Great start! Now add your expenses
            </h3>
            <p className="text-slate-400">
              You&apos;ve entered your income. Add your expenses to see how they
              compare and get personalized budgeting insights.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}

// --- Helpers ---
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
    "bg-slate-700": "#475569",
    "bg-blue-600": "#3B82F6",
    "bg-emerald-600": "#10B981",
    "bg-purple-500": "#8B5CF6",
    "bg-cyan-500": "#06B6D4",
    "bg-sky-500": "#0EA5E9",
    "bg-pink-500": "#EC4899",
  };
  return colorMap[tailwindColor] || "#94A3B8";
}
