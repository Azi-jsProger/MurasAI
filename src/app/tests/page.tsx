"use client";

import { FileText } from "lucide-react";

export default function Tests() {
  return (
    <div className="p-8 space-y-8">

      <h1 className="text-3xl font-bold">📝 AI Tests Generator</h1>

      <div className="bg-white p-8 rounded-2xl shadow-md">

        <p className="text-gray-600 mb-6">
          Generate personalized tests based on your weak topics.
        </p>

        <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition">
          Generate Test
        </button>

      </div>

      <div className="grid grid-cols-3 gap-6">

        <TestCard title="Algebra Practice" score="85%" />
        <TestCard title="Physics Quiz" score="78%" />
        <TestCard title="Biology Test" score="91%" />

      </div>

    </div>
  );
}

function TestCard({ title, score }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
      <FileText className="text-indigo-500 mb-4" />
      <h3 className="font-semibold">{title}</h3>
      <p className="text-gray-500 mt-2">Score: {score}</p>
    </div>
  );
}
