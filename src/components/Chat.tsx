"use client";

import { useState } from "react";
import { sendChat } from "@/lib/api";

export default function Chat() {

  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  async function handleSend() {

    const data = await sendChat(input, messages);

    setMessages(prev => [
      ...prev,
      { role: "user", content: input },
      { role: "assistant", content: data.reply }
    ]);

    setInput("");
  }

  return (
    <div className="flex flex-col h-full">

      <div className="flex-1 overflow-auto mb-4">

        {messages.map((m, i) => (
          <div key={i}
            className={`p-2 ${
              m.role === "user"
                ? "text-right"
                : "text-left"
            }`}
          >
            {m.content}
          </div>
        ))}

      </div>

      <div className="flex gap-2">

        <input
          className="flex-1 border p-2"
          value={input}
          onChange={e => setInput(e.target.value)}
        />

        <button
          className="bg-blue-500 text-white px-4"
          onClick={handleSend}
        >
          Send
        </button>

      </div>

    </div>
  );
}
