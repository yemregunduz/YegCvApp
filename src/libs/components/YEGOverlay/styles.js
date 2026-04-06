import styled, { css, keyframes } from 'styled-components'

const fadeOutAnim = keyframes`
  from { opacity: 1; }
  to   { opacity: 0; }
`

const base = css`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`

const variants = {
  default: css`
    z-index: 2000;
    background: ${({ theme }) => theme.colors.overlay};
    backdrop-filter: blur(2px);
  `,
  dark: css`
    z-index: 99999;
    background: ${({ theme }) => theme.colors.bgPrimary};
  `,
  transparent: css`
    z-index: 2000;
    background: transparent;
  `,
}

const StyledOverlay = styled.div`
  ${base}
  ${({ $variant = 'default' }) => variants[$variant] || variants.default}

  ${({ $fadeOut }) =>
    $fadeOut &&
    css`
      animation: ${fadeOutAnim} 0.4s ease forwards;
    `}
`

export default StyledOverlay
