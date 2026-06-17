export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-600 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-4">🎮 GETTO</h1>
        <p className="text-xl text-gray-200 mb-8">Карточная игра для Telegram</p>
        
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-6 rounded-lg transition">
            🎯 Быстрая игра
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg transition">
            👥 Турнир
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg transition">
            💬 Чат
          </button>
          <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-6 rounded-lg transition">
            👤 Профиль
          </button>
        </div>
      </div>
    </div>
  )
}
