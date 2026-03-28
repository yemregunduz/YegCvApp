import cvData from '@/data/cv.json'
import { getIcon } from '@/data/icons'
import * as S from '@/components/contents/SkillsContent/styles'

export default function SkillsContent() {
  return (
    <S.SkillsGrid>
      {cvData.stacks.map((stack, i) => (
        <S.SkillCard key={i}>
          <S.SkillIcon>{getIcon(stack.icon)}</S.SkillIcon>
          <S.SkillTitle>{stack.title}</S.SkillTitle>
          <S.SkillTechs>{stack.techs}</S.SkillTechs>
          <S.ProfLabel>PROFICIENCY</S.ProfLabel>
          <S.BarWrapper>
            <S.Bar>
              <S.Fill $width={stack.proficiency} />
            </S.Bar>
            <S.Badge>{stack.label}</S.Badge>
          </S.BarWrapper>
        </S.SkillCard>
      ))}
    </S.SkillsGrid>
  )
}
