"use client";

import { FileText, Plus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/locales";
import Skeleton from "@/components/Skeleton";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { fetchTests, generateTest, TestResultDto } from "@/lib/api";
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
  const [tests, setTests] = useState<TestResultDto[]>([]);
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [generating, setGenerating] = useState(false);

  const loadTests = () => {
    setLoading(true);
    fetchTests().then((data) => {
      setTests(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadTests();
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setGenerating(true);
    const result = await generateTest(topic.trim(), difficulty);
    setGenerating(false);

    if (result) {
      setTests((prev) => [...prev, result]);
      setGenerateOpen(false);
      setTopic("");
      toast.success(t.createTest, { theme: "colored" });
    } else {
      toast.error("Не удалось создать тест", { theme: "colored" });
    }
  };

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
                  {t.testss[test.titleKey as keyof typeof t.testss] ??
                    test.titleKey}
                </h3>
                <p className="mt-2 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  {test.scorePercent}%
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

              <form className="mt-6 space-y-4" onSubmit={handleGenerate}>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
                    Тема теста
                  </label>
                  <InputField
                    placeholder="Например: Квадратные уравнения"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
                    {t.difficulty}
                  </label>
                  <SelectField
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                  >
                    <option value="Easy">{t.difficulties.Easy}</option>
                    <option value="Medium">{t.difficulties.Medium}</option>
                    <option value="Hard">{t.difficulties.Hard}</option>
                  </SelectField>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <SecondaryButton
                    type="button"
                    onClick={() => setGenerateOpen(false)}
                  >
                    Отмена
                  </SecondaryButton>
                  <PrimaryButton type="submit" disabled={generating}>
                    {generating ? "..." : t.createTest}
                  </PrimaryButton>
                </div>
              </form>
            </PageCard>
          </div>
        </div>
      )}
    </>
  );
}
