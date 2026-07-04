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
import { pageCardClass } from "@/components/ui/page-shell";
import { cn } from "@/lib/utils";
import { SubjectScoreDto } from "@/lib/api";

const FALLBACK = [
  { subjectKey: "Math", score: 85, colorIndex: 0 },
  { subjectKey: "Physics", score: 70, colorIndex: 1 },
  { subjectKey: "Biology", score: 92, colorIndex: 2 },
  { subjectKey: "Chemistry", score: 75, colorIndex: 3 },
];

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444"];

type Props = {
  data?: SubjectScoreDto[];
};

export default function SubjectChart({ data }: Props) {
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

  const translatedData = (data ?? FALLBACK).map((s) => ({
    ...s,
    subject:
      t.subjects[s.subjectKey as keyof typeof t.subjects] || s.subjectKey,
  }));

  return (
    <div className={cn(pageCardClass)}>
      <h2 className="mb-4 text-base font-semibold text-gray-900 dark:text-white sm:text-lg">{t.subjectScores}</h2>
      <div className="h-[240px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={translatedData} margin={{ top: 10, right: 20, left: 0, bottom: isMobile ? 40 : 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="subject" interval={0} textAnchor={isMobile ? "end" : "middle"} tick={{ fontSize: isMobile ? 11 : 13 }} />
            <YAxis tick={{ fontSize: isMobile ? 11 : 14 }} width={isMobile ? 30 : 40} />
            <Tooltip labelClassName="text-black"/>
            <Bar dataKey="score" radius={[12, 12, 0, 0]}>
              {translatedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.colorIndex % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
