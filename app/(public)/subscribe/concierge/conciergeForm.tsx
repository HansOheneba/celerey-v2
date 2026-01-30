"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const conciergeFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  company: z.string().optional(),
  specialRequirements: z.string().optional(),
});

type ConciergeFormValues = z.infer<typeof conciergeFormSchema>;

interface ServiceOption {
  id: string;
  name: string;
  pricingType: string;
}

interface ConciergeFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedServices: ServiceOption[];
  notes: string;
}

export function ConciergeForm({
  open,
  onOpenChange,
  selectedServices,
  notes,
}: ConciergeFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ConciergeFormValues>({
    resolver: zodResolver(conciergeFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      specialRequirements: "",
    },
  });

  const onSubmit = async (data: ConciergeFormValues) => {
    if (selectedServices.length === 0) {
      toast.error("Please select at least one service");
      return;
    }

    setIsSubmitting(true);

    // Show loading toast
    const toastId = toast.loading("Submitting your request...");

    try {
      const payload = {
        contact: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          company: data.company || "",
        },
        selectedServices: selectedServices.map((s) => ({
          id: s.id,
          name: s.name,
          pricingType: s.pricingType,
        })),
        specialRequirements: data.specialRequirements || "",
        notes: notes || "",
        additionalContext: "",
      };

      console.log("Submitting to API:", payload);

      // Get the API base URL from environment
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      // const apiBaseUrl = "http://localhost:5000/api"; 
      
      if (!apiBaseUrl) {
        throw new Error("API base URL is not configured");
      }

      const apiUrl = `${apiBaseUrl}/concierge`;
      console.log("API URL:", apiUrl);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.ok) {
        console.log("Success! Submission ID:", result.submissionId);
        
        // Update toast to success
        toast.success(result.message || "Request submitted successfully!", {
          id: toastId,
          duration: 5000,
        });

        // Clear form and close modal
        form.reset();
        onOpenChange(false);
        
        // Optional: Clear session storage if you were using it
        sessionStorage.removeItem("conciergeSubmission");
        
      } else {
        // Handle validation errors
        if (result.error === "VALIDATION_ERROR" && result.details) {
          const errors = result.details;
          let errorMessage = "Please fix the following errors:\n\n";
          
          Object.keys(errors).forEach(key => {
            errorMessage += `• ${errors[key]}\n`;
          });
          
          toast.error("Validation Error", {
            id: toastId,
            description: errorMessage,
            duration: 10000,
          });
          
          // Highlight form fields with errors
          Object.keys(errors).forEach(field => {
            if (field.startsWith("contact.")) {
              const fieldName = field.replace("contact.", "");
              form.setError(fieldName as any, {
                type: "manual",
                message: errors[field]
              });
            }
          });
          
        } else {
          toast.error("Submission Failed", {
            id: toastId,
            description: result.message || "Please try again.",
            duration: 5000,
          });
        }
      }

    } catch (error: any) {
      console.error("Submission error:", error);
      
      // Network error or other issues
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        toast.error("Network Error", {
          id: toastId,
          description: "Please check your internet connection and try again.",
          duration: 5000,
        });
      } else if (error.message.includes("API base URL")) {
        toast.error("Configuration Error", {
          id: toastId,
          description: error.message,
          duration: 5000,
        });
      } else {
        toast.error("Unexpected Error", {
          id: toastId,
          description: "An unexpected error occurred. Please try again later.",
          duration: 5000,
        });
      }
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Complete Your Request</DialogTitle>
          <DialogDescription>
            Tell us how to reach you and we'll get started on your quote.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="john@example.com" 
                      type="email" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="+1 (555) 000-0000" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Company" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specialRequirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Requirements or Context (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Any complex situations, business ownership, cross-border issues, etc."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Display selected services summary */}
            {selectedServices.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Selected Services ({selectedServices.length}):
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {selectedServices.map((service) => (
                    <li key={service.id} className="flex justify-between">
                      <span>{service.name}</span>
                      <span className="text-gray-500 text-xs capitalize">{service.pricingType}</span>
                    </li>
                  ))}
                </ul>
                {notes && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-1">Additional Notes:</p>
                    <p className="text-sm text-gray-600">{notes}</p>
                  </div>
                )}
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting || selectedServices.length === 0}
              className="w-full bg-[#1B1856] hover:bg-[#1B1856]/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Request"
              )}
            </Button>
            
            <p className="text-xs text-gray-500 text-center">
              By submitting, you agree to be contacted regarding your concierge request.
            </p>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}