import {
  SkillsContent,
  ExperienceContent,
  EducationContent,
  SummaryContent,
  CertificatesContent,
  ReferencesContent,
} from '@/components/contents'
import SnakeGame from '@/components/SnakeGame'

export const POPUP_CONFIG = {
  skills: {
    title: 'YETENEKLER',
    Content: SkillsContent,
  },
  experience: {
    title: 'İŞ DENEYİMİ',
    Content: ExperienceContent,
  },
  education: {
    title: 'EĞİTİM',
    Content: EducationContent,
  },
  summary: {
    title: 'ÖZET',
    Content: SummaryContent,
    noPadding: true,
    noHeaderBorder: true,
  },
  certificates: {
    title: 'SERTİFİKALAR',
    Content: CertificatesContent,
  },
  references: {
    title: 'REFERANSLAR',
    Content: ReferencesContent,
  },
  snake: {
    title: 'SNAKE GAME 🐍',
    Content: SnakeGame,
    noPadding: true,
  },
}

export const SHUTDOWN_LINES = [
  { text: '> Saving session...', delay: 0 },
  { text: '> Closing connections...', delay: 400 },
  { text: '> Stopping processes...', delay: 800 },
  { text: '> Shutdown complete.', delay: 1200 },
]

export const BOOT_LINES = [
  { text: '> Booting system...', delay: 0 },
  { text: '> Loading modules...', delay: 300 },
  { text: '> Initializing terminal...', delay: 600 },
  { text: '> System ready.', delay: 900 },
]
