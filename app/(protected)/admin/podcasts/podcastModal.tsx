"use client";

import { useState } from "react";
import { Podcast } from "@/lib/podcasts";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  podcast?: Podcast | null;
  onClose: () => void;
  onSave: (podcast: Podcast) => void;
}

export default function PodcastModal({ podcast, onClose, onSave }: Props) {
  const [form, setForm] = useState<Podcast>(
    podcast || {
      id: "",
      slug: "",
      title: "",
      host: "",
      duration: "",
      date: "",
      image: "",
      description: "",
      spotifyLink: "",
      spotifyEmbedUrl: "",
      tags: [],
    }
  );

  const handleChange = (field: keyof Podcast, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <X size={20} />
        </button>
        <h2 className="text-xl font-semibold mb-4">
          {podcast ? "Edit Podcast" : "Add Podcast"}
        </h2>

        <div className="space-y-3">
          <Input
            placeholder="Title"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          <Input
            placeholder="Host"
            value={form.host}
            onChange={(e) => handleChange("host", e.target.value)}
          />
          <Input
            placeholder="Duration (e.g. 28 min)"
            value={form.duration}
            onChange={(e) => handleChange("duration", e.target.value)}
          />
          <Input
            type="date"
            value={form.date}
            onChange={(e) => handleChange("date", e.target.value)}
          />
          <Input
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => handleChange("image", e.target.value)}
          />
          <Textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
          <Input
            placeholder="Spotify Link"
            value={form.spotifyLink}
            onChange={(e) => handleChange("spotifyLink", e.target.value)}
          />
          <Input
            placeholder="Spotify Embed URL"
            value={form.spotifyEmbedUrl}
            onChange={(e) => handleChange("spotifyEmbedUrl", e.target.value)}
          />
          <Input
            placeholder="Tags (comma separated)"
            value={form.tags.join(", ")}
            onChange={(e) =>
              handleChange(
                "tags",
                e.target.value.split(",").map((t) => t.trim())
              )
            }
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>{podcast ? "Save" : "Add"}</Button>
        </div>
      </div>
    </div>
  );
}
