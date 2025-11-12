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
    return colorMap[color] || "bg-gray-400";
  };

  const getTextColor = (type: "in" | "out"): string => {
    return type === "in" ? "text-emerald-600" : "text-rose-600";
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
    <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-2.5 h-2.5 rounded-full ${getColorClass(
              category.color
            )}`}
          />
          <span className="text-gray-800 font-medium tracking-tight">
            {category.name}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className={`font-semibold ${getTextColor(category.type)}`}>
            {category.type === "in" ? "+" : "-"}${total.toFixed(2)}
          </span>
          <ChevronDown
            size={18}
            className={`text-gray-400 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-200 bg-gray-50">
          {category.items.map((item, index) => (
            <div
              key={item.id}
              className={`px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 ${
                index !== category.items.length - 1
                  ? "border-b border-gray-200"
                  : ""
              }`}
            >
              <label className="text-gray-700 text-sm font-medium">
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
                  className="w-full sm:w-28 px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg text-right placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                <select
                  value={item.frequency}
                  onChange={(e) =>
                    handleFrequencyChange(e, item.id, item.amount)
                  }
                  className="w-full sm:w-auto px-3 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                >
                  <option value="Weekly">Weekly</option>
                  <option value="Fortnightly">Fortnightly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Annually">Annually</option>
                </select>
                <button
                  onClick={() => onDeleteItem(category.id, item.id)}
                  className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-100 rounded-lg transition-colors self-end sm:self-auto"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Add New Item */}
          <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-white">
            <input
              type="text"
              value={newItemLabel}
              onChange={(e) => setNewItemLabel(e.target.value)}
              placeholder="Add custom item..."
              className="flex-1 w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
              onKeyPress={(e) => e.key === "Enter" && handleAddItem()}
            />
            <button
              onClick={handleAddItem}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
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
