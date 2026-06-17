export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col p-4">
      <h1 className="text-3xl font-bold mb-6">💬 Чат</h1>
      
      <div className="flex-1 bg-gray-800 rounded-lg p-4 mb-4 overflow-y-auto max-h-96">
        <div className="mb-4">
          <p className="text-sm text-gray-400">Игрок #1234 • 12:45</p>
          <p className="text-white">Привет всем! 👋</p>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-400">Игрок #5678 • 12:46</p>
          <p className="text-white">Привет! Как дела?</p>
        </div>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Напишите сообщение..."
          className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none"
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-2 rounded-lg transition">
          Отправить
        </button>
      </div>
    </div>
  )
}
