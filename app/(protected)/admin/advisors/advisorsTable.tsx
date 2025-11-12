"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Advisor } from "@/lib/advisors";
import Image from "next/image";

interface AdvisorTableProps {
  advisors: Advisor[];
  onEdit: (advisor: Advisor) => void;
}

export default function AdvisorTable({ advisors, onEdit }: AdvisorTableProps) {
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this advisor?")) {
      return;
    }

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${apiBase}/advisors/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete advisor");
      }

      // Refresh the page or update state
      window.location.reload();
    } catch (error) {
      console.error("Error deleting advisor:", error);
      alert("Failed to delete advisor. Please try again.");
    }
  };

  if (!advisors || advisors.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-8 text-center text-gray-500">
          No advisors found. Add some advisors to get started.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600 border-b">
          <tr>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Title</th>
            <th className="py-3 px-4 text-left">Expertise</th>
            <th className="py-3 px-4 text-left">Experience</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {advisors.map((adv, i) => (
            <tr
              key={adv.id || i}
              className="border-b hover:bg-gray-50 transition-colors"
            >
              <td className="py-3 px-4 flex items-center gap-3">
                <Image
                  src={adv.image || "/placeholder-avatar.png"}
                  alt={adv.name}
                  className="w-10 h-10 rounded-full object-cover border"
                  width={40}
                  height={40}
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder-avatar.png";
                  }}
                />
                <span className="font-medium text-gray-800">{adv.name}</span>
              </td>
              <td className="py-3 px-4">{adv.title}</td>
              <td className="py-3 px-4">{adv.expertise?.length || 0} areas</td>
              <td className="py-3 px-4 truncate max-w-xs text-gray-600">
                {adv.experience?.substring(0, 100)}
                {adv.experience && adv.experience.length > 100 ? "..." : ""}
              </td>
              <td className="py-3 px-4 text-right flex justify-end gap-3">
                <Link href={`/admin/advisors/${adv.slug}`}>
                  <Button variant="outline" size="icon">
                    <Eye className="w-4 h-4" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onEdit(adv)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(adv.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-4 text-sm text-gray-500 border-t">
        Showing {advisors.length} advisor{advisors.length !== 1 ? "s" : ""}
      </div>
    </div>
  );
}
