// app/onboarding/components/FinancialMOTPage1.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useOnboardingStore } from '../hooks/useOnboardingStore';

const EMPLOYMENT_OPTIONS = [
  { value: 'employed', label: 'Employed Full-time' },
  { value: 'self-employed', label: 'Self-Employed' },
  { value: 'freelance', label: 'Freelance/Contractor' },
  { value: 'student', label: 'Student' },
  { value: 'retired', label: 'Retired' },
  { value: 'unemployed', label: 'Currently Unemployed' },
];

export function FinancialMOTPage1() {
  const router = useRouter();
  const { data, updateData, completeStep, setStep } = useOnboardingStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate if needed
    if (!data.employmentStatus) {
      // Show error
      return;
    }

    completeStep(2);
    setStep(3);
    router.push('/onboarding?step=3');
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-neutral-900 sm:text-4xl">
          Financial MOT - Part 1
        </h1>
        <p className="mt-2 text-sm text-neutral-600 sm:text-base">
          Let's understand your current financial situation
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Employment Status */}
        <div className="space-y-2">
          <Label className="text-neutral-700">Employment Status</Label>
          <Select
            value={data.employmentStatus || ''}
            onValueChange={(v) => updateData({ employmentStatus: v })}
          >
            <SelectTrigger className="h-12 rounded-xl border-black/10 bg-white">
              <SelectValue placeholder="Select your employment status" />
            </SelectTrigger>
            <SelectContent>
              {EMPLOYMENT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Annual Income */}
        <div className="space-y-2">
          <Label htmlFor="annualIncome" className="text-neutral-700">
            Annual Income (before tax)
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
              $
            </span>
            <Input
              id="annualIncome"
              type="number"
              value={data.annualIncome || ''}
              onChange={(e) => updateData({ annualIncome: e.target.value })}
              className="h-12 rounded-xl border-black/10 bg-white pl-8"
              placeholder="0"
            />
          </div>
        </div>

        {/* Monthly Expenses */}
        <div className="space-y-2">
          <Label htmlFor="monthlyExpenses" className="text-neutral-700">
            Estimated Monthly Expenses
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
              $
            </span>
            <Input
              id="monthlyExpenses"
              type="number"
              value={data.monthlyExpenses || ''}
              onChange={(e) => updateData({ monthlyExpenses: e.target.value })}
              className="h-12 rounded-xl border-black/10 bg-white pl-8"
              placeholder="0"
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setStep(1);
              router.push('/onboarding?step=1');
            }}
            className="h-12 flex-1 rounded-full border-black/10"
          >
            Back
          </Button>
          <Button
            type="submit"
            className="h-12 flex-1 rounded-full bg-neutral-900 text-white hover:bg-neutral-800"
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
}