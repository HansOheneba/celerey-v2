"use client"

import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface IncomeInputProps {
  income: number
  setIncome: (value: number) => void
}

export default function IncomeInput({ income, setIncome }: IncomeInputProps) {
  return (
    <Card className="p-6 bg-white border-slate-200">
      <label className="block text-sm font-semibold text-slate-900 mb-2">Monthly Income</label>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-slate-900">USD</span>
        <Input
          type="number"
          value={income || ""}
          onChange={(e) => setIncome(Number(e.target.value) || 0)}
          placeholder="Enter your monthly income"
          className="text-2xl font-bold border-slate-300 focus:border-blue-500"
        />
      </div>
      <p className="text-xs text-slate-500 mt-2">Set your total monthly income to calculate budget allocations</p>
    </Card>
  )
}
