  import { useState, useRef, useEffect, useCallback, Fragment } from 'react'
  import { FiX, FiMinus, FiMaximize2, FiMinimize2 } from 'react-icons/fi'
  import cvData from '@/data/cv.json'
  import { useTypingEffect } from '@/hooks/useTypingEffect'
  import { useCommands, INITIAL_HISTORY } from '@/hooks/useCommands'
  import { useTheme } from '@/hooks/useTheme'
  import Modal from '@/components/Modal'
  import PingOutput from '@/components/Terminal/PingOutput'
  import * as S from '@/components/Terminal/styles'
  import { POPUP_CONFIG } from '@/components/Terminal/constants'
  import {useWindowControls} from '@/hooks/useWindowControls'

  const { terminal } = cvData

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

    const {
      isMinimized,
      isFullscreen,
      shutdown,
      shutdownLines,
      handleClose,
      handleMinimize,
      handleFullscreen,
    } = useWindowControls({
      onBootComplete: () => {
        setHistory(INITIAL_HISTORY)
        setInput('')
      },
    })

    useEffect(() => {
      if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }, [history])

    const runSequence = useCallback((lines, onLineAdd, onComplete) => {
      setShutdownLines([])
      lines.forEach(({ text, delay }) => {
        setTimeout(() => onLineAdd(text), delay)
      })
      setTimeout(onComplete, lines[lines.length - 1].delay + 800)
    }, [])

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

    // Minimized dock bar
    if (isMinimized) {
      return (
        <S.Section>
          <S.DockBar onClick={handleMinimize}>
            <S.DockDot $color="#ff5f56" />
            <S.DockDot $color="#ffbd2e" />
            <S.DockDot $color="#27c93f" />
            <S.DockTitle>{terminal.name} — Simge durumuna küçültüldü</S.DockTitle>
          </S.DockBar>
        </S.Section>
      )
    }

    return (
      <>
        <S.Section $fullscreen={isFullscreen}>
          <S.TerminalWindow
            $fullscreen={isFullscreen}
            onClick={() => !shutdown && inputRef.current?.focus()}
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
              <S.ShutdownScreen $phase={shutdown}>
                {shutdown === 'off' ? (
                  <S.ShutdownLogo>⏻</S.ShutdownLogo>
                ) : (
                  <S.ShutdownContent>
                    {shutdownLines.map((line, i) => (
                      <S.ShutdownLine key={i}>{line}</S.ShutdownLine>
                    ))}
                    <S.ShutdownCursor>_</S.ShutdownCursor>
                  </S.ShutdownContent>
                )}
              </S.ShutdownScreen>
            ) : (
              <>
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
