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

  return (
    <div className="border border-slate-700 rounded-lg overflow-hidden bg-slate-900">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-800 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-3 h-3 rounded-full ${getColorClass(category.color)}`}
          />
          <span className="text-slate-50 font-medium">{category.name}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className={`font-semibold ${getTextColor(category.type)}`}>
            {category.type === "in" ? "+" : "-"}${total.toFixed(2)}
          </span>
          <ChevronDown
            size={20}
            className={`text-slate-400 transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-slate-700 bg-slate-800/50">
          {category.items.map((item, index) => (
            <div
              key={item.id}
              className={`px-6 py-4 flex items-center gap-4 ${
                index !== category.items.length - 1
                  ? "border-b border-slate-700"
                  : ""
              }`}
            >
              <label className="flex-1 text-slate-300 text-sm">
                {item.label}
              </label>
              <input
                type="number"
                value={item.amount || ""}
                onChange={(e) =>
                  onUpdateItem(
                    category.id,
                    item.id,
                    Number.parseFloat(e.target.value) || 0,
                    item.frequency
                  )
                }
                placeholder="0"
                className="w-32 px-3 py-2 bg-slate-700 text-slate-50 border border-slate-600 rounded-lg text-right placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <select
                value={item.frequency}
                onChange={(e) =>
                  onUpdateItem(
                    category.id,
                    item.id,
                    item.amount,
                    e.target.value as
                      | "Weekly"
                      | "Fortnightly"
                      | "Monthly"
                      | "Annually"
                  )
                }
                className="px-3 py-2 bg-slate-700 text-slate-50 border border-slate-600 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="Weekly">Weekly</option>
                <option value="Fortnightly">Fortnightly</option>
                <option value="Monthly">Monthly</option>
                <option value="Annually">Annually</option>
              </select>
              <button
                onClick={() => onDeleteItem(category.id, item.id)}
                className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-900/30 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          {/* Add New Item */}
          <div className="px-6 py-4 border-t border-slate-700 flex items-center gap-4">
            <input
              type="text"
              value={newItemLabel}
              onChange={(e) => setNewItemLabel(e.target.value)}
              placeholder="Add custom item..."
              className="flex-1 px-3 py-2 bg-slate-700 text-slate-50 border border-slate-600 rounded-lg placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              onKeyPress={(e) => e.key === "Enter" && handleAddItem()}
            />
            <button
              onClick={handleAddItem}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
