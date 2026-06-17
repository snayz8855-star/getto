import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'
import { roomsApi } from '../api/rooms'
import Card from '../components/Card'
import Button from '../components/Button'
import Loading from '../components/Loading'

const HomePage = () => {
  const navigate = useNavigate()
  const { setCurrentRoom } = useGameStore()
  const [rooms, setRooms] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateRoom, setShowCreateRoom] = useState(false)
  const [roomType, setRoomType] = useState('1v1')
  const [roomName, setRoomName] = useState('')
  const [creatingRoom, setCreatingRoom] = useState(false)

  useEffect(() => {
    fetchRooms()
  }, [])

  const fetchRooms = async () => {
    try {
      setLoading(true)
      const response = await roomsApi.getAllRooms()
      setRooms(response.data)
    } catch (error) {
      console.error('Error fetching rooms:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateRoom = async () => {
    try {
      setCreatingRoom(true)
      const response = await roomsApi.createRoom({
        name: roomName || `Комната ${roomType}`,
        roomType: roomType as any,
        isPrivate: false,
      })
      setCurrentRoom(response.data)
      setShowCreateRoom(false)
      setRoomName('')
      navigate(`/room/${response.data.id}`)
    } catch (error) {
      console.error('Error creating room:', error)
    } finally {
      setCreatingRoom(false)
    }
  }

  const handleJoinRoom = async (room: any) => {
    try {
      const response = await roomsApi.joinRoom(room.id)
      setCurrentRoom(response.data.room)
      navigate(`/room/${room.id}`)
    } catch (error) {
      console.error('Error joining room:', error)
    }
  }

  if (loading) return <Loading />

  return (
    <div className="container mx-auto px-4 py-8 max-w-md pb-24">
      <h1 className="text-3xl font-bold mb-2">🎮 GETTO</h1>
      <p className="text-gray-400 mb-6">Карточная игра для Telegram</p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Button variant="secondary" size="lg" className="w-full">
          🎯 Быстрая игра
        </Button>
        <Button variant="primary" size="lg" className="w-full">
          👥 Турнир
        </Button>
      </div>

      <Card className="mb-6">
        <h2 className="text-xl font-bold mb-4">📍 Доступные комнаты</h2>
        <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <div key={room.id} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                <div className="flex-1">
                  <p className="font-semibold text-sm">{room.name}</p>
                  <p className="text-xs text-gray-400">
                    {room.currentPlayers}/{room.maxPlayers} игроков • {room.roomType}
                  </p>
                </div>
                <Button
                  onClick={() => handleJoinRoom(room)}
                  variant="success"
                  size="sm"
                  disabled={room.currentPlayers >= room.maxPlayers}
                >
                  Вход
                </Button>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center py-4">Нет доступных комнат</p>
          )}
        </div>

        <Button
          onClick={() => setShowCreateRoom(!showCreateRoom)}
          variant="primary"
          className="w-full"
        >
          {showCreateRoom ? '❌ Отмена' : '➕ Создать комнату'}
        </Button>
      </Card>

      {showCreateRoom && (
        <Card className="mb-6">
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Название комнаты"
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="1v1">1 vs 1</option>
            <option value="4players">На 4 игроков</option>
            <option value="6players">На 6 игроков</option>
          </select>
          <Button
            onClick={handleCreateRoom}
            variant="success"
            className="w-full"
            loading={creatingRoom}
          >
            Создать
          </Button>
        </Card>
      )}
    </div>
  )
}

export default HomePage
