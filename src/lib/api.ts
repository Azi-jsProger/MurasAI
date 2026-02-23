type ChatResponse = {
  reply: string;
};

export async function sendChat(message: string): Promise<ChatResponse | null> {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: message }],
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}