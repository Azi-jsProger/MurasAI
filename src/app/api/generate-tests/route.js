import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

import formidable from "formidable";

export async function POST(req) {
  const form = new formidable.IncomingForm();

  return new Promise((resolve) => {
    form.parse(req, async (err, fields, files) => {
      if (err) return resolve(new Response(JSON.stringify({ error: err.message }), { status: 500 }));

      const file = files.file;
      if (!file) return resolve(new Response(JSON.stringify({ error: "Файл не выбран" }), { status: 400 }));

      try {
        const content = fs.readFileSync(file.filepath, "utf-8");

        // Пример генерации тестов: каждая строка - тема
        const tests = content.split("\n").filter(Boolean).map((line) => ({
          title: line.trim(),
          score: Math.floor(Math.random() * 31 + 70) + "%", // случайный балл 70-100%
        }));

        resolve(new Response(JSON.stringify({ tests }), { status: 200 }));
      } catch (err) {
        resolve(new Response(JSON.stringify({ error: err.message }), { status: 500 }));
      }
    });
  });
}