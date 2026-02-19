"use client";

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
  { week: "Неделя 1", score: 60 },
  { week: "Неделя 2", score: 72 },
  { week: "Неделя 3", score: 78 },
  { week: "Неделя 4", score: 85 },
];

export default function ProgressChart() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">
        Прогресс по неделям
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <defs>
            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#6366F1" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="week" stroke="#8884d8" />
          <YAxis stroke="#8884d8" />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="score"
            stroke="#6366F1"
            strokeWidth={4}
            dot={{ r: 6 }}
            activeDot={{ r: 8 }}
            fillOpacity={1}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
