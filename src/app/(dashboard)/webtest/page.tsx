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
import { fetchWebTests, WebTestDto } from "@/lib/api";

export default function WebTest() {
  const { language, isLoaded } = useLanguage();
  const t = translations[language];

  const [tests, setTests] = useState<WebTestDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWebTests().then((data) => {
      setTests(data);
      setLoading(false);
    });
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
              <Skeleton
                key={i}
                width="w-full"
                height="h-52"
                className="rounded-2xl"
              />
            ))
          : tests.map((test, i) => (
              <PageCard key={i} className="flex flex-col">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t.webtesting[test.titleKey as keyof typeof t.webtesting] ||
                    test.titleKey}
                </h2>

                <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                  {t.difficulty}:{" "}
                  {t.difficulties[
                    test.difficultyKey as keyof typeof t.difficulties
                  ] ?? test.difficultyKey}
                </p>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-slate-700">
                  <div
                    className={cn(
                      "h-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 transition-all",
                    )}
                    style={{ width: `${test.progressPercent}%` }}
                  />
                </div>
                <p className="mt-1 text-right text-xs text-gray-400">
                  {test.progressPercent}%
                </p>

                <PrimaryButton className="mt-4 w-full" onClick={showToast}>
                  {t.startTest}
                </PrimaryButton>
              </PageCard>
            ))}
      </div>

      {!loading && tests.length === 0 && (
        <div className="mt-10 text-center text-gray-500">
          У вас пока нет доступных тестов.
        </div>
      )}
    </PageShell>
  );
}
