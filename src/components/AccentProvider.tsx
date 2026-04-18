'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

const THEMES = [
  '#9affe1', '#abff9a', '#ff9a9a', '#f5ff9a',
  '#9aadff', '#ffd280', '#adff6b', '#6bfaff',
  '#55F7DD', '#7BF774', '#F770F4', '#E2F780',
]

interface AccentContextType {
  accent: string
  nextAccent: () => void
}

const AccentContext = createContext<AccentContextType>({
  accent: THEMES[0],
  nextAccent: () => {},
})

export function AccentProvider({ children }: { children: React.ReactNode }) {
  const [index, setIndex] = useState(0)
  const accent = THEMES[index]

  const nextAccent = useCallback(() => {
    setIndex(prev => (prev + 1) % THEMES.length)
  }, [])

  // Apply to CSS variable
  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accent)
  }, [accent])

  // Auto-cycle every 15s
  useEffect(() => {
    const id = setInterval(nextAccent, 15000)
    return () => clearInterval(id)
  }, [nextAccent])

  // Cycle on scroll (throttled)
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
