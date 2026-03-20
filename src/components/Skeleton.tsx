"use client";

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
      className={`relative overflow-hidden bg-gray-300 ${
        circle ? "rounded-full" : "rounded"
      } ${width} ${height} ${className}`}
    >
      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </div>
  );
}