import client from './client'

export interface UserProfile {
  id: number
  username: string
  firstName: string
  lastName: string
  photoUrl: string
  level: number
  experience: number
  coins: number
  gems: number
  eloRating: number
  totalWins: number
  totalLosses: number
}

export const usersApi = {
  getProfile: () => {
    return client.get<UserProfile>('/users/profile')
  },

  updateProfile: (data: Partial<UserProfile>) => {
    return client.put<UserProfile>('/users/profile', data)
  },

  getUser: (userId: number) => {
    return client.get<UserProfile>(`/users/${userId}`)
  },

  getLeaderboard: (limit: number = 100) => {
    return client.get<UserProfile[]>(`/users/leaderboard?limit=${limit}`)
  },
}
