import {
  SkillsContent,
  ExperienceContent,
  EducationContent,
  SummaryContent,
  CertificatesContent,
  ReferencesContent,
} from '@/components/contents'
import SnakeGame from '@/components/SnakeGame'

export function getPopupConfig(t) {
  return {
    skills: {
      title: t.popup.skills,
      Content: SkillsContent,
    },
    experience: {
      title: t.popup.experience,
      Content: ExperienceContent,
    },
    education: {
      title: t.popup.education,
      Content: EducationContent,
    },
    summary: {
      title: t.popup.summary,
      Content: SummaryContent,
      noPadding: true,
      noHeaderBorder: true,
    },
    certificates: {
      title: t.popup.certificates,
      Content: CertificatesContent,
    },
    references: {
      title: t.popup.references,
      Content: ReferencesContent,
    },
    snake: {
      title: t.popup.snake,
      Content: SnakeGame,
      noPadding: true,
    },
  }
}

export function getShutdownLines(t) {
  return [
    { text: t.shutdown.saving, delay: 0 },
    { text: t.shutdown.closing, delay: 400 },
    { text: t.shutdown.stopping, delay: 800 },
    { text: t.shutdown.complete, delay: 1200 },
  ]
}

export function getBootLines(t) {
  return [
    { text: t.shutdown.booting, delay: 0 },
    { text: t.shutdown.loading, delay: 300 },
    { text: t.shutdown.initializing, delay: 600 },
    { text: t.shutdown.ready, delay: 900 },
  ]
}
