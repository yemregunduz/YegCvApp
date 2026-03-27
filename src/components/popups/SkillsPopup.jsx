import styled from 'styled-components'
import cvData from '../../data/cv.json'
import { getIcon } from '../../data/icons'

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const SkillCard = styled.div`
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 2rem;
  border-radius: 8px;
  transition: all 0.3s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.cyan};
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 229, 255, 0.1);
  }
`

const SkillIcon = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.cyan};
  margin-bottom: 1rem;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 229, 255, 0.08);
  border-radius: 50%;
`

const SkillTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.5rem;
`

const SkillTechs = styled.p`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 1.5rem;
`

const ProfLabel = styled.span`
  font-size: 0.6rem;
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 2px;
`

const BarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
`

const Bar = styled.div`
  flex: 1;
  height: 6px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 3px;
  overflow: hidden;
`

const Fill = styled.div`
  height: 100%;
  width: ${({ $width }) => $width}%;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.cyan}, ${({ theme }) => theme.colors.magenta});
  border-radius: 3px;
  transition: width 1s ease;
`

const Badge = styled.span`
  font-size: 0.55rem;
  color: ${({ theme }) => theme.colors.cyan};
  font-weight: 700;
  letter-spacing: 2px;
  border: 1px solid ${({ theme }) => theme.colors.cyan};
  padding: 2px 8px;
  border-radius: 3px;
`

export default function SkillsContent() {
  return (
    <SkillsGrid>
      {cvData.stacks.map((stack, i) => (
        <SkillCard key={i}>
          <SkillIcon>{getIcon(stack.icon)}</SkillIcon>
          <SkillTitle>{stack.title}</SkillTitle>
          <SkillTechs>{stack.techs}</SkillTechs>
          <ProfLabel>PROFICIENCY</ProfLabel>
          <BarWrapper>
            <Bar><Fill $width={stack.proficiency} /></Bar>
            <Badge>{stack.label}</Badge>
          </BarWrapper>
        </SkillCard>
      ))}
    </SkillsGrid>
  )
}
