"use client";

import Chat from "@/components/Chat";

export default function ChatPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 mt-10 sm:mt-0 flex flex-col items-center">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">AI Ассистент</h1>
      <div className="w-full max-w-md sm:max-w-lg">
        <Chat />
      </div>
    </div>
  );
}
