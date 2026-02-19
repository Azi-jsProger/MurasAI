"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

const subjectData = [
  { subject: "Математика", score: 85 },
  { subject: "Физика", score: 70 },
  { subject: "Биология", score: 92 },
  { subject: "Химия", score: 75 },
];

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444"];

export default function SubjectChart() {
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
        Результаты по предметам
      </h2>

      <div className="h-[240px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={subjectData}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: isMobile ? 40 : 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />

            <XAxis
              dataKey="subject"
              interval={0} // 🔥 показываем ВСЕ предметы
              // angle={isMobile ?0  : 0}
              textAnchor={isMobile ? "end" : "middle"}
              tick={{ fontSize: isMobile ? 11 : 13 }}
            />

            <YAxis
              tick={{ fontSize: isMobile ? 11 : 14 }}
              width={isMobile ? 30 : 40}
            />

            <Tooltip   />

            <Bar dataKey="score" radius={[12, 12, 0, 0]}>
              {subjectData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
