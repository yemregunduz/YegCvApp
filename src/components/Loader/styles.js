import styled, { keyframes } from 'styled-components'

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
`

const fillBar = keyframes`
  from { width: 0%; }
  to   { width: 100%; }
`

export const Container = styled.div`
  width: 90%;
  max-width: 480px;
  font-family: ${({ theme }) => theme.fonts.mono};
  color: ${({ theme }) => theme.colors.textPrimary};
`

export const AsciiArt = styled.pre`
  color: ${({ theme }) => theme.colors.cyan};
  font-size: 0.55rem;
  line-height: 1.2;
  text-align: center;
  margin-bottom: 24px;
  white-space: pre;
  animation: ${fadeIn} 0.3s ease;

  @media (max-width: 480px) {
    font-size: 0.35rem;
  }
`

export const Line = styled.div`
  font-size: 0.75rem;
  line-height: 1.8;
  animation: ${fadeIn} 0.3s ease;

  &::before {
    content: '> ';
    color: ${({ theme }) => theme.colors.green};
  }
`

export const StatusLine = styled.div`
  font-size: 0.75rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.green};
  animation: ${fadeIn} 0.3s ease;
`

export const Cursor = styled.span`
  color: ${({ theme }) => theme.colors.cyan};
  animation: ${blink} 0.8s step-end infinite;
`

export const ProgressWrapper = styled.div`
  margin-top: 16px;
  height: 3px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 2px;
  overflow: hidden;
`

export const ProgressFill = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.colors.cyan};
  border-radius: 2px;
  animation: ${fillBar} ${({ $duration }) => $duration}ms ease-out forwards;
`
