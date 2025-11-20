"use client";

import { useEffect, useState } from "react";
import PlanForm from "../../plan-form";
import { useParams } from "next/navigation";
import type { Plan } from "../../plan-form"; // adjust the import path

export default function EditPlan() {
  const { id } = useParams(); // id will be a string
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPlan = async () => {
    if (!id) return; // safeguard

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/plans/${id}`
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch plan: ${res.statusText}`);
      }

      const data: Plan = await res.json();
      setPlan(data);
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlan();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!plan) return <p>Plan not found</p>;

  return <PlanForm mode="edit" plan={plan} />;
}
