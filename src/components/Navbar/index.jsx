import { FiSun, FiMoon } from 'react-icons/fi'
import cvData from '@/data/cv.json'
import { useTheme } from '@/hooks/useTheme'
import * as S from '@/components/Navbar/styles'

function Navbar() {
  const { mode, toggleTheme } = useTheme()

  return (
    <S.Nav>
      <S.NavInner>
        <S.Logo>
          <S.LogoIcon>
            <span>&lt;</span>
            <span>/</span>
            <span>&gt;</span>
          </S.LogoIcon>
        </S.Logo>
        <S.RightSection>
          <S.LogoText>
            <S.LogoName>{cvData.personal.name}</S.LogoName>
            <S.LogoSub>{cvData.personal.role}</S.LogoSub>
          </S.LogoText>
          <S.ThemeToggle onClick={toggleTheme} title={mode === 'dark' ? 'Açık tema' : 'Koyu tema'}>
            {mode === 'dark' ? <FiSun /> : <FiMoon />}
          </S.ThemeToggle>
        </S.RightSection>
      </S.NavInner>
    </S.Nav>
  )
}

export default Navbar
