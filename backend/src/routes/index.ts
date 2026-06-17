import express, { Router } from 'express'
import authRoutes from './auth'
import userRoutes from './users'
import roomRoutes from './rooms'
import gameRoutes from './games'
import chatRoutes from './chat'

const router: Router = express.Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/rooms', roomRoutes)
router.use('/games', gameRoutes)
router.use('/chat', chatRoutes)

export default router
