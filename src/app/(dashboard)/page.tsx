"use client";

import { Bot, FileText, CalendarDays } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/locales";
import Skeleton from "@/components/Skeleton";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function Dashboard() {
  const { language, isLoaded } = useLanguage();
  const t = translations[language];

  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("http://localhost:8080/api/auth/me", {
        credentials: "include",
      });

      const text = await res.text();
      if (text === "Not logged in") {
        router.push("/login");
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 mt-10 sm:mt-0">
      <div>
        {isLoaded ? (
          <>
            <h1 className="text-2xl sm:text-3xl font-bold">{t.welcome} 🚀</h1>
            <p className="text-gray-500 mt-1 sm:mt-2 text-sm sm:text-base">
              {t.helperText}
            </p>
          </>
        ) : (
          <>
            <Skeleton width="w-3/4" height="h-8" className="mb-2" />
            <Skeleton width="w-1/2" height="h-4" />
          </>
        )}
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {isLoaded ? (
          <>
            <StatCard
              title={t.avgScore}
              value="82%"
              color="from-indigo-500 to-purple-600"
            />
            <StatCard
              title={t.aiRating}
              value={t.advanced}
              color="from-emerald-500 to-teal-600"
            />
            <StatCard
              title={t.testsCompleted}
              value="24"
              color="from-orange-500 to-pink-500"
            />
            <StatCard
              title={t.learningHours}
              value={t.hour}
              color="from-blue-500 to-cyan-500"
            />
          </>
        ) : (
          Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton
                key={i}
                width="w-full"
                height="h-20"
                className="rounded-2xl"
              />
            ))
        )}
      </div>

      {/* Основные модули */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {isLoaded ? (
          <>
            <Link href="/chat">
              <ModuleCard
                icon={Bot}
                color="text-indigo-500"
                title={t.aiAssistant}
                description={t.aiAssistantDesc}
              />
            </Link>

            <Link href="/tests">
              <ModuleCard
                icon={FileText}
                color="text-emerald-500"
                title={t.testGenerator}
                description={t.testGeneratorDesc}
              />
            </Link>

            <Link href="/plan">
              <ModuleCard
                icon={CalendarDays}
                color="text-orange-500"
                title={t.studyPlanner}
                description={t.studyPlannerDesc}
              />
            </Link>
          </>
        ) : (
          Array(3)
            .fill(0)
            .map((_, i) => (
              <Skeleton
                key={i}
                width="w-full"
                height="h-40"
                className="rounded-2xl"
              />
            ))
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, color }: any) {
  return (
    <div
      className={`bg-gradient-to-r ${color} text-white p-4 sm:p-6 rounded-2xl shadow-lg`}
    >
      <p className="text-xs sm:text-sm opacity-80">{title}</p>
      <p className="text-[18px] sm:text-2xl font-semibold">{value}</p>
    </div>
  );
}

function ModuleCard({ icon: Icon, color, title, description }: any) {
  return (
    <div className="bg-white h-[25vh] sm:h-[30vh] dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
      <Icon
        className={`w-8 h-8 sm:w-10 sm:h-10 ${color} mb-3 sm:mb-4 group-hover:scale-110 transition`}
      />
      <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
        {description}
      </p>
    </div>
  );
}
