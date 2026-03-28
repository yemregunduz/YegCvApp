import styled from 'styled-components'

export const CodeWindow = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.bgSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  box-shadow: 0 20px 60px ${({ theme }) => theme.colors.shadow};
`

export const CodeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
`

export const CodeDots = styled.div`
  display: flex;
  gap: 6px;
`

export const Dot = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`

export const FileName = styled.span`
  font-size: 0.65rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-right: 8px;
`

export const CopyButton = styled.button`
  background: ${({ theme }) => theme.colors.bgPrimary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.65rem;
  font-family: ${({ theme }) => theme.fonts.mono};
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.cyan};
    color: ${({ theme }) => theme.colors.cyan};
  }
`

export const CodeBody = styled.div`
  padding: 20px 0;
`

export const CodeLine = styled.div`
  display: flex;
  padding: 2px 20px;
  font-size: 0.75rem;
  line-height: 1.8;

  &:hover {
    background: ${({ theme }) => theme.colors.cyanAlpha3};
  }
`

export const LineNumber = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  min-width: 30px;
  text-align: right;
  margin-right: 20px;
  user-select: none;
`

export const LineContent = styled.span`
  flex: 1;
  word-break: break-word;
`

export const Key = styled.span`
  color: ${({ theme }) => theme.colors.cyan};
`

export const Str = styled.span`
  color: ${({ theme }) => theme.colors.green};
`

export const Bool = styled.span`
  color: ${({ theme }) => theme.colors.magenta};
`

export const Punct = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
`
