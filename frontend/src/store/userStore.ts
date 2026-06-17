import create from 'zustand'

interface User {
  id: number
  telegramId: number
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
  createdAt: string
}

interface UserState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setUser: (user: User) => void
  setToken: (token: string) => void
  logout: () => void
  updateUser: (updates: Partial<User>) => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  
  setUser: (user) => set({ user }),
  
  setToken: (token) => {
    localStorage.setItem('token', token)
    set({ token, isAuthenticated: true })
  },
  
  logout: () => {
    localStorage.removeItem('token')
    set({ user: null, token: null, isAuthenticated: false })
  },
  
  updateUser: (updates) => set((state) => ({
    user: state.user ? { ...state.user, ...updates } : null,
  })),
}))
