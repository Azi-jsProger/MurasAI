"use client";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/locales";
import Skeleton from "@/components/Skeleton";
import { useEffect, useState } from "react";
import { BookOpen, CheckCircle2 } from "lucide-react";
import { PageCard, PageHeader, PageShell } from "@/components/ui/page-shell";
import { cn } from "@/lib/utils";

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
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageShell>
      {isLoaded ? (
        <PageHeader
          icon={BookOpen}
          title={t.studyPlanTitle}
          subtitle={t.studyPlannerDesc}
        />
      ) : (
        <Skeleton width="w-56" height="h-10" />
      )}

      <div className="space-y-4">
        {(loading || !isLoaded) &&
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-4">
              <Skeleton width="w-8" height="h-8" circle />
              <Skeleton width="w-full" height="h-20" className="rounded-2xl" />
            </div>
          ))}

        {!loading &&
          isLoaded &&
          plan.map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600/20 text-indigo-500 ring-1 ring-indigo-500/40",
                    i === 0 && "bg-indigo-600 text-white ring-0",
                  )}
                >
                  {i < 2 ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <span className="text-xs font-bold">{i + 1}</span>
                  )}
                </div>
                {i !== plan.length - 1 && (
                  <div className="my-1 w-px flex-1 bg-indigo-500/20" />
                )}
              </div>

              <PageCard className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {item.day}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">
                  {item.task}
                </p>
              </PageCard>
            </div>
          ))}
      </div>
    </PageShell>
  );
}
