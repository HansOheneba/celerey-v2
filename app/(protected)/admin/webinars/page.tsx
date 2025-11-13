"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X, Plus, Upload, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";


interface Speaker {
  name: string;
  title: string;
  image: string;
}

interface WebinarData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  formatted_date: string;
  speakers: Speaker[];
  expectations: string[];
  attendees: string[];
}

interface ImgBBResponse {
  data: {
    url: string;
    display_url: string;
  };
  success: boolean;
}



export default function WebinarAdminPage() {
  const [webinarData, setWebinarData] = useState<WebinarData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    date: "",
    speakers: [] as Speaker[],
    expectations: [] as string[],
    attendees: [] as string[],
  });
  const [currentSpeaker, setCurrentSpeaker] = useState<Speaker>({
    name: "",
    title: "",
    image: "",
  });
  const [currentExpectation, setCurrentExpectation] = useState("");
  const [currentAttendee, setCurrentAttendee] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  const imgBBApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  useEffect(() => {
    fetchWebinar();
  },);

  const fetchWebinar = async () => {
    try {
      const res = await fetch(`${apiBase}/webinars/active`);
      if (res.ok) {
        const data = await res.json();
        setWebinarData(data);

        // Convert the API date to datetime-local format
        let dateValue = "";
        if (data.date) {
          const date = new Date(data.date);
          // Format to YYYY-MM-DDTHH:MM for datetime-local input
          dateValue = date.toISOString().slice(0, 16);
        }

        setFormData({
          title: data.title || "",
          subtitle: data.subtitle || "",
          description: data.description || "",
          date: dateValue,
          speakers: data.speakers || [],
          expectations: data.expectations || [],
          attendees: data.attendees || [],
        });
      }
    } catch (error) {
      console.error("Error fetching webinar:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const router = useRouter();


  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file (PNG, JPG, JPEG)");
      return;
    }

    if (file.size > 32 * 1024 * 1024) {
      alert("File size must be less than 32MB");
      return;
    }

    setIsUploading(true);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("key", imgBBApiKey!);
      uploadFormData.append("image", file);

      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: uploadFormData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }

      const data: ImgBBResponse = await response.json();

      if (data.success) {
        setCurrentSpeaker((prev) => ({
          ...prev,
          image: data.data.url,
        }));
      } else {
        throw new Error("Upload was not successful");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const addSpeaker = () => {
    if (currentSpeaker.name.trim() && currentSpeaker.title.trim()) {
      setFormData((prev) => ({
        ...prev,
        speakers: [...prev.speakers, { ...currentSpeaker }],
      }));
      setCurrentSpeaker({ name: "", title: "", image: "" });
    }
  };

  const removeSpeaker = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      speakers: prev.speakers.filter((_, i) => i !== index),
    }));
  };

  const addExpectation = () => {
    if (currentExpectation.trim()) {
      setFormData((prev) => ({
        ...prev,
        expectations: [...prev.expectations, currentExpectation.trim()],
      }));
      setCurrentExpectation("");
    }
  };

  const removeExpectation = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      expectations: prev.expectations.filter((_, i) => i !== index),
    }));
  };

  const addAttendee = () => {
    if (currentAttendee.trim()) {
      setFormData((prev) => ({
        ...prev,
        attendees: [...prev.attendees, currentAttendee.trim()],
      }));
      setCurrentAttendee("");
    }
  };

  const removeAttendee = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      attendees: prev.attendees.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const method = webinarData ? "PUT" : "POST";

      // Format the date properly for the API
      const submitData = {
        ...formData,
        date: formData.date
          ? new Date(formData.date).toISOString().replace("T", " ").slice(0, 19)
          : "",
      };

      console.log("Submitting webinar data:", submitData);

      const response = await fetch(`${apiBase}/webinars/`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Save failed:", errorText);
        throw new Error("Failed to save webinar");
      }

      await fetchWebinar();
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving webinar:", error);
      alert("Failed to save webinar. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-[#1B1856]">
            Webinar Management
          </h1>
          <p className="text-gray-500 text-sm">
            Manage the active webinar displayed on the Celerey site.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "outline" : "default"}
          >
            {isEditing
              ? "Cancel"
              : webinarData
              ? "Edit Webinar"
              : "Create Webinar"}
          </Button>
          <Button
            onClick={() => router.push("/admin/webinars/registrations")}
            variant="secondary"
          >
            View Registrations
          </Button>
        </div>
      </div>

      {!webinarData && !isEditing ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No active webinar found.</p>
          <Button onClick={() => setIsEditing(true)}>Create Webinar</Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Title *</Label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                required
                disabled={!isEditing}
                placeholder="Webinar title"
              />
            </div>
            <div>
              <Label>Subtitle</Label>
              <Input
                value={formData.subtitle}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, subtitle: e.target.value }))
                }
                disabled={!isEditing}
                placeholder="Webinar subtitle"
              />
            </div>
          </div>

          <div>
            <Label>Date & Time *</Label>
            <Input
              type="datetime-local"
              value={formData.date}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, date: e.target.value }))
              }
              required
              disabled={!isEditing}
            />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              disabled={!isEditing}
              rows={4}
              placeholder="Webinar description"
            />
          </div>

          {/* Speakers Section */}
          {isEditing && (
            <div className="space-y-4">
              <Label>Speakers</Label>
              <div className="space-y-3 p-4 border rounded-lg">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="Speaker Name"
                    value={currentSpeaker.name}
                    onChange={(e) =>
                      setCurrentSpeaker((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                  <Input
                    placeholder="Speaker Title"
                    value={currentSpeaker.title}
                    onChange={(e) =>
                      setCurrentSpeaker((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label>Speaker Image</Label>
                  {currentSpeaker.image ? (
                    <div className="flex items-center gap-3">
                      <Image
                        src={currentSpeaker.image}
                        alt="Speaker preview"
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentSpeaker((prev) => ({ ...prev, image: "" }))
                        }
                      >
                        <X className="w-4 h-4 mr-1" />
                        Remove
                      </Button>
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
                        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 transition-colors"
                      >
                        {isUploading ? (
                          <Loader2 className="w-6 h-6 text-gray-400 animate-spin mx-auto mb-2" />
                        ) : (
                          <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                        )}
                        <p className="text-sm text-gray-600">
                          {isUploading
                            ? "Uploading..."
                            : "Click to upload speaker image"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG, JPEG up to 32MB
                        </p>
                      </div>
                    </>
                  )}
                </div>

                <Button
                  type="button"
                  onClick={addSpeaker}
                  variant="outline"
                  size="sm"
                  disabled={
                    !currentSpeaker.name.trim() || !currentSpeaker.title.trim()
                  }
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Speaker
                </Button>

                <div className="space-y-3">
                  {formData.speakers.map((speaker, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {speaker.image && (
                          <Image
                            src={speaker.image}
                            alt={speaker.name}
                            width={50}
                            height={50}
                            className="rounded-lg object-cover"
                          />
                        )}
                        <div>
                          <div className="font-medium">{speaker.name}</div>
                          <div className="text-sm text-gray-500">
                            {speaker.title}
                          </div>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSpeaker(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Expectations Section */}
          {isEditing && (
            <div className="space-y-4">
              <Label>What to Expect</Label>
              <div className="space-y-3 p-4 border rounded-lg">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add expectation"
                    value={currentExpectation}
                    onChange={(e) => setCurrentExpectation(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addExpectation();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={addExpectation}
                    variant="outline"
                    size="sm"
                    disabled={!currentExpectation.trim()}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </div>

                <div className="space-y-2">
                  {formData.expectations.map((expectation, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <span>{expectation}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExpectation(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Attendees Section */}
          {isEditing && (
            <div className="space-y-4">
              <Label>Who Should Attend</Label>
              <div className="space-y-3 p-4 border rounded-lg">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add attendee type"
                    value={currentAttendee}
                    onChange={(e) => setCurrentAttendee(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addAttendee();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={addAttendee}
                    variant="outline"
                    size="sm"
                    disabled={!currentAttendee.trim()}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </div>

                <div className="space-y-2">
                  {formData.attendees.map((attendee, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <span>{attendee}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAttendee(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {isEditing && (
            <div className="flex gap-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Webinar"}
              </Button>
            </div>
          )}
        </form>
      )}

      {webinarData && !isEditing && (
        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold">Current Webinar</h2>
          <div className="bg-white p-6 rounded-lg border space-y-4">
            <div>
              <h3 className="text-lg font-semibold">{webinarData.title}</h3>
              <p className="text-gray-600">{webinarData.subtitle}</p>
              <p className="text-sm text-gray-500 mt-2">
                {webinarData.formatted_date}
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Speakers:</h4>
              <div className="space-y-3">
                {webinarData.speakers.map((speaker, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {speaker.image && (
                      <Image
                        src={speaker.image}
                        alt={speaker.name}
                        width={50}
                        height={50}
                        className="rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <div className="font-medium">{speaker.name}</div>
                      <div className="text-sm text-gray-500">
                        {speaker.title}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">What to Expect:</h4>
                <ul className="text-sm space-y-1">
                  {webinarData.expectations.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Who Should Attend:</h4>
                <ul className="text-sm space-y-1">
                  {webinarData.attendees.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
