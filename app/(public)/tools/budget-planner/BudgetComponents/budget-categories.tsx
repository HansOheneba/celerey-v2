"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Plus } from "lucide-react"

interface Category {
  id: number
  name: string
  percentage: number
  color: string
}

interface BudgetCategoriesProps {
  categories: Category[]
  income: number
  onUpdateCategory: (id: number, updates: Partial<Category>) => void
  onDeleteCategory: (id: number) => void
  onAddCategory: () => void
}

export default function BudgetCategories({
  categories,
  income,
  onUpdateCategory,
  onDeleteCategory,
  onAddCategory,
}: BudgetCategoriesProps) {
  const totalPercentage = categories.reduce((sum, cat) => sum + cat.percentage, 0)

  return (
    <Card className="p-6 bg-white border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900">Budget Categories</h2>
        <Button onClick={onAddCategory} size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      <div className="space-y-4">
        {categories.map((category) => {
          const amount = (income * category.percentage) / 100
          return (
            <div key={category.id} className="flex items-end gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-slate-600 mb-2">Category Name</label>
                <Input
                  value={category.name}
                  onChange={(e) => onUpdateCategory(category.id, { name: e.target.value })}
                  className="border-slate-300 focus:border-blue-500"
                />
              </div>

              <div className="w-24">
                <label className="block text-xs font-semibold text-slate-600 mb-2">Percentage</label>
                <div className="flex items-center gap-1">
                  <Input
                    type="number"
                    value={category.percentage}
                    onChange={(e) => onUpdateCategory(category.id, { percentage: Number(e.target.value) || 0 })}
                    className="border-slate-300 focus:border-blue-500"
                    min="0"
                    max="100"
                  />
                  <span className="text-slate-600 font-semibold">%</span>
                </div>
              </div>

              <div className="w-32">
                <label className="block text-xs font-semibold text-slate-600 mb-2">Amount</label>
                <div className="text-lg font-bold text-slate-900">
                  ₹{amount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                </div>
              </div>

              <div className="w-12">
                <label className="block text-xs font-semibold text-slate-600 mb-2">Color</label>
                <input
                  type="color"
                  value={category.color}
                  onChange={(e) => onUpdateCategory(category.id, { color: e.target.value })}
                  className="w-full h-10 rounded cursor-pointer border border-slate-300"
                />
              </div>

              <Button
                onClick={() => onDeleteCategory(category.id)}
                size="sm"
                variant="ghost"
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )
        })}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-slate-900">Total Budget Allocation:</span>
          <span
            className={`text-lg font-bold ${totalPercentage === 100 ? "text-green-600" : totalPercentage > 100 ? "text-red-600" : "text-amber-600"}`}
          >
            {totalPercentage}%
          </span>
        </div>
        {totalPercentage !== 100 && (
          <p className="text-xs text-slate-600 mt-2">
            {totalPercentage > 100
              ? `Over budget by ${totalPercentage - 100}%`
              : `Unallocated: ${100 - totalPercentage}%`}
          </p>
        )}
      </div>
    </Card>
  )
}
