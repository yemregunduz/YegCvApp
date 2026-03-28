import styled from 'styled-components'

export const EduGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`

export const EduCard = styled.div`
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

export const EduIcon = styled.div`
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

export const EduTitle = styled.h3`
  font-size: 0.85rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 0.5rem;
`

export const EduSubtitle = styled.p`
  font-size: 0.68rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 0.3rem;
`

export const EduYear = styled.span`
  font-size: 0.65rem;
  color: ${({ theme }) => theme.colors.textMuted};
`
