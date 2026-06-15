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
// Импортируем функцию и её тип
import { get_allTest, WebTestDto } from "@/lib/api";

export default function WebTest() {
  const { language, isLoaded } = useLanguage();
  const t = translations[language];

  // Инициализируем пустым массивом, куда попадут данные из БД
  const [tests, setTests] = useState<WebTestDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTests() {
      setLoading(true);
      const data = await get_allTest(); // Здесь теперь улетит запрос с куками
      setTests(data);                   // Записываем полученный массив в стейт
      setLoading(false);
    }

    loadTests();
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
                  {/* Заменяем test.title на test.titleKey */}
                  {t.webtesting[test.titleKey as keyof typeof t.webtesting] ||
                    test.titleKey}
                </h2>
                
                {/* Бэкенд не шлет сложность, можно захардкодить дефолтную или скрыть */}
                <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                  {t.difficulty}: {t.difficulties["Medium"]}
                </p>

                {/* Заменяем test.progress на test.scorePercent */}
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-slate-700">
                  <div
                    className={cn(
                      "h-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 transition-all",
                    )}
                    style={{ width: `${test.scorePercent}%` }}
                  />
                </div>
                <p className="mt-1 text-right text-xs text-gray-400">
                  {test.scorePercent}%
                </p>

                <PrimaryButton className="mt-4 w-full" onClick={showToast}>
                  {t.startTest}
                </PrimaryButton>
              </PageCard>
            ))}
      </div>

      {!loading && tests.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          У вас пока нет доступных тестов.
        </div>
      )}
    </PageShell>
  );
}