import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTelegram } from '../hooks/useTelegram'
import { useUserStore } from '../store/userStore'
import { authApi } from '../api/auth'
import Button from '../components/Button'

const LoginPage = () => {
  const { tg, user } = useTelegram()
  const navigate = useNavigate()
  const { setUser, setToken } = useUserStore()

  useEffect(() => {
    if (!tg || !user) return

    const handleLogin = async () => {
      try {
        const response = await authApi.loginWithTelegram({
          user: {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            photo_url: user.photo_url,
          },
        })

        setToken(response.data.token)
        setUser(response.data.user)
        navigate('/')
      } catch (error) {
        console.error('Login error:', error)
      }
    }

    handleLogin()
  }, [tg, user, navigate, setUser, setToken])

  const handleManualLogin = async () => {
    try {
      // For testing without Telegram
      const mockUser = {
        id: Math.floor(Math.random() * 10000),
        first_name: 'Test',
        last_name: 'User',
        username: 'test_user',
      }

      const response = await authApi.loginWithTelegram({ user: mockUser })
      setToken(response.data.token)
      setUser(response.data.user)
      navigate('/')
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-600 to-purple-900 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">🎮</div>
        <h1 className="text-4xl font-bold mb-2">GETTO</h1>
        <p className="text-xl text-gray-200 mb-8">Карточная игра для Telegram</p>

        {tg ? (
          <p className="text-gray-300 mb-6">Авторизация через Telegram...</p>
        ) : (
          <Button
            onClick={handleManualLogin}
            variant="primary"
            size="lg"
            className="w-full mb-4"
          >
            Войти в игру
          </Button>
        )}

        <div className="mt-8 p-4 bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-400">
            💡 Совет: Откройте эту страницу в Telegram Mini App для полного функционала
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
