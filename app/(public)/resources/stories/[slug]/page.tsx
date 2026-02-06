import { insights } from "@/lib/insights";
import { notFound } from "next/navigation";
import Image from "next/image";
import { marked } from "marked";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: { slug: string };
}

export default async function BlogDetailPage({ params }: Props) {
  const insight = insights.find((i) => i.slug === params.slug);
  if (!insight) return notFound();

  // Convert markdown → HTML
  const rawHtml = await marked(insight.content);

  // Wrap plain text lines into <p> tags if missing
  const htmlContent = rawHtml
    .replace(/(?:\r\n|\r|\n){2,}/g, "</p><p>")
    .replace(/^(.+)$/gm, "<p>$1</p>")
    .replace(/<p><\/p>/g, "");

  return (
    <section className="bg-gradient-to-b from-white via-blue-50/30 to-white py-24 px-6 text-gray-800">
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <Link
          href="/resources/blog"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#1B1856] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Cover image */}
        <div className="relative w-full h-80 md:h-96 mb-10 rounded-2xl overflow-hidden shadow-md">
          <Image
            src={insight.coverImage}
            alt={insight.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent rounded-2xl" />
        </div>

        {/* Title + Meta */}
        <h1 className="text-4xl md:text-5xl font-semibold text-[#1B1856] mb-3 leading-tight">
          {insight.title}
        </h1>
        <p className="text-gray-500 mb-10 text-sm">
          By {insight.author} •{" "}
          {new Date(insight.date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {/* Article body */}
        <article
          className="
            max-w-none
            leading-relaxed
            text-gray-800
            text-[1.05rem]
            space-y-6
          "
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Divider */}
        <hr className="my-12 border-gray-200" />

        {/* Tags */}
        <div className="flex flex-wrap gap-3">
          {insight.tags.map((tag, i) => (
            <span
              key={i}
              className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
