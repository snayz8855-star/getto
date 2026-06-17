import { useEffect, useState } from 'react'
import { useUserStore } from '../store/userStore'
import { usersApi } from '../api/users'
import Card from '../components/Card'
import Button from '../components/Button'
import Loading from '../components/Loading'
import Error from '../components/Error'

const ProfilePage = () => {
  const { user, updateUser } = useUserStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [username, setUsername] = useState(user?.username || '')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        const response = await usersApi.getProfile()
        updateUser(response.data)
      } catch (err) {
        setError('Ошибка загрузки профиля')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleSaveProfile = async () => {
    try {
      setLoading(true)
      const response = await usersApi.updateProfile({ username })
      updateUser(response.data)
      setIsEditing(false)
    } catch (err) {
      setError('Ошибка сохранения профиля')
    } finally {
      setLoading(false)
    }
  }

  if (loading && !user) return <Loading />
  if (error && !user) return <Error message={error} />
  if (!user) return <Error message="Профиль не найден" />

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-3xl font-bold mb-6">👤 Профиль</h1>

      <Card className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-3xl">
            🎮
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user.username}</h2>
            <p className="text-gray-400">Уровень {user.level} • ELO: {user.eloRating}</p>
          </div>
        </div>
      </Card>

      {isEditing ? (
        <Card className="mb-6">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Имя пользователя"
          />
          <div className="flex gap-2">
            <Button
              onClick={handleSaveProfile}
              variant="success"
              size="md"
              loading={loading}
              className="flex-1"
            >
              Сохранить
            </Button>
            <Button
              onClick={() => setIsEditing(false)}
              variant="danger"
              size="md"
              className="flex-1"
            >
              Отмена
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="mb-6">
          <Button
            onClick={() => setIsEditing(true)}
            variant="secondary"
            size="md"
            className="w-full"
          >
            Редактировать профиль
          </Button>
        </Card>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Card className="text-center">
          <p className="text-gray-400 mb-2">Побед</p>
          <p className="text-3xl font-bold text-green-400">{user.totalWins}</p>
        </Card>
        <Card className="text-center">
          <p className="text-gray-400 mb-2">Проигрышей</p>
          <p className="text-3xl font-bold text-red-400">{user.totalLosses}</p>
        </Card>
        <Card className="text-center">
          <p className="text-gray-400 mb-2">Монеты</p>
          <p className="text-3xl font-bold text-yellow-400">{user.coins}</p>
        </Card>
        <Card className="text-center">
          <p className="text-gray-400 mb-2">Опыт</p>
          <p className="text-3xl font-bold text-blue-400">{user.experience}</p>
        </Card>
      </div>
    </div>
  )
}

export default ProfilePage
