"use client";

import * as React from "react";
import Link from "next/link";
import { X, MailCheck, MapPin } from "lucide-react";
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
  paymentUrl?: string;
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

export function BeginJourneyModal({
  open,
  onOpenChange,
  apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/start`,
  paymentUrl,
}: BeginJourneyModalProps) {
  const router = useRouter();
  const { updateData } = useOnboardingStore();

  const [step, setStep] = React.useState<"form" | "success">("form");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
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
    value: BeginJourneyValues[K],
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

      // Save data to the onboarding store
      updateData({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        timeZone: values.timeZone,
        agree: values.agree,
        currentStep: 1,
      });

      // Try to register user via API (non-blocking — if API is unavailable, still redirect)
      let newUserId: string | null = null;
      try {
        if (apiUrl && !apiUrl.startsWith("undefined")) {
          const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
            credentials: "include",
          });

          const result: BeginJourneyResponse = await response.json();

          if (result.ok && result.userId) {
            newUserId = result.userId;
            setUserId(newUserId);
            updateData({ userId: newUserId });

            if (typeof window !== "undefined") {
              localStorage.setItem("celerey_user_id", newUserId);
            }
          }
        }
      } catch {
        // API unavailable — continue to Stripe anyway
        console.warn("API call to /start failed — proceeding to payment link");
      }

      // Redirect to Stripe payment link (pre-filled with user email)
      onOpenChange(false);
      if (paymentUrl) {
        const url = new URL(paymentUrl);
        url.searchParams.set("prefilled_email", values.email);
        url.searchParams.set(
          "success_url",
          process.env.NEXT_PUBLIC_STRIPE_SUCCESS_URL ||
            "https://celereyv2.vercel.app/onboarding",
        );
        window.location.href = url.toString();
      } else {
        router.push(
          process.env.NEXT_PUBLIC_STRIPE_SUCCESS_URL || "/onboarding",
        );
      }
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
                    Enter your details to get started
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
                        <p className="text-xs text-red-600">
                          {errors.lastName}
                        </p>
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
                      We&#39;ll use this to schedule sessions at convenient times
                      for you
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
                      <Label
                        htmlFor="agree"
                        className="text-sm text-neutral-700"
                      >
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
                    <div
                      className={`rounded-xl border px-4 py-3 text-sm ${
                        submitError.startsWith("ALREADY_PAID:")
                          ? "border-blue-200 bg-blue-50 text-blue-700"
                          : "border-red-200 bg-red-50 text-red-700"
                      }`}
                    >
                      {submitError.replace("ALREADY_PAID:", "")}
                    </div>
                  ) : null}

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={!canSubmit}
                    className="h-12 w-full rounded-full bg-[#1B1856] text-white hover:bg-[#1B1856]/90 disabled:opacity-60"
                  >
                    {isSubmitting ? "Creating your account..." : "Continue"}
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
