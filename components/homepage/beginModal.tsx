"use client";

import * as React from "react";
import Link from "next/link";
import { X, MailCheck, MapPin, Search, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useOnboardingStore } from "@/app/(public)/onboarding/hooks/useOnboardingStore";

type BeginJourneyValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  timeZone: string;
  agree: boolean;
};

type BeginJourneyModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apiUrl?: string; 
};

// API Response Types
interface BeginJourneyResponse {
  ok: boolean;
  userId: string;
  leadId?: number;
  message?: string;
  error?: string;
  details?: Record<string, string>;
}

interface CheckoutResponse {
  ok: boolean;
  sessionId: string;
  url: string;
  expires_at: number;
  error?: string;
  message?: string;
}

export function BeginJourneyModal({
  open,
  onOpenChange,
  apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/start`,
}: BeginJourneyModalProps) {
  const router = useRouter();
  const { updateData } = useOnboardingStore();
  
  const [step, setStep] = React.useState<"form" | "payment" | "success">("form");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [userId, setUserId] = React.useState<string | null>(null);

  const [values, setValues] = React.useState<BeginJourneyValues>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    timeZone: "",
    agree: false,
  });

  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [locationInput, setLocationInput] = React.useState("");

  const resetAll = React.useCallback(() => {
    setStep("form");
    setIsSubmitting(false);
    setIsProcessingPayment(false);
    setSubmitError(null);
    setTouched({});
    setValues({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      timeZone: "",
      agree: false,
    });
    setLocationInput("");
    setUserId(null);
  }, []);

  // When modal closes, reset to form for next open
  React.useEffect(() => {
    if (!open) {
      const t = setTimeout(() => resetAll(), 150);
      return () => clearTimeout(t);
    }
  }, [open, resetAll]);

  const setField = <K extends keyof BeginJourneyValues>(
    key: K,
    value: BeginJourneyValues[K]
  ) => {
    setValues((v) => ({ ...v, [key]: value }));
  };

  const markTouched = (key: keyof BeginJourneyValues) => {
    setTouched((t) => ({ ...t, [key]: true }));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocationInput(value);
    setField("timeZone", value);
  };

  const errors = React.useMemo(() => {
    const e: Partial<Record<keyof BeginJourneyValues, string>> = {};
    if (!values.firstName.trim()) e.firstName = "First name is required";
    if (!values.lastName.trim()) e.lastName = "Last name is required";
    if (!values.email.trim()) e.email = "Email is required";
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email))
      e.email = "Enter a valid email";
    if (!values.phone.trim()) e.phone = "Phone number is required";
    if (!values.timeZone.trim()) e.timeZone = "Location is required";
    if (!values.agree) e.agree = "You must agree to continue";
    return e;
  }, [values]);

  const canSubmit = Object.keys(errors).length === 0 && !isSubmitting;

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setSubmitError(null);

    // Mark all fields as touched
    Object.keys(values).forEach((key) => {
      markTouched(key as keyof BeginJourneyValues);
    });

    if (Object.keys(errors).length > 0) return;

    try {
      setIsSubmitting(true);
      
      console.log("Submitting to:", apiUrl);
      console.log("Payload:", values);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });

      console.log("Response status:", response.status);
      const result: BeginJourneyResponse = await response.json();
      console.log("Response body:", result);

      if (!result.ok) {
        if (result.error === "VALIDATION_ERROR" && result.details) {
          const errorMessages = Object.values(result.details).join(", ");
          throw new Error(errorMessages);
        }
        throw new Error(result.message || "Submission failed");
      }
      
      // Store the userId from the response
      const newUserId = result.userId;
      setUserId(newUserId);
      
      // Save data to the onboarding store with userId
      updateData({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        timeZone: values.timeZone, // This now contains the user's location input
        agree: values.agree,
        userId: newUserId,
        currentStep: 1,
      });

      // Also store in localStorage for persistence across page navigation
      if (typeof window !== 'undefined') {
        localStorage.setItem("celerey_user_id", newUserId);
      }

      // Move to payment step
      setStep("payment");
      
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProceedToPayment = async () => {
    if (!userId) {
      setSubmitError("User ID not found. Please try again.");
      return;
    }

    setIsProcessingPayment(true);
    setSubmitError(null);

    try {
      // Call your backend to create a Stripe Checkout session
      const checkoutApiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/billing/checkout`;
      
      console.log("Creating checkout session for user:", userId);
      console.log("Checkout API URL:", checkoutApiUrl);

      const response = await fetch(checkoutApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId }),
        credentials: "include",
      });

      const result: CheckoutResponse = await response.json();
      console.log("Checkout response:", result);

      if (!result.ok) {
        if (result.error === "ALREADY_PAID") {
          // User already paid - redirect them to success/dashboard
          setSubmitError("ALREADY_PAID:You already have access. Redirecting...");
          setTimeout(() => {
            router.push("/onboarding");
          }, 2000);
          return;
        }
        throw new Error(result.message || "Failed to create payment session");
      }

      // Redirect to Stripe Checkout URL
      if (result.url) {
        console.log("Redirecting to Stripe Checkout:", result.url);
        window.location.href = result.url;
      } else {
        throw new Error("No payment URL received");
      }
      
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Payment setup failed. Please try again.";
      setSubmitError(message);
      console.error("Payment error:", err);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[720px] gap-0 overflow-hidden rounded-2xl p-0">
        <div className="relative bg-white">
          {/* close */}
          <DialogClose asChild>
            <button
              className="absolute right-4 top-4 rounded-full p-2 text-neutral-500 hover:bg-black/5 hover:text-neutral-700"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </DialogClose>

          <div className="px-8 py-8 sm:px-10">
            {step === "form" ? (
              <>
                <DialogHeader className="text-left">
                  <DialogTitle className="font-serif text-3xl text-neutral-900 sm:text-4xl">
                    Begin Your Journey
                  </DialogTitle>
                  <p className="mt-2 text-sm text-neutral-600 sm:text-base">
                    Create your account to schedule your advisory session
                  </p>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  {/* First + Last */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-neutral-700">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        value={values.firstName}
                        onChange={(e) => setField("firstName", e.target.value)}
                        onBlur={() => markTouched("firstName")}
                        className="h-12 rounded-xl border-black/10 bg-white"
                      />
                      {touched.firstName && errors.firstName ? (
                        <p className="text-xs text-red-600">
                          {errors.firstName}
                        </p>
                      ) : null}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-neutral-700">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        value={values.lastName}
                        onChange={(e) => setField("lastName", e.target.value)}
                        onBlur={() => markTouched("lastName")}
                        className="h-12 rounded-xl border-black/10 bg-white"
                      />
                      {touched.lastName && errors.lastName ? (
                        <p className="text-xs text-red-600">{errors.lastName}</p>
                      ) : null}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-neutral-700">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={values.email}
                      onChange={(e) => setField("email", e.target.value)}
                      onBlur={() => markTouched("email")}
                      className="h-12 rounded-xl border-black/10 bg-white"
                    />
                    {touched.email && errors.email ? (
                      <p className="text-xs text-red-600">{errors.email}</p>
                    ) : null}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-neutral-700">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={values.phone}
                      onChange={(e) => setField("phone", e.target.value)}
                      onBlur={() => markTouched("phone")}
                      className="h-12 rounded-xl border-black/10 bg-white"
                    />
                    {touched.phone && errors.phone ? (
                      <p className="text-xs text-red-600">{errors.phone}</p>
                    ) : null}
                  </div>

                  {/* Location - Simplified */}
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-neutral-700">
                      Location
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
                      <Input
                        id="location"
                        value={locationInput}
                        onChange={handleLocationChange}
                        onBlur={() => markTouched("timeZone")}
                        placeholder="Enter your city, state, or country"
                        className="h-12 rounded-xl border-black/10 bg-white pl-10"
                      />
                    </div>
                    {touched.timeZone && errors.timeZone ? (
                      <p className="text-xs text-red-600">{errors.timeZone}</p>
                    ) : null}
                    <p className="text-xs text-neutral-500">
                      We'll use this to schedule sessions at convenient times for you
                    </p>
                  </div>

                  {/* Agree */}
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="agree"
                        checked={values.agree}
                        onCheckedChange={(v) => setField("agree", Boolean(v))}
                        onBlur={() => markTouched("agree")}
                        className="mt-1"
                      />
                      <Label htmlFor="agree" className="text-sm text-neutral-700">
                        I agree to the{" "}
                        <Link
                          href="/terms"
                          className="underline underline-offset-4 hover:text-neutral-900"
                          target="_blank"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/privacy"
                          className="underline underline-offset-4 hover:text-neutral-900"
                          target="_blank"
                        >
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                    {touched.agree && errors.agree ? (
                      <p className="text-xs text-red-600">{errors.agree}</p>
                    ) : null}
                  </div>

                  {/* Server/API error */}
                  {submitError ? (
                    <div className={`rounded-xl border px-4 py-3 text-sm ${
                      submitError.startsWith("ALREADY_PAID:")
                        ? "border-blue-200 bg-blue-50 text-blue-700"
                        : "border-red-200 bg-red-50 text-red-700"
                    }`}>
                      {submitError.replace("ALREADY_PAID:", "")}
                    </div>
                  ) : null}

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={!canSubmit}
                    className="h-12 w-full rounded-full bg-[#1B1856] text-white hover:bg-[#1B1856]/90 disabled:opacity-60"
                  >
                    {isSubmitting
                      ? "Creating your account..."
                      : "Create Account & Continue"}
                  </Button>

                  {/* Footer */}
                  <p className="text-center text-sm text-neutral-600">
                    Already have an account?{" "}
                    <Link
                      href="https://celerey.app/auth/signin"
                      className="font-semibold text-neutral-900 underline underline-offset-4 hover:opacity-80"
                      target="_blank"
                    >
                      Sign in
                    </Link>
                  </p>
                </form>
              </>
            ) : step === "payment" ? (
              <>
                <DialogHeader className="text-left">
                  <DialogTitle className="font-serif text-3xl text-neutral-900 sm:text-4xl">
                    Secure Payment
                  </DialogTitle>
                  <p className="mt-2 text-sm text-neutral-600 sm:text-base">
                    Complete your payment to unlock your advisory session
                  </p>
                </DialogHeader>

                <div className="mt-8 space-y-6">
                  {/* User Information Card */}
                  <div className="rounded-xl border border-black/10 bg-white p-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
                          <MailCheck className="h-5 w-5 text-neutral-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-neutral-900">Account Created</p>
                          <p className="text-xs text-neutral-600">{values.email}</p>
                        </div>
                      </div>
                      <div className="border-t pt-3">
                        <p className="text-xs text-neutral-500">
                          Location: <span className="font-medium">{values.timeZone}</span>
                        </p>
                        <p className="text-xs text-neutral-500">
                          User ID: <span className="font-mono text-xs">{userId ? userId.substring(0, 8) + "..." : "Loading..."}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Details Card */}
                  <div className="rounded-xl border border-black/10 bg-white p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-neutral-900">Advisory Session</p>
                        <p className="text-xs text-neutral-600">One-time payment</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-neutral-900">$100.00</p>
                      </div>
                    </div>
                  </div>

                  {submitError ? (
                    <div className={`rounded-xl border px-4 py-3 text-sm ${
                      submitError.startsWith("ALREADY_PAID:")
                        ? "border-blue-200 bg-blue-50 text-blue-700"
                        : "border-red-200 bg-red-50 text-red-700"
                    }`}>
                      {submitError.replace("ALREADY_PAID:", "")}
                    </div>
                  ) : null}

                  {/* Updated Button */}
                  <Button
                    onClick={handleProceedToPayment}
                    disabled={isProcessingPayment || !userId}
                    className="h-12 w-full rounded-full bg-[#1B1856] text-white hover:bg-[#1B1856]/90 disabled:opacity-60"
                  >
                    {isProcessingPayment ? (
                      <span className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Setting up secure payment...
                      </span>
                    ) : (
                      "Proceed to Secure Payment"
                    )}
                  </Button>

                  <p className="text-center text-xs text-neutral-500">
                    You'll be redirected to our secure payment processor
                  </p>
                  
                  {/* Back button for flexibility */}
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setStep("form")}
                      className="text-sm text-neutral-600 hover:text-neutral-900 underline underline-offset-2"
                    >
                      Go back to edit information
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Success step */}
                <div className="mx-auto max-w-xl text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/70 ring-1 ring-black/10">
                    <MailCheck className="h-7 w-7 text-neutral-900" />
                  </div>

                  <h3 className="mt-6 font-serif text-3xl text-neutral-900 sm:text-4xl">
                    Redirecting...
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-neutral-600 sm:text-base">
                    Taking you to the next step of your journey.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}