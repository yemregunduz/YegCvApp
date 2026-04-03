import styled, { keyframes, css } from 'styled-components'

// ── Animations ──

export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
`

export const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`

const screenOff = keyframes`
  0% { opacity: 1; }
  50% { opacity: 1; transform: scaleY(1); }
  80% { opacity: 0.8; transform: scaleY(0.005); }
  100% { opacity: 0; transform: scaleY(0); }
`

const screenOn = keyframes`
  0% { opacity: 0; transform: scaleY(0); }
  40% { opacity: 0.8; transform: scaleY(0.005); }
  100% { opacity: 1; transform: scaleY(1); }
`

// ── Layout ──

export const Section = styled.section`
  background: ${({ theme }) =>
    theme.mode === 'light' ? theme.colors.bgSecondary : theme.colors.bgPrimary};
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  padding: 12px;

  ${({ $fullscreen }) =>
    $fullscreen &&
    css`
      position: fixed;
      inset: 0;
      z-index: 9999;
      padding: 0;
    `}
`

export const TerminalWindow = styled.div`
  background: ${({ theme }) => theme.colors.bgPrimary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  box-shadow: ${({ theme }) => `0 4px 24px ${theme.colors.shadow}`};
  overflow: hidden;
  position: relative;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;

  ${({ $fullscreen }) =>
    $fullscreen &&
    css`
      border-radius: 0;
      border: none;
    `}

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      ${({ theme }) => theme.colors.cyanAlpha3} 2px,
      ${({ theme }) => theme.colors.cyanAlpha3} 4px
    );
    pointer-events: none;
    opacity: 0.4;
  }
`

// ── Header ──

export const TerminalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: ${({ theme }) => theme.colors.bgCard};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

export const Dot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`

export const DotButton = styled.button`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.6);

  svg {
    width: 8px;
    height: 8px;
    stroke-width: 3;
  }

  &:hover {
    transform: scale(1.2);
    box-shadow: 0 0 8px ${({ $color }) => $color}80;
    color: rgba(0, 0, 0, 0.9);
  }

  &:active {
    transform: scale(0.9);
  }
`

export const HeaderTitle = styled.span`
  margin-left: 8px;
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: normal;
`

export const StatusBadge = styled.div`
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

export const StatusDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.green};
  animation: ${pulse} 2s infinite;
`

export const StatusOnline = styled.span`
  color: ${({ theme }) => theme.colors.green};
`

// ── Body ──

export const TerminalBody = styled.div`
  position: relative;
  padding: 20px;
  flex: 1;
  overflow-y: auto;
  font-size: 0.8rem;
  line-height: 1.8;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 2px;
  }
`

export const OutputLine = styled.div`
  margin-bottom: 2px;

  &:last-of-type {
    animation: ${fadeIn} 0.3s ease;
  }
`

// ── Text Tokens ──

export const Prompt = styled.span`
  color: ${({ theme }) => theme.colors.green};
`

export const Command = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
`

export const Comment = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-style: italic;
`

export const TermKey = styled.span`
  color: ${({ theme }) => theme.colors.magenta};
`

export const Value = styled.span`
  color: ${({ theme }) => theme.colors.cyan};
`

export const SuccessValue = styled.span`
  color: ${({ theme }) => theme.colors.green};
`

export const LinkValue = styled.a`
  color: ${({ theme }) => theme.colors.cyan};
  text-decoration: none;
  border-bottom: 1px dashed transparent;
  transition: border-color 0.3s;
  &:hover {
    border-color: ${({ theme }) => theme.colors.cyan};
  }
`

export const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.red};
`

export const Separator = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
`

export const Divider = styled.div`
  border-top: 1px dashed ${({ theme }) => theme.colors.border};
  margin: 8px 0;
`

// ── Input ──

export const InputLine = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`

export const InputWrapper = styled.div`
  position: relative;
  flex: 1;
`

export const TerminalInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.8rem;
  width: 100%;
  caret-color: ${({ theme }) => theme.colors.cyan};
`

// ── Help ──

export const HelpGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2px 16px;
  margin: 6px 0 6px 20px;
`

export const HelpCommand = styled.span`
  color: ${({ theme }) => theme.colors.cyan};
`

export const HelpDesc = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
`

// ── Suggestion Bar ──

export const SuggestionBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 10px 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bgCard};

  @media (max-width: 768px) {
    overflow-x: auto;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
  }
`

export const SuggestionChip = styled.button`
  background: ${({ theme }) => theme.colors.bgPrimary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.65rem;
  font-family: ${({ theme }) => theme.fonts.mono};
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.cyan};
    color: ${({ theme }) => theme.colors.cyan};
  }

  @media (max-width: 768px) {
    white-space: nowrap;
  }
`

// ── Shutdown / Boot ──

export const ShutdownScreen = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
  min-height: 0;

  ${({ $phase }) =>
    $phase === 'shutting-down' &&
    css`
      animation: ${screenOff} 0.6s ease-in forwards;
      animation-delay: 2s;
    `}

  ${({ $phase }) =>
    $phase === 'booting' &&
    css`
      animation: ${screenOn} 0.6s ease-out forwards;
    `}

  ${({ $phase }) =>
    $phase === 'off' &&
    css`
      background: #000;
    `}
`

export const ShutdownContent = styled.div`
  padding: 40px;
  width: 100%;
  font-size: 0.8rem;
  line-height: 2;
`

export const ShutdownLine = styled.div`
  color: ${({ theme }) => theme.colors.green};
  animation: ${fadeIn} 0.3s ease;
`

export const ShutdownCursor = styled.span`
  color: ${({ theme }) => theme.colors.green};
  animation: ${blink} 0.8s step-end infinite;
`

export const ShutdownLogo = styled.div`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.textMuted};
  animation: ${pulse} 2s infinite;
`

// ── Dock (Minimized) ──

export const DockBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  cursor: pointer;
  margin: auto auto 0;
  transition: all 0.3s;
  box-shadow: ${({ theme }) => `0 4px 16px ${theme.colors.shadow}`};

  &:hover {
    border-color: ${({ theme }) => theme.colors.cyan};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => `0 8px 24px ${theme.colors.shadow}`};
  }
`

export const DockDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`

export const DockTitle = styled.span`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: ${({ theme }) => theme.fonts.mono};
  margin-left: 4px;
`

