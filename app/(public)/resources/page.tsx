"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

type ResourceCategory = {
  title: string;
  description: string;
  href: string;
  image: string;
};

const resourceCategories: ResourceCategory[] = [
  {
    title: "Stories",
    description:
      "Thoughtful writing on wealth, behavior, and long-term financial clarity.",
    href: "/resources/stories",
    image:
    "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Insights",
    description: "Stay informed, learn new strategies, and gain the knowledge.",
    href: "/resources/insights",
    image:
    "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Podcasts",
    description:
      "Engaging snippets and discussions on wealth planning and financial empowerment.",
    href: "/resources/podcasts",
    image:
      "https://images.unsplash.com/photo-1660631228116-b3643559f611?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function ResourcesPage() {
  return (
    <section className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6  md:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">
            Resources
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Explore stories, insights, and podcasts designed to support better
            decisions and stronger financial confidence.
          </p>
        </motion.div>

        {/* Cards (styled like your screenshot) */}
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
            {resourceCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
              >
                <Link href={category.href} className="group block">
                  {/* Image card */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 520px"
                      priority={index === 0}
                    />
                  </div>

                  {/* Text */}
                  <div className="mt-6">
                    <h2 className="text-xl md:text-2xl font-medium text-gray-900">
                      {category.title}
                    </h2>
                    <p className="mt-2 text-gray-600 leading-relaxed max-w-md">
                      {category.description}
                    </p>

                    {/* optional subtle affordance */}
                    <div className="mt-4 text-gray-900/70 text-sm font-medium inline-flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Explore <span aria-hidden>→</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}