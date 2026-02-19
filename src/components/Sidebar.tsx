"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import icon from "../../public/murasAI_icon.jpg";
import { useState, useContext } from "react";
import { Settings, LogOut, X } from "lucide-react";
import { UserContext } from "@/context/UserContext";

interface SidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname();
  const { userName, avatarBg } = useContext(UserContext);
  const [profileOpen, setProfileOpen] = useState(false);

  const linkClass = (path: string) =>
    cn(
      "px-3 py-2 rounded-lg text-sm transition-colors",
      pathname === path
        ? "bg-gray-100 font-medium"
        : "text-gray-600 hover:bg-gray-100 hover:text-black"
    );

  return (
    <>
      {/* Overlay для мобильных — ниже Sidebar по z-index */}
      <div
        className={cn(
          "fixed inset-0 bg-black bg-opacity-30 transition-opacity sm:hidden z-40",
          open ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 h-[100vh] flex flex-col w-64 bg-white border-r shadow-lg transform transition-transform duration-300 sm:relative sm:translate-x-0 z-50",
          open ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b">
          <Link href="/" className="flex items-center gap-3">
            <Image src={icon} alt="icon" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" />
            <h1 className="text-lg sm:text-xl font-semibold">MurasAI LMS</h1>
          </Link>

          {/* Кнопка закрытия на мобилке */}
          <button
            className="sm:hidden p-1 rounded-md hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-4 sm:p-6 font-normal">
          <Link href="/" className={linkClass("/")}>Главная</Link>
          <Link href="/schedule" className={linkClass("/schedule")}>Расписание</Link>
          <Link href="/personal" className={linkClass("/personal")}>Личная карточка</Link>
          <Link href="/analytics" className={linkClass("/analytics")}>Аналитика</Link>
          <Link href="/webtest" className={linkClass("/webtest")}>Тестирование</Link>
          <Link href="/chat" className={linkClass("/chat")}>AI помощник</Link>
          <Link href="/tests" className={linkClass("/tests")}>Генератор тестов</Link>
          <Link href="/plan" className={linkClass("/study-plan")}>План подготовки</Link>
        </nav>

        {/* Профиль */}
        <div className="relative p-4 sm:p-6 mt-auto">
          <div
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100"
          >
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=${avatarBg}&color=fff`}
              className="w-10 h-10 rounded-full"
            />
            <div className=" sm:block">
              <p className="text-sm font-medium">{userName.split(" ")[0]}</p>
              <p className="text-xs text-gray-500">Student</p>
            </div>
          </div>

          {profileOpen && (
            <div className="absolute bottom-14 left-0 w-full bg-white shadow rounded-lg p-2 sm:p-3">
              <button className="flex items-center gap-2 p-2 hover:bg-gray-100 w-full text-sm sm:text-base">
                <Settings size={16} />
                Settings
              </button>

              <button className="flex items-center gap-2 p-2 hover:bg-gray-100 w-full text-sm sm:text-base">
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
