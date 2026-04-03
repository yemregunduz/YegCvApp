import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { locales, availableLanguages, LANG_LABELS } from '@/data/locales'

const LanguageContext = createContext()

const STORAGE_KEY = 'yeg-cv-lang'

function getInitialLang() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (availableLanguages.includes(saved)) return saved
  const browserLang = navigator.language?.slice(0, 2)
  return availableLanguages.includes(browserLang) ? browserLang : availableLanguages[0]
}

// Convert "{placeholder}" patterns in JSON strings to template functions
function tpl(str) {
  return (values) =>
    str.replace(/\{(\w+)\}/g, (_, key) => (values[key] !== undefined ? values[key] : `{${key}}`))
}

function hydrateLocale(raw) {
  return {
    ...raw,
    commandNotFound: (cmd) => tpl(raw.commandNotFound)({ cmd }),
    output: {
      ...raw.output,
      emailCopied: (email) => tpl(raw.output.emailCopied)({ email }),
      phoneCopied: (phone) => tpl(raw.output.phoneCopied)({ phone }),
      langSwitched: (lang) =>
        tpl(raw.output.langSwitched)({ lang: LANG_LABELS[lang]?.label || lang }),
    },
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang)

  const setLang = useCallback((newLang) => {
    if (availableLanguages.includes(newLang)) {
      setLangState(newLang)
      localStorage.setItem(STORAGE_KEY, newLang)
    }
  }, [])

  const t = useMemo(() => hydrateLocale(locales[lang]), [lang])

  const value = useMemo(
    () => ({ lang, setLang, t, availableLanguages, langLabels: LANG_LABELS }),
    [lang, setLang, t],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
