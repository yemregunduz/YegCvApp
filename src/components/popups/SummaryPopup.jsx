import styled from 'styled-components'
import cvData from '../../data/cv.json'
import { useState } from 'react'

const Section = styled.section`
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`

const CodeWindow = styled.div`
  width: 100%;
  background: #1a1a2e;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
`

const CodeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const CodeDots = styled.div`
  display: flex;
  gap: 6px;
`

const Dot = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`

const FileName = styled.span`
  font-size: 0.65rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-right: 8px;
`

const CopyButton = styled.button`
  background: ${({ theme }) => theme.colors.bgPrimary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.65rem;
  font-family: ${({ theme }) => theme.fonts.mono};
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.cyan};
    color: ${({ theme }) => theme.colors.cyan};
  }
`

const CodeBody = styled.div`
  padding: 20px 0;
`

const CodeLine = styled.div`
  display: flex;
  padding: 2px 20px;
  font-size: 0.75rem;
  line-height: 1.8;

  &:hover {
    background: rgba(0, 229, 255, 0.03);
  }
`

const LineNumber = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  min-width: 30px;
  text-align: right;
  margin-right: 20px;
  user-select: none;
`

const LineContent = styled.span`
  flex: 1;
`

const Key = styled.span`
  color: ${({ theme }) => theme.colors.cyan};
`

const Str = styled.span`
  color: ${({ theme }) => theme.colors.green};
`

const Bool = styled.span`
  color: ${({ theme }) => theme.colors.magenta};
`

const Punct = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
`

function indent(depth) {
  return '\u00a0\u00a0'.repeat(depth)
}

function renderInlineValue(value, isLast) {
  const comma = isLast ? '' : ','
  if (value === null) return <><Bool>null</Bool>{comma}</>
  if (typeof value === 'boolean') return <><Bool>{String(value)}</Bool>{comma}</>
  if (typeof value === 'number') return <><Bool>{value}</Bool>{comma}</>
  if (typeof value === 'string') return <><Str>"{value}"</Str>{comma}</>
  return null
}

function jsonToLines(data, depth, isLast) {
  const comma = isLast ? '' : ','
  const lines = []

  if (Array.isArray(data)) {
    lines.push(<>{indent(depth)}<Punct>{'['}</Punct></>)
    data.forEach((item, i) => {
      const last = i === data.length - 1
      const inline = renderInlineValue(item, last)
      if (inline) {
        lines.push(<>{indent(depth + 1)}{inline}</>)
      } else {
        lines.push(...jsonToLines(item, depth + 1, last))
      }
    })
    lines.push(<>{indent(depth)}<Punct>{']'}</Punct>{comma}</>)
  } else if (typeof data === 'object' && data !== null) {
    lines.push(<>{indent(depth)}<Punct>{'{'}</Punct></>)
    const entries = Object.entries(data)
    entries.forEach(([key, val], i) => {
      const last = i === entries.length - 1
      const inline = renderInlineValue(val, last)
      if (inline) {
        lines.push(<>{indent(depth + 1)}<Key>"{key}"</Key>: {inline}</>)
      } else {
        lines.push(<>{indent(depth + 1)}<Key>"{key}"</Key>: {Array.isArray(val) ? <Punct>{'['}</Punct> : <Punct>{'{'}</Punct>}</>)
        const inner = jsonToLines(val, depth + 1, last)
        lines.push(...inner.slice(1))
      }
    })
    lines.push(<>{indent(depth)}<Punct>{'}'}</Punct>{comma}</>)
  }

  return lines
}

function buildCodeLines(data) {
  return jsonToLines(data, 0, true).map((content, i) => ({ num: i + 1, content }))
}

const CODE_LINES = buildCodeLines(cvData.summary)

function SummaryContent() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(cvData.summary, null, 2))
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      })
  }

  return (
    <Section id="summary">
      <CodeWindow>
        <CodeHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CodeDots>
              <Dot $color="#ff5f57" />
              <Dot $color="#febc2e" />
              <Dot $color="#28c840" />
            </CodeDots>
            <FileName>{cvData.personal.name.replace(/\s+/g, '_')}.json</FileName>
          </div>
          <CopyButton onClick={handleCopy}>{copied ? 'Copied!' : 'Copy'}</CopyButton>
        </CodeHeader>
        <CodeBody>
          {CODE_LINES.map((line) => (
            <CodeLine key={line.num}>
              <LineNumber>{line.num}</LineNumber>
              <LineContent>{line.content}</LineContent>
            </CodeLine>
          ))}
        </CodeBody>
      </CodeWindow>
    </Section>
  )
}

export default SummaryContent