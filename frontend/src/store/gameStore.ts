import create from 'zustand'

interface Player {
  id: number
  username: string
  level: number
  eloRating: number
}

interface GameState {
  currentRoom: any | null
  players: Player[]
  isPlaying: boolean
  myCards: any[]
  setCurrentRoom: (room: any) => void
  setPlayers: (players: Player[]) => void
  setIsPlaying: (playing: boolean) => void
  setMyCards: (cards: any[]) => void
  clearGame: () => void
}

export const useGameStore = create<GameState>((set) => ({
  currentRoom: null,
  players: [],
  isPlaying: false,
  myCards: [],
  
  setCurrentRoom: (room) => set({ currentRoom: room }),
  setPlayers: (players) => set({ players }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setMyCards: (cards) => set({ myCards: cards }),
  
  clearGame: () => set({
    currentRoom: null,
    players: [],
    isPlaying: false,
    myCards: [],
  }),
}))
