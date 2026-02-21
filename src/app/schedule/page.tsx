"use client";

import { useState } from "react";
import { BookOpen, Calendar } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/locales";
import Skeleton from "@/components/Skeleton";

export default function Schedule() {
  const { language, isLoaded } = useLanguage();

  // ✅ БЕЗ as Record<string,string>
  const t = translations[language];

  const schedule = [
    {
      day: "Monday",
      lessons: [
        { name: "Math", time: "08:00 - 09:30" },
        { name: "Physics", time: "09:40 - 11:10" },
        { name: "English", time: "11:20 - 12:50" },
      ],
    },
    {
      day: "Tuesday",
      lessons: [
        { name: "Algebra", time: "08:00 - 09:30" },
        { name: "History", time: "09:40 - 11:10" },
        { name: "Biology", time: "11:20 - 12:50" },
      ],
    },
    {
      day: "Wednesday",
      lessons: [
        { name: "Geometry", time: "08:00 - 09:30" },
        { name: "PE", time: "09:40 - 11:10" },
        { name: "Chemistry", time: "11:20 - 12:50" },
      ],
    },
    {
      day: "Thursday",
      lessons: [
        { name: "Literature", time: "08:00 - 09:30" },
        { name: "Computer Science", time: "09:40 - 11:10" },
      ],
    },
    {
      day: "Friday",
      lessons: [
        { name: "Math", time: "08:00 - 09:30" },
        { name: "Physics", time: "09:40 - 11:10" },
        { name: "English", time: "11:20 - 12:50" },
      ],
    },
  ];

  const dayMap: Record<string, string> = {
    Monday: t.monday,
    Tuesday: t.tuesday,
    Wednesday: t.wednesday,
    Thursday: t.thursday,
    Friday: t.friday,
  };

  const lessonMap: Record<string, string> = {
    math: t.math,
    physics: t.physics,
    english: t.english,
    algebra: t.algebra,
    history: t.history,
    biology: t.biology,
    geometry: t.geometry,
    pe: t.pe,
    chemistry: t.chemistry,
    literature: t.literature,
    "computer science": t.computer,
  };

  const lessonColors: Record<string, string> = {
    math: "from-indigo-400 to-indigo-600",
    physics: "from-purple-400 to-purple-600",
    english: "from-emerald-400 to-emerald-600",
    algebra: "from-orange-400 to-orange-600",
    history: "from-red-400 to-red-600",
    biology: "from-green-400 to-green-600",
    geometry: "from-teal-400 to-teal-600",
    pe: "from-pink-400 to-pink-600",
    chemistry: "from-cyan-400 to-cyan-600",
    literature: "from-yellow-400 to-yellow-600",
    "computer science": "from-blue-400 to-blue-600",
  };

  const [tooltip, setTooltip] = useState({
    visible: false,
    text: "",
    x: 0,
    y: 0,
  });

  function handleMouseEnter(
    event: React.MouseEvent<HTMLLIElement>,
    time: string
  ) {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltip({
      visible: true,
      text: time,
      x: rect.right + 10,
      y: rect.top + rect.height / 2,
    });
  }

  function handleMouseLeave() {
    setTooltip((prev) => ({ ...prev, visible: false }));
  }

  return (
    <div className="p-4 space-y-6 mt-10 relative">
      <div className="flex items-center gap-3">
        <Calendar size={28} className="text-indigo-500" />
        {isLoaded ? (
          <h1 className="text-2xl font-bold text-indigo-700">
            {t.schedule}
          </h1>
        ) : (
          <Skeleton width="w-40" height="h-8" />
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {isLoaded
          ? schedule.map((day, i) => (
              <div
                key={i}
                className="bg-indigo-100 p-4 rounded-2xl shadow-md"
              >
                <h2 className="font-semibold mb-4 text-lg flex items-center gap-2">
                  <Calendar size={18} /> {dayMap[day.day]}
                </h2>

                <ul className="space-y-3">
                  {day.lessons.map((lesson, j) => {
                    const lessonKey = lesson.name.toLowerCase();
                    const color =
                      lessonColors[lessonKey] ||
                      "from-gray-400 to-gray-600";

                    return (
                      <li
                        key={j}
                        className={`flex items-center gap-2 text-white bg-gradient-to-r ${color} px-4 py-2 rounded-full text-sm`}
                        onMouseEnter={(e) =>
                          handleMouseEnter(e, lesson.time)
                        }
                        onMouseLeave={handleMouseLeave}
                      >
                        <BookOpen size={16} />
                        {lessonMap[lessonKey] || lesson.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          : Array(5)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 rounded-2xl p-4 animate-pulse h-48"
                />
              ))}
      </div>

      {tooltip.visible && (
        <div
          className="fixed z-50 bg-gray-800 text-white text-xs rounded-md px-3 py-1 shadow-lg"
          style={{
            top: tooltip.y,
            left: tooltip.x,
            transform: "translateY(-50%)",
          }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}