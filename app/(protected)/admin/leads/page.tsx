"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Mail, Eye, RefreshCw, Calendar } from "lucide-react";

interface Lead {
  id: number;
  email: string;
  source: "newsletter" | "wealth_scan" | "contact_form";
  created_at: string;
}

interface LeadStats {
  total_leads: number;
  newsletter_leads: number;
  wealth_scan_leads: number;
  contact_form_leads: number;
  recent_leads: number;
}

export default function LeadsAdminPage() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<LeadStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLeads, setTotalLeads] = useState(0);
  const perPage = 20;

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        per_page: perPage.toString(),
        ...(sourceFilter !== "all" && { source: sourceFilter }),
      });

      const response = await fetch(`${apiBase}/leads?${params}`);
      if (response.ok) {
        const data = await response.json();
        setLeads(data.leads);
        setTotalPages(data.pages);
        setTotalLeads(data.total);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // We'll calculate stats from the first page of each source
      const sources = ["newsletter", "wealth_scan", "contact_form"];
      const statsPromises = sources.map(async (source) => {
        const response = await fetch(
          `${apiBase}/leads?source=${source}&per_page=1`
        );
        if (response.ok) {
          const data = await response.json();
          return { source, count: data.total };
        }
        return { source, count: 0 };
      });

      const results = await Promise.all(statsPromises);
      const totalResponse = await fetch(`${apiBase}/leads?per_page=1`);
      const totalData = totalResponse.ok
        ? await totalResponse.json()
        : { total: 0 };

      const statsData: LeadStats = {
        total_leads: totalData.total || 0,
        newsletter_leads:
          results.find((r) => r.source === "newsletter")?.count || 0,
        wealth_scan_leads:
          results.find((r) => r.source === "wealth_scan")?.count || 0,
        contact_form_leads:
          results.find((r) => r.source === "contact_form")?.count || 0,
        recent_leads: 0, // We'll calculate this from the leads data
      };

      // Calculate recent leads (last 7 days)
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      if (leads.length > 0) {
        const recentCount = leads.filter((lead) => {
          const leadDate = new Date(lead.created_at);
          return leadDate >= oneWeekAgo;
        }).length;
        statsData.recent_leads = recentCount;
      }

      setStats(statsData);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDetailOpen(true);
  };

  const deleteLead = async (id: number) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;

    try {
      const response = await fetch(`${apiBase}/leads/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove from local state
        setLeads((prev) => prev.filter((lead) => lead.id !== id));
        setTotalLeads((prev) => prev - 1);

        // Refresh stats
        fetchStats();

        // Close modal if viewing the deleted lead
        if (selectedLead?.id === id) {
          setIsDetailOpen(false);
          setSelectedLead(null);
        }
      }
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };

  const getSourceBadge = (source: string) => {
    const variants = {
      newsletter: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      wealth_scan: "bg-purple-100 text-purple-800 hover:bg-purple-100",
      contact_form: "bg-green-100 text-green-800 hover:bg-green-100",
    };

    return (
      <Badge
        variant="secondary"
        className={variants[source as keyof typeof variants]}
      >
        {source.replace("_", " ").toUpperCase()}
      </Badge>
    );
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "newsletter":
        return "";
      case "wealth_scan":
        return "";
      case "contact_form":
        return "";
      default:
        return "";
    }
  };

  const exportLeads = async () => {
    try {
      const response = await fetch(`${apiBase}/leads?per_page=1000`);
      if (response.ok) {
        const data = await response.json();
        const csvContent = [
          ["ID", "Email", "Source", "Created At"],
          ...data.leads.map((lead: Lead) => [
            lead.id,
            lead.email,
            lead.source,
            lead.created_at,
          ]),
        ]
          .map((row) => row.join(","))
          .join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error exporting leads:", error);
    }
  };



  useEffect(() => {
    fetchLeads();
  }, [currentPage, sourceFilter]);

  useEffect(() => {
    fetchStats();
  }, [leads]);

  const filteredLeads = leads.filter((lead) =>
    lead.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Leads Management
          </h1>
          <p className="text-gray-600">
            View and manage all lead submissions from various sources
          </p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Leads
                </CardTitle>
                <Mail className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total_leads}</div>
                <p className="text-xs text-gray-500">All time</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Newsletter
                </CardTitle>
                <div className="text-lg">📧</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {stats.newsletter_leads}
                </div>
                <p className="text-xs text-gray-500">Email signups</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Wealth Scan
                </CardTitle>
                <div className="text-lg">💰</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {stats.wealth_scan_leads}
                </div>
                <p className="text-xs text-gray-500">Financial tool</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Contact Form
                </CardTitle>
                <div className="text-lg">📝</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {stats.contact_form_leads}
                </div>
                <p className="text-xs text-gray-500">Website contact</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Recent (7d)
                </CardTitle>
                <Calendar className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {stats.recent_leads}
                </div>
                <p className="text-xs text-gray-500">Last week</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex flex-1 gap-4 items-center">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={sourceFilter} onValueChange={setSourceFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    <SelectItem value="newsletter">Newsletter</SelectItem>
                    <SelectItem value="wealth_scan">Wealth Scan</SelectItem>
                    <SelectItem value="contact_form">Contact Form</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button onClick={exportLeads} variant="outline" size="sm">
                  Export CSV
                </Button>
               
                <Button onClick={fetchLeads} variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leads Table */}
        <Card>
          <CardHeader>
            <CardTitle>Leads</CardTitle>
            <CardDescription>
              Showing {filteredLeads.length} of {totalLeads} leads
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex justify-center items-center p-12">
                <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={lead.id} className="hover:bg-gray-50/50">
                      <TableCell className="font-mono text-sm">
                        #{lead.id}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          {lead.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">
                            {getSourceIcon(lead.source)}
                          </span>
                          {getSourceBadge(lead.source)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>
                            {new Date(lead.created_at).toLocaleDateString()}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(lead.created_at).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewLead(lead)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteLead(lead.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {!loading && filteredLeads.length === 0 && (
              <div className="text-center p-12 text-gray-500">
                No leads found
                {searchTerm && ` for "${searchTerm}"`}
                {sourceFilter !== "all" &&
                  ` from ${sourceFilter.replace("_", " ")}`}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-600">
              Showing page {currentPage} of {totalPages} • {totalLeads} total
              leads
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Lead Detail Dialog */}
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-2xl">
            {selectedLead && (
              <>
                <DialogHeader>
                  <DialogTitle>Lead Details</DialogTitle>
                  <DialogDescription>Lead #{selectedLead.id}</DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Email */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      Email Address
                    </h3>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <a
                        href={`mailto:${selectedLead.email}`}
                        className="text-lg font-medium text-blue-600 hover:underline"
                      >
                        {selectedLead.email}
                      </a>
                    </div>
                  </div>

                  {/* Source */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      Source
                    </h3>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-2xl">
                        {getSourceIcon(selectedLead.source)}
                      </span>
                      <div>
                        <div className="font-medium">
                          {selectedLead.source.replace("_", " ").toUpperCase()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {selectedLead.source === "newsletter" &&
                            "Email newsletter signup"}
                          {selectedLead.source === "wealth_scan" &&
                            "Wealth scanning tool"}
                          {selectedLead.source === "contact_form" &&
                            "Website contact form"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timestamps */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">
                        Created At
                      </h3>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium">
                          {new Date(
                            selectedLead.created_at
                          ).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(
                            selectedLead.created_at
                          ).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">
                        Lead ID
                      </h3>
                      <div className="p-3 bg-gray-50 rounded-lg font-mono">
                        #{selectedLead.id}
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-4 pt-4 border-t">
                    <Button asChild variant="outline" className="flex-1">
                      <a href={`mailto:${selectedLead.email}`}>Send Email</a>
                    </Button>
                    <Button
                      onClick={() => deleteLead(selectedLead.id)}
                      variant="destructive"
                      className="flex-1"
                    >
                      Delete Lead
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
