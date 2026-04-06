import { useRef, useEffect, useMemo, useImperativeHandle, forwardRef } from 'react'
import { useAutocomplete } from '@/hooks/useAutocomplete'
import { YEGDropdown } from '@/libs'
import * as S from '@/components/Autocomplete/styles'

function HighlightedText({ text, matchIndices }) {
  const matchSet = new Set(matchIndices)
  return (
    <>
      {text.split('').map((char, i) =>
        matchSet.has(i) ? (
          <S.Match key={i}>{char}</S.Match>
        ) : (
          <span key={i}>{char}</span>
        ),
      )}
    </>
  )
}

const Autocomplete = forwardRef(({ input, items, onComplete, onSelect, dropUp }, ref) => {
  const autocomplete = useAutocomplete(items)
  const suggestions = useMemo(() => autocomplete.getSuggestions(input), [input, autocomplete])
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (!dropdownRef.current || autocomplete.selectedIndex < 0) return
    const activeItem = dropdownRef.current.children[autocomplete.selectedIndex]
    if (activeItem) activeItem.scrollIntoView({ block: 'nearest' })
  }, [autocomplete.selectedIndex])

  useImperativeHandle(ref, () => ({
    handleKeyDown(e) {
      if (e.key === 'Tab' && suggestions.length > 0) {
        e.preventDefault()
        const tabIndex = autocomplete.selectedIndex >= 0 ? autocomplete.selectedIndex : 0
        onComplete(suggestions[tabIndex].item)
        autocomplete.reset()
        return true
      }

      if (e.key === 'Enter' && suggestions.length > 0 && autocomplete.active && autocomplete.selectedIndex >= 0) {
        e.preventDefault()
        onComplete(suggestions[autocomplete.selectedIndex].item)
        autocomplete.reset()
        return true
      }

      if (
        suggestions.length > 0 &&
        autocomplete.active &&
        (e.key === 'ArrowUp' || e.key === 'ArrowDown')
      ) {
        e.preventDefault()
        autocomplete.navigateSuggestion(e.key === 'ArrowUp' ? 'up' : 'down', suggestions.length)
        return true
      }

      if (e.key === 'Escape') {
        autocomplete.reset()
        return true
      }

      return false
    },
    activate() {
      autocomplete.activate()
    },
    reset() {
      autocomplete.reset()
    },
  }))

  if (!autocomplete.active || !suggestions.length) return null

  return (
    <YEGDropdown
      ref={dropdownRef}
      $align="left"
      $direction={dropUp ? 'up' : 'down'}
      style={{ width: 'max-content', minWidth: '200px', maxWidth: 'calc(100vw - 60px)', maxHeight: '180px' }}
    >
      {suggestions.map((suggestion, i) => (
        <S.ItemRow
          key={suggestion.item}
          $active={autocomplete.selectedIndex >= 0 && i === autocomplete.selectedIndex}
          onClick={(e) => {
            e.stopPropagation()
            onSelect(suggestion.item)
            autocomplete.reset()
          }}
        >
          <HighlightedText text={suggestion.item} matchIndices={suggestion.matchIndices} />
        </S.ItemRow>
      ))}
    </YEGDropdown>
  )
})

Autocomplete.displayName = 'Autocomplete'

export default Autocomplete
