import { useState, useRef, useEffect, Fragment } from 'react'
import cvData from '@/data/cv.json'
import { useTypingEffect } from '@/hooks/useTypingEffect'
import { useCommands, INITIAL_HISTORY } from '@/hooks/useCommands'
import { useTheme } from '@/hooks/useTheme'
import Modal from '@/components/Modal'
import PingOutput from '@/components/Terminal/PingOutput'
import {
  SkillsContent,
  ExperienceContent,
  EducationContent,
  SummaryContent,
  CertificatesContent,
  ReferencesContent,
} from '@/components/contents'
import * as S from '@/components/Terminal/styles'

const { terminal } = cvData

const POPUP_CONFIG = {
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
}

function Terminal() {
  const [history, setHistory] = useState(INITIAL_HISTORY)
  const [input, setInput] = useState('')
  const [popup, setPopup] = useState(null)
  const inputRef = useRef(null)
  const bodyRef = useRef(null)
  const statusText = useTypingEffect(cvData.personal.status)
  const { toggleTheme, setTheme } = useTheme()
  const { copiedKey, copyToClipboard, processCommand } = useCommands({
    setHistory,
    setInput,
    setPopup,
    toggleTheme,
    setTheme,
  })

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [history])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') processCommand(input)
  }

  const handleChipClick = (cmd) => {
    processCommand(cmd)
    inputRef.current?.focus()
  }

  const renderLine = (line, i) => {
    switch (line.type) {
      case 'input':
        return (
          <S.OutputLine key={i}>
            <S.Prompt>~/yunusemre $&nbsp;</S.Prompt>
            <S.Command>{line.text}</S.Command>
          </S.OutputLine>
        )
      case 'comment':
        return (
          <S.OutputLine key={i}>
            <S.Comment>{line.text}</S.Comment>
          </S.OutputLine>
        )
      case 'fullPing':
        return (
          <S.OutputLine key={i}>
            <PingOutput copiedKey={copiedKey} onCopy={copyToClipboard} />
          </S.OutputLine>
        )
      case 'help':
        return (
          <S.OutputLine key={i}>
            <S.HelpGrid>
              {terminal.commands.map((c, idx) => (
                <Fragment key={idx}>
                  <S.HelpCommand>{c.command}</S.HelpCommand>
                  <S.HelpDesc>{c.description}</S.HelpDesc>
                </Fragment>
              ))}
            </S.HelpGrid>
          </S.OutputLine>
        )
      case 'success':
        return (
          <S.OutputLine key={i}>
            <S.SuccessValue>{line.text}</S.SuccessValue>
          </S.OutputLine>
        )
      case 'error':
        return (
          <S.OutputLine key={i}>
            <S.ErrorText>{line.text}</S.ErrorText>
          </S.OutputLine>
        )
      default:
        return null
    }
  }

  const popupConfig = popup ? POPUP_CONFIG[popup] : null

  return (
    <>
      <S.Section>
        <S.TerminalWindow onClick={() => inputRef.current?.focus()}>
          <S.TerminalHeader>
            <S.Dot $color="#ff5f56" />
            <S.Dot $color="#ffbd2e" />
            <S.Dot $color="#27c93f" />
            <S.HeaderTitle>{terminal.name}</S.HeaderTitle>
            <S.StatusBadge>
              <S.StatusDot />
              <span>
                system_status: <S.StatusOnline>{statusText}</S.StatusOnline>
              </span>
            </S.StatusBadge>
          </S.TerminalHeader>

          <S.TerminalBody ref={bodyRef}>
            {history.map((line, i) => renderLine(line, i))}
            <S.InputLine>
              <S.Prompt>~/yunusemre $&nbsp;</S.Prompt>
              <S.TerminalInput
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                autoComplete="off"
              />
            </S.InputLine>
          </S.TerminalBody>

          <S.SuggestionBar>
            {terminal.commands.map((c) => (
              <S.SuggestionChip key={c.command} onClick={() => handleChipClick(c.command)}>
                {c.command}
              </S.SuggestionChip>
            ))}
          </S.SuggestionBar>
        </S.TerminalWindow>
      </S.Section>

      <Modal
        open={!!popupConfig}
        title={popupConfig?.title}
        onClose={() => setPopup(null)}
        noPadding={popupConfig?.noPadding}
        noHeaderBorder={popupConfig?.noHeaderBorder}
      >
        {popupConfig && <popupConfig.Content />}
      </Modal>
    </>
  )
}

export default Terminal
