"use client";

import { FileText } from "lucide-react";

export default function Tests() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 mt-10 sm:mt-0">
      <h1 className="text-2xl sm:text-3xl font-bold">📝Генератор тестов ИИ</h1>

      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md">
        <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
          Создавайте персонализированные тесты на основе ваших слабых мест в изучении тем.
        </p>
        <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-lg hover:scale-105 transition">
          Создать тест
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <TestCard title="Задачи по Алгебре" score="85%" />
        <TestCard title="Вопросы по Физике" score="78%" />
        <TestCard title="Тесты по Биологии" score="91%" />
      </div>
    </div>
  );
}

function TestCard({ title, score }: any) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-xl transition">
      <FileText className="text-indigo-500 mb-3 sm:mb-4 w-6 h-6 sm:w-8 sm:h-8" />
      <h3 className="font-semibold text-base sm:text-lg">{title}</h3>
      <p className="text-gray-500 mt-1 sm:mt-2 text-sm sm:text-base">Счёт: {score}</p>
    </div>
  );
}
