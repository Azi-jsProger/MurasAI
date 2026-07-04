"use client";

import { useEffect, useState } from "react";
import { BookOpen, Users, CalendarDays } from "lucide-react";
import RoleGuard from "@/components/RoleGuard";
import Skeleton from "@/components/Skeleton";
import { TeacherOverviewDto, fetchTeacherOverview } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/locales";
import { PageHeader, PageShell, StatCard } from "@/components/ui/page-shell";

export default function TeacherPage() {
  return (
    <RoleGuard roles={["teacher", "director", "admin", "supAdmin"]}>
      <TeacherContent />
    </RoleGuard>
  );
}

function TeacherContent() {
  const { language } = useLanguage();
  const t = translations[language];
  const [data, setData] = useState<TeacherOverviewDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeacherOverview().then((d) => {
      setData(d);
      setLoading(false);
    });
  }, []);

  const subjectLabel = (key: string) =>
    t.subjects[key as keyof typeof t.subjects] ?? key;

  return (
    <PageShell>
      <PageHeader
        icon={BookOpen}
        title={t.teacherPanel}
        subtitle="Классы, предметы и успеваемость учеников"
      />

      {loading || !data ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} width="w-full" height="h-24" className="rounded-2xl" />
            ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
            <StatCard
              title="Мои ученики"
              value={String(data.myStudentsCount)}
              accent="from-indigo-600 to-violet-600"
            />
            <StatCard
              title="Уроков на неделе"
              value={String(data.lessonsThisWeek)}
              accent="from-emerald-500 to-teal-500"
            />
            <StatCard
              title={t.avgScore}
              value={`${data.avgClassScore}%`}
              accent="from-orange-500 to-pink-500"
            />
            <StatCard
              title="Предметов"
              value={String(data.subjects.length)}
              accent="from-blue-500 to-cyan-500"
            />
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/80">
              <Users className="mb-3 h-8 w-8 text-indigo-500" />
              <h3 className="font-semibold">Мои предметы</h3>
              <ul className="mt-3 space-y-2">
                {data.subjects.map((s) => (
                  <li
                    key={s}
                    className="rounded-lg bg-indigo-500/10 px-3 py-2 text-sm text-indigo-600 dark:text-indigo-400"
                  >
                    {subjectLabel(s)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/80">
              <CalendarDays className="mb-3 h-8 w-8 text-emerald-500" />
              <h3 className="font-semibold">Расписание</h3>
              <p className="mt-2 text-sm text-gray-500">
                {data.lessonsThisWeek} уроков на этой неделе. Перейдите в раздел
                «Расписание» для деталей.
              </p>
            </div>
          </div>
        </>
      )}
    </PageShell>
  );
}
