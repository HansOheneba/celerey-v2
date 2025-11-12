"use client";

import { useState, useEffect } from "react";
// import { Podcast } from "@/lib/podcasts";
import PodcastTable from "./podcastTable";
import PodcastModal from "./podcastModal";
import PodcastDetails from "./podcastDetails";
import { Button } from "@/components/ui/button";

const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;


interface Podcast {
  id: number;
  slug: string;
  title: string;
  description: string;
  host: string;
  duration: string;
  date: string;
  image: string;
  spotify_link: string;
  spotify_embed_url: string;
  tags: string[];
}
export default function PodcastsPage() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [selected, setSelected] = useState<Podcast | null>(null);
  const [editing, setEditing] = useState<Podcast | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch podcasts from API
  const fetchPodcasts = async () => {
    try {
      const res = await fetch(`${apiBase}/podcasts/`);
      if (!res.ok) {
        throw new Error(`Failed to fetch podcasts: ${res.status}`);
      }
      const data = await res.json();
      setPodcasts(data);
    } catch (error) {
      console.error("Error fetching podcasts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPodcasts();
  }, []);

  const handleEdit = (podcast: Podcast) => {
    setEditing(podcast);
    setShowModal(true);
  };

  const handleSave = async (updated: Podcast) => {
    try {
      const url = updated.id
        ? `${apiBase}/podcasts/${updated.id}`
        : `${apiBase}/podcasts/`;

      const method = updated.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      if (!response.ok) {
        throw new Error("Failed to save podcast");
      }

      // Refresh the list
      fetchPodcasts();
      setShowModal(false);
      setEditing(null);
    } catch (error) {
      console.error("Error saving podcast:", error);
      alert("Failed to save podcast. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this podcast?")) {
      return;
    }

    try {
      const response = await fetch(`${apiBase}/podcasts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete podcast");
      }

      // Refresh the list
      fetchPodcasts();
    } catch (error) {
      console.error("Error deleting podcast:", error);
      alert("Failed to delete podcast. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading podcasts...</div>
      </div>
    );
  }

  return (
    <section className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Podcasts</h1>
        <Button onClick={() => setShowModal(true)}>+ Add Podcast</Button>
      </div>

      <PodcastTable
        podcasts={podcasts}
        onView={setSelected}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {selected && (
        <PodcastDetails podcast={selected} onClose={() => setSelected(null)} />
      )}

      {showModal && (
        <PodcastModal
          podcast={editing}
          onClose={() => {
            setShowModal(false);
            setEditing(null);
          }}
          onSave={handleSave}
        />
      )}
    </section>
  );
}
