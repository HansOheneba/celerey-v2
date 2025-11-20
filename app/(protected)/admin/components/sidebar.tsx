"use client";
import {  Mic, Users, Video, Mail, Lightbulb, DollarSign } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { UserButton, useUser } from "@clerk/nextjs";

const navItems = [
  // { name: "Dashboard", icon: Home, href: "/admin/dashboard" },
  { name: "Podcasts", icon: Mic, href: "/admin/podcasts" },
  { name: "Advisors", icon: Users, href: "/admin/advisors" },
  { name: "Insights", icon: Lightbulb, href: "/admin/insights" },
  { name: "Webinars", icon: Video, href: "/admin/webinars" },
  { name: "Messages", icon: Mail, href: "/admin/messages" },
  { name: "plans", icon: DollarSign, href: "/admin/plans" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between h-screen sticky top-0">
      <div className="py-6">
        <h1 className="text-2xl font-bold mb-6 text-[#1B1856] px-6">Celerey Admin</h1>
        <nav className="space-y-1">
          {navItems.map(({ name, icon: Icon, href }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center py-2 ee text-sm font-medium transition px-6",
                pathname === href
                  ? "bg-[#1B1856] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <Icon className="w-4 h-4 mr-2" />
              {name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t text-sm text-gray-500 flex flex-row items-center gap-3">
        <UserButton /> <span>{useUser().user?.fullName}</span>
      </div>
    </aside>
  );
}
