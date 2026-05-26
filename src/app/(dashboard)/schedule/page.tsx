"use client";

import { useMemo, useState } from "react";
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

type Lesson = {
  id: string;
  start: string;
  end: string;
  subject: SubjectKey;
  room: string;
  type: LessonType;
  accent: string;
};

const WEEKLY_SCHEDULE: Record<number, Lesson[]> = {
  0: [
    {
      id: "m1",
      start: "08:00",
      end: "08:45",
      subject: "math",
      room: "201",
      type: "lecture",
      accent: "bg-blue-500",
    },
    {
      id: "m2",
      start: "09:00",
      end: "09:45",
      subject: "physics",
      room: "305",
      type: "seminar",
      accent: "bg-violet-500",
    },
    {
      id: "m3",
      start: "10:00",
      end: "10:45",
      subject: "english",
      room: "112",
      type: "lecture",
      accent: "bg-emerald-500",
    },
    {
      id: "m4",
      start: "11:00",
      end: "11:45",
      subject: "chemistry",
      room: "410",
      type: "lab",
      accent: "bg-cyan-500",
    },
    {
      id: "m5",
      start: "13:00",
      end: "13:45",
      subject: "history",
      room: "208",
      type: "lecture",
      accent: "bg-amber-500",
    },
    {
      id: "m6",
      start: "14:00",
      end: "14:45",
      subject: "biology",
      room: "315",
      type: "seminar",
      accent: "bg-teal-500",
    },
  ],
  1: [
    {
      id: "t1",
      start: "08:00",
      end: "09:30",
      subject: "algebra",
      room: "201",
      type: "lecture",
      accent: "bg-indigo-500",
    },
    {
      id: "t2",
      start: "09:40",
      end: "11:10",
      subject: "history",
      room: "208",
      type: "seminar",
      accent: "bg-amber-500",
    },
    {
      id: "t3",
      start: "11:20",
      end: "12:50",
      subject: "biology",
      room: "315",
      type: "lab",
      accent: "bg-teal-500",
    },
  ],
  2: [
    {
      id: "w1",
      start: "08:00",
      end: "09:30",
      subject: "geometry",
      room: "201",
      type: "lecture",
      accent: "bg-sky-500",
    },
    {
      id: "w2",
      start: "09:40",
      end: "11:10",
      subject: "pe",
      room: "Спортзал",
      type: "seminar",
      accent: "bg-pink-500",
    },
    {
      id: "w3",
      start: "11:20",
      end: "12:50",
      subject: "chemistry",
      room: "410",
      type: "lab",
      accent: "bg-cyan-500",
    },
  ],
  3: [
    {
      id: "th1",
      start: "08:00",
      end: "09:30",
      subject: "literature",
      room: "112",
      type: "lecture",
      accent: "bg-yellow-500",
    },
    {
      id: "th2",
      start: "09:40",
      end: "11:10",
      subject: "computer",
      room: "404",
      type: "lab",
      accent: "bg-blue-600",
    },
  ],
  4: [
    {
      id: "f1",
      start: "08:00",
      end: "09:30",
      subject: "math",
      room: "201",
      type: "lecture",
      accent: "bg-blue-500",
    },
    {
      id: "f2",
      start: "09:40",
      end: "11:10",
      subject: "physics",
      room: "305",
      type: "seminar",
      accent: "bg-violet-500",
    },
    {
      id: "f3",
      start: "11:20",
      end: "12:50",
      subject: "english",
      room: "112",
      type: "lecture",
      accent: "bg-emerald-500",
    },
  ],
};

const EVENT_DOTS = [3, 10, 17, 24, 26];

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

  const weekDays = useMemo(() => {
    const monday = getMonday(selectedDate);
    return Array.from({ length: 5 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d;
    });
  }, [selectedDate]);

  const selectedWeekIndex = useMemo(() => {
    const idx = weekDays.findIndex((d) => isSameDay(d, selectedDate));
    return idx >= 0 ? idx : 0;
  }, [weekDays, selectedDate]);

  const lessons = WEEKLY_SCHEDULE[selectedWeekIndex] ?? [];

  const subjectLabel = (key: SubjectKey) => {
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
    return map[key];
  };

  const typeLabel = (type: LessonType) => {
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

  const upcomingEvents = [
    {
      id: "e1",
      title: t.scheduleEvents.mathTest,
      date: "10",
      month: t.months[3],
      color: "bg-blue-500/20 text-blue-400",
      icon: "📐",
    },
    {
      id: "e2",
      title: t.scheduleEvents.physicsLab,
      date: "14",
      month: t.months[3],
      color: "bg-violet-500/20 text-violet-400",
      icon: "⚛️",
    },
    {
      id: "e3",
      title: t.scheduleEvents.englishEssay,
      date: "18",
      month: t.months[3],
      color: "bg-emerald-500/20 text-emerald-400",
      icon: "📝",
    },
  ];

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
          {/* Main schedule */}
          <div className="space-y-5">
            {/* Week strip */}
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

            {/* Lessons */}
            <div className="space-y-3">
              {lessons.length === 0 ? (
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
                      {/* Time */}
                      <div className="flex w-20 shrink-0 flex-col justify-center text-center sm:w-24">
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {lesson.start}
                        </span>
                        <span className="text-xs text-gray-400 dark:text-slate-500">
                          {lesson.end}
                        </span>
                      </div>

                      {/* Accent bar + content */}
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
                            {t.teachers[lesson.subject]}
                          </p>
                        </div>
                      </div>

                      {/* Room & type */}
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

                    {/* Mobile meta */}
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

          {/* Right sidebar */}
          <aside className="space-y-5">
            {/* Mini calendar */}
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
                  const hasEvent = EVENT_DOTS.includes(cell.getDate());

                  return (
                    <button
                      key={cell.toISOString()}
                      type="button"
                      onClick={() => {
                        setSelectedDate(cell);
                        if (cell.getDay() >= 1 && cell.getDay() <= 5) {
                          /* stays on weekday view */
                        }
                      }}
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

            {/* Upcoming events */}
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
                        {event.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-slate-400">
                        {event.date} {event.month}
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
