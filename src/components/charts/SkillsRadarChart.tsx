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
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/locales";
import Skeleton from "@/components/Skeleton";

const skillsData = [
  { skill: "Logic", value: 85 },
  { skill: "Creativity", value: 75 },
  { skill: "Memory", value: 90 },
  { skill: "Speed", value: 70 },
  { skill: "Analysis", value: 88 },
];

export default function SkillsRadarChart() {
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

  // Перевод навыков
  const translatedSkills = skillsData.map((s) => ({
    ...s,
    skill: t.skills[s.skill as keyof typeof t.skills] || s.skill,
  }));

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md">
      <h2 className="text-base sm:text-lg font-semibold mb-4">{t.skillsRadar}</h2>
      <div className="h-[260px] sm:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={translatedSkills} outerRadius={isMobile ? "54%" : "80%"}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="skill" tick={{ fontSize: isMobile ? 11 : 14, fill: "#6b7280" }} />
            <PolarRadiusAxis tick={{ fontSize: isMobile ? 10 : 12, fill: "#6b7280" }} />
            <Radar dataKey="value" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}