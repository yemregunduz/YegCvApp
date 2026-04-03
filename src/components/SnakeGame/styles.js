import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 8px 0;
`

export const ScoreBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 360px;
  padding: 0 4px;
`

export const Score = styled.span`
  font-size: 0.7rem;
  font-family: ${({ theme }) => theme.fonts.mono};
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 1px;
`

export const ScoreValue = styled.span`
  color: ${({ $highlight, theme }) => ($highlight ? theme.colors.magenta : theme.colors.cyan)};
  font-weight: bold;
`

export const Board = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.bgSecondary};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  overflow: hidden;
  max-width: 100%;
  aspect-ratio: 1;
`

export const GridOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-image: linear-gradient(
      ${({ theme }) => theme.colors.border}22 1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.border}22 1px,
      transparent 1px
    );
  background-size: ${({ $cell }) => $cell}px ${({ $cell }) => $cell}px;
  pointer-events: none;
`

export const Cell = styled.div`
  position: absolute;
  left: ${({ $x, $size }) => $x * $size}px;
  top: ${({ $y, $size }) => $y * $size}px;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  background: ${({ $isHead, theme }) => ($isHead ? theme.colors.cyan : theme.colors.green)};
  border-radius: ${({ $isHead }) => ($isHead ? '4px' : '2px')};
  box-shadow: ${({ $isHead, theme }) =>
  $isHead ? `0 0 6px ${theme.colors.cyan}` : 'none'};
  // transition: left 0.08s linear, top 0.08s linear;

  &::after {
    content: '';
    position: absolute;
    inset: 1px;
    background: ${({ $isHead, theme }) =>
      $isHead ? theme.colors.cyan : theme.colors.green}cc;
    border-radius: inherit;
  }
`

export const Food = styled.div`
  position: absolute;
  left: ${({ $x, $size }) => $x * $size}px;
  top: ${({ $y, $size }) => $y * $size}px;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  background: ${({ theme }) => theme.colors.magenta};
  border-radius: 50%;
  animation: ${pulse} 0.8s ease-in-out infinite;
  box-shadow: 0 0 8px ${({ theme }) => theme.colors.magenta}80;
`

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: ${({ theme }) => theme.colors.bgPrimary}dd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  z-index: 10;
`

export const OverlayText = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.cyan};
  font-family: ${({ theme }) => theme.fonts.mono};
  letter-spacing: 3px;
`

export const OverlayScore = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.green};
  font-family: ${({ theme }) => theme.fonts.mono};
`

export const OverlayHint = styled.div`
  font-size: 0.65rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: ${({ theme }) => theme.fonts.mono};
  letter-spacing: 1px;
  margin-top: 4px;
`

// ── Mobile Controls ──

export const Controls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  user-select: none;

  @media (min-width: 768px) {
    display: none;
  }
`

export const ControlRow = styled.div`
  display: flex;
  gap: 4px;
`

export const ControlButton = styled.button`
  width: ${({ $wide }) => ($wide ? '56px' : '44px')};
  height: 44px;
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;
  -webkit-tap-highlight-color: transparent;

  &:active {
    background: ${({ theme }) => theme.colors.cyan};
    color: ${({ theme }) => theme.colors.bgPrimary};
    transform: scale(0.92);
  }
`
