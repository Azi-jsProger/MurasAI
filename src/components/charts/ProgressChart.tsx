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
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/locales";
import Skeleton from "@/components/Skeleton";

export default function ProgressChart() {
  const { language, isLoaded } = useLanguage();
  const t = translations[language];

  const data = [
    { week: `1 ${t.week}`, score: 60 },
    { week: `2 ${t.week}`, score: 72 },
    { week: `3 ${t.week}`, score: 78 },
    { week: `4 ${t.week}`, score: 85 },
  ];

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 640);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  if (!isLoaded)
    return <Skeleton width="w-full" height="h-64" className="rounded-2xl" />;

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md">
      <h2 className="text-base sm:text-lg font-semibold mb-4">
        {t.progressWeeks}
      </h2>
      <div className="h-[220px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 40, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis
              dataKey="week"
              tick={{ fontSize: isMobile ? 12 : 13 }}
              interval={0}
            />
            <YAxis
              tick={{ fontSize: isMobile ? 11 : 14 }}
              width={isMobile ? 30 : 40}
            />
            <Tooltip labelFormatter={(label) => `${t.week} ${label}`} />
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
