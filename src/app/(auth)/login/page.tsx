"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const text = await res.text();

    if (text === "Login success") {
      router.push("/");
    } else {
      setError(text);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="bg-white p-12 rounded-xl shadow-xl w-[400px] border border-gray-200">
        <h1 className="text-3xl font-semibold mb-8 text-center text-gray-800">
          Вход в MurasAI
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Пароль"
            className="border border-gray-300 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="bg-indigo-600 text-white py-3 rounded-md font-medium hover:bg-indigo-700 transition"
          >
            Войти
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500 text-sm">
          Забыли аккаунта?{" "}
          <a href="/register" className="text-indigo-600 hover:underline">
            Восстановить
          </a>
        </p>
      </div>
    </div>
  );
}