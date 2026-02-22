export async function sendChat(message) {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: message }],
      }),
    });
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}