import { useState, useCallback } from 'react'
import cvData from '@/data/cv.json'
import cvFile from '@/assets/YunusEmreGunduzCv.pdf'
import { useLanguage } from '@/hooks/useLanguage'

const { personal } = cvData

function createInitialHistory() {
  return [
    { type: 'comment', key: 'greeting' },
    { type: 'comment', key: 'helpHint' },
  ]
}

export function useCommands({
  setHistory,
  setInput,
  setPopup,
  toggleTheme,
  setTheme,
  soundControls,
  chiptune,
}) {
  const { t, setLang } = useLanguage()
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
        setHistory(createInitialHistory())
        setInput('')
        return
      }

      const newLines = [{ type: 'input', text: cmd.trim() }]

      const commandMap = {
        help: () => [{ type: 'help' }],

        'ping yunusemregunduz': () => [{ type: 'fullPing' }],
        'ping yunusemre': () => [{ type: 'fullPing' }],
        'ping yunus': () => [{ type: 'fullPing' }],

        'show skills': () => {
          setPopup('skills')
          return [{ type: 'success', text: t.output.skillsOpening }]
        },
        'show experience': () => {
          setPopup('experience')
          return [{ type: 'success', text: t.output.experienceOpening }]
        },
        'show education': () => {
          setPopup('education')
          return [{ type: 'success', text: t.output.educationOpening }]
        },
        'show summary': () => {
          setPopup('summary')
          return [{ type: 'success', text: t.output.summaryOpening }]
        },
        'show certificates': () => {
          setPopup('certificates')
          return [{ type: 'success', text: t.output.certificatesOpening }]
        },
        'show references': () => {
          setPopup('references')
          return [{ type: 'success', text: t.output.referencesOpening }]
        },

        'open linkedin': () => {
          window.open(personal.linkedin, '_blank')
          return [{ type: 'success', text: t.output.linkedinRedirect }]
        },
        'open github': () => {
          window.open(personal.github, '_blank')
          return [{ type: 'success', text: t.output.githubRedirect }]
        },

        'show cv': () => {
          window.open(cvFile, '_blank')
          return [{ type: 'success', text: t.output.cvOpening }]
        },
        'download cv': () => {
          const link = document.createElement('a')
          link.href = cvFile
          link.download = 'YunusEmreGunduz_CV.pdf'
          link.click()
          return [{ type: 'success', text: t.output.cvDownloading }]
        },

        'copy email': () => {
          copyToClipboard(personal.email, 'email')
          return [{ type: 'success', text: t.output.emailCopied(personal.email) }]
        },
        'copy phone': () => {
          copyToClipboard(personal.phone, 'phone')
          return [{ type: 'success', text: t.output.phoneCopied(personal.phone) }]
        },

        'theme light': () => {
          setTheme('light')
          return [{ type: 'success', text: t.output.themeLight }]
        },
        'theme dark': () => {
          setTheme('dark')
          return [{ type: 'success', text: t.output.themeDark }]
        },
        'theme toggle': () => {
          toggleTheme()
          return [{ type: 'success', text: t.output.themeToggled }]
        },

        // ── New features ──

        neofetch: () => [{ type: 'neofetch' }],

        play: () => {
          setPopup('snake')
          return [{ type: 'success', text: '  🐍 Snake game başlatılıyor...' }]
        },

        timeline: () => [{ type: 'timeline' }],

        'sound toggle': () => {
          soundControls.toggle()
          const willBeOn = !soundControls.enabled
          return [{ type: 'success', text: willBeOn ? t.output.soundOn : t.output.soundOff }]
        },
        'sound on': () => {
          soundControls.setSound(true)
          return [{ type: 'success', text: t.output.soundOn }]
        },
        'sound off': () => {
          soundControls.setSound(false)
          return [{ type: 'success', text: t.output.soundOff }]
        },

        'lang tr': () => {
          setLang('tr')
          return [{ type: 'langSwitch', lang: 'tr' }]
        },
        'lang en': () => {
          setLang('en')
          return [{ type: 'langSwitch', lang: 'en' }]
        },

        'play song': () => {
          chiptune.play()
          return [{ type: 'success', text: t.output.songPlaying }]
        },
        'stop song': () => {
          chiptune.stop()
          return [{ type: 'success', text: t.output.songStopped }]
        },

        // ── Easter eggs ──

        'sudo hire me': () => [{ type: 'success', text: t.easterEggs.sudoHireMe }],
        'rm -rf boring-cv': () => [{ type: 'success', text: t.easterEggs.rmRf }],
        'cat hobbies': () => [{ type: 'success', text: t.easterEggs.catHobbies }],
      }

      const commandFn = commandMap[trimmed]

      if (commandFn) {
        const result = commandFn()
        if (result) newLines.push(...result)
      } else if (trimmed !== '') {
        newLines.push({
          type: 'error',
          text: t.commandNotFound(cmd.trim()),
        })
      }

      setHistory((prev) => [...prev, ...newLines])
      setInput('')
    },
    [
      setHistory,
      setInput,
      setPopup,
      copyToClipboard,
      toggleTheme,
      setTheme,
      soundControls,
      chiptune,
      t,
      setLang,
    ],
  )

  const initialHistory = createInitialHistory()

  return { copiedKey, copyToClipboard, processCommand, initialHistory }
}

export { createInitialHistory }
