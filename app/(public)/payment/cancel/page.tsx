// app/payment/cancel/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft, CreditCard, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function PaymentCancelPage() {
  const router = useRouter();

  const handleRetryPayment = () => {
    // Try to get userId from localStorage
    const userId = localStorage.getItem("celerey_user_id");
    if (userId) {
      // Redirect back to payment flow
      window.location.href = "/";
    } else {
      // Start over
      router.push("/");
    }
  };

  const handleContactSupport = () => {
    window.location.href = "mailto:support@celerey.com";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4f3f2] to-white">
      <div className="container mx-auto max-w-2xl px-4 py-12 sm:py-20">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-12 w-12 text-red-600" />
          </div>
          
          <h1 className="font-serif text-3xl text-neutral-900 sm:text-4xl">
            Payment Cancelled
          </h1>
          <p className="mt-2 text-sm text-neutral-600 sm:text-base">
            Your payment was not completed
          </p>
        </div>

        {/* Main Card */}
        <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-neutral-900">
                What happened?
              </h2>
              <p className="mt-2 text-sm text-neutral-600">
                You cancelled the payment process or it was interrupted. No charges were made to your account.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-100">
                  <CreditCard className="h-3 w-3 text-neutral-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">
                    No charges were made
                  </p>
                  <p className="text-xs text-neutral-600">
                    Your payment method was not charged
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-100">
                  <ShieldCheck className="h-3 w-3 text-neutral-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">
                    Your information is saved
                  </p>
                  <p className="text-xs text-neutral-600">
                    Your account details are still available if you want to try again
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <Button
                onClick={handleRetryPayment}
                className="h-12 w-full rounded-full bg-[#1B1856] text-white hover:bg-[#1B1856]/90"
              >
                Try Payment Again
              </Button>

              <Button
                onClick={() => router.push("/")}
                variant="outline"
                className="h-10 w-full rounded-full border-black/10"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Homepage
              </Button>

              <Button
                onClick={handleContactSupport}
                variant="ghost"
                className="h-10 w-full rounded-full"
              >
                Need Help? Contact Support
              </Button>
            </div>

            {/* Help Text */}
            <div className="pt-4 text-center">
              <p className="text-xs text-neutral-500">
                Having trouble with payment?{" "}
                <button
                  onClick={handleContactSupport}
                  className="underline underline-offset-2 hover:text-neutral-700"
                >
                  Contact our support team
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-4 py-2">
            <ShieldCheck className="h-3 w-3 text-neutral-600" />
            <span className="text-xs text-neutral-600">
              All payments are secured with bank-level encryption
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}