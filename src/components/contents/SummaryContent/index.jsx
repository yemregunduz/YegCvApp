import { useState } from 'react'
import cvData from '@/data/cv.json'
import * as S from '@/components/contents/SummaryContent/styles'

function indent(depth) {
  return '\u00a0\u00a0'.repeat(depth)
}

function renderInlineValue(value, isLast) {
  const comma = isLast ? '' : ','
  if (value === null)
    return (
      <>
        <S.Bool>null</S.Bool>
        {comma}
      </>
    )
  if (typeof value === 'boolean')
    return (
      <>
        <S.Bool>{String(value)}</S.Bool>
        {comma}
      </>
    )
  if (typeof value === 'number')
    return (
      <>
        <S.Bool>{value}</S.Bool>
        {comma}
      </>
    )
  if (typeof value === 'string')
    return (
      <>
        <S.Str>"{value}"</S.Str>
        {comma}
      </>
    )
  return null
}

function jsonToLines(data, depth, isLast) {
  const comma = isLast ? '' : ','
  const lines = []

  if (Array.isArray(data)) {
    lines.push(
      <>
        {indent(depth)}
        <S.Punct>{'['}</S.Punct>
      </>,
    )
    data.forEach((item, i) => {
      const last = i === data.length - 1
      const inline = renderInlineValue(item, last)
      if (inline) {
        lines.push(
          <>
            {indent(depth + 1)}
            {inline}
          </>,
        )
      } else {
        lines.push(...jsonToLines(item, depth + 1, last))
      }
    })
    lines.push(
      <>
        {indent(depth)}
        <S.Punct>{']'}</S.Punct>
        {comma}
      </>,
    )
  } else if (typeof data === 'object' && data !== null) {
    lines.push(
      <>
        {indent(depth)}
        <S.Punct>{'{'}</S.Punct>
      </>,
    )
    const entries = Object.entries(data).filter(([val]) => val !== 'terminal')
    entries.forEach(([key, val], i) => {
      const last = i === entries.length - 1
      const inline = renderInlineValue(val, last)
      if (inline) {
        lines.push(
          <>
            {indent(depth + 1)}
            <S.Key>"{key}"</S.Key>: {inline}
          </>,
        )
      } else {
        lines.push(
          <>
            {indent(depth + 1)}
            <S.Key>"{key}"</S.Key>:{' '}
            {Array.isArray(val) ? <S.Punct>{'['}</S.Punct> : <S.Punct>{'{'}</S.Punct>}
          </>,
        )
        const inner = jsonToLines(val, depth + 1, last)
        lines.push(...inner.slice(1))
      }
    })
    lines.push(
      <>
        {indent(depth)}
        <S.Punct>{'}'}</S.Punct>
        {comma}
      </>,
    )
  }

  return lines
}

function buildCodeLines(data) {
  return jsonToLines(data, 0, true).map((content, i) => ({
    num: i + 1,
    content,
  }))
}

const CODE_LINES = buildCodeLines(cvData)

export default function SummaryContent() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(cvData.summary, null, 2)).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <S.CodeWindow>
      <S.CodeHeader>
        <S.HeaderLeft>
          <S.CodeDots>
            <S.Dot $color="#ff5f57" />
            <S.Dot $color="#febc2e" />
            <S.Dot $color="#28c840" />
          </S.CodeDots>
          <S.FileName>
            {cvData.personal.name.replace(/\s+/g, '_')}
            .json
          </S.FileName>
        </S.HeaderLeft>
        <S.CopyButton onClick={handleCopy}>{copied ? 'Copied!' : 'Copy'}</S.CopyButton>
      </S.CodeHeader>
      <S.CodeBody>
        {CODE_LINES.map((line) => (
          <S.CodeLine key={line.num}>
            <S.LineNumber>{line.num}</S.LineNumber>
            <S.LineContent>{line.content}</S.LineContent>
          </S.CodeLine>
        ))}
      </S.CodeBody>
    </S.CodeWindow>
  )
}
