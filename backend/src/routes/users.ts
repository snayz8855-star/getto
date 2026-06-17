import express, { Router } from 'express'
import { authMiddleware } from '../middleware/auth'
import {
  getProfile,
  updateProfile,
  getUser,
  getLeaderboard,
} from '../controllers/userController'

const router: Router = express.Router()

router.get('/profile', authMiddleware, getProfile)
router.put('/profile', authMiddleware, updateProfile)
router.get('/leaderboard', getLeaderboard)
router.get('/:userId', getUser)

export default router
