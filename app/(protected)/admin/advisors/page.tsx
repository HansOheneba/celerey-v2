"use client";
import { Button } from "@/components/ui/button";
import AdvisorTable from "./advisorsTable";
import AdvisorForm from "./advisorForm";
import { useState, useEffect } from "react";

const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Advisor {
  id: number;
  slug: string;
  name: string;
  title: string;
  bio: string;
  experience: string;
  expertise: string[];
  image?: string;
  created_at?: string;
  updated_at?: string;
}

export default function AdvisorsPage() {
  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAdvisor, setEditingAdvisor] = useState<Advisor | null>(null);

  const fetchAdvisors = async () => {
    try {
      const res = await fetch(`${apiBase}/advisors/`);
      if (!res.ok) {
        throw new Error(`Failed to fetch advisors: ${res.status}`);
      }
      const data = await res.json();
      setAdvisors(data);
    } catch (error) {
      console.error("Error fetching advisors:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvisors();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get("edit");
    if (editId && advisors.length > 0) {
      const advisorToEdit = advisors.find((adv) => adv.id === parseInt(editId));
      if (advisorToEdit) {
        openEditForm(advisorToEdit);
        // Clean up URL
        window.history.replaceState({}, "", "/admin/advisors");
      }
    }
  }, [advisors]);

  const handleAddSuccess = () => {
    fetchAdvisors(); 
  };

  const openEditForm = (advisor: Advisor) => {
    setEditingAdvisor(advisor);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingAdvisor(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading advisors...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-[#1B1856]">Advisors</h1>
          <p className="text-gray-500 text-sm">
            Manage the advisors displayed on the Celerey site.
          </p>
        </div>
        <div className="space-x-2">
          <Button variant="outline">Export</Button>
          <Button
            className="bg-[#1B1856] text-white hover:bg-[#1B1856]/90"
            onClick={() => setIsFormOpen(true)}
          >
            Add Advisor
          </Button>
        </div>
      </div>

      {/* Table */}
      <AdvisorTable advisors={advisors} onEdit={openEditForm} />

      {/* Advisor Form Modal */}
      <AdvisorForm
        isOpen={isFormOpen}
        onClose={closeForm}
        onSuccess={handleAddSuccess}
        initialData={editingAdvisor || undefined} // Add this line
      />
    </div>
  );
}
