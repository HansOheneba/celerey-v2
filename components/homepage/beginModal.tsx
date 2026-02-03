"use client";

import * as React from "react";
import Link from "next/link";
import { X, MailCheck, MapPin, Search, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";

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

type LocationSuggestion = {
  display_name: string;
  lat: string;
  lon: string;
  type: string;
  address?: {
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    country?: string;
  };
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

// Common timezones for major cities (fallback)
const COMMON_TIMEZONES: Record<string, string> = {
  // North America
  "New York": "America/New_York",
  "Los Angeles": "America/Los_Angeles",
  "Chicago": "America/Chicago",
  "Toronto": "America/Toronto",
  "Vancouver": "America/Vancouver",
  "Mexico City": "America/Mexico_City",
  
  // South America
  "São Paulo": "America/Sao_Paulo",
  "Rio de Janeiro": "America/Sao_Paulo",
  "Buenos Aires": "America/Argentina/Buenos_Aires",
  "Lima": "America/Lima",
  "Bogotá": "America/Bogota",
  
  // Europe
  "London": "Europe/London",
  "Paris": "Europe/Paris",
  "Berlin": "Europe/Berlin",
  "Madrid": "Europe/Madrid",
  "Rome": "Europe/Rome",
  "Amsterdam": "Europe/Amsterdam",
  "Lisbon": "Europe/Lisbon",
  "Dublin": "Europe/Dublin",
  "Warsaw": "Europe/Warsaw",
  "Vienna": "Europe/Vienna",
  "Prague": "Europe/Prague",
  "Budapest": "Europe/Budapest",
  "Athens": "Europe/Athens",
  "Stockholm": "Europe/Stockholm",
  "Oslo": "Europe/Oslo",
  "Helsinki": "Europe/Helsinki",
  "Copenhagen": "Europe/Copenhagen",
  "Zurich": "Europe/Zurich",
  "Brussels": "Europe/Brussels",
  
  // Africa
  "Lagos": "Africa/Lagos",
  "Accra": "Africa/Accra",
  "Nairobi": "Africa/Nairobi",
  "Cairo": "Africa/Cairo",
  "Johannesburg": "Africa/Johannesburg",
  "Cape Town": "Africa/Johannesburg",
  "Casablanca": "Africa/Casablanca",
  "Addis Ababa": "Africa/Addis_Ababa",
  "Kampala": "Africa/Kampala",
  "Dar es Salaam": "Africa/Dar_es_Salaam",
  
  // Asia
  "Tokyo": "Asia/Tokyo",
  "Singapore": "Asia/Singapore",
  "Hong Kong": "Asia/Hong_Kong",
  "Shanghai": "Asia/Shanghai",
  "Beijing": "Asia/Shanghai",
  "Seoul": "Asia/Seoul",
  "Bangkok": "Asia/Bangkok",
  "Kuala Lumpur": "Asia/Kuala_Lumpur",
  "Jakarta": "Asia/Jakarta",
  "Manila": "Asia/Manila",
  "Mumbai": "Asia/Kolkata",
  "Delhi": "Asia/Kolkata",
  "Bangalore": "Asia/Kolkata",
  "Chennai": "Asia/Kolkata",
  "Karachi": "Asia/Karachi",
  "Dhaka": "Asia/Dhaka",
  "Colombo": "Asia/Colombo",
  "Kathmandu": "Asia/Kathmandu",
  "Dubai": "Asia/Dubai",
  "Abu Dhabi": "Asia/Dubai",
  "Riyadh": "Asia/Riyadh",
  "Tel Aviv": "Asia/Jerusalem",
  "Istanbul": "Europe/Istanbul",
  
  // Australia/Oceania
  "Sydney": "Australia/Sydney",
  "Melbourne": "Australia/Melbourne",
  "Brisbane": "Australia/Brisbane",
  "Perth": "Australia/Perth",
  "Auckland": "Pacific/Auckland",
  "Wellington": "Pacific/Auckland",
  "Fiji": "Pacific/Fiji",
};

export function BeginJourneyModal({
  open,
  onOpenChange,
  // apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/start`,
  apiUrl = `http://127.0.0.1:5000/api/start`,
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
  const [debouncedLocation] = useDebounce(locationInput, 500);
  const [suggestions, setSuggestions] = React.useState<LocationSuggestion[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = React.useState(false);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [isDetectingTimezone, setIsDetectingTimezone] = React.useState(false);

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
    setSuggestions([]);
    setShowSuggestions(false);
    setIsDetectingTimezone(false);
    setUserId(null);
  }, []);

  // When modal closes, reset to form for next open
  React.useEffect(() => {
    if (!open) {
      const t = setTimeout(() => resetAll(), 150);
      return () => clearTimeout(t);
    }
  }, [open, resetAll]);

  // Fetch suggestions from OpenStreetMap
  React.useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedLocation.trim() || debouncedLocation.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoadingSuggestions(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(debouncedLocation)}&addressdetails=1&limit=8&accept-language=en`
        );
        
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data);
        }
      } catch (error) {
        console.error("Error fetching location suggestions:", error);
      } finally {
        setIsLoadingSuggestions(false);
      }
    };

    if (showSuggestions) {
      fetchSuggestions();
    }
  }, [debouncedLocation, showSuggestions]);

  const setField = <K extends keyof BeginJourneyValues>(
    key: K,
    value: BeginJourneyValues[K]
  ) => {
    setValues((v) => ({ ...v, [key]: value }));
  };

  const markTouched = (key: keyof BeginJourneyValues) => {
    setTouched((t) => ({ ...t, [key]: true }));
  };

  // Helper to get timezone from coordinates using free API
  const getTimezoneFromCoordinates = async (lat: string, lon: string): Promise<string | null> => {
    try {
      const response = await fetch(
        `https://api.timezonedb.com/v2.1/get-time-zone?key=0C24OIKGSGDM&format=json&by=position&lat=${lat}&lng=${lon}`
      );
      
      if (response.ok) {
        const data = await response.json();
        if (data.status === "OK") {
          return data.zoneName;
        }
      }
      
      // Fallback: Use Geonames API (free, no API key needed for small use)
      const geonamesResponse = await fetch(
        `http://api.geonames.org/timezoneJSON?lat=${lat}&lng=${lon}&username=demo`
      );
      
      if (geonamesResponse.ok) {
        const geonamesData = await geonamesResponse.json();
        return geonamesData.timezoneId || null;
      }
      
      return null;
    } catch (error) {
      console.error("Error getting timezone:", error);
      return null;
    }
  };

  // Simple timezone guess from city name (fallback)
  const guessTimezoneFromCity = (cityName: string): string | null => {
    const normalizedCity = cityName.toLowerCase();
    
    // Check for exact matches in common timezones
    for (const [city, timezone] of Object.entries(COMMON_TIMEZONES)) {
      if (normalizedCity.includes(city.toLowerCase())) {
        return timezone;
      }
    }
    
    // Check by country/region patterns
    if (normalizedCity.includes("usa") || normalizedCity.includes("united states")) {
      return "America/New_York";
    }
    if (normalizedCity.includes("uk") || normalizedCity.includes("united kingdom")) {
      return "Europe/London";
    }
    if (normalizedCity.includes("canada")) {
      return "America/Toronto";
    }
    if (normalizedCity.includes("australia")) {
      return "Australia/Sydney";
    }
    if (normalizedCity.includes("india")) {
      return "Asia/Kolkata";
    }
    if (normalizedCity.includes("china")) {
      return "Asia/Shanghai";
    }
    if (normalizedCity.includes("japan")) {
      return "Asia/Tokyo";
    }
    if (normalizedCity.includes("germany")) {
      return "Europe/Berlin";
    }
    if (normalizedCity.includes("france")) {
      return "Europe/Paris";
    }
    if (normalizedCity.includes("spain")) {
      return "Europe/Madrid";
    }
    if (normalizedCity.includes("italy")) {
      return "Europe/Rome";
    }
    if (normalizedCity.includes("nigeria")) {
      return "Africa/Lagos";
    }
    if (normalizedCity.includes("ghana")) {
      return "Africa/Accra";
    }
    if (normalizedCity.includes("south africa")) {
      return "Africa/Johannesburg";
    }
    
    return null;
  };

  const handleLocationSelect = async (suggestion: LocationSuggestion) => {
    setLocationInput(suggestion.display_name);
    setShowSuggestions(false);
    setIsDetectingTimezone(true);
    
    try {
      // Try to get accurate timezone from coordinates
      const timezone = await getTimezoneFromCoordinates(suggestion.lat, suggestion.lon);
      
      if (timezone) {
        setField("timeZone", timezone);
      } else {
        // Fallback to guessing from city name
        const guessedTimezone = guessTimezoneFromCity(suggestion.display_name);
        if (guessedTimezone) {
          setField("timeZone", guessedTimezone);
        } else {
          // Last resort: Use city name from address details
          const cityName = suggestion.address?.city || suggestion.address?.town || suggestion.address?.village;
          if (cityName) {
            const cityTimezone = guessTimezoneFromCity(cityName);
            if (cityTimezone) {
              setField("timeZone", cityTimezone);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error setting timezone:", error);
      // Use fallback
      const guessedTimezone = guessTimezoneFromCity(suggestion.display_name);
      if (guessedTimezone) {
        setField("timeZone", guessedTimezone);
      }
    } finally {
      setIsDetectingTimezone(false);
    }
    
    markTouched("timeZone");
  };

  const handleLocationBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
      
      // If user typed something but didn't select, try to guess timezone
      if (locationInput.trim() && !values.timeZone && !isDetectingTimezone) {
        const guessedTimezone = guessTimezoneFromCity(locationInput);
        if (guessedTimezone) {
          setField("timeZone", guessedTimezone);
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

    // Final attempt to guess timezone
    if (!values.timeZone && locationInput.trim() && !isDetectingTimezone) {
      const guessedTimezone = guessTimezoneFromCity(locationInput);
      if (guessedTimezone) {
        setField("timeZone", guessedTimezone);
      }
    }

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
        timeZone: values.timeZone,
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
      // const checkoutApiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/billing/checkout`;
      const checkoutApiUrl = `http://127.0.0.1:5000/api/billing/checkout`;
      
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
          setSubmitError("You already have access. Redirecting...");
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

                  {/* Location */}
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
                          onChange={(e) => {
                            setLocationInput(e.target.value);
                            setShowSuggestions(true);
                          }}
                          onFocus={() => setShowSuggestions(true)}
                          onBlur={handleLocationBlur}
                          placeholder="Type your city or country"
                          className="h-12 rounded-xl border-black/10 bg-white pl-10"
                        />
                        {(isLoadingSuggestions || isDetectingTimezone) && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-600"></div>
                          </div>
                        )}
                      </div>
                      
                      {/* Suggestions dropdown */}
                      {showSuggestions && suggestions.length > 0 && (
                        <div className="absolute z-10 mt-1 w-full rounded-xl border border-black/10 bg-white py-2 shadow-lg max-h-60 overflow-y-auto">
                          {suggestions.map((suggestion, index) => (
                            <button
                              key={`${suggestion.lat}-${suggestion.lon}-${index}`}
                              type="button"
                              className="flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-neutral-50"
                              onClick={() => handleLocationSelect(suggestion)}
                            >
                              <MapPin className="h-4 w-4 text-neutral-400 mt-0.5" />
                              <div>
                                <div className="text-sm font-medium">
                                  {suggestion.address?.city || suggestion.address?.town || suggestion.address?.village || "Unknown"}
                                </div>
                                <div className="text-xs text-neutral-500">
                                  {suggestion.address?.state && `${suggestion.address.state}, `}
                                  {suggestion.address?.country}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Loading state */}
                      {isLoadingSuggestions && showSuggestions && (
                        <div className="absolute z-10 mt-1 w-full rounded-xl border border-black/10 bg-white py-4 shadow-lg">
                          <div className="flex items-center justify-center gap-2">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-600"></div>
                            <span className="text-sm text-neutral-500">Searching...</span>
                          </div>
                        </div>
                      )}

                      {/* No results */}
                      {showSuggestions && !isLoadingSuggestions && suggestions.length === 0 && locationInput.length >= 2 && (
                        <div className="absolute z-10 mt-1 w-full rounded-xl border border-black/10 bg-white py-4 shadow-lg">
                          <div className="flex flex-col items-center gap-2">
                            <Search className="h-5 w-5 text-neutral-400" />
                            <p className="text-sm text-neutral-500">No locations found</p>
                          </div>
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
                    disabled={!canSubmit || isDetectingTimezone}
                    className="h-12 w-full rounded-full bg-[#1B1856] text-white hover:bg-[#1B1856]/90 disabled:opacity-60"
                  >
                    {isSubmitting
                      ? "Creating your account..."
                      : isDetectingTimezone
                      ? "Detecting timezone..."
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
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {submitError}
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