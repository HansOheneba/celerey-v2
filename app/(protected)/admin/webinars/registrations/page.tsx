"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Registration {
  id: number;
  email: string;
  full_name: string;
  status: string;
  created_at: string;
  invited_at: string | null;
}

interface Stats {
  total_registrations: number;
  pending: number;
  invited: number;
  attended: number;
  cancelled: number;
}

export default function WebinarRegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    fetchRegistrations();
    fetchStats();
  }, [apiBase, statusFilter]);

  const fetchRegistrations = async () => {
    try {
      const url = statusFilter
        ? `${apiBase}/webinars/registrations?status=${statusFilter}`
        : `${apiBase}/webinars/registrations`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setRegistrations(data);
      }
    } catch (error) {
      console.error("Error fetching registrations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch(`${apiBase}/webinars/stats`);
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const response = await fetch(`${apiBase}/webinars/registrations/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      await fetchRegistrations();
      await fetchStats();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  const deleteRegistration = async (id: number) => {
    if (!confirm("Are you sure you want to delete this registration?")) {
      return;
    }

    try {
      const response = await fetch(`${apiBase}/webinars/registrations/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete registration");
      }

      await fetchRegistrations();
      await fetchStats();
    } catch (error) {
      console.error("Error deleting registration:", error);
      alert("Failed to delete registration. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading registrations...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#1B1856]">
          Webinar Registrations
        </h1>
        <p className="text-gray-500 text-sm">
          Manage webinar registrations and track attendance.
        </p>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-lg border text-center">
            <div className="text-2xl font-bold text-[#1B1856]">
              {stats.total_registrations}
            </div>
            <div className="text-sm text-gray-500">Total</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border text-center">
            <div className="text-2xl font-bold text-yellow-700">
              {stats.pending}
            </div>
            <div className="text-sm text-yellow-600">Pending</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border text-center">
            <div className="text-2xl font-bold text-blue-700">
              {stats.invited}
            </div>
            <div className="text-sm text-blue-600">Invited</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border text-center">
            <div className="text-2xl font-bold text-green-700">
              {stats.attended}
            </div>
            <div className="text-sm text-green-600">Attended</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border text-center">
            <div className="text-2xl font-bold text-red-700">
              {stats.cancelled}
            </div>
            <div className="text-sm text-red-600">Cancelled</div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Label>Filter by Status</Label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="invited">Invited</option>
            <option value="attended">Attended</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Registrations Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Registered</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg) => (
              <tr key={reg.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{reg.email}</td>
                <td className="p-3">{reg.full_name || "-"}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      reg.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : reg.status === "invited"
                        ? "bg-blue-100 text-blue-800"
                        : reg.status === "attended"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {reg.status}
                  </span>
                </td>
                <td className="p-3 text-gray-500">
                  {new Date(reg.created_at).toLocaleDateString()}
                </td>
                <td className="p-3 space-x-2">
                  <select
                    value={reg.status}
                    onChange={(e) => updateStatus(reg.id, e.target.value)}
                    className="text-sm border rounded p-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="invited">Invited</option>
                    <option value="attended">Attended</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteRegistration(reg.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {registrations.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No registrations found.
          </div>
        )}
      </div>
    </div>
  );
}
