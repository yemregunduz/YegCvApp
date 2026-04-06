import styled, { css } from 'styled-components'

const scrollbar = css`
  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 2px;
  }
`

const base = css`
  position: absolute;
  min-width: 120px;
  max-height: 220px;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  box-shadow: 0 8px 24px ${({ theme }) => theme.colors.shadow};
  z-index: 100;
  padding: 4px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  ${scrollbar}
`

const aligns = {
  left: css`left: 0;`,
  right: css`right: 0;`,
}

const directions = {
  down: css`top: calc(100% + 6px);`,
  up: css`bottom: calc(100% + 6px);`,
}

const StyledMenu = styled.div`
  ${base}
  ${({ $align = 'right' }) => aligns[$align] || aligns.right}
  ${({ $direction = 'down' }) => directions[$direction] || directions.down}
`

const itemBase = css`
  width: 100%;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.7rem;
  font-family: ${({ theme }) => theme.fonts.mono};
  cursor: pointer;
  transition: all 0.15s;
  text-align: left;
`

export const StyledItem = styled.button`
  ${itemBase}
  background: ${({ $active, theme }) => ($active ? theme.colors.cyanAlpha8 : 'transparent')};
  color: ${({ $active, theme }) => ($active ? theme.colors.cyan : theme.colors.textSecondary)};

  &:hover {
    background: ${({ theme }) => theme.colors.cyanAlpha8};
    color: ${({ theme }) => theme.colors.cyan};
  }
`

export default StyledMenu
