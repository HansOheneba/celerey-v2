"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { X, Loader2 } from "lucide-react";
import { use } from "react";

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

interface AdvisorFormData {
  slug: string;
  name: string;
  title: string;
  bio: string;
  experience: string;
  expertise: string[];
  image?: string;
}

export default function AdvisorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Unwrap the params promise
  const { slug } = use(params);

  const [advisor, setAdvisor] = useState<Advisor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState<AdvisorFormData>({
    slug: "",
    name: "",
    title: "",
    bio: "",
    experience: "",
    expertise: [],
  });
  const [currentExpertise, setCurrentExpertise] = useState("");
  const router = useRouter();

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchAdvisor = async () => {
      try {
        const res = await fetch(`${apiBase}/advisors/${slug}`);

        if (!res.ok) {
          if (res.status === 404) {
            setAdvisor(null);
            return;
          }
          throw new Error(`Failed to fetch advisor: ${res.status}`);
        }

        const data = await res.json();
        setAdvisor(data);
        setFormData({
          slug: data.slug || "",
          name: data.name || "",
          title: data.title || "",
          bio: data.bio || "",
          experience: data.experience || "",
          expertise: data.expertise || [], // Ensure expertise is always an array
          image: data.image || "",
        });
      } catch (error) {
        console.error("Error fetching advisor:", error);
        setAdvisor(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdvisor();
  }, [slug, apiBase]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiBase}/advisors/${advisor?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update advisor");
      }

      // Refresh the data
      const updatedAdvisor = await response.json();
      setAdvisor(updatedAdvisor);
      setIsEditing(false);

      // Update URL if slug changed - use replace instead of push to avoid history issues
      if (formData.slug !== slug) {
        router.replace(`/admin/advisors/${formData.slug}`);
      }
    } catch (error) {
      console.error("Error updating advisor:", error);
      alert("Failed to update advisor. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this advisor?")) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`${apiBase}/advisors/${advisor?.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete advisor");
      }

      // Redirect back to advisors list
      router.push("/admin/advisors");
    } catch (error) {
      console.error("Error deleting advisor:", error);
      alert("Failed to delete advisor. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Safe array access for expertise
  const safeExpertise = (expertise: unknown): string[] => {
    if (Array.isArray(expertise)) {
      // Filter out non-string values and ensure we only return strings
      return expertise.filter(
        (item): item is string => typeof item === "string"
      );
    }
    if (typeof expertise === "string") {
      return [expertise];
    }
    return [];
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading advisor...</div>
      </div>
    );
  }

  if (!advisor) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Advisor not found.</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        {isEditing ? (
          <div className="flex-1">
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="text-3xl font-bold text-[#1B1856] p-0 border-none focus:ring-0"
              placeholder="Advisor Name"
            />
          </div>
        ) : (
          <h1 className="text-3xl font-bold text-[#1B1856]">{advisor.name}</h1>
        )}
        <div className="space-x-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  // Reset form data to original advisor data when canceling
                  setFormData({
                    slug: advisor.slug || "",
                    name: advisor.name || "",
                    title: advisor.title || "",
                    bio: advisor.bio || "",
                    experience: advisor.experience || "",
                    expertise: safeExpertise(advisor.expertise),
                    image: advisor.image || "",
                  });
                  setIsEditing(false);
                }}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="flex gap-8">
        <Image
          src={advisor.image || "/placeholder-avatar.png"}
          alt={advisor.name}
          className="w-48 h-48 rounded-xl object-cover shadow"
          width={192}
          height={192}
        />
        <div className="space-y-3 flex-1">
          {isEditing ? (
            <>
              <div>
                <Label>Title</Label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Senior Financial Advisor"
                />
              </div>
              <div>
                <Label>Slug</Label>
                <Input
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="john-doe"
                />
              </div>
            </>
          ) : (
            <>
              <h2 className="text-lg font-semibold">{advisor.title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {advisor.experience}
              </p>
            </>
          )}

          <div>
            <h3 className="font-medium mt-4 mb-2">Areas of Expertise</h3>
            {isEditing ? (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={currentExpertise}
                    onChange={(e) => setCurrentExpertise(e.target.value)}
                    placeholder="Add expertise area"
                    onKeyPress={handleKeyPress}
                  />
                  <Button
                    type="button"
                    onClick={addExpertise}
                    variant="outline"
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {safeExpertise(formData.expertise).map((exp, index) => (
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
            ) : (
              <ul className="list-disc list-inside text-sm text-gray-700">
                {safeExpertise(advisor.expertise).map((exp, i) => (
                  <li key={i}>{exp}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="prose max-w-none text-gray-700 leading-relaxed mt-8 bg-white p-6 rounded-xl border">
        <h3 className="text-xl font-semibold mb-3">Biography</h3>
        {isEditing ? (
          <Textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            rows={6}
            placeholder="Brief biography of the advisor..."
          />
        ) : (
          <p className="whitespace-pre-line">{advisor.bio}</p>
        )}
      </div>

      {/* Experience */}
      <div className="prose max-w-none text-gray-700 leading-relaxed bg-white p-6 rounded-xl border">
        <h3 className="text-xl font-semibold mb-3">Experience</h3>
        {isEditing ? (
          <Textarea
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            rows={6}
            placeholder="Professional experience and background..."
          />
        ) : (
          <p className="whitespace-pre-line">{advisor.experience}</p>
        )}
      </div>
    </div>
  );
}
