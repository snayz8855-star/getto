import create from 'zustand'

interface Message {
  id: number
  userId: number
  username: string
  text: string
  timestamp: string
  roomId?: number
}

interface ChatState {
  messages: Message[]
  roomMessages: Map<number, Message[]>
  addMessage: (message: Message) => void
  addRoomMessage: (roomId: number, message: Message) => void
  clearRoomMessages: (roomId: number) => void
  setRoomMessages: (roomId: number, messages: Message[]) => void
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  roomMessages: new Map(),
  
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message],
  })),
  
  addRoomMessage: (roomId, message) => set((state) => {
    const messages = state.roomMessages.get(roomId) || []
    const updated = new Map(state.roomMessages)
    updated.set(roomId, [...messages, message])
    return { roomMessages: updated }
  }),
  
  clearRoomMessages: (roomId) => set((state) => {
    const updated = new Map(state.roomMessages)
    updated.delete(roomId)
    return { roomMessages: updated }
  }),
  
  setRoomMessages: (roomId, messages) => set((state) => {
    const updated = new Map(state.roomMessages)
    updated.set(roomId, messages)
    return { roomMessages: updated }
  }),
}))
