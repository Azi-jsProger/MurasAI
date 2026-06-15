"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import icon from "../../public/murasAI_icon.jpg";
import { useState, useContext } from "react";
import {
  Settings,
  LogOut,
  X,
  Home,
  CalendarDays,
  User,
  BarChart3,
  FileText,
  ClipboardList,
  Bot,
  BookOpen,
} from "lucide-react";
import { UserContext } from "@/context/UserContext";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/locales";
import Skeleton from "./Skeleton";
import { useTheme } from "@/context/ThemeContext";
import { logout } from "@/lib/api";

interface SidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const navItems = [
  { href: "/", icon: Home, labelKey: "home" as const },
  { href: "/schedule", icon: CalendarDays, labelKey: "schedule" as const },
  { href: "/chat", icon: Bot, labelKey: "chat" as const },
  { href: "/personal", icon: User, labelKey: "personal" as const },
  { href: "/analytics", icon: BarChart3, labelKey: "analytics" as const },
  { href: "/tests", icon: FileText, labelKey: "tests" as const },
  { href: "/webtest", icon: ClipboardList, labelKey: "webtest" as const },
  { href: "/plan", icon: BookOpen, labelKey: "plan" as const },
];

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
      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
      pathname === path
        ? "bg-indigo-600/15 text-indigo-600 ring-1 ring-indigo-500/40 dark:bg-indigo-500/15 dark:text-indigo-400"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white",
    );

  const postLogout = async () => {
    const ok = await logout();
    if (ok) window.location.href = "/login";
  };

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity sm:hidden",
          open ? "opacity-100 visible" : "opacity-0 invisible",
        )}
        onClick={() => setOpen(false)}
      />

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-gray-200/80 bg-white/95 shadow-xl backdrop-blur transition-transform duration-300 dark:border-slate-800 dark:bg-slate-950/95 sm:relative sm:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full sm:translate-x-0",
        )}
      >
        <div className="flex items-center justify-between border-b border-gray-200/80 p-4 dark:border-slate-800 sm:p-5">
          {isLoaded ? (
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={icon}
                alt="MurasAI"
                className="h-9 w-9 rounded-xl ring-1 ring-indigo-500/30"
              />
              <div>
                <h1 className="text-base font-bold text-gray-900 dark:text-white">
                  MurasAI
                </h1>
                <p className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-slate-500">
                  LMS
                </p>
              </div>
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <Skeleton width="w-9" height="h-9" circle />
              <Skeleton width="w-20" height="h-6" />
            </div>
          )}

          <button
            type="button"
            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-slate-800 sm:hidden"
            onClick={() => setOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3 sm:p-4">
          {isLoaded
            ? navItems.map(({ href, icon: Icon, labelKey }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={linkClass(href)}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {t[labelKey]}
                </Link>
              ))
            : Array(8)
                .fill(0)
                .map((_, i) => (
                  <Skeleton
                    key={i}
                    width="w-full"
                    height="h-9"
                    className="my-0.5"
                  />
                ))}
        </nav>

        <div className="relative border-t border-gray-200/80 p-3 dark:border-slate-800 sm:p-4">
          <button
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex w-full items-center gap-3 rounded-xl p-2 transition hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            {isLoaded ? (
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=${avatarBg}&color=fff`}
                alt=""
                className="h-10 w-10 rounded-full ring-2 ring-indigo-500/30"
              />
            ) : (
              <Skeleton width="w-10" height="h-10" circle />
            )}
            <div className="min-w-0 text-left">
              {isLoaded ? (
                <>
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    {userName.split(" ")[0]}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-slate-400">
                    {t.student}
                  </p>
                </>
              ) : (
                <>
                  <Skeleton width="w-16" height="h-4" />
                  <Skeleton width="w-10" height="h-3" />
                </>
              )}
            </div>
          </button>

          {profileOpen && (
            <div className="absolute bottom-full left-3 right-3 mb-2 overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
              <button
                type="button"
                className="flex w-full items-center gap-2 px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-slate-800"
                onClick={() => {
                  setProfileOpen(false);
                  setSettingsOpen(true);
                }}
              >
                <Settings size={16} /> {t.settings}
              </button>
              <button
                type="button"
                className="flex w-full items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                onClick={postLogout}
              >
                <LogOut size={16} /> {t.logout}
              </button>
            </div>
          )}
        </div>
      </aside>

      {settingsOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
          onClick={() => setSettingsOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-3 top-3 rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800"
              onClick={() => setSettingsOpen(false)}
            >
              ✕
            </button>

            <h2 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
              {t.settings}
            </h2>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
                  {t.selectLanguage}
                </label>
                <select
                  value={language}
                  onChange={(e) =>
                    setLanguage(e.target.value as "en" | "ru" | "kg")
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value="en">English</option>
                  <option value="ru">Русский</option>
                  <option value="kg">Кыргызча</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
                  {t.theme}
                </label>
                <div className="flex gap-4">
                  {(["light", "dark"] as const).map((mode) => (
                    <label
                      key={mode}
                      className="flex cursor-pointer items-center gap-2 text-sm text-gray-700 dark:text-slate-300"
                    >
                      <input
                        type="radio"
                        checked={theme === mode}
                        onChange={() => setTheme(mode)}
                      />
                      {mode === "light" ? t.light : t.dark}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
