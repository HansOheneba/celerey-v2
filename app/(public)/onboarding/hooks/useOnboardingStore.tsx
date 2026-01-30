// app/onboarding/hooks/useOnboardingStore.ts
"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface OnboardingData {
  // Personal Information (from BeginJourneyModal)
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  timeZone: string;
  agree: boolean;
  
  // Additional Onboarding Data
  location?: string;
  dateOfBirth?: string;
  gender?: string;
  maritalStatus?: string;
  dependents?: number;
  
  // Financial MOT Data
  employmentStatus?: string;
  annualIncome?: string;
  monthlyExpenses?: string;
  financialGoals?: string[];
  riskTolerance?: 'low' | 'medium' | 'high';
  
  // Progress tracking
  currentStep: number;
  completedSteps: number[];
}

interface OnboardingStore {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  setStep: (step: number) => void;
  completeStep: (step: number) => void;
  reset: () => void;
}

const initialData: OnboardingData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  timeZone: '',
  agree: false,
  currentStep: 1,
  completedSteps: [],
};

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      data: initialData,
      updateData: (updates) =>
        set((state) => ({
          data: { ...state.data, ...updates },
        })),
      setStep: (step) =>
        set((state) => ({
          data: { ...state.data, currentStep: step },
        })),
      completeStep: (step) =>
        set((state) => ({
          data: {
            ...state.data,
            completedSteps: [...state.data.completedSteps, step],
          },
        })),
      reset: () => set({ data: initialData }),
    }),
    {
      name: 'onboarding-storage',
    }
  )
);