"use client";

import Providers from "@/components/Providers";
import { toast } from "react-toastify";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/locales";
import Skeleton from "@/components/Skeleton";
import { useState, useEffect } from "react";

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
    // Симулируем небольшую задержку загрузки
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const showToast = () => {
    toast.success(t.inDevelopment);
  };

  return (
    <>
      <Providers
        position="top-right"
        autoClose={2500}
        toastStyle={{ backgroundColor: "#6366F1" }}
      />
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 mt-10 sm:mt-0">
        <h1 className="text-2xl sm:text-3xl font-bold">{t.testing}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {loading || !isLoaded
            ? Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} width="w-full" height="h-48" className="rounded-xl" />
              ))
            : tests.map((test, i) => (
                <div
                  key={i}
                  className="bg-white p-4 sm:p-6 rounded-xl shadow hover:-translate-y-1 transition-all"
                >
                  <h2 className="font-semibold mb-2 text-lg sm:text-xl">
                    {t.webtesting[test.title as keyof typeof t.webtesting] || test.title}
                  </h2>
                  <p className="text-gray-500 mb-2 text-sm sm:text-base">
                    {t.difficulty}: {t.difficulties[test.difficulty as keyof typeof t.difficulties]}
                  </p>

                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${test.progress}%` }}
                    />
                  </div>

                  <button
                    className="w-full bg-blue-500 text-white px-4 py-2 sm:px-5 sm:py-3 rounded mt-2 hover:bg-blue-600 transition"
                    onClick={showToast}
                  >
                    {t.startTest}
                  </button>
                </div>
              ))}
        </div>
      </div>
    </>
  );
}