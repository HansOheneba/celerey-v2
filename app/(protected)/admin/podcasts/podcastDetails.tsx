"use client";

import { Podcast } from "@/lib/podcasts";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Props {
  podcast: Podcast;
  onClose: () => void;
}

export default function PodcastDetails({ podcast, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-6 relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col sm:flex-row gap-6 mb-6">
          <Image
            src={podcast.image}
            alt={podcast.title}
            className="w-full sm:w-48 h-48 object-cover rounded-lg"
            width={192}
            height={192}
          />
          <div>
            <h2 className="text-xl font-semibold">{podcast.title}</h2>
            <p className="text-gray-600">{podcast.host}</p>
            <p className="text-sm text-gray-500 mt-2">
              {podcast.duration} • {new Date(podcast.date).toLocaleDateString()}
            </p>
          </div>
        </div>

        <p className="text-gray-700 mb-4 leading-relaxed">
          {podcast.description}
        </p>

        {podcast.spotifyEmbedUrl && (
          <div className="mb-4">
            <iframe
              src={podcast.spotifyEmbedUrl}
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        )}


        <div className="mt-4 flex flex-wrap gap-2">
          {podcast.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-600"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
