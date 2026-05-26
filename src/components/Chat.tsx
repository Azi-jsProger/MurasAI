"use client";

import { useState, useRef, useEffect } from "react";
import { sendChat } from "@/lib/api";
import type { ChatMessage } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/locales";
import Skeleton from "@/components/Skeleton";
import { Bot, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageCard, PrimaryButton } from "@/components/ui/page-shell";

export default function ChatFullScreen() {
  const { language } = useLanguage();
  const t = translations[language];

  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  useEffect(() => {
    const timer = setTimeout(() => setLoadingSkeleton(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = async () => {
    if (!message.trim() || loading) return;

    const userMessage: ChatMessage = { role: "user", content: message.trim() };
    const nextLog = [...chatLog, userMessage];
    setChatLog(nextLog);
    setMessage("");
    setLoading(true);

    try {
      const data = await sendChat(nextLog);
      if (data?.reply) {
        setChatLog((prev) => [
          ...prev,
          { role: "assistant", content: data.reply! },
        ]);
      } else {
        setChatLog((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data?.error ?? "Ошибка при отправке на AI",
          },
        ]);
      }
    } catch {
      setChatLog((prev) => [
        ...prev,
        { role: "assistant", content: "Ошибка при отправке на AI" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <PageCard className="flex min-h-0 flex-1 flex-col overflow-hidden p-0">
        <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
          {loadingSkeleton &&
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton
                key={i}
                width="w-full"
                height="h-12"
                className="rounded-2xl"
              />
            ))}

          {!loadingSkeleton && chatLog.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600/20 text-indigo-500 ring-1 ring-indigo-500/30">
                <Bot className="h-7 w-7" />
              </div>
              <p className="text-sm text-gray-500 dark:text-slate-400">
                {t.aiAssistantDesc}
              </p>
            </div>
          )}

          {!loadingSkeleton &&
            chatLog.map((msg, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex",
                  msg.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                <div
                  className={cn(
                    "max-w-[90%] break-words rounded-2xl px-4 py-3 text-sm sm:max-w-[70%] sm:text-base",
                    msg.role === "user"
                      ? "rounded-br-md bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/20"
                      : "rounded-bl-md border border-gray-200/80 bg-gray-50 text-gray-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100",
                  )}
                >
                  {msg.content}
                </div>
              </div>
            ))}

          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-md border border-gray-200/80 bg-gray-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
                <span className="inline-flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-500 [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-500 [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-500" />
                </span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="border-t border-gray-200/80 p-3 dark:border-slate-800 sm:p-4">
          <div className="flex gap-2 sm:gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.chatPlaceholder}
              disabled={loading}
              className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
            <PrimaryButton
              onClick={handleSend}
              disabled={loading || !message.trim()}
              className="shrink-0 px-4"
            >
              <Send className="h-4 w-4" />
              <span className="hidden sm:inline">{t.send}</span>
            </PrimaryButton>
          </div>
        </div>
      </PageCard>
    </div>
  );
}
