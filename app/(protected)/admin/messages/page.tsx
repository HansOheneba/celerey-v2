"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
import { Search, Mail, Eye, RefreshCw, Trash2, Edit } from "lucide-react";

interface ContactMessage {
  id: number;
  full_name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied";
  created_at: string;
  updated_at: string;
}

interface ContactStats {
  total_messages: number;
  new_messages: number;
  read_messages: number;
  replied_messages: number;
}

export default function ContactAdminPage() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [stats, setStats] = useState<ContactStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null
  );
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editForm, setEditForm] = useState({
    full_name: "",
    email: "",
    subject: "",
    message: "",
    status: "new" as "new" | "read" | "replied",
  });

  const perPage = 10;

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        per_page: perPage.toString(),
        ...(statusFilter !== "all" && { status: statusFilter }),
      });

      const response = await fetch(`${apiBase}/contact/messages?${params}`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages);
        setTotalPages(data.pages);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${apiBase}/contact/stats`);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchStats();
  }, [currentPage, statusFilter]);

  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);

    // Mark as read if it's new
    if (message.status === "new") {
      updateMessageStatus(message.id, "read");
    }

    setIsDetailOpen(true);
  };

  const updateMessageStatus = async (
    id: number,
    status: "new" | "read" | "replied"
  ) => {
    try {
      const response = await fetch(`${apiBase}/contact/messages/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        // Update local state
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === id
              ? { ...msg, status, updated_at: new Date().toISOString() }
              : msg
          )
        );

        // Update selected message if it's the one being viewed
        if (selectedMessage?.id === id) {
          setSelectedMessage((prev) =>
            prev
              ? { ...prev, status, updated_at: new Date().toISOString() }
              : null
          );
        }

        // Refresh stats
        fetchStats();
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleEditMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    setEditForm({
      full_name: message.full_name,
      email: message.email,
      subject: message.subject,
      message: message.message,
      status: message.status,
    });
    setIsEditOpen(true);
  };

  const updateMessage = async () => {
    if (!selectedMessage) return;

    try {
      const response = await fetch(
        `${apiBase}/contact/messages/${selectedMessage.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editForm),
        }
      );

      if (response.ok) {
        // Refresh messages and close modal
        fetchMessages();
        setIsEditOpen(false);
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };

  const deleteMessage = async (id: number) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const response = await fetch(`${apiBase}/contact/messages/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove from local state
        setMessages((prev) => prev.filter((msg) => msg.id !== id));

        // Refresh stats
        fetchStats();

        // Close modal if viewing the deleted message
        if (selectedMessage?.id === id) {
          setIsDetailOpen(false);
          setSelectedMessage(null);
        }
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      new: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      read: "bg-gray-100 text-gray-800 hover:bg-gray-100",
      replied: "bg-green-100 text-green-800 hover:bg-green-100",
    };

    return (
      <Badge
        variant="secondary"
        className={variants[status as keyof typeof variants]}
      >
        {status.toUpperCase()}
      </Badge>
    );
  };

  const filteredMessages = messages.filter(
    (message) =>
      message.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Contact Messages
          </h1>
          <p className="text-gray-600">
            Manage and respond to customer inquiries
          </p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Messages
                </CardTitle>
                <Mail className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total_messages}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New</CardTitle>
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800"
                >
                  {stats.new_messages}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {stats.new_messages}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Read</CardTitle>
                <Badge
                  variant="secondary"
                  className="bg-gray-100 text-gray-800"
                >
                  {stats.read_messages}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-600">
                  {stats.read_messages}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Replied</CardTitle>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  {stats.replied_messages}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {stats.replied_messages}
                </div>
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
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="read">Read</SelectItem>
                    <SelectItem value="replied">Replied</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={fetchMessages} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Messages Table */}
        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex justify-center items-center p-12">
                <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMessages.map((message) => (
                    <TableRow key={message.id} className="hover:bg-gray-50/50">
                      <TableCell className="font-medium">
                        {message.full_name}
                      </TableCell>
                      <TableCell>{message.email}</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {message.subject || "No subject"}
                      </TableCell>
                      <TableCell>{getStatusBadge(message.status)}</TableCell>
                      <TableCell>
                        {new Date(message.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewMessage(message)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditMessage(message)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteMessage(message.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {!loading && filteredMessages.length === 0 && (
              <div className="text-center p-12 text-gray-500">
                No messages found
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-6">
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
        )}

        {/* Message Detail Dialog */}
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            {selectedMessage && (
              <>
                <DialogHeader>
                  <DialogTitle>Message Details</DialogTitle>
                  <DialogDescription>
                    From {selectedMessage.full_name} • {selectedMessage.email}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Status and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {getStatusBadge(selectedMessage.status)}
                      <span className="text-sm text-gray-500">
                        Received:{" "}
                        {new Date(selectedMessage.created_at).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Select
                        value={selectedMessage.status}
                        onValueChange={(value: "new" | "read" | "replied") =>
                          updateMessageStatus(selectedMessage.id, value)
                        }
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="read">Read</SelectItem>
                          <SelectItem value="replied">Replied</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteMessage(selectedMessage.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Subject */}
                  {selectedMessage.subject && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Subject
                      </h3>
                      <p className="text-gray-700">{selectedMessage.subject}</p>
                    </div>
                  )}

                  {/* Message */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Message
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {selectedMessage.message}
                      </p>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-4 pt-4 border-t">
                    <Button asChild variant="outline">
                      <a
                        href={`mailto:${selectedMessage.email}?subject=Re: ${
                          selectedMessage.subject || "Your inquiry"
                        }`}
                      >
                        Reply via Email
                      </a>
                    </Button>
                    <Button
                      onClick={() =>
                        updateMessageStatus(selectedMessage.id, "replied")
                      }
                      variant="default"
                    >
                      Mark as Replied
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Message Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Message</DialogTitle>
              <DialogDescription>Update the message details</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <Input
                    value={editForm.full_name}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        full_name: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Subject
                </label>
                <Input
                  value={editForm.subject}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      subject: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Status
                </label>
                <Select
                  value={editForm.status}
                  onValueChange={(value: "new" | "read" | "replied") =>
                    setEditForm((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="read">Read</SelectItem>
                    <SelectItem value="replied">Replied</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  value={editForm.message}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  rows={6}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button onClick={updateMessage}>Save Changes</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
