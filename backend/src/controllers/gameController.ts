import { Request, Response } from 'express'
import { AuthRequest } from '../middleware/auth'
import { gameService } from '../services/GameService'

export const startGame = async (req: AuthRequest, res: Response) => {
  try {
    const { roomId } = req.body
    const userId = req.userId

    if (!userId || !roomId) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Mock players
    const players = [
      { id: userId, username: `player_${userId}` },
      { id: Math.random(), username: 'player_opponent' },
    ]

    const game = await gameService.startGame(roomId, players)
    res.json(game)
  } catch (error) {
    console.error('Start game error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const makeMove = async (req: AuthRequest, res: Response) => {
  try {
    const { roomId, cardIndex } = req.body
    const userId = req.userId

    if (!userId || !roomId) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const result = await gameService.makeMove(roomId, userId, cardIndex)
    if (!result) {
      return res.status(400).json({ error: 'Invalid move' })
    }

    res.json(result)
  } catch (error) {
    console.error('Make move error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getGameState = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params

    const game = gameService.getGameState(parseInt(roomId))
    if (!game) {
      return res.status(404).json({ error: 'Game not found' })
    }

    res.json(game)
  } catch (error) {
    console.error('Get game state error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const finishGame = async (req: AuthRequest, res: Response) => {
  try {
    const { roomId, winnerId } = req.body

    if (!roomId || !winnerId) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const result = await gameService.finishGame(roomId, winnerId)
    res.json(result)
  } catch (error) {
    console.error('Finish game error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
