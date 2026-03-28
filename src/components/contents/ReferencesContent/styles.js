import styled from 'styled-components'

export const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const Card = styled.div`
  display: flex;
  gap: 1.25rem;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  position: relative;
  transition: all 0.3s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.cyan};
    box-shadow: 0 8px 24px ${({ theme }) => theme.colors.shadow};
  }

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
    padding: 1.25rem 1rem;
  }
`

export const Avatar = styled.div`
  width: 48px;
  height: 48px;
  min-width: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 1px;
  color: ${({ theme }) => (theme.mode === 'dark' ? '#0a0a0f' : '#ffffff')};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.cyan},
    ${({ theme }) => theme.colors.magenta}
  );
`

export const Body = styled.div`
  flex: 1;
  min-width: 0;
`

export const Quote = styled.p`
  font-size: 0.72rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.8;
  margin-bottom: 1rem;
  position: relative;
  padding-left: 1rem;
  border-left: 2px solid ${({ theme }) => theme.colors.border};
  font-style: italic;

  @media (max-width: 576px) {
    border-left: none;
    padding-left: 0;
    text-align: center;
  }
`

export const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 576px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`

export const Name = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`

export const Separator = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.65rem;
`

export const Role = styled.span`
  font-size: 0.65rem;
  color: ${({ theme }) => theme.colors.cyan};
`
