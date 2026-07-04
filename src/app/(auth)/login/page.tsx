"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap } from "lucide-react";
import { login } from "@/lib/api";
import { InputField, PrimaryButton, pageCardClass } from "@/components/ui/page-shell";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { ok, message } = await login(email, password);

    if (ok) {
      router.push("/");
    } else {
      setError(message);
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-slate-950">
      <div className={cn(pageCardClass, "w-full max-w-md p-8 sm:p-10")}>
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600/20 text-indigo-500 ring-1 ring-indigo-500/30">
            <GraduationCap className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            MurasAI LMS
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
            Вход в аккаунт
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <InputField
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <InputField
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="rounded-lg bg-red-500/10 px-3 py-2 text-center text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          <PrimaryButton
            type="submit"
            disabled={loading}
            className="w-full py-3"
          >
            {loading ? "..." : "Войти"}
          </PrimaryButton>
        </form>

        <div className="mt-6 rounded-xl border border-gray-200/80 bg-gray-50 p-4 text-xs text-gray-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          <p className="mb-2 font-medium text-gray-700 dark:text-slate-300">Демо-аккаунты (пароль: password123)</p>
          <ul className="space-y-1">
            <li>supadmin@muras.ai — Супер-админ</li>
            <li>admin@muras.ai — Администратор</li>
            <li>director@muras.ai — Директор</li>
            <li>teacher@muras.ai — Учитель</li>
            <li>student@muras.ai — Ученик</li>
            <li>secretary@muras.ai — Секретарь</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
