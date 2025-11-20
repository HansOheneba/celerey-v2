"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Plan } from "./plan-form"; // Make sure the import path is correct

export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPlans = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/plans`);
      console.log("RAW RESPONSE:", res);

      const text = await res.text();
      console.log("RAW RESPONSE BODY:", text);

      try {
        const json: Plan[] = JSON.parse(text);
        setPlans(json);
      } catch (err) {
        console.error("JSON PARSE ERROR:", err);
      }
    } catch (err) {
      console.error("FETCH ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  const deletePlan = async (id: number) => {
    if (!confirm("Are you sure?")) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/plans/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete plan");
      }

      setPlans((prev) => prev.filter((plan) => plan.id !== id));
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      }
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Plans</h1>
        <Link href="/admin/plans/new">
          <Button>Add New Plan</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="border p-4 rounded-lg shadow-sm flex justify-between"
          >
            <div>
              <h2 className="font-bold text-lg">{plan.name}</h2>
              <p className="text-sm text-gray-600">{plan.tagline}</p>
              <p className="mt-1 font-semibold">${plan.price}</p>
            </div>

            <div className="flex gap-3">
              <Link href={`/admin/plans/edit/${plan.id}`}>
                <Button variant="outline">Edit</Button>
              </Link>
              <Button
                variant="destructive"
                onClick={() => deletePlan(plan.id!)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
