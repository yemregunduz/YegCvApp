import styled, { css } from 'styled-components'

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

// ── Window ──

export const Window = styled.div`
  background: ${({ theme }) => theme.colors.bgPrimary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  box-shadow: 0 4px 24px ${({ theme }) => theme.colors.shadow};
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

  ${({ $scanlines }) =>
    $scanlines !== false &&
    css`
      &::after {
        content: '';
        position: absolute;
        inset: 0;
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
    `}
`

// ── Header ──

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: ${({ theme }) => theme.colors.bgCard};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

export const HeaderTitle = styled.span`
  margin-left: 8px;
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: normal;
`

export const HeaderExtra = styled.div`
  margin-left: auto;
`

// ── Body ──

const scrollbar = css`
  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 2px;
  }
`

export const Body = styled.div`
  position: relative;
  padding: 20px;
  flex: 1;
  overflow-y: auto;
  font-size: 0.8rem;
  line-height: 1.8;
  ${scrollbar}
`

// ── Input ──

export const InputLine = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`

export const Prompt = styled.span`
  color: ${({ theme }) => theme.colors.green};
`

export const InputWrapper = styled.div`
  position: relative;
  flex: 1;
`

export const Input = styled.input`
  background: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.8rem;
  width: 100%;
  caret-color: ${({ theme }) => theme.colors.cyan};
`
