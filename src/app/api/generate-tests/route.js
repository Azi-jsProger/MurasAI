export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return Response.json({ error: "Файл не выбран" }, { status: 400 });
    }

    const content = await file.text();
    const tests = content
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => ({
        title: line,
        score: `${Math.floor(Math.random() * 31 + 70)}%`,
      }));

    return Response.json({ tests });
  } catch (err) {
    console.error("Generate tests error:", err);
    return Response.json(
      { error: err instanceof Error ? err.message : "Ошибка сервера" },
      { status: 500 },
    );
  }
}
