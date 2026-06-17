import express from 'express'
import authRoutes from './auth'
import userRoutes from './users'
import roomRoutes from './rooms'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/rooms', roomRoutes)

export default router
