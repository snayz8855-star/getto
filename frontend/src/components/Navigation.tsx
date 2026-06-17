import { Link, useLocation } from 'react-router-dom'

const Navigation = () => {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-indigo-700' : ''
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700">
      <div className="flex justify-around">
        <Link to="/" className={`flex-1 py-3 text-center transition ${isActive('/')}`}>
          🏠
        </Link>
        <Link to="/game" className={`flex-1 py-3 text-center transition ${isActive('/game')}`}>
          🎮
        </Link>
        <Link to="/chat" className={`flex-1 py-3 text-center transition ${isActive('/chat')}`}>
          💬
        </Link>
        <Link to="/profile" className={`flex-1 py-3 text-center transition ${isActive('/profile')}`}>
          👤
        </Link>
      </div>
    </nav>
  )
}

export default Navigation
