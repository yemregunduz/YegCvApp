import { ThemeProvider } from 'styled-components'
import styled from 'styled-components'
import { useState } from 'react'
import GlobalStyles from '@/styles/GlobalStyles'
import { ThemeContextProvider, useTheme } from '@/hooks/useTheme'
import { LanguageProvider } from '@/hooks/useLanguage'
import { SoundProvider } from '@/hooks/useKeyboardSound'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Terminal from '@/components/Terminal'
import Loader from '@/components/Loader'

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;
  overflow: hidden;
  visibility: ${({ $hidden }) => ($hidden ? 'hidden' : 'visible')};
`

const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  padding-top: 60px;
`

function AppInner() {
  const { theme } = useTheme()
  const [loading, setLoading] = useState(true)

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      {loading && <Loader onComplete={() => setLoading(false)} />}

      <AppWrapper $hidden={loading}>
        <Navbar />
        <Main>
          <Terminal />
        </Main>
        <Footer />
      </AppWrapper>
    </ThemeProvider>
  )
}

function App() {
  return (
    <LanguageProvider>
      <SoundProvider>
        <ThemeContextProvider>
          <AppInner />
        </ThemeContextProvider>
      </SoundProvider>
    </LanguageProvider>
  )
}

export default App
