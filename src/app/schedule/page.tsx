"use client";

import { BookOpen } from "lucide-react";

export default function Schedule() {
  const schedule = [
    { day: "Понедельник", lessons: ["Математика", "Физика", "Английский"] },
    { day: "Вторник", lessons: ["Алгебра", "История", "Биология"] },
    { day: "Среда", lessons: ["Геометрия", "Физкультура", "Химия"] },
    { day: "Четверг", lessons: ["Литература", "Информатика"] },
    { day: "Пятница", lessons: ["Математика", "Физика", "Английский"] },
  ];

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">📅 Расписание</h1>

      <div className="grid grid-cols-5 gap-6">
        {schedule.map((day, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-t-4 border-indigo-500"
          >
            <h2 className="font-semibold mb-4 text-lg">
              {day.day}
            </h2>

            <ul className="space-y-3">
              {day.lessons.map((lesson, j) => (
                <li key={j} className="flex items-center gap-2 text-gray-700">
                  <BookOpen size={16} className="text-indigo-500" />
                  {lesson}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
