import { useRef, useEffect, useMemo, useImperativeHandle, forwardRef } from 'react'
import { useAutocomplete } from '@/hooks/useAutocomplete'
import * as S from '@/components/Autocomplete/styles'

const Autocomplete = forwardRef(({ input, items, onComplete, onSelect, dropUp }, ref) => {
  const autocomplete = useAutocomplete(items)
  const suggestions = useMemo(() => autocomplete.getSuggestions(input), [input, autocomplete])
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (!dropdownRef.current) return
    const activeItem = dropdownRef.current.children[autocomplete.selectedIndex]
    if (activeItem) activeItem.scrollIntoView({ block: 'nearest' })
  }, [autocomplete.selectedIndex])

  useImperativeHandle(ref, () => ({
    handleKeyDown(e) {
      if (e.key === 'Tab' && suggestions.length > 0) {
        e.preventDefault()
        onComplete(suggestions[autocomplete.active ? autocomplete.selectedIndex : 0])
        autocomplete.reset()
        return true
      }

      if (e.key === 'Enter' && suggestions.length > 0 && autocomplete.active) {
        e.preventDefault()
        onComplete(suggestions[autocomplete.selectedIndex])
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
    <S.Dropdown ref={dropdownRef} $dropUp={dropUp}>
      {suggestions.map((cmd, i) => (
        <S.Item
          key={cmd}
          $active={i === autocomplete.selectedIndex}
          onClick={(e) => {
            e.stopPropagation()
            onSelect(cmd)
            autocomplete.reset()
          }}
        >
          {cmd}
        </S.Item>
      ))}
    </S.Dropdown>
  )
})

Autocomplete.displayName = 'Autocomplete'

export default Autocomplete
