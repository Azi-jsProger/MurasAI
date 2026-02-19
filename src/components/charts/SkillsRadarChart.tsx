"use client";

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
  { skill: "Криативность", value: 75 },
  { skill: "Память", value: 90 },
  { skill: "Скорость", value: 70 },
  { skill: "Анализ", value: 88 },
];

export default function SkillsRadarChart() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">
        AI Оценка навыков
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <RadarChart data={skillsData}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis dataKey="skill" stroke="#6b7280" />
          <PolarRadiusAxis stroke="#6b7280" />

          <Radar
            dataKey="value"
            stroke="#8B5CF6"
            fill="#8B5CF6"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
