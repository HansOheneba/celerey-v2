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
    { name: "Income", amount: totalIncome, fill: "#4ADE80" },
    {
      name: "Expenses",
      amount: totalExpenses,
      fill: totalExpenses > totalIncome ? "#F87171" : "#86EFAC",
    },
    {
      name: "Balance",
      amount: Math.abs(balance),
      fill: balance >= 0 ? "#22C55E" : "#EF4444",
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
        color: "text-emerald-600",
        bgColor: "bg-green-50",
        borderColor: "border-emerald-300",
      };
    } else if (balance < 0) {
      return {
        title: "Deficit",
        description: `You're overspending by $${Math.abs(balance).toFixed(
          2
        )} ${prettyFrequency(frequency)}.`,
        color: "text-rose-600",
        bgColor: "bg-rose-50",
        borderColor: "border-rose-300",
      };
    } else {
      return {
        title: "Balanced",
        description: `Your income and expenses are evenly matched ${prettyFrequency(
          frequency
        )}.`,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-300",
      };
    }
  };

  const financialStatus = getFinancialStatus();
  const balanceMessage = getBalanceMessage();

  if (!hasData) {
    return (
      <div className="space-y-8 text-gray-700">
        <Card className="p-8 bg-white border border-gray-200 rounded-2xl shadow-sm text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Your Financial Summary Awaits
            </h3>
            <p className="text-gray-500 mb-6">
              Start by entering your income and expenses to see detailed
              insights, charts, and personalized recommendations.
            </p>
            <div className="text-sm text-gray-400">
              <strong>Tip:</strong> Begin with your income category
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-gray-700">
      {/* Charts */}
      {hasIncome && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Income vs Expenses */}
          <Card className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Income vs Expenses
            </h3>
            {totalIncome > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                  <YAxis stroke="#6B7280" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E5E7EB",
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
              <div className="h-48 flex items-center justify-center text-gray-400">
                Enter your income to visualize your cash flow.
              </div>
            )}
          </Card>

          {/* Expense Breakdown */}
          {hasExpenses && (
            <Card className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
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
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #E5E7EB",
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
                <div className="h-48 flex items-center justify-center text-gray-400">
                  Add your expenses to see how they’re distributed.
                </div>
              )}
            </Card>
          )}
        </div>
      )}

      {/* Category Insights */}
      {hasExpenses && (
        <Card className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
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

              if (categoryTotal === 0) return null;

              return (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getChartColor(category.color) }}
                    />
                    <span className="font-medium text-gray-700">
                      {category.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-800">
                      ${categoryTotal.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {percentage.toFixed(1)}% of income
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Financial Overview */}
      {hasIncome && (
        <Card
          className={`p-6 ${balanceMessage.bgColor} border ${balanceMessage.borderColor} rounded-2xl shadow-sm`}
        >
          <div className="flex items-start justify-between">
            <div>
              <h3
                className={`text-xl font-semibold ${balanceMessage.color} mb-1`}
              >
                {balanceMessage.title}
              </h3>
              <p className="text-gray-600">{balanceMessage.description}</p>
              <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                {financialStatus.message}
              </p>
            </div>
            <div className="text-right">
              <div className={`text-3xl font-bold ${balanceMessage.color}`}>
                ${Math.abs(balance).toFixed(2)}
              </div>
              <div className="text-sm text-gray-500">
                {prettyFrequency(frequency)}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Encouragement */}
      {hasIncome && !hasExpenses && (
        <Card className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-xl">💡</span>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Great start! Now add your expenses
          </h3>
          <p className="text-gray-500">
            You’ve entered your income. Add your expenses to see how they
            compare and get personalized budgeting insights.
          </p>
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
    "bg-slate-700": "#64748B",
    "bg-blue-600": "#3B82F6",
    "bg-emerald-600": "#10B981",
    "bg-purple-500": "#A855F7",
    "bg-cyan-500": "#06B6D4",
    "bg-sky-500": "#0EA5E9",
    "bg-pink-500": "#EC4899",
  };
  return colorMap[tailwindColor] || "#9CA3AF";
}
