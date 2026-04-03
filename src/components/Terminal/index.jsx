import { useState, useRef, useEffect, useCallback } from 'react'
import { FiX, FiMinus, FiMaximize2, FiMinimize2 } from 'react-icons/fi'
import cvData from '@/data/cv.json'
import { useTypingEffect } from '@/hooks/useTypingEffect'
import { useCommands } from '@/hooks/useCommands'
import { useTheme } from '@/hooks/useTheme'
import { useWindowControls } from '@/hooks/useWindowControls'
import { useInputHistory } from '@/hooks/useInputHistory'
import { useKeyboardSound } from '@/hooks/useKeyboardSound'
import { useChiptune } from '@/hooks/useChiptune'
import Modal from '@/components/Modal'
import Autocomplete from '@/components/Autocomplete'
import TerminalLine from '@/components/Terminal/TerminalLine'
import ShutdownOverlay from '@/components/Terminal/ShutdownOverlay'
import { POPUP_CONFIG } from '@/components/Terminal/constants'
import * as S from '@/components/Terminal/styles'

const { terminal } = cvData

const isTouchDevice = () => window.matchMedia('(pointer: coarse)').matches

function Terminal() {
  const [history, setHistory] = useState([])
  const [input, setInput] = useState('')
  const [popup, setPopup] = useState(null)
  const inputRef = useRef(null)
  const bodyRef = useRef(null)
  const autocompleteRef = useRef(null)
  const [dropUp, setDropUp] = useState(false)

  const checkDropDirection = useCallback(() => {
    if (!inputRef.current) return
    const rect = inputRef.current.getBoundingClientRect()
    const spaceBelow = window.innerHeight - rect.bottom
    setDropUp(spaceBelow < 200)
  }, [])

  const statusText = useTypingEffect(cvData.personal.status)
  const { toggleTheme, setTheme } = useTheme()
  const soundControls = useKeyboardSound()
  const chiptune = useChiptune()

  const {
    isMinimized,
    isFullscreen,
    shutdown,
    shutdownLines,
    handleClose,
    handleMinimize,
    handleFullscreen,
  } = useWindowControls({ setHistory, setInput })

  const { copiedKey, copyToClipboard, processCommand, initialHistory } = useCommands({
    setHistory,
    setInput,
    setPopup,
    toggleTheme,
    setTheme,
    soundControls,
    chiptune,
  })

  const inputHistory = useInputHistory()

  useEffect(() => {
    setHistory(initialHistory)
  }, [])

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [history])

  const handleSubmit = (cmd) => {
    inputHistory.push(cmd)
    autocompleteRef.current?.reset()
    processCommand(cmd)
  }

  const handleKeyDown = (e) => {
    if (autocompleteRef.current?.handleKeyDown(e)) return

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      inputHistory.navigate('up', input, setInput)
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      inputHistory.navigate('down', input, setInput)
      return
    }

    if (e.key === 'Enter') handleSubmit(input)
  }

  const handleInputChange = (e) => {
    soundControls.playClick()
    setInput(e.target.value)
    if (e.target.value.trim()) {
      autocompleteRef.current?.activate()
      checkDropDirection()
    } else {
      autocompleteRef.current?.reset()
    }
  }

  const handleChipClick = (cmd) => {
    handleSubmit(cmd)
    if (!isTouchDevice()) inputRef.current?.focus()
  }


  const popupConfig = popup ? POPUP_CONFIG[popup] : null

  if (isMinimized) {
    return (
      <S.Section>
        <S.DockBar onClick={handleMinimize}>
          <S.DockDot $color="#ff5f56" />
          <S.DockDot $color="#ffbd2e" />
          <S.DockDot $color="#27c93f" />
          <S.DockTitle>{terminal.name} — Pencereyi açmak için tıkla</S.DockTitle>
        </S.DockBar>
      </S.Section>
    )
  }

  return (
    <>
      <S.Section $fullscreen={isFullscreen}>
        <S.TerminalWindow
          $fullscreen={isFullscreen}
          onClick={() => !shutdown && !isTouchDevice() && inputRef.current?.focus()}
        >
          <S.TerminalHeader>
            <S.DotButton $color="#ff5f56" onClick={handleClose} title="Kapat">
              <FiX strokeWidth={4} />
            </S.DotButton>
            <S.DotButton $color="#ffbd2e" onClick={handleMinimize} title="Küçült">
              <FiMinus strokeWidth={4} />
            </S.DotButton>
            <S.DotButton $color="#27c93f" onClick={handleFullscreen} title="Tam ekran">
              {isFullscreen ? <FiMinimize2 strokeWidth={4} /> : <FiMaximize2 strokeWidth={4} />}
            </S.DotButton>
            <S.HeaderTitle>{terminal.name}</S.HeaderTitle>
            <S.StatusBadge>
              <S.StatusDot />
              <span>
                system_status: <S.StatusOnline>{statusText}</S.StatusOnline>
              </span>
            </S.StatusBadge>
          </S.TerminalHeader>

          {shutdown ? (
            <ShutdownOverlay phase={shutdown} lines={shutdownLines} />
          ) : (
            <>
              <S.TerminalBody ref={bodyRef}>
                {history.map((line, i) => (
                  <TerminalLine
                    key={i}
                    line={line}
                    copiedKey={copiedKey}
                    copyToClipboard={copyToClipboard}
                  />
                ))}
                <S.InputLine>
                  <S.Prompt>~/yunusemre $&nbsp;</S.Prompt>
                  <S.InputWrapper>
                    <S.TerminalInput
                      ref={inputRef}
                      value={input}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    <Autocomplete
                      ref={autocompleteRef}
                      input={input}
                      items={terminal.commands.map((c) => c.command)}
                      onComplete={setInput}
                      onSelect={(cmd) => {
                        setInput(cmd)
                        inputRef.current?.focus()
                      }}
                      dropUp={dropUp}
                    />
                  </S.InputWrapper>
                </S.InputLine>
              </S.TerminalBody>

              <S.SuggestionBar>
                {terminal.commands.filter(c=> c.chip).map((c) => (
                  <S.SuggestionChip key={c.command} onClick={() => handleChipClick(c.command)}>
                    {c.command}
                  </S.SuggestionChip>
                ))}
              </S.SuggestionBar>
            </>
          )}
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
