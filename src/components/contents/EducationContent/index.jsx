import cvData from '@/data/cv.json'
import { getIcon } from '@/data/icons'
import * as S from '@/components/contents/EducationContent/styles'

export default function EducationContent() {
  return (
    <S.EduGrid>
      {cvData.education.map((edu, i) => (
        <S.EduCard key={i}>
          <S.EduIcon $color={edu.color}>{getIcon(edu.icon)}</S.EduIcon>
          <S.EduTitle>{edu.title}</S.EduTitle>
          <S.EduSubtitle>{edu.subtitle}</S.EduSubtitle>
          <S.EduYear>{edu.year}</S.EduYear>
        </S.EduCard>
      ))}
    </S.EduGrid>
  )
}
