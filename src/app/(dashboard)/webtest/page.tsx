"use client";

import { toast } from "react-toastify";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/locales";
import Skeleton from "@/components/Skeleton";
import { useState, useEffect } from "react";
import { ClipboardList } from "lucide-react";
import {
  PageCard,
  PageHeader,
  PageShell,
  PrimaryButton,
} from "@/components/ui/page-shell";
import { cn } from "@/lib/utils";

export default function WebTest() {
  const { language, isLoaded } = useLanguage();
  const t = translations[language];

  const tests = [
    { title: "Algebra", difficulty: "Medium", progress: 70 },
    { title: "Physics", difficulty: "Hard", progress: 40 },
    { title: "History", difficulty: "Easy", progress: 100 },
  ];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const showToast = () => {
    toast.info(t.inDevelopment, {
      theme: "colored",
    });
  };

  return (
    <PageShell>
      {isLoaded ? (
        <PageHeader
          icon={ClipboardList}
          title={t.testing}
          subtitle={t.helperText}
        />
      ) : (
        <Skeleton width="w-48" height="h-10" />
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
        {loading || !isLoaded
          ? Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} width="w-full" height="h-52" className="rounded-2xl" />
            ))
          : tests.map((test, i) => (
              <PageCard key={i} className="flex flex-col">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t.webtesting[test.title as keyof typeof t.webtesting] ||
                    test.title}
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                  {t.difficulty}:{" "}
                  {
                    t.difficulties[
                      test.difficulty as keyof typeof t.difficulties
                    ]
                  }
                </p>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-slate-700">
                  <div
                    className={cn(
                      "h-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 transition-all",
                    )}
                    style={{ width: `${test.progress}%` }}
                  />
                </div>
                <p className="mt-1 text-right text-xs text-gray-400">
                  {test.progress}%
                </p>

                <PrimaryButton className="mt-4 w-full" onClick={showToast}>
                  {t.startTest}
                </PrimaryButton>
              </PageCard>
            ))}
      </div>
    </PageShell>
  );
}
