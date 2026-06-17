import express from 'express'

const router = express.Router()

router.post('/telegram', (req, res) => {
  res.json({ message: 'Auth endpoint' })
})

router.post('/refresh', (req, res) => {
  res.json({ message: 'Refresh endpoint' })
})

router.post('/logout', (req, res) => {
  res.json({ message: 'Logout endpoint' })
})

export default router
