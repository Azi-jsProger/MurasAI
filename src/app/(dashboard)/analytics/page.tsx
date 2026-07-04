"use client";

import ProgressChart from "@/components/charts/ProgressChart";
import SubjectChart from "@/components/charts/SubjectChart";
import SkillsRadarChart from "@/components/charts/SkillsRadarChart";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/locales";
import Skeleton from "@/components/Skeleton";
import { BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";
import { AnalyticsDto, fetchAnalytics } from "@/lib/api";
import { translateKey } from "@/lib/i18n";
import { PageHeader, PageShell, StatCard } from "@/components/ui/page-shell";

export default function AnalyticsPage() {
  const { language, isLoaded } = useLanguage();
  const t = translations[language];
  const [analytics, setAnalytics] = useState<AnalyticsDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics().then((data) => {
      setAnalytics(data);
      setLoading(false);
    });
  }, []);

  const stats = analytics?.stats;
  const ratingLabel = stats
    ? translateKey(t, stats.aiRatingKey)
    : "";

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
        {isLoaded && !loading && stats
          ? [
              { title: t.avgScore, value: `${stats.avgScorePercent}%`, accent: "from-indigo-600 to-violet-600" },
              { title: t.aiRating, value: ratingLabel, accent: "from-emerald-500 to-teal-500" },
              { title: t.testsCompleted, value: String(stats.testsCompleted), accent: "from-orange-500 to-pink-500" },
              { title: t.learningHours, value: `${stats.learningHours} ${t.hour}`, accent: "from-blue-500 to-cyan-500" },
            ].map((card, i) => (
              <StatCard key={i} title={card.title} value={card.value} accent={card.accent} />
            ))
          : Array(4)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} width="w-full" height="h-24" className="rounded-2xl" />
              ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        {isLoaded && !loading ? (
          <>
            <ProgressChart data={analytics?.progress} />
            <SubjectChart data={analytics?.subjects} />
          </>
        ) : (
          Array(2)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} width="w-full" height="h-72" className="rounded-2xl" />
            ))
        )}
      </div>

      {isLoaded && !loading ? (
        <SkillsRadarChart data={analytics?.skills} />
      ) : (
        <Skeleton width="w-full" height="h-72" className="rounded-2xl" />
      )}
    </PageShell>
  );
}
