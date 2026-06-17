import { Request, Response } from 'express'
import { AuthRequest } from '../middleware/auth'
import { chatService } from '../services/ChatService'

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { roomId, limit } = req.query

    const messages = await chatService.getMessages(
      roomId ? parseInt(roomId as string) : undefined,
      limit ? parseInt(limit as string) : 50
    )

    res.json(messages)
  } catch (error) {
    console.error('Get messages error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const sendMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { text, roomId } = req.body
    const userId = req.userId

    if (!userId || !text) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    if (text.length > 500) {
      return res.status(400).json({ error: 'Message too long' })
    }

    const message = await chatService.sendMessage(
      userId,
      text,
      roomId ? parseInt(roomId) : undefined
    )

    res.status(201).json(message)
  } catch (error) {
    console.error('Send message error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const deleteMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { messageId } = req.params
    const { roomId } = req.body

    if (!messageId) {
      return res.status(400).json({ error: 'Missing message id' })
    }

    const success = await chatService.deleteMessage(
      parseInt(messageId),
      roomId ? parseInt(roomId) : undefined
    )

    res.json({ success })
  } catch (error) {
    console.error('Delete message error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
