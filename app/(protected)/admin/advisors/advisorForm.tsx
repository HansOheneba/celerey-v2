"use client";

import { useState, useRef, useEffect } from "react"; // Add useEffect
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { X, Upload, Loader2 } from "lucide-react";
import Image from "next/image";

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

interface AdvisorFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Advisor;
}

interface AdvisorFormData {
  slug: string;
  name: string;
  title: string;
  bio: string;
  experience: string;
  expertise: string[];
  image?: string;
}

interface ImgBBResponse {
  data: {
    id: string;
    title: string;
    url_viewer: string;
    url: string;
    display_url: string;
    width: string;
    height: string;
    size: number;
    time: string;
    expiration: string;
    image: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    thumb: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    medium: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    delete_url: string;
  };
  success: boolean;
  status: number;
}

export default function AdvisorForm({
  isOpen,
  onClose,
  onSuccess,
  initialData,
}: AdvisorFormProps) {
  const [formData, setFormData] = useState<AdvisorFormData>({
    slug: "",
    name: "",
    title: "",
    bio: "",
    experience: "",
    expertise: [],
  });
  const [currentExpertise, setCurrentExpertise] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  const imgBBApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  // Reset form when initialData changes or modal opens/closes
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // Editing mode - populate with existing data
        setFormData({
          slug: initialData.slug || "",
          name: initialData.name || "",
          title: initialData.title || "",
          bio: initialData.bio || "",
          experience: initialData.experience || "",
          expertise: initialData.expertise || [],
          image: initialData.image || "",
        });
        setCurrentExpertise("");
      } else {
        // Add mode - reset form
        setFormData({
          slug: "",
          name: "",
          title: "",
          bio: "",
          experience: "",
          expertise: [],
        });
        setCurrentExpertise("");
      }
    }
  }, [initialData, isOpen]); // Reset when initialData or isOpen changes

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addExpertise = () => {
    if (
      currentExpertise.trim() &&
      !formData.expertise.includes(currentExpertise.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        expertise: [...prev.expertise, currentExpertise.trim()],
      }));
      setCurrentExpertise("");
    }
  };

  const removeExpertise = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      expertise: prev.expertise.filter((_, i) => i !== index),
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addExpertise();
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file (PNG, JPG, JPEG)");
      return;
    }

    // Validate file size (32MB max for imgBB)
    if (file.size > 32 * 1024 * 1024) {
      alert("File size must be less than 32MB");
      return;
    }

    setIsUploading(true);

    try {
      console.log("Starting imgBB upload...");

      const uploadFormData = new FormData();
      uploadFormData.append("key", imgBBApiKey!);
      uploadFormData.append("image", file);

      console.log("File details:", {
        name: file.name,
        type: file.type,
        size: file.size,
      });

      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: uploadFormData,
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Upload failed with response:", errorText);
        throw new Error(
          `Upload failed: ${response.status} ${response.statusText}`
        );
      }

      const data: ImgBBResponse = await response.json();
      console.log("Upload successful:", data);

      if (data.success) {
        setFormData((prev) => ({
          ...prev,
          image: data.data.url, // Use the direct image URL
        }));
      } else {
        throw new Error("Upload was not successful according to imgBB");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert(
        `Failed to upload image: ${
          error instanceof Error ? error.message : "Unknown error"
        }. Please try again.`
      );
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = initialData
        ? `${apiBase}/advisors/${initialData.id}`
        : `${apiBase}/advisors/`;

      const method = initialData ? "PUT" : "POST";

      console.log("Submitting advisor data:", formData);

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Save failed:", errorText);
        throw new Error("Failed to save advisor");
      }

      console.log("Advisor saved successfully");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error saving advisor:", error);
      alert("Failed to save advisor. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-[#1B1856]">
            {initialData ? "Edit Advisor" : "Add New Advisor"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-2">
          {/* Image Upload */}
          <div>
            <Label>Profile Image</Label>
            <div className="mt-2">
              {formData.image ? (
                <div className="relative inline-block">
                  <Image
                    src={formData.image}
                    width={120}
                    height={120}
                    alt="Profile preview"
                    className="rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, image: undefined }))
                    }
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*"
                    className="hidden"
                  />
                  <div
                    onClick={handleUploadClick}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
                  >
                    {isUploading ? (
                      <Loader2 className="w-8 h-8 text-gray-400 animate-spin mx-auto" />
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          Click to upload image
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG, JPEG up to 32MB
                        </p>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Slug *</Label>
              <Input
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                required
                placeholder="john-doe"
              />
            </div>
            <div>
              <Label>Full Name *</Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="John Doe"
              />
            </div>
          </div>

          <div>
            <Label>Title *</Label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="Senior Financial Advisor"
            />
          </div>

          {/* Expertise */}
          <div>
            <Label>Areas of Expertise</Label>
            <div className="flex gap-2 mt-2">
              <Input
                value={currentExpertise}
                onChange={(e) => setCurrentExpertise(e.target.value)}
                placeholder="Add expertise area"
                onKeyPress={handleKeyPress}
              />
              <Button type="button" onClick={addExpertise} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.expertise.map((exp, index) => (
                <div
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {exp}
                  <button
                    type="button"
                    onClick={() => removeExpertise(index)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div>
            <Label>Bio *</Label>
            <Textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              required
              rows={4}
              placeholder="Brief biography of the advisor..."
            />
          </div>

          {/* Experience */}
          <div>
            <Label>Experience *</Label>
            <Textarea
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              required
              rows={4}
              placeholder="Professional experience and background..."
            />
          </div>

          {/* Actions */}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#1B1856] text-white hover:bg-[#1B1856]/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  {initialData ? "Updating..." : "Adding..."}
                </>
              ) : initialData ? (
                "Update Advisor"
              ) : (
                "Add Advisor"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
