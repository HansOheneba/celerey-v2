"use client";

import { ChevronDown } from "lucide-react";

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

interface BudgetCategoryProps {
  category: Category;
  isExpanded: boolean;
  onToggle: () => void;
  onUpdateItem: (
    categoryId: string,
    itemId: string,
    amount: number,
    frequency: "Weekly" | "Fortnightly" | "Monthly" | "Annually"
  ) => void;
  total: number;
  frequency: "Weekly" | "Fortnightly" | "Monthly" | "Annually";
}

export default function BudgetCategory({
  category,
  isExpanded,
  onToggle,
  onUpdateItem,
  total,
}: BudgetCategoryProps) {
  const getColorDot = (color: string): string => {
    const colorMap: Record<string, string> = {
      "bg-slate-700": "bg-slate-700",
      "bg-blue-600": "bg-blue-600",
      "bg-slate-600": "bg-slate-600",
      "bg-emerald-600": "bg-emerald-600",
      "bg-purple-500": "bg-purple-500",
      "bg-cyan-500": "bg-cyan-500",
      "bg-sky-500": "bg-sky-500",
      "bg-pink-500": "bg-pink-500",
    };
    return colorMap[color] || "bg-slate-600";
  };

  const handleAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    itemId: string,
    currentFrequency: "Weekly" | "Fortnightly" | "Monthly" | "Annually"
  ) => {
    const amount = Number.parseFloat(e.target.value) || 0;
    onUpdateItem(category.id, itemId, amount, currentFrequency);
  };

  const handleFrequencyChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    itemId: string,
    currentAmount: number
  ) => {
    const newFrequency = e.target.value as
      | "Weekly"
      | "Fortnightly"
      | "Monthly"
      | "Annually";
    onUpdateItem(category.id, itemId, currentAmount, newFrequency);
  };

  return (
    <div className="border border-slate-800 rounded-2xl overflow-hidden bg-[#0b0b0b]/90 backdrop-blur-sm shadow-sm">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-800/60 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-2.5 h-2.5 rounded-full ${getColorDot(
              category.color
            )}`}
          />
          <span className="text-slate-100 font-medium tracking-tight">
            {category.name}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-200 font-semibold">
            ${total.toFixed(2)}
          </span>
          <ChevronDown
            size={18}
            className={`text-slate-500 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-slate-800 bg-[#111]/90">
          {category.items.map((item, index) => (
            <div
              key={item.id}
              className={`px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 ${
                index !== category.items.length - 1
                  ? "border-b border-slate-800"
                  : ""
              }`}
            >
              <label className="text-slate-300 text-sm font-medium">
                {item.label}
              </label>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <input
                  type="text"
                  value={item.amount || ""}
                  onChange={(e) =>
                    handleAmountChange(e, item.id, item.frequency)
                  }
                  placeholder="0"
                  className="w-full sm:w-28 px-3 py-2 bg-slate-900/70 text-slate-50 border border-slate-700 rounded-lg text-right placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
                />
                <select
                  value={item.frequency}
                  onChange={(e) =>
                    handleFrequencyChange(e, item.id, item.amount)
                  }
                  className="w-full sm:w-auto px-3 py-2 bg-slate-900/70 text-slate-100 border border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-slate-500"
                >
                  <option value="Weekly">Weekly</option>
                  <option value="Fortnightly">Fortnightly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Annually">Annually</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
