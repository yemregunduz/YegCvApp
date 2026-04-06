import { useMemo } from 'react'
import * as S from '@/libs/components/JsonViewer/styles'
import CopyButton from '@/libs/components/CopyButton'

const INDENT = '\u00a0\u00a0'

const getIndent = (depth) => INDENT.repeat(depth)

const isPrimitive = (val) =>
  val === null ||
  ['string', 'number', 'boolean'].includes(typeof val)

function renderPrimitive(value) {
  if (value === null) return <S.Bool>null</S.Bool>
  if (typeof value === 'boolean') return <S.Bool>{String(value)}</S.Bool>
  if (typeof value === 'number') return <S.Num>{value}</S.Num>
  if (typeof value === 'string') return <S.Str>"{value}"</S.Str>
  return null
}

function renderValue(value, depth, isLast) {
  const comma = isLast ? '' : ','

  if (isPrimitive(value)) {
    return [
      <span>
        {getIndent(depth)}
        {renderPrimitive(value)}
        {comma}
      </span>,
    ]
  }

  if (Array.isArray(value)) {
    return renderArray(value, depth, isLast)
  }

  if (typeof value === 'object') {
    return renderObject(value, depth, isLast)
  }

  return []
}

function renderArray(arr, depth, isLast) {
  const comma = isLast ? '' : ','

  return [
    <span>
      {getIndent(depth)}
      <S.Punct>[</S.Punct>
    </span>,

    ...arr.flatMap((item, i) =>
      renderValue(item, depth + 1, i === arr.length - 1)
    ),

    <span>
      {getIndent(depth)}
      <S.Punct>]</S.Punct>
      {comma}
    </span>,
  ]
}

function renderObject(obj, depth, isLast) {
  const comma = isLast ? '' : ','
  const entries = Object.entries(obj)

  return [
    <span>
      {getIndent(depth)}
      <S.Punct>{'{'}</S.Punct>
    </span>,

    ...entries.flatMap(([key, val], i) => {
      const last = i === entries.length - 1

      if (isPrimitive(val)) {
        return (
          <span>
            {getIndent(depth + 1)}
            <S.Key>"{key}"</S.Key>: {renderPrimitive(val)}
            {!last && ','}
          </span>
        )
      }

      return [
        <span>
          {getIndent(depth + 1)}
          <S.Key>"{key}"</S.Key>:{' '}
          <S.Punct>{Array.isArray(val) ? '[' : '{'}</S.Punct>
        </span>,

        ...renderValue(val, depth + 1, last).slice(1),
      ]
    }),

    <span>
      {getIndent(depth)}
      <S.Punct>{'}'}</S.Punct>
      {comma}
    </span>,
  ]
}

// ---- Builder ----
function buildLines(data) {
  return renderValue(data, 0, true).map((content, i) => ({
    num: i + 1,
    content,
  }))
}

// ---- Component ----
function JsonViewer({
  data,
  fileName = 'data.json',
  excludeKeys = [],
  showCopyButton = false,
}) {
  const filteredData = useMemo(() => {
    if (!excludeKeys.length) return data

    return Object.fromEntries(
      Object.entries(data).filter(([k]) => !excludeKeys.includes(k))
    )
  }, [data, excludeKeys])

  const lines = useMemo(() => buildLines(filteredData), [filteredData])

  return (
    <S.CodeWindow>
      <S.CodeHeader>
        <S.HeaderLeft>
          <S.CodeDots>
            <S.Dot $color="#ff5f57" />
            <S.Dot $color="#febc2e" />
            <S.Dot $color="#28c840" />
          </S.CodeDots>
          <S.FileName>{fileName}</S.FileName>
        </S.HeaderLeft>

        {showCopyButton && (
          <CopyButton text={JSON.stringify(filteredData, null, 2)} />
        )}
      </S.CodeHeader>

      <S.CodeBody>
        {lines.map(({ num, content }) => (
          <S.CodeLine key={num}>
            <S.LineNumber>{num}</S.LineNumber>
            <S.LineContent>{content}</S.LineContent>
          </S.CodeLine>
        ))}
      </S.CodeBody>
    </S.CodeWindow>
  )
}

export default JsonViewer