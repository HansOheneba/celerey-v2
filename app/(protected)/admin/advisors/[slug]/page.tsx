import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
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

interface AdvisorDetailPageProps {
  params: {
    slug: string;
  };
}

async function getAdvisor(slug: string): Promise<Advisor | null> {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
    const res = await fetch(`${apiBase}/advisors/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch advisor: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching advisor:", error);
    return null;
  }
}

export default async function AdvisorDetailPage({
  params,
}: AdvisorDetailPageProps) {
  const advisor = await getAdvisor(params.slug);

  if (!advisor) {
    return notFound();
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#1B1856]">{advisor.name}</h1>
        <div className="space-x-2">
          <Button variant="outline">Edit</Button>
          <Button variant="destructive">Delete</Button>
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
          // REMOVE the onError handler
        />
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">{advisor.title}</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            {advisor.experience}
          </p>

          <div>
            <h3 className="font-medium mt-4 mb-2">Areas of Expertise</h3>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {advisor.expertise.map((exp, i) => (
                <li key={i}>{exp}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="prose max-w-none text-gray-700 leading-relaxed mt-8 bg-white p-6 rounded-xl border">
        <h3 className="text-xl font-semibold mb-3">Biography</h3>
        <p className="whitespace-pre-line">{advisor.bio}</p>
      </div>
    </div>
  );
}
