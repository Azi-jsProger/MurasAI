"use client";

import { FileText, Plus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/locales";
import Skeleton from "@/components/Skeleton";
import { useState, useEffect } from "react";
import {
  InputField,
  PageCard,
  PageHeader,
  PageShell,
  PrimaryButton,
  SecondaryButton,
  SelectField,
} from "@/components/ui/page-shell";

export default function Tests() {
  const { language, isLoaded } = useLanguage();
  const t = translations[language];
  const [generateOpen, setGenerateOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const tests = [
    { title: "Algebra", score: "85%" },
    { title: "Physics", score: "78%" },
    { title: "Biology", score: "91%" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PageShell>
        {isLoaded ? (
          <PageHeader
            icon={FileText}
            title={t.testGenerators}
            subtitle={t.testGeneratorDescription}
            actions={
              <PrimaryButton onClick={() => setGenerateOpen(true)}>
                <Plus className="h-4 w-4" />
                {t.createTest}
              </PrimaryButton>
            }
          />
        ) : (
          <Skeleton width="w-64" height="h-10" />
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
          {(loading || !isLoaded) &&
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} width="w-full" height="h-36" className="rounded-2xl" />
            ))}

          {!loading &&
            isLoaded &&
            tests.map((test, i) => (
              <PageCard
                key={i}
                className="group transition hover:border-indigo-500/30 hover:shadow-md"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {t.testss[test.title as keyof typeof t.testss]}
                </h3>
                <p className="mt-2 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  {test.score}
                </p>
              </PageCard>
            ))}
        </div>
      </PageShell>

      {generateOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
          onClick={() => setGenerateOpen(false)}
        >
          <div
            className="w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
          <PageCard className="relative">
            <button
              type="button"
              onClick={() => setGenerateOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-slate-200"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t.createTest}
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
              {t.testGeneratorDescription}
            </p>

            <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
                  Тема теста
                </label>
                <InputField placeholder="Например: Квадратные уравнения" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
                  {t.difficulty}
                </label>
                <SelectField>
                  <option>{t.difficulties.Easy}</option>
                  <option>{t.difficulties.Medium}</option>
                  <option>{t.difficulties.Hard}</option>
                </SelectField>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
                  Файл (опционально)
                </label>
                <input
                  type="file"
                  className="w-full text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <SecondaryButton onClick={() => setGenerateOpen(false)}>
                  Отмена
                </SecondaryButton>
                <PrimaryButton type="submit">{t.createTest}</PrimaryButton>
              </div>
            </form>
          </PageCard>
          </div>
        </div>
      )}
    </>
  );
}
