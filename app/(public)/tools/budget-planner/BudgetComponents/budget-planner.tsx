"use client";

import { useState } from "react";
import BudgetCategory from "./budget-category";
import { useLocalStorage } from "./use-local-storage";
import BudgetSummary from "./budget-summary";

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

const CATEGORIES: Category[] = [
  /* same as before */
];

export default function BudgetPlanner() {
  const [categories, setCategories, isStorageEnabled, toggleStorage] =
    useLocalStorage<Category[]>("budget-planner-data", CATEGORIES);

  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    "income"
  );
  const [frequency, setFrequency] = useState<
    "Weekly" | "Fortnightly" | "Monthly" | "Annually"
  >("Annually");

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

  const getCategoryTotal = (category: Category): number =>
    category.items.reduce((sum, item) => {
      const converted = convertToFrequency(
        item.amount,
        item.frequency,
        frequency
      );
      return sum + converted;
    }, 0);

  const getTotalIncome = (): number => {
    const incomeCategory = categories.find((c) => c.id === "income");
    return incomeCategory ? getCategoryTotal(incomeCategory) : 0;
  };

  const getTotalExpenses = (): number =>
    categories
      .filter((c) => c.id !== "income")
      .reduce((sum, cat) => sum + getCategoryTotal(cat), 0);

  const totalIncome = getTotalIncome();
  const totalExpenses = getTotalExpenses();
  const balance = totalIncome - totalExpenses;

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFrequency(
      e.target.value as "Weekly" | "Fortnightly" | "Monthly" | "Annually"
    );
  };

  const handleClearData = () => {
    if (
      confirm(
        "Are you sure you want to clear all budget data? This cannot be undone."
      )
    ) {
      setCategories(CATEGORIES);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 min-h-screen text-gray-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-800">
          Budget Planner
        </h1>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          {/* Storage Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm">Save Data</span>
            <button
              onClick={() => toggleStorage(!isStorageEnabled)}
              className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-300 ${
                isStorageEnabled ? "bg-emerald-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                  isStorageEnabled ? "translate-x-5" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Clear Data */}
          <button
            onClick={handleClearData}
            className="px-3 py-1.5 text-xs sm:text-sm font-medium border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
          >
            Clear Data
          </button>

          {/* Frequency Selector */}
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm">View</span>
            <select
              value={frequency}
              onChange={handleFrequencyChange}
              className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-sm rounded-md focus:ring-1 focus:ring-emerald-400 hover:bg-gray-50 transition-colors"
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
        className={`mb-6 p-3 rounded-2xl text-sm border transition-all shadow-sm ${
          isStorageEnabled
            ? "bg-emerald-50 border-emerald-200 text-emerald-700"
            : "bg-gray-100 border-gray-200 text-gray-500"
        }`}
      >
        {isStorageEnabled ? (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded animate-pulse" />
            <span>Your data is being saved automatically</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full" />
            <span>Data saving is off — changes won’t persist</span>
          </div>
        )}
      </div>

      {/* Categories */}
      <div className="space-y-4 mb-8">
        {categories.map((category) => (
          <BudgetCategory
            key={category.id}
            category={category}
            isExpanded={expandedCategory === category.id}
            onToggle={() =>
              setExpandedCategory(
                expandedCategory === category.id ? null : category.id
              )
            }
            onUpdateItem={updateItem}
            total={getCategoryTotal(category)}
            frequency={frequency}
          />
        ))}
      </div>

      {/* Summary */}
      <BudgetSummary
        categories={categories}
        frequency={frequency}
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        balance={balance}
      />
    </div>
  );
}
