import { useCallback, useState } from 'react'
import { MessageContext } from './MessageContext'

export function MessageProvider({ children }) {
  const [message, setMessage] = useState(null)

  const showMessage = useCallback((type, text) => {
    setMessage({ type, text, id: Date.now() })
  }, [])

  const clearMessage = useCallback(() => setMessage(null), [])

  return (
    <MessageContext.Provider value={{ message, showMessage, clearMessage }}>
      {children}
    </MessageContext.Provider>
  )
}
