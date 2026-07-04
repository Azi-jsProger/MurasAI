import { API_BASE_URL } from "./config";

export type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

type ChatResponse = {
  reply?: string;
  error?: string;
};

export type AuthMeResponse = {
  authenticated: boolean;
  userName: string | null;
  roles: string[];
};

export type AuthLoginResponse = {
  ok: boolean;
  message: string;
};

export type AuthRefreshResponse = {
  ok: boolean;
  userName: string | null;
  roles: string[];
};

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/[$()*+.?[\\\]^{|}-]/g, "\\$&")}=([^;]*)`),
  );
  return match ? decodeURIComponent(match[1]) : null;
}

function withCsrf(headers?: HeadersInit): HeadersInit {
  const csrf = readCookie("XSRF-TOKEN");
  if (!csrf) return { ...(headers ?? {}) };
  return { ...(headers ?? {}), "X-XSRF-TOKEN": csrf };
}

export type StatsDto = {
  avgScorePercent: number;
  aiRatingKey: string;
  testsCompleted: number;
  learningHours: number;
  aiGrade: string;
};

export type UserProfileDto = {
  userName: string;
  avatarBg: string;
  email: string;
  aiRatingKey: string;
  aiGrade: string;
};

export type ProgressPointDto = {
  weekOrder: number;
  score: number;
};

export type SubjectScoreDto = {
  subjectKey: string;
  score: number;
  colorIndex: number;
};

export type SkillPointDto = {
  skillKey: string;
  value: number;
};

export type AnalyticsDto = {
  stats: StatsDto;
  progress: ProgressPointDto[];
  subjects: SubjectScoreDto[];
  skills: SkillPointDto[];
};

export type StudyPlanItemDto = {
  dayKey: string;
  taskKey: string;
  completed: boolean;
  sortOrder: number;
};

export type TestResultDto = {
  titleKey: string;
  scorePercent: number;
};

export type WebTestDto = {
  titleKey: string;
  difficultyKey: string;
  progressPercent: number;
};

export type ScheduleLessonDto = {
  id: number;
  start: string;
  end: string;
  subject: string;
  room: string;
  type: string;
  accent: string;
};

export type ScheduleEventDto = {
  id: number;
  titleKey: string;
  eventDay: number;
  eventMonth: number;
  icon: string;
  color: string;
};

export type ScheduleDto = {
  dayOfWeek: number;
  lessons: ScheduleLessonDto[];
  upcomingEvents: ScheduleEventDto[];
  eventDays: number[];
};

async function apiFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      credentials: "include",
      cache: "no-store",
      ...options,
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch (error) {
    console.error(`API error ${path}:`, error);
    return null;
  }
}

export async function sendChat(
  messages: ChatMessage[],
): Promise<ChatResponse | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/chat`, {
      method: "POST",
      credentials: "include",
      headers: withCsrf({ "Content-Type": "application/json" }),
      body: JSON.stringify({ messages }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error ?? "Failed to fetch");
    }

    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function checkAuth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
      credentials: "include",
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    const data = (await res.json()) as AuthMeResponse;
    return Boolean(data.authenticated);
  } catch {
    return false;
  }
}

export async function fetchCurrentUser(): Promise<string | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = (await res.json()) as AuthMeResponse;
    return data.authenticated ? data.userName : null;
  } catch (error) {
    console.error("Ошибка при получении пользователя:", error);
    return null;
  }
}

export async function fetchAuthMe(): Promise<AuthMeResponse | null> {
  return apiFetch<AuthMeResponse>("/api/auth/me");
}

export async function fetchUserProfile(): Promise<UserProfileDto | null> {
  return apiFetch<UserProfileDto>("/api/user/profile");
}

export async function fetchStats(): Promise<StatsDto | null> {
  return apiFetch<StatsDto>("/api/stats");
}

export async function fetchAnalytics(): Promise<AnalyticsDto | null> {
  return apiFetch<AnalyticsDto>("/api/analytics");
}

export async function fetchStudyPlan(): Promise<StudyPlanItemDto[]> {
  return (await apiFetch<StudyPlanItemDto[]>("/api/study-plan")) ?? [];
}

export async function fetchTests(): Promise<TestResultDto[]> {
  return (await apiFetch<TestResultDto[]>("/api/tests")) ?? [];
}

export async function fetchWebTests(): Promise<WebTestDto[]> {
  return (await apiFetch<WebTestDto[]>("/api/web-tests")) ?? [];
}

export async function generateTest(
  topic: string,
  difficulty: string,
): Promise<TestResultDto | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/tests/generate`, {
      method: "POST",
      credentials: "include",
      headers: withCsrf({ "Content-Type": "application/json" }),
      body: JSON.stringify({ topic, difficulty }),
    });
    if (!res.ok) return null;
    return (await res.json()) as TestResultDto;
  } catch (error) {
    console.error("Ошибка при генерации теста:", error);
    return null;
  }
}

export async function fetchSchedule(date: Date): Promise<ScheduleDto | null> {
  const iso = date.toISOString().slice(0, 10);
  return apiFetch<ScheduleDto>(`/api/schedule?date=${iso}`);
}

export async function login(
  email: string,
  password: string,
): Promise<{ ok: boolean; message: string }> {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  const data = (await res.json()) as AuthLoginResponse;
  return { ok: data.ok, message: data.message };
}

export async function logout(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: withCsrf(),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function refreshAuth(): Promise<AuthRefreshResponse | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: "POST",
      credentials: "include",
      headers: withCsrf(),
    });
    if (!res.ok) return null;
    return (await res.json()) as AuthRefreshResponse;
  } catch {
    return null;
  }
}

export type AdminUserDto = {
  id: number;
  email: string;
  displayName: string;
  avatarColor: string;
  roles: string[];
  createdAt: string;
};

export type DirectorOverviewDto = {
  totalStudents: number;
  totalTeachers: number;
  totalStaff: number;
  avgScorePercent: number;
  totalTestsCompleted: number;
  activeUsers: number;
};

export type TeacherOverviewDto = {
  myStudentsCount: number;
  lessonsThisWeek: number;
  subjects: string[];
  avgClassScore: number;
};

export type AuditLogDto = {
  id: number;
  actorUserId: number | null;
  actorEmail: string | null;
  action: string;
  targetType: string | null;
  targetId: number | null;
  details: string | null;
  ipAddress: string | null;
  createdAt: string;
};

async function apiMutate<T>(
  path: string,
  method: string,
  body?: unknown,
): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method,
      credentials: "include",
      cache: "no-store",
      headers: withCsrf(
        body ? { "Content-Type": "application/json" } : undefined,
      ),
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) return null;
    if (res.status === 204) return null;
    return (await res.json()) as T;
  } catch (error) {
    console.error(`API mutate error ${path}:`, error);
    return null;
  }
}

export async function fetchAdminUsers(): Promise<AdminUserDto[]> {
  return (await apiFetch<AdminUserDto[]>("/api/admin/users")) ?? [];
}

export async function createAdminUser(data: {
  email: string;
  password: string;
  displayName: string;
  roles: string[];
}): Promise<AdminUserDto | null> {
  return apiMutate<AdminUserDto>("/api/admin/users", "POST", data);
}

export async function updateAdminUser(
  id: number,
  data: { displayName?: string; avatarColor?: string; roles?: string[] },
): Promise<AdminUserDto | null> {
  return apiMutate<AdminUserDto>(`/api/admin/users/${id}`, "PUT", data);
}

export async function deleteAdminUser(id: number): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/admin/users/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: withCsrf(),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function fetchAuditLogs(): Promise<AuditLogDto[]> {
  return (await apiFetch<AuditLogDto[]>("/api/admin/audit")) ?? [];
}

export async function fetchDirectorOverview(): Promise<DirectorOverviewDto | null> {
  return apiFetch<DirectorOverviewDto>("/api/director/overview");
}

export async function fetchTeacherOverview(): Promise<TeacherOverviewDto | null> {
  return apiFetch<TeacherOverviewDto>("/api/director/teacher-overview");
}
