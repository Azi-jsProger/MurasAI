const SYSTEM_PROMPT =
  "Ты — MurasAI, умный репетитор LMS. Помогаешь студентам готовиться к экзаменам: объясняешь темы просто, даёшь примеры и короткие планы занятий. Отвечай на языке пользователя.";

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const res = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
          temperature: 0.7,
          max_tokens: 1024,
        }),
      },
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Groq API error:", errorText);
      return Response.json({ error: "Ошибка API модели" }, { status: 500 });
    }

    const data = await res.json();
    const reply =
      data?.choices?.[0]?.message?.content ||
      "Извини, я не смог ответить.";

    return Response.json({ reply });
  } catch (err) {
    console.error("Chat route error:", err);
    return Response.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
