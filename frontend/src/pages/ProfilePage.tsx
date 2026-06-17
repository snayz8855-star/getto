export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6">👤 Профиль</h1>
      
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full"></div>
          <div>
            <h2 className="text-2xl font-bold">Игрок #1234</h2>
            <p className="text-gray-400">Уровень 5 • Рейтинг: 1200</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <p className="text-gray-400 mb-2">Побед</p>
          <p className="text-2xl font-bold text-green-400">42</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <p className="text-gray-400 mb-2">Проигрышей</p>
          <p className="text-2xl font-bold text-red-400">15</p>
        </div>
      </div>
    </div>
  )
}
