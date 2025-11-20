"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type BillingCycle = "one_time" | "yearly";

export interface Plan {
  id?: number;
  name: string;
  tagline: string;
  description: string;
  price: number;
  billing_cycle: BillingCycle;
  features: string[];
  payment_link: string;
  button_text: string;
  popular: boolean;
}

interface PlanFormProps {
  mode: "create" | "edit";
  plan?: Plan;
}

export default function PlanForm({ mode, plan }: PlanFormProps) {
  const [name, setName] = useState(plan?.name || "");
  const [tagline, setTagline] = useState(plan?.tagline || "");
  const [description, setDescription] = useState(plan?.description || "");
  const [price, setPrice] = useState<string>(plan?.price?.toString() || "");
  const [billing, setBilling] = useState<BillingCycle>(
    plan?.billing_cycle || "one_time"
  );
  const [paymentLink, setPaymentLink] = useState(plan?.payment_link || "");
  const [buttonText, setButtonText] = useState(
    plan?.button_text || "Get Started"
  );
  const [popular, setPopular] = useState(plan?.popular || false);

  const [features, setFeatures] = useState<string[]>(plan?.features || []);
  const [newFeature, setNewFeature] = useState("");

  const addFeature = () => {
    if (!newFeature.trim()) return;
    setFeatures([...features, newFeature]);
    setNewFeature("");
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const submitForm = async () => {
    const payload: Plan = {
      name,
      tagline,
      description,
      price: parseFloat(price),
      billing_cycle: billing,
      features,
      payment_link: paymentLink,
      button_text: buttonText,
      popular,
    };

    try {
      const url =
        mode === "create"
          ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/plans/`
          : `${process.env.NEXT_PUBLIC_API_BASE_URL}/plans/${plan?.id}`;

      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      alert(
        mode === "create"
          ? "Plan added successfully"
          : "Plan updated successfully"
      );
      window.location.href = "/admin/plans";
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      }
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">
        {mode === "create" ? "Add New Plan" : "Edit Plan"}
      </h1>

      <div className="space-y-5">
        {/* Plan Name */}
        <div className="space-y-1">
          <label className="font-medium">Plan Name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Essentials"
          />
        </div>

        {/* Tagline */}
        <div className="space-y-1">
          <label className="font-medium">Tagline</label>
          <Input
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="Your Financial Clarity Starts Here"
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="font-medium">Description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Full description of the plan..."
          />
        </div>

        {/* Price */}
        <div className="space-y-1">
          <label className="font-medium">Price (USD)</label>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="99"
          />
        </div>

        {/* Billing */}
        <div className="space-y-1">
          <label className="font-medium">Billing Cycle</label>
          <Input
            value={billing}
            onChange={(e) => setBilling(e.target.value as BillingCycle)}
            placeholder="one_time or yearly"
          />
        </div>

        {/* Payment Link */}
        <div className="space-y-1">
          <label className="font-medium">Payment Link</label>
          <Input
            value={paymentLink}
            onChange={(e) => setPaymentLink(e.target.value)}
            placeholder="https://paystack.com/pay/..."
          />
        </div>

        {/* Button Text */}
        <div className="space-y-1">
          <label className="font-medium">Button Text</label>
          <Input
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
            placeholder="Get Started"
          />
        </div>

        {/* Popular */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={popular}
            onChange={(e) => setPopular(e.target.checked)}
          />
          <label className="font-medium">Mark as Popular</label>
        </div>

        {/* Features */}
        <div className="space-y-2">
          <label className="font-medium">Plan Features</label>

          <div className="flex gap-2">
            <Input
              placeholder="Add a feature"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
            />
            <Button onClick={addFeature}>Add</Button>
          </div>

          <div className="space-y-2">
            {features.map((feature, i) => (
              <div
                key={i}
                className="flex justify-between items-center border p-2 rounded-md"
              >
                <span>{feature}</span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeFeature(i)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <Button className="w-full" onClick={submitForm}>
          {mode === "create" ? "Create Plan" : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
