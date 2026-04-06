import { forwardRef } from 'react'
import * as S from './styles'

/**
 * YEGTerminal — Data-independent terminal emulator UI shell.
 *
 * Props:
 * - $fullscreen    : boolean
 * - $scanlines     : boolean (default true) — CRT scanline overlay
 * - title          : string — window title
 * - prompt         : string — input prompt (e.g. "~/user $")
 * - input          : string — controlled input value
 * - onInputChange  : (e) => void
 * - onInputKeyDown : (e) => void
 * - inputRef       : React ref for the input element
 * - bodyRef        : React ref for the scrollable body
 * - onBodyClick    : () => void — click handler on the window
 * - headerLeft     : ReactNode — left side of header (e.g. WindowControls)
 * - headerRight    : ReactNode — right side of header (e.g. StatusBadge)
 * - footer         : ReactNode — below body (e.g. ChipBar)
 * - inputExtra     : ReactNode — rendered inside InputWrapper (e.g. Autocomplete)
 * - children       : ReactNode — body content (output lines)
 */
const YEGTerminal = forwardRef(function YEGTerminal(
  {
    $fullscreen = false,
    $scanlines = true,
    title,
    prompt = '$',
    input,
    onInputChange,
    onInputKeyDown,
    inputRef,
    bodyRef,
    onBodyClick,
    headerLeft,
    headerRight,
    footer,
    inputExtra,
    children,
    ...props
  },
  ref,
) {
  return (
    <S.Section $fullscreen={$fullscreen}>
      <S.Window
        ref={ref}
        $fullscreen={$fullscreen}
        $scanlines={$scanlines}
        onClick={onBodyClick}
        {...props}
      >
        <S.Header>
          {headerLeft}
          <S.HeaderTitle>{title}</S.HeaderTitle>
          {headerRight && <S.HeaderExtra>{headerRight}</S.HeaderExtra>}
        </S.Header>

        <S.Body ref={bodyRef}>
          {children}

          <S.InputLine>
            <S.Prompt>{prompt}&nbsp;</S.Prompt>
            <S.InputWrapper>
              <S.Input
                ref={inputRef}
                value={input}
                onChange={onInputChange}
                onKeyDown={onInputKeyDown}
                spellCheck={false}
                autoComplete="off"
              />
              {inputExtra}
            </S.InputWrapper>
          </S.InputLine>
        </S.Body>

        {footer}
      </S.Window>
    </S.Section>
  )
})

export default YEGTerminal
