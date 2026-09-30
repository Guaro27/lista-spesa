import { useEffect, useState } from 'react'

export default function AppUpdate() {
  const [available, setAvailable] = useState(false)

  useEffect(() => {
    if (!import.meta.env.PROD) return
    let disposed = false
    let checking = false
    const controller = new AbortController()
    async function check() {
      if (document.visibilityState !== 'visible' || checking) return
      checking = true
      try {
        const response = await fetch('/version.json', {
          cache: 'no-store',
          signal: controller.signal,
        })
        if (!response.ok) return
        const version = await response.json()
        if (!disposed && typeof version.version === 'string' &&
            version.version !== import.meta.env.APP_VERSION) {
          setAvailable(true)
        }
      } catch {
        // Keep the current list usable when the connection is unavailable.
      } finally {
        checking = false
      }
    }
    check()
    document.addEventListener('visibilitychange', check)
    window.addEventListener('pageshow', check)
    window.addEventListener('online', check)
    const timer = window.setInterval(check, 60000)
    return () => {
      disposed = true
      controller.abort()
      window.clearInterval(timer)
      document.removeEventListener('visibilitychange', check)
      window.removeEventListener('pageshow', check)
      window.removeEventListener('online', check)
    }
  }, [])

  if (!available) return null
  return (
    <aside className="aggiornamento" aria-label="Aggiornamento disponibile">
      <p role="status">È pronta una nuova versione. La tua lista resta salvata.</p>
      <button type="button" onClick={() => window.location.reload()}>
        Aggiorna app
      </button>
    </aside>
  )
}
