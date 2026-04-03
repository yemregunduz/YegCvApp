import styled from 'styled-components'

export const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

export const Card = styled.div`
  display: flex;
  gap: 1.25rem;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
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

export const Name = styled.h3`
  font-size: 0.85rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 2px;
`

export const Role = styled.span`
  display: block;
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

export const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media (max-width: 576px) {
    align-items: center;
  }
`

export const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.7rem;

  @media (max-width: 576px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`

export const ContactIcon = styled.span`
  color: ${({ theme }) => theme.colors.cyan};
  display: flex;
  align-items: center;
`

export const ContactLabel = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 600;
  font-size: 0.65rem;
`

export const ContactLink = styled.a`
  color: ${({ theme }) => theme.colors.textPrimary};
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.cyan};
  }
`
