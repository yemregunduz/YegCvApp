import styled, { css, keyframes } from 'styled-components'

const pulseAnim = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`

const base = css`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 20px;
  border: 1px solid transparent;
  font-family: ${({ theme }) => theme.fonts.mono};
  white-space: nowrap;
  transition: all 0.2s;
`

const variants = {
  default: css`
    color: ${({ theme }) => theme.colors.textSecondary};
    border-color: ${({ theme }) => theme.colors.border};
    background: transparent;
  `,
  success: css`
    color: ${({ theme }) => theme.colors.green};
    border-color: ${({ theme }) => theme.colors.green}44;
    background: ${({ theme }) => theme.colors.green}11;
  `,
  warning: css`
    color: ${({ theme }) => theme.colors.magenta};
    border-color: ${({ theme }) => theme.colors.magenta}44;
    background: ${({ theme }) => theme.colors.magenta}11;
  `,
  danger: css`
    color: ${({ theme }) => theme.colors.red};
    border-color: ${({ theme }) => theme.colors.red}44;
    background: ${({ theme }) => theme.colors.red}11;
  `,
  info: css`
    color: ${({ theme }) => theme.colors.cyan};
    border-color: ${({ theme }) => theme.colors.cyan}44;
    background: ${({ theme }) => theme.colors.cyan}11;
  `,
}

const sizes = {
  sm: css`
    padding: 2px 8px;
    font-size: 0.55rem;
  `,
  md: css`
    padding: 4px 12px;
    font-size: 0.65rem;
  `,
  lg: css`
    padding: 6px 16px;
    font-size: 0.75rem;
  `,
}

const StyledBadge = styled.span`
  ${base}
  ${({ $variant = 'default' }) => variants[$variant] || variants.default}
  ${({ $size = 'md' }) => sizes[$size] || sizes.md}
`

export const PulseDot = styled.span`
  width: ${({ $dotSize }) => $dotSize || '8px'};
  height: ${({ $dotSize }) => $dotSize || '8px'};
  border-radius: 50%;
  background: ${({ $color, theme }) => $color || theme.colors.green};
  animation: ${pulseAnim} 2s infinite;
  flex-shrink: 0;
`

export default StyledBadge
