import express, { Express } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import routes from './routes/index'
import { authMiddleware } from './middleware/auth'
import { errorHandler } from './middleware/errorHandler'

dotenv.config()

const app: Express = express()
const httpServer = createServer(app)
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
})

const PORT = process.env.PORT || 3000

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
}))
app.use(express.json())

// API Routes
app.use('/api', routes)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'GETTO API is running' })
})

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('🔌 User connected:', socket.id)

  socket.on('disconnect', () => {
    console.log('🔌 User disconnected:', socket.id)
  })

  socket.on('game:join', (roomId) => {
    socket.join(`room:${roomId}`)
    io.to(`room:${roomId}`).emit('game:player_joined', {
      userId: socket.id,
      timestamp: new Date(),
    })
  })

  socket.on('game:move', (data) => {
    io.to(`room:${data.roomId}`).emit('game:update', data)
  })

  socket.on('chat:message', (data) => {
    io.to(`room:${data.roomId}`).emit('chat:new_message', data)
  })
})

// Error handling
app.use(errorHandler)

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📡 WebSocket ready on ws://localhost:${PORT}`)
})

export { io }
