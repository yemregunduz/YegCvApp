import { FiGitCommit } from 'react-icons/fi'
import cvData from '@/data/cv.json'
import * as S from '@/components/contents/ExperienceContent/styles'

export default function ExperienceContent() {
  return (
    <S.Timeline>
      {cvData.experiences.map((exp, i) => (
        <S.TimelineItem key={i}>
          <S.Marker $highlight={exp.highlight}>
            <FiGitCommit />
          </S.Marker>
          <div>
            <S.Period>{exp.period}</S.Period>
            <S.Role>{exp.role}</S.Role>
            {exp.description && <S.Description>{exp.description}</S.Description>}
          </div>
        </S.TimelineItem>
      ))}
    </S.Timeline>
  )
}
