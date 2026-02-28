"use client";
import { FileText } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/locales";
import Skeleton from "@/components/Skeleton";
import { useState, useEffect } from "react";
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
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const style = "bg-black"
  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 mt-10 sm:mt-0">
        <h1 className="text-2xl sm:text-3xl font-bold ">{t.testGenerators}</h1>
        <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-md">
          <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
            {t.testGeneratorDescription}
          </p>
          <button
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-lg hover:scale-105 transition"
            onClick={() => setGenerateOpen(true)}
          >
            {t.createTest}
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {(loading || !isLoaded) &&
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton
                key={i}
                width="w-full"
                height="h-32"
                className="rounded-2xl"
              />
            ))}
          {!loading &&
            isLoaded &&
            tests.map((test, i) => (
              <TestCard
                key={i}
                title={t.testss[test.title as keyof typeof t.testss]}
                score={test.score}
              />
            ))}
        </div>
      </div>
      {/* {generateOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[5px]"
          onClick={() => setGenerateOpen(false)}
        >
          <div
            className="bg-white rounded-[30px] w-[60vw] h-[60vh] flex flex-col justify-center align-center"
            onClick={(e) => e.stopPropagation()}
          >
            <form action="">
              <input type="file" />
            </form>
          </div>
        </div>
      )} */}
      {generateOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          onClick={() => setGenerateOpen(false)}
        >
          <div
            className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-3xl shadow-2xl p-8 relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setGenerateOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
            >
              ✕
            </button>

            {/* Title */}
            <h2 className="text-2xl font-bold mb-2">{t.createTest}</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
              Создайте тест автоматически на основе темы или загрузите файл
            </p>

            {/* Form */}
            <form className="space-y-5">
              {/* Topic */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Тема теста
                </label>
                <input
                  type="text"
                  placeholder="Например: Квадратные уравнения"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Сложность
                </label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition">
                  <option className={style}>Лёгкая</option>
                  <option>Средняя</option>
                  <option>Сложная</option>
                </select>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Загрузить файл (опционально)
                </label>
                <input
                  type="file"
                  className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-500 file:text-white hover:file:bg-indigo-600 transition"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setGenerateOpen(false)}
                  className="px-5 py-2 rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md hover:scale-105 transition"
                >
                  Сгенерировать
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
function TestCard({ title, score }: any) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-xl transition">
      <FileText className="text-indigo-500 mb-3 sm:mb-4 w-6 h-6 sm:w-8 sm:h-8" />
      <h3 className="font-semibold text-base sm:text-lg">{title}</h3>
      <p className="text-gray-500 mt-1 sm:mt-2 text-sm sm:text-base dark:text-gray-400">
        {score}
      </p>
    </div>
  );
}
