export default function WebTest() {
  const tests = [
    { title: "Алгебра", difficulty: "Medium", progress: 70 },
    { title: "Физика", difficulty: "Hard", progress: 40 },
    { title: "История", difficulty: "Easy", progress: 100 },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Тестирование</h1>

      <div className="grid grid-cols-3 gap-4">
        {tests.map((test, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow hover:-translate-y-1 transition-all">
            <h2 className="font-semibold mb-2">{test.title}</h2>
            <p className="text-gray-500 mb-2">Difficulty: {test.difficulty}</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div className={`bg-blue-500 h-2 rounded-full`} style={{ width: `${test.progress}%` }} />
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600">
              Start Test
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
