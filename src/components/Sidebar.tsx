"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import icon from "../../public/murasAI_icon.jpg";
import { useState, useContext } from "react";
import { Settings, LogOut, X } from "lucide-react";
import { UserContext } from "@/context/UserContext";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/locales";
import Skeleton from "./Skeleton";
import { useTheme } from "@/context/ThemeContext";

interface SidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname();
  const { userName, avatarBg } = useContext(UserContext);
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const { language, setLanguage, isLoaded } = useLanguage();
  const t = translations[language];

  const linkClass = (path: string) =>
    cn(
      "px-3 py-2 rounded-lg text-sm transition-colors",
      pathname === path
        ? "bg-gray-100 dark:bg-gray-600 font-medium"
        : "text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white",
    );

  const postLogout = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        window.location.href = "/login";
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* Overlay для мобилок */}
      <div
        className={cn(
          "fixed inset-0 bg-red-700 bg-opacity-30 transition-opacity sm:hidden z-40",
          open ? "opacity-100 visible" : "opacity-0 invisible",
        )}
        onClick={() => setOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 h-[100vh] flex flex-col w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 shadow-lg transform transition-transform duration-300 sm:relative sm:translate-x-0 z-50",
          open ? "translate-x-0" : "-translate-x-full sm:translate-x-0",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b">
          {isLoaded ? (
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={icon}
                alt="icon"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
              />
              <h1 className="text-lg sm:text-xl font-semibold">MurasAI LMS</h1>
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <Skeleton width="w-10" height="h-10" circle />
              <Skeleton width="w-24" height="h-6" />
            </div>
          )}

          <button
            className="sm:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-1 p-4 sm:p-6 font-normal">
          {isLoaded ? (
            <>
              <Link href="/" className={linkClass("/")}>
                {t.home}
              </Link>
              <Link href="/schedule" className={linkClass("/schedule")}>
                {t.schedule}
              </Link>
              <Link href="/personal" className={linkClass("/personal")}>
                {t.personal}
              </Link>
              <Link href="/analytics" className={linkClass("/analytics")}>
                {t.analytics}
              </Link>
              <Link href="/tests" className={linkClass("/tests")}>
                {t.tests}
              </Link>
              <Link href="/webtest" className={linkClass("/webtest")}>
                {t.webtest}
              </Link>
              <Link href="/chat" className={linkClass("/chat")}>
                {t.chat}
              </Link>
              <Link href="/plan" className={linkClass("/plan")}>
                {t.plan}
              </Link>
            </>
          ) : (
            <>
              {Array(8)
                .fill(0)
                .map((_, i) => (
                  <Skeleton
                    key={i}
                    width="w-3/4"
                    height="h-5"
                    className="my-1"
                  />
                ))}
            </>
          )}
        </nav>

        {/* Профиль */}
        <div className="relative p-4 sm:p-6 mt-auto">
          <div
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {isLoaded ? (
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=${avatarBg}&color=fff`}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <Skeleton width="w-10" height="h-10" circle />
            )}
            <div className="sm:block">
              {isLoaded ? (
                <>
                  <p className="text-sm font-medium">
                    {userName.split(" ")[0]}
                  </p>
                  <p className="text-xs text-gray-500">{t.student}</p>
                </>
              ) : (
                <>
                  <Skeleton width="w-16" height="h-4" />
                  <Skeleton width="w-10" height="h-3" />
                </>
              )}
            </div>
          </div>

          {profileOpen && (
            <div className="absolute bottom-14 left-0 w-full bg-white dark:bg-gray-700 shadow rounded-lg p-2 sm:p-3 z-50">
              <button
                className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-sm sm:text-base"
                onClick={() => setSettingsOpen(true)}
              >
                <Settings size={16} /> {t.settings}
              </button>

              <button
                className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-sm sm:text-base"
                onClick={postLogout}
              >
                <LogOut size={16} /> {t.logout}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Settings Modal */}
      {settingsOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[8px] bg-black/30"
          onClick={() => setSettingsOpen(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg w-11/12 max-w-md p-6 relative transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setSettingsOpen(false)}
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-4">{t.settings}</h2>

            <div className="flex flex-col gap-6">
              {/* LANGUAGE */}
              <div>
                <label className="text-sm font-medium">
                  {t.selectLanguage}:
                </label>
                <select
                  value={language}
                  onChange={(e) =>
                    setLanguage(e.target.value as "en" | "ru" | "kg")
                  }
                  className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md p-2 mt-2"
                >
                  <option value="en">English</option>
                  <option value="ru">Русский</option>
                  <option value="kg">Кыргызча</option>
                </select>
              </div>

              {/* THEME */}
              <div>
                <label className="text-sm font-medium">{t.theme}:</label>

                <div className="flex gap-6 mt-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={theme === "light"}
                      onChange={() => setTheme("light")}
                    />
                    {t.light}
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={theme === "dark"}
                      onChange={() => setTheme("dark")}
                    />
                    {t.dark}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
