import styled from 'styled-components'

export const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const SkillCard = styled.div`
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1.5rem;
  border-radius: 12px;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;

  &:hover {
    border-color: ${({ theme }) => theme.colors.cyan};
    transform: translateY(-2px);
    box-shadow: 0 8px 24px ${({ theme }) => theme.colors.shadow};
  }
`

export const SkillIcon = styled.div`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.cyan};
  margin-bottom: 1rem;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.cyanAlpha8};
  border-radius: 10px;
`

export const SkillTitle = styled.h3`
  font-size: 0.9rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 0.75rem;
`

export const ChipList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 1rem;
  flex: 1;
`

export const Chip = styled.span`
  font-size: 0.62rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.bgSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 4px 10px;
  border-radius: 20px;
  transition: all 0.2s;
  max-height: 28px;

  &:hover {
    color: ${({ theme }) => theme.colors.cyan};
    border-color: ${({ theme }) => theme.colors.cyan}44;
    background: ${({ theme }) => theme.colors.cyan}11;
  }
`

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

export const MetaItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.62rem;
  color: ${({ theme }) => theme.colors.textMuted};

  svg {
    color: ${({ theme }) => theme.colors.cyan};
  }
`
