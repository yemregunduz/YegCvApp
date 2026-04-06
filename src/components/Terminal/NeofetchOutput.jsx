import { memo, useMemo } from 'react'
import styled from 'styled-components'
import cvData from '@/data/cv.json'
import { useLanguage } from '@/hooks/useLanguage'
import { useTheme } from '@/libs/hooks/useTheme'

const Wrapper = styled.div`
  display: flex;
  gap: 24px;
  margin: 8px 0;
  font-size: 0.75rem;
  line-height: 1.6;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;
  }
`

const AsciiArt = styled.pre`
  color: ${({ theme }) => theme.colors.cyan};
  font-size: 0.55rem;
  line-height: 1.2;
  margin: 0;
  flex-shrink: 0;

  @media (max-width: 600px) {
    font-size: 0.4rem;
  }
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const Name = styled.div`
  color: ${({ theme }) => theme.colors.cyan};
  font-weight: bold;
  font-size: 0.85rem;
`

const Separator = styled.div`
  color: ${({ theme }) => theme.colors.border};
  margin: 2px 0;
`

const Row = styled.div`
  display: flex;
  gap: 8px;
`

const Label = styled.span`
  color: ${({ theme }) => theme.colors.magenta};
  min-width: 100px;
`

const Value = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
`

const ColorBar = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 8px;
`

const ColorBlock = styled.span`
  width: 24px;
  height: 12px;
  border-radius: 2px;
  background: ${({ $color }) => $color};
`

const { personal, stacks, asciiLogo } = cvData
const TERM_COLORS = [
  '#ff5f56',
  '#ffbd2e',
  '#27c93f',
  '#00e5ff',
  '#e040fb',
  '#8b5cf6',
  '#f59e0b',
  '#ff6b6b',
]

function NeofetchOutput() {
  const { t } = useLanguage()
  const { mode } = useTheme()
  const nf = t.neofetch

  const allTechs = useMemo(() => stacks.flatMap((s) => s.techs).slice(0, 8).join(', '), [])

  return (
    <Wrapper>
      <AsciiArt>{asciiLogo}</AsciiArt>
      <Info>
        <Name>{personal.name}@terminal</Name>
        <Separator>{'─'.repeat(28)}</Separator>
        <Row>
          <Label>{nf.role}</Label>
          <Value>{personal.role}</Value>
        </Row>
        <Row>
          <Label>{nf.location}</Label>
          <Value>{personal.location}</Value>
        </Row>
        <Row>
          <Label>{nf.experience}</Label>
          <Value>{nf.experienceValue}</Value>
        </Row>
        <Row>
          <Label>{nf.languages}</Label>
          <Value>{nf.languagesValue}</Value>
        </Row>
        <Row>
          <Label>{nf.editor}</Label>
          <Value>{nf.editorValue}</Value>
        </Row>
        <Row>
          <Label>{nf.terminal}</Label>
          <Value>{nf.terminalValue}</Value>
        </Row>
        <Row>
          <Label>{nf.theme}</Label>
          <Value>{mode === 'dark' ? 'Dark' : 'Light'}</Value>
        </Row>
        <Row>
          <Label>{nf.stack}</Label>
          <Value>{allTechs}</Value>
        </Row>
        <Row>
          <Label>{nf.availableForHire}</Label>
          <Value>{personal.availableForHire ? `✅ ${nf.yes}` : `❌ ${nf.no}`}</Value>
        </Row>
        <ColorBar>
          {TERM_COLORS.map((c) => (
            <ColorBlock key={c} $color={c} />
          ))}
        </ColorBar>
      </Info>
    </Wrapper>
  )
}

export default memo(NeofetchOutput)
