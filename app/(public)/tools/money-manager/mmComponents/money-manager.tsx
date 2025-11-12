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

interface MoneyCategoryType {
  id: string;
  name: string;
  color: string;
  type: "in" | "out";
  items: MoneyItem[];
}

const DEFAULT_CATEGORIES: MoneyCategoryType[] = [
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
    useLocalStorage<MoneyCategoryType[]>(
      "money-manager-data",
      DEFAULT_CATEGORIES
    );

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

  const getCategoryTotal = (category: MoneyCategoryType): number =>
    category.items.reduce((sum, item) => {
      const converted = convertToFrequency(
        item.amount,
        item.frequency,
        frequency
      );
      return sum + converted;
    }, 0);

  const getTotalMoneyIn = (): number =>
    categories.find((c) => c.type === "in")
      ? getCategoryTotal(categories.find((c) => c.type === "in")!)
      : 0;

  const getTotalMoneyOut = (): number =>
    categories.find((c) => c.type === "out")
      ? getCategoryTotal(categories.find((c) => c.type === "out")!)
      : 0;

  const totalMoneyIn = getTotalMoneyIn();
  const totalMoneyOut = getTotalMoneyOut();
  const netFlow = totalMoneyIn - totalMoneyOut;

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFrequency(
      e.target.value as "Weekly" | "Fortnightly" | "Monthly" | "Annually"
    );
  };

  const handleClearData = () => {
    if (confirm("Are you sure you want to clear all data?")) {
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
          ? { ...cat, items: cat.items.filter((item) => item.id !== itemId) }
          : cat
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-32 sm:px-6 lg:px-8 bg-white text-slate-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-800">
            Money Manager
          </h1>
          <p className="text-slate-500 mt-2 text-sm">
            Track your cash flow in and out
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          {/* Storage Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-slate-600 text-sm">Save Data</span>
            <button
              onClick={() => toggleStorage(!isStorageEnabled)}
              className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-300 ${
                isStorageEnabled ? "bg-emerald-500" : "bg-slate-300"
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
            className="px-3 py-1.5 text-xs sm:text-sm font-medium border border-slate-300 text-slate-600 rounded-md hover:bg-slate-100 transition-colors"
          >
            Clear Data
          </button>

          {/* Frequency Selector */}
          <div className="flex items-center gap-2">
            <span className="text-slate-600 text-sm">View</span>
            <select
              value={frequency}
              onChange={handleFrequencyChange}
              className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 text-sm rounded-md focus:ring-1 focus:ring-slate-400 hover:bg-slate-50 transition-colors"
            >
              <option value="Weekly">Weekly</option>
              <option value="Fortnightly">Fortnightly</option>
              <option value="Monthly">Monthly</option>
              <option value="Annually">Annually</option>
            </select>
          </div>
        </div>
      </div>

      {/* Storage Status */}
      <div
        className={`mb-6 p-3 rounded-2xl text-sm border transition-all ${
          isStorageEnabled
            ? "bg-emerald-50 border-emerald-200 text-emerald-700"
            : "bg-slate-50 border-slate-200 text-slate-500"
        }`}
      >
        {isStorageEnabled ? (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span>Your data is being saved automatically</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-slate-400 rounded-full" />
            <span>Data saving is off — changes won’t persist</span>
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
