import { Request, Response } from 'express'
import { AuthRequest } from '../middleware/auth'

const mockRooms: any = {
  1: {
    id: 1,
    name: 'Комната 1',
    status: 'waiting',
    roomType: '1v1',
    maxPlayers: 2,
    currentPlayers: 1,
    createdBy: 123,
    isPrivate: false,
    createdAt: new Date(),
  },
  2: {
    id: 2,
    name: 'Стол на 4',
    status: 'waiting',
    roomType: '4players',
    maxPlayers: 4,
    currentPlayers: 2,
    createdBy: 124,
    isPrivate: false,
    createdAt: new Date(),
  },
}

let roomIdCounter = 2

export const getAllRooms = async (req: Request, res: Response) => {
  try {
    const rooms = Object.values(mockRooms)
    res.json(rooms)
  } catch (error) {
    console.error('Get rooms error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const createRoom = async (req: AuthRequest, res: Response) => {
  try {
    const { name, roomType, isPrivate, password } = req.body
    const userId = req.userId

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    if (!name || !roomType) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const maxPlayersMap: any = {
      '1v1': 2,
      '4players': 4,
      '6players': 6,
    }

    const newRoom = {
      id: ++roomIdCounter,
      name,
      status: 'waiting',
      roomType,
      maxPlayers: maxPlayersMap[roomType] || 2,
      currentPlayers: 1,
      createdBy: userId,
      isPrivate: isPrivate || false,
      password: password || null,
      createdAt: new Date(),
      players: [{ id: userId, username: `player_${userId}` }],
    }

    mockRooms[newRoom.id] = newRoom

    res.status(201).json(newRoom)
  } catch (error) {
    console.error('Create room error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getRoom = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params
    const room = mockRooms[roomId]

    if (!room) {
      return res.status(404).json({ error: 'Room not found' })
    }

    res.json(room)
  } catch (error) {
    console.error('Get room error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const joinRoom = async (req: AuthRequest, res: Response) => {
  try {
    const { roomId } = req.params
    const { password } = req.body
    const userId = req.userId

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const room = mockRooms[roomId]

    if (!room) {
      return res.status(404).json({ error: 'Room not found' })
    }

    if (room.currentPlayers >= room.maxPlayers) {
      return res.status(400).json({ error: 'Room is full' })
    }

    if (room.isPrivate && room.password && room.password !== password) {
      return res.status(403).json({ error: 'Invalid password' })
    }

    room.currentPlayers++
    if (!room.players) room.players = []
    room.players.push({ id: userId, username: `player_${userId}` })

    res.json({ success: true, room })
  } catch (error) {
    console.error('Join room error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const leaveRoom = async (req: AuthRequest, res: Response) => {
  try {
    const { roomId } = req.params
    const userId = req.userId

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const room = mockRooms[roomId]

    if (!room) {
      return res.status(404).json({ error: 'Room not found' })
    }

    room.currentPlayers = Math.max(0, room.currentPlayers - 1)
    if (room.players) {
      room.players = room.players.filter((p: any) => p.id !== userId)
    }

    if (room.currentPlayers === 0) {
      delete mockRooms[roomId]
    }

    res.json({ success: true })
  } catch (error) {
    console.error('Leave room error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
