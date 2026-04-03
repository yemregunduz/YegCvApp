import { useState, useCallback } from 'react'

export function useAutocomplete(items = [], options = { includeExact: true}) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [active, setActive] = useState(false)

const getSuggestions = useCallback(
  (input) => {
    const trimmed = input.trim().toLowerCase()
    if (!trimmed) return []

    return items.filter((item) => {
      const lower = item.toLowerCase()
      if (!lower.startsWith(trimmed)) return false

      if (!options.includeExact && lower === trimmed) return false

      return true
    })
  },
  [items, options.includeExact],
)

  const reset = useCallback(() => {
    setSelectedIndex(0)
    setActive(false)
  }, [])

  const activate = useCallback(() => {
    setSelectedIndex(0)
    setActive(true)
  }, [])

  const navigateSuggestion = useCallback((direction, suggestionsLength) => {
    if (suggestionsLength === 0) return
    setSelectedIndex((prev) => {
      if (direction === 'up') return prev <= 0 ? suggestionsLength - 1 : prev - 1
      return prev >= suggestionsLength - 1 ? 0 : prev + 1
    })
  }, [])

  return { selectedIndex, active, getSuggestions, reset, activate, navigateSuggestion }
}
