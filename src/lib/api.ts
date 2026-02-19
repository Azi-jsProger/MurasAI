export async function sendChat(message: string) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Server error:", text);
    throw new Error("Server error");
  }

  const data = await res.json();
  return data;
}
