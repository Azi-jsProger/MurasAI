"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

export const pageCardClass =
  "rounded-2xl border border-gray-200/80 bg-white/90 p-4 sm:p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80";

export function PageShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-[1400px] space-y-6", className)}>
      {children}
    </div>
  );
}

export function PageHeader({
  icon: Icon,
  title,
  subtitle,
  actions,
}: {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-600/20 text-indigo-500 ring-1 ring-indigo-500/30 dark:text-indigo-400">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {actions && <div className="flex flex-wrap gap-2 sm:gap-3">{actions}</div>}
    </div>
  );
}

export function PageCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn(pageCardClass, className)}>{children}</div>;
}

export function StatCard({
  title,
  value,
  accent = "from-indigo-600 to-violet-600",
  className,
}: {
  title: string;
  value: React.ReactNode;
  accent?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80 sm:p-5",
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-1 bg-gradient-to-r",
          accent,
        )}
      />
      <p className="text-xs font-medium text-gray-500 dark:text-slate-400 sm:text-sm">
        {title}
      </p>
      <p className="mt-2 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
        {value}
      </p>
    </div>
  );
}

export function PrimaryButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-800",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function ModuleCard({
  icon: Icon,
  title,
  description,
  href,
  accent = "text-indigo-500",
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  accent?: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-gray-200/80 bg-white/90 p-6 shadow-sm transition hover:border-indigo-500/30 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-indigo-500/40 sm:p-8"
    >
      <div
        className={cn(
          "mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10",
          accent,
        )}
      >
        <Icon className="h-6 w-6 transition group-hover:scale-110" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white sm:text-xl">
        {title}
      </h3>
      <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
        {description}
      </p>
    </Link>
  );
}

export function InputField({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 transition focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:border-slate-700 dark:bg-slate-800 dark:text-white",
        className,
      )}
      {...props}
    />
  );
}

export function SelectField({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 transition focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:border-slate-700 dark:bg-slate-800 dark:text-white",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
