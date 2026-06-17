export class ChatService {
  private messages: Map<number, any[]> = new Map()
  private globalMessages: any[] = []

  async sendMessage(userId: number, text: string, roomId?: number) {
    const message = {
      id: Math.random(),
      userId,
      username: `player_${userId}`,
      text,
      roomId,
      timestamp: new Date(),
    }

    if (roomId) {
      if (!this.messages.has(roomId)) {
        this.messages.set(roomId, [])
      }
      this.messages.get(roomId)!.push(message)
    } else {
      this.globalMessages.push(message)
    }

    return message
  }

  async getMessages(roomId?: number, limit: number = 50) {
    let messages = roomId ? this.messages.get(roomId) || [] : this.globalMessages
    return messages.slice(-limit)
  }

  async deleteMessage(messageId: number, roomId?: number) {
    if (roomId) {
      const messages = this.messages.get(roomId) || []
      const index = messages.findIndex((m) => m.id === messageId)
      if (index > -1) messages.splice(index, 1)
    } else {
      const index = this.globalMessages.findIndex((m) => m.id === messageId)
      if (index > -1) this.globalMessages.splice(index, 1)
    }
    return true
  }
}

export const chatService = new ChatService()
