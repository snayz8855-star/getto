import express, { Router } from 'express'
import {
  loginTelegram,
  refresh,
  logout,
} from '../controllers/authController'

const router: Router = express.Router()

router.post('/telegram', loginTelegram)
router.post('/refresh', refresh)
router.post('/logout', logout)

export default router
