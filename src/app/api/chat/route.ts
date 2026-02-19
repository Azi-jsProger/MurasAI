import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: "Ты AI помощник для подготовки к экзаменам." },
          { role: "user", content: body.message },
        ],
      }),
    });

    if (!res.ok) {
      const text = await res.text(); // Получаем текст ошибки
      console.error("Groq API error:", text);
      return NextResponse.json({ error: "Groq API error", details: text }, { status: 500 });
    }

    const data = await res.json();

    return NextResponse.json({
      reply: data.choices[0]?.message?.content ?? "Нет ответа от модели",
    });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ error: "Internal Server Error", details: String(err) }, { status: 500 });
  }
}

