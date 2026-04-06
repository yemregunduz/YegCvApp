import styled, { css } from 'styled-components'

const base = css`
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
`

const variants = {
  default: css`
    &:hover {
      border-color: ${({ theme }) => theme.colors.cyan};
      transform: translateY(-2px);
      box-shadow: 0 8px 24px ${({ theme }) => theme.colors.shadow};
    }
  `,
  flat: css``,
  outlined: css`
    background: transparent;

    &:hover {
      border-color: ${({ theme }) => theme.colors.cyan};
    }
  `,
}

const sizes = {
  sm: css`padding: 1rem;`,
  md: css`padding: 1.5rem;`,
  lg: css`padding: 2rem;`,
}

const StyledCard = styled.div`
  ${base}
  ${({ $variant = 'default' }) => variants[$variant] || variants.default}
  ${({ $size = 'md' }) => sizes[$size] || sizes.md}

  ${({ $accent }) =>
    $accent &&
    css`
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: ${$accent};
      }

      &:hover {
        border-color: ${$accent};
      }
    `}
`

export default StyledCard
