import { createContext, useContext, useState, useCallback, useRef, useMemo } from 'react'

const SoundContext = createContext()

const STORAGE_KEY = 'yeg-cv-sound'

function getInitialEnabled() {
  return localStorage.getItem(STORAGE_KEY) === 'true'
}

export function SoundProvider({ children }) {
  const [enabled, setEnabled] = useState(getInitialEnabled)
  const audioCtxRef = useRef(null)

  const getAudioCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    return audioCtxRef.current
  }, [])

  const playClick = useCallback(() => {
    if (!enabled) return
    try {
      const ctx = getAudioCtx()
      const oscillator = ctx.createOscillator()
      const gain = ctx.createGain()

      oscillator.type = 'square'
      oscillator.frequency.setValueAtTime(1700 + Math.random() * 10, ctx.currentTime)
      gain.gain.setValueAtTime(0.03, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)

      oscillator.connect(gain)
      gain.connect(ctx.destination)
      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + 0.05)
    } catch {
    }
  }, [enabled, getAudioCtx])

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev
      localStorage.setItem(STORAGE_KEY, String(next))
      return next
    })
  }, [])

  const setSound = useCallback((on) => {
    setEnabled(on)
    localStorage.setItem(STORAGE_KEY, String(on))
  }, [])

  const value = useMemo(
    () => ({ enabled, playClick, toggle, setSound }),
    [enabled, playClick, toggle, setSound],
  )

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}

export function useKeyboardSound() {
  const context = useContext(SoundContext)
  if (!context) throw new Error('useKeyboardSound must be used within SoundProvider')
  return context
}
