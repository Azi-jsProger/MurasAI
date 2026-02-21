"use client";

import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/locales";
import Skeleton from "@/components/Skeleton";
export default function Personal() {
  const { userName, avatarBg } = useContext(UserContext);
  const { language, isLoaded } = useLanguage();
  const t = translations[language];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 mt-10 sm:mt-0">
      {/* Заголовок */}
      {isLoaded ? (
        <h1 className="text-2xl sm:text-3xl font-bold">👤 {t.personalCard}</h1>
      ) : (
        <Skeleton width="w-40" height="h-8" />
      )}

      {/* Профиль */}
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-8 rounded-2xl shadow-md flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
        {isLoaded ? (
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=${avatarBg}&color=fff`}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full shadow-lg"
          />
        ) : (
          <Skeleton width="w-24" height="h-24" circle />
        )}

        <div className="text-center sm:text-left">
          {isLoaded ? (
            <>
              <h2 className="text-xl sm:text-2xl font-semibold">{userName}</h2>
              <p className="text-gray-500 text-sm sm:text-base">
                {t.studentRole}
              </p>

              <div className="mt-2 sm:mt-4 bg-indigo-100 dark:bg-gray-700 text-indigo-700 dark:text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full inline-block text-xs sm:text-sm font-medium">
                {t.aiLevel}: {t.advanced}
              </div>
            </>
          ) : (
            <>
              <Skeleton width="w-32" height="h-6" className="mb-2" />
              <Skeleton width="w-40" height="h-4" className="mb-2" />
              <Skeleton width="w-24" height="h-5" />
            </>
          )}
        </div>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {isLoaded ? (
          <>
            <StatCard
              title={t.testsCompleted}
              value="24"
              color="from-indigo-500 to-purple-600"
            />
            <StatCard
              title={t.avgScore}
              value="82%"
              color="from-emerald-500 to-teal-600"
            />
            <StatCard
              title={t.learningHours}
              value={t.hour}
              color="from-orange-500 to-pink-500"
            />
            <StatCard
              title={t.aiRating}
              value="A+"
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

      {/* AI анализ */}
      {isLoaded ? (
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 sm:p-8 rounded-2xl shadow-lg">
          <h3 className="font-semibold mb-1 sm:mb-2 text-base sm:text-lg">
            🧠 {t.aiAnalysis}
          </h3>
          <p className="opacity-90 text-xs sm:text-sm">{t.aiAnalysisText}</p>
        </div>
      ) : (
        <Skeleton width="w-full" height="h-32" className="rounded-2xl" />
      )}
    </div>
  );
}

function StatCard({ title, value, color }: any) {
  return (
    <div
      className={`bg-gradient-to-r ${color} text-white p-4 sm:p-6 rounded-2xl shadow-lg`}
    >
      <p className="text-xs sm:text-sm opacity-80">{title}</p>
      <p className="text-xl sm:text-2xl font-semibold">{value}</p>
    </div>
  );
}
