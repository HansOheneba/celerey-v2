// app/onboarding/page.tsx
"use client";

import React, { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { PersonalInfoPage } from './components/bioData';
import { FinancialMOTPage } from './components/page1';
import { FinancialMOTPage2 } from './components/page2';
import { useOnboardingStore } from './hooks/useOnboardingStore';
import { Progress } from '@/components/ui/progress';
import { Loader2 } from 'lucide-react';

// Progress Indicator Component
function ProgressIndicator() {
  const { data } = useOnboardingStore();
  
  const steps = [
    { number: 1, label: 'Personal Info' },
    { number: 2, label: 'Income & Expenses' },
    { number: 3, label: 'Goals & Risk' },
  ];

  return (
    <div className="my-8">
      <div className='mt-30'></div>
      <div className="flex items-center justify-between">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium ${
                data.currentStep >= step.number
                  ? 'bg-[#1B1856] text-white'
                  : 'border-2 border-black/20 text-black/40'
              }`}
            >
              {step.number}
            </div>
            <span className="mt-2 text-xs text-neutral-600">{step.label}</span>
          </div>
        ))}
      </div>
      <Progress
        value={((data.currentStep - 1) / (steps.length - 1)) * 100}
        className="mt-4"
      />
    </div>
  );
}

// Loader Component
function OnboardingLoader() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#1B1856] mb-4" />
        <p className="text-neutral-600">Verifying your access...</p>
      </div>
    </div>
  );
}

// Main Content Component
function OnboardingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const step = searchParams.get('step');
  const { setStep } = useOnboardingStore();
  const [isVerifying, setIsVerifying] = React.useState(true);
  const [hasAccess, setHasAccess] = React.useState(false);

  const wasRecentlyVerified = () => {
    if (typeof window === "undefined") return false;
    const ts = sessionStorage.getItem("celerey_payment_verified_at");
    if (!ts) return false;
    const ageMs = Date.now() - Number(ts);
    return Number.isFinite(ageMs) && ageMs < 5 * 60 * 1000; // 5 minutes
  };

  const verifyAccess = async () => {
    const userId = localStorage.getItem("celerey_user_id");
    if (!userId) {
      console.log("No user ID found in localStorage");
      router.push("/");
      return;
    }

    try {
      // Properly encode the userId for URL
      const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/billing/access?user_id=${encodeURIComponent(userId)}`;
      console.log("Fetching from:", API_URL);
      
      const response = await fetch(API_URL, {
        credentials: "include",
      });
      
      // Check HTTP status
      if (!response.ok) {
        console.error("HTTP error:", response.status, response.statusText);
        
        // Try to get error message from response
        const errorText = await response.text();
        console.error("Error response:", errorText);
        
        if (wasRecentlyVerified()) {
          console.log("Recently verified, allowing access despite HTTP error");
          setHasAccess(true);
          setIsVerifying(false);
        } else {
          router.push("/payment/success");
        }
        return;
      }
      
      // Parse response
      const data = await response.json();
      console.log("Access check response:", data);
      
      if (!data.ok || !data.paid) {
        console.log("Payment not verified:", data.error || "No payment");
        if (wasRecentlyVerified()) {
          console.log("Recently verified, allowing access despite payment check");
          setHasAccess(true);
          setIsVerifying(false);
        } else {
          router.push("/payment/success");
        }
        return;
      }
      
      // Payment verified
      console.log("Payment verified, allowing access");
      setHasAccess(true);
      setIsVerifying(false);
      
    } catch (error) {
      console.error("Error verifying access:", error);
      if (wasRecentlyVerified()) {
        console.log("Recently verified, allowing access despite error");
        setHasAccess(true);
        setIsVerifying(false);
      } else {
        router.push("/payment/success");
      }
    }
  };

  useEffect(() => {
    verifyAccess();
  }, [router]);

  useEffect(() => {
    if (!hasAccess) return;
    
    const stepNum = parseInt(step || '1');
    if (stepNum >= 1 && stepNum <= 3) {
      setStep(stepNum);
    }
  }, [step, setStep, hasAccess]);

  // Show loader while verifying
  if (isVerifying) {
    return <OnboardingLoader />;
  }

  // If no access (should have redirected already)
  if (!hasAccess) {
    return null;
  }

  // User has access - show onboarding
  const currentStep = parseInt(step || '1');

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <ProgressIndicator />
        
        {currentStep === 1 && <PersonalInfoPage />}
        {currentStep === 2 && <FinancialMOTPage />}
        {currentStep === 3 && <FinancialMOTPage2 />}
      </div>
    </div>
  );
}

// Main Page Component with Suspense
export default function OnboardingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f4f3f2] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#1B1856] mb-4" />
          <p className="text-neutral-700">Loading onboarding...</p>
        </div>
      </div>
    }>
      <OnboardingContent />
    </Suspense>
  );
}