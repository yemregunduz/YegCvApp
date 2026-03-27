import styled from 'styled-components'
import { FiGitCommit } from 'react-icons/fi'
import cvData from '../../data/cv.json'

const Timeline = styled.div`
  position: relative;
  padding-left: 3rem;

  &::before {
    content: '';
    position: absolute;
    left: 12px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${({ theme }) => theme.colors.border};
  }
`

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 3rem;
  &:last-child { margin-bottom: 0; }
`

const Marker = styled.div`
  position: absolute;
  left: -3rem;
  top: 0;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.bgPrimary};
  color: ${({ $highlight, theme }) => ($highlight ? theme.colors.cyan : theme.colors.textMuted)};
  font-size: 1rem;
  z-index: 1;
`

const Period = styled.span`
  font-size: 0.65rem;
  color: ${({ theme }) => theme.colors.cyan};
  letter-spacing: 2px;
  display: block;
  margin-bottom: 0.5rem;
`

const Role = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.75rem;
`

const Description = styled.p`
  font-size: 0.72rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
`

export default function ExperienceContent() {
  return (
    <Timeline>
      {cvData.experiences.map((exp, i) => (
        <TimelineItem key={i}>
          <Marker $highlight={exp.highlight}>
            <FiGitCommit />
          </Marker>
          <div>
            <Period>{exp.period}</Period>
            <Role>{exp.role}</Role>
            {exp.description && <Description>{exp.description}</Description>}
          </div>
        </TimelineItem>
      ))}
    </Timeline>
  )
}
