"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import icon from "../../public/murasAI_icon.jpg";
import { useState, useContext } from "react";
import { Settings, LogOut } from "lucide-react";
import { UserContext } from "@/context/UserContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { userName, avatarBg } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const linkClass = (path: string) =>
    cn(
      "px-3 py-2 rounded-lg text-sm transition-colors",
      pathname === path
        ? "bg-gray-100 font-medium"
        : "text-gray-600 hover:bg-gray-100 hover:text-black"
    );

  return (
    <div className="w-64 h-screen border-r bg-white p-4 flex flex-col justify-between">
      <div>
        <Link href="/" className="flex items-center mb-8 gap-3 w-[12vw]">
          <Image src={icon} alt="icon" className="size-[38px] rounded-full" />
          <h1 className="text-lg font-semibold">MurasAI</h1>
        </Link>
        <nav className="flex flex-col gap-1 font-normal">
          <Link href="/" className={linkClass("/")}>Dashboard</Link>
          <Link href="/schedule" className={linkClass("/schedule")}>Расписание</Link>
          <Link href="/personal" className={linkClass("/personal")}>Личная карточка</Link>
          <Link href="/analytics" className={linkClass("/analytics")}>Аналитика</Link>
          <Link href="/webtest" className={linkClass("/webtest")}>Тестирование</Link>
          <Link href="/chat" className={linkClass("/chat")}>AI помощник</Link>
          <Link href="/tests" className={linkClass("/tests")}>Генератор тестов</Link>
          <Link href="/plan" className={linkClass("/study-plan")}>План подготовки</Link>
        </nav>
      </div>

      <div className="relative">
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-100"
        >
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=${avatarBg}&color=fff`}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-sm font-medium">{userName.split(" ")[0]}</p>
            <p className="text-xs text-gray-500">Student</p>
          </div>
        </div>

        {open && (
          <div className="absolute bottom-14 left-0 w-full bg-white shadow rounded-lg p-2">
            <button className="flex items-center gap-2 p-2 hover:bg-gray-100 w-full">
              <Settings size={16} />
              Settings
            </button>

            <button className="flex items-center gap-2 p-2 hover:bg-gray-100 w-full">
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
