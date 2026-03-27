import styled from 'styled-components'
import cvData from '../../data/cv.json'
import { getIcon } from '../../data/icons'

const EduGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`

const EduCard = styled.div`
  text-align: center;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.cyan};
  }
`

const EduIcon = styled.div`
  font-size: 2rem;
  margin: 0 auto 1rem;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ $color }) => $color};
  border-radius: 50%;
  color: ${({ $color }) => $color};
`

const EduTitle = styled.h3`
  font-size: 0.85rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
`

const EduSubtitle = styled.p`
  font-size: 0.68rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 0.3rem;
`

const EduYear = styled.span`
  font-size: 0.65rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

export default function EducationContent() {
  return (
    <EduGrid>
      {cvData.education.map((edu, i) => (
        <EduCard key={i}>
          <EduIcon $color={edu.color}>{getIcon(edu.icon)}</EduIcon>
          <EduTitle>{edu.title}</EduTitle>
          <EduSubtitle>{edu.subtitle}</EduSubtitle>
          <EduYear>{edu.year}</EduYear>
        </EduCard>
      ))}
    </EduGrid>
  )
}
