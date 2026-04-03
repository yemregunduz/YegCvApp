import * as S from '@/components/Terminal/styles'

function ShutdownOverlay({ phase, lines }) {
  return (
    <S.ShutdownScreen $phase={phase}>
      {phase === 'off' ? (
        <S.ShutdownLogo>⏻</S.ShutdownLogo>
      ) : (
        <S.ShutdownContent>
          {lines.map((line, i) => (
            <S.ShutdownLine key={i}>{line}</S.ShutdownLine>
          ))}
          <S.ShutdownCursor>_</S.ShutdownCursor>
        </S.ShutdownContent>
      )}
    </S.ShutdownScreen>
  )
}

export default ShutdownOverlay
