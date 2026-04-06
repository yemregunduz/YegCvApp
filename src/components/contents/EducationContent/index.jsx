import cvData from '@/data/cv.json'
import { getIcon } from '@/utils/icons'
import { YEGCard } from '@/libs'
import * as S from '@/components/contents/EducationContent/styles'

export default function EducationContent() {
  return (
    <S.EduGrid>
      {cvData.education.map((edu, i) => (
        <YEGCard key={i} $size="lg">
          <S.CardInner>
            <S.EduIcon $color={edu.color}>{getIcon(edu.icon)}</S.EduIcon>
            <S.EduTitle>{edu.title}</S.EduTitle>
            <S.EduSubtitle>{edu.subtitle}</S.EduSubtitle>
            <S.EduYear>{edu.year}</S.EduYear>
          </S.CardInner>
        </YEGCard>
      ))}
    </S.EduGrid>
  )
}
