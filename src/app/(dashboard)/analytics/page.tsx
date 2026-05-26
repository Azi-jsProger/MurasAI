"use client";

import ProgressChart from "@/components/charts/ProgressChart";
import SubjectChart from "@/components/charts/SubjectChart";
import SkillsRadarChart from "@/components/charts/SkillsRadarChart";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/locales";
import Skeleton from "@/components/Skeleton";
import { BarChart3 } from "lucide-react";
import { PageHeader, PageShell, StatCard } from "@/components/ui/page-shell";

export default function AnalyticsPage() {
  const { language, isLoaded } = useLanguage();
  const t = translations[language];

  const stats = [
    { title: t.avgScore, value: "82%", accent: "from-indigo-600 to-violet-600" },
    { title: t.aiRating, value: t.advanced, accent: "from-emerald-500 to-teal-500" },
    { title: t.testsCompleted, value: "24", accent: "from-orange-500 to-pink-500" },
    { title: t.learningHours, value: `12 ${t.hour}`, accent: "from-blue-500 to-cyan-500" },
  ];

  return (
    <PageShell>
      {isLoaded ? (
        <PageHeader
          icon={BarChart3}
          title={t.aiAnalytics}
          subtitle={t.helperText}
        />
      ) : (
        <Skeleton width="w-64" height="h-10" />
      )}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
        {isLoaded
          ? stats.map((card, i) => (
              <StatCard
                key={i}
                title={card.title}
                value={card.value}
                accent={card.accent}
              />
            ))
          : Array(4)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} width="w-full" height="h-24" className="rounded-2xl" />
              ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        {isLoaded ? (
          <>
            <ProgressChart />
            <SubjectChart />
          </>
        ) : (
          Array(2)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} width="w-full" height="h-72" className="rounded-2xl" />
            ))
        )}
      </div>

      {isLoaded ? (
        <SkillsRadarChart />
      ) : (
        <Skeleton width="w-full" height="h-72" className="rounded-2xl" />
      )}
    </PageShell>
  );
}
