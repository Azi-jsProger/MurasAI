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
import { pageCardClass } from "@/components/ui/page-shell";
import { cn } from "@/lib/utils";
import { ProgressPointDto } from "@/lib/api";

const FALLBACK = [
  { weekOrder: 1, score: 60 },
  { weekOrder: 2, score: 72 },
  { weekOrder: 3, score: 78 },
  { weekOrder: 4, score: 85 },
];

type Props = {
  data?: ProgressPointDto[];
};

export default function ProgressChart({ data }: Props) {
  const { language, isLoaded } = useLanguage();
  const t = translations[language];

  const chartData = (data ?? FALLBACK).map((p) => ({
    week: `${p.weekOrder} ${t.week}`,
    score: p.score,
  }));

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
    <div className={cn(pageCardClass)}>
      <h2 className="mb-4 text-base font-semibold text-gray-900 dark:text-white sm:text-lg">
        {t.progressWeeks}
      </h2>
      <div className="h-[220px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
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
