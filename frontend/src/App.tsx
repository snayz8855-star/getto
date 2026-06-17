import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useUserStore } from './store/userStore'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import GamePage from './pages/GamePage'
import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
import RoomPage from './pages/RoomPage'
import Navigation from './components/Navigation'

function App() {
  const { isAuthenticated } = useUserStore()

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/game" element={<GamePage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/room/:roomId" element={<RoomPage />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
        {isAuthenticated && <Navigation />}
      </div>
    </Router>
  )
}

export default App
