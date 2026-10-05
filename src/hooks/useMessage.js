import { useContext } from 'react'
import { MessageContext } from '../context/MessageContext'

export function useMessage() {
  const ctx = useContext(MessageContext)
  if (!ctx) throw new Error('useMessage must be used within a MessageProvider')
  return ctx
}
