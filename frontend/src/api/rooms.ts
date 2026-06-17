import client from './client'

export interface Room {
  id: number
  name: string
  status: 'waiting' | 'playing' | 'finished'
  roomType: '1v1' | '4players' | '6players'
  maxPlayers: number
  currentPlayers: number
  createdBy: number
  isPrivate: boolean
  createdAt: string
}

export const roomsApi = {
  getAllRooms: () => {
    return client.get<Room[]>('/rooms')
  },

  getRoom: (roomId: number) => {
    return client.get<Room>(`/rooms/${roomId}`)
  },

  createRoom: (data: {
    name: string
    roomType: '1v1' | '4players' | '6players'
    isPrivate: boolean
    password?: string
  }) => {
    return client.post<Room>('/rooms', data)
  },

  joinRoom: (roomId: number, password?: string) => {
    return client.post(`/rooms/${roomId}/join`, { password })
  },

  leaveRoom: (roomId: number) => {
    return client.post(`/rooms/${roomId}/leave`)
  },
}
