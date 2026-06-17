import express, { Router } from 'express'
import { authMiddleware } from '../middleware/auth'
import {
  getMessages,
  sendMessage,
  deleteMessage,
} from '../controllers/chatController'

const router: Router = express.Router()

router.get('/messages', getMessages)
router.post('/messages', authMiddleware, sendMessage)
router.delete('/messages/:messageId', authMiddleware, deleteMessage)

export default router
