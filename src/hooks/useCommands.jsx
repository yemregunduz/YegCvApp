import { useCallback } from 'react'
import cvData from '@/data/cv.json'
import cvFile from '@/assets/YunusEmreGunduzCv.pdf'
import { useLanguage } from '@/hooks/useLanguage'
import { useModal } from '@/libs'
import {
  SkillsContent,
  ExperienceContent,
  EducationContent,
  SummaryContent,
  CertificatesContent,
  ReferencesContent,
} from '@/components/contents'
import SnakeGame from '@/components/SnakeGame'

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
  toggleTheme,
  setTheme,
  soundControls,
  chiptune,
}) {
  const { t, setLang } = useLanguage()
  const modal = useModal()

  const showPopup = useCallback(
    (title, Content, options = {}) => {
      modal.show({
        title,
        content: <Content />,
        ...options,
      })
    },
    [modal],
  )

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
          showPopup(t.popup.skills, SkillsContent)
          return [{ type: 'success', text: t.output.skillsOpening }]
        },
        'show experience': () => {
          showPopup(t.popup.experience, ExperienceContent)
          return [{ type: 'success', text: t.output.experienceOpening }]
        },
        'show education': () => {
          showPopup(t.popup.education, EducationContent)
          return [{ type: 'success', text: t.output.educationOpening }]
        },
        'show summary': () => {
          showPopup(t.popup.summary, SummaryContent, { noPadding: true, noHeaderBorder: true })
          return [{ type: 'success', text: t.output.summaryOpening }]
        },
        'show certificates': () => {
          showPopup(t.popup.certificates, CertificatesContent)
          return [{ type: 'success', text: t.output.certificatesOpening }]
        },
        'show references': () => {
          showPopup(t.popup.references, ReferencesContent)
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
          navigator.clipboard.writeText(personal.email)
          return [{ type: 'success', text: t.output.emailCopied(personal.email) }]
        },
        'copy phone': () => {
          navigator.clipboard.writeText(personal.phone)
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

        neofetch: () => [{ type: 'neofetch' }],

        play: () => {
          showPopup(t.popup.snake, SnakeGame, { noPadding: true })
          return [{ type: 'success', text: t.output.playStarting }]
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
    [setHistory, setInput, toggleTheme, setTheme, soundControls, chiptune, t, setLang, showPopup],
  )

  const initialHistory = createInitialHistory()

  return { processCommand, initialHistory }
}

export { createInitialHistory }
