"use client";

import { Bot, FileText, CalendarDays } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-8 space-y-8">

      {/* Заголовок */}
      <div>
        <h1 className="text-3xl font-bold">
          Welcome to MurasAI 🚀
        </h1>
        <p className="text-gray-500 mt-2">
          Your AI-powered learning assistant
        </p>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-4 gap-6">

        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
          <p className="text-sm opacity-80">Средний балл</p>
          <p className="text-2xl font-semibold">82%</p>
        </div>

        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 rounded-2xl shadow-lg">
          <p className="text-sm opacity-80">AI Рейтинг</p>
          <p className="text-2xl font-semibold">Advanced</p>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-6 rounded-2xl shadow-lg">
          <p className="text-sm opacity-80">Пройдено тестов</p>
          <p className="text-2xl font-semibold">24</p>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-2xl shadow-lg">
          <p className="text-sm opacity-80">Часы обучения</p>
          <p className="text-2xl font-semibold">56h</p>
        </div>

      </div>

      {/* Основные модули */}
      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
          <Bot className="w-10 h-10 text-indigo-500 mb-4 group-hover:scale-110 transition" />
          <h3 className="text-xl font-semibold mb-2">
            AI Assistant
          </h3>
          <p className="text-gray-500 text-sm">
            Ask questions, get explanations, and improve instantly with AI.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
          <FileText className="w-10 h-10 text-emerald-500 mb-4 group-hover:scale-110 transition" />
          <h3 className="text-xl font-semibold mb-2">
            Tests Generator
          </h3>
          <p className="text-gray-500 text-sm">
            Generate smart quizzes based on your weak topics.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
          <CalendarDays className="w-10 h-10 text-orange-500 mb-4 group-hover:scale-110 transition" />
          <h3 className="text-xl font-semibold mb-2">
            Study Planner
          </h3>
          <p className="text-gray-500 text-sm">
            AI creates a personalized study schedule for you.
          </p>
        </div>

      </div>

    </div>
  );
}
