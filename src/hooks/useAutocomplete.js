import { useState, useCallback } from 'react'

function fuzzyMatch(item, query) {
  const lower = item.toLowerCase()
  let qi = 0
  let score = 0
  let lastMatchIndex = -1
  const matchIndices = []

  for (let i = 0; i < lower.length && qi < query.length; i++) {
    if (lower[i] === query[qi]) {
      score += 1
      if (lastMatchIndex === i - 1) score += 2
      if (i === 0 || lower[i - 1] === ' ') score += 3
      lastMatchIndex = i
      matchIndices.push(i)
      qi++
    }
  }

  return qi === query.length ? { score, matchIndices } : null
}

export function useAutocomplete(
  items = [],
  options = { includeExact: true } // 👈 default davranış
) {
  const { includeExact } = options

  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [active, setActive] = useState(false)

  const getSuggestions = useCallback(
    (input) => {
      const trimmed = input.trim().toLowerCase()
      if (!trimmed) return []

      return items
        .map((item) => {
          const lowerItem = item.toLowerCase()
          const result = fuzzyMatch(item, trimmed)

          if (!result) return null

          // 👇 exact match kontrolü artık opsiyonel
          if (!includeExact && lowerItem === trimmed) return null

          let score = result.score

          // 👇 includeExact açıksa boost verelim (UX için güzel)
          if (includeExact && lowerItem === trimmed) {
            score += 1000
          }

          return { item, score, matchIndices: result.matchIndices }
        })
        .filter(Boolean)
        .sort((a, b) => b.score - a.score)
    },
    [items, includeExact]
  )

  const reset = useCallback(() => {
    setSelectedIndex(-1)
    setActive(false)
  }, [])

  const activate = useCallback(() => {
    setSelectedIndex(-1)
    setActive(true)
  }, [])

  const navigateSuggestion = useCallback((direction, suggestionsLength) => {
    if (suggestionsLength === 0) return
    setSelectedIndex((prev) => {
      if (direction === 'up') return prev <= 0 ? suggestionsLength - 1 : prev - 1
      return prev >= suggestionsLength - 1 ? 0 : prev + 1
    })
  }, [])

  return {
    selectedIndex,
    active,
    getSuggestions,
    reset,
    activate,
    navigateSuggestion,
  }
}