"use client";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/locales";
import Skeleton from "@/components/Skeleton";
import { Brain, User } from "lucide-react";
import { fetchStats, StatsDto } from "@/lib/api";
import { translateKey } from "@/lib/i18n";
import { PageCard, PageHeader, PageShell, StatCard } from "@/components/ui/page-shell";

export default function Personal() {
  const { userName, avatarBg, aiRatingKey, aiGrade } = useContext(UserContext);
  const { language, isLoaded } = useLanguage();
  const t = translations[language];
  const [stats, setStats] = useState<StatsDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats().then((data) => {
      setStats(data);
      setLoading(false);
    });
  }, []);

  const ratingLabel = translateKey(t, aiRatingKey);

  return (
    <PageShell>
      {isLoaded ? (
        <PageHeader
          icon={User}
          title={t.personalCard}
          subtitle={t.studentRole}
        />
      ) : (
        <Skeleton width="w-48" height="h-10" />
      )}

      <PageCard className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        {isLoaded ? (
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=${avatarBg}&color=fff`}
            alt=""
            className="h-28 w-28 rounded-2xl shadow-lg ring-2 ring-indigo-500/30"
          />
        ) : (
          <Skeleton width="w-28" height="h-28" className="rounded-2xl" />
        )}

        <div className="text-center sm:text-left">
          {isLoaded ? (
            <>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {userName}
              </h2>
              <p className="mt-1 text-gray-500 dark:text-slate-400">
                {t.studentRole}
              </p>
              <span className="mt-4 inline-flex rounded-full bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-600 ring-1 ring-indigo-500/30 dark:text-indigo-400">
                {t.aiLevel}: {ratingLabel}
              </span>
            </>
          ) : (
            <>
              <Skeleton width="w-40" height="h-7" className="mb-2" />
              <Skeleton width="w-56" height="h-5" />
            </>
          )}
        </div>
      </PageCard>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
        {isLoaded && !loading && stats ? (
          <>
            <StatCard title={t.testsCompleted} value={String(stats.testsCompleted)} accent="from-indigo-600 to-violet-600" />
            <StatCard title={t.avgScore} value={`${stats.avgScorePercent}%`} accent="from-emerald-500 to-teal-500" />
            <StatCard title={t.learningHours} value={`${stats.learningHours} ${t.hour}`} accent="from-orange-500 to-pink-500" />
            <StatCard title={t.aiRating} value={aiGrade} accent="from-blue-500 to-cyan-500" />
          </>
        ) : (
          Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} width="w-full" height="h-24" className="rounded-2xl" />
            ))
        )}
      </div>

      {isLoaded ? (
        <PageCard className="relative overflow-hidden border-indigo-500/20 bg-gradient-to-br from-indigo-600/10 to-violet-600/10">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-500">
              <Brain className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {t.aiAnalysis}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-slate-400">
                {t.aiAnalysisText}
              </p>
            </div>
          </div>
        </PageCard>
      ) : (
        <Skeleton width="w-full" height="h-32" className="rounded-2xl" />
      )}
    </PageShell>
  );
}
