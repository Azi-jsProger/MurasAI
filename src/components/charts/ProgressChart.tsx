"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { week: "Неделя 1", short: "1", score: 60 },
  { week: "Неделя 2", short: "2", score: 72 },
  { week: "Неделя 3", short: "3", score: 78 },
  { week: "Неделя 4", short: "4", score: 85 },
];

export default function ProgressChart() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md">
      <h2 className="text-base sm:text-lg font-semibold mb-4">
        Прогресс по неделям
      </h2>

      <div className="h-[220px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 40,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />

            <XAxis
              dataKey={isMobile ? "short" : "week"}
              tick={{ fontSize: isMobile ? 12 : 13 }}
              interval={0}
            />

            <YAxis
              tick={{ fontSize: isMobile ? 11 : 14 }}
              width={isMobile ? 30 : 40}
            />

            {/* 🔥 Вот здесь главное изменение */}
            <Tooltip
              labelFormatter={(label) => {
                return isMobile ? `Неделя ${label}` : label;
              }}
            />

            <Line
              type="monotone"
              dataKey="score"
              stroke="#6366F1"
              strokeWidth={isMobile ? 3 : 4}
              dot={{ r: isMobile ? 4 : 6 }}
              activeDot={{ r: isMobile ? 6 : 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
