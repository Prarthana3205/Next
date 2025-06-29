"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SidebarProps {
  user: { name: string | undefined | null }; // Accepts undefined/null for SSR/async
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const menuItems = [
  { label: "Dashboard", icon: "🏠", href: "/dashboard" },
  { label: "Projects", icon: "📁", href: "#" },
  { label: "Calendar", icon: "🗓️", href: "#" },
  { label: "Settings", icon: "⚙️", href: "#" },
];

export default function Sidebar({
  user,
  sidebarCollapsed,
  setSidebarCollapsed,
}: SidebarProps) {
  const router = useRouter();

  // Use fallback if user.name is not available yet
  const displayName = user?.name || "";

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div
      className={`bg-purple-700 text-white ${
        sidebarCollapsed ? "w-20" : "w-64"
      } h-screen fixed left-0 top-0 bottom-0 p-6 transition-all duration-300 flex flex-col z-20`}
    >
      {/* Collapse/Expand Button */}
      <button
        className={`absolute top-1/2 right-[-16px] -translate-y-1/2 bg-purple-700 border-2 border-white rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-transform duration-300 z-30 ${
          sidebarCollapsed ? "rotate-180" : ""
        }`}
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <span className="text-lg">{sidebarCollapsed ? "→" : "←"}</span>
      </button>

      {/* User Info */}
      <div className="flex items-center mb-10 mt-2">
        <div className="bg-yellow-400 text-purple-900 rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl mr-3">
          {displayName ? displayName[0] : "?"}
        </div>
        {!sidebarCollapsed && (
          <span className="font-bold text-lg truncate">
            {displayName ? `Hello, ${displayName}` : "Loading..."}
          </span>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-purple-600 transition-colors ${
                  item.label === "Dashboard"
                    ? "bg-purple-800 font-semibold"
                    : ""
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {!sidebarCollapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="mt-auto">
        <button
          className="flex items-center gap-3 w-full bg-yellow-400 text-white py-2 rounded hover:bg-yellow-300 justify-center"
          onClick={handleLogout}
        >
          <span className="text-xl">🚪</span>
          {!sidebarCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}
