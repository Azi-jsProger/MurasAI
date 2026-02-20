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
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/locales";
import Skeleton from "@/components/Skeleton";

const subjectData = [
  { subject: "Math", score: 85 },
  { subject: "Physics", score: 70 },
  { subject: "Biology", score: 92 },
  { subject: "Chemistry", score: 75 },
];

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444"];

export default function SubjectChart() {
  const { language, isLoaded } = useLanguage();
  const t = translations[language];

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 640);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  if (!isLoaded) return <Skeleton width="w-full" height="h-64" className="rounded-2xl" />;

  // Перевод названий предметов
  const translatedData = subjectData.map((s) => ({
    ...s,
    subject: t.subjects[s.subject as keyof typeof t.subjects] || s.subject,
  }));

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md">
      <h2 className="text-base sm:text-lg font-semibold mb-4">{t.subjectScores}</h2>
      <div className="h-[240px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={translatedData} margin={{ top: 10, right: 20, left: 0, bottom: isMobile ? 40 : 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="subject" interval={0} textAnchor={isMobile ? "end" : "middle"} tick={{ fontSize: isMobile ? 11 : 13 }} />
            <YAxis tick={{ fontSize: isMobile ? 11 : 14 }} width={isMobile ? 30 : 40} />
            <Tooltip />
            <Bar dataKey="score" radius={[12, 12, 0, 0]}>
              {translatedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}