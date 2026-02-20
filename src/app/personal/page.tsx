"use client";

import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

export default function Personal() {
  const { userName, avatarBg } = useContext(UserContext);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 mt-10 sm:mt-0">
      <h1 className="text-2xl sm:text-3xl font-bold">👤 Личная карточка</h1>

      <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-md flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=${avatarBg}&color=fff`}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full shadow-lg"
        />

        <div className="text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-semibold">{userName}</h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Студент • MurasAI Пользователь
          </p>

          <div className="mt-2 sm:mt-4 bg-indigo-100 text-indigo-700 px-3 py-1 sm:px-4 sm:py-2 rounded-full inline-block text-xs sm:text-sm font-medium">
            AI Уровень: Продвинутый
          </div>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Пройдено тестов"
          value="12"
          color="from-indigo-500 to-purple-600"
        />
        <StatCard
          title="Средний балл"
          value="88%"
          color="from-emerald-500 to-teal-600"
        />
        <StatCard
          title="Часы обучения"
          value="42 ч"
          color="from-orange-500 to-pink-500"
        />
        <StatCard
          title="AI рейтинг"
          value="A+"
          color="from-blue-500 to-cyan-500"
        />
      </div>

      {/* AI анализ */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 sm:p-8 rounded-2xl shadow-lg">
        <h3 className="font-semibold mb-1 sm:mb-2 text-base sm:text-lg">
          🧠 AI-анализ
        </h3>
        <p className="opacity-90 text-xs sm:text-sm">
          У вас отличный темп обучения. На этой неделе сосредоточьтесь на
          алгебре и физике. Ежедневные микротесты повысят ваш балл на +5%.
        </p>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }: any) {
  return (
    <div
      className={`bg-gradient-to-r ${color} text-white p-4 sm:p-6 rounded-2xl shadow-lg`}
    >
      <p className="text-xs sm:text-sm opacity-80">{title}</p>
      <p className="text-xl sm:text-2xl font-semibold">{value}</p>
    </div>
  );
}
