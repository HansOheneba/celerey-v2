"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Service {
  id: number;
  name: string;
  price: number;
  description: string;
  duration?: string;
  payment_link: string;
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiBase}/services/`);
        if (!response.ok) {
          throw new Error(`Failed to fetch services: ${response.status}`);
        }
        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch services"
        );
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [apiBase]);

  if (loading) {
    return (
      <section className="mt-28 flex justify-center items-center min-h-[200px]">
        <div className="w-10 h-10 border-4 border-[#1B1856]/20 border-t-[#1B1856] rounded-full animate-spin" />
      </section>
    );
  }

  if (error) {
    return (
      <section className="mt-28 text-center text-red-300">
        <p>Error: {error}</p>
      </section>
    );
  }

  return (
    <section className="mt-28">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold mb-4">Services</h2>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Get expert help exactly where you need it. These one-off services are
          designed to give you clarity, direction, and confidence, no long-term
          commitment.
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-2">{service.name}</h3>

              {service.duration && (
                <p className="text-sm text-[#D4AF37] mb-3">
                  {service.duration}
                </p>
              )}

              <p className="text-3xl font-bold mb-4">${service.price}</p>

              <p className="text-gray-600 mb-6">{service.description}</p>
            </div>

            <Link
              href={service.payment_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full text-white font-semibold">
                Book Service
              </Button>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
