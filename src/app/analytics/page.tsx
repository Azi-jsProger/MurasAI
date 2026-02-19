import ProgressChart from "@/components/charts/ProgressChart";
import SubjectChart from "@/components/charts/SubjectChart";
import SkillsRadarChart from "@/components/charts/SkillsRadarChart";

export default function AnalyticsPage() {
  return (
    <div className="p-8 space-y-8">

      <h1 className="text-3xl font-bold">
        AI Аналитика обучения
      </h1>

      {/* Карточки статистики */}
      <div className="grid grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-sm text-gray-500">Средний балл</p>
          <p className="text-2xl font-semibold">82%</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-sm text-gray-500">AI Рейтинг</p>
          <p className="text-2xl font-semibold">Advanced</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-sm text-gray-500">Пройдено тестов</p>
          <p className="text-2xl font-semibold">24</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-sm text-gray-500">Часы обучения</p>
          <p className="text-2xl font-semibold">56h</p>
        </div>

      </div>

      {/* Графики */}
      <div className="grid grid-cols-2 gap-6">
        <ProgressChart />
        <SubjectChart />
      </div>

      <div className="grid grid-cols-1">
        <SkillsRadarChart />
      </div>

    </div>
  );
}
