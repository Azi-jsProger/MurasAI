"use client";

import { useState } from "react";
import { sendChat } from "@/lib/api";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);

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
      console.error(err);
      setChatLog((prev) => [...prev, { role: "assistant", content: "Error: Could not get reply." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ minHeight: "300px", border: "1px solid #ccc", padding: "10px" }}>
        {chatLog.map((msg, idx) => (
          <div key={idx} style={{ margin: "5px 0" }}>
            <b>{msg.role === "user" ? "You" : "Bot"}:</b> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSend} disabled={loading}>
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  );
}
