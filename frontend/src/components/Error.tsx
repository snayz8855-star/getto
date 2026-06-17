interface ErrorProps {
  message: string
  onRetry?: () => void
}

const Error = ({ message, onRetry }: ErrorProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-center">
        <div className="text-6xl mb-4">❌</div>
        <p className="text-white text-lg mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            Попробовать снова
          </button>
        )}
      </div>
    </div>
  )
}

export default Error
