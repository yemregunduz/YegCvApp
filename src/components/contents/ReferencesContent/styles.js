import styled from 'styled-components'

export const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

export const CardInner = styled.div`
  display: flex;
  gap: 1.25rem;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
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
  color: ${({ theme }) => theme.colors.contrastText};
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
