"use client";

import { Bot, FileText, CalendarDays } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-4 sm:p-6 lg:p-8  space-y-6 sm:space-y-8 mt-10 sm:mt-0">

      {/* Заголовок */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">
          Приветствуем в MurasAI LMS 🚀
        </h1>
        <p className="text-gray-500 mt-1 sm:mt-2 text-sm sm:text-base">
          Ваш помощник в обучении на основе искусственного интеллекта
        </p>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        <StatCard title="Средний балл" value="82%" color="from-indigo-500 to-purple-600" />
        <StatCard title="AI Рейтинг" value="Advanced" color="from-emerald-500 to-teal-600" />
        <StatCard title="Пройдено тестов" value="24" color="from-orange-500 to-pink-500" />
        <StatCard title="Часы обучения" value="56h" color="from-blue-500 to-cyan-500" />
      </div>

      {/* Основные модули */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <ModuleCard icon={Bot} color="text-indigo-500" title="ИИ Ассистент" description="Задавайте вопросы, получайте объяснения и мгновенно улучшайте свои навыки с помощью ИИ." />
        <ModuleCard icon={FileText} color="text-emerald-500" title="Генератор Теста" description="Создавайте интеллектуальные викторины на основе ваших слабых мест в изучении тем." />
        <ModuleCard icon={CalendarDays} color="text-orange-500" title="Планировщик исследований" description="Искусственный интеллект создаст для вас персонализированное расписание занятий." />
      </div>
    </div>
  );
}

function StatCard({ title, value, color }: any) {
  return (
    <div className={`bg-gradient-to-r ${color} text-white p-4 sm:p-6 rounded-2xl shadow-lg`}>
      <p className="text-xs sm:text-sm opacity-80">{title}</p>
      <p className="text-xl sm:text-2xl font-semibold">{value}</p>
    </div>
  );
}

function ModuleCard({ icon: Icon, color, title, description }: any) {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
      <Icon className={`w-8 h-8 sm:w-10 sm:h-10 ${color} mb-3 sm:mb-4 group-hover:scale-110 transition`} />
      <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{title}</h3>
      <p className="text-gray-500 text-xs sm:text-sm">{description}</p>
    </div>
  );
}
