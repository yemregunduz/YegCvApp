import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: 70px;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.mono};
    background-color: ${({ theme }) => theme.colors.bgPrimary};
    color: ${({ theme }) => theme.colors.textPrimary};
    overflow-x: hidden;
    font-size: 14px;
    line-height: 1.6;
  }

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.bgPrimary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.cyan};
    border-radius: 3px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    list-style: none;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.cyan};
    color: ${({ theme }) => theme.colors.bgPrimary};
  }

  button {
    cursor: pointer;
    font-family: ${({ theme }) => theme.fonts.mono};
  }

  input, textarea {
    font-family: ${({ theme }) => theme.fonts.mono};
  }
`

export default GlobalStyles
