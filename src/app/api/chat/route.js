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
          messages,
        }),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Groq API error:", errorText);
      return new Response(
        JSON.stringify({ error: "Ошибка API модели" }),
        { status: 500 }
      );
    }

    const data = await res.json();
    const reply =
      data?.choices?.[0]?.message?.content ||
      "Извини, я не смог ответить.";

    return new Response(JSON.stringify({ reply }), { status: 200 });
  } catch (err) {
    console.error("Chat route error:", err);
    return new Response(
      JSON.stringify({ error: "Ошибка сервера" }),
      { status: 500 }
    );
  }
}