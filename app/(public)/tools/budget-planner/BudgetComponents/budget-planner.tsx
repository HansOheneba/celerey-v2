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
  {
    id: "income",
    name: "Income",
    color: "bg-slate-700",
    items: [
      {
        id: "take-home",
        label: "Your take-home pay",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "partner-pay",
        label: "Your partner's take-home pay",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "bonuses",
        label: "Bonuses & overtime",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "savings-income",
        label: "Income from savings & investments",
        amount: 0,
        frequency: "Weekly",
      },
      // { id: "centrelink", label: "Centrelink benefits", amount: 0, frequency: "Weekly" },
      {
        id: "family-benefits",
        label: "Family benefit payments",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "child-support",
        label: "Child support received",
        amount: 0,
        frequency: "Weekly",
      },
      { id: "other-income", label: "Other", amount: 0, frequency: "Weekly" },
    ],
  },
  {
    id: "home-utilities",
    name: "Home & utilities",
    color: "bg-blue-600",
    items: [
      {
        id: "mortgage",
        label: "Mortgage & rent",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "estate-maintenance",
        label: "Estate maintenance fees",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "property-rates",
        label: "Property rates",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "furniture",
        label: "Furniture & appliances",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "renovations",
        label: "Renovations & maintenance",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "electricity",
        label: "Electricity",
        amount: 0,
        frequency: "Weekly",
      },
      { id: "gas", label: "Gas", amount: 0, frequency: "Weekly" },
      { id: "water", label: "Water", amount: 0, frequency: "Weekly" },
      { id: "internet", label: "Internet", amount: 0, frequency: "Weekly" },
      { id: "pay-tv", label: "Pay TV", amount: 0, frequency: "Weekly" },
    ],
  },
  {
    id: "insurance",
    name: "Insurance & financial",
    color: "bg-slate-600",
    items: [
      {
        id: "home-insurance",
        label: "Home & contents insurance",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "car-insurance",
        label: "Car insurance",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "life-insurance",
        label: "Life insurance",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "health-insurance",
        label: "Health insurance",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "loan-repayments",
        label: "Loan repayments",
        amount: 0,
        frequency: "Weekly",
      },
    ],
  },
  {
    id: "groceries",
    name: "Groceries",
    color: "bg-emerald-600",
    items: [
      {
        id: "groceries-main",
        label: "Groceries",
        amount: 0,
        frequency: "Weekly",
      },
    ],
  },
  {
    id: "personal",
    name: "Personal & medical",
    color: "bg-purple-500",
    items: [
      {
        id: "doctor",
        label: "Doctor & medical expenses",
        amount: 0,
        frequency: "Weekly",
      },
      { id: "dentist", label: "Dentist", amount: 0, frequency: "Weekly" },
      { id: "pharmacy", label: "Pharmacy", amount: 0, frequency: "Weekly" },
      {
        id: "haircut",
        label: "Haircut & personal care",
        amount: 0,
        frequency: "Weekly",
      },
      { id: "clothing", label: "Clothing", amount: 0, frequency: "Weekly" },
    ],
  },
  {
    id: "entertainment",
    name: "Entertainment & eat-out",
    color: "bg-cyan-500",
    items: [
      {
        id: "restaurants",
        label: "Restaurants & takeaway",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "movies",
        label: "Movies & entertainment",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "hobbies",
        label: "Hobbies & sports",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "subscriptions",
        label: "Subscriptions & memberships",
        amount: 0,
        frequency: "Weekly",
      },
    ],
  },
  {
    id: "transport",
    name: "Transport & auto",
    color: "bg-sky-500",
    items: [
      {
        id: "car-payment",
        label: "Car payment",
        amount: 0,
        frequency: "Weekly",
      },
      { id: "fuel", label: "Fuel", amount: 0, frequency: "Weekly" },
      {
        id: "maintenance",
        label: "Car maintenance & repairs",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "registration",
        label: "Registration & roadside assist",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "public-transport",
        label: "Public transport",
        amount: 0,
        frequency: "Weekly",
      },
    ],
  },
  {
    id: "children",
    name: "Children",
    color: "bg-pink-500",
    items: [
      { id: "childcare", label: "Childcare", amount: 0, frequency: "Weekly" },
      {
        id: "education",
        label: "Education & school fees",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "child-activities",
        label: "Activities & sports",
        amount: 0,
        frequency: "Weekly",
      },
      { id: "child-other", label: "Other", amount: 0, frequency: "Weekly" },
    ],
  },
];

export default function BudgetPlanner() {
  // Use localStorage hook
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

  const getCategoryTotal = (category: Category): number => {
    return category.items.reduce((sum, item) => {
      const converted = convertToFrequency(
        item.amount,
        item.frequency,
        frequency
      );
      return sum + converted;
    }, 0);
  };

  const getTotalIncome = (): number => {
    const incomeCategory = categories.find((c) => c.id === "income");
    return incomeCategory ? getCategoryTotal(incomeCategory) : 0;
  };

  const getTotalExpenses = (): number => {
    return categories
      .filter((c) => c.id !== "income")
      .reduce((sum, cat) => sum + getCategoryTotal(cat), 0);
  };

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
  <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
      <h1 className="text-2xl sm:text-3xl font-semibold text-slate-100 tracking-tight">
        Budget Planner
      </h1>

      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        {/* Storage Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-sm">Save Data</span>
          <button
            onClick={() => toggleStorage(!isStorageEnabled)}
            className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-300 ${
              isStorageEnabled ? "bg-slate-500" : "bg-slate-700"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isStorageEnabled ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Clear Data */}
        <button
          onClick={handleClearData}
          className="px-3 py-1.5 text-xs sm:text-sm font-medium border border-slate-600 text-slate-300 rounded-md hover:bg-slate-800/60 transition-colors"
        >
          Clear Data
        </button>

        {/* Frequency Selector */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-sm">View</span>
          <select
            value={frequency}
            onChange={handleFrequencyChange}
            className="px-3 py-1.5 bg-slate-900 border border-slate-700 text-slate-100 text-sm rounded-md focus:ring-1 focus:ring-slate-600 hover:bg-slate-800 transition-colors"
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
      className={`mb-6 p-3 rounded-2xl text-sm border transition-all ${
        isStorageEnabled
          ? "bg-slate-800 border-slate-700 text-emerald-500"
          : "bg-slate-900 border-slate-800 text-slate-500"
      }`}
    >
      {isStorageEnabled ? (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-400 rounded animate-pulse" />
          <span>Your data is being saved automatically</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-slate-500 rounded-full" />
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