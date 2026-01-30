// app/onboarding/components/PersonalInfoPage.tsx
"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useOnboardingStore } from '../hooks/useOnboardingStore';

const LOCATIONS = [
  { value: "Africa/Accra", label: "Africa/Accra (GMT)" },
  { value: "Europe/London", label: "Europe/London" },
  { value: "Europe/Paris", label: "Europe/Paris" },
  { value: "America/New_York", label: "America/New_York" },
  { value: "America/Los_Angeles", label: "America/Los_Angeles" },
  { value: "Asia/Dubai", label: "Asia/Dubai" },
];

export function PersonalInfoPage() {
  const router = useRouter();
  const { data, updateData, completeStep, setStep } = useOnboardingStore();
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});

  // Pre-populate from localStorage on mount
  useEffect(() => {
    // You can add logic here to pre-populate if needed
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!data.firstName.trim()) newErrors.firstName = "First name is required";
    if (!data.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!data.email.trim()) newErrors.email = "Email is required";
    if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) 
      newErrors.email = "Enter a valid email";
    if (!data.phone.trim()) newErrors.phone = "Phone number is required";
    if (!data.timeZone) newErrors.timeZone = "Select your location";
    if (!data.agree) newErrors.agree = "You must agree to continue";
    
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Mark all as touched to show errors
      setTouched({
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        timeZone: true,
        agree: true,
      });
      return;
    }

    completeStep(1);
    setStep(2);
    router.push('/onboarding?step=2');
  };

  const markTouched = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleChange = (field: keyof typeof data, value: any) => {
    updateData({ [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-neutral-900 sm:text-4xl">
          Personal Information
        </h1>
        <p className="mt-2 text-sm text-neutral-600 sm:text-base">
          Let's start with your basic details
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* First + Last */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-neutral-700">
              First Name
            </Label>
            <Input
              id="firstName"
              value={data.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              onBlur={() => markTouched('firstName')}
              className="h-12 rounded-xl border-black/10 bg-white"
            />
            {touched.firstName && errors.firstName ? (
              <p className="text-xs text-red-600">{errors.firstName}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-neutral-700">
              Last Name
            </Label>
            <Input
              id="lastName"
              value={data.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              onBlur={() => markTouched('lastName')}
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
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => markTouched('email')}
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
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            onBlur={() => markTouched('phone')}
            className="h-12 rounded-xl border-black/10 bg-white"
          />
          {touched.phone && errors.phone ? (
            <p className="text-xs text-red-600">{errors.phone}</p>
          ) : null}
        </div>

        {/* Location (formerly timeZone) */}
        <div className="space-y-2">
          <Label className="text-neutral-700">Location</Label>
          <Select
            value={data.timeZone}
            onValueChange={(v) => handleChange('timeZone', v)}
          >
            <SelectTrigger
              onBlur={() => markTouched('timeZone')}
              className="h-12 rounded-xl border-black/10 bg-white"
            >
              <SelectValue placeholder="Select your location" />
            </SelectTrigger>
            <SelectContent>
              {LOCATIONS.map((location) => (
                <SelectItem key={location.value} value={location.value}>
                  {location.label}
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
              checked={data.agree}
              onCheckedChange={(v) => handleChange('agree', Boolean(v))}
              onBlur={() => markTouched('agree')}
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

        {/* Submit */}
        <Button
          type="submit"
          className="h-12 w-full rounded-full bg-neutral-900 text-white hover:bg-neutral-800"
        >
          Continue to Financial MOT
        </Button>
      </form>
    </div>
  );
}