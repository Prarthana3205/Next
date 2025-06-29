"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const menuItems = [
  { label: "Dashboard", icon: "🏠", href: "/dashboard" },
  { label: "Projects", icon: "📁", href: "#" },
  { label: "Calendar", icon: "🗓️", href: "#" },
  { label: "Settings", icon: "⚙️", href: "#" },
];

export default function Dashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // --- Fetch the logged-in user's name from your backend or session ---
  const [user, setUser] = useState<{ name: string | null }>({ name: null });

  useEffect(() => {
    // Example: fetch user from API endpoint `/api/me` that returns { name: "..." }
    // Replace this with your actual user fetching logic
    async function fetchUser() {
      try {
        const res = await fetch("/api/me", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setUser({
            name:
              typeof data.name === "string" && data.name.trim()
                ? data.name
                : null,
          });
        } else {
          setUser({ name: null });
        }
      } catch {
        setUser({ name: null });
      }
    }
    fetchUser();
  }, []);
  // -------------------------------------------------------------------

  const handleLogout = () => {
    // Optionally clear auth state here
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        user={user}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div
        className={`flex-1 ml-0 transition-all duration-300 p-10 ${
          sidebarCollapsed ? "md:ml-20" : "md:ml-64"
        }`}
      >
        {/* Sidebar open button for mobile */}
        {!sidebarOpen && (
          <button
            className="m-4 p-2 rounded bg-purple-700 text-white md:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            &#9776;
          </button>
        )}
        <h1 className="text-3xl font-bold text-purple-800 mb-6">
          Welcome to your Dashboard
        </h1>
        <div className="flex items-center mb-6">
          <h1 className="text-3xl font-bold mr-4">Today</h1>
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded text-lg font-semibold">
            5
          </span>
        </div>
        <button className="mb-4 text-gray-500 flex items-center gap-2 hover:text-purple-700">
          <span className="text-xl">+</span> Add New Task
        </button>

        {/* Task List */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center bg-white rounded px-4 py-2 shadow-sm">
            <input type="checkbox" className="mr-3" />
            <span className="flex-1">Research content ideas</span>
            <span className="ml-2 text-gray-400">&gt;</span>
          </div>

          <div className="flex items-center bg-white rounded px-4 py-2 shadow-sm">
            <input type="checkbox" className="mr-3" />
            <span className="flex-1">Create a database of guest authors</span>
            <span className="ml-2 text-gray-400">&gt;</span>
          </div>

          <div className="flex items-center bg-white rounded px-4 py-2 shadow-sm">
            <input type="checkbox" className="mr-3" />
            <span className="flex-1">Renew driver's license</span>
            <span className="ml-2 text-gray-400 text-xs flex items-center gap-2">
              <span className="bg-red-400 text-white px-2 rounded text-xs">
                Personal
              </span>
              <span>1 Subtask</span>
              <span>22-03-22</span>
              &gt;
            </span>
          </div>

          <div className="flex items-center bg-white rounded px-4 py-2 shadow-sm">
            <input type="checkbox" className="mr-3" />
            <span className="flex-1">Consult accountant</span>
            <span className="ml-2 text-gray-400 text-xs flex items-center gap-2">
              <span className="bg-yellow-400 text-white px-2 rounded text-xs">
                List
              </span>
              <span>3 Subtasks</span>
              &gt;
            </span>
          </div>

          <div className="flex items-center bg-white rounded px-4 py-2 shadow-sm">
            <input type="checkbox" className="mr-3" />
            <span className="flex-1">Print business card</span>
            <span className="ml-2 text-gray-400">&gt;</span>
          </div>
        </div>
      </div>

      {/* Task Detail Panel */}
      <section className="w-[350px] bg-white border-l px-8 py-8 flex flex-col">
        <div className="mb-6">
          <span className="font-bold text-lg">Task:</span>
          <div className="text-gray-700 font-semibold mt-2">
            Renew driver's license
          </div>
          <div className="text-gray-400 text-sm mt-1">Description</div>
        </div>
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gray-500">List</span>
            <select className="border rounded px-2 py-1 text-sm">
              <option>Personal</option>
            </select>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gray-500">Due date</span>
            <input
              type="date"
              className="border rounded px-2 py-1 text-sm"
              value="2022-03-11"
              readOnly
            />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gray-500">Tags</span>
            <span className="bg-cyan-100 text-cyan-800 px-2 py-1 rounded text-xs">
              Tag 1
            </span>
            <button className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
              + Add Tag
            </button>
          </div>
        </div>
        <div className="mb-4">
          <div className="font-semibold mb-2">Subtasks:</div>
          <button className="text-gray-500 text-sm mb-2 flex items-center gap-1">
            <span className="text-lg">+</span> Add New Subtask
          </button>
          <div className="flex items-center gap-2">
            <input type="checkbox" />
            <span>Subtask</span>
          </div>
        </div>
        <div className="mt-auto flex gap-2">
          <button className="border border-gray-300 rounded px-4 py-2 text-gray-700">
            Delete Task
          </button>
          <button className="bg-yellow-400 text-white rounded px-4 py-2 font-semibold">
            Save changes
          </button>
        </div>
      </section>

      {/* Pro badge */}
      <div className="absolute top-6 right-8">
        <span className="bg-blue-400 text-white px-6 py-2 rounded-full font-bold text-lg shadow">
          Pro
        </span>
      </div>
    </div>
  );
}
