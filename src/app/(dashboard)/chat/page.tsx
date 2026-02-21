"use client";

import ChatFullScreen from "@/components/Chat";

export default function ChatPage() {
  return (
    <div className="flex flex-col h-[91dvh] bg-gray-50 dark:bg-gray-800">
      <div className="flex-1 min-h-0">
        <ChatFullScreen />
      </div>
    </div>
  );
}