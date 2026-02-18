export default function Dashboard() {
  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Welcome to MurasAI
      </h1>

      <div className="grid grid-cols-3 gap-4">

        <div className="bg-white p-6 rounded-lg shadow">
          AI Assistant
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          Tests Generator
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          Study Planner
        </div>

      </div>

    </div>
  );
}
