import cvData from '@/data/cv.json'
import * as S from '@/components/Footer/styles'

const LINKS = [
  {
    href: cvData.personal.sourceCode,
    label: 'SOURCE_CODE',
  },
]

function Footer() {
  return (
    <S.FooterWrapper>
      <S.Inner>
        <S.Left>
          <S.MutedText>&copy;2026</S.MutedText>
          <S.MutedText>//</S.MutedText>
          <S.MutedText>{cvData.personal.name}</S.MutedText>
        </S.Left>
        <S.Right>
          {LINKS.map(({ href, label }) => (
            <S.FooterLink key={label} href={href} target="_blank" rel="noopener noreferrer">
              {label}
            </S.FooterLink>
          ))}
        </S.Right>
      </S.Inner>
    </S.FooterWrapper>
  )
}

export default Footer
