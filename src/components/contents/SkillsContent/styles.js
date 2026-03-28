import styled from 'styled-components'

export const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const SkillCard = styled.div`
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 2rem;
  border-radius: 8px;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;

  &:hover {
    border-color: ${({ theme }) => theme.colors.cyan};
    transform: translateY(-4px);
    box-shadow: 0 8px 30px ${({ theme }) => theme.colors.shadowAccent};
  }
`

export const SkillIcon = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.cyan};
  margin-bottom: 1rem;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.cyanAlpha8};
  border-radius: 50%;
`

export const SkillTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 0.5rem;
`

export const SkillTechs = styled.p`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 1.5rem;
  flex: 1;
`

export const ProfLabel = styled.span`
  font-size: 0.6rem;
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 2px;
`

export const BarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
`

export const Bar = styled.div`
  flex: 1;
  height: 6px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 3px;
  overflow: hidden;
`

export const Fill = styled.div`
  height: 100%;
  width: ${({ $width }) => $width}%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.cyan},
    ${({ theme }) => theme.colors.magenta}
  );
  border-radius: 3px;
  transition: width 1s ease;
`

export const Badge = styled.span`
  font-size: 0.55rem;
  color: ${({ theme }) => theme.colors.cyan};
  font-weight: 700;
  letter-spacing: 2px;
  border: 1px solid ${({ theme }) => theme.colors.cyan};
  padding: 2px 8px;
  border-radius: 3px;
`
