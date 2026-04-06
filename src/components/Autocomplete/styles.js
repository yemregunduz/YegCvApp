import styled from 'styled-components'

export const Match = styled.span`
  color: ${({ theme }) => theme.colors.cyan};
  font-weight: 700;
`

export const ItemRow = styled.div`
  padding: 6px 12px;
  font-size: 0.72rem;
  font-family: ${({ theme }) => theme.fonts.mono};
  color: ${({ $active, theme }) => ($active ? theme.colors.cyan : theme.colors.textSecondary)};
  background: ${({ $active, theme }) => ($active ? theme.colors.bgSecondary : 'transparent')};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    color: ${({ theme }) => theme.colors.cyan};
    background: ${({ theme }) => theme.colors.bgSecondary};
  }
`
