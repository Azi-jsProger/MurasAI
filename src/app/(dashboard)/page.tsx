"use client";

import { Bot, FileText, CalendarDays, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/locales";
import Skeleton from "@/components/Skeleton";
import {
  ModuleCard,
  PageHeader,
  PageShell,
  StatCard,
} from "@/components/ui/page-shell";

export default function Dashboard() {
  const { language, isLoaded } = useLanguage();
  const t = translations[language];

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

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
        {isLoaded ? (
          <>
            <StatCard
              title={t.avgScore}
              value="82%"
              accent="from-indigo-600 to-violet-600"
            />
            <StatCard
              title={t.aiRating}
              value={t.advanced}
              accent="from-emerald-500 to-teal-500"
            />
            <StatCard
              title={t.testsCompleted}
              value="24"
              accent="from-orange-500 to-pink-500"
            />
            <StatCard
              title={t.learningHours}
              value={`12 ${t.hour}`}
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
        {isLoaded ? (
          <>
            <ModuleCard
              href="/chat"
              icon={Bot}
              title={t.aiAssistant}
              description={t.aiAssistantDesc}
            />
            <ModuleCard
              href="/tests"
              icon={FileText}
              title={t.testGenerator}
              description={t.testGeneratorDesc}
              accent="text-emerald-500"
            />
            <ModuleCard
              href="/plan"
              icon={CalendarDays}
              title={t.studyPlanner}
              description={t.studyPlannerDesc}
              accent="text-orange-500"
            />
          </>
        ) : (
          Array(3)
            .fill(0)
            .map((_, i) => (
              <Skeleton
                key={i}
                width="w-full"
                height="h-40"
                className="rounded-2xl"
              />
            ))
        )}
      </div>
    </PageShell>
  );
}
