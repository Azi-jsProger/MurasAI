"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Download,
  MapPin,
  Plus,
  User,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/locales";
import Skeleton from "@/components/Skeleton";
import { cn } from "@/lib/utils";
import {
  fetchSchedule,
  ScheduleEventDto,
  ScheduleLessonDto,
} from "@/lib/api";
import {
  PageHeader,
  PageShell,
  PrimaryButton,
  SecondaryButton,
} from "@/components/ui/page-shell";

type LessonType = "lecture" | "seminar" | "lab";
type SubjectKey =
  | "math"
  | "physics"
  | "english"
  | "chemistry"
  | "history"
  | "biology"
  | "algebra"
  | "geometry"
  | "literature"
  | "computer"
  | "pe";

function getMonday(date: Date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function SchedulePage() {
  const { language, isLoaded } = useLanguage();
  const t = translations[language];

  const today = useMemo(() => new Date(), []);
  const [selectedDate, setSelectedDate] = useState(today);
  const [calendarMonth, setCalendarMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [lessons, setLessons] = useState<ScheduleLessonDto[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<ScheduleEventDto[]>([]);
  const [eventDays, setEventDays] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchSchedule(selectedDate).then((data) => {
      if (data) {
        setLessons(data.lessons);
        setUpcomingEvents(data.upcomingEvents);
        setEventDays(data.eventDays);
      }
      setLoading(false);
    });
  }, [selectedDate]);

  const weekDays = useMemo(() => {
    const monday = getMonday(selectedDate);
    return Array.from({ length: 5 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d;
    });
  }, [selectedDate]);

  const subjectLabel = (key: string) => {
    const map: Record<SubjectKey, string> = {
      math: t.math,
      physics: t.physics,
      english: t.english,
      chemistry: t.chemistry,
      history: t.history,
      biology: t.biology,
      algebra: t.algebra,
      geometry: t.geometry,
      literature: t.literature,
      computer: t.computer,
      pe: t.pe,
    };
    return map[key as SubjectKey] ?? key;
  };

  const typeLabel = (type: string) => {
    if (type === "lecture") return t.lecture;
    if (type === "seminar") return t.seminar;
    return t.lab;
  };

  const subtitleMonth = t.months[selectedDate.getMonth()];
  const subtitleYear = selectedDate.getFullYear();

  const calendarCells = useMemo(() => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const startOffset = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: (Date | null)[] = Array(startOffset).fill(null);
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(new Date(year, month, d));
    }
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [calendarMonth]);

  if (!isLoaded) {
    return (
      <PageShell>
        <Skeleton width="w-64" height="h-10" />
        <Skeleton width="w-full" height="h-16" />
        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} width="w-full" height="h-24" />
            ))}
          </div>
          <Skeleton width="w-full" height="h-80" />
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageHeader
        icon={CalendarDays}
        title={t.scheduleTitle}
        subtitle={`${t.scheduleSubtitle} — ${subtitleMonth} ${subtitleYear}`}
        actions={
          <>
            <SecondaryButton>
              <Download className="h-4 w-4" />
              {t.downloadSchedule}
            </SecondaryButton>
            <PrimaryButton>
              <Plus className="h-4 w-4" />
              {t.addEvent}
            </PrimaryButton>
          </>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
        <div className="space-y-5">
          <div className="rounded-2xl border border-gray-200/80 bg-white/80 p-3 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/60">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {weekDays.map((day, i) => {
                const active = isSameDay(day, selectedDate);
                const isToday = isSameDay(day, today);
                return (
                  <button
                    key={day.toISOString()}
                    type="button"
                    onClick={() => setSelectedDate(day)}
                    className={cn(
                      "flex min-w-[72px] flex-col items-center rounded-2xl px-4 py-3 transition-all",
                      active
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                        : "text-gray-600 hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-slate-800",
                    )}
                  >
                    <span className="text-xs font-medium uppercase tracking-wide opacity-80">
                      {t.dayShort[i]}
                    </span>
                    <span className="mt-1 text-xl font-bold">{day.getDate()}</span>
                    {isToday && !active && (
                      <span className="mt-1 h-1 w-1 rounded-full bg-indigo-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} width="w-full" height="h-24" className="rounded-2xl" />
              ))
            ) : lessons.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-300 p-12 text-center dark:border-slate-700">
                <Calendar className="mx-auto h-10 w-10 text-gray-400" />
                <p className="mt-3 text-gray-500 dark:text-slate-400">
                  {t.noLessons}
                </p>
              </div>
            ) : (
              lessons.map((lesson, index) => (
                <article
                  key={lesson.id}
                  className="group relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm transition hover:border-indigo-500/30 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-indigo-500/40"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex gap-4 sm:gap-6">
                    <div className="flex w-20 shrink-0 flex-col justify-center text-center sm:w-24">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {lesson.start}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-slate-500">
                        {lesson.end}
                      </span>
                    </div>

                    <div className="flex min-w-0 flex-1 gap-4">
                      <div
                        className={cn(
                          "w-1 shrink-0 rounded-full",
                          lesson.accent,
                        )}
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white sm:text-lg">
                          {subjectLabel(lesson.subject)}
                        </h3>
                        <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500 dark:text-slate-400">
                          <User className="h-3.5 w-3.5 shrink-0" />
                          {t.teachers[lesson.subject as keyof typeof t.teachers]}
                        </p>
                      </div>
                    </div>

                    <div className="hidden shrink-0 flex-col items-end justify-center gap-1 sm:flex">
                      <span className="inline-flex items-center gap-1 rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 dark:bg-slate-800 dark:text-slate-300">
                        <MapPin className="h-3 w-3" />
                        {t.room} {lesson.room}
                      </span>
                      <span
                        className={cn(
                          "rounded-lg px-2.5 py-1 text-xs font-medium",
                          lesson.type === "lecture" &&
                            "bg-blue-500/10 text-blue-600 dark:text-blue-400",
                          lesson.type === "seminar" &&
                            "bg-violet-500/10 text-violet-600 dark:text-violet-400",
                          lesson.type === "lab" &&
                            "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                        )}
                      >
                        {typeLabel(lesson.type)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2 sm:hidden">
                    <span className="inline-flex items-center gap-1 rounded-lg bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-slate-800 dark:text-slate-300">
                      <MapPin className="h-3 w-3" />
                      {t.room} {lesson.room}
                    </span>
                    <span className="rounded-lg bg-indigo-500/10 px-2 py-1 text-xs text-indigo-600 dark:text-indigo-400">
                      {typeLabel(lesson.type)}
                    </span>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900 dark:text-white">
                {t.months[calendarMonth.getMonth()]} {calendarMonth.getFullYear()}
              </h2>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() =>
                    setCalendarMonth(
                      (m) => new Date(m.getFullYear(), m.getMonth() - 1, 1),
                    )
                  }
                  className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setCalendarMonth(
                      (m) => new Date(m.getFullYear(), m.getMonth() + 1, 1),
                    )
                  }
                  className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[10px] font-medium uppercase tracking-wider text-gray-400 dark:text-slate-500">
              {t.dayShort.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {calendarCells.map((cell, i) => {
                if (!cell) {
                  return <div key={`empty-${i}`} className="aspect-square" />;
                }
                const selected = isSameDay(cell, selectedDate);
                const isToday = isSameDay(cell, today);
                const hasEvent = eventDays.includes(cell.getDate());

                return (
                  <button
                    key={cell.toISOString()}
                    type="button"
                    onClick={() => setSelectedDate(cell)}
                    className={cn(
                      "relative flex aspect-square flex-col items-center justify-center rounded-lg text-xs font-medium transition",
                      selected
                        ? "bg-indigo-600 text-white shadow-md"
                        : isToday
                          ? "ring-2 ring-indigo-500/50 text-indigo-600 dark:text-indigo-400"
                          : "text-gray-700 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-800",
                    )}
                  >
                    {cell.getDate()}
                    {hasEvent && !selected && (
                      <span className="absolute bottom-1 h-1 w-1 rounded-full bg-emerald-500" />
                    )}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedDate(today);
                setCalendarMonth(
                  new Date(today.getFullYear(), today.getMonth(), 1),
                );
              }}
              className="mt-4 w-full rounded-xl border border-indigo-500/30 py-2 text-xs font-medium text-indigo-600 transition hover:bg-indigo-500/10 dark:text-indigo-400"
            >
              {t.today}
            </button>
          </div>

          <div className="rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
            <h2 className="mb-4 font-semibold text-gray-900 dark:text-white">
              {t.upcomingEvents}
            </h2>
            <ul className="space-y-3">
              {upcomingEvents.map((event) => (
                <li
                  key={event.id}
                  className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 transition hover:border-indigo-500/20 dark:border-slate-800 dark:hover:border-indigo-500/30"
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg",
                      event.color,
                    )}
                  >
                    {event.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      {t.scheduleEvents[
                        event.titleKey as keyof typeof t.scheduleEvents
                      ] ?? event.titleKey}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-slate-400">
                      {event.eventDay} {t.months[event.eventMonth]}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
