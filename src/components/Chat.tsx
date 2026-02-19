"use client";

import { useState, useRef, useEffect } from "react";
import { sendChat } from "@/lib/api";

export default function ChatFullScreen() {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Автоскролл к последнему сообщению
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
    } catch (err) {
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
    <div className="flex flex-col h-screen w-screen bg-gray-50">
      {/* Чат */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
        {chatLog.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[90%] sm:max-w-[70%] px-4 py-3 sm:px-6 sm:py-4 rounded-xl break-words ${
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

      {/* Ввод сообщения */}
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 p-4 bg-gray-100 border-t border-gray-200">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 px-4 py-3 sm:px-5 sm:py-4 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold transition disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}
