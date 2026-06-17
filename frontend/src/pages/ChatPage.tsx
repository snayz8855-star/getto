import { useState, useEffect, useRef } from 'react'
import { useUserStore } from '../store/userStore'
import { useChatStore } from '../store/chatStore'
import { chatApi } from '../api/chat'
import { io } from 'socket.io-client'
import Card from '../components/Card'
import Button from '../components/Button'

const ChatPage = () => {
  const { user } = useUserStore()
  const { messages, addMessage } = useChatStore()
  const [messageText, setMessageText] = useState('')
  const [loading, setLoading] = useState(false)
  const [socket, setSocket] = useState<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await chatApi.getMessages(undefined, 50)
        response.data.forEach((msg: any) => addMessage(msg))
      } catch (error) {
        console.error('Error fetching messages:', error)
      }
    }

    fetchMessages()
  }, [])

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_WS_URL || 'ws://localhost:3000')

    newSocket.on('chat:new_message', (data) => {
      addMessage(data)
    })

    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async () => {
    if (!messageText.trim() || !user) return

    try {
      setLoading(true)
      const response = await chatApi.sendMessage(messageText)

      addMessage({
        id: response.data.id,
        userId: user.id,
        username: user.username,
        text: messageText,
        timestamp: new Date().toISOString(),
      })

      socket?.emit('chat:message', response.data)
      setMessageText('')
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md flex flex-col h-screen">
      <h1 className="text-3xl font-bold mb-6">💬 Глобальный чат</h1>

      <Card className="flex-1 overflow-y-auto mb-4 max-h-96">
        <div className="space-y-4">
          {messages.length > 0 ? (
            messages.map((msg: any) => (
              <div key={msg.id} className="border-b border-gray-700 pb-2">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-sm">{msg.username}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </p>
                </div>
                <p className="text-white break-words">{msg.text}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center py-4">Нет сообщений</p>
          )}
          <div ref={messagesEndRef} />
        </div>
      </Card>

      <div className="flex gap-2">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Напишите сообщение..."
          className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <Button
          onClick={handleSendMessage}
          variant="primary"
          loading={loading}
          disabled={!messageText.trim()}
        >
          Отправить
        </Button>
      </div>
    </div>
  )
}

export default ChatPage
