import { useState, useRef, useEffect, useCallback } from 'react'
import cvData from '@/data/cv.json'
import { useTypingEffect } from '@/hooks/useTypingEffect'
import { useCommands } from '@/hooks/useCommands'
import { useTheme } from '@/libs/hooks/useTheme'
import { useWindowControls } from '@/hooks/useWindowControls'
import { useInputHistory } from '@/hooks/useInputHistory'
import { useKeyboardSound } from '@/hooks/useKeyboardSound'
import { useChiptune } from '@/hooks/useChiptune'
import { useLanguage } from '@/hooks/useLanguage'
import { YEGTerminal } from '@/libs'
import Autocomplete from '@/components/Autocomplete'
import StatusBadge from '@/components/StatusBadge'
import WindowControls from '@/components/WindowControls'
import ChipBar from '@/components/ChipBar'
import TerminalLine from '@/components/Terminal/TerminalLine'
import ShutdownOverlay from '@/components/Terminal/ShutdownOverlay'
import * as S from '@/components/Terminal/styles'

const { terminal } = cvData

const isTouchDevice = () => window.matchMedia('(pointer: coarse)').matches

function Terminal() {
  const [history, setHistory] = useState([])
  const [input, setInput] = useState('')
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

  const { t } = useLanguage()
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

  const { processCommand, initialHistory } = useCommands({
    setHistory,
    setInput,
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

  if (isMinimized) {
    return (
      <S.MinimizedSection>
        <S.DockBar onClick={handleMinimize}>
          <S.DockDot $color="#ff5f56" />
          <S.DockDot $color="#ffbd2e" />
          <S.DockDot $color="#27c93f" />
          <S.DockTitle>{terminal.name} — {t.dock.minimized}</S.DockTitle>
        </S.DockBar>
      </S.MinimizedSection>
    )
  }

  if (shutdown) {
    return (
      <YEGTerminal
        $fullscreen={isFullscreen}
        title={terminal.name}
        prompt="~/yunusemre $"
        input=""
        headerLeft={
          <WindowControls
            onClose={handleClose}
            onMinimize={handleMinimize}
            onFullscreen={handleFullscreen}
            isFullscreen={isFullscreen}
          />
        }
      >
        <ShutdownOverlay phase={shutdown} lines={shutdownLines} />
      </YEGTerminal>
    )
  }

  return (
    <YEGTerminal
      $fullscreen={isFullscreen}
      title={terminal.name}
      prompt="~/yunusemre $"
      input={input}
      onInputChange={handleInputChange}
      onInputKeyDown={handleKeyDown}
      inputRef={inputRef}
      bodyRef={bodyRef}
      onBodyClick={() => !isTouchDevice() && inputRef.current?.focus()}
      headerLeft={
        <WindowControls
          onClose={handleClose}
          onMinimize={handleMinimize}
          onFullscreen={handleFullscreen}
          isFullscreen={isFullscreen}
        />
      }
      headerRight={
        <StatusBadge pulse label="system_status" value={statusText} />
      }
      inputExtra={
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
      }
      footer={
        <ChipBar
          items={terminal.commands.filter((c) => c.chip).map((c) => c.command)}
          onItemClick={handleChipClick}
        />
      }
    >
      {history.map((line, i) => (
        <TerminalLine key={i} line={line} />
      ))}
    </YEGTerminal>
  )
}

export default Terminal
