import { createContext, useContext, useState, useCallback, useMemo, createElement } from 'react'
import { darkTheme, lightTheme } from '@/styles/theme'

const ThemeContext = createContext()

const STORAGE_KEY = 'yeg-cv-theme'

function getInitialMode() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'light' || saved === 'dark') return saved
  return 'dark'
}

export function ThemeContextProvider({ children }) {
  const [mode, setMode] = useState(getInitialMode)

  const toggleTheme = useCallback(() => {
    setMode((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      localStorage.setItem(STORAGE_KEY, next)
      return next
    })
  }, [])

  const setTheme = useCallback((newMode) => {
    if (newMode === 'dark' || newMode === 'light') {
      setMode(newMode)
      localStorage.setItem(STORAGE_KEY, newMode)
    }
  }, [])

  const theme = mode === 'dark' ? darkTheme : lightTheme

  const value = useMemo(
    () => ({ mode, theme, toggleTheme, setTheme }),
    [mode, theme, toggleTheme, setTheme],
  )

  return createElement(ThemeContext.Provider, { value }, children)
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeContextProvider')
  return context
}
