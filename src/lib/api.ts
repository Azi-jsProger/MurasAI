import { API_BASE_URL } from "./config";

export type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

type ChatResponse = {
  reply?: string;
  error?: string;
};

export async function sendChat(
  messages: ChatMessage[],
): Promise<ChatResponse | null> {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
    const text = await res.text();
    return text !== "Not logged in";
  } catch {
    return false;
  }
}

export async function fetchCurrentUser(): Promise<string | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
      credentials: "include", // Обязательно для cookie-сессии
      cache: "no-store",
    });

    if (!res.ok) return null;

    const text = await res.text();
    
    // Если бэкенд возвращает "Not logged in", значит сессии нет
    if (text === "Not logged in") return null;

    return text; // Возвращает "Aziret O"
  } catch (error) {
    console.error("Ошибка при получении пользователя:", error);
    return null;
  }
}

export type WebTestDto = {
  titleKey: string;     // Вместо title
  scorePercent: number; // Вместо progress
  // Поле difficulty убираем из типа, так как бэкенд его не присылает
};

export async function get_allTest(): Promise<WebTestDto[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/tests`, {
      credentials: "include", 
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Не удалось загрузить тесты");

    const data: WebTestDto[] = await res.json();
    return data;
  } catch (error) {
    console.error("Ошибка при получении тестов:", error);
    return [];
  }
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
  const text = await res.text();
  return { ok: text === "Login success", message: text };
}

export async function logout(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    return res.ok;
  } catch {
    return false;
  }
}
