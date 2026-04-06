import styled, { css } from 'styled-components'

const base = css`
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  font-family: ${({ theme }) => theme.fonts.mono};
`

const intents = {
  default: css`
    --hover-color: ${({ theme }) => theme.colors.cyan};
  `,
  danger: css`
    --hover-color: ${({ theme }) => theme.colors.red};
  `,
}

const variants = {
  icon: css`
    background: none;
    border: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.textSecondary};
    width: 32px;
    height: 32px;
    border-radius: 8px;
    font-size: 1rem;

    &:hover {
      border-color: var(--hover-color);
      color: var(--hover-color);
    }
  `,
  chip: css`
    background: ${({ theme }) => theme.colors.bgPrimary};
    border: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.textSecondary};
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 0.65rem;
    white-space: nowrap;
    flex-shrink: 0;

    &:hover {
      border-color: var(--hover-color);
      color: var(--hover-color);
    }
  `,
  ghost: css`
    background: none;
    border: 1px solid transparent;
    color: ${({ theme }) => theme.colors.textSecondary};
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 0.7rem;
    gap: 6px;

    &:hover {
      border-color: ${({ theme }) => theme.colors.border};
      color: var(--hover-color);
    }
  `,
}

const sizes = {
  sm: css`
    width: 28px;
    height: 28px;
    font-size: 0.85rem;
  `,
  md: css``,
  lg: css`
    width: 38px;
    height: 38px;
    font-size: 1.15rem;
  `,
}

const StyledButton = styled.button`
  ${base}
  ${({ $intent = 'default' }) => intents[$intent]}
  ${({ $variant = 'icon' }) => variants[$variant] || variants.icon}
  ${({ $size }) => $size && sizes[$size]}
`

export default StyledButton
