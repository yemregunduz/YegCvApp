import styled, { css, keyframes } from 'styled-components'

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(24px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`

const slideOut = keyframes`
  from { opacity: 1; transform: translateY(0) scale(1); }
  to   { opacity: 0; transform: translateY(12px) scale(0.98); }
`

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`

const fadeOut = keyframes`
  from { opacity: 1; }
  to   { opacity: 0; }
`

// ── Overlay ──

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: ${({ $scroll }) => ($scroll === 'outer' ? 'flex-start' : 'center')};
  justify-content: center;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.overlay};
  backdrop-filter: blur(2px);
  animation: ${({ $closing }) => ($closing ? fadeOut : fadeIn)} 0.2s ease forwards;
  overflow-y: ${({ $scroll }) => ($scroll === 'outer' ? 'auto' : 'hidden')};
`

// ── Window ──

const base = css`
  background: ${({ theme }) => theme.colors.bgPrimary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: ${({ $closing }) => ($closing ? slideOut : slideUp)} 0.25s ease forwards;
`

const sizes = {
  sm: css`max-width: 480px;`,
  md: css`max-width: 640px;`,
  lg: css`max-width: 900px;`,
  xl: css`max-width: 1100px;`,
  full: css`
    max-width: 100%;
    max-height: 100%;
    height: 100%;
    border-radius: 0;
  `,
}

export const Window = styled.div`
  ${base}
  ${({ $size = 'lg' }) => sizes[$size] || sizes.lg}
  max-height: ${({ $scroll }) => ($scroll === 'outer' ? 'none' : '85dvh')};
  margin: ${({ $scroll }) => ($scroll === 'outer' ? '2rem auto' : '0')};
  flex-shrink: ${({ $scroll }) => ($scroll === 'outer' ? '0' : '1')};
`

// ── Header ──

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  background: ${({ theme }) => theme.colors.bgCard};
  border-bottom: ${({ $borderless, theme }) =>
    $borderless ? 'none' : `1px solid ${theme.colors.border}`};
  flex-shrink: 0;
`

export const Title = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.cyan};
  letter-spacing: 2px;
  font-weight: 700;
  font-family: ${({ theme }) => theme.fonts.mono};
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
  padding: ${({ $noPadding }) => ($noPadding ? '0' : '1.25rem')};
  flex: 1;
  min-height: 0;

  ${({ $scroll }) =>
    $scroll === 'inner' &&
    css`
      overflow-y: auto;
      ${scrollbar}
    `}
`

// ── Footer ──

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding: 12px 20px;
  background: ${({ theme }) => theme.colors.bgCard};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
`
