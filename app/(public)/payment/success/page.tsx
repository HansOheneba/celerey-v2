// app/payment/success/page.tsx
"use client";

import React, { useEffect, useMemo, useState, Suspense, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, XCircle, Mail } from "lucide-react";

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

type UiStatus = "checking" | "success" | "failed";

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

  const [userId, setUserId] = useState<string | null>(null);
  const [status, setStatus] = useState<UiStatus>("checking");
  const [message, setMessage] = useState("Confirming your payment...");
  const [attempt, setAttempt] = useState(0);

  const MAX_ATTEMPTS = 15;
  const POLL_MS = 2000;

  const masked = useMemo(() => {
    // Only used for logs; UI should not show these.
    const mask = (v: string | null, keep = 8) =>
      v ? `${v.slice(0, keep)}…` : null;
    return {
      userId: mask(userId, 8),
      sessionId: mask(sessionId, 12),
    };
  }, [userId, sessionId]);

  // Get userId from localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem("celerey_user_id");
    if (!storedUserId) {
      console.log("[payment-success] No user ID found in localStorage");
      setStatus("failed");
      setMessage("We couldn’t find your session. Please return to the homepage and try again.");
      return;
    }

    setUserId(storedUserId);
    console.log("[payment-success] userId found:", storedUserId);
    console.log("[payment-success] stripe session_id (url):", sessionId);
  }, [sessionId]);

  const fetchPaymentDetails = useCallback(async () => {
    if (!userId) return;

    try {
      const res = await fetch(
        `${API_BASE_URL}/billing/status?user_id=${encodeURIComponent(userId)}`,
        { method: "GET", headers: { "Content-Type": "application/json" }, credentials: "include" }
      );

      if (!res.ok) {
        console.log("[payment-success] status details HTTP error:", res.status);
        return;
      }

      const data: PaymentStatusResponse = await res.json();
      console.log("[payment-success] detailed status:", data);
    } catch (e) {
      console.log("[payment-success] error fetching detailed status:", e);
    }
  }, [API_BASE_URL, userId]);

  const verifyOnce = useCallback(async () => {
    if (!userId) return;

    try {
      const url = `${API_BASE_URL}/billing/access?user_id=${encodeURIComponent(userId)}`;
      console.log("[payment-success] polling:", {
        url,
        attempt: attempt + 1,
        masked,
      });

      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.log("[payment-success] HTTP error:", res.status, res.statusText, text);
        throw new Error(`HTTP ${res.status}`);
      }

      const data: AccessCheckResponse = await res.json();
      console.log("[payment-success] access check:", data);

      if (!data.ok) {
        throw new Error(data.error || data.message || "Verification failed");
      }

      if (data.paid) {
        setStatus("success");
        setMessage("Payment confirmed. Redirecting…");

        // Log details for debugging (but keep UI clean)
        await fetchPaymentDetails();

        sessionStorage.setItem("celerey_payment_verified_at", Date.now().toString());

        setTimeout(() => {
          router.push("/onboarding?step=1");
        }, 1200);

        return;
      }

      // Not paid yet
      setMessage("Still confirming your payment…");
    } catch (e) {
      console.log("[payment-success] verifyOnce error:", e);
      // Don’t immediately fail; polling loop will decide when to fail.
    } finally {
      setAttempt((prev) => prev + 1);
    }
  }, [API_BASE_URL, userId, attempt, masked, fetchPaymentDetails, router]);

  // Polling loop (clean + predictable)
  useEffect(() => {
    if (!userId) return;
    if (status !== "checking") return;

    // Reset message when starting checks
    setMessage("Confirming your payment...");

    let isMounted = true;

    const run = async () => {
      if (!isMounted) return;
      await verifyOnce();
    };

    // First run immediately
    run();

    const interval = setInterval(() => {
      if (!isMounted) return;
      if (attempt + 1 >= MAX_ATTEMPTS) return;
      run();
    }, POLL_MS);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [userId, status, verifyOnce, attempt]);

  // Decide timeout/failure when attempts exceeded
  useEffect(() => {
    if (status !== "checking") return;
    if (attempt < MAX_ATTEMPTS) return;

    setStatus("failed");
    setMessage("We couldn’t confirm your payment yet. If you’ve been charged, contact support.");
  }, [attempt, status]);

  const handleRetry = () => {
    console.log("[payment-success] retry clicked");
    setStatus("checking");
    setAttempt(0);
    setMessage("Confirming your payment...");
  };

  const handleContactSupport = () => {
    window.location.href = "mailto:support@celerey.com";
  };

  const handleGoHome = () => {
    router.push("/");
  };

  const handleContinueAnyway = () => {
    // If you keep this button, it should be explicit and rare.
    console.log("[payment-success] user chose continue anyway");
    sessionStorage.setItem("celerey_payment_verified_at", Date.now().toString());
    router.push("/onboarding?step=1");
  };

  const ProgressNote =
    status === "checking"
      ? `Checking… (${Math.min(attempt + 1, MAX_ATTEMPTS)}/${MAX_ATTEMPTS})`
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4f3f2] to-white">
      <div className="h-24" />

      <div className="container mx-auto max-w-xl px-4 py-10 sm:py-14">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-neutral-900 sm:text-4xl">
            Payment confirmation
          </h1>
          <p className="mt-2 text-sm text-neutral-600 sm:text-base">
            {status === "checking" && "Please wait while we confirm your payment."}
            {status === "success" && "You’re all set."}
            {status === "failed" && "We ran into an issue."}
          </p>
        </div>

        <div className="mt-8 rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
          {/* Icon + status */}
          <div className="text-center">
            {status === "checking" && (
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-black/5">
                <Loader2 className="h-8 w-8 animate-spin text-[#1B1856]" />
              </div>
            )}

            {status === "success" && (
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-8 w-8 text-green-700" />
              </div>
            )}

            {status === "failed" && (
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <XCircle className="h-8 w-8 text-red-700" />
              </div>
            )}

            <h2 className="mt-4 text-xl font-medium text-neutral-900">
              {status === "checking" && "Confirming payment"}
              {status === "success" && "Payment confirmed"}
              {status === "failed" && "Confirmation failed"}
            </h2>

            <p className="mt-2 text-sm text-neutral-600">{message}</p>

            {ProgressNote && (
              <p className="mt-2 text-xs text-neutral-500">{ProgressNote}</p>
            )}
          </div>

          {/* Actions */}
          <div className="mt-8 space-y-3">
            {status === "checking" && (
              <Button
                disabled
                className="h-12 w-full rounded-full bg-[#1B1856] text-white opacity-80"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Confirming…
              </Button>
            )}

            {status === "success" && (
              <Button
                onClick={() => router.push("/onboarding?step=1")}
                className="h-12 w-full rounded-full bg-[#1B1856] text-white hover:bg-[#1B1856]/90"
              >
                Continue →
              </Button>
            )}

            {status === "failed" && (
              <>
                <Button
                  onClick={handleRetry}
                  className="h-12 w-full rounded-full bg-[#1B1856] text-white hover:bg-[#1B1856]/90"
                >
                  Try again
                </Button>

                <Button
                  onClick={handleContactSupport}
                  variant="outline"
                  className="h-11 w-full rounded-full border-black/10"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Contact support
                </Button>

                <Button
                  onClick={handleGoHome}
                  variant="ghost"
                  className="h-11 w-full rounded-full"
                >
                  Return to homepage
                </Button>

                {/* Optional: keep only if you truly want it */}
                <Button
                  onClick={handleContinueAnyway}
                  variant="ghost"
                  className="h-11 w-full rounded-full text-sm text-neutral-600"
                >
                  Continue to onboarding anyway
                </Button>
              </>
            )}
          </div>

          {/* Minimal help text */}
          <div className="mt-6 text-center">
            <button
              onClick={handleContactSupport}
              className="text-xs text-neutral-500 underline underline-offset-2 hover:text-neutral-700"
            >
              Need help? Email support
            </button>
          </div>
        </div>

        {/* Security line (small) */}
        <div className="mx-auto mt-6 text-center text-xs text-neutral-500">
          Payments are secured and encrypted.
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f4f3f2] flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-[#1B1856]" />
            <p className="text-neutral-700">Loading…</p>
          </div>
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
