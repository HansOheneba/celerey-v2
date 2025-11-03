"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function PartnersPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-[#1B1856] py-42 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our Strategic <span className="text-[#D4AF37]">Partners</span>
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At Celerey, we understand that wealth is a multidimensional journey
            — it’s not just about investments, but the ecosystem that surrounds
            them. That’s why we collaborate with carefully selected partners
            across finance, property, law, and lifestyle — creating an
            integrated network that empowers you to build, grow, and protect
            your wealth seamlessly.
          </p>
        </motion.div>

        {/* Partnership Sections */}
        <div className="space-y-24">
          {/* Wealth & Investment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-2xl font-semibold mb-3 text-[#1B1856]">
                Wealth & Investment Partners
              </h2>
              <p className="text-gray-600 mb-4">
                Our investment partners are leading global and regional
                financial institutions, portfolio managers, and research
                specialists. Together, we provide clients with access to market
                insights, institutional-grade portfolios, and tailored wealth
                strategies.
              </p>
              <p className="text-gray-600 mb-4">
                Through these relationships, Celerey members benefit from
                diversified investment opportunities, exclusive products, and
                transparent advisory support that aligns with both short-term
                goals and long-term ambitions.
              </p>
              <p className="text-gray-600">
                Whether you’re growing your first portfolio or managing
                multi-jurisdictional assets, our investment partners ensure your
                money works with clarity and precision.
              </p>
            </div>
            <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/partners/wealth.jpg"
                alt="Wealth Partners"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Property & Real Estate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-md md:order-2">
              <Image
                src="/partners/property.jpg"
                alt="Property Partners"
                fill
                className="object-cover"
              />
            </div>
            <div className="md:order-1">
              <h2 className="text-2xl font-semibold mb-3 text-[#1B1856]">
                Property & Real Estate Partners
              </h2>
              <p className="text-gray-600 mb-4">
                Property is a cornerstone of wealth creation. Celerey partners
                with international and regional real estate firms to give
                clients access to vetted property opportunities in mature and
                emerging markets alike.
              </p>
              <p className="text-gray-600 mb-4">
                Whether it’s securing a first investment property, diversifying
                into income-generating assets, or structuring
                multi-jurisdictional portfolios, our real estate collaborators
                ensure transparency, due diligence, and sustainable returns.
              </p>
              <p className="text-gray-600">
                Each property partner shares our philosophy — building long-term
                value, responsibly and intelligently.
              </p>
            </div>
          </motion.div>

          {/* Legal & Regulatory */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-2xl font-semibold mb-3 text-[#1B1856]">
                Legal & Regulatory Partners
              </h2>
              <p className="text-gray-600 mb-4">
                Wealth preservation requires more than returns — it demands
                protection. Our legal partners include leading firms and
                practitioners in corporate, tax, and estate law who ensure that
                every decision you make is compliant, efficient, and
                future-proof.
              </p>
              <p className="text-gray-600 mb-4">
                From wealth structuring and trust formation to succession
                planning and business governance, Celerey’s legal network
                provides the confidence that your assets and interests are
                safeguarded across jurisdictions.
              </p>
              <p className="text-gray-600">
                Together, we deliver integrated advice that merges financial
                growth with legal security — all under one trusted ecosystem.
              </p>
            </div>
            <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/partners/legal.jpg"
                alt="Legal Partners"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Global Mobility & Lifestyle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-md md:order-2">
              <Image
                src="/partners/global.jpg"
                alt="Global Partners"
                fill
                className="object-cover"
              />
            </div>
            <div className="md:order-1">
              <h2 className="text-2xl font-semibold mb-3 text-[#1B1856]">
                Global Mobility & Lifestyle Partners
              </h2>
              <p className="text-gray-600 mb-4">
                True financial confidence extends beyond numbers. Celerey’s
                lifestyle and global mobility partners assist clients with
                relocation support, citizenship planning, and access to premium
                services that enhance financial freedom and global reach.
              </p>
              <p className="text-gray-600 mb-4">
                Whether expanding your business footprint, investing abroad, or
                planning for an international lifestyle, our global network
                connects you with reputable professionals who share our
                dedication to excellence and privacy.
              </p>
              <p className="text-gray-600">
                Together, we turn ambition into access — helping you live and
                invest without borders.
              </p>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-28 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-semibold mb-4">
            Partnering for Your Prosperity
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Celerey brings these alliances together under one trusted experience
            — giving you access to world-class expertise without the complexity.
            As you progress through your financial journey, we ensure every
            aspect — from investment to lifestyle — is supported by the right
            professionals at the right time.
          </p>
        <Link href="/advisors">
          <Button className="bg-[#1B1856] hover:bg-[#1B1856]/90 text-white rounded-full px-8 py-3 text-lg font-semibold">
            Connect with an Advisor
          </Button>
        </Link>
        </motion.div>
      </div>
    </section>
  );
}
