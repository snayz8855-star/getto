import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.json({ message: 'Get all rooms' })
})

router.post('/', (req, res) => {
  res.json({ message: 'Create room' })
})

router.post('/:roomId/join', (req, res) => {
  res.json({ message: 'Join room' })
})

export default router
