import styled from 'styled-components'

export const FooterWrapper = styled.footer`
  background: ${({ theme }) => theme.colors.navBg};
  backdrop-filter: blur(10px);
  padding: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

export const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const MutedText = styled.span`
  font-size: 0.6rem;
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 1px;
`

export const Right = styled.div`
  display: flex;
  gap: 2rem;
`

export const FooterLink = styled.a`
  font-size: 0.6rem;
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 1px;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.cyan};
  }
`
