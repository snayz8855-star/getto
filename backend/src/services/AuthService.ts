import jwt from 'jsonwebtoken'

export class AuthService {
  private readonly jwtSecret = process.env.JWT_SECRET || 'secret'
  private readonly jwtExpiry = process.env.JWT_EXPIRY || '7d'
  
  generateToken(userId: number, telegramId: number) {
    return jwt.sign(
      { userId, telegramId },
      this.jwtSecret,
      { expiresIn: this.jwtExpiry }
    )
  }
  
  verifyToken(token: string) {
    try {
      return jwt.verify(token, this.jwtSecret)
    } catch (error) {
      return null
    }
  }
}

export const authService = new AuthService()
