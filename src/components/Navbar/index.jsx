import { FiSun, FiMoon, FiVolume2, FiVolumeX } from 'react-icons/fi'
import cvData from '@/data/cv.json'
import { useTheme } from '@/hooks/useTheme'
import { useKeyboardSound } from '@/hooks/useKeyboardSound'
import LanguageSelector from '@/components/LanguageSelector'
import * as S from '@/components/Navbar/styles'

function Navbar() {
  const { mode, toggleTheme } = useTheme()
  const { enabled, toggle } = useKeyboardSound()

  return (
    <S.Nav>
      <S.NavInner>
        <S.LeftSection>
          <S.LogoIcon>
            <span>&lt;</span>
            <span>/</span>
            <span>&gt;</span>
          </S.LogoIcon>
          <S.LogoText>
            <S.LogoName>{cvData.personal.name}</S.LogoName>
            <S.LogoSub>{cvData.personal.role}</S.LogoSub>
          </S.LogoText>
        </S.LeftSection>
        <S.RightSection>
          <LanguageSelector />
          <S.IconButton onClick={toggle} title={enabled ? 'Sound off' : 'Sound on'}>
            {enabled ? <FiVolume2 /> : <FiVolumeX />}
          </S.IconButton>
          <S.IconButton onClick={toggleTheme} title={mode === 'dark' ? 'Light theme' : 'Dark theme'}>
            {mode === 'dark' ? <FiSun /> : <FiMoon />}
          </S.IconButton>
        </S.RightSection>
      </S.NavInner>
    </S.Nav>
  )
}

export default Navbar
