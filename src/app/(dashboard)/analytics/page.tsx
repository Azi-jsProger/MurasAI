"use client";

import ProgressChart from "@/components/charts/ProgressChart";
import SubjectChart from "@/components/charts/SubjectChart";
import SkillsRadarChart from "@/components/charts/SkillsRadarChart";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/locales";
import Skeleton from "@/components/Skeleton";

export default function AnalyticsPage() {
  const { language, isLoaded } = useLanguage();
  const t = translations[language];

  // Карточки статистики
  const stats = [
    { title: t.avgScore, value: "82%" },
    { title: t.aiRating, value: t.advanced },
    { title: t.testsCompleted, value: "24" },
    { title: t.learningHours, value: t.hour },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 mt-10 sm:mt-0">
      {/* Заголовок */}
      {isLoaded ? (
        <h1 className="text-2xl sm:text-3xl font-bold">{t.aiAnalytics}</h1>
      ) : (
        <Skeleton width="w-64" height="h-8" />
      )}

      {/* Карточки статистики */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {isLoaded
          ? stats.map((card, i) => (
              <div key={i} className="bg-white dark:bg-gray-700 p-4 sm:p-6 rounded-2xl shadow-sm">
                <p className="text-sm text-gray-500">{card.title}</p>
                <p className="text-xl sm:text-2xl font-semibold">{card.value}</p>
              </div>
            ))
          : Array(4)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} width="w-full" height="h-20" className="rounded-2xl" />
              ))}
      </div>

      {/* Графики */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {isLoaded ? (
          <>
            <ProgressChart />
            <SubjectChart />
          </>
        ) : (
          Array(2)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} width="w-full" height="h-64" className="rounded-2xl" />
            ))
        )}
      </div>

      <div className="grid grid-cols-1">
        {isLoaded ? <SkillsRadarChart /> : <Skeleton width="w-full" height="h-64" className="rounded-2xl" />}
      </div>
    </div>
  );
}