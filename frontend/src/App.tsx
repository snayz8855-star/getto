import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import GamePage from './pages/GamePage'
import ChatPage from './pages/ChatPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Router>
  )
}

export default App
