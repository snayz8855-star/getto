import client from './client'

export interface Message {
  id: number
  userId: number
  username: string
  text: string
  timestamp: string
  roomId?: number
}

export const chatApi = {
  getMessages: (roomId?: number, limit: number = 50) => {
    return client.get<Message[]>('/chat/messages', {
      params: { roomId, limit },
    })
  },

  sendMessage: (text: string, roomId?: number) => {
    return client.post<Message>('/chat/messages', { text, roomId })
  },

  deleteMessage: (messageId: number) => {
    return client.delete(`/chat/messages/${messageId}`)
  },
}
