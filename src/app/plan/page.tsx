"use client";

export default function StudyPlan() {
  const plan = [
    { day: "Day 1", task: "Алгебра: Основные формулы" },
    { day: "Day 2", task: "Физика: Законы движения" },
    { day: "Day 3", task: "История: Древний мир" },
    { day: "Day 4", task: "Практика тестов" },
    { day: "Day 5", task: "Повторение и AI рекомендации" },
  ];

  return (
    <div className="p-8 space-y-8">

      <h1 className="text-3xl font-bold">📚 AI План подготовки</h1>

      <div className="space-y-6">
        {plan.map((item, i) => (
          <div key={i} className="flex items-start gap-6">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-indigo-500"></div>
              {i !== plan.length - 1 && (
                <div className="w-1 h-16 bg-indigo-200"></div>
              )}
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md flex-1">
              <h3 className="font-semibold">{item.day}</h3>
              <p className="text-gray-600 mt-2">{item.task}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
