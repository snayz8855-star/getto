import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/userStore'
import { useGameStore } from '../store/gameStore'
import { roomsApi } from '../api/rooms'
import { io } from 'socket.io-client'
import Card from '../components/Card'
import Button from '../components/Button'
import Loading from '../components/Loading'

const RoomPage = () => {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const { user } = useUserStore()
  const { currentRoom, setCurrentRoom, players, setPlayers } = useGameStore()
  const [loading, setLoading] = useState(true)
  const [socket, setSocket] = useState<any>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!roomId) return

    const fetchRoom = async () => {
      try {
        setLoading(true)
        const response = await roomsApi.getRoom(parseInt(roomId))
        setCurrentRoom(response.data)
        setPlayers(response.data.players || [])
      } catch (error) {
        console.error('Error fetching room:', error)
        navigate('/')
      } finally {
        setLoading(false)
      }
    }

    fetchRoom()
  }, [roomId, setCurrentRoom, setPlayers, navigate])

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_WS_URL || 'ws://localhost:3000')

    newSocket.on('connect', () => {
      console.log('Connected to socket server')
      if (roomId) {
        newSocket.emit('game:join', { roomId })
      }
    })

    newSocket.on('game:player_joined', (data) => {
      console.log('Player joined:', data)
    })

    newSocket.on('game:update', (data) => {
      console.log('Game update:', data)
    })

    newSocket.on('disconnect', () => {
      console.log('Disconnected from socket server')
    })

    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [roomId])

  const handleStartGame = async () => {
    if (!roomId) return

    try {
      setIsReady(true)
      // Emit to socket
      socket?.emit('game:ready', { roomId })
    } catch (error) {
      console.error('Error starting game:', error)
      setIsReady(false)
    }
  }

  const handleLeaveRoom = async () => {
    try {
      if (roomId) {
        await roomsApi.leaveRoom(parseInt(roomId))
      }
      navigate('/')
    } catch (error) {
      console.error('Error leaving room:', error)
    }
  }

  if (loading) return <Loading />

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-3xl font-bold mb-2">{currentRoom?.name}</h1>
      <p className="text-gray-400 mb-6">{currentRoom?.roomType}</p>

      <Card className="mb-6">
        <h2 className="text-xl font-bold mb-4">Игроки</h2>
        <div className="space-y-2">
          {players?.map((player: any) => (
            <div
              key={player.id}
              className="flex items-center justify-between bg-gray-700 p-3 rounded"
            >
              <span className="font-semibold">{player.username}</span>
              <span className="text-sm text-gray-400">Готов</span>
            </div>
          ))}
        </div>
        <p className="text-gray-400 mt-4 text-sm">
          {players?.length || 0}/{currentRoom?.maxPlayers}
        </p>
      </Card>

      <div className="flex gap-2">
        <Button
          onClick={handleStartGame}
          variant="success"
          size="lg"
          loading={isReady}
          className="flex-1"
        >
          {isReady ? 'Готов' : 'Начать игру'}
        </Button>
        <Button
          onClick={handleLeaveRoom}
          variant="danger"
          size="lg"
          className="flex-1"
        >
          Выход
        </Button>
      </div>
    </div>
  )
}

export default RoomPage
