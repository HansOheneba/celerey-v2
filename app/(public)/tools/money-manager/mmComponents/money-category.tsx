"use client";

import { ChevronDown, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

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

interface MoneyCategoryProps {
  category: MoneyCategory;
  isExpanded: boolean;
  onToggle: () => void;
  onUpdateItem: (
    categoryId: string,
    itemId: string,
    amount: number,
    frequency: "Weekly" | "Fortnightly" | "Monthly" | "Annually"
  ) => void;
  onAddItem: (categoryId: string, label: string) => void;
  onDeleteItem: (categoryId: string, itemId: string) => void;
  total: number;
  frequency: "Weekly" | "Fortnightly" | "Monthly" | "Annually";
}

export default function MoneyCategory({
  category,
  isExpanded,
  onToggle,
  onUpdateItem,
  onAddItem,
  onDeleteItem,
  total,
}: MoneyCategoryProps) {
  const [newItemLabel, setNewItemLabel] = useState("");

  const handleAddItem = () => {
    if (newItemLabel.trim()) {
      onAddItem(category.id, newItemLabel.trim());
      setNewItemLabel("");
    }
  };

  const getColorClass = (color: string): string => {
    const colorMap: Record<string, string> = {
      "bg-emerald-500": "bg-emerald-500",
      "bg-rose-500": "bg-rose-500",
    };
    return colorMap[color] || "bg-slate-600";
  };

  const getTextColor = (type: "in" | "out"): string => {
    return type === "in" ? "text-emerald-300" : "text-rose-300";
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
            className={`w-2.5 h-2.5 rounded-full ${getColorClass(
              category.color
            )}`}
          />
          <span className="text-slate-100 font-medium tracking-tight">
            {category.name}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className={`font-semibold ${getTextColor(category.type)}`}>
            {category.type === "in" ? "+" : "-"}${total.toFixed(2)}
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
                <button
                  onClick={() => onDeleteItem(category.id, item.id)}
                  className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-900/30 rounded-lg transition-colors self-end sm:self-auto"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Add New Item */}
          <div className="px-6 py-4 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <input
              type="text"
              value={newItemLabel}
              onChange={(e) => setNewItemLabel(e.target.value)}
              placeholder="Add custom item..."
              className="flex-1 w-full px-3 py-2 bg-slate-900/70 text-slate-50 border border-slate-700 rounded-lg placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
              onKeyPress={(e) => e.key === "Enter" && handleAddItem()}
            />
            <button
              onClick={handleAddItem}
              className="px-4 py-2 bg-slate-800 text-slate-200 border border-slate-700 rounded-lg hover:bg-slate-700/60 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <Plus className="w-4 h-4" />
              Add Item
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
