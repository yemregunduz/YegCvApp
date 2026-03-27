import styled from 'styled-components'
import cvData from '../data/cv.json'

const FooterWrapper = styled.footer`
  background: ${({ theme }) => theme.colors.bgSecondary};
  padding: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

`

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const MutedText = styled.span`
  font-size: 0.6rem;
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 1px;
`

const Right = styled.div`
  display: flex;
  gap: 2rem;
`

const FooterLink = styled.a`
  font-size: 0.6rem;
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 1px;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.cyan};
  }
`

const LINKS = [
  { href: cvData.personal.sourceCode, label: 'SOURCE_CODE' },
]

function Footer() {
  return (
    <FooterWrapper>
      <Inner>
        <Left>
          <MutedText>&copy;2026</MutedText>
          <MutedText>//</MutedText>
          <MutedText>{cvData.personal.name}</MutedText>
        </Left>
        <Right>
          {LINKS.map(({ href, label }) => (
            <FooterLink key={label} href={href} target="_blank" rel="noopener noreferrer">
              {label}
            </FooterLink>
          ))}
        </Right>
      </Inner>
    </FooterWrapper>
  )
}

export default Footer
