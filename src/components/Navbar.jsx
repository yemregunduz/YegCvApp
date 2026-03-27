import styled from 'styled-components'
import cvData from '../data/cv.json'

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(10, 10, 15, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0 1rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`

const NavInner = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const LogoIcon = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.cyan};
`

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.5;
`

const LogoName = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.cyan};
  letter-spacing: 1px;
`

const LogoSub = styled.span`
  font-size: 0.6rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`
function Navbar() {

  return (
    <Nav>
      <NavInner>
        <Logo>
          <LogoIcon>
            <span>&lt;</span>
            <span>/</span>
            <span>&gt;</span>
          </LogoIcon>
    
        </Logo>
              <LogoText>
            <LogoName>{cvData.personal.name}</LogoName>
            <LogoSub>{cvData.personal.role}</LogoSub>
          </LogoText>
      </NavInner>
    </Nav>
  )
}

export default Navbar
