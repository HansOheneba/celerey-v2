"use client";

import { useState } from "react";
import BudgetCategory from "./budget-category";
import { useLocalStorage } from "./use-local-storage";
import BudgetSummary from "./budget-summary";

interface BudgetItem {
  id: string;
  label: string;
  amount: number;
  frequency: "Weekly" | "Quarterly" | "Monthly" | "Annually";
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
    color: "bg-emerald-600",
    items: [
      {
        id: "your-take-home-pay",
        label: "Your take-home pay",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "partner-take-home-pay",
        label: "Your partner's take-home pay",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "bonuses-overtime",
        label: "Bonuses & overtime",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "savings-investments-income",
        label: "Income from savings & investments",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "family-benefits",
        label: "Family benefit payments",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "child-support-received",
        label: "Child support received",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "other-income",
        label: "Other",
        amount: 0,
        frequency: "Weekly",
      },
    ],
  },
  {
    id: "home-utilities",
    name: "Home & utilities",
    color: "bg-blue-600",
    items: [
      {
        id: "mortgage-rent",
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
        id: "furniture-appliances",
        label: "Furniture & appliances",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "renovations-maintenance",
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
      {
        id: "gas",
        label: "Gas",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "water",
        label: "Water",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "internet",
        label: "Internet",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "pay-tv",
        label: "Pay TV",
        amount: 0,
        frequency: "Weekly",
      },
    ],
  },
  {
    id: "insurance-financial",
    name: "Insurance & financial",
    color: "bg-purple-500",
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
    color: "bg-cyan-500",
    items: [
      {
        id: "groceries",
        label: "Groceries",
        amount: 0,
        frequency: "Weekly",
      },
    ],
  },
  {
    id: "personal-medical",
    name: "Personal & medical",
    color: "bg-pink-500",
    items: [
      {
        id: "doctor-medical",
        label: "Doctor & medical expenses",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "dentist",
        label: "Dentist",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "pharmacy",
        label: "Pharmacy",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "haircut-personal-care",
        label: "Haircut & personal care",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "clothing",
        label: "Clothing",
        amount: 0,
        frequency: "Weekly",
      },
    ],
  },
  {
    id: "entertainment-eat-out",
    name: "Entertainment & eat-out",
    color: "bg-sky-500",
    items: [
      {
        id: "restaurants-takeaway",
        label: "Restaurants & takeaway",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "movies-entertainment",
        label: "Movies & entertainment",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "hobbies-sports",
        label: "Hobbies & sports",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "subscriptions-memberships",
        label: "Subscriptions & memberships",
        amount: 0,
        frequency: "Weekly",
      },
    ],
  },
  {
    id: "transport-auto",
    name: "Transport & auto",
    color: "bg-orange-500",
    items: [
      {
        id: "car-payment",
        label: "Car payment",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "fuel",
        label: "Fuel",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "car-maintenance",
        label: "Car maintenance & repairs",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "registration-roadside",
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
    color: "bg-yellow-500",
    items: [
      {
        id: "childcare",
        label: "Childcare",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "education-school-fees",
        label: "Education & school fees",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "activities-sports",
        label: "Activities & sports",
        amount: 0,
        frequency: "Weekly",
      },
      {
        id: "other-children",
        label: "Other",
        amount: 0,
        frequency: "Weekly",
      },
    ],
  },
];

export default function BudgetPlanner() {
  const [categories, setCategories, isStorageEnabled, toggleStorage] =
    useLocalStorage<Category[]>("budget-planner-data", CATEGORIES);

  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    "income"
  );
  const [frequency, setFrequency] = useState<
    "Weekly" | "Quarterly" | "Monthly" | "Annually"
  >("Annually");

  const updateItem = (
    categoryId: string,
    itemId: string,
    amount: number,
    itemFrequency: "Weekly" | "Quarterly" | "Monthly" | "Annually"
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
    fromFreq: "Weekly" | "Quarterly" | "Monthly" | "Annually",
    toFreq: "Weekly" | "Quarterly" | "Monthly" | "Annually"
  ): number => {
    let annualAmount = amount;

    switch (fromFreq) {
      case "Weekly":
        annualAmount = amount * 52;
        break;
      case "Quarterly":
        annualAmount = amount * 4;
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
      case "Quarterly":
        return annualAmount / 4;
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
      e.target.value as "Weekly" | "Quarterly" | "Monthly" | "Annually"
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
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
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
            <span>Data saving is off — changes won&apos;t persist</span>
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
