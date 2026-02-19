"use client";

export default function Personal() {
  return (
    <div className="p-8 space-y-8">

      <h1 className="text-3xl font-bold">👤 Личная карточка</h1>

      <div className="bg-white p-8 rounded-2xl shadow-md flex items-center gap-8">
        <img
          src="https://ui-avatars.com/api/?name=Aziret+O&background=6366F1&color=fff"
          className="w-28 h-28 rounded-full shadow-lg"
        />

        <div>
          <h2 className="text-2xl font-semibold">Aziret O.</h2>
          <p className="text-gray-500">Студент • MurasAI User</p>

          <div className="mt-4 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full inline-block text-sm font-medium">
            AI Level: Advanced
          </div>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard title="Пройдено тестов" value="12" color="from-indigo-500 to-purple-600" />
        <StatCard title="Средний балл" value="88%" color="from-emerald-500 to-teal-600" />
        <StatCard title="Часы обучения" value="42 ч" color="from-orange-500 to-pink-500" />
        <StatCard title="AI рейтинг" value="A+" color="from-blue-500 to-cyan-500" />
      </div>

      {/* AI анализ */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8 rounded-2xl shadow-lg">
        <h3 className="font-semibold mb-2 text-lg">🧠 AI Analysis</h3>
        <p className="opacity-90">
          Your learning pace is excellent. Focus on Algebra and Physics this week.
          Daily micro-tests will increase your score by +5%.
        </p>
      </div>

    </div>
  );
}

function StatCard({ title, value, color }: any) {
  return (
    <div className={`bg-gradient-to-r ${color} text-white p-6 rounded-2xl shadow-lg`}>
      <p className="text-sm opacity-80">{title}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}
