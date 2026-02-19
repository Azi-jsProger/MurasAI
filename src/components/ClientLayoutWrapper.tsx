"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Основной контент */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto relative">
        {/* Бургер-меню на мобилке — показываем только если Sidebar закрыт */}
        {!sidebarOpen && (
          <button
            className="sm:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
        )}

        {children}
      </main>
    </div>
  );
}
