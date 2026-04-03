import { memo } from 'react'
import styled from 'styled-components'
import cvData from '@/data/cv.json'
import { useLanguage } from '@/hooks/useLanguage'

const Wrapper = styled.div`
  margin: 8px 0 8px 8px;
  font-size: 0.75rem;
`

const Title = styled.div`
  color: ${({ theme }) => theme.colors.cyan};
  margin-bottom: 12px;
  font-weight: bold;
`

const Entry = styled.div`
  display: flex;
  gap: 16px;
  min-height: 60px;
`

const Rail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 16px;
  flex-shrink: 0;
`

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $active, theme }) => ($active ? theme.colors.green : theme.colors.purple)};
  border: 2px solid ${({ $active, theme }) => ($active ? theme.colors.green : theme.colors.purple)};
  box-shadow: ${({ $active, theme }) => ($active ? `0 0 8px ${theme.colors.green}` : 'none')};
  flex-shrink: 0;
  z-index: 1;
`

const Line = styled.div`
  width: 2px;
  flex: 1;
  background: ${({ theme }) => theme.colors.border};
`

const Content = styled.div`
  padding-bottom: 16px;
`

const Period = styled.div`
  color: ${({ $active, theme }) => ($active ? theme.colors.green : theme.colors.textMuted)};
  font-size: 0.65rem;
  font-family: ${({ theme }) => theme.fonts.mono};
`

const Role = styled.div`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: bold;
  font-size: 0.8rem;
  margin-top: 2px;
`

const Company = styled.span`
  color: ${({ theme }) => theme.colors.magenta};
`

function TimelineOutput() {
  const { t } = useLanguage()
  const { experiences } = cvData

  return (
    <Wrapper>
      <Title>{t.timeline.title}</Title>
      {experiences.map((exp, i) => {
        const isActive = i === 0
        const [role, company] = exp.role.split(' @ ')

        return (
          <Entry key={i}>
            <Rail>
              <Dot $active={isActive} />
              {i < experiences.length - 1 && <Line />}
            </Rail>
            <Content>
              <Period $active={isActive}>
                {exp.period.replace(/DEVAM ED[İI]YOR/, t.timeline.present)}
              </Period>
              <Role>
                {role} @ <Company>{company}</Company>
              </Role>
            </Content>
          </Entry>
        )
      })}
    </Wrapper>
  )
}

export default memo(TimelineOutput)
