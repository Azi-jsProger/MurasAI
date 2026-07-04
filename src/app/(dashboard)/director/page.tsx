"use client";

import { useEffect, useState } from "react";
import { Building2, Users, GraduationCap, BarChart3 } from "lucide-react";
import RoleGuard from "@/components/RoleGuard";
import Skeleton from "@/components/Skeleton";
import { DirectorOverviewDto, fetchDirectorOverview } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/locales";
import { PageHeader, PageShell, StatCard } from "@/components/ui/page-shell";

export default function DirectorPage() {
  return (
    <RoleGuard roles={["director", "admin", "supAdmin"]}>
      <DirectorContent />
    </RoleGuard>
  );
}

function DirectorContent() {
  const { language } = useLanguage();
  const t = translations[language];
  const [data, setData] = useState<DirectorOverviewDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDirectorOverview().then((d) => {
      setData(d);
      setLoading(false);
    });
  }, []);

  return (
    <PageShell>
      <PageHeader
        icon={Building2}
        title={t.directorPanel}
        subtitle="Аналитика школы, учителей и учеников"
      />

      {loading || !data ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} width="w-full" height="h-24" className="rounded-2xl" />
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
          <StatCard
            title="Ученики"
            value={String(data.totalStudents)}
            accent="from-blue-500 to-cyan-500"
          />
          <StatCard
            title="Учителя"
            value={String(data.totalTeachers)}
            accent="from-violet-500 to-purple-500"
          />
          <StatCard
            title="Персонал"
            value={String(data.totalStaff)}
            accent="from-emerald-500 to-teal-500"
          />
          <StatCard
            title={t.avgScore}
            value={`${data.avgScorePercent}%`}
            accent="from-indigo-600 to-violet-600"
          />
          <StatCard
            title={t.testsCompleted}
            value={String(data.totalTestsCompleted)}
            accent="from-orange-500 to-pink-500"
          />
          <StatCard
            title="Активных пользователей"
            value={String(data.activeUsers)}
            accent="from-amber-500 to-yellow-500"
          />
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/80">
          <Users className="mb-3 h-8 w-8 text-indigo-500" />
          <h3 className="font-semibold">Контингент</h3>
          <p className="mt-1 text-sm text-gray-500">
            Общее число учеников и преподавателей в системе
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/80">
          <GraduationCap className="mb-3 h-8 w-8 text-emerald-500" />
          <h3 className="font-semibold">Успеваемость</h3>
          <p className="mt-1 text-sm text-gray-500">
            Средний балл по всем пройденным тестам
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/80">
          <BarChart3 className="mb-3 h-8 w-8 text-violet-500" />
          <h3 className="font-semibold">Активность</h3>
          <p className="mt-1 text-sm text-gray-500">
            Количество завершённых тестов за период
          </p>
        </div>
      </div>
    </PageShell>
  );
}
