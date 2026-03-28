import styled, { keyframes } from 'styled-components'

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(30px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.overlay};
  backdrop-filter: blur(2px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`

export const Window = styled.div`
  background: ${({ theme }) => theme.colors.bgPrimary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  width: 100%;
  max-width: 900px;
  max-height: 85vh;
  overflow: hidden;
  animation: ${slideUp} 0.3s ease;
  display: flex;
  flex-direction: column;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  background: ${({ theme }) => theme.colors.bgCard};
  border-bottom: ${({ $noHeaderBorder, theme }) =>
    $noHeaderBorder ? 'none' : `1px solid ${theme.colors.border}`};
`

export const Title = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.cyan};
  letter-spacing: 2px;
  font-weight: 700;
`

export const CloseButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  width: 30px;
  height: 30px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: all 0.2s;

  &:hover {
    border-color: #ff5555;
    color: #ff5555;
  }
`

export const Body = styled.div`
  padding: ${({ $noPadding }) => ($noPadding ? '0' : '1.25rem')};
  overflow-y: auto;
  flex: 1;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 2px;
  }
`
