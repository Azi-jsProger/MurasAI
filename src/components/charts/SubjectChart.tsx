"use client";

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
  { subject: "Матиматика", score: 85 },
  { subject: "Физика", score: 70 },
  { subject: "Биология", score: 92 },
  { subject: "Химия", score: 75 },
];

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444"];

export default function SubjectChart() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">
        Результаты по предметам
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={subjectData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="subject" />
          <YAxis />
          <Tooltip />

          <Bar dataKey="score" radius={[12, 12, 0, 0]}>
            {subjectData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
