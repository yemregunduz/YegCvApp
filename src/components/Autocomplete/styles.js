import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  flex: 1;
`

export const Dropdown = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  position: absolute;
  ${({ $dropUp }) => ($dropUp ? 'bottom: calc(100% + 6px);' : 'top: calc(100% + 6px);')}
  left: 0;
  width: max-content;
  min-width: 200px;
  max-width: calc(100vw - 60px);
  max-height: 180px;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  box-shadow: 0 8px 24px ${({ theme }) => theme.colors.shadow};
  z-index: 100;
  padding: 4px;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 2px;
  }
`

export const Match = styled.span`
  color: ${({ theme }) => theme.colors.cyan};
  font-weight: 700;
`

export const Item = styled.div`
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
