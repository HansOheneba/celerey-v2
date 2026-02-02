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
  timeZone: string; // Keep this key for backend compatibility
  agree: boolean;
};

type BeginJourneyModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apiUrl?: string; 
};

// Common timezones/locations for initial suggestions
const COMMON_LOCATIONS = [
  { value: "Africa/Accra", label: "Accra, Ghana (GMT)", keywords: ["accra", "ghana", "acra"] },
  { value: "Europe/London", label: "London, United Kingdom (GMT)", keywords: ["london", "uk", "united kingdom", "britain"] },
  { value: "Europe/Paris", label: "Paris, France (CET)", keywords: ["paris", "france"] },
  { value: "America/New_York", label: "New York, USA (EST)", keywords: ["new york", "nyc", "new york city", "usa", "america"] },
  { value: "America/Los_Angeles", label: "Los Angeles, USA (PST)", keywords: ["los angeles", "la", "california"] },
  { value: "Asia/Dubai", label: "Dubai, UAE (GST)", keywords: ["dubai", "uae", "united arab emirates"] },
  { value: "Asia/Tokyo", label: "Tokyo, Japan (JST)", keywords: ["tokyo", "japan"] },
  { value: "Australia/Sydney", label: "Sydney, Australia (AEST)", keywords: ["sydney", "australia"] },
  { value: "Asia/Singapore", label: "Singapore (SGT)", keywords: ["singapore"] },
  { value: "Asia/Kolkata", label: "Mumbai, India (IST)", keywords: ["mumbai", "india", "delhi", "bangalore", "chennai"] },
  { value: "Africa/Lagos", label: "Lagos, Nigeria (WAT)", keywords: ["lagos", "nigeria", "abuja"] },
  { value: "Africa/Johannesburg", label: "Johannesburg, South Africa (SAST)", keywords: ["johannesburg", "south africa", "cape town"] },
  { value: "America/Sao_Paulo", label: "São Paulo, Brazil (BRT)", keywords: ["são paulo", "sao paulo", "brazil", "rio de janeiro"] },
  { value: "America/Toronto", label: "Toronto, Canada (EST)", keywords: ["toronto", "canada", "vancouver", "montreal"] },
  { value: "Europe/Berlin", label: "Berlin, Germany (CET)", keywords: ["berlin", "germany", "munich", "frankfurt"] },
];

// Helper function to find the best matching timezone for a given location input
const findTimezoneForInput = (input: string): string | null => {
  if (!input.trim()) return null;
  
  const normalizedInput = input.toLowerCase().trim();
  
  // First, try to find exact or partial matches in labels
  for (const location of COMMON_LOCATIONS) {
    // Check if input matches the label (case-insensitive)
    if (location.label.toLowerCase().includes(normalizedInput)) {
      return location.value;
    }
    
    // Check if input matches any of the keywords
    if (location.keywords?.some(keyword => normalizedInput.includes(keyword.toLowerCase()))) {
      return location.value;
    }
  }
  
  // Try to match by city/country patterns
  // Example: "Ghana, Accra" or "Accra, Ghana"
  const parts = normalizedInput.split(/[,\s]+/).filter(part => part.length > 2);
  
  for (const location of COMMON_LOCATIONS) {
    // Check each part against the location's keywords
    for (const part of parts) {
      if (location.keywords?.some(keyword => keyword.toLowerCase() === part)) {
        return location.value;
      }
    }
  }
  
  return null;
};

export function BeginJourneyModal({
  open,
  onOpenChange,
  apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/start/`,
}: BeginJourneyModalProps) {
  const router = useRouter();
  const { updateData } = useOnboardingStore();
  
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
  const [locationInput, setLocationInput] = React.useState("");
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = React.useState(false);

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
    setShowSuggestions(false);
    setIsLoadingLocation(false);
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

  // Filter suggestions based on input
  const filteredSuggestions = React.useMemo(() => {
    if (!locationInput.trim()) {
      return COMMON_LOCATIONS;
    }
    
    const input = locationInput.toLowerCase();
    return COMMON_LOCATIONS.filter(location => {
      // Check if input matches label
      if (location.label.toLowerCase().includes(input)) return true;
      
      // Check if input matches any keywords
      if (location.keywords?.some(keyword => 
        keyword.toLowerCase().includes(input) || input.includes(keyword.toLowerCase())
      )) return true;
      
      return false;
    });
  }, [locationInput]);

  // Try to detect user's location
  const detectUserLocation = React.useCallback(async () => {
    if (navigator.geolocation && !values.timeZone) {
      setIsLoadingLocation(true);
      try {
        // First get coordinates
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 5000,
            maximumAge: 60000,
          });
        });
        
        // Use a geocoding service to get location name
        // Using OpenStreetMap Nominatim (free, no API key needed)
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
        );
        
        if (response.ok) {
          const data = await response.json();
          const city = data.address.city || data.address.town || data.address.village;
          const country = data.address.country;
          
          if (city && country) {
            // Try to find matching timezone for this location
            const timezone = findTimezoneForInput(`${city}, ${country}`);
            if (timezone) {
              setField("timeZone", timezone);
              setLocationInput(`${city}, ${country}`);
            }
          }
        }
      } catch (error) {
        console.warn("Could not detect location:", error);
      } finally {
        setIsLoadingLocation(false);
      }
    }
  }, [values.timeZone]);

  // Auto-detect location on mount when modal opens
  React.useEffect(() => {
    if (open && !values.timeZone) {
      detectUserLocation();
    }
  }, [open, values.timeZone, detectUserLocation]);

  const handleLocationSelect = (suggestion: typeof COMMON_LOCATIONS[0]) => {
    setField("timeZone", suggestion.value);
    setLocationInput(suggestion.label);
    setShowSuggestions(false);
    markTouched("timeZone");
  };

  const handleLocationInputChange = (value: string) => {
    setLocationInput(value);
    setShowSuggestions(true);
    
    // Find matching timezone for the input
    const timezone = findTimezoneForInput(value);
    if (timezone) {
      setField("timeZone", timezone);
    } else {
      // If we can't find a match, clear the timeZone field
      // But don't show error until user tries to submit
      setField("timeZone", "");
    }
  };

  // Update timezone when location input loses focus (if we can find a match)
  const handleLocationBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
      
      // Only try to match if there's input but no timezone yet
      if (locationInput.trim() && !values.timeZone) {
        const timezone = findTimezoneForInput(locationInput);
        if (timezone) {
          setField("timeZone", timezone);
        }
      }
      
      markTouched("timeZone");
    }, 200);
  };

  const errors = React.useMemo(() => {
    const e: Partial<Record<keyof BeginJourneyValues, string>> = {};
    if (!values.firstName.trim()) e.firstName = "First name is required";
    if (!values.lastName.trim()) e.lastName = "Last name is required";
    if (!values.email.trim()) e.email = "Email is required";
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email))
      e.email = "Enter a valid email";
    if (!values.phone.trim()) e.phone = "Phone number is required";
    if (!values.timeZone) e.timeZone = "Select your location";
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

    // One final attempt to match the location input to a timezone
    if (!values.timeZone && locationInput.trim()) {
      const timezone = findTimezoneForInput(locationInput);
      if (timezone) {
        setField("timeZone", timezone);
      }
    }

    if (Object.keys(errors).length > 0) return;

    try {
      setIsSubmitting(true);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (!result.ok) {
        if (result.error === "VALIDATION_ERROR" && result.details) {
          const errorMessages = Object.values(result.details).join(", ");
          throw new Error(errorMessages);
        }
        throw new Error(result.message || "Submission failed");
      }
      
      // 1. Save data to the onboarding store
      updateData({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        timeZone: values.timeZone,
        agree: values.agree,
        currentStep: 1, // Start at step 1
      });

      // 2. Close the modal
      onOpenChange(false);
      
      // 3. Redirect to onboarding page
      router.push("/onboarding?step=1");
      
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

                  {/* Location (replaces Timezone) */}
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-neutral-700">
                      Location
                    </Label>
                    <div className="relative">
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
                        <Input
                          id="location"
                          value={locationInput}
                          onChange={(e) => handleLocationInputChange(e.target.value)}
                          onFocus={() => setShowSuggestions(true)}
                          onBlur={handleLocationBlur}
                          placeholder="Type your city or country"
                          className="h-12 rounded-xl border-black/10 bg-white pl-10"
                        />
                        {isLoadingLocation && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-600"></div>
                          </div>
                        )}
                      </div>
                      
                      {/* Location suggestions */}
                      {showSuggestions && filteredSuggestions.length > 0 && (
                        <div className="absolute z-10 mt-1 w-full rounded-xl border border-black/10 bg-white py-2 shadow-lg">
                          {filteredSuggestions.map((suggestion) => (
                            <button
                              key={suggestion.value}
                              type="button"
                              className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-neutral-50"
                              onClick={() => handleLocationSelect(suggestion)}
                            >
                              <MapPin className="h-4 w-4 text-neutral-400" />
                              <span>{suggestion.label}</span>
                            </button>
                          ))}
                        </div>
                      )}
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
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {submitError}
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
            ) : (
              <>
                {/* Success step removed since we're redirecting */}
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