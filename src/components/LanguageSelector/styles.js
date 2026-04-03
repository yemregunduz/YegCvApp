import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
`

export const Toggle = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  height: 32px;
  padding: 0 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.7rem;
  font-family: ${({ theme }) => theme.fonts.mono};
  transition: all 0.3s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.cyan};
    color: ${({ theme }) => theme.colors.cyan};
  }
`

export const Flag = styled.span`
  font-size: 0.9rem;
  line-height: 1;
`

export const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  min-width: 120px;
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  box-shadow: 0 8px 24px ${({ theme }) => theme.colors.shadow};
  z-index: 1001;
  padding: 4px;
  overflow: hidden;
`

export const Option = styled.button`
  width: 100%;
  background: ${({ $active, theme }) => ($active ? theme.colors.cyanAlpha8 : 'transparent')};
  border: none;
  color: ${({ $active, theme }) => ($active ? theme.colors.cyan : theme.colors.textSecondary)};
  padding: 8px 12px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.7rem;
  font-family: ${({ theme }) => theme.fonts.mono};
  transition: all 0.15s;

  &:hover {
    background: ${({ theme }) => theme.colors.cyanAlpha8};
    color: ${({ theme }) => theme.colors.cyan};
  }
`
