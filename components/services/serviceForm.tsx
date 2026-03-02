// components/services/ServiceInquiryDialog.tsx
"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type ConciergeService = {
  id: string;
  title: string;
  subtitle?: string;
};

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
};

type ServiceInquiryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: ConciergeService | null;

  // optional: wire this to your API later
  onSubmit?: (payload: {
    service: ConciergeService;
    fullName: string;
    email: string;
    phone: string;
    message: string;
  }) => Promise<void> | void;
};

export function ServiceInquiryDialog({
  open,
  onOpenChange,
  service,
  onSubmit,
}: ServiceInquiryDialogProps) {
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  React.useEffect(() => {
    if (!open) return;
    // when opening, prefill message with the service (optional)
    setForm((prev) => ({
      ...prev,
      message:
        prev.message.trim().length > 0
          ? prev.message
          : service
            ? `I am interested in: ${service.title}\n\n`
            : "",
    }));
  }, [open, service]);

  const canSubmit =
    Boolean(service) &&
    form.fullName.trim().length > 1 &&
    form.email.trim().length > 3 &&
    form.phone.trim().length > 5;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!service || !canSubmit) return;

    setLoading(true);
    try {
      await onSubmit?.({
        service,
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        message: form.message.trim(),
      });

      // reset and close
      setForm({ fullName: "", email: "", phone: "", message: "" });
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px] rounded-[22px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-neutral-900">
            {service ? "Request this service" : "Request a service"}
          </DialogTitle>
        </DialogHeader>

        {service && (
          <div className="rounded-2xl border border-black/10 bg-neutral-50 px-4 py-3">
            <p className="text-xs tracking-[0.22em] text-neutral-500">
              SELECTED SERVICE
            </p>
            <p className="mt-1 text-sm font-semibold text-neutral-900">
              {service.title}
            </p>
            {service.subtitle && (
              <p className="mt-1 text-xs leading-5 text-neutral-600">
                {service.subtitle}
              </p>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-2 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                value={form.fullName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, fullName: e.target.value }))
                }
                placeholder="Your name"
                autoComplete="name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={(e) =>
                  setForm((p) => ({ ...p, phone: e.target.value }))
                }
                placeholder="e.g. +233..."
                autoComplete="tel"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={form.email}
              onChange={(e) =>
                setForm((p) => ({ ...p, email: e.target.value }))
              }
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Notes</Label>
            <Textarea
              id="message"
              value={form.message}
              onChange={(e) =>
                setForm((p) => ({ ...p, message: e.target.value }))
              }
              placeholder="Tell us what you are trying to solve, timelines, and any constraints."
              className="min-h-[120px]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-1">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="rounded-full"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={!canSubmit || loading}
              className="rounded-full"
            >
              {loading ? "Sending..." : "Submit request"}
            </Button>
          </div>

          {!service && (
            <p className="text-xs text-neutral-500">
              Select a service first, then your details can be submitted.
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
