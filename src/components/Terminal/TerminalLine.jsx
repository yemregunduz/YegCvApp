import { Fragment, memo } from 'react'
import cvData from '@/data/cv.json'
import { useLanguage } from '@/hooks/useLanguage'
import PingOutput from '@/components/Terminal/PingOutput'
import NeofetchOutput from '@/components/Terminal/NeofetchOutput'
import TimelineOutput from '@/components/Terminal/TimelineOutput'
import * as S from '@/components/Terminal/styles'

const { terminal } = cvData

function TerminalLine({ line, copiedKey, copyToClipboard }) {
  const { t } = useLanguage()

  switch (line.type) {
    case 'input':
      return (
        <S.OutputLine>
          <S.Prompt>~/yunusemre $&nbsp;</S.Prompt>
          <S.Command>{line.text}</S.Command>
        </S.OutputLine>
      )
    case 'comment':
      return (
        <S.OutputLine>
          <S.Comment>// {line.key ? t[line.key] : line.text}</S.Comment>
        </S.OutputLine>
      )
    case 'fullPing':
      return (
        <S.OutputLine>
          <PingOutput copiedKey={copiedKey} onCopy={copyToClipboard} />
        </S.OutputLine>
      )
    case 'help':
      return (
        <S.OutputLine>
          <S.HelpGrid>
            {terminal.commands.map((c, idx) => (
              <Fragment key={idx}>
                <S.HelpCommand>{c.command}</S.HelpCommand>
                <S.HelpDesc>{t.commands[c.command]}</S.HelpDesc>
              </Fragment>
            ))}
          </S.HelpGrid>
        </S.OutputLine>
      )
    case 'neofetch':
      return (
        <S.OutputLine>
          <NeofetchOutput />
        </S.OutputLine>
      )
    case 'timeline':
      return (
        <S.OutputLine>
          <TimelineOutput />
        </S.OutputLine>
      )
    case 'success':
      return (
        <S.OutputLine>
          <S.SuccessValue>{line.text}</S.SuccessValue>
        </S.OutputLine>
      )
    case 'error':
      return (
        <S.OutputLine>
          <S.ErrorText>{line.text}</S.ErrorText>
        </S.OutputLine>
      )
    case 'langSwitch':
      return (
        <S.OutputLine>
          <S.SuccessValue>{t.output.langSwitched(line.lang)}</S.SuccessValue>
        </S.OutputLine>
      )
    default:
      return null
  }
}

export default memo(TerminalLine)
