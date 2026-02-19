"use client";

import { useEffect, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const skillsData = [
  { skill: "Логика", value: 85 },
  { skill: "Креативность", value: 75 },
  { skill: "Память", value: 90 },
  { skill: "Скорость", value: 70 },
  { skill: "Анализ", value: 88 },
];

export default function SkillsRadarChart() {
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
        AI Оценка навыков
      </h2>

      <div className="h-[260px] sm:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            data={skillsData}
            outerRadius={isMobile ? "54%" : "80%"}
          >
            <PolarGrid stroke="#e5e7eb" />

            <PolarAngleAxis
              dataKey="skill"
              tick={{
                fontSize: isMobile ? 11 : 14,
                fill: "#6b7280",
              }}
            />

            <PolarRadiusAxis
              tick={{
                fontSize: isMobile ? 10 : 12,
                fill: "#6b7280",
              }}
            />

            <Radar
              dataKey="value"
              stroke="#8B5CF6"
              fill="#8B5CF6"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
