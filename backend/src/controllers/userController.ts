import { Request, Response } from 'express'
import { AuthRequest } from '../middleware/auth'
import { userService } from '../services/UserService'

const mockUsers: any = {
  123: {
    id: 123,
    telegramId: 123,
    username: 'player_123',
    firstName: 'Test',
    lastName: 'User',
    photoUrl: '',
    level: 1,
    experience: 0,
    coins: 1000,
    gems: 0,
    eloRating: 1000,
    totalWins: 0,
    totalLosses: 0,
  },
}

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const user = mockUsers[userId] || {
      id: userId,
      telegramId: userId,
      username: `player_${userId}`,
      firstName: 'Player',
      lastName: '',
      photoUrl: '',
      level: 1,
      experience: 0,
      coins: 1000,
      gems: 0,
      eloRating: 1000,
      totalWins: 0,
      totalLosses: 0,
    }

    mockUsers[userId] = user

    res.json(user)
  } catch (error) {
    console.error('Get profile error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId
    const { username, photoUrl, ...updates } = req.body

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    if (!mockUsers[userId]) {
      mockUsers[userId] = {
        id: userId,
        telegramId: userId,
        username: `player_${userId}`,
        firstName: 'Player',
        lastName: '',
        photoUrl: '',
        level: 1,
        experience: 0,
        coins: 1000,
        gems: 0,
        eloRating: 1000,
        totalWins: 0,
        totalLosses: 0,
      }
    }

    if (username) mockUsers[userId].username = username
    if (photoUrl) mockUsers[userId].photoUrl = photoUrl

    Object.assign(mockUsers[userId], updates)

    res.json(mockUsers[userId])
  } catch (error) {
    console.error('Update profile error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const user = mockUsers[userId] || {
      id: userId,
      telegramId: userId,
      username: `player_${userId}`,
      firstName: 'Player',
      lastName: '',
      photoUrl: '',
      level: 1,
      experience: 0,
      coins: 1000,
      gems: 0,
      eloRating: 1000,
      totalWins: 0,
      totalLosses: 0,
    }

    res.json(user)
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const leaderboard = Object.values(mockUsers)
      .sort((a: any, b: any) => b.eloRating - a.eloRating)
      .slice(0, 100)

    res.json(leaderboard)
  } catch (error) {
    console.error('Get leaderboard error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
