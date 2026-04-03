import { FiClock, FiBriefcase } from 'react-icons/fi'
import cvData from '@/data/cv.json'
import { getIcon } from '@/utils/icons'
import * as S from '@/components/contents/SkillsContent/styles'

export default function SkillsContent() {
  return (
    <S.SkillsGrid>
      {cvData.stacks.map((stack, i) => (
        <S.SkillCard key={i}>
          <S.SkillIcon>{getIcon(stack.icon)}</S.SkillIcon>
          <S.SkillTitle>{stack.title}</S.SkillTitle>
          <S.ChipList>
            {stack.techs.map((tech, idx) => (
              <S.Chip key={idx}>{tech}</S.Chip>
            ))}
          </S.ChipList>
          {(stack.experience || stack.projects) && (
            <S.MetaRow>
              {stack.experience && (
                <S.MetaItem>
                  <FiClock size={12} />
                  {stack.experience}
                </S.MetaItem>
              )}
              {stack.projects && (
                <S.MetaItem>
                  <FiBriefcase size={12} />
                  {stack.projects} proje
                </S.MetaItem>
              )}
            </S.MetaRow>
          )}
        </S.SkillCard>
      ))}
    </S.SkillsGrid>
  )
}
