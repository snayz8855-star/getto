export default function GamePage() {
  return (
    <div className="min-h-screen bg-green-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6">🎮 Игра</h1>
      
      <div className="bg-green-800 rounded-lg p-8 mb-6">
        <div className="text-center mb-8">
          <p className="text-xl text-gray-300 mb-2">Вы играете против</p>
          <h2 className="text-3xl font-bold">Игрок #5678</h2>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-green-700 rounded-lg p-4 text-center">
            <p className="text-gray-300 mb-2">Ваши карты</p>
            <p className="text-4xl font-bold">5</p>
          </div>
          <div className="bg-green-700 rounded-lg p-4 text-center">
            <p className="text-gray-300 mb-2">Карты противника</p>
            <p className="text-4xl font-bold">3</p>
          </div>
        </div>

        <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg transition text-xl">
          Сделать ход
        </button>
      </div>
    </div>
  )
}
