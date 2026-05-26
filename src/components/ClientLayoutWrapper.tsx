"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-950">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <main className="relative flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
        {!sidebarOpen && (
          <button
            type="button"
            className="fixed left-4 top-4 z-50 rounded-xl border border-gray-200/80 bg-white/90 p-2 shadow-md backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 sm:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} className="text-gray-700 dark:text-slate-200" />
          </button>
        )}

        {children}
      </main>
    </div>
  );
}
