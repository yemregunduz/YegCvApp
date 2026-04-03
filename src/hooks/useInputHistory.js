import { useState, useRef, useCallback } from 'react'

export function useInputHistory() {
  const [historyIndex, setHistoryIndex] = useState(-1)
  const commandHistory = useRef([])

  const push = useCallback((cmd) => {
    if (cmd.trim()) {
      commandHistory.current = [cmd, ...commandHistory.current.filter((c) => c !== cmd)]
    }
    setHistoryIndex(-1)
  }, [])

  const navigate = useCallback(
    (direction, currentInput, setInput) => {
      const list = commandHistory.current
      if (list.length === 0) return

      if (direction === 'up') {
        const nextIndex = Math.min(historyIndex + 1, list.length - 1)
        setHistoryIndex(nextIndex)
        setInput(list[nextIndex])
      } else {
        if (historyIndex <= 0) {
          setHistoryIndex(-1)
          setInput('')
        } else {
          const nextIndex = historyIndex - 1
          setHistoryIndex(nextIndex)
          setInput(list[nextIndex])
        }
      }
    },
    [historyIndex],
  )

  return { push, navigate }
}
