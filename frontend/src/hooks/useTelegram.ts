import { useEffect, useState } from 'react'

declare global {
  interface Window {
    Telegram: any
  }
}

export const useTelegram = () => {
  const [tg, setTg] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const telegram = window.Telegram?.WebApp
    if (telegram) {
      telegram.ready()
      setTg(telegram)
      setUser(telegram.initDataUnsafe?.user)
    }
    setLoading(false)
  }, [])

  return { tg, user, isTelegram: !!tg, loading }
}
