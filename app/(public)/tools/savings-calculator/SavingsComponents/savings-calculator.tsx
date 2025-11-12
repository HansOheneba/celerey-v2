"use client";

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";
import Link from "next/link";

type SaveType = "as-much-as-possible" | "specific-amount";
type TimeUnit = "months" | "years";

interface SavingsData {
  month: number;
  startingBalance: number;
  regularSavings: number;
  interest: number;
  total: number;
}

export default function SavingsCalculator() {
  const [saveType, setSaveType] = useState<SaveType>("as-much-as-possible");
  const [timeUnit, setTimeUnit] = useState<TimeUnit>("months");
  const [timeValue, setTimeValue] = useState(55);
  const [startingBalance, setStartingBalance] = useState(0);
  const [interestRate, setInterestRate] = useState(1);
  const [regularSavings, setRegularSavings] = useState(22);
  const [savingsFrequency, setSavingsFrequency] = useState<
    "Weekly" | "Fortnightly" | "Monthly"
  >("Monthly");
  const [targetAmount, setTargetAmount] = useState(552);

  const totalMonths = timeUnit === "years" ? timeValue * 12 : timeValue;

  const getMonthlyAmount = (amount: number, frequency: string): number => {
    switch (frequency) {
      case "Weekly":
        return (amount * 52) / 12;
      case "Fortnightly":
        return (amount * 26) / 12;
      default:
        return amount;
    }
  };

  const monthlyAmount = getMonthlyAmount(regularSavings, savingsFrequency);
  const monthlyInterestRate = interestRate / 100 / 12;

  const calculateRequiredMonthlySavings = (): number => {
    if (saveType !== "specific-amount") return monthlyAmount;

    const targetAfterStarting = targetAmount - startingBalance;
    if (targetAfterStarting <= 0) return 0;

    let low = 0;
    let high = targetAfterStarting;
    let requiredMonthly = 0;

    for (let i = 0; i < 100; i++) {
      const mid = (low + high) / 2;
      let balance = startingBalance;

      for (let month = 0; month < totalMonths; month++) {
        const interestEarned = balance * monthlyInterestRate;
        balance = balance + mid + interestEarned;
      }

      if (balance < targetAmount) {
        low = mid;
      } else {
        high = mid;
      }
      requiredMonthly = mid;
    }

    return requiredMonthly;
  };

  const requiredMonthlySavings = calculateRequiredMonthlySavings();
  const effectiveMonthlyAmount =
    saveType === "specific-amount" ? requiredMonthlySavings : monthlyAmount;

  const chartData = useMemo(() => {
    const data: SavingsData[] = [];
    let balance = startingBalance;

    for (let month = 0; month <= totalMonths; month++) {
      const interestEarned = balance * monthlyInterestRate;
      const newBalance = balance + effectiveMonthlyAmount + interestEarned;

      data.push({
        month,
        startingBalance: month === 0 ? startingBalance : 0,
        regularSavings: effectiveMonthlyAmount,
        interest: interestEarned,
        total: newBalance,
      });

      balance = newBalance;
    }

    return data;
  }, [
    startingBalance,
    effectiveMonthlyAmount,
    monthlyInterestRate,
    totalMonths,
  ]);

  const finalData = chartData[chartData.length - 1];
  const totalInterest = chartData.reduce((sum, d) => sum + d.interest, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Left Column - Inputs */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-[#1B1856] text-center sm:text-left">
            Savings goals calculator
          </h1>

          {/* Save Type */}
          <div className="space-y-2">
            <label className="text-gray-600 text-sm">I want to save</label>
            <select
              value={saveType}
              onChange={(e) => setSaveType(e.target.value as SaveType)}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-[#1B1856]/40 focus:outline-none"
            >
              <option value="as-much-as-possible">as much as possible</option>
              <option value="specific-amount">an amount of</option>
            </select>
          </div>

          {saveType === "specific-amount" && (
            <div className="space-y-2">
              <label className="text-gray-600 text-sm">Target amount:</label>
              <input
                type="number"
                value={targetAmount}
                onChange={(e) =>
                  setTargetAmount(Math.max(0, Number(e.target.value) || 0))
                }
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-[#1B1856]/40 focus:outline-none"
                placeholder="$552"
              />
            </div>
          )}

          {/* Time Period */}
          <div className="space-y-2">
            <label className="text-gray-600 text-sm">in</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="number"
                value={timeValue}
                onChange={(e) =>
                  setTimeValue(Math.max(1, Number(e.target.value) || 0))
                }
                className="w-full sm:flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-[#1B1856]/40 focus:outline-none"
              />
              <select
                value={timeUnit}
                onChange={(e) => setTimeUnit(e.target.value as TimeUnit)}
                className="w-full sm:w-auto px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-[#1B1856]/40 focus:outline-none"
              >
                <option value="months">months time</option>
                <option value="years">years time</option>
              </select>
            </div>
          </div>

          {/* Starting Balance & Interest */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-gray-600 text-sm">Starting balance:</label>
              <input
                type="number"
                value={startingBalance}
                onChange={(e) =>
                  setStartingBalance(Math.max(0, Number(e.target.value) || 0))
                }
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-[#1B1856]/40 focus:outline-none"
                placeholder="$0"
              />
            </div>
            <div className="space-y-2">
              <label className="text-gray-600 text-sm">
                Interest rate (max: 10%)
              </label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) =>
                  setInterestRate(
                    Math.min(10, Math.max(0, Number(e.target.value) || 0))
                  )
                }
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-[#1B1856]/40 focus:outline-none"
                placeholder="1%"
              />
            </div>
          </div>

          {saveType === "as-much-as-possible" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-gray-600 text-sm">
                  Regular savings (min: $1)
                </label>
                <input
                  type="number"
                  value={regularSavings}
                  onChange={(e) =>
                    setRegularSavings(Math.max(1, Number(e.target.value) || 0))
                  }
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-[#1B1856]/40 focus:outline-none"
                  placeholder="$22"
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-600 text-sm">
                  Savings frequency:
                </label>
                <select
                  value={savingsFrequency}
                  onChange={(e) =>
                    setSavingsFrequency(
                      e.target.value as "Weekly" | "Fortnightly" | "Monthly"
                    )
                  }
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-[#1B1856]/40 focus:outline-none"
                >
                  <option value="Weekly">Weekly</option>
                  <option value="Fortnightly">Fortnightly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Card className="bg-[#1B1856] text-white border-none p-6">
            {saveType === "as-much-as-possible" ? (
              <>
                <p className="text-blue-100 text-sm">You can save</p>
                <p className="text-3xl sm:text-4xl font-bold">
                  ${finalData.total.toFixed(0)}
                </p>
                <p className="text-blue-100 text-sm">
                  saving ${effectiveMonthlyAmount.toFixed(0)} monthly for{" "}
                  {totalMonths} months
                </p>
              </>
            ) : (
              <>
                <p className="text-blue-100 text-sm">You need to save</p>
                <p className="text-3xl sm:text-4xl font-bold">
                  ${effectiveMonthlyAmount.toFixed(0)} per month
                </p>
                <p className="text-blue-100 text-sm">
                  to reach ${targetAmount.toFixed(0)} in {totalMonths} months
                </p>
              </>
            )}
          </Card>

          <Card className="bg-white border border-gray-200 shadow-sm p-6">
            <h3 className="text-gray-800 font-semibold mb-3">
              After {totalMonths} Months
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Starting balance</p>
                <p className="font-semibold">${startingBalance.toFixed(0)}</p>
              </div>
              <div>
                <p className="text-gray-500">Regular savings</p>
                <p className="font-semibold">
                  ${(effectiveMonthlyAmount * totalMonths).toFixed(0)}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Interest</p>
                <p className="font-semibold">${totalInterest.toFixed(0)}</p>
              </div>
              <div>
                <p className="text-gray-500">Total</p>
                <p className="font-semibold">${finalData.total.toFixed(0)}</p>
              </div>
            </div>

            <div className="mt-5">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      color: "#334155",
                    }}
                    formatter={(value: number) => `$${value.toFixed(0)}`}
                  />
                  <Legend />
                  <Bar dataKey="total" fill="#1B1856" name="Total Savings" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-sm p-6">
            <h3 className="text-gray-800 font-semibold mb-3">
              What do I do next?
            </h3>
            <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
              <li className="flex gap-2">
                <span className="text-[#1B1856]">•</span>
                <span>
                  Set up a direct transfer of $
                  {effectiveMonthlyAmount.toFixed(0)}{" "}
                  {saveType === "specific-amount" ? "" : "monthly"} into your
                  savings account
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#1B1856]">•</span>
                <span>
                  Compare savings accounts to find the best possible rate
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#1B1856]">•</span>
                <span>
                  Get tailored guidance from a{" "}
                  <Link
                    href="/advisors"
                    className="text-[#1B1856] font-medium underline underline-offset-2"
                  >
                    Celerey advisor
                  </Link>{" "}
                  to reach your goals faster — speak to one today for{" "}
                  <span className="font-semibold text-gray-800">free</span>.
                </span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
