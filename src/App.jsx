import { ThemeProvider } from 'styled-components'
import styled from 'styled-components'
import GlobalStyles from '@/styles/GlobalStyles'
import { ThemeContextProvider, useTheme } from '@/hooks/useTheme'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Terminal from '@/components/Terminal'

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
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

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppWrapper>
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
    <ThemeContextProvider>
      <AppInner />
    </ThemeContextProvider>
  )
}

export default App
