import { FiSun, FiMoon, FiVolume2, FiVolumeX } from 'react-icons/fi'
import cvData from '@/data/cv.json'
import { useTheme } from '@/libs/hooks/useTheme'
import { useKeyboardSound } from '@/hooks/useKeyboardSound'
import LanguageSelector from '@/components/LanguageSelector'
import * as S from '@/components/Navbar/styles'
import YEGButton from '@/libs/components/YEGButton'

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
          <YEGButton $variant="icon" onClick={toggle} title={enabled ? 'Sound off' : 'Sound on'}>
            {enabled ? <FiVolume2 /> : <FiVolumeX />}
          </YEGButton>
          <YEGButton $variant="icon" onClick={toggleTheme} title={mode === 'dark' ? 'Light theme' : 'Dark theme'}>
            {mode === 'dark' ? <FiSun /> : <FiMoon />}
          </YEGButton>
        </S.RightSection>
      </S.NavInner>
    </S.Nav>
  )
}

export default Navbar
