"use client";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/locales";
import Skeleton from "@/components/Skeleton";
import { useEffect, useState } from "react";

export default function StudyPlan() {
  const { language, isLoaded } = useLanguage();
  const t = translations[language];

  const [loading, setLoading] = useState(true);

  const plan = [
    { day: t.day1, task: t.task1 },
    { day: t.day2, task: t.task2 },
    { day: t.day3, task: t.task3 },
    { day: t.day4, task: t.task4 },
    { day: t.day5, task: t.task5 },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">{t.studyPlanTitle}</h1>

      <div className="space-y-6">
        {(loading || !isLoaded) &&
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-start gap-6">
              <Skeleton width="w-6" height="h-6" className="rounded-full" />
              <Skeleton width="w-full" height="h-20" className="rounded-2xl" />
            </div>
          ))}

        {!loading &&
          isLoaded &&
          plan.map((item, i) => (
            <div key={i} className="flex items-start gap-6">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-indigo-500"></div>
                {i !== plan.length - 1 && (
                  <div className="w-1 h-16 bg-indigo-200"></div>
                )}
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md flex-1">
                <h3 className="font-semibold">{item.day}</h3>
                <p className="text-gray-600 mt-2 dark:text-gray-400">{item.task}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}