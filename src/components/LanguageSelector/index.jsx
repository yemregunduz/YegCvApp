import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { YEGButton, YEGDropdown, YEGDropdownItem } from '@/libs'
import * as S from '@/components/LanguageSelector/styles'

function LanguageSelector() {
  const { lang, setLang, availableLanguages, langLabels } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const current = langLabels[lang]

  return (
    <S.Wrapper ref={ref}>
      <YEGButton $variant="icon" onClick={() => setOpen((p) => !p)} title="Language">
        <S.Flag>{current?.flag}</S.Flag>
      </YEGButton>

      {open && (
        <YEGDropdown>
          {availableLanguages.map((code) => (
            <YEGDropdownItem
              key={code}
              $active={code === lang}
              onClick={() => {
                setLang(code)
                setOpen(false)
              }}
            >
              <S.Flag>{langLabels[code]?.flag}</S.Flag>
              {langLabels[code]?.label}
            </YEGDropdownItem>
          ))}
        </YEGDropdown>
      )}
    </S.Wrapper>
  )
}

export default LanguageSelector
