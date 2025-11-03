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

  // Convert time to months
  const totalMonths = timeUnit === "years" ? timeValue * 12 : timeValue;

  // Convert savings frequency to monthly amount
  const getMonthlyAmount = (amount: number, frequency: string): number => {
    switch (frequency) {
      case "Weekly":
        return (amount * 52) / 12;
      case "Fortnightly":
        return (amount * 26) / 12;
      case "Monthly":
        return amount;
      default:
        return amount;
    }
  };

  const monthlyAmount = getMonthlyAmount(regularSavings, savingsFrequency);
  const monthlyInterestRate = interestRate / 100 / 12;

  const calculateRequiredMonthlySavings = (): number => {
    if (saveType !== "specific-amount") return monthlyAmount;

    // Using formula: FV = PV + PMT * [((1 + r)^n - 1) / r] + PV * (1 + r)^n
    // Solving for PMT (monthly payment needed)
    const targetAfterStarting = targetAmount - startingBalance;

    if (targetAfterStarting <= 0) return 0;

    // Simplified calculation: estimate required monthly savings
    let low = 0;
    let high = targetAfterStarting;
    let requiredMonthly = 0;

    // Binary search for the required monthly amount
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

  // Calculate savings projection
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
//   const totalSaved = finalData.total - startingBalance;
  const totalInterest = chartData.reduce((sum, d) => sum + d.interest, 0);

 return (
   <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
       {/* Left Column - Inputs */}
       <div className="space-y-6">
         <h1 className="text-2xl sm:text-3xl font-bold text-slate-50 text-center sm:text-left">
           Savings goals calculator
         </h1>

         {/* Save Type */}
         <div className="space-y-2">
           <label className="text-slate-400 text-sm">I want to save</label>
           <select
             value={saveType}
             onChange={(e) => setSaveType(e.target.value as SaveType)}
             className="w-full px-4 py-3 bg-slate-800 text-slate-50 border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors text-base"
           >
             <option value="as-much-as-possible">as much as possible</option>
             <option value="specific-amount">an amount of</option>
           </select>
         </div>

         {saveType === "specific-amount" && (
           <div className="space-y-2">
             <label className="text-slate-400 text-sm">Target amount:</label>
             <input
               type="number"
               value={targetAmount}
               onChange={(e) =>
                 setTargetAmount(
                   Math.max(0, Number.parseFloat(e.target.value) || 0)
                 )
               }
               className="w-full px-4 py-3 bg-slate-800 text-slate-50 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-base"
               placeholder="$552"
             />
           </div>
         )}

         {/* Time Period */}
         <div className="space-y-2">
           <label className="text-slate-400 text-sm">in</label>
           <div className="flex flex-col sm:flex-row gap-2">
             <input
               type="number"
               value={timeValue}
               onChange={(e) =>
                 setTimeValue(Math.max(1, Number.parseInt(e.target.value) || 0))
               }
               className="w-full sm:flex-1 px-4 py-3 bg-slate-800 text-slate-50 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-base"
             />
             <select
               value={timeUnit}
               onChange={(e) => setTimeUnit(e.target.value as TimeUnit)}
               className="w-full sm:w-auto px-4 py-3 bg-slate-800 text-slate-50 border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors text-base"
             >
               <option value="months">months time</option>
               <option value="years">years time</option>
             </select>
           </div>
         </div>

         {/* Starting Balance & Interest */}
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
           <div className="space-y-2">
             <label className="text-slate-400 text-sm">Starting balance:</label>
             <input
               type="number"
               value={startingBalance}
               onChange={(e) =>
                 setStartingBalance(
                   Math.max(0, Number.parseFloat(e.target.value) || 0)
                 )
               }
               className="w-full px-4 py-3 bg-slate-800 text-slate-50 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-base"
               placeholder="$0"
             />
           </div>
           <div className="space-y-2">
             <label className="text-slate-400 text-sm">
               Interest rate (max: 10%)
             </label>
             <input
               type="number"
               value={interestRate}
               onChange={(e) =>
                 setInterestRate(
                   Math.min(
                     10,
                     Math.max(0, Number.parseFloat(e.target.value) || 0)
                   )
                 )
               }
               className="w-full px-4 py-3 bg-slate-800 text-slate-50 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-base"
               placeholder="1%"
             />
           </div>
         </div>

         {saveType === "as-much-as-possible" && (
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div className="space-y-2">
               <label className="text-slate-400 text-sm">
                 Regular savings (min: $1)
               </label>
               <input
                 type="number"
                 value={regularSavings}
                 onChange={(e) =>
                   setRegularSavings(
                     Math.max(1, Number.parseFloat(e.target.value) || 0)
                   )
                 }
                 className="w-full px-4 py-3 bg-slate-800 text-slate-50 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-base"
                 placeholder="$22"
               />
             </div>
             <div className="space-y-2">
               <label className="text-slate-400 text-sm">
                 Savings frequency:
               </label>
               <select
                 value={savingsFrequency}
                 onChange={(e) =>
                   setSavingsFrequency(
                     e.target.value as "Weekly" | "Fortnightly" | "Monthly"
                   )
                 }
                 className="w-full px-4 py-3 bg-slate-800 text-slate-50 border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors text-base"
               >
                 <option value="Weekly">Weekly</option>
                 <option value="Fortnightly">Fortnightly</option>
                 <option value="Monthly">Monthly</option>
               </select>
             </div>
           </div>
         )}
       </div>

       {/* Right Column - Results & Chart */}
       <div className="space-y-6">
         <Card className="bg-blue-900 border-blue-800 p-5 sm:p-6">
           <div className="space-y-1 sm:space-y-2 text-center sm:text-left">
             {saveType === "as-much-as-possible" ? (
               <>
                 <p className="text-blue-200 text-sm">you can save</p>
                 <p className="text-3xl sm:text-4xl font-bold text-slate-50">
                   ${finalData.total.toFixed(0)}
                 </p>
                 <p className="text-blue-200 text-sm">
                   saving ${effectiveMonthlyAmount.toFixed(0)} monthly for{" "}
                   {totalMonths} months
                 </p>
               </>
             ) : (
               <>
                 <p className="text-blue-200 text-sm">you need to save</p>
                 <p className="text-3xl sm:text-4xl font-bold text-slate-50">
                   ${effectiveMonthlyAmount.toFixed(0)} per month
                 </p>
                 <p className="text-blue-200 text-sm">
                   to reach your goal of ${targetAmount.toFixed(0)} in{" "}
                   {totalMonths} months
                 </p>
               </>
             )}
           </div>
         </Card>

         {/* Chart - scrollable on mobile */}
         <Card className="bg-slate-900 border-slate-800 p-5 sm:p-6 overflow-x-auto">
           <div className="mb-4">
             <h3 className="text-slate-50 font-semibold mb-2">
               After {totalMonths} Months
             </h3>
             <div className="grid grid-cols-2 gap-4 text-sm">
               <div>
                 <p className="text-slate-400">Starting balance</p>
                 <p className="text-slate-50 font-semibold">
                   ${startingBalance.toFixed(0)}
                 </p>
               </div>
               <div>
                 <p className="text-slate-400">Regular savings</p>
                 <p className="text-slate-50 font-semibold">
                   ${(effectiveMonthlyAmount * totalMonths).toFixed(0)}
                 </p>
               </div>
               <div>
                 <p className="text-slate-400">Interest</p>
                 <p className="text-slate-50 font-semibold">
                   ${totalInterest.toFixed(0)}
                 </p>
               </div>
               <div>
                 <p className="text-slate-400">Total</p>
                 <p className="text-slate-50 font-semibold">
                   ${finalData.total.toFixed(0)}
                 </p>
               </div>
             </div>
           </div>

           <div className="min-w-[500px] sm:min-w-0">
             <ResponsiveContainer width="100%" height={250}>
               <BarChart data={chartData}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                 <XAxis dataKey="month" stroke="#94a3b8" />
                 <YAxis stroke="#94a3b8" />
                 <Tooltip
                   contentStyle={{
                     backgroundColor: "#1e293b",
                     border: "1px solid #475569",
                     borderRadius: "8px",
                   }}
                   labelStyle={{ color: "#e2e8f0" }}
                   formatter={(value: number) => `$${value.toFixed(0)}`}
                 />
                 <Legend />
                 <Bar dataKey="total" fill="#3b82f6" name="Total Savings" />
               </BarChart>
             </ResponsiveContainer>
           </div>
         </Card>

         <Card className="bg-slate-900 border-slate-800 p-5 sm:p-6">
           <h3 className="text-slate-50 font-semibold mb-3 sm:mb-4">
             What do I do next?
           </h3>
           <ul className="space-y-2 text-slate-400 text-sm sm:text-base">
             <li className="flex gap-2">
               <span className="text-blue-400">•</span>
               <span>
                 Set up a direct transfer of $
                 {effectiveMonthlyAmount.toFixed(0)}{" "}
                 {saveType === "specific-amount" ? "" : "monthly"} into your
                 savings account
               </span>
             </li>
             <li className="flex gap-2">
               <span className="text-blue-400">•</span>
               <span>
                 Compare savings accounts to find the best possible rate
               </span>
             </li>
             <li className="flex gap-2">
               <span className="text-blue-400">•</span>
               <span>
                 Get tailored guidance from a{" "}
                 <Link
                   href="/advisors"
                   className="text-blue-400 hover:text-blue-300 font-medium underline underline-offset-2"
                 >
                   Celerey advisor
                 </Link>{" "}
                 to reach your goals faster — speak to one today for{" "}
                 <span className="text-slate-200 font-semibold">free</span>.
               </span>
             </li>
           </ul>
         </Card>
       </div>
     </div>
   </div>
 );

}
