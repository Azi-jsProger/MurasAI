// components/Skeleton.tsx
"use client";

interface SkeletonProps {
  width?: string;    // tailwind width, например "w-24"
  height?: string;   // tailwind height, например "h-6"
  className?: string; // дополнительные классы
  circle?: boolean;  // для аватара/круглых элементов
}

export default function Skeleton({
  width = "w-full",
  height = "h-6",
  className = "",
  circle = false,
}: SkeletonProps) {
  return (
    <div
      className={`bg-gray-300 animate-pulse ${width} ${height} ${
        circle ? "rounded-full" : "rounded"
      } ${className}`}
    ></div>
  );
}