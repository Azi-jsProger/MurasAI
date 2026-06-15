"use client";

import { cn } from "@/lib/utils"; // используем утилиту cn (она у тебя есть в проекте), чтобы красиво объединять классы

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
  circle?: boolean;
}

export default function Skeleton({
  width = "w-full",
  height = "h-6",
  className = "",
  circle = false,
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        // Цвета подложки: для светлой темы — серый, для твоей темной — глубокий slate
        "bg-gray-200 dark:bg-slate-800/80", 
        circle ? "rounded-full" : "rounded-xl", // rounded-xl мягче смотрится в твоем дизайне
        width,
        height,
        className
      )}
    >
      {/* Анимация блика (Shimmer) */}
      <div 
        className={cn(
          "absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-gray-100/30 to-transparent",
          // Для темной темы делаем блик чуть мягче (белый цвет с прозрачностью 10-15%), чтобы он не резал глаза
          "dark:via-white/10"
        )} 
      />
    </div>
  );
}