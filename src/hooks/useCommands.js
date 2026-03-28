import { useState, useCallback } from 'react'
import cvData from '@/data/cv.json'
import cvFile from '@/assets/YunusEmreGunduzCv.pdf'

const { terminal, personal } = cvData

const INITIAL_HISTORY = [
  {
    type: 'comment',
    text: `// ${terminal.greeting}`,
  },
  {
    type: 'comment',
    text: '// "help" yazarak komutları görebilirsiniz.',
  },
]

export function useCommands({ setHistory, setInput, setPopup, toggleTheme, setTheme }) {
  const [copiedKey, setCopiedKey] = useState(null)

  const copyToClipboard = useCallback((text, key) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }, [])

  const processCommand = useCallback(
    (cmd) => {
      const trimmed = cmd.trim().toLowerCase()

      if (trimmed === 'clear' || trimmed === 'cls') {
        setHistory(INITIAL_HISTORY)
        setInput('')
        return
      }

      const newLines = [
        {
          type: 'input',
          text: cmd.trim(),
        },
      ]

      const commandMap = {
        help: () => [
          {
            type: 'help',
          },
        ],

        'ping yunusemregunduz': () => [
          {
            type: 'fullPing',
          },
        ],
        'ping yunusemre': () => [
          {
            type: 'fullPing',
          },
        ],
        'ping yunus': () => [
          {
            type: 'fullPing',
          },
        ],

        'show skills': () => {
          setPopup('skills')
          return [
            {
              type: 'success',
              text: '  Yetenekler açılıyor...',
            },
          ]
        },
        'show experience': () => {
          setPopup('experience')
          return [
            {
              type: 'success',
              text: '  İş deneyimi açılıyor...',
            },
          ]
        },
        'show education': () => {
          setPopup('education')
          return [
            {
              type: 'success',
              text: '  Eğitim bilgileri açılıyor...',
            },
          ]
        },
        'show summary': () => {
          setPopup('summary')
          return [
            {
              type: 'success',
              text: '  Özet bilgileri açılıyor...',
            },
          ]
        },
        'show certificates': () => {
          setPopup('certificates')
          return [
            {
              type: 'success',
              text: '  Sertifikalar açılıyor...',
            },
          ]
        },
        'show references': () => {
          setPopup('references')
          return [
            {
              type: 'success',
              text: '  Referanslar açılıyor...',
            },
          ]
        },

        'open linkedin': () => {
          window.open(personal.linkedin, '_blank')
          return [
            {
              type: 'success',
              text: '  Yönlendiriliyor... linkedin',
            },
          ]
        },
        'open github': () => {
          window.open(personal.github, '_blank')
          return [
            {
              type: 'success',
              text: '  Yönlendiriliyor... github',
            },
          ]
        },

        'show cv': () => {
          window.open(cvFile, '_blank')
          return [
            {
              type: 'success',
              text: '  CV açılıyor...',
            },
          ]
        },
        'download cv': () => {
          const link = document.createElement('a')
          link.href = cvFile
          link.download = 'YunusEmreGunduz_CV.pdf'
          link.click()
          return [
            {
              type: 'success',
              text: '  CV indiriliyor...',
            },
          ]
        },

        'copy email': () => {
          copyToClipboard(personal.email, 'email')
          return [
            {
              type: 'success',
              text: `  "${personal.email}" panoya kopyalandı.`,
            },
          ]
        },
        'copy phone': () => {
          copyToClipboard(personal.phone, 'phone')
          return [
            {
              type: 'success',
              text: `  "${personal.phone}" panoya kopyalandı.`,
            },
          ]
        },

        'theme light': () => {
          setTheme('light')
          return [
            {
              type: 'success',
              text: '  Açık tema uygulandı.',
            },
          ]
        },
        'theme dark': () => {
          setTheme('dark')
          return [
            {
              type: 'success',
              text: '  Koyu tema uygulandı.',
            },
          ]
        },
        'theme toggle': () => {
          toggleTheme()
          return [
            {
              type: 'success',
              text: '  Tema değiştirildi.',
            },
          ]
        },
      }

      const commandFn = commandMap[trimmed]

      if (commandFn) {
        const result = commandFn()
        if (result) newLines.push(...result)
      } else if (trimmed !== '') {
        newLines.push({
          type: 'error',
          text: `  bash: ${cmd.trim()}: komut bulunamadı. "help" yazarak komutları görebilirsiniz.`,
        })
      }

      setHistory((prev) => [...prev, ...newLines])
      setInput('')
    },
    [setHistory, setInput, setPopup, copyToClipboard, toggleTheme, setTheme],
  )

  return {
    copiedKey,
    copyToClipboard,
    processCommand,
  }
}

export { INITIAL_HISTORY }
