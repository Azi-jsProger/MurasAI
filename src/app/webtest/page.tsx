"use client";

import Providers from "@/components/Providers";
import { toast } from "react-toastify";

export default function WebTest() {
  const tests = [
    { title: "Алгебра", difficulty: "Средний", progress: 70 },
    { title: "Физика", difficulty: "Сложный", progress: 40 },
    { title: "История", difficulty: "Лёгкий", progress: 100 },
  ];

   const showToast = () => {
    toast.success("В разработке 😊");
  };

  return (
    <>
      <Providers
        position="top-right"
        autoClose={2500}
        toastStyle={{ backgroundColor: "#6366F1" }}
      />
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 mt-10 sm:mt-0">
        <h1 className="text-2xl sm:text-3xl font-bold">Тестирование</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {tests.map((test, i) => (
            <div
              key={i}
              className="bg-white p-4 sm:p-6 rounded-xl shadow hover:-translate-y-1 transition-all"
            >
              <h2 className="font-semibold mb-2 text-lg sm:text-xl">
                {test.title}
              </h2>
              <p className="text-gray-500 mb-2 text-sm sm:text-base">
                Сложность: {test.difficulty}
              </p>

              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${test.progress}%` }}
                />
              </div>

              <button className="w-full bg-blue-500 text-white px-4 py-2 sm:px-5 sm:py-3 rounded mt-2 hover:bg-blue-600 transition"
                onClick={showToast}
              >
                Начать тест
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
