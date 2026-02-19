"use client";

import { useState, useRef, useEffect } from "react";
import { sendChat } from "@/lib/api";

export default function ChatFullScreen() {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = { role: "user", content: message };
    setChatLog((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const data = await sendChat(message);
      const botMessage = { role: "assistant", content: data.reply };
      setChatLog((prev) => [...prev, botMessage]);
    } catch {
      setChatLog((prev) => [
        ...prev,
        { role: "assistant", content: "Ошибка: не удалось получить ответ." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Сообщения */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-8 py-6 space-y-4">
        {chatLog.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[95%] sm:max-w-[65%] px-4 py-3 sm:px-6 sm:py-4 rounded-2xl break-words text-sm sm:text-base ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none shadow"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Поле ввода */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-3 sm:p-4">
        <div className="flex gap-2 sm:gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Введите сообщение..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 sm:px-6 py-3 rounded-xl font-semibold transition disabled:opacity-50 text-[12px] sm:text-sm"
          >
            {loading ? "..." : "Отправить"}
          </button>
        </div>
      </div>
    </div>
  );
}
