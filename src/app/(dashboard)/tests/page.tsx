"use client";

import Providers from "@/components/Providers";
import { FileText } from "lucide-react";
import { toast } from "react-toastify";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/locales";
import Skeleton from "@/components/Skeleton";
import { useState, useEffect } from "react";

export default function Tests() {
  const { language, isLoaded } = useLanguage();
  const t = translations[language];

  const [generateOpen, setGenerateOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tests, setTests] = useState([]);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleGenerate = async () => {
    if (!file) {
      toast.error("Выберите файл!");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/generate-tests", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setTests(data.tests || []);
      setGenerateOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Ошибка при генерации тестов.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Providers
        position="top-right"
        autoClose={2500}
        toastStyle={{ backgroundColor: "#6366F1" }}
      />
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 mt-10 sm:mt-0">
        <h1 className="text-2xl sm:text-3xl font-bold">{t.testGenerators}</h1>

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
              <Skeleton key={i} width="w-full" height="h-32" className="rounded-2xl" />
            ))}
          {!loading &&
            isLoaded &&
            tests.map((test, i) => (
              <TestCard key={i} title={test.title} score={test.score} />
            ))}
        </div>
      </div>

      {generateOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[5px]"
          onClick={() => setGenerateOpen(false)}
        >
          <div
            className="bg-white rounded-[30px] w-[60vw] h-[60vh] flex flex-col justify-center align-center p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">Загрузите файл с тестами</h2>
            <input type="file" onChange={handleFileChange} className="mb-4" />
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-xl"
              onClick={handleGenerate}
              disabled={uploading}
            >
              {uploading ? "Генерация..." : "Создать тесты"}
            </button>
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