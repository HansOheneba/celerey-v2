// Update app/onboarding/components/page2.tsx (FinancialMOTPage2)
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useOnboardingStore } from '../hooks/useOnboardingStore';

const FINANCIAL_GOALS = [
  { id: 'retirement', label: 'Retirement Planning' },
  { id: 'home', label: 'Buying a Home' },
  { id: 'education', label: 'Education Funding' },
  { id: 'debt', label: 'Debt Reduction' },
  { id: 'investment', label: 'Wealth Building' },
  { id: 'emergency', label: 'Emergency Fund' },
  { id: 'travel', label: 'Travel/Vacation' },
  { id: 'other', label: 'Other' },
];

const RISK_TOLERANCE = [
  { value: 'low', label: 'Low Risk', description: 'Prefer stable, predictable returns' },
  { value: 'medium', label: 'Medium Risk', description: 'Balance of growth and stability' },
  { value: 'high', label: 'High Risk', description: 'Seek maximum growth potential' },
];

export function FinancialMOTPage2() {
  const router = useRouter();
  const { data, updateData, completeStep, setStep } = useOnboardingStore();
  const [selectedGoals, setSelectedGoals] = useState<string[]>(data.financialGoals || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGoalToggle = (goalId: string) => {
    const newGoals = selectedGoals.includes(goalId)
      ? selectedGoals.filter(id => id !== goalId)
      : [...selectedGoals, goalId];
    
    setSelectedGoals(newGoals);
    updateData({ financialGoals: newGoals });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!data.riskTolerance) {
      alert('Please select your risk tolerance');
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Optional: Save all data to your backend
      // const response = await fetch('/api/onboarding/complete', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      
      // if (response.ok) {
        completeStep(3);
        // Redirect to booking page
        router.push('/book-session');
      // } else {
      //   throw new Error('Failed to save data');
      // }
      
    } catch (error) {
      console.error('Error:', error);
      alert('There was an issue. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-neutral-900 sm:text-4xl">
          Financial MOT - Part 2
        </h1>
        <p className="mt-2 text-sm text-neutral-600 sm:text-base">
          Tell us about your goals and risk tolerance
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Financial Goals */}
        <div className="space-y-4">
          <Label className="text-lg font-medium text-neutral-900">
            What are your financial goals? (Select all that apply)
          </Label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {FINANCIAL_GOALS.map((goal) => (
              <div
                key={goal.id}
                className="flex items-center space-x-3 rounded-lg border border-black/10 p-3"
              >
                <Checkbox
                  id={`goal-${goal.id}`}
                  checked={selectedGoals.includes(goal.id)}
                  onCheckedChange={() => handleGoalToggle(goal.id)}
                />
                <Label
                  htmlFor={`goal-${goal.id}`}
                  className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {goal.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Tolerance */}
        <div className="space-y-4">
          <Label className="text-lg font-medium text-neutral-900">
            How would you describe your risk tolerance?
          </Label>
          <div className="space-y-3">
            {RISK_TOLERANCE.map((risk) => (
              <div
                key={risk.value}
                className={`rounded-xl border-2 p-4 cursor-pointer transition-all ${
                  data.riskTolerance === risk.value
                    ? 'border-neutral-900 bg-neutral-50'
                    : 'border-black/10 hover:border-neutral-400'
                }`}
                onClick={() => updateData({ riskTolerance: risk.value as any })}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-neutral-900">{risk.label}</h3>
                    <p className="text-sm text-neutral-600">{risk.description}</p>
                  </div>
                  <div className={`h-4 w-4 rounded-full border-2 ${
                    data.riskTolerance === risk.value
                      ? 'border-neutral-900 bg-neutral-900'
                      : 'border-black/30'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setStep(2);
              router.push('/onboarding?step=2');
            }}
            className="h-12 flex-1 rounded-full border-black/10"
          >
            Back
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 flex-1 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-60"
          >
            {isSubmitting ? 'Saving...' : 'Complete & Book Session'}
          </Button>
        </div>
      </form>
    </div>
  );
}