// Dynamically import all locale JSON files in this directory
const modules = import.meta.glob('./*.json', { eager: true })

const LANG_LABELS = {}

const locales = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => {
    const key = path.replace('./', '').replace('.json', '')
    LANG_LABELS[key] = mod.default.meta
    return [key, mod.default]
  }),
)

const availableLanguages = Object.keys(locales)

export { locales, availableLanguages, LANG_LABELS }
