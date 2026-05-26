"use client";

import ChatFullScreen from "@/components/Chat";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/locales";
import { Bot } from "lucide-react";
import { PageHeader, PageShell } from "@/components/ui/page-shell";
import Skeleton from "@/components/Skeleton";

export default function ChatPage() {
  const { language, isLoaded } = useLanguage();
  const t = translations[language];

  return (
    <PageShell className="flex h-[calc(100vh-4rem)] flex-col sm:h-[calc(100vh-5rem)]">
      {isLoaded ? (
        <PageHeader
          icon={Bot}
          title={t.aiAssistant}
          subtitle={t.aiAssistantDesc}
        />
      ) : (
        <Skeleton width="w-56" height="h-10" />
      )}

      <div className="min-h-0 flex-1">
        <ChatFullScreen />
      </div>
    </PageShell>
  );
}
