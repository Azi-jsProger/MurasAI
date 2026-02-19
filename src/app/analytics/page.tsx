"use client";

import ProgressChart from "@/components/charts/ProgressChart";
import SubjectChart from "@/components/charts/SubjectChart";
import SkillsRadarChart from "@/components/charts/SkillsRadarChart";

export default function AnalyticsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 mt-10 sm:mt-0">
      <h1 className="text-2xl sm:text-3xl font-bold">AI Аналитика обучения</h1>

      {/* Карточки статистики */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { title: "Средний балл", value: "82%" },
          { title: "AI Рейтинг", value: "Продвинутый" },
          { title: "Пройдено тестов", value: "24" },
          { title: "Часы обучения", value: "56h" },
        ].map((card, i) => (
          <div key={i} className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm">
            <p className="text-sm text-gray-500">{card.title}</p>
            <p className="text-xl sm:text-2xl font-semibold">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Графики */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <ProgressChart />
        <SubjectChart />
      </div>

      <div className="grid grid-cols-1">
        <SkillsRadarChart />
      </div>
    </div>
  );
}
