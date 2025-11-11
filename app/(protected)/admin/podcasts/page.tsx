"use client";

import { useState } from "react";
import { podcasts as initialPodcasts, Podcast } from "@/lib/podcasts";
import PodcastTable from "./podcastTable";
import PodcastModal from "./podcastModal";
import PodcastDetails from "./podcastDetails";
import { Button } from "@/components/ui/button";

export default function PodcastsPage() {
  const [podcasts, setPodcasts] = useState<Podcast[]>(initialPodcasts);
  const [selected, setSelected] = useState<Podcast | null>(null);
  const [editing, setEditing] = useState<Podcast | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (podcast: Podcast) => {
    setEditing(podcast);
    setShowModal(true);
  };

  const handleSave = (updated: Podcast) => {
    setPodcasts((prev) =>
      prev.some((p) => p.id === updated.id)
        ? prev.map((p) => (p.id === updated.id ? updated : p))
        : [...prev, { ...updated, id: String(Date.now()) }]
    );
    setShowModal(false);
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    setPodcasts((prev) => prev.filter((p) => p.id !== id));
  };

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
