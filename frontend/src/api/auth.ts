import client from './client'

export interface LoginResponse {
  token: string
  user: {
    id: number
    telegramId: number
    username: string
    firstName: string
    lastName: string
  }
}

export const authApi = {
  loginWithTelegram: (telegramData: any) => {
    return client.post<LoginResponse>('/auth/telegram', { telegramData })
  },

  refresh: () => {
    return client.post<LoginResponse>('/auth/refresh')
  },

  logout: () => {
    return client.post('/auth/logout')
  },
}
