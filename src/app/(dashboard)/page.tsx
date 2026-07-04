"use client";

import { useContext, useEffect, useState } from "react";
import {
  Bot,
  FileText,
  CalendarDays,
  Sparkles,
  Shield,
  Building2,
  GraduationCap,
  BookOpen,
} from "lucide-react";
import { UserContext } from "@/context/UserContext";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/locales";
import Skeleton from "@/components/Skeleton";
import { fetchStats, StatsDto } from "@/lib/api";
import { translateKey } from "@/lib/i18n";
import {
  ModuleCard,
  PageHeader,
  PageShell,
  StatCard,
} from "@/components/ui/page-shell";

export default function Dashboard() {
  const { language, isLoaded } = useLanguage();
  const t = translations[language];
  const { hasRole } = useContext(UserContext);
  const [stats, setStats] = useState<StatsDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats().then((data) => {
      setStats(data);
      setLoading(false);
    });
  }, []);

  const ratingLabel = stats ? translateKey(t, stats.aiRatingKey) : "";

  const modules = [
    hasRole("student", "teacher") && {
      href: "/chat",
      icon: Bot,
      title: t.aiAssistant,
      description: t.aiAssistantDesc,
    },
    hasRole("student", "teacher") && {
      href: "/tests",
      icon: FileText,
      title: t.testGenerator,
      description: t.testGeneratorDesc,
      accent: "text-emerald-500",
    },
    hasRole("student") && {
      href: "/plan",
      icon: BookOpen,
      title: t.studyPlanner,
      description: t.studyPlannerDesc,
      accent: "text-orange-500",
    },
    hasRole("teacher", "director") && {
      href: "/teacher",
      icon: GraduationCap,
      title: t.teacherPanel,
      description: "Классы и успеваемость",
      accent: "text-blue-500",
    },
    hasRole("director", "admin", "supAdmin") && {
      href: "/director",
      icon: Building2,
      title: t.directorPanel,
      description: "Аналитика школы",
      accent: "text-violet-500",
    },
    hasRole("admin", "supAdmin") && {
      href: "/admin",
      icon: Shield,
      title: t.adminPanel,
      description: "Пользователи и роли",
      accent: "text-red-500",
    },
    hasRole("secretary") && {
      href: "/schedule",
      icon: CalendarDays,
      title: t.schedule,
      description: "Расписание занятий",
      accent: "text-cyan-500",
    },
  ].filter(Boolean) as {
    href: string;
    icon: typeof Bot;
    title: string;
    description: string;
    accent?: string;
  }[];

  return (
    <PageShell>
      {isLoaded ? (
        <PageHeader icon={Sparkles} title={t.welcome} subtitle={t.helperText} />
      ) : (
        <>
          <Skeleton width="w-64" height="h-10" />
          <Skeleton width="w-96" height="h-5" className="mt-2" />
        </>
      )}

      {(hasRole("student", "teacher") || hasRole("director")) && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
          {isLoaded && !loading && stats ? (
            <>
              <StatCard
                title={t.avgScore}
                value={`${stats.avgScorePercent}%`}
                accent="from-indigo-600 to-violet-600"
              />
              <StatCard
                title={t.aiRating}
                value={ratingLabel}
                accent="from-emerald-500 to-teal-500"
              />
              <StatCard
                title={t.testsCompleted}
                value={String(stats.testsCompleted)}
                accent="from-orange-500 to-pink-500"
              />
              <StatCard
                title={t.learningHours}
                value={`${stats.learningHours} ${t.hour}`}
                accent="from-blue-500 to-cyan-500"
              />
            </>
          ) : (
            Array(4)
              .fill(0)
              .map((_, i) => (
                <Skeleton
                  key={i}
                  width="w-full"
                  height="h-24"
                  className="rounded-2xl"
                />
              ))
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
        {isLoaded
          ? modules.map((m) => (
              <ModuleCard
                key={m.href}
                href={m.href}
                icon={m.icon}
                title={m.title}
                description={m.description}
                accent={m.accent}
              />
            ))
          : Array(3)
              .fill(0)
              .map((_, i) => (
                <Skeleton
                  key={i}
                  width="w-full"
                  height="h-40"
                  className="rounded-2xl"
                />
              ))}
      </div>
    </PageShell>
  );
}
