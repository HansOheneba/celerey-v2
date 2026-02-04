"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
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

import { useOnboardingStore } from "../hooks/useOnboardingStore";

const AGE_RANGES = [
  { value: "18-24", label: "18-24 years" },
  { value: "25-34", label: "25-34 years" },
  { value: "35-44", label: "35-44 years" },
  { value: "45-54", label: "45-54 years" },
  { value: "55-64", label: "55-64 years" },
  { value: "65+", label: "65+ years" },
];

const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
];

const MARITAL_STATUS_OPTIONS = [
  { value: "single", label: "Single" },
  { value: "married", label: "Married" },
  { value: "divorced", label: "Divorced" },
  { value: "widowed", label: "Widowed" },
  { value: "separated", label: "Separated" },
];

const DEPENDENTS_OPTIONS = [
  { value: "0", label: "0" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5+", label: "5+" },
];

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

const findLocationLabel = (timezone: string): string => {
  const location = COMMON_LOCATIONS.find((loc) => loc.value === timezone);
  return location ? location.label : timezone;
};

function FieldError({ show, message }: { show: boolean; message?: string }) {
  if (!show || !message) return null;
  return <p className="text-[11px] leading-4 text-red-600">{message}</p>;
}

function Card({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-black/10 bg-white p-4 sm:p-5">
      <div className="mb-3">
        <h2 className="text-sm font-semibold text-neutral-900">{title}</h2>
        {description ? (
          <p className="mt-1 text-xs text-neutral-500">{description}</p>
        ) : null}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export function PersonalInfoPage() {
  const router = useRouter();
  const { data, updateData, completeStep, setStep } = useOnboardingStore();

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});

  const [locationInput, setLocationInput] = React.useState("");
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  const filteredSuggestions = React.useMemo(() => {
    if (!locationInput.trim()) return COMMON_LOCATIONS;

    const input = locationInput.toLowerCase();
    return COMMON_LOCATIONS.filter((location) => {
      if (location.label.toLowerCase().includes(input)) return true;
      if (
        location.keywords?.some(
          (keyword) =>
            keyword.toLowerCase().includes(input) || input.includes(keyword.toLowerCase())
        )
      )
        return true;
      return false;
    });
  }, [locationInput]);

  useEffect(() => {
    if (data.timeZone) {
      const label = findLocationLabel(data.timeZone);
      setLocationInput(label);
    }
  }, [data.timeZone]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const markTouched = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = <K extends keyof typeof data>(field: K, value: (typeof data)[K]) => {
    updateData({ [field]: value });
    if (errors[field as string]) {
      setErrors((prev) => ({ ...prev, [field as string]: "" }));
    }
  };

  const findTimezoneForInput = (input: string): string | null => {
    if (!input.trim()) return null;
    const normalized = input.toLowerCase().trim();

    for (const location of COMMON_LOCATIONS) {
      if (location.label.toLowerCase().includes(normalized)) return location.value;
      if (location.keywords?.some((keyword) => normalized.includes(keyword.toLowerCase())))
        return location.value;
    }

    const parts = normalized.split(/[,\s]+/).filter((p) => p.length > 2);
    for (const location of COMMON_LOCATIONS) {
      for (const part of parts) {
        if (location.keywords?.some((k) => k.toLowerCase() === part)) return location.value;
      }
    }
    return null;
  };

  const handleLocationSelect = (suggestion: (typeof COMMON_LOCATIONS)[number]) => {
    updateData({ timeZone: suggestion.value });
    setLocationInput(suggestion.label);
    setShowSuggestions(false);
    markTouched("timeZone");
  };

  const handleLocationInputChange = (value: string) => {
    setLocationInput(value);
    setShowSuggestions(true);

    const timezone = findTimezoneForInput(value);
    updateData({ timeZone: timezone ?? "" });
  };

  const handleLocationBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);

      if (locationInput.trim() && !data.timeZone) {
        const timezone = findTimezoneForInput(locationInput);
        if (timezone) updateData({ timeZone: timezone });
      }

      markTouched("timeZone");
    }, 150);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!data.firstName?.trim()) newErrors.firstName = "First name is required";
    if (!data.lastName?.trim()) newErrors.lastName = "Last name is required";
    if (!data.email?.trim()) newErrors.email = "Email is required";
    if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) newErrors.email = "Enter a valid email";
    if (!data.phone?.trim()) newErrors.phone = "Phone number is required";
    if (!data.timeZone) newErrors.timeZone = "Select your location";
    if (!data.ageRange) newErrors.ageRange = "Age range is required";
    if (!data.citizenship?.trim()) newErrors.citizenship = "Citizenship is required";
    if (!data.gender) newErrors.gender = "Gender is required";
    if (!data.maritalStatus) newErrors.maritalStatus = "Marital status is required";
    if (data.dependents === undefined) newErrors.dependents = "Number of dependents is required";
    if (!data.agree) newErrors.agree = "You must agree to continue";

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!data.timeZone && locationInput.trim()) {
      const timezone = findTimezoneForInput(locationInput);
      if (timezone) updateData({ timeZone: timezone });
    }

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setTouched({
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        timeZone: true,
        ageRange: true,
        citizenship: true,
        gender: true,
        maritalStatus: true,
        dependents: true,
        agree: true,
      });
      return;
    }

    completeStep(1);
    setStep(2);
    router.push("/onboarding?step=2");
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6 sm:py-8">
      <div className="mb-5">
        <h1 className="font-serif text-2xl text-neutral-900 sm:text-3xl">
          Personal Information
        </h1>
        <p className="mt-1 text-sm text-neutral-600">
          Basic details to get started.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Card title="Basic details">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="firstName" className="text-sm text-neutral-700">
                First name
              </Label>
              <Input
                id="firstName"
                value={data.firstName || ""}
                onChange={(e) => handleChange("firstName", e.target.value)}
                onBlur={() => markTouched("firstName")}
                className="h-10 rounded-xl border-black/10 bg-white"
              />
              <FieldError show={Boolean(touched.firstName)} message={errors.firstName} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="lastName" className="text-sm text-neutral-700">
                Last name
              </Label>
              <Input
                id="lastName"
                value={data.lastName || ""}
                onChange={(e) => handleChange("lastName", e.target.value)}
                onBlur={() => markTouched("lastName")}
                className="h-10 rounded-xl border-black/10 bg-white"
              />
              <FieldError show={Boolean(touched.lastName)} message={errors.lastName} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm text-neutral-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={data.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => markTouched("email")}
                className="h-10 rounded-xl border-black/10 bg-white"
              />
              <FieldError show={Boolean(touched.email)} message={errors.email} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-sm text-neutral-700">
                Phone
              </Label>
              <Input
                id="phone"
                value={data.phone || ""}
                onChange={(e) => handleChange("phone", e.target.value)}
                onBlur={() => markTouched("phone")}
                className="h-10 rounded-xl border-black/10 bg-white"
              />
              <FieldError show={Boolean(touched.phone)} message={errors.phone} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="location" className="text-sm text-neutral-700">
              Location
            </Label>

            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input
                id="location"
                value={locationInput}
                onChange={(e) => handleLocationInputChange(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={handleLocationBlur}
                placeholder="City or country"
                className="h-10 rounded-xl border-black/10 bg-white pl-9"
              />

              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-xl border border-black/10 bg-white shadow-lg">
                  <div className="max-h-64 overflow-auto py-1">
                    {filteredSuggestions.map((suggestion) => (
                      <button
                        key={suggestion.value}
                        type="button"
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-neutral-50"
                        onClick={() => handleLocationSelect(suggestion)}
                      >
                        <MapPin className="h-4 w-4 text-neutral-400" />
                        <span className="text-neutral-800">{suggestion.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <FieldError show={Boolean(touched.timeZone)} message={errors.timeZone} />
            <p className="text-xs text-neutral-500">
              Used for scheduling sessions.
            </p>
          </div>
        </Card>
<Card title="Demographics">
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
    <div className="space-y-1.5">
      <Label className="text-sm text-neutral-700">Age range</Label>
      <Select value={data.ageRange || ""} onValueChange={(v) => handleChange("ageRange", v)}>
        <SelectTrigger
          onBlur={() => markTouched("ageRange")}
          className="h-10 w-full rounded-xl border-black/10 bg-white"
        >
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          {AGE_RANGES.map((age) => (
            <SelectItem key={age.value} value={age.value}>
              {age.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FieldError show={Boolean(touched.ageRange)} message={errors.ageRange} />
    </div>

    <div className="space-y-1.5">
      <Label htmlFor="citizenship" className="text-sm text-neutral-700">
        Citizenship
      </Label>
      <Input
        id="citizenship"
        value={data.citizenship || ""}
        onChange={(e) => handleChange("citizenship", e.target.value)}
        onBlur={() => markTouched("citizenship")}
        placeholder="e.g., Ghanaian"
        className="h-10 w-full rounded-xl border-black/10 bg-white"
      />
      <FieldError show={Boolean(touched.citizenship)} message={errors.citizenship} />
    </div>

    <div className="space-y-1.5">
      <Label className="text-sm text-neutral-700">Gender</Label>
      <Select value={data.gender || ""} onValueChange={(v) => handleChange("gender", v)}>
        <SelectTrigger
          onBlur={() => markTouched("gender")}
          className="h-10 w-full rounded-xl border-black/10 bg-white"
        >
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          {GENDER_OPTIONS.map((gender) => (
            <SelectItem key={gender.value} value={gender.value}>
              {gender.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FieldError show={Boolean(touched.gender)} message={errors.gender} />
    </div>

    <div className="space-y-1.5">
      <Label className="text-sm text-neutral-700">Marital status</Label>
      <Select
        value={data.maritalStatus || ""}
        onValueChange={(v) => handleChange("maritalStatus", v)}
      >
        <SelectTrigger
          onBlur={() => markTouched("maritalStatus")}
          className="h-10 w-full rounded-xl border-black/10 bg-white"
        >
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          {MARITAL_STATUS_OPTIONS.map((status) => (
            <SelectItem key={status.value} value={status.value}>
              {status.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FieldError show={Boolean(touched.maritalStatus)} message={errors.maritalStatus} />
    </div>

    <div className="space-y-1.5 sm:col-span-2">
      <Label className="text-sm text-neutral-700">Dependents</Label>
      <Select
        value={data.dependents?.toString() || ""}
        onValueChange={(v) => handleChange("dependents", Number(v))}
      >
        <SelectTrigger
          onBlur={() => markTouched("dependents")}
          className="h-10 w-full rounded-xl border-black/10 bg-white"
        >
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          {DEPENDENTS_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <FieldError show={Boolean(touched.dependents)} message={errors.dependents} />
      <p className="text-xs text-neutral-500">Anyone who relies on you financially.</p>
    </div>
  </div>
</Card>


        {/* <Card title="Consent">
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <Checkbox
                id="agree"
                checked={data.agree || false}
                onCheckedChange={(v) => handleChange("agree", Boolean(v))}
                onBlur={() => markTouched("agree")}
                className="mt-0.5"
              />
              <Label htmlFor="agree" className="text-sm text-neutral-700 leading-5">
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
                .
              </Label>
            </div>
            <FieldError show={Boolean(touched.agree)} message={errors.agree} />
          </div>
        </Card> */}

        <Button
          type="submit"
          className="h-11 w-full rounded-full bg-[#1B1856] text-white hover:bg-[#1B1856]/90"
        >
          Continue to Financial MOT
        </Button>
      </form>
    </div>
  );
}
