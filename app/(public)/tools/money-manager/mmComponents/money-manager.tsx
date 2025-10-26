"use client";

import { useState } from "react";
import MoneyManagerSummary from "./money-manager-summary";
import { useLocalStorage } from "./use-local-storage";
import MoneyCategory from "./money-category";

interface MoneyItem {
  id: string;
  label: string;
  amount: number;
  frequency: "Weekly" | "Fortnightly" | "Monthly" | "Annually";
  date?: string;
  category?: string;
}

interface MoneyCategory {
  id: string;
  name: string;
  color: string;
  type: "in" | "out";
  items: MoneyItem[];
}

const DEFAULT_CATEGORIES: MoneyCategory[] = [
  {
    id: "money-in",
    name: "Money In",
    color: "bg-emerald-500",
    type: "in",
    items: [
      { id: "salary", label: "Salary", amount: 0, frequency: "Monthly" },
      {
        id: "freelance",
        label: "Freelance Work",
        amount: 0,
        frequency: "Monthly",
      },
      {
        id: "investments",
        label: "Investments",
        amount: 0,
        frequency: "Monthly",
      },
      {
        id: "side-hustle",
        label: "Side Hustle",
        amount: 0,
        frequency: "Monthly",
      },
      {
        id: "other-income",
        label: "Other Income",
        amount: 0,
        frequency: "Monthly",
      },
    ],
  },
  {
    id: "money-out",
    name: "Money Out",
    color: "bg-rose-500",
    type: "out",
    items: [
      { id: "rent", label: "Rent/Mortgage", amount: 0, frequency: "Monthly" },
      { id: "utilities", label: "Utilities", amount: 0, frequency: "Monthly" },
      { id: "groceries", label: "Groceries", amount: 0, frequency: "Weekly" },
      { id: "transport", label: "Transport", amount: 0, frequency: "Weekly" },
      {
        id: "entertainment",
        label: "Entertainment",
        amount: 0,
        frequency: "Weekly",
      },
      { id: "shopping", label: "Shopping", amount: 0, frequency: "Monthly" },
      {
        id: "healthcare",
        label: "Healthcare",
        amount: 0,
        frequency: "Monthly",
      },
      {
        id: "other-expenses",
        label: "Other Expenses",
        amount: 0,
        frequency: "Monthly",
      },
    ],
  },
];

export default function MoneyManager() {
  const [categories, setCategories, isStorageEnabled, toggleStorage] =
    useLocalStorage<MoneyCategory[]>("money-manager-data", DEFAULT_CATEGORIES);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    "money-in"
  );
  const [frequency, setFrequency] = useState<
    "Weekly" | "Fortnightly" | "Monthly" | "Annually"
  >("Monthly");

  const updateItem = (
    categoryId: string,
    itemId: string,
    amount: number,
    itemFrequency: "Weekly" | "Fortnightly" | "Monthly" | "Annually"
  ) => {
    setCategories(
      categories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              items: cat.items.map((item) =>
                item.id === itemId
                  ? { ...item, amount, frequency: itemFrequency }
                  : item
              ),
            }
          : cat
      )
    );
  };

  const convertToFrequency = (
    amount: number,
    fromFreq: "Weekly" | "Fortnightly" | "Monthly" | "Annually",
    toFreq: "Weekly" | "Fortnightly" | "Monthly" | "Annually"
  ): number => {
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
  };

  const getCategoryTotal = (category: MoneyCategory): number => {
    return category.items.reduce((sum, item) => {
      const converted = convertToFrequency(
        item.amount,
        item.frequency,
        frequency
      );
      return sum + converted;
    }, 0);
  };

  const getTotalMoneyIn = (): number => {
    const moneyInCategory = categories.find((c) => c.type === "in");
    return moneyInCategory ? getCategoryTotal(moneyInCategory) : 0;
  };

  const getTotalMoneyOut = (): number => {
    const moneyOutCategory = categories.find((c) => c.type === "out");
    return moneyOutCategory ? getCategoryTotal(moneyOutCategory) : 0;
  };

  const totalMoneyIn = getTotalMoneyIn();
  const totalMoneyOut = getTotalMoneyOut();
  const netFlow = totalMoneyIn - totalMoneyOut;

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFrequency(
      e.target.value as "Weekly" | "Fortnightly" | "Monthly" | "Annually"
    );
  };

  const handleClearData = () => {
    if (
      confirm(
        "Are you sure you want to clear all money manager data? This cannot be undone."
      )
    ) {
      setCategories(DEFAULT_CATEGORIES);
    }
  };

  const addCustomItem = (categoryId: string, label: string) => {
    setCategories(
      categories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              items: [
                ...cat.items,
                {
                  id: `custom-${Date.now()}`,
                  label,
                  amount: 0,
                  frequency: "Monthly",
                },
              ],
            }
          : cat
      )
    );
  };

  const deleteItem = (categoryId: string, itemId: string) => {
    setCategories(
      categories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              items: cat.items.filter((item) => item.id !== itemId),
            }
          : cat
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-50">Money Manager</h1>
          <p className="text-slate-400 mt-2">Track your cash flow in and out</p>
        </div>
        <div className="flex items-center gap-4">
          {/* Storage Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-sm">Save Data</span>
            <button
              onClick={() => toggleStorage(!isStorageEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isStorageEnabled ? "bg-emerald-500" : "bg-slate-700"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isStorageEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Clear Data Button */}
          <button
            onClick={handleClearData}
            className="px-3 py-1 text-sm bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
          >
            Clear Data
          </button>

          {/* Frequency Selector */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400">View</span>
            <select
              value={frequency}
              onChange={handleFrequencyChange}
              className="px-4 py-2 bg-slate-800 text-slate-50 border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <option value="Weekly">Weekly</option>
              <option value="Fortnightly">Fortnightly</option>
              <option value="Monthly">Monthly</option>
              <option value="Annually">Annually</option>
            </select>
          </div>
        </div>
      </div>

      {/* Storage Status Indicator */}
      <div
        className={`mb-6 p-3 rounded-lg text-sm ${
          isStorageEnabled
            ? "bg-emerald-900/30 text-emerald-400"
            : "bg-slate-800 text-slate-400"
        }`}
      >
        {isStorageEnabled ? (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span>Your money data is being saved automatically</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
            <span>
              Data saving is disabled - changes will be lost when you close the
              page
            </span>
          </div>
        )}
      </div>

      {/* Categories */}
      <div className="space-y-4 mb-8">
        {categories.map((category) => (
          <MoneyCategory
            key={category.id}
            category={category}
            isExpanded={expandedCategory === category.id}
            onToggle={() =>
              setExpandedCategory(
                expandedCategory === category.id ? null : category.id
              )
            }
            onUpdateItem={updateItem}
            onAddItem={addCustomItem}
            onDeleteItem={deleteItem}
            total={getCategoryTotal(category)}
            frequency={frequency}
          />
        ))}
      </div>

      {/* Summary */}
      <MoneyManagerSummary
        categories={categories}
        frequency={frequency}
        totalMoneyIn={totalMoneyIn}
        totalMoneyOut={totalMoneyOut}
        netFlow={netFlow}
      />
    </div>
  );
}
