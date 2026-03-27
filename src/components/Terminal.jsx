import { useState, useRef, useEffect, Fragment } from 'react'
import styled, { keyframes } from 'styled-components'
import { FiX } from 'react-icons/fi'
import cvData from '../data/cv.json'
import cvFile from '../assets/YunusEmreGunduzCv.pdf'
import SkillsContent from './popups/SkillsPopup'
import ExperienceContent from './popups/ExperiencePopup'
import EducationContent from './popups/EducationPopup'
import SummaryContent from './popups/SummaryPopup'

const { contact, personal } = cvData

// ── Animations ──
const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
`

const scanline = keyframes`
  0%   { top: -100%; }
  100% { top: 100%; }
`

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(30px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`

// ── Terminal Styled Components ──
const Section = styled.section`
  background: ${({ theme }) => theme.colors.bgPrimary};
  flex: 1;
  display: flex;
  flex-direction: column;
`

const StatusBadge = styled.div`
  display: inline-flex;
  width: max-content;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  margin-left: auto;
  font-size: 0.65rem;
`

const StatusDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.green};
  animation: ${pulse} 2s infinite;
`

const StatusOnline = styled.span`
  color: ${({ theme }) => theme.colors.green};
`

const TerminalWindow = styled.div`
  background: ${({ theme }) => theme.colors.bgPrimary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;

  &::after {
    content: '';
    position: absolute;
    top: -100%;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(transparent 0%, rgba(0, 229, 255, 0.03) 50%, transparent 100%);
    animation: ${scanline} 4s linear infinite;
    pointer-events: none;
  }
`

const TerminalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: ${({ theme }) => theme.colors.bgCard};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const Dot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`

const HeaderTitle = styled.span`
  margin-left: 8px;
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

const TerminalBody = styled.div`
  padding: 20px;
  flex: 1;
  overflow-y: auto;
  font-size: 0.8rem;
  line-height: 1.8;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 2px;
  }
`

const OutputLine = styled.div`
  animation: ${fadeIn} 0.3s ease;
  margin-bottom: 2px;
`

const Prompt = styled.span`
  color: ${({ theme }) => theme.colors.green};
`

const Command = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
`

const Comment = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-style: italic;
`

const TermKey = styled.span`
  color: ${({ theme }) => theme.colors.magenta};
`

const Value = styled.span`
  color: ${({ theme }) => theme.colors.cyan};
`

const SuccessValue = styled.span`
  color: ${({ theme }) => theme.colors.green};
`

const LinkValue = styled.a`
  color: ${({ theme }) => theme.colors.cyan};
  text-decoration: none;
  border-bottom: 1px dashed transparent;
  transition: border-color 0.3s;
  &:hover { border-color: ${({ theme }) => theme.colors.cyan}; }
`

const ErrorText = styled.span`
  color: #ff5555;
`

const InputLine = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`

const TerminalInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.8rem;
  flex: 1;
  caret-color: ${({ theme }) => theme.colors.cyan};
`

const HelpGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2px 16px;
  margin: 6px 0 6px 20px;
`

const HelpCommand = styled.span`
  color: ${({ theme }) => theme.colors.cyan};
`

const HelpDesc = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
`

const SuggestionBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 10px 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bgCard};
`

const SuggestionChip = styled.button`
  background: ${({ theme }) => theme.colors.bgPrimary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.65rem;
  font-family: ${({ theme }) => theme.fonts.mono};
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.cyan};
    color: ${({ theme }) => theme.colors.cyan};
  }
`

// ── Modal / Popup Styled Components ──
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(6px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`

const ModalWindow = styled.div`
  background: ${({ theme }) => theme.colors.bgPrimary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  width: 100%;
  max-width: 900px;
  max-height: 85vh;
  overflow: hidden;
  animation: ${slideUp} 0.3s ease;
  display: flex;
  flex-direction: column;
`

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  background: ${({ theme }) => theme.colors.bgCard};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const ModalTitle = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.cyan};
  letter-spacing: 2px;
  font-weight: 700;
`

const CloseButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  width: 30px;
  height: 30px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: all 0.2s;

  &:hover {
    border-color: #ff5555;
    color: #ff5555;
  }
`

const ModalBody = styled.div`
  padding: 2rem;
  overflow-y: auto;
  flex: 1;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 2px;
  }
`

function useTypingEffect(text, typingSpeed = 100, deletingSpeed = 50, pauseMs = 2000) {
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let timeout
    if (!isDeleting && displayed === text) {
      timeout = setTimeout(() => setIsDeleting(true), pauseMs)
    } else if (isDeleting && displayed === '') {
      setIsDeleting(false)
    } else {
      timeout = setTimeout(
        () => setDisplayed(
          isDeleting ? text.substring(0, displayed.length - 1) : text.substring(0, displayed.length + 1)
        ),
        isDeleting ? deletingSpeed : typingSpeed
      )
    }
    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, text, typingSpeed, deletingSpeed, pauseMs])

  return displayed
}

const POPUP_CONFIG = {
  skills: { title: 'YETENEKLER', Content: SkillsContent },
  experience: { title: 'İŞ DENEYİMİ', Content: ExperienceContent },
  education: { title: 'EĞİTİM', Content: EducationContent },
  summary: { title: 'ÖZET', Content: SummaryContent },
}

function Terminal() {
  const [history, setHistory] = useState([
    { type: 'comment', text: `// ${contact.greeting}` },
    { type: 'comment', text: '// "help" yazarak komutları görebilirsiniz.' },
  ])
  const [input, setInput] = useState('')
  const [copiedKey, setCopiedKey] = useState(null)
  const [popup, setPopup] = useState(null)
  const inputRef = useRef(null)
  const bodyRef = useRef(null)
  const statusText = useTypingEffect(cvData.personal.status)

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [history])

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') setPopup(null) }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

const commands = {
  help: () => [{ type: 'help' }],
  'ping yunusemre': () => [{ type: 'ping' }],
  'ping yunus': () => [{ type: 'ping' }],
  'show skills': () => {
    setPopup('skills')
    return [{ type: 'success', text: '  Yetenekler açılıyor...' }]
  },
  'show experience': () => {
    setPopup('experience')
    return [{ type: 'success', text: '  İş deneyimi açılıyor...' }]
  },
  'show education': () => {
    setPopup('education')
    return [{ type: 'success', text: '  Eğitim bilgileri açılıyor...' }]
  },
  'show summary': () => {
    setPopup('summary')
    return [{ type: 'success', text: '  Özet bilgileri açılıyor...' }]
  },
  'open linkedin': () => {
    window.open(personal.linkedin, '_blank')
    return [{ type: 'success', text: '  Yönlendiriliyor... linkedin' }]
  },
  'open github': () => {
    window.open(personal.github, '_blank')
    return [{ type: 'success', text: '  Yönlendiriliyor... github' }]
  },
  'show cv' : () => {
    window.open(cvFile, '_blank')
    return [{ type: 'success', text: '  CV açılıyor...' }]
  },
  'download cv': () => {
    const link = document.createElement('a')
    link.href = cvFile
    link.download = 'YunusEmreGunduz_CV.pdf'
    link.click()
    return [{ type: 'success', text: '  CV indiriliyor...' }]
  },
  'copy email': () => {
    copyToClipboard(personal.email, 'email')
    return [{ type: 'success', text: `  "${personal.email}" panoya kopyalandı.` }]
  },
  'copy phone': () => {
    copyToClipboard(personal.phone, 'phone')
    return [{ type: 'success', text: `  "${personal.phone}" panoya kopyalandı.` }]
  },
}

  const processCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase()

    // --- clear veya cls komutları için özel durum ---
    if (trimmed === 'clear' || trimmed === 'cls') {
      setHistory([
        { type: 'comment', text: `// ${contact.greeting}` },
        { type: 'comment', text: '// "help" yazarak komutları görebilirsiniz.' },
      ])
      setInput('')
      return
    }

    const newLines = [{ type: 'input', text: cmd.trim() }]
    const commandFn = commands[trimmed]

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
  }

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
          <OutputLine key={i}>
            <Prompt>~/yunusemre $&nbsp;</Prompt>
            <Command>{line.text}</Command>
          </OutputLine>
        )
      case 'comment':
        return (
          <OutputLine key={i}><Comment>{line.text}</Comment></OutputLine>
        )
      case 'ping':
        return (
          <OutputLine key={i}>
            {contact.pingResponse.map((item) => (
              <div key={item.key} style={{ marginLeft: 20 }}>
                <TermKey>{item.key}</TermKey>
                <span style={{ color: '#888' }}> : </span>
                {item.type === 'link' ? (
                  <LinkValue href={item.href} target="_blank" rel="noopener noreferrer">{item.value}</LinkValue>
                ) : item.type === 'success' ? (
                  <SuccessValue>{item.value}</SuccessValue>
                ) : item.type === 'boolean' ? (
                  <SuccessValue>{item.value}</SuccessValue>
                ) : item.type === 'list' ? (
                  <Value>[{item.value}]</Value>
                ) : (
                  <Value>{item.value}</Value>
                )}
                {(item.key === 'email' || item.key === 'phone') && (
                  <SuggestionChip
                    onClick={() => copyToClipboard(item.value, item.key)}
                    style={{ marginLeft: 8, padding: '1px 6px', fontSize: '0.6rem' }}
                  >
                    {copiedKey === item.key ? 'kopyalandı' : 'kopyala'}
                  </SuggestionChip>
                )}
              </div>
            ))}
          </OutputLine>
        )
      case 'help':
        return (
          <OutputLine key={i}>
            <HelpGrid>
              {contact.commands.map((c, idx) => (
                <Fragment key={idx}>
                  <HelpCommand>{c.command}</HelpCommand>
                  <HelpDesc>{c.description}</HelpDesc>
                </Fragment>
              ))}
            </HelpGrid>
          </OutputLine>
        )
      case 'success':
        return (
          <OutputLine key={i}><SuccessValue>{line.text}</SuccessValue></OutputLine>
        )
      case 'error':
        return (
          <OutputLine key={i}><ErrorText>{line.text}</ErrorText></OutputLine>
        )
      default:
        return null
    }
  }

  const popupConfig = popup ? POPUP_CONFIG[popup] : null

  return (
    <>
      <Section id="terminal">
        <TerminalWindow onClick={() => inputRef.current?.focus()}>
          <TerminalHeader>
            <Dot $color="#ff5f56" />
            <Dot $color="#ffbd2e" />
            <Dot $color="#27c93f" />
            <HeaderTitle>Terminal</HeaderTitle>
            <StatusBadge>
              <StatusDot />
              <span>system_status: <StatusOnline>{statusText}</StatusOnline></span>
            </StatusBadge>
          </TerminalHeader>

          <TerminalBody ref={bodyRef}>
            {history.map((line, i) => renderLine(line, i))}
            <InputLine>
              <Prompt>~/yunusemre $&nbsp;</Prompt>
              <TerminalInput
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                autoComplete="off"
              />
            </InputLine>
          </TerminalBody>

          <SuggestionBar>
            {contact.commands
              .map((c) => (
                <SuggestionChip key={c.command} onClick={() => handleChipClick(c.command)}>
                  {c.command}
                </SuggestionChip>
              ))}
          </SuggestionBar>
        </TerminalWindow>
      </Section>

      {popupConfig && (
        <Overlay onClick={() => setPopup(null)}>
          <ModalWindow onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>{popupConfig.title}</ModalTitle>
              <CloseButton onClick={() => setPopup(null)}>
                <FiX />
              </CloseButton>
            </ModalHeader>
            <ModalBody>
              <popupConfig.Content />
            </ModalBody>
          </ModalWindow>
        </Overlay>
      )}
    </>
  )
}

export default Terminal;
