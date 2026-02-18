"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import icon from "../../public/murasAI_icon.jpg"

export default function Sidebar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    cn(
      "px-3 py-2 rounded-lg text-sm transition-colors",
      pathname === path
        ? "bg-gray-100 font-medium"
        : "text-gray-600 hover:bg-gray-100 hover:text-black",
    );

  return (
    <div className="w-64 h-screen border-r bg-white p-4 flex flex-col">
      <Link href="/" className="flex items-center mb-8 gap-3">
      <Image src={icon} alt="icon" className="size-[38px] rounded-[100%]" />
        <h1 className="text-lg font-semibold ">MurasAI</h1>
      </Link>

      <nav className="flex flex-col gap-1 font-normal">
        <Link href="/" className={linkClass("/")}>
          Dashboard
        </Link>
          <Link href="/schedule" className={linkClass("/schedule")}>
          Расписание
        </Link>
          <Link href="/" className={linkClass("/")}>
          Dashboard
        </Link>
          <Link href="/" className={linkClass("/")}>
          Dashboard
        </Link>

        <Link href="/chat" className={linkClass("/chat")}>
          AI помощник
        </Link>

        <Link href="/tests" className={linkClass("/tests")}>
          Генератор тестов
        </Link>

        <Link href="/plan" className={linkClass("/study-plan")}>
          План подготовки
        </Link>
      </nav>
    </div>
  );
}
