import styled from 'styled-components'
import cvData from '@/data/cv.json'
import {
  TermKey,
  Value,
  SuccessValue,
  LinkValue,
  SuggestionChip,
  Separator,
  Divider,
} from '@/components/Terminal/styles'

const { personal } = cvData

// ── Ping-specific Styled Components ──

const PingBlock = styled.div`
  margin: 8px 0;
  font-size: 0.78rem;
  line-height: 1.9;
`

const SectionHeader = styled.div`
  color: ${({ theme }) => theme.colors.cyan};
  font-weight: 700;
  margin-top: 12px;
  margin-bottom: 2px;
  letter-spacing: 1px;
  font-size: 0.75rem;

  &:first-child {
    margin-top: 0;
  }
`

const Row = styled.div`
  margin-left: 20px;
  display: flex;
  align-items: center;
  gap: 4px;
`

const SkillBar = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-left: 8px;
`

const BarTrack = styled.span`
  display: inline-block;
  width: 100px;
  height: 8px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  overflow: hidden;
`

const BarFill = styled.span`
  display: block;
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: ${({ theme }) => theme.colors.cyan};
  border-radius: 4px;
`

const BarLabel = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.65rem;
`

const ExpPeriod = styled.span`
  color: ${({ theme }) => theme.colors.magenta};
  font-size: 0.7rem;
`

const ExpRole = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 600;
`

const ExpDesc = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.7rem;
  margin-left: 20px;
  margin-bottom: 6px;
  max-width: 700px;
`

const EduLine = styled.div`
  margin-left: 20px;
`

const EduTitle = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 600;
`

const EduSub = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
`

const EduYear = styled.span`
  color: ${({ theme }) => theme.colors.magenta};
  font-size: 0.7rem;
  margin-left: 8px;
`

const CopyChip = styled(SuggestionChip)`
  margin-left: 8px;
  padding: 1px 6px;
  font-size: 0.6rem;
`

const ExpBlock = styled.div`
  margin-bottom: 8px;
`

// ── Component ──

function PingOutput({ copiedKey, onCopy }) {
  return (
    <PingBlock>
      <SectionHeader>── PERSONAL ──</SectionHeader>
      <Row>
        <TermKey>name</TermKey>
        <Separator> : </Separator>
        <Value>{personal.name}</Value>
      </Row>
      <Row>
        <TermKey>role</TermKey>
        <Separator> : </Separator>
        <Value>{personal.role}</Value>
      </Row>
      <Row>
        <TermKey>location</TermKey>
        <Separator> : </Separator>
        <Value>{personal.location}</Value>
      </Row>
      <Row>
        <TermKey>email</TermKey>
        <Separator> : </Separator>
        <LinkValue href={`mailto:${personal.email}`}>{personal.email}</LinkValue>
        <CopyChip onClick={() => onCopy(personal.email, 'email')}>
          {copiedKey === 'email' ? 'kopyalandı' : 'kopyala'}
        </CopyChip>
      </Row>
      <Row>
        <TermKey>phone</TermKey>
        <Separator> : </Separator>
        <LinkValue href={`tel:${personal.phone}`}>{personal.phone}</LinkValue>
        <CopyChip onClick={() => onCopy(personal.phone, 'phone')}>
          {copiedKey === 'phone' ? 'kopyalandı' : 'kopyala'}
        </CopyChip>
      </Row>
      <Row>
        <TermKey>linkedin</TermKey>
        <Separator> : </Separator>
        <LinkValue href={personal.linkedin} target="_blank" rel="noopener noreferrer">
          linkedin.com/in/yunus-emre-gunduz
        </LinkValue>
      </Row>
      <Row>
        <TermKey>github</TermKey>
        <Separator> : </Separator>
        <LinkValue href={personal.github} target="_blank" rel="noopener noreferrer">
          github.com/yemregunduz
        </LinkValue>
      </Row>
      <Row>
        <TermKey>interests</TermKey>
        <Separator> : </Separator>
        <Value>[{personal.interests.join(', ')}]</Value>
      </Row>
      <Row>
        <TermKey>availableForHire</TermKey>
        <Separator> : </Separator>
        <SuccessValue>{String(personal.availableForHire)}</SuccessValue>
      </Row>

      <Divider />

      <SectionHeader>── SKILLS ──</SectionHeader>
      {cvData.stacks.map((stack) => (
        <Row key={stack.title}>
          <TermKey>{stack.title.toLowerCase().padEnd(10)}</TermKey>
          <Separator> : </Separator>
          <Value>{stack.techs}</Value>
          <SkillBar>
            <BarTrack>
              <BarFill $pct={stack.proficiency} />
            </BarTrack>
            <BarLabel>{stack.proficiency}%</BarLabel>
          </SkillBar>
        </Row>
      ))}

      <Divider />

      <SectionHeader>── EXPERIENCE ──</SectionHeader>
      {cvData.experiences.map((exp, idx) => (
        <ExpBlock key={idx}>
          <Row>
            <ExpPeriod>{exp.period}</ExpPeriod>
          </Row>
          <Row>
            <ExpRole>{exp.role}</ExpRole>
          </Row>
          <ExpDesc>{exp.description}</ExpDesc>
        </ExpBlock>
      ))}

      <Divider />

      <SectionHeader>── EDUCATION ──</SectionHeader>
      {cvData.education.map((edu, idx) => (
        <EduLine key={idx}>
          <EduTitle>{edu.title}</EduTitle>
          <EduSub> — {edu.subtitle}</EduSub>
          <EduYear>({edu.year})</EduYear>
        </EduLine>
      ))}
    </PingBlock>
  )
}

export default PingOutput
