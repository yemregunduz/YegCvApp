import { ThemeProvider } from 'styled-components'
import styled from 'styled-components'
import theme from './styles/theme'
import GlobalStyles from './styles/GlobalStyles'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Terminal from './components/Terminal'

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-top: 60px;

  > * {
    padding: 1rem;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 768px) {
    > * {
      padding: 2rem 1rem;
    }
  }
`

function App() {
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

export default App
