"use client";

import { Podcast } from "@/lib/podcasts";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Props {
  podcasts: Podcast[];
  onView: (podcast: Podcast) => void;
  onEdit: (podcast: Podcast) => void;
  onDelete: (id: string) => void;
}

export default function PodcastTable({ podcasts, onView, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border">
      <table className="min-w-full text-sm text-gray-700">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-4 text-left">Title</th>
            <th className="py-3 px-4 text-left">Host</th>
            <th className="py-3 px-4 text-left">Duration</th>
            <th className="py-3 px-4 text-left">Date</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {podcasts.map(p => (
            <tr key={p.id} className="border-t hover:bg-gray-50">
              <td className="py-3 px-4 flex items-center gap-3">
                <Image
                  src={p.image}
                  alt={p.title}
                  className="w-10 h-10 rounded-md object-cover"
                  width={40}
                  height={40}
                />
                <span className="font-medium">{p.title}</span>
              </td>
              <td className="py-3 px-4">{p.host}</td>
              <td className="py-3 px-4">{p.duration}</td>
              <td className="py-3 px-4">{new Date(p.date).toLocaleDateString()}</td>
              <td className="py-3 px-4 text-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => onView(p)}>
                  View
                </Button>
                <Button variant="secondary" size="sm" onClick={() => onEdit(p)}>
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => onDelete(p.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
