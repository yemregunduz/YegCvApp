import { useState, useEffect } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import cvData from '@/data/cv.json'
import * as S from '@/components/Loader/styles'

const LINE_DELAYS = [0, 200, 500, 800, 1100]

export default function Loader({ onComplete }) {
  const { t } = useLanguage()
  const [lines, setLines] = useState([])
  const [ready, setReady] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timers = t.loader.lines.map((text, i) =>
      setTimeout(() => setLines((prev) => [...prev, text]), LINE_DELAYS[i] || i * 300),
    )

    const minDelay = new Promise((r) => setTimeout(r, 1600))
    const fontsReady = document.fonts.ready

    Promise.all([minDelay, fontsReady]).then(() => {
      setReady(true)
    })

    return () => {
      timers.forEach(clearTimeout)
      setLines([])
    }
  }, [])

  useEffect(() => {
    if (!ready) return
    setLines((prev) => [...prev, '__READY__'])

    const timer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(onComplete, 400)
    }, 600)

    return () => clearTimeout(timer)
  }, [ready, onComplete])

  return (
    <S.Overlay $fadeOut={fadeOut}>
      <S.Container>
        <S.AsciiArt>{cvData.asciiLogo}</S.AsciiArt>

        {lines.map((line, i) =>
          line === '__READY__' ? (
            <S.StatusLine key={i}>{t.loader.ready}</S.StatusLine>
          ) : (
            <S.Line key={i}>{line}</S.Line>
          ),
        )}

        {!ready && (
          <S.Line>
            <S.Cursor>█</S.Cursor>
          </S.Line>
        )}

        <S.ProgressWrapper>
          <S.ProgressFill $duration={1400} />
        </S.ProgressWrapper>
      </S.Container>
    </S.Overlay>
  )
}
