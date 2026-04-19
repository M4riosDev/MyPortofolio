'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useTheme } from './ThemeProvider'

const DARK_ACCENTS = [
  '#9affe1', '#abff9a', '#ff9a9a', '#f5ff9a',
  '#9aadff', '#ffd280', '#adff6b', '#6bfaff',
  '#55F7DD', '#7BF774', '#F770F4', '#E2F780',
]

const LIGHT_ACCENTS = [
  '#0ea5a4', '#2f855a', '#c2410c', '#2563eb',
  '#dc2626', '#0f766e', '#1d4ed8', '#6d28d9',
  '#b45309', '#be185d', '#047857', '#334155',
]

interface AccentContextType {
  accent: string
  nextAccent: () => void
}

const AccentContext = createContext<AccentContextType>({
  accent: DARK_ACCENTS[0],
  nextAccent: () => {},
})

export function AccentProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()
  const [index, setIndex] = useState(0)
  const accentPool = theme === 'light' ? LIGHT_ACCENTS : DARK_ACCENTS
  const accent = accentPool[index % accentPool.length]

  const nextAccent = useCallback(() => {
    setIndex(prev => (prev + 1) % accentPool.length)
  }, [accentPool.length])

  useEffect(() => {
    setIndex(prev => prev % accentPool.length)
  }, [accentPool.length])

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accent)
  }, [accent])

  useEffect(() => {
    const id = setInterval(nextAccent, 15000)
    return () => clearInterval(id)
  }, [nextAccent])

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null
    const onScroll = () => {
      if (timeout) return
      nextAccent()
      timeout = setTimeout(() => { timeout = null }, 5000)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [nextAccent])

  return (
    <AccentContext.Provider value={{ accent, nextAccent }}>
      {children}
    </AccentContext.Provider>
  )
}

export const useAccent = () => useContext(AccentContext)
