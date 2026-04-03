import styled from 'styled-components'

export const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${({ theme }) => theme.colors.navBg};
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0 1rem;
`

export const NavInner = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
`

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const LogoIcon = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.cyan};
`

export const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.5;
`

export const LogoName = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.cyan};
  letter-spacing: 1px;
`

export const LogoSub = styled.span`
  font-size: 0.6rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const IconButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: all 0.3s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.cyan};
    color: ${({ theme }) => theme.colors.cyan};
  }
`
