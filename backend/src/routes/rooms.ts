import express, { Router } from 'express'
import { authMiddleware } from '../middleware/auth'
import {
  getAllRooms,
  createRoom,
  getRoom,
  joinRoom,
  leaveRoom,
} from '../controllers/roomController'

const router: Router = express.Router()

router.get('/', getAllRooms)
router.post('/', authMiddleware, createRoom)
router.get('/:roomId', getRoom)
router.post('/:roomId/join', authMiddleware, joinRoom)
router.post('/:roomId/leave', authMiddleware, leaveRoom)

export default router
