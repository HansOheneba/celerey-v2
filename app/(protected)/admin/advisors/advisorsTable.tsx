"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Advisor } from "@/lib/advisors";
import Image from "next/image";

export default function AdvisorTable({ advisors }: { advisors: Advisor[] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600 border-b">
          <tr>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Title</th>
            <th className="py-3 px-4 text-left">Expertise</th>
            <th className="py-3 px-4 text-left">Experience</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {advisors.map((adv, i) => (
            <tr key={i} className="border-b hover:bg-gray-50 transition-colors">
              <td className="py-3 px-4 flex items-center gap-3">
                <Image
                  src={adv.image}
                  alt={adv.name}
                  className="w-10 h-10 rounded-full object-cover border"
                    width={40}
                    height={40}
                />
                <span className="font-medium text-gray-800">{adv.name}</span>
              </td>
              <td className="py-3 px-4">{adv.title}</td>
              <td className="py-3 px-4">{adv.expertise.length} areas</td>
              <td className="py-3 px-4 truncate max-w-xs text-gray-600">
                {adv.experience}
              </td>
              <td className="py-3 px-4 text-right flex justify-end gap-3">
                <Link href={`/admin/advisors/${adv.slug}`}>
                  <Button variant="outline" size="icon">
                    <Eye className="w-4 h-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="icon">
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="destructive" size="icon">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-4 text-sm text-gray-500 border-t">
        Showing {advisors.length} advisors
      </div>
    </div>
  );
}
