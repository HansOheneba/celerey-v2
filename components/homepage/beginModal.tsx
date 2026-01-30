"use client";

import * as React from "react";
import Link from "next/link";
import { X, MailCheck } from "lucide-react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const TIME_ZONES: { value: string; label: string }[] = [
  { value: "Africa/Accra", label: "Africa/Accra (GMT)" },
  { value: "Europe/London", label: "Europe/London" },
  { value: "Europe/Paris", label: "Europe/Paris" },
  { value: "America/New_York", label: "America/New_York" },
  { value: "America/Los_Angeles", label: "America/Los_Angeles" },
  { value: "Asia/Dubai", label: "Asia/Dubai" },
];

export function BeginJourneyModal({
  open,
  onOpenChange,
  apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/start/`,
  // apiUrl = "http://127.0.0.1:5000/api/start/",
}: BeginJourneyModalProps) {
  const [step, setStep] = React.useState<"form" | "success">("form");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const [values, setValues] = React.useState<BeginJourneyValues>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    timeZone: "",
    agree: false,
  });

  const [touched, setTouched] = React.useState<Record<string, boolean>>({});

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
  }, []);

  // When modal closes, reset to form for next open
  React.useEffect(() => {
    if (!open) {
      // slight delay so close animation feels smooth
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

  const errors = React.useMemo(() => {
    const e: Partial<Record<keyof BeginJourneyValues, string>> = {};
    if (!values.firstName.trim()) e.firstName = "First name is required";
    if (!values.lastName.trim()) e.lastName = "Last name is required";
    if (!values.email.trim()) e.email = "Email is required";
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email))
      e.email = "Enter a valid email";
    if (!values.phone.trim()) e.phone = "Phone number is required";
    if (!values.timeZone) e.timeZone = "Select your time zone";
    if (!values.agree) e.agree = "You must agree to continue";
    return e;
  }, [values]);

  const canSubmit = Object.keys(errors).length === 0 && !isSubmitting;

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setSubmitError(null);

    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      timeZone: true,
      agree: true,
    });

    if (Object.keys(errors).length > 0) return;

    try {
      setIsSubmitting(true);

      // Send data to your API
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values), // Send exactly what the API expects
      });

      const result = await response.json();

      if (!result.ok) {
        // Handle validation errors from API
        if (result.error === "VALIDATION_ERROR" && result.details) {
          const errorMessages = Object.values(result.details).join(", ");
          throw new Error(errorMessages);
        }
        throw new Error(result.message || "Submission failed");
      }

      // Success!
      setStep("success");
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
        <div className="relative bg-[#f4f3f2]">
          {/* close */}
          <DialogClose asChild>
            <button
              className="absolute right-4 top-4 rounded-full p-2 text-neutral-500 hover:bg-black/5 hover:text-neutral-700"
              aria-label="Close"
            >
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
                    Create your account to schedule your advisory
                    session
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

                  {/* Timezone */}
                  <div className="space-y-2">
                    <Label className="text-neutral-700">Time Zone</Label>
                    <Select
                      value={values.timeZone}
                      onValueChange={(v) => setField("timeZone", v)}
                    >
                      <SelectTrigger
                        onBlur={() => markTouched("timeZone")}
                        className="h-12 rounded-xl border-black/10 bg-white"
                      >
                        <SelectValue placeholder="Select your time zone" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_ZONES.map((tz) => (
                          <SelectItem key={tz.value} value={tz.value}>
                            {tz.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {touched.timeZone && errors.timeZone ? (
                      <p className="text-xs text-red-600">{errors.timeZone}</p>
                    ) : null}
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
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {submitError}
                    </div>
                  ) : null}

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={!canSubmit}
                    className="h-12 w-full rounded-full bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-60"
                  >
                    {isSubmitting
                      ? "Creating your account..."
                      : "Create Account & Schedule Session"}
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
                {/* SUCCESS STEP */}
                <div className="mx-auto max-w-xl text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/70 ring-1 ring-black/10">
                    <MailCheck className="h-7 w-7 text-neutral-900" />
                  </div>

                  <h3 className="mt-6 font-serif text-3xl text-neutral-900 sm:text-4xl">
                    Success
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-neutral-600 sm:text-base">
                    We will send next steps to{" "}
                    <span className="font-semibold text-neutral-900">
                      {values.email}
                    </span>
                    . Please note: we will only reach out via email from a{" "}
                    <span className="font-semibold text-neutral-900">
                      celerey.co
                    </span>{" "}
                    email address.
                  </p>

                  <div className="mt-8 space-y-3">
                    <Button
                      onClick={() => onOpenChange(false)}
                      className="h-12 w-full rounded-full bg-neutral-900 text-white hover:bg-neutral-800"
                    >
                      Close
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        // keep modal open but allow changing email / resubmitting
                        setStep("form");
                        setSubmitError(null);
                        setTouched({});
                      }}
                      className="h-12 w-full rounded-full border-black/10 bg-white/60 text-neutral-900 hover:bg-white"
                    >
                      Use a different email
                    </Button>

                    <p className="pt-2 text-xs text-neutral-500">
                      Didn't see it? Check spam/junk, or try again with a
                      different email.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}