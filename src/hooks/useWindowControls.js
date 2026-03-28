import { useState, useCallback } from 'react'
import { INITIAL_HISTORY } from '@/hooks/useCommands'
import { SHUTDOWN_LINES, BOOT_LINES } from '@/components/Terminal/constants'

export function useWindowControls({ setHistory, setInput }) {
  const [isMinimized, setIsMinimized] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [shutdown, setShutdown] = useState(null)
  const [shutdownLines, setShutdownLines] = useState([])

  const runSequence = useCallback((lines, onLineAdd, onComplete) => {
    setShutdownLines([])
    lines.forEach(({ text, delay }) => {
      setTimeout(() => onLineAdd(text), delay)
    })
    setTimeout(onComplete, lines[lines.length - 1].delay + 800)
  }, [])

  const handleClose = useCallback(() => {
    if (shutdown) return
    setShutdown('shutting-down')

    runSequence(
      SHUTDOWN_LINES,
      (text) => setShutdownLines((prev) => [...prev, text]),
      () => {
        setShutdown('off')
        setShutdownLines([])

        setTimeout(() => {
          setShutdown('booting')
          runSequence(
            BOOT_LINES,
            (text) => setShutdownLines((prev) => [...prev, text]),
            () => {
              setShutdown(null)
              setHistory(INITIAL_HISTORY)
              setInput('')
            },
          )
        }, 1500)
      },
    )
  }, [shutdown, runSequence, setHistory, setInput])

  const handleMinimize = useCallback(() => {
    if (shutdown) return
    setIsMinimized((prev) => !prev)
  }, [shutdown])

  const handleFullscreen = useCallback(() => {
    if (shutdown) return
    setIsFullscreen((prev) => !prev)
    setIsMinimized(false)
  }, [shutdown])

  return {
    isMinimized,
    isFullscreen,
    shutdown,
    shutdownLines,
    handleClose,
    handleMinimize,
    handleFullscreen,
  }
}
