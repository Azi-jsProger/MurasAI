const API = "http://localhost:8000";

export async function sendChat(message: string, history: any[]) {

  const res = await fetch(`${API}/ai/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message,
      history
    })
  });

  return res.json();
}
