import styled, { keyframes } from 'styled-components'

// ── Animations ──

export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
`

export const scanline = keyframes`
  0%   { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`

export const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
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

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      transparent 0%,
      ${({ theme }) => theme.colors.cyanAlpha3} 50%,
      transparent 100%
    );
    animation: ${scanline} 4s linear infinite;
    pointer-events: none;
    will-change: transform;
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
  animation: ${fadeIn} 0.3s ease;
  margin-bottom: 2px;
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
  color: #ff5555;
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

export const TerminalInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.8rem;
  flex: 1;
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
`

export const SuggestionChip = styled.button`
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
