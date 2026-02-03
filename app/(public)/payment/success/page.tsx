// app/payment/success/page.tsx
"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle, AlertCircle, CreditCard, Calendar, ShieldCheck } from "lucide-react";

// Types
interface AccessCheckResponse {
  ok: boolean;
  paid: boolean;
  paid_at: string | null;
  session_id: string | null;
  error?: string;
  message?: string;
}

interface PaymentStatusResponse {
  ok: boolean;
  user: {
    id: string;
    has_paid: boolean;
    paid_at: string | null;
    stripe_customer_id: string | null;
    stripe_session_id: string | null;
    stripe_payment_intent_id: string | null;
    created_at: string | null;
  };
  error?: string;
}

// Main Content Component
function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  
  const [status, setStatus] = useState<'checking' | 'success' | 'pending' | 'failed'>('checking');
  const [message, setMessage] = useState<string>("Verifying your payment...");
  const [userId, setUserId] = useState<string | null>(null);
  const [pollCount, setPollCount] = useState(0);
  const [paymentDetails, setPaymentDetails] = useState<PaymentStatusResponse['user'] | null>(null);
  
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

  // Get userId from localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem("celerey_user_id");
    if (storedUserId) {
      setUserId(storedUserId);
      console.log("Found user ID in localStorage:", storedUserId);
    } else {
      console.log("No user ID found in localStorage");
      setStatus('failed');
      setMessage("User ID not found. Please return to the beginning.");
    }
  }, []);

  // Poll payment status
  useEffect(() => {
    if (!userId) {
      return;
    }

    const checkPaymentStatus = async () => {
      try {
        // Properly encode the userId
        const API_URL = `${API_BASE_URL}/billing/access?user_id=${encodeURIComponent(userId)}`;
        console.log("Polling payment status:", API_URL);
        
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        // Check HTTP status
        if (!response.ok) {
          console.error("HTTP error:", response.status, response.statusText);
          const errorText = await response.text();
          console.error("Error response:", errorText);
          
          // If we've tried enough times and still no payment, show failed
          if (pollCount >= 15) {
            setStatus('failed');
            setMessage("Payment verification timed out. Please contact support.");
          } else {
            // Continue polling
            setPollCount(prev => prev + 1);
            setMessage(`Checking payment... Attempt ${pollCount + 1} of 15`);
          }
          return;
        }

        const data: AccessCheckResponse = await response.json();
        console.log("Payment check response:", data);
        
        if (!data.ok) {
          console.error("Backend error:", data.error, data.message);
          
          if (pollCount >= 15) {
            setStatus('failed');
            setMessage("Payment verification failed. Please contact support.");
          } else {
            setPollCount(prev => prev + 1);
            setMessage(`Checking payment... Attempt ${pollCount + 1} of 15`);
          }
          return;
        }

        if (data.paid) {
          setStatus('success');
          setMessage("Payment verified successfully! Redirecting to onboarding...");
          
          // Get detailed payment info
          await fetchPaymentDetails();
          
          // Mark verification time to prevent loops
          if (typeof window !== "undefined") {
            sessionStorage.setItem("celerey_payment_verified_at", Date.now().toString());
          }

          // Redirect after 2 seconds
          setTimeout(() => {
            router.push("/onboarding?step=1");
          }, 2000);
        } else {
          // Not paid yet, continue polling
          setStatus('pending');
          setMessage("Payment detected, waiting for confirmation...");
          setPollCount(prev => prev + 1);
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
        
        if (pollCount >= 15) {
          setStatus('failed');
          setMessage("Network error. Please refresh or contact support.");
        } else {
          setPollCount(prev => prev + 1);
          setMessage(`Checking payment... Attempt ${pollCount + 1} of 15`);
        }
      }
    };

    // Initial check
    checkPaymentStatus();

    // Set up polling interval (every 2 seconds for 30 seconds total)
    if (pollCount < 15) {
      const interval = setInterval(() => {
        checkPaymentStatus();
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [userId, pollCount, status, API_BASE_URL, router]);

  const fetchPaymentDetails = async () => {
    if (!userId) return;
    
    try {
      const response = await fetch(
        `${API_BASE_URL}/billing/status?user_id=${encodeURIComponent(userId)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        console.error("Failed to fetch payment details:", response.status);
        return;
      }

      const data: PaymentStatusResponse = await response.json();
      if (data.ok && data.user) {
        setPaymentDetails(data.user);
      }
    } catch (error) {
      console.error("Error fetching payment details:", error);
    }
  };

  const handleRetry = () => {
    setStatus('checking');
    setPollCount(0);
    setMessage("Verifying your payment...");
  };

  const handleContactSupport = () => {
    window.location.href = "mailto:support@celerey.com";
  };

  const handleGoToDashboard = () => {
    router.push("/");
  };

  const handleManualRedirect = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("celerey_payment_verified_at", Date.now().toString());
    }
    router.push("/onboarding?step=1");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4f3f2] to-white">
      <div className="container mx-auto max-w-4xl px-4 py-12 sm:py-20">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="font-serif text-3xl text-neutral-900 sm:text-4xl">
            Payment Confirmation
          </h1>
          <p className="mt-2 text-sm text-neutral-600 sm:text-base">
            We're verifying your payment details
          </p>
        </div>

        {/* Main Card */}
        <div className="mx-auto max-w-2xl rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
          {/* Status Indicator */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full">
              {status === 'checking' && (
                <Loader2 className="h-12 w-12 animate-spin text-[#1B1856]" />
              )}
              {status === 'success' && (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
              )}
              {status === 'pending' && (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                  <CreditCard className="h-12 w-12 text-blue-600" />
                </div>
              )}
              {status === 'failed' && (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                  <XCircle className="h-12 w-12 text-red-600" />
                </div>
              )}
            </div>
            
            <h2 className="text-xl font-medium text-neutral-900 sm:text-2xl">
              {status === 'checking' && 'Verifying Payment'}
              {status === 'success' && 'Payment Successful!'}
              {status === 'pending' && 'Payment Processing'}
              {status === 'failed' && 'Payment Verification Failed'}
            </h2>
            
            <p className="mt-2 text-neutral-600">
              {message}
            </p>
            
            {status === 'pending' && (
              <p className="mt-1 text-sm text-neutral-500">
                This may take a few moments. Attempt {pollCount + 1} of 15
              </p>
            )}
            
            {/* Debug info */}
            <div className="mt-2 text-xs text-neutral-400">
              {userId && (
                <p>User ID: {userId.substring(0, 8)}...</p>
              )}
              {sessionId && (
                <p>Session: {sessionId.substring(0, 12)}...</p>
              )}
            </div>
          </div>

          {/* Payment Details */}
          {(paymentDetails || sessionId) && (
            <div className="mb-6 rounded-xl border border-black/5 bg-[#f9f9f8] p-4">
              <h3 className="mb-3 text-sm font-medium text-neutral-900">
                Payment Details
              </h3>
              <div className="space-y-2">
                {paymentDetails?.stripe_session_id && (
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Transaction ID:</span>
                    <span className="font-mono text-xs text-neutral-900">
                      {paymentDetails.stripe_session_id.substring(0, 12)}...
                    </span>
                  </div>
                )}
                {sessionId && !paymentDetails?.stripe_session_id && (
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Session ID:</span>
                    <span className="font-mono text-xs text-neutral-900">
                      {sessionId.substring(0, 12)}...
                    </span>
                  </div>
                )}
                {paymentDetails?.paid_at && (
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Paid at:</span>
                    <span className="text-neutral-900">
                      {new Date(paymentDetails.paid_at).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="mb-8">
            <h3 className="mb-3 text-sm font-medium text-neutral-900">
              Next Steps
            </h3>
            <div className="space-y-3">
              {status === 'success' ? (
                <>
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-900">
                        Payment Verified
                      </p>
                      <p className="text-xs text-neutral-600">
                        Your payment has been confirmed and recorded
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                      <Calendar className="h-3 w-3 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-900">
                        Onboarding Setup
                      </p>
                      <p className="text-xs text-neutral-600">
                        You'll be redirected to complete your profile setup
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100">
                      <ShieldCheck className="h-3 w-3 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-900">
                        Secure Session Booking
                      </p>
                      <p className="text-xs text-neutral-600">
                        After onboarding, you'll book your advisory session
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-neutral-400" />
                  <p className="text-sm text-neutral-600">
                    Please wait while we verify your payment. This usually takes less than 30 seconds.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {status === 'success' && (
              <>
                <Button
                  onClick={() => router.push("/onboarding?step=1")}
                  className="h-12 w-full rounded-full bg-[#1B1856] text-white hover:bg-[#1B1856]/90"
                >
                  Continue to Onboarding →
                </Button>
                <Button
                  onClick={handleManualRedirect}
                  variant="outline"
                  className="h-10 w-full rounded-full border-black/10"
                >
                  Go to Onboarding Now
                </Button>
              </>
            )}
            
            {status === 'pending' && (
              <div className="space-y-2">
                <Button
                  disabled
                  className="h-12 w-full rounded-full bg-[#1B1856] text-white opacity-70"
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Waiting for confirmation...
                </Button>
                <Button
                  onClick={handleRetry}
                  variant="outline"
                  className="h-10 w-full rounded-full border-black/10"
                >
                  Check Again
                </Button>
                <Button
                  onClick={handleManualRedirect}
                  variant="ghost"
                  className="h-10 w-full rounded-full text-sm"
                >
                  I've already paid, continue anyway
                </Button>
              </div>
            )}
            
            {status === 'failed' && (
              <div className="space-y-3">
                <Button
                  onClick={handleRetry}
                  className="h-12 w-full rounded-full bg-[#1B1856] text-white hover:bg-[#1B1856]/90"
                >
                  Try Again
                </Button>
                <Button
                  onClick={handleManualRedirect}
                  variant="outline"
                  className="h-10 w-full rounded-full border-black/10"
                >
                  Proceed to Onboarding Anyway
                </Button>
                <Button
                  onClick={handleContactSupport}
                  variant="outline"
                  className="h-10 w-full rounded-full border-black/10"
                >
                  Contact Support
                </Button>
                <Button
                  onClick={handleGoToDashboard}
                  variant="ghost"
                  className="h-10 w-full rounded-full"
                >
                  Return to Homepage
                </Button>
              </div>
            )}
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-xs text-neutral-500">
              Need help?{" "}
              <button
                onClick={handleContactSupport}
                className="underline underline-offset-2 hover:text-neutral-700"
              >
                Contact our support team
              </button>
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mx-auto mt-8 max-w-2xl">
          <div className="flex items-center justify-center gap-2 text-xs text-neutral-500">
            <ShieldCheck className="h-3 w-3" />
            <span>All payments are secured and encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Page Component with Suspense
export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f4f3f2] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-[#1B1856]" />
          <p className="text-neutral-700">Loading payment confirmation...</p>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}