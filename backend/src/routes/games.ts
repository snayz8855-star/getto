import express, { Router } from 'express'
import { authMiddleware } from '../middleware/auth'
import {
  startGame,
  makeMove,
  getGameState,
  finishGame,
} from '../controllers/gameController'

const router: Router = express.Router()

router.post('/start', authMiddleware, startGame)
router.post('/move', authMiddleware, makeMove)
router.get('/:roomId/state', getGameState)
router.post('/:roomId/finish', authMiddleware, finishGame)

export default router
