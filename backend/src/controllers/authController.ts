import { Request, Response } from 'express'
import { authService } from '../services/AuthService'
import { userService } from '../services/UserService'

interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
}

export const loginTelegram = async (req: Request, res: Response) => {
  try {
    const { telegramData } = req.body
    const user: TelegramUser = telegramData.user

    if (!user || !user.id) {
      return res.status(400).json({ error: 'Invalid telegram data' })
    }

    // Generate JWT token
    const token = authService.generateToken(user.id, user.id)

    res.json({
      token,
      user: {
        id: user.id,
        telegramId: user.id,
        firstName: user.first_name,
        lastName: user.last_name || '',
        username: user.username || '',
        photoUrl: user.photo_url || '',
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const refresh = (req: Request, res: Response) => {
  try {
    res.json({ message: 'Token refreshed' })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const logout = (req: Request, res: Response) => {
  try {
    res.json({ message: 'Logged out successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}
