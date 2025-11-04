import { insights } from "@/lib/insights";
import { notFound } from "next/navigation";
import Image from "next/image";
import { marked } from "marked";
import Link from "next/link";

interface Props {
  params: { slug: string };
}

export default async function InsightDetailPage({ params }: Props) {
  const insight = insights.find((i) => i.slug === params.slug);
  if (!insight) return notFound();

  // Convert markdown → HTML (await the Promise)
  const rawHtml = await marked(insight.content);

  // ✅ Wrap plain text lines into <p> tags if missing
  const htmlContent = rawHtml
    .replace(/(?:\r\n|\r|\n){2,}/g, "</p><p>") // double line break = new paragraph
    .replace(/^(.+)$/gm, "<p>$1</p>") // wrap each line
    .replace(/<p><\/p>/g, ""); // remove empty paragraphs

  return (
    <section className="bg-gradient-to-b from-white via-blue-50/30 to-white py-42 px-6 text-gray-800">
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <Link
          href="/insights"
          className="inline-block mb-8 text-sm text-blue-600 hover:underline"
        >
          ← Back to Insights
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
