import express from 'express'

const router = express.Router()

router.get('/profile', (req, res) => {
  res.json({ message: 'Get profile' })
})

router.put('/profile', (req, res) => {
  res.json({ message: 'Update profile' })
})

router.get('/:userId', (req, res) => {
  res.json({ message: 'Get user' })
})

export default router
